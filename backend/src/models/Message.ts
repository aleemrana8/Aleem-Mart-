import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  conversation: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  content: string;
  attachments?: string[];
  isRead: boolean;
  readAt?: Date;
}

export interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[];
  product?: mongoose.Types.ObjectId;
  order?: mongoose.Types.ObjectId;
  lastMessage?: string;
  lastMessageAt?: Date;
  unreadCount: Record<string, number>;
}

const messageSchema = new Schema<IMessage>(
  {
    conversation: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    attachments: [String],
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
  },
  { timestamps: true }
);

const conversationSchema = new Schema<IConversation>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    lastMessage: { type: String },
    lastMessageAt: { type: Date },
    unreadCount: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

messageSchema.index({ conversation: 1, createdAt: -1 });
conversationSchema.index({ participants: 1 });
conversationSchema.index({ lastMessageAt: -1 });

export const Message = mongoose.model<IMessage>('Message', messageSchema);
export const Conversation = mongoose.model<IConversation>('Conversation', conversationSchema);
