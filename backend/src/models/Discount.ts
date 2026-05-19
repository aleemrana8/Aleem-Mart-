import mongoose, { Schema, Document } from 'mongoose';

export interface IDiscount extends Document {
  seller: mongoose.Types.ObjectId;
  store: mongoose.Types.ObjectId;
  name: string;
  type: 'percentage' | 'fixed' | 'flash_sale' | 'bulk' | 'free_shipping';
  value: number;
  products: mongoose.Types.ObjectId[];
  categories: mongoose.Types.ObjectId[];
  minQuantity?: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  stockLimit?: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

const discountSchema = new Schema<IDiscount>(
  {
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['percentage', 'fixed', 'flash_sale', 'bulk', 'free_shipping'],
      required: true,
    },
    value: { type: Number, required: true, min: 0 },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    minQuantity: { type: Number },
    minOrderAmount: { type: Number },
    maxDiscount: { type: Number },
    stockLimit: { type: Number },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

discountSchema.index({ seller: 1, isActive: 1 });
discountSchema.index({ startDate: 1, endDate: 1 });
discountSchema.index({ products: 1 });

export default mongoose.model<IDiscount>('Discount', discountSchema);
