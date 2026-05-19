import { Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';
import { generateOrderNumber, paginate, buildPaginationResponse } from '../utils/helpers';
import { sendOrderConfirmationEmail } from '../utils/email';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { shippingAddress, paymentMethod, notes } = req.body;
    const userId = req.user?._id;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Build order items from cart
    const orderItems = cart.items.map((item: any) => ({
      product: item.product._id,
      seller: item.product.seller,
      store: item.product.store,
      title: item.product.title,
      image: item.product.images[0],
      variant: item.variant,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
      status: 'pending',
    }));

    const subtotal = orderItems.reduce((sum: number, item: any) => sum + item.total, 0);
    const shippingFee = subtotal > 5000 ? 0 : 200;
    const tax = 0;
    const discount = cart.discount || 0;
    const total = subtotal + shippingFee + tax - discount;

    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      buyer: userId,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingFee,
      tax,
      discount,
      total,
      coupon: cart.coupon,
      notes,
      status: paymentMethod === 'cod' ? 'confirmed' : 'pending',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
    });

    // Update product stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity, totalSold: item.quantity },
      });
    }

    // Clear cart
    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;
    cart.discount = 0;
    cart.coupon = undefined;
    await cart.save();

    // Send confirmation email
    try {
      await sendOrderConfirmationEmail(req.user!.email, order.orderNumber);
    } catch (e) {
      console.error('Order email failed:', e);
    }

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create order', error });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const filter: Record<string, any> = { buyer: req.user?._id };
    if (status) filter.status = status;

    const { skip, limit: limitNum } = paginate(Number(page), Number(limit));

    const [orders, total] = await Promise.all([
      Order.find(filter).sort('-createdAt').skip(skip).limit(limitNum).lean(),
      Order.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: orders,
      pagination: buildPaginationResponse(total, Number(page), limitNum),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

export const getOrder = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      buyer: req.user?._id,
    }).populate('items.product', 'title slug images');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch order' });
  }
};

export const cancelOrder = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, buyer: req.user?._id });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (!['pending', 'confirmed'].includes(order.status)) {
      return res.status(400).json({ success: false, message: 'Order cannot be cancelled' });
    }

    order.status = 'cancelled';
    order.cancelReason = req.body.reason;
    order.cancelledAt = new Date();
    await order.save();

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity, totalSold: -item.quantity },
      });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to cancel order' });
  }
};

export const getSellerOrders = async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const filter: Record<string, any> = { 'items.seller': req.user?._id };
    if (status) filter['items.status'] = status;

    const { skip, limit: limitNum } = paginate(Number(page), Number(limit));

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('buyer', 'firstName lastName email')
        .sort('-createdAt')
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Order.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: orders,
      pagination: buildPaginationResponse(total, Number(page), limitNum),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch seller orders' });
  }
};

export const updateOrderItemStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId, itemId } = req.params;
    const { status, trackingNumber } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const item = order.items.find(
      (i) => i._id?.toString() === itemId && i.seller.toString() === req.user?._id.toString()
    );

    if (!item) {
      return res.status(404).json({ success: false, message: 'Order item not found' });
    }

    item.status = status;
    if (trackingNumber) item.trackingNumber = trackingNumber;
    if (status === 'shipped') item.shippedAt = new Date();
    if (status === 'delivered') item.deliveredAt = new Date();

    // Update overall order status if all items have same status
    const allSameStatus = order.items.every((i) => i.status === status);
    if (allSameStatus) {
      order.status = status;
      if (status === 'delivered') order.deliveredAt = new Date();
    }

    await order.save();

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
};
