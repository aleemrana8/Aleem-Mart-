// Event-Driven Architecture - Core Event Bus
import { EventEmitter } from 'events';

export enum EventType {
  // Order Events
  ORDER_CREATED = 'order.created',
  ORDER_CONFIRMED = 'order.confirmed',
  ORDER_PACKED = 'order.packed',
  ORDER_SHIPPED = 'order.shipped',
  ORDER_DELIVERED = 'order.delivered',
  ORDER_CANCELLED = 'order.cancelled',
  ORDER_RETURNED = 'order.returned',

  // Payment Events
  PAYMENT_INITIATED = 'payment.initiated',
  PAYMENT_SUCCESS = 'payment.success',
  PAYMENT_FAILED = 'payment.failed',
  REFUND_INITIATED = 'refund.initiated',
  REFUND_COMPLETED = 'refund.completed',

  // Product Events
  PRODUCT_CREATED = 'product.created',
  PRODUCT_UPDATED = 'product.updated',
  PRODUCT_VIEWED = 'product.viewed',
  PRODUCT_PURCHASED = 'product.purchased',

  // Inventory Events
  INVENTORY_LOW = 'inventory.low',
  INVENTORY_UPDATED = 'inventory.updated',
  INVENTORY_RESERVED = 'inventory.reserved',
  INVENTORY_RELEASED = 'inventory.released',

  // User Events
  USER_REGISTERED = 'user.registered',
  USER_VERIFIED = 'user.verified',
  SELLER_APPROVED = 'seller.approved',
  SELLER_REJECTED = 'seller.rejected',

  // Cart Events
  CART_UPDATED = 'cart.updated',
  CART_ABANDONED = 'cart.abandoned',

  // Review Events
  REVIEW_CREATED = 'review.created',
  REVIEW_REPORTED = 'review.reported',

  // AI Events
  RECOMMENDATION_REQUESTED = 'ai.recommendation.requested',
  SEARCH_PERFORMED = 'ai.search.performed',
  ANALYTICS_EVENT = 'analytics.event',

  // Notification Events
  NOTIFICATION_SEND = 'notification.send',
  NOTIFICATION_BULK = 'notification.bulk',
}

export interface DomainEvent {
  id: string;
  type: EventType;
  payload: Record<string, any>;
  metadata: {
    userId?: string;
    sellerId?: string;
    timestamp: Date;
    correlationId: string;
    source: string;
  };
}

class EventBus extends EventEmitter {
  private static instance: EventBus;

  private constructor() {
    super();
    this.setMaxListeners(100);
  }

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  publish(event: DomainEvent): void {
    console.log(`[EventBus] Publishing: ${event.type}`, {
      id: event.id,
      correlationId: event.metadata.correlationId,
    });
    this.emit(event.type, event);
    this.emit('*', event); // Wildcard for analytics/logging
  }

  subscribe(eventType: EventType, handler: (event: DomainEvent) => void): void {
    this.on(eventType, handler);
  }

  subscribeAll(handler: (event: DomainEvent) => void): void {
    this.on('*', handler);
  }
}

export const eventBus = EventBus.getInstance();

// Helper to create events
export function createEvent(
  type: EventType,
  payload: Record<string, any>,
  metadata: Partial<DomainEvent['metadata']> = {}
): DomainEvent {
  return {
    id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    payload,
    metadata: {
      timestamp: new Date(),
      correlationId: metadata.correlationId || `cor_${Date.now()}`,
      source: metadata.source || 'api',
      userId: metadata.userId,
      sellerId: metadata.sellerId,
    },
  };
}
