import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';

let io: Server;

export const initSocketServer = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      (socket as any).userId = decoded.id;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: Socket) => {
    const userId = (socket as any).userId;
    console.log(`User connected: ${userId}`);

    // Join user's personal room
    socket.join(`user:${userId}`);

    // Handle messaging
    socket.on('send_message', (data) => {
      const { receiverId, content, conversationId } = data;
      io.to(`user:${receiverId}`).emit('new_message', {
        senderId: userId,
        content,
        conversationId,
        timestamp: new Date(),
      });
    });

    // Handle typing indicator
    socket.on('typing', (data) => {
      io.to(`user:${data.receiverId}`).emit('user_typing', {
        userId,
        conversationId: data.conversationId,
      });
    });

    // Handle notifications
    socket.on('mark_notification_read', (notificationId) => {
      // Handle notification read status
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${userId}`);
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

// Emit notification to specific user
export const emitToUser = (userId: string, event: string, data: any) => {
  if (io) {
    io.to(`user:${userId}`).emit(event, data);
  }
};

// Emit order update
export const emitOrderUpdate = (userId: string, orderData: any) => {
  emitToUser(userId, 'order_update', orderData);
};
