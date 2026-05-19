import mongoose, { Schema, Document } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  description?: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  perUserLimit: number;
  applicableProducts: mongoose.Types.ObjectId[];
  applicableCategories: mongoose.Types.ObjectId[];
  applicableStores: mongoose.Types.ObjectId[];
  excludedProducts: mongoose.Types.ObjectId[];
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
  scope: 'platform' | 'seller';
  seller?: mongoose.Types.ObjectId;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    description: { type: String },
    type: { type: String, enum: ['percentage', 'fixed'], required: true },
    value: { type: Number, required: true, min: 0 },
    minOrderAmount: { type: Number, default: 0 },
    maxDiscount: { type: Number },
    usageLimit: { type: Number, default: -1 },
    usedCount: { type: Number, default: 0 },
    perUserLimit: { type: Number, default: 1 },
    applicableProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    applicableCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    applicableStores: [{ type: Schema.Types.ObjectId, ref: 'Store' }],
    excludedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    scope: { type: String, enum: ['platform', 'seller'], default: 'seller' },
    seller: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

couponSchema.index({ code: 1 });
couponSchema.index({ isActive: 1, startDate: 1, endDate: 1 });
couponSchema.index({ seller: 1 });

export default mongoose.model<ICoupon>('Coupon', couponSchema);
