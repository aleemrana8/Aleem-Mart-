import { Request, Response } from 'express';
import Category from '../models/Category';
import { AuthRequest } from '../middleware/auth';
import { generateSlug } from '../utils/helpers';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const { parent, active } = req.query;
    const filter: Record<string, any> = {};

    if (parent === 'null' || parent === '') {
      filter.parent = null;
    } else if (parent) {
      filter.parent = parent;
    }

    if (active !== undefined) {
      filter.isActive = active === 'true';
    } else {
      filter.isActive = true;
    }

    const categories = await Category.find(filter)
      .populate('parent', 'name slug')
      .sort('sortOrder name')
      .lean();

    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
};

export const getCategoryTree = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ isActive: true }).sort('sortOrder name').lean();

    // Build tree
    const tree = categories
      .filter((c) => !c.parent)
      .map((parent) => ({
        ...parent,
        children: categories.filter((c) => c.parent?.toString() === parent._id.toString()),
      }));

    res.json({ success: true, data: tree });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch category tree' });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })
      .populate('parent', 'name slug');

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Get subcategories
    const subcategories = await Category.find({ parent: category._id, isActive: true })
      .sort('sortOrder name')
      .lean();

    res.json({ success: true, data: { ...category.toObject(), subcategories } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch category' });
  }
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const slug = generateSlug(req.body.name);
    const level = req.body.parent ? 1 : 0;

    const category = await Category.create({ ...req.body, slug, level });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create category', error });
  }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update category' });
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, { isActive: false });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
};
