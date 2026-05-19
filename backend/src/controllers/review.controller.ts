import { Response } from 'express';
import Review from '../models/Review';
import Product from '../models/Product';
import Order from '../models/Order';
import { AuthRequest } from '../middleware/auth';
import { paginate, buildPaginationResponse } from '../utils/helpers';

export const getProductReviews = async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 10, rating, sort = '-createdAt' } = req.query;
    const filter: Record<string, any> = { product: req.params.productId, isApproved: true };
    if (rating) filter.rating = Number(rating);

    const { skip, limit: limitNum } = paginate(Number(page), Number(limit));

    const [reviews, total] = await Promise.all([
      Review.find(filter)
        .populate('user', 'firstName lastName avatar')
        .sort(sort as string)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Review.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: reviews,
      pagination: buildPaginationResponse(total, Number(page), limitNum),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
};

export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, orderId, rating, title, comment, images } = req.body;

    // Verify purchase
    const order = await Order.findOne({
      _id: orderId,
      buyer: req.user?._id,
      'items.product': productId,
      status: 'delivered',
    });

    if (!order) {
      return res.status(400).json({ success: false, message: 'You can only review delivered orders' });
    }

    // Check if already reviewed
    const existingReview = await Review.findOne({
      product: productId,
      user: req.user?._id,
      order: orderId,
    });

    if (existingReview) {
      return res.status(400).json({ success: false, message: 'Already reviewed this product' });
    }

    const review = await Review.create({
      product: productId,
      user: req.user?._id,
      order: orderId,
      rating,
      title,
      comment,
      images,
      isVerifiedPurchase: true,
    });

    // Update product rating
    const reviews = await Review.find({ product: productId, isApproved: true });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(avgRating * 10) / 10,
      totalReviews: reviews.length,
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create review' });
  }
};

export const replyToReview = async (req: AuthRequest, res: Response) => {
  try {
    const review = await Review.findById(req.params.id).populate('product', 'seller');

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    const product = await Product.findById(review.product);
    if (product?.seller.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    review.sellerReply = {
      message: req.body.message,
      repliedAt: new Date(),
    };
    await review.save();

    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to reply to review' });
  }
};
