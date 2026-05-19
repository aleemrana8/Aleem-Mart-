import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import { getPlatformAnalytics, getSellerAnalytics } from '../services/analytics.service';

const router = Router();

// Admin - platform-wide analytics
router.get('/platform', protect, authorize('admin'), getPlatformAnalytics);

// Seller - seller-specific analytics  
router.get('/seller', protect, authorize('seller'), getSellerAnalytics);

export default router;
