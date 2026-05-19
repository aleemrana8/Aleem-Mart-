import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.use(protect);

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Get discounts endpoint' });
});

router.post('/', authorize('seller', 'admin'), (req, res) => {
  res.json({ success: true, message: 'Create discount endpoint' });
});

router.put('/:id', authorize('seller', 'admin'), (req, res) => {
  res.json({ success: true, message: 'Update discount endpoint' });
});

router.delete('/:id', authorize('seller', 'admin'), (req, res) => {
  res.json({ success: true, message: 'Delete discount endpoint' });
});

export default router;
