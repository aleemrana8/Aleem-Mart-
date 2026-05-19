'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shared/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SlidersHorizontal, Grid3X3, List, ChevronDown } from 'lucide-react';

const sampleProducts = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  title: `Product ${i + 1} - Premium Quality Item with Great Value`,
  slug: `product-${i + 1}`,
  images: ['/placeholder-product.jpg'],
  price: Math.floor(Math.random() * 10000) + 999,
  comparePrice: Math.floor(Math.random() * 15000) + 5000,
  rating: +(Math.random() * 2 + 3).toFixed(1),
  totalReviews: Math.floor(Math.random() * 300),
  store: { name: `Store ${i + 1}`, slug: `store-${i + 1}` },
}));

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container-custom py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Shop</span>
          </nav>

          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <aside className={`w-64 shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="bg-white rounded-xl border p-5 space-y-6 sticky top-24">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                  <ul className="space-y-2 text-sm">
                    {['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Gaming', 'Sports'].map((cat) => (
                      <li key={cat}>
                        <label className="flex items-center gap-2 cursor-pointer hover:text-primary">
                          <input type="checkbox" className="rounded border-gray-300" />
                          {cat}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                  <div className="flex gap-2">
                    <Input placeholder="Min" type="number" className="text-sm" />
                    <Input placeholder="Max" type="number" className="text-sm" />
                  </div>
                  <Button size="sm" className="w-full mt-2">Apply</Button>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Rating</h3>
                  <ul className="space-y-2 text-sm">
                    {[4, 3, 2, 1].map((r) => (
                      <li key={r}>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="rating" className="border-gray-300" />
                          {'★'.repeat(r)}{'☆'.repeat(5 - r)} & up
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
                  <ul className="space-y-2 text-sm">
                    {['Samsung', 'Apple', 'Nike', 'Adidas', 'Sony'].map((brand) => (
                      <li key={brand}>
                        <label className="flex items-center gap-2 cursor-pointer hover:text-primary">
                          <input type="checkbox" className="rounded border-gray-300" />
                          {brand}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 bg-white rounded-xl border p-4">
                <div className="flex items-center gap-4">
                  <button
                    className="lg:hidden flex items-center gap-2 text-sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal size={16} />
                    Filters
                  </button>
                  <span className="text-sm text-gray-500">Showing 1-12 of 248 products</span>
                </div>
                <div className="flex items-center gap-3">
                  <select className="text-sm border rounded-lg px-3 py-2 bg-white">
                    <option>Sort: Relevance</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                    <option>Newest</option>
                    <option>Popular</option>
                  </select>
                  <div className="hidden sm:flex border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                    >
                      <Grid3X3 size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className={`grid gap-4 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {sampleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                {[1, 2, 3, 4, 5].map((p) => (
                  <Button key={p} variant={p === 1 ? 'default' : 'outline'} size="sm">
                    {p}
                  </Button>
                ))}
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
