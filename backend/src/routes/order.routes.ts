import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getOrder,
  cancelOrder,
  getSellerOrders,
  updateOrderItemStatus,
} from '../controllers/order.controller';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.use(protect);

router.post('/', createOrder);
router.get('/my-orders', getMyOrders);
router.get('/:id', getOrder);
router.put('/:id/cancel', cancelOrder);

// Seller routes
router.get('/seller/orders', authorize('seller', 'admin'), getSellerOrders);
router.put('/:orderId/items/:itemId/status', authorize('seller', 'admin'), updateOrderItemStatus);

export default router;
