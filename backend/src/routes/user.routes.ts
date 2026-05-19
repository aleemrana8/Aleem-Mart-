import { Router } from 'express';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Get user profile endpoint' });
});

router.put('/profile', (req, res) => {
  res.json({ success: true, message: 'Update profile endpoint' });
});

router.put('/password', (req, res) => {
  res.json({ success: true, message: 'Change password endpoint' });
});

router.post('/address', (req, res) => {
  res.json({ success: true, message: 'Add address endpoint' });
});

router.put('/address/:id', (req, res) => {
  res.json({ success: true, message: 'Update address endpoint' });
});

router.delete('/address/:id', (req, res) => {
  res.json({ success: true, message: 'Delete address endpoint' });
});

export default router;
