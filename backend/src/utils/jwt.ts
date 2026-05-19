import jwt from 'jsonwebtoken';

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

export const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d',
  });
};

export const verifyToken = (token: string): { id: string } => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
};

export const verifyRefreshToken = (token: string): { id: string } => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as { id: string };
};
