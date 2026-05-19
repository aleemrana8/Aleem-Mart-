import mongoose, { Schema, Document } from 'mongoose';

export interface IProductVariant {
  name: string;
  sku: string;
  price: number;
  comparePrice?: number;
  stock: number;
  attributes: Record<string, string>;
  images?: string[];
  isActive: boolean;
}

export interface IProduct extends Document {
  seller: mongoose.Types.ObjectId;
  store: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  images: string[];
  videos?: string[];
  category: mongoose.Types.ObjectId;
  subcategory?: mongoose.Types.ObjectId;
  brand?: string;
  sku: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  stock: number;
  lowStockThreshold: number;
  variants: IProductVariant[];
  attributes: Record<string, string>;
  tags: string[];
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  shippingClass?: string;
  estimatedDelivery?: string;
  rating: number;
  totalReviews: number;
  totalSold: number;
  isActive: boolean;
  isFeatured: boolean;
  isDigital: boolean;
  status: 'draft' | 'active' | 'inactive' | 'outOfStock';
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
  };
  faq?: { question: string; answer: string }[];
  specifications?: { key: string; value: string }[];
}

const productVariantSchema = new Schema<IProductVariant>({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  comparePrice: { type: Number, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  attributes: { type: Schema.Types.Mixed, default: {} },
  images: [String],
  isActive: { type: Boolean, default: true },
});

const productSchema = new Schema<IProduct>(
  {
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    images: [{ type: String, required: true }],
    videos: [String],
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: Schema.Types.ObjectId, ref: 'Category' },
    brand: { type: String },
    sku: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    comparePrice: { type: Number, min: 0 },
    costPrice: { type: Number, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    lowStockThreshold: { type: Number, default: 5 },
    variants: [productVariantSchema],
    attributes: { type: Schema.Types.Mixed, default: {} },
    tags: [{ type: String, trim: true }],
    weight: { type: Number },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    shippingClass: { type: String },
    estimatedDelivery: { type: String },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    totalSold: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isDigital: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['draft', 'active', 'inactive', 'outOfStock'],
      default: 'draft',
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      metaKeywords: [String],
    },
    faq: [{
      question: { type: String, required: true },
      answer: { type: String, required: true },
    }],
    specifications: [{
      key: { type: String, required: true },
      value: { type: String, required: true },
    }],
  },
  { timestamps: true }
);

// Indexes for search and filtering
productSchema.index({ title: 'text', description: 'text', tags: 'text', brand: 'text' });
productSchema.index({ slug: 1 });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ seller: 1, store: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ totalSold: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ status: 1, isActive: 1 });
productSchema.index({ isFeatured: 1 });

export default mongoose.model<IProduct>('Product', productSchema);
