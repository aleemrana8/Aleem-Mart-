import { Request, Response, NextFunction } from 'express';

/**
 * Structured logging middleware
 * Production: Replace with Winston/Pino + ELK/Datadog
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  requestId: string;
  method: string;
  url: string;
  statusCode?: number;
  responseTime?: number;
  userId?: string;
  ip: string;
  userAgent: string;
  error?: string;
}

// In-memory log buffer for metrics (production: stream to log service)
const recentLogs: LogEntry[] = [];
const MAX_LOG_BUFFER = 1000;

function generateRequestId(): string {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 6)}`;
}

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();
  const requestId = generateRequestId();

  // Attach request ID to request for downstream use
  (req as any).requestId = requestId;
  res.setHeader('X-Request-Id', requestId);

  // Log on response finish
  res.on('finish', () => {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: res.statusCode >= 500 ? LogLevel.ERROR : res.statusCode >= 400 ? LogLevel.WARN : LogLevel.INFO,
      requestId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: Date.now() - startTime,
      userId: (req as any).user?.id,
      ip: req.ip || req.socket.remoteAddress || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown',
    };

    // Buffer for metrics
    recentLogs.push(entry);
    if (recentLogs.length > MAX_LOG_BUFFER) recentLogs.shift();

    // Structured console output
    const color = entry.statusCode && entry.statusCode >= 500 ? '\x1b[31m' : entry.statusCode && entry.statusCode >= 400 ? '\x1b[33m' : '\x1b[32m';
    console.log(`${color}[${entry.level}]\x1b[0m ${entry.method} ${entry.url} ${entry.statusCode} ${entry.responseTime}ms [${requestId}]`);
  });

  next();
}

// Metrics endpoint for monitoring
export function getMetrics(_req: Request, res: Response) {
  const now = Date.now();
  const last5Min = recentLogs.filter((log) => now - new Date(log.timestamp).getTime() < 300000);

  const metrics = {
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    requests: {
      total: recentLogs.length,
      last5Min: last5Min.length,
      avgResponseTime: last5Min.length > 0
        ? Math.round(last5Min.reduce((sum, log) => sum + (log.responseTime || 0), 0) / last5Min.length)
        : 0,
      errorRate: last5Min.length > 0
        ? Math.round((last5Min.filter((l) => (l.statusCode || 0) >= 500).length / last5Min.length) * 100 * 10) / 10
        : 0,
      statusCodes: {
        '2xx': last5Min.filter((l) => (l.statusCode || 0) >= 200 && (l.statusCode || 0) < 300).length,
        '3xx': last5Min.filter((l) => (l.statusCode || 0) >= 300 && (l.statusCode || 0) < 400).length,
        '4xx': last5Min.filter((l) => (l.statusCode || 0) >= 400 && (l.statusCode || 0) < 500).length,
        '5xx': last5Min.filter((l) => (l.statusCode || 0) >= 500).length,
      },
    },
    topEndpoints: getTopEndpoints(last5Min),
    slowestEndpoints: getSlowestEndpoints(last5Min),
  };

  res.json({ success: true, data: metrics });
}

function getTopEndpoints(logs: LogEntry[]): Array<{ endpoint: string; count: number }> {
  const counts = new Map<string, number>();
  logs.forEach((log) => {
    const key = `${log.method} ${log.url.split('?')[0]}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([endpoint, count]) => ({ endpoint, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

function getSlowestEndpoints(logs: LogEntry[]): Array<{ endpoint: string; avgTime: number }> {
  const times = new Map<string, number[]>();
  logs.forEach((log) => {
    if (!log.responseTime) return;
    const key = `${log.method} ${log.url.split('?')[0]}`;
    if (!times.has(key)) times.set(key, []);
    times.get(key)!.push(log.responseTime);
  });
  return Array.from(times.entries())
    .map(([endpoint, t]) => ({ endpoint, avgTime: Math.round(t.reduce((s, v) => s + v, 0) / t.length) }))
    .sort((a, b) => b.avgTime - a.avgTime)
    .slice(0, 10);
}
