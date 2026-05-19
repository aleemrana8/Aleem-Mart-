'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ProductCard } from '@/components/shared/ProductCard';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

const categories: Record<string, { name: string; description: string }> = {
  electronics: { name: 'Electronics', description: 'Latest gadgets, phones, laptops, and tech accessories' },
  fashion: { name: 'Fashion', description: 'Trending clothing, shoes, and accessories for everyone' },
  'home-kitchen': { name: 'Home & Kitchen', description: 'Furniture, appliances, and decor for your home' },
  'health-beauty': { name: 'Health & Beauty', description: 'Skincare, makeup, fragrances, and wellness products' },
  sports: { name: 'Sports & Fitness', description: 'Sports equipment, gym gear, and outdoor essentials' },
};

const products = [
  { id: '1', title: 'Wireless Earbuds Pro X100', price: 5499, comparePrice: 7999, rating: 4.5, totalReviews: 128, images: ['/placeholder.jpg'], slug: 'wireless-earbuds-pro-x100', store: { name: 'TechZone', slug: 'techzone' } },
  { id: '2', title: 'Smart Watch X200', price: 11999, comparePrice: 14999, rating: 4.7, totalReviews: 89, images: ['/placeholder.jpg'], slug: 'smart-watch-x200', store: { name: 'TechZone', slug: 'techzone' } },
  { id: '3', title: 'Bluetooth Speaker Mini', price: 3999, comparePrice: 5499, rating: 4.3, totalReviews: 56, images: ['/placeholder.jpg'], slug: 'bluetooth-speaker-mini', store: { name: 'AudioMax', slug: 'audiomax' } },
  { id: '4', title: 'USB-C Hub 7-in-1', price: 2999, comparePrice: 4499, rating: 4.6, totalReviews: 234, images: ['/placeholder.jpg'], slug: 'usb-c-hub-7-in-1', store: { name: 'TechZone', slug: 'techzone' } },
  { id: '5', title: 'Laptop Stand Adjustable', price: 2999, comparePrice: 3999, rating: 4.4, totalReviews: 67, images: ['/placeholder.jpg'], slug: 'laptop-stand-adjustable', store: { name: 'HomeDecor', slug: 'homedecor' } },
  { id: '6', title: 'Gaming Mouse RGB Pro', price: 3499, comparePrice: 4999, rating: 4.8, totalReviews: 312, images: ['/placeholder.jpg'], slug: 'gaming-mouse-rgb', store: { name: 'GamersParadise', slug: 'gamersparadise' } },
];

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = categories[slug] || { name: 'Category', description: '' };
  const [sortBy, setSortBy] = useState('popular');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Banner */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{category.name}</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
          <p className="text-gray-500 mt-1">{category.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">{products.length} products found</p>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
