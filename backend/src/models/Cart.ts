import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
  product: mongoose.Types.ObjectId;
  variant?: string;
  quantity: number;
  price: number;
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;
  coupon?: mongoose.Types.ObjectId;
  discount: number;
}

const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  variant: { type: String },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const cartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema],
    totalItems: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    coupon: { type: Schema.Types.ObjectId, ref: 'Coupon' },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

cartSchema.index({ user: 1 });

export default mongoose.model<ICart>('Cart', cartSchema);
