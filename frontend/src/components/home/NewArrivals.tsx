'use client';

import Link from 'next/link';
import { ProductCard } from '@/components/shared/ProductCard';

const newProducts = [
  {
    id: '5',
    title: 'Gaming Mechanical Keyboard RGB',
    slug: 'gaming-mechanical-keyboard-rgb',
    images: ['/placeholder-product.jpg'],
    price: 7999,
    comparePrice: 12999,
    rating: 4.4,
    totalReviews: 67,
    store: { name: 'GamersHub', slug: 'gamershub' },
  },
  {
    id: '6',
    title: 'Minimalist Leather Wallet',
    slug: 'minimalist-leather-wallet',
    images: ['/placeholder-product.jpg'],
    price: 1999,
    comparePrice: 3499,
    rating: 4.2,
    totalReviews: 45,
    store: { name: 'StyleCraft', slug: 'stylecraft' },
  },
  {
    id: '7',
    title: 'Portable Bluetooth Speaker',
    slug: 'portable-bluetooth-speaker',
    images: ['/placeholder-product.jpg'],
    price: 3499,
    comparePrice: 5999,
    rating: 4.5,
    totalReviews: 128,
    store: { name: 'AudioMax', slug: 'audiomax' },
  },
  {
    id: '8',
    title: 'Yoga Mat Premium Non-Slip',
    slug: 'yoga-mat-premium-non-slip',
    images: ['/placeholder-product.jpg'],
    price: 2999,
    comparePrice: 4999,
    rating: 4.8,
    totalReviews: 201,
    store: { name: 'FitLife', slug: 'fitlife' },
  },
];

export function NewArrivals() {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">New Arrivals</h2>
            <p className="text-gray-500 mt-1">Fresh products just added to our marketplace</p>
          </div>
          <Link href="/new-arrivals" className="text-primary font-medium hover:underline text-sm">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
