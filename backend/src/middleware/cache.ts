import { Request, Response, NextFunction } from 'express';

/**
 * In-memory cache layer (Production: Redis)
 * Provides response caching for expensive API calls
 */

interface CacheEntry {
  data: any;
  expiry: number;
  etag: string;
}

class CacheStore {
  private store = new Map<string, CacheEntry>();
  private maxSize = 1000;

  set(key: string, data: any, ttlSeconds: number): string {
    // LRU eviction when cache is full
    if (this.store.size >= this.maxSize) {
      const firstKey = this.store.keys().next().value;
      if (firstKey) this.store.delete(firstKey);
    }

    const etag = this.generateEtag(data);
    this.store.set(key, {
      data,
      expiry: Date.now() + ttlSeconds * 1000,
      etag,
    });
    return etag;
  }

  get(key: string): CacheEntry | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      this.store.delete(key);
      return null;
    }
    return entry;
  }

  invalidate(pattern: string): void {
    for (const key of this.store.keys()) {
      if (key.includes(pattern)) {
        this.store.delete(key);
      }
    }
  }

  clear(): void {
    this.store.clear();
  }

  get size(): number {
    return this.store.size;
  }

  private generateEtag(data: any): string {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return `"${Math.abs(hash).toString(36)}"`;
  }
}

export const cacheStore = new CacheStore();

/**
 * Cache middleware factory
 * @param ttl - Time to live in seconds
 * @param keyGenerator - Custom key generation function
 */
export function cacheMiddleware(ttl: number = 60, keyGenerator?: (req: Request) => string) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests
    if (req.method !== 'GET') return next();

    const key = keyGenerator ? keyGenerator(req) : `${req.originalUrl}`;
    const cached = cacheStore.get(key);

    if (cached) {
      // Check If-None-Match header for 304 responses
      const clientEtag = req.headers['if-none-match'];
      if (clientEtag === cached.etag) {
        return res.status(304).end();
      }

      res.setHeader('X-Cache', 'HIT');
      res.setHeader('ETag', cached.etag);
      res.setHeader('Cache-Control', `public, max-age=${ttl}`);
      return res.json(cached.data);
    }

    // Override res.json to intercept response
    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const etag = cacheStore.set(key, body, ttl);
        res.setHeader('X-Cache', 'MISS');
        res.setHeader('ETag', etag);
        res.setHeader('Cache-Control', `public, max-age=${ttl}`);
      }
      return originalJson(body);
    };

    next();
  };
}

/**
 * Cache invalidation middleware - call after mutations
 */
export function invalidateCache(...patterns: string[]) {
  return (_req: Request, _res: Response, next: NextFunction) => {
    patterns.forEach((pattern) => cacheStore.invalidate(pattern));
    next();
  };
}
