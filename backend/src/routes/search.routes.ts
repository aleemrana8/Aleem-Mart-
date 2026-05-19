import { Router } from 'express';
import Product from '../models/Product';
import { advancedSearch, searchAutocomplete, getSearchTrending } from '../services/search.service';
import { cacheMiddleware } from '../middleware/cache';

const router = Router();

// Advanced faceted search with AI relevance
router.get('/advanced', cacheMiddleware(30), advancedSearch);

// Smart autocomplete with products, categories, sellers
router.get('/autocomplete', cacheMiddleware(10), searchAutocomplete);

// Trending searches
router.get('/trending', cacheMiddleware(60), getSearchTrending);

router.get('/', async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, rating, sort = 'relevance', page = 1, limit = 20 } = req.query;

    if (!q) {
      return res.status(400).json({ success: false, message: 'Search query required' });
    }

    const filter: Record<string, any> = {
      $text: { $search: q as string },
      isActive: true,
      status: 'active',
    };

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (rating) filter.rating = { $gte: Number(rating) };

    let sortOption: Record<string, any> = {};
    switch (sort) {
      case 'price_asc': sortOption = { price: 1 }; break;
      case 'price_desc': sortOption = { price: -1 }; break;
      case 'rating': sortOption = { rating: -1 }; break;
      case 'newest': sortOption = { createdAt: -1 }; break;
      case 'popular': sortOption = { totalSold: -1 }; break;
      default: sortOption = { score: { $meta: 'textScore' } };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filter, { score: { $meta: 'textScore' } })
        .populate('category', 'name slug')
        .populate('store', 'name slug logo')
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Search failed' });
  }
});

// Suggestions/autocomplete
router.get('/suggestions', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || (q as string).length < 2) {
      return res.json({ success: true, data: [] });
    }

    const products = await Product.find(
      { title: { $regex: q, $options: 'i' }, isActive: true },
      { title: 1, slug: 1, images: 1, price: 1 }
    ).limit(8).lean();

    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Suggestions failed' });
  }
});

export default router;
