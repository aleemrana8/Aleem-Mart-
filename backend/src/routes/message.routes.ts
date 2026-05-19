import { Router } from 'express';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);

router.get('/conversations', (req, res) => {
  res.json({ success: true, data: [], message: 'Get conversations endpoint' });
});

router.get('/conversations/:id', (req, res) => {
  res.json({ success: true, data: [], message: 'Get messages endpoint' });
});

router.post('/send', (req, res) => {
  res.json({ success: true, message: 'Send message endpoint' });
});

export default router;
