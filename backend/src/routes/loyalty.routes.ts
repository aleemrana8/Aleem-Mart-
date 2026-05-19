import { Router } from 'express';
import { protect } from '../middleware/auth';
import { getLoyaltyProfile, earnPoints, redeemPoints, getLeaderboard } from '../services/loyalty.service';

const router = Router();

// Get user's loyalty profile (points, tier, badges)
router.get('/profile', protect, getLoyaltyProfile);

// Earn points (called after purchase, review, etc.)
router.post('/earn', protect, earnPoints);

// Redeem points for discounts/free shipping
router.post('/redeem', protect, redeemPoints);

// Public leaderboard
router.get('/leaderboard', getLeaderboard);

export default router;
