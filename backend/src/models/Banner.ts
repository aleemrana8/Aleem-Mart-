import mongoose, { Schema, Document } from 'mongoose';

export interface IBanner extends Document {
  title: string;
  subtitle?: string;
  image: string;
  mobileImage?: string;
  link?: string;
  buttonText?: string;
  position: 'hero' | 'sidebar' | 'category' | 'promotional';
  sortOrder: number;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
}

const bannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String, required: true },
    mobileImage: { type: String },
    link: { type: String },
    buttonText: { type: String },
    position: {
      type: String,
      enum: ['hero', 'sidebar', 'category', 'promotional'],
      required: true,
    },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true }
);

bannerSchema.index({ position: 1, isActive: 1, sortOrder: 1 });

export default mongoose.model<IBanner>('Banner', bannerSchema);
