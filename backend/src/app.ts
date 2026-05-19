import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { sanitizeInput, additionalSecurityHeaders } from './middleware/security';
import { requestLogger, getMetrics } from './middleware/logger';
import { generateCsrfToken } from './middleware/security';

// Route imports
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import reviewRoutes from './routes/review.routes';
import wishlistRoutes from './routes/wishlist.routes';
import discountRoutes from './routes/discount.routes';
import couponRoutes from './routes/coupon.routes';
import sellerRoutes from './routes/seller.routes';
import adminRoutes from './routes/admin.routes';
import uploadRoutes from './routes/upload.routes';
import notificationRoutes from './routes/notification.routes';
import messageRoutes from './routes/message.routes';
import bannerRoutes from './routes/banner.routes';
import searchRoutes from './routes/search.routes';
import paymentRoutes from './routes/payment.routes';
import recommendationRoutes from './routes/recommendation.routes';
import analyticsRoutes from './routes/analytics.routes';
import aiRoutes from './routes/ai.routes';
import loyaltyRoutes from './routes/loyalty.routes';
import bulkRoutes from './routes/bulk.routes';

const app = express();

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());

// Structured logging & observability
app.use(requestLogger);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security hardening
app.use(additionalSecurityHeaders);
app.use(sanitizeInput);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/loyalty', loyaltyRoutes);
app.use('/api/bulk', bulkRoutes);

// Health check + Metrics + CSRF
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '2.0.0' });
});
app.get('/api/metrics', getMetrics);
app.get('/api/csrf-token', generateCsrfToken);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
