import { Response } from 'express';
import Product from '../models/Product';
import '../models/Store';
import '../models/Category';
import { AuthRequest } from '../middleware/auth';
import { generateSlug, generateSKU, paginate, buildPaginationResponse } from '../utils/helpers';

export const getProducts = async (req: AuthRequest, res: Response) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      subcategory,
      brand,
      minPrice,
      maxPrice,
      rating,
      sort = '-createdAt',
      search,
      seller,
      status,
    } = req.query;

    const filter: Record<string, any> = { isActive: true, status: 'active' };

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (brand) filter.brand = brand;
    if (seller === 'me' && req.user?._id) {
      filter.seller = req.user._id;
      delete filter.isActive;
      delete filter.status;
    } else if (seller) {
      filter.seller = seller;
    }
    if (status) filter.status = status;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (rating) filter.rating = { $gte: Number(rating) };
    if (search) {
      filter.$text = { $search: search as string };
    }

    const { skip, limit: limitNum } = paginate(Number(page), Number(limit));

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug')
        .populate('store', 'name slug logo')
        .sort(sort as string)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: buildPaginationResponse(total, Number(page), limitNum),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};

export const getProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true })
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug')
      .populate('store', 'name slug logo rating totalReviews')
      .populate('seller', 'firstName lastName');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const slug = generateSlug(req.body.title);
    const sku = req.body.sku || generateSKU(req.body.title.substring(0, 3));

    const product = await Product.create({
      ...req.body,
      seller: req.user?._id,
      slug,
      sku,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create product', error });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, seller: req.user?._id });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    Object.assign(product, req.body);
    await product.save();

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, seller: req.user?._id },
      { isActive: false, status: 'inactive' },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
};

export const getFeaturedProducts = async (req: AuthRequest, res: Response) => {
  try {
    const products = await Product.find({ isFeatured: true, isActive: true, status: 'active' })
      .populate('store', 'name slug logo')
      .sort('-createdAt')
      .limit(12)
      .lean();

    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch featured products' });
  }
};

export const getBestSellers = async (req: AuthRequest, res: Response) => {
  try {
    const products = await Product.find({ isActive: true, status: 'active' })
      .populate('store', 'name slug logo')
      .sort('-totalSold')
      .limit(12)
      .lean();

    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch best sellers' });
  }
};

export const getNewArrivals = async (req: AuthRequest, res: Response) => {
  try {
    const products = await Product.find({ isActive: true, status: 'active' })
      .populate('store', 'name slug logo')
      .sort('-createdAt')
      .limit(12)
      .lean();

    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch new arrivals' });
  }
};
