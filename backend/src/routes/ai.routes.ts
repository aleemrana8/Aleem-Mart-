import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import {
  generateProductDescription,
  summarizeReviews,
  getPricingSuggestions,
  getSalesForecast,
  getInventoryPrediction,
  getCustomerSegments,
} from '../services/ai.service';

const router = Router();

// Seller - AI product description generator
router.post('/generate-description', protect, authorize('seller'), generateProductDescription);

// Public - AI review summary
router.get('/reviews/:productId/summary', summarizeReviews);

// Seller - AI pricing suggestions
router.get('/pricing/:productId', protect, authorize('seller'), getPricingSuggestions);

// Seller - AI sales forecasting
router.get('/forecast', protect, authorize('seller'), getSalesForecast);

// Seller - AI inventory prediction
router.get('/inventory-prediction', protect, authorize('seller'), getInventoryPrediction);

// Seller - AI customer segmentation
router.get('/customer-segments', protect, authorize('seller'), getCustomerSegments);

export default router;
