import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  helpfulCount: number;
  sellerReply?: {
    message: string;
    repliedAt: Date;
  };
}

const reviewSchema = new Schema<IReview>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true },
    comment: { type: String, required: true },
    images: [String],
    isVerifiedPurchase: { type: Boolean, default: true },
    isApproved: { type: Boolean, default: true },
    helpfulCount: { type: Number, default: 0 },
    sellerReply: {
      message: String,
      repliedAt: Date,
    },
  },
  { timestamps: true }
);

reviewSchema.index({ product: 1, createdAt: -1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ rating: 1 });

export default mongoose.model<IReview>('Review', reviewSchema);
