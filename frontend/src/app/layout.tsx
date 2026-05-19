import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aleem Mart - Smart Choices. Better Living.',
  description: 'Shop from thousands of verified sellers. Find electronics, fashion, home goods, and more at Aleem Mart.',
  keywords: 'ecommerce, marketplace, shopping, electronics, fashion, deals, aleem mart',
  icons: {
    icon: '/favicon.svg',
    apple: '/images/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
