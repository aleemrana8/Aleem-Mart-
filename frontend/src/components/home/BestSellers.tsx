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
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Best Sellers</h2>
            <p className="text-sm text-muted-foreground mt-1">Our most popular products this month</p>
          </div>
          <Link href="/best-sellers" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
