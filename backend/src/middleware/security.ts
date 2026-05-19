import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

/**
 * Security middleware collection
 * Implements OWASP best practices for API security
 */

// CSRF Protection via Double-Submit Cookie pattern
export function csrfProtection(req: Request, res: Response, next: NextFunction) {
  // Skip for GET, HEAD, OPTIONS (safe methods)
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // Skip for API calls with Bearer token (mobile/SPA)
  if (req.headers.authorization?.startsWith('Bearer')) {
    return next();
  }

  const cookieToken = req.cookies?.['csrf-token'];
  const headerToken = req.headers['x-csrf-token'] as string;

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({ success: false, message: 'CSRF validation failed' });
  }

  next();
}

// Generate CSRF token endpoint
export function generateCsrfToken(req: Request, res: Response) {
  const token = crypto.randomBytes(32).toString('hex');
  res.cookie('csrf-token', token, {
    httpOnly: false, // Client needs to read it
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600000, // 1 hour
  });
  res.json({ success: true, token });
}

// Request sanitization - strip dangerous characters from inputs
export function sanitizeInput(req: Request, _res: Response, next: NextFunction) {
  if (req.body && typeof req.body === 'object') {
    sanitizeObject(req.body);
  }
  if (req.query && typeof req.query === 'object') {
    sanitizeObject(req.query as Record<string, any>);
  }
  next();
}

function sanitizeObject(obj: Record<string, any>): void {
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'string') {
      // Remove NoSQL injection patterns
      obj[key] = obj[key].replace(/[\$]/g, '');
      // Remove potential script injection
      obj[key] = obj[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Reject $gt, $lt, $ne etc. in objects (NoSQL injection)
      const keys = Object.keys(obj[key]);
      if (keys.some(k => k.startsWith('$'))) {
        obj[key] = {};
      } else {
        sanitizeObject(obj[key]);
      }
    }
  }
}

// Security headers beyond what Helmet provides
export function additionalSecurityHeaders(_req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
}

// Request size limiter per content type
export function requestSizeLimiter(req: Request, res: Response, next: NextFunction) {
  const contentLength = parseInt(req.headers['content-length'] || '0');
  const maxSizes: Record<string, number> = {
    'application/json': 1048576, // 1MB
    'multipart/form-data': 10485760, // 10MB (file uploads)
  };
  
  const contentType = req.headers['content-type']?.split(';')[0] || '';
  const maxSize = maxSizes[contentType] || 1048576;
  
  if (contentLength > maxSize) {
    return res.status(413).json({ success: false, message: 'Request body too large' });
  }
  next();
}

// IP-based abuse detection
const requestCounts = new Map<string, { count: number; resetAt: number }>();

export function abuseDetection(maxRequests: number = 1000, windowMs: number = 60000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const entry = requestCounts.get(ip);

    if (!entry || now > entry.resetAt) {
      requestCounts.set(ip, { count: 1, resetAt: now + windowMs });
      return next();
    }

    entry.count++;
    if (entry.count > maxRequests) {
      res.setHeader('Retry-After', Math.ceil((entry.resetAt - now) / 1000));
      return res.status(429).json({ success: false, message: 'Too many requests. Slow down.' });
    }

    next();
  };
}
