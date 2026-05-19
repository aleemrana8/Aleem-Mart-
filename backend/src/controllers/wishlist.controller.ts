import { Response } from 'express';
import Wishlist from '../models/Wishlist';
import { AuthRequest } from '../middleware/auth';

export const getWishlist = async (req: AuthRequest, res: Response) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user?._id }).populate(
      'products',
      'title slug images price comparePrice rating store'
    );

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user?._id, products: [] });
    }

    res.json({ success: true, data: wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch wishlist' });
  }
};

export const addToWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: req.user?._id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user?._id, products: [] });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    res.json({ success: true, data: wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add to wishlist' });
  }
};

export const removeFromWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user?._id });
    if (wishlist) {
      wishlist.products = wishlist.products.filter((p) => p.toString() !== productId);
      await wishlist.save();
    }

    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove from wishlist' });
  }
};
