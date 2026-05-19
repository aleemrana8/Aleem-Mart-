import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', (req, res) => {
  res.json({ success: true, data: [], message: 'Get banners endpoint' });
});

router.post('/', protect, authorize('admin'), (req, res) => {
  res.json({ success: true, message: 'Create banner endpoint' });
});

router.put('/:id', protect, authorize('admin'), (req, res) => {
  res.json({ success: true, message: 'Update banner endpoint' });
});

router.delete('/:id', protect, authorize('admin'), (req, res) => {
  res.json({ success: true, message: 'Delete banner endpoint' });
});

export default router;
