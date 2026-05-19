/**
 * Job Queue System - Async task processing
 * Production: Replace with BullMQ + Redis
 * 
 * Handles:
 * - Email sending
 * - Image processing
 * - Analytics aggregation
 * - Notification dispatch
 * - Inventory sync
 * - Report generation
 */

type JobHandler = (data: any) => Promise<void>;
type JobStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'retrying';

interface Job {
  id: string;
  queue: string;
  data: any;
  status: JobStatus;
  attempts: number;
  maxAttempts: number;
  createdAt: Date;
  processedAt?: Date;
  completedAt?: Date;
  error?: string;
  priority: number;
}

class JobQueue {
  private queues = new Map<string, Job[]>();
  private handlers = new Map<string, JobHandler>();
  private processing = false;
  private processInterval: NodeJS.Timeout | null = null;
  private stats = { processed: 0, failed: 0, pending: 0 };

  /**
   * Register a job handler for a queue
   */
  register(queueName: string, handler: JobHandler): void {
    this.handlers.set(queueName, handler);
    if (!this.queues.has(queueName)) {
      this.queues.set(queueName, []);
    }
  }

  /**
   * Add a job to a queue
   */
  add(queueName: string, data: any, options?: { priority?: number; maxAttempts?: number }): string {
    const job: Job = {
      id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
      queue: queueName,
      data,
      status: 'pending',
      attempts: 0,
      maxAttempts: options?.maxAttempts || 3,
      createdAt: new Date(),
      priority: options?.priority || 0,
    };

    const queue = this.queues.get(queueName) || [];
    queue.push(job);
    // Sort by priority (higher = first)
    queue.sort((a, b) => b.priority - a.priority);
    this.queues.set(queueName, queue);
    this.stats.pending++;

    return job.id;
  }

  /**
   * Start processing jobs
   */
  start(intervalMs: number = 1000): void {
    if (this.processInterval) return;
    this.processInterval = setInterval(() => this.processNext(), intervalMs);
    console.log('📋 Job Queue started');
  }

  /**
   * Stop processing
   */
  stop(): void {
    if (this.processInterval) {
      clearInterval(this.processInterval);
      this.processInterval = null;
    }
  }

  /**
   * Process next pending job across all queues
   */
  private async processNext(): Promise<void> {
    if (this.processing) return;
    this.processing = true;

    try {
      for (const [queueName, jobs] of this.queues.entries()) {
        const pendingJob = jobs.find((j) => j.status === 'pending' || j.status === 'retrying');
        if (!pendingJob) continue;

        const handler = this.handlers.get(queueName);
        if (!handler) continue;

        pendingJob.status = 'processing';
        pendingJob.processedAt = new Date();
        pendingJob.attempts++;

        try {
          await handler(pendingJob.data);
          pendingJob.status = 'completed';
          pendingJob.completedAt = new Date();
          this.stats.processed++;
          this.stats.pending--;
        } catch (error: any) {
          if (pendingJob.attempts >= pendingJob.maxAttempts) {
            pendingJob.status = 'failed';
            pendingJob.error = error.message;
            this.stats.failed++;
            this.stats.pending--;
          } else {
            pendingJob.status = 'retrying';
            pendingJob.error = error.message;
          }
        }

        break; // Process one job per tick
      }
    } finally {
      this.processing = false;
    }

    // Cleanup completed jobs older than 1 hour
    const oneHourAgo = Date.now() - 3600000;
    for (const [name, jobs] of this.queues.entries()) {
      this.queues.set(name, jobs.filter(
        (j) => j.status !== 'completed' || (j.completedAt && j.completedAt.getTime() > oneHourAgo)
      ));
    }
  }

  /**
   * Get queue statistics
   */
  getStats() {
    const queueStats: Record<string, { pending: number; processing: number; completed: number; failed: number }> = {};
    for (const [name, jobs] of this.queues.entries()) {
      queueStats[name] = {
        pending: jobs.filter((j) => j.status === 'pending' || j.status === 'retrying').length,
        processing: jobs.filter((j) => j.status === 'processing').length,
        completed: jobs.filter((j) => j.status === 'completed').length,
        failed: jobs.filter((j) => j.status === 'failed').length,
      };
    }
    return { ...this.stats, queues: queueStats };
  }
}

// Singleton instance
export const jobQueue = new JobQueue();

// === Pre-registered job handlers ===

// Email sending queue
jobQueue.register('email', async (data: { to: string; subject: string; html: string }) => {
  // Production: Use nodemailer transport
  console.log(`📧 Sending email to ${data.to}: ${data.subject}`);
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 100));
});

// Notification dispatch queue
jobQueue.register('notification', async (data: { userId: string; type: string; message: string }) => {
  console.log(`🔔 Notification to ${data.userId}: ${data.message}`);
  await new Promise((resolve) => setTimeout(resolve, 50));
});

// Analytics aggregation queue
jobQueue.register('analytics', async (data: { event: string; payload: any }) => {
  console.log(`📊 Analytics event: ${data.event}`);
  await new Promise((resolve) => setTimeout(resolve, 50));
});

// Image processing queue
jobQueue.register('image-processing', async (data: { url: string; sizes: number[] }) => {
  console.log(`🖼️ Processing image: ${data.url} into ${data.sizes.length} sizes`);
  await new Promise((resolve) => setTimeout(resolve, 200));
});

// Inventory sync queue
jobQueue.register('inventory-sync', async (data: { productId: string; action: string; quantity: number }) => {
  console.log(`📦 Inventory sync: ${data.action} ${data.quantity} for ${data.productId}`);
  await new Promise((resolve) => setTimeout(resolve, 100));
});

// Start processing on import
jobQueue.start();
