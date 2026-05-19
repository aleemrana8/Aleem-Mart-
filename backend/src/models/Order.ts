import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  store: mongoose.Types.ObjectId;
  title: string;
  image: string;
  variant?: string;
  quantity: number;
  price: number;
  total: number;
  status: 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'returned' | 'refunded';
  trackingNumber?: string;
  shippedAt?: Date;
  deliveredAt?: Date;
}

export interface IOrder extends Document {
  orderNumber: string;
  buyer: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  paymentMethod: 'stripe' | 'cod' | 'jazzcash' | 'easypaisa';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string;
  subtotal: number;
  shippingFee: number;
  tax: number;
  discount: number;
  total: number;
  coupon?: mongoose.Types.ObjectId;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned' | 'refunded';
  notes?: string;
  cancelReason?: string;
  returnReason?: string;
  estimatedDelivery?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  variant: { type: String },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled', 'returned', 'refunded'],
    default: 'pending',
  },
  trackingNumber: String,
  shippedAt: Date,
  deliveredAt: Date,
});

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ['stripe', 'cod', 'jazzcash', 'easypaisa'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentId: String,
    subtotal: { type: Number, required: true, min: 0 },
    shippingFee: { type: Number, default: 0, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    coupon: { type: Schema.Types.ObjectId, ref: 'Coupon' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned', 'refunded'],
      default: 'pending',
    },
    notes: String,
    cancelReason: String,
    returnReason: String,
    estimatedDelivery: Date,
    deliveredAt: Date,
    cancelledAt: Date,
  },
  { timestamps: true }
);

orderSchema.index({ orderNumber: 1 });
orderSchema.index({ buyer: 1, createdAt: -1 });
orderSchema.index({ 'items.seller': 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });

export default mongoose.model<IOrder>('Order', orderSchema);
