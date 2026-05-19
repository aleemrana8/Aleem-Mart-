import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import multer from 'multer';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

router.post('/image', protect, upload.single('image'), (req, res) => {
  // In production, upload to Cloudinary
  res.json({ success: true, message: 'Image upload endpoint', data: { url: '' } });
});

router.post('/images', protect, upload.array('images', 10), (req, res) => {
  res.json({ success: true, message: 'Multiple images upload endpoint', data: { urls: [] } });
});

export default router;
