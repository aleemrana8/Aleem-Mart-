import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import {
  bulkUpdatePrices,
  bulkUpdateStock,
  bulkChangeStatus,
  bulkApplyDiscount,
  getOperationStatus,
  exportProducts,
} from '../services/bulk.service';

const router = Router();

// All routes require seller role
router.use(protect, authorize('seller'));

// Bulk price updates
router.post('/prices', bulkUpdatePrices);

// Bulk stock updates
router.post('/stock', bulkUpdateStock);

// Bulk status changes (active/draft/paused/archived)
router.post('/status', bulkChangeStatus);

// Bulk discount application
router.post('/discount', bulkApplyDiscount);

// Check operation status
router.get('/operations/:operationId', getOperationStatus);

// Export products to CSV/XLSX
router.get('/export', exportProducts);

export default router;
