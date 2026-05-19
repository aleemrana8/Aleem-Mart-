import { Router } from 'express';
import { getProductReviews, createReview, replyToReview } from '../controllers/review.controller';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/product/:productId', getProductReviews);
router.post('/', protect, createReview);
router.put('/:id/reply', protect, authorize('seller'), replyToReview);

export default router;
