import { Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    let cart = await Cart.findOne({ user: req.user?._id }).populate(
      'items.product',
      'title images price stock slug store'
    );

    if (!cart) {
      cart = await Cart.create({ user: req.user?._id, items: [] });
    }

    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch cart' });
  }
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity = 1, variant } = req.body;

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user?._id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId && item.variant === variant
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.price = product.price;
    } else {
      cart.items.push({
        product: productId,
        variant,
        quantity,
        price: product.price,
      });
    }

    // Recalculate totals
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate(
      'items.product',
      'title images price stock slug store'
    );

    res.json({ success: true, data: populatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add to cart' });
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const item = cart.items.find((i) => i._id?.toString() === itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i._id?.toString() !== itemId);
    } else {
      const product = await Product.findById(item.product);
      if (product && product.stock < quantity) {
        return res.status(400).json({ success: false, message: 'Insufficient stock' });
      }
      item.quantity = quantity;
    }

    cart.totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update cart' });
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = cart.items.filter((i) => i._id?.toString() !== itemId);
    cart.totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove item' });
  }
};

export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.user?._id });
    if (cart) {
      cart.items = [];
      cart.totalItems = 0;
      cart.totalPrice = 0;
      cart.discount = 0;
      cart.coupon = undefined;
      await cart.save();
    }
    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to clear cart' });
  }
};
