'use client';

import Link from 'next/link';
import { Smartphone, Shirt, Home, Sparkles, Gamepad2, Laptop, Watch, Headphones } from 'lucide-react';

const categories = [
  { name: 'Electronics', slug: 'electronics', icon: Smartphone, gradient: 'from-blue-500/10 to-blue-600/5' },
  { name: 'Fashion', slug: 'fashion', icon: Shirt, gradient: 'from-pink-500/10 to-pink-600/5' },
  { name: 'Home & Living', slug: 'home-living', icon: Home, gradient: 'from-green-500/10 to-green-600/5' },
  { name: 'Beauty & Health', slug: 'beauty-health', icon: Sparkles, gradient: 'from-purple-500/10 to-purple-600/5' },
  { name: 'Gaming', slug: 'gaming', icon: Gamepad2, gradient: 'from-red-500/10 to-red-600/5' },
  { name: 'Sports & Fitness', slug: 'sports-fitness', icon: Laptop, gradient: 'from-indigo-500/10 to-indigo-600/5' },
  { name: 'Books', slug: 'books-stationery', icon: Watch, gradient: 'from-amber-500/10 to-amber-600/5' },
  { name: 'Groceries', slug: 'groceries', icon: Headphones, gradient: 'from-cyan-500/10 to-cyan-600/5' },
];

export function CategoryGrid() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Shop by Category</h2>
            <p className="text-sm text-muted-foreground mt-1">Browse our wide selection</p>
          </div>
          <Link href="/shop" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="group flex flex-col items-center p-4 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-card-hover transition-all duration-300"
              >
                <div className={`p-3.5 rounded-xl bg-gradient-to-br ${cat.gradient} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} className="text-foreground" />
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground text-center transition-colors">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
