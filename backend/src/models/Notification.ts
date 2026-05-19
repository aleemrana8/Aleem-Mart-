import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'discount' | 'message' | 'system' | 'stock' | 'review';
  link?: string;
  isRead: boolean;
  metadata?: Record<string, unknown>;
}

const notificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['order', 'payment', 'discount', 'message', 'system', 'stock', 'review'],
      required: true,
    },
    link: { type: String },
    isRead: { type: Boolean, default: false },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

export default mongoose.model<INotification>('Notification', notificationSchema);
