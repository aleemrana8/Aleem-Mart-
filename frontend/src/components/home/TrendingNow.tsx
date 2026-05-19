'use client';

import { Flame, Star, ShoppingCart, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const trendingProducts = [
  { id: 1, name: 'AirPods Pro Max Clone', price: 4999, soldCount: 1234, rating: 4.7, image: '🎧', velocity: 'Hot' },
  { id: 2, name: 'Gaming Mouse RGB', price: 2499, soldCount: 890, rating: 4.5, image: '🖱️', velocity: 'Rising' },
  { id: 3, name: 'Mechanical Keyboard 75%', price: 6999, soldCount: 567, rating: 4.8, image: '⌨️', velocity: 'Hot' },
  { id: 4, name: 'Portable Charger 20000mAh', price: 3499, soldCount: 2100, rating: 4.6, image: '🔋', velocity: 'Hot' },
  { id: 5, name: 'Ring Light 18inch', price: 4499, soldCount: 445, rating: 4.4, image: '💡', velocity: 'Rising' },
  { id: 6, name: 'Webcam 4K Ultra', price: 5999, soldCount: 334, rating: 4.5, image: '📷', velocity: 'New' },
  { id: 7, name: 'Monitor Arm Dual', price: 3999, soldCount: 278, rating: 4.6, image: '🖥️', velocity: 'Rising' },
  { id: 8, name: 'Desk Pad XXL', price: 1499, soldCount: 1890, rating: 4.3, image: '🎨', velocity: 'Hot' },
];

const velocityStyles: Record<string, string> = {
  Hot: 'bg-destructive/10 text-destructive',
  Rising: 'bg-warning/10 text-warning',
  New: 'bg-info/10 text-info',
};

export function TrendingNow() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl">
              <Flame size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Trending Now</h2>
              <p className="text-sm text-muted-foreground">Most popular this week</p>
            </div>
          </div>
          <Link href="/products?sort=trending" className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {trendingProducts.map((product, index) => (
            <div key={product.id} className="group rounded-2xl border border-border/50 hover:shadow-card-hover transition-all duration-300 overflow-hidden">
              <div className="relative p-6 bg-muted/20 flex items-center justify-center">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{product.image}</span>
                <span className="absolute top-2 left-2 w-5 h-5 flex items-center justify-center bg-foreground text-background text-[9px] font-bold rounded-full">
                  {index + 1}
                </span>
                <span className={`absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${velocityStyles[product.velocity]}`}>
                  {product.velocity}
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-xs font-medium text-foreground line-clamp-1 mb-1">{product.name}</h3>
                <div className="flex items-center gap-1 mb-1.5">
                  <Star size={10} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] text-muted-foreground">{product.rating}</span>
                  <span className="text-[10px] text-muted-foreground">• {product.soldCount.toLocaleString()} sold</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">Rs. {product.price.toLocaleString()}</span>
                  <button className="p-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                    <ShoppingCart size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
