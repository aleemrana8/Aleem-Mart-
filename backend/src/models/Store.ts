import mongoose, { Schema, Document } from 'mongoose';

export interface IStore extends Document {
  seller: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  banner?: string;
  phone?: string;
  email?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  rating: number;
  totalReviews: number;
  totalProducts: number;
  totalSales: number;
  commission: number;
  policies: {
    returnPolicy?: string;
    shippingPolicy?: string;
    privacyPolicy?: string;
  };
  socialLinks?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  isVerified: boolean;
  verifiedAt?: Date;
  rejectionReason?: string;
}

const storeSchema = new Schema<IStore>(
  {
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    logo: { type: String },
    banner: { type: String },
    phone: { type: String },
    email: { type: String },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'suspended'],
      default: 'pending',
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    totalProducts: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
    commission: { type: Number, default: 10, min: 0, max: 100 },
    policies: {
      returnPolicy: String,
      shippingPolicy: String,
      privacyPolicy: String,
    },
    socialLinks: {
      website: String,
      facebook: String,
      instagram: String,
      twitter: String,
    },
    isVerified: { type: Boolean, default: false },
    verifiedAt: { type: Date },
    rejectionReason: { type: String },
  },
  { timestamps: true }
);

storeSchema.index({ slug: 1 });
storeSchema.index({ status: 1 });
storeSchema.index({ seller: 1 });
storeSchema.index({ name: 'text', description: 'text' });

export default mongoose.model<IStore>('Store', storeSchema);
