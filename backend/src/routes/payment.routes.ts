import { Router } from 'express';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/create-intent', protect, (req, res) => {
  res.json({ success: true, message: 'Create payment intent endpoint' });
});

router.post('/webhook', (req, res) => {
  res.json({ success: true, message: 'Payment webhook endpoint' });
});

router.get('/methods', protect, (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 'stripe', name: 'Credit/Debit Card', enabled: true },
      { id: 'cod', name: 'Cash on Delivery', enabled: true },
      { id: 'jazzcash', name: 'JazzCash', enabled: true },
      { id: 'easypaisa', name: 'Easypaisa', enabled: true },
    ],
  });
});

export default router;
