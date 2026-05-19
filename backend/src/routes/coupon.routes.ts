import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/validate/:code', protect, (req, res) => {
  res.json({ success: true, message: 'Validate coupon endpoint' });
});

router.get('/', protect, authorize('seller', 'admin'), (req, res) => {
  res.json({ success: true, message: 'Get coupons endpoint' });
});

router.post('/', protect, authorize('seller', 'admin'), (req, res) => {
  res.json({ success: true, message: 'Create coupon endpoint' });
});

router.put('/:id', protect, authorize('seller', 'admin'), (req, res) => {
  res.json({ success: true, message: 'Update coupon endpoint' });
});

router.delete('/:id', protect, authorize('seller', 'admin'), (req, res) => {
  res.json({ success: true, message: 'Delete coupon endpoint' });
});

export default router;
