import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  parent?: mongoose.Types.ObjectId;
  level: number;
  isActive: boolean;
  sortOrder: number;
  productCount: number;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String },
    image: { type: String },
    icon: { type: String },
    parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    level: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    productCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

categorySchema.index({ slug: 1 });
categorySchema.index({ parent: 1 });
categorySchema.index({ isActive: 1, sortOrder: 1 });

export default mongoose.model<ICategory>('Category', categorySchema);
