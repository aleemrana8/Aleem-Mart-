import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const mailOptions = {
    from: `"Aleem Mart" <${process.env.EMAIL_FROM}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  await sendEmail({
    to: email,
    subject: 'Verify Your Email - Aleem Mart',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a2e;">Welcome to Aleem Mart!</h1>
        <p>Please verify your email address by clicking the button below:</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #e94560; color: white; text-decoration: none; border-radius: 8px;">Verify Email</a>
        <p style="color: #666; margin-top: 20px;">If you didn't create this account, you can ignore this email.</p>
      </div>
    `,
  });
};

export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
  await sendEmail({
    to: email,
    subject: 'Your OTP Code - Aleem Mart',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1a1a2e; text-align: center;">Aleem Mart</h1>
        <div style="background: #f8f9fa; border-radius: 12px; padding: 30px; text-align: center; margin: 20px 0;">
          <p style="color: #666; margin-bottom: 10px;">Your verification code is:</p>
          <h2 style="font-size: 36px; letter-spacing: 8px; color: #e94560; margin: 10px 0;">${otp}</h2>
          <p style="color: #999; font-size: 13px;">This code expires in 10 minutes</p>
        </div>
        <p style="color: #666; font-size: 13px; text-align: center;">If you didn't request this code, please ignore this email.</p>
      </div>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string): Promise<void> => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
  await sendEmail({
    to: email,
    subject: 'Reset Your Password - Aleem Mart',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a2e;">Password Reset</h1>
        <p>You requested a password reset. Click the button below:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #e94560; color: white; text-decoration: none; border-radius: 8px;">Reset Password</a>
        <p style="color: #666; margin-top: 20px;">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
      </div>
    `,
  });
};

export const sendOrderConfirmationEmail = async (email: string, orderNumber: string): Promise<void> => {
  await sendEmail({
    to: email,
    subject: `Order Confirmed #${orderNumber} - Aleem Mart`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a2e;">Order Confirmed!</h1>
        <p>Your order <strong>#${orderNumber}</strong> has been confirmed.</p>
        <p>You can track your order in your account dashboard.</p>
        <a href="${process.env.CLIENT_URL}/orders" style="display: inline-block; padding: 12px 24px; background-color: #e94560; color: white; text-decoration: none; border-radius: 8px;">View Orders</a>
      </div>
    `,
  });
};
