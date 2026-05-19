'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shared/ProductCard';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

const mockResults = [
  { id: '1', title: 'Wireless Bluetooth Headphones Pro', slug: 'wireless-bluetooth-headphones-pro', images: ['/placeholder-product.jpg'], price: 4999, comparePrice: 8999, rating: 4.5, totalReviews: 234, store: { name: 'TechZone', slug: 'techzone' } },
  { id: '2', title: 'Premium Cotton T-Shirt', slug: 'premium-cotton-tshirt', images: ['/placeholder-product.jpg'], price: 1299, comparePrice: 2499, rating: 4.3, totalReviews: 156, store: { name: 'FashionHub', slug: 'fashionhub' } },
  { id: '3', title: 'Smart Watch Series X', slug: 'smart-watch-series-x', images: ['/placeholder-product.jpg'], price: 12999, comparePrice: 19999, rating: 4.7, totalReviews: 89, store: { name: 'GadgetWorld', slug: 'gadgetworld' } },
  { id: '4', title: 'Organic Face Serum', slug: 'organic-face-serum', images: ['/placeholder-product.jpg'], price: 2499, comparePrice: 3999, rating: 4.6, totalReviews: 312, store: { name: 'BeautyBliss', slug: 'beautybliss' } },
  { id: '5', title: 'Gaming Mechanical Keyboard', slug: 'gaming-mechanical-keyboard', images: ['/placeholder-product.jpg'], price: 7999, comparePrice: 12999, rating: 4.4, totalReviews: 67, store: { name: 'GamersHub', slug: 'gamershub' } },
  { id: '6', title: 'Portable Bluetooth Speaker', slug: 'portable-bluetooth-speaker', images: ['/placeholder-product.jpg'], price: 3499, comparePrice: 5999, rating: 4.5, totalReviews: 128, store: { name: 'AudioMax', slug: 'audiomax' } },
];

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Gaming'];
const sortOptions = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Rating', 'Newest'];

export default function SearchPage() {
  const [query, setQuery] = useState('headphones');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Relevance');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Search Bar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-11 pl-11 pr-4 rounded-xl border border-border/60 bg-muted/20 text-sm text-foreground outline-none focus:border-primary/60 transition-colors"
                placeholder="Search products..."
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`h-11 px-4 rounded-xl border text-sm font-medium flex items-center gap-2 transition-colors ${
                showFilters ? 'border-primary bg-primary/5 text-primary' : 'border-border/60 text-muted-foreground hover:text-foreground'
              }`}
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>

          {/* Filter Bar */}
          {showFilters && (
            <div className="mb-6 p-4 rounded-2xl border border-border/50 flex flex-wrap gap-3 items-center">
              <span className="text-xs font-medium text-muted-foreground">Category:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-8 px-3 rounded-lg border border-border/60 bg-background text-xs outline-none"
                >
                  {sortOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Results Header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">{mockResults.length}</span> results for &ldquo;<span className="text-foreground font-medium">{query}</span>&rdquo;
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mockResults.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
