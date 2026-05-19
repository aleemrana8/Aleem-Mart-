import { Router } from 'express';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);

router.get('/', (req, res) => {
  res.json({ success: true, data: [], message: 'Get notifications endpoint' });
});

router.put('/:id/read', (req, res) => {
  res.json({ success: true, message: 'Mark notification as read' });
});

router.put('/read-all', (req, res) => {
  res.json({ success: true, message: 'Mark all notifications as read' });
});

export default router;
