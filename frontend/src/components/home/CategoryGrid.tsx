'use client';

import Link from 'next/link';
import { Smartphone, Shirt, Home, Sparkles, Gamepad2, Laptop, Watch, Headphones } from 'lucide-react';

const categories = [
  { name: 'Electronics', slug: 'electronics', icon: Smartphone, color: 'bg-blue-50 text-blue-600' },
  { name: 'Fashion', slug: 'fashion', icon: Shirt, color: 'bg-pink-50 text-pink-600' },
  { name: 'Home & Living', slug: 'home-living', icon: Home, color: 'bg-green-50 text-green-600' },
  { name: 'Beauty', slug: 'beauty', icon: Sparkles, color: 'bg-purple-50 text-purple-600' },
  { name: 'Gaming', slug: 'gaming', icon: Gamepad2, color: 'bg-red-50 text-red-600' },
  { name: 'Laptops', slug: 'laptops', icon: Laptop, color: 'bg-indigo-50 text-indigo-600' },
  { name: 'Watches', slug: 'watches', icon: Watch, color: 'bg-amber-50 text-amber-600' },
  { name: 'Audio', slug: 'audio', icon: Headphones, color: 'bg-cyan-50 text-cyan-600' },
];

export function CategoryGrid() {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop by Category</h2>
            <p className="text-gray-500 mt-1">Browse our wide selection of categories</p>
          </div>
          <Link href="/categories" className="text-primary font-medium hover:underline text-sm">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group flex flex-col items-center p-4 rounded-2xl hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-200"
              >
                <div className={`p-4 rounded-2xl ${cat.color} mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon size={28} />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
