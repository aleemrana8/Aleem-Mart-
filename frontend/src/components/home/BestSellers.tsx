'use client';

import Link from 'next/link';
import { ProductCard } from '@/components/shared/ProductCard';

const bestSellers = [
  {
    id: '1',
    title: 'Wireless Bluetooth Headphones Pro',
    slug: 'wireless-bluetooth-headphones-pro',
    images: ['/placeholder-product.jpg'],
    price: 4999,
    comparePrice: 8999,
    rating: 4.5,
    totalReviews: 234,
    store: { name: 'TechZone', slug: 'techzone' },
  },
  {
    id: '2',
    title: 'Premium Cotton T-Shirt',
    slug: 'premium-cotton-tshirt',
    images: ['/placeholder-product.jpg'],
    price: 1299,
    comparePrice: 2499,
    rating: 4.3,
    totalReviews: 156,
    store: { name: 'FashionHub', slug: 'fashionhub' },
  },
  {
    id: '3',
    title: 'Smart Watch Series X',
    slug: 'smart-watch-series-x',
    images: ['/placeholder-product.jpg'],
    price: 12999,
    comparePrice: 19999,
    rating: 4.7,
    totalReviews: 89,
    store: { name: 'GadgetWorld', slug: 'gadgetworld' },
  },
  {
    id: '4',
    title: 'Organic Face Serum',
    slug: 'organic-face-serum',
    images: ['/placeholder-product.jpg'],
    price: 2499,
    comparePrice: 3999,
    rating: 4.6,
    totalReviews: 312,
    store: { name: 'BeautyBliss', slug: 'beautybliss' },
  },
];

export function BestSellers() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Best Sellers</h2>
            <p className="text-gray-500 mt-1">Our most popular products this month</p>
          </div>
          <Link href="/best-sellers" className="text-primary font-medium hover:underline text-sm">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
