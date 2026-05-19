import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import {
  getPersonalizedHomepage,
  getSimilarProducts,
  getFrequentlyBoughtTogether,
  trackUserEvent,
  getAISearchSuggestions,
  getSellerInsights,
} from '../services/recommendation.service';

const router = Router();

// Public - personalized homepage (works with/without auth)
router.get('/homepage', getPersonalizedHomepage);

// Public - similar products
router.get('/similar/:productId', getSimilarProducts);

// Public - frequently bought together
router.get('/together/:productId', getFrequentlyBoughtTogether);

// Public - AI search suggestions
router.get('/search-suggestions', getAISearchSuggestions);

// Protected - track user behavior events
router.post('/track', protect, trackUserEvent);

// Seller - AI business insights
router.get('/seller-insights', protect, authorize('seller'), getSellerInsights);

export default router;
