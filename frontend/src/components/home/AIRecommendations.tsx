'use client';

import { Sparkles, Star, ShoppingCart, Heart, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const recommendedProducts = [
  { id: 1, name: 'Wireless Earbuds Pro X100', price: 5499, originalPrice: 7999, rating: 4.8, reviews: 234, image: '🎧', badge: 'AI Pick', discount: 31 },
  { id: 2, name: 'Smart Watch Ultra 2024', price: 12999, originalPrice: 18999, rating: 4.6, reviews: 156, image: '⌚', badge: 'Trending', discount: 32 },
  { id: 3, name: 'Bluetooth Speaker Boom X9', price: 3999, originalPrice: 5999, rating: 4.7, reviews: 312, image: '🔊', badge: 'Best Value', discount: 33 },
  { id: 4, name: 'USB-C Hub 7-in-1 Pro', price: 2999, originalPrice: 4499, rating: 4.5, reviews: 89, image: '🔌', badge: null, discount: 33 },
  { id: 5, name: 'Laptop Stand Adjustable', price: 2999, originalPrice: 3999, rating: 4.4, reviews: 67, image: '💻', badge: 'Popular', discount: 25 },
  { id: 6, name: 'Phone Case Premium Leather', price: 1499, originalPrice: 2499, rating: 4.3, reviews: 445, image: '📱', badge: null, discount: 40 },
];

export function AIRecommendations() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Recommended For You</h2>
              <p className="text-sm text-muted-foreground">AI-powered picks based on your interests</p>
            </div>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="group rounded-2xl border border-border/50 hover:shadow-card-hover transition-all duration-300 overflow-hidden hover:-translate-y-0.5">
              <div className="relative p-4 bg-muted/20 aspect-square flex items-center justify-center">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{product.image}</span>
                {product.badge && (
                  <span className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-md">
                    {product.badge}
                  </span>
                )}
                <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 bg-destructive text-destructive-foreground rounded-md">
                  -{product.discount}%
                </span>
                <div className="absolute inset-x-0 bottom-0 p-2 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <button className="p-2 bg-background rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                    <ShoppingCart size={12} />
                  </button>
                  <button className="p-2 bg-background rounded-full shadow-lg hover:bg-destructive hover:text-destructive-foreground transition-colors">
                    <Heart size={12} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-xs font-medium text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                <div className="flex items-center gap-1 mb-1.5">
                  <Star size={10} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] text-muted-foreground">{product.rating} ({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">Rs. {product.price.toLocaleString()}</span>
                  <span className="text-[10px] text-muted-foreground line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
