'use client';

import { useState, useEffect } from 'react';
import { Flame, Star, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';

const velocityStyles: Record<string, string> = {
  Hot: 'bg-destructive/10 text-destructive',
  Rising: 'bg-warning/10 text-warning',
  New: 'bg-info/10 text-info',
};

export function TrendingNow() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products?sort=-totalSold&limit=8').then(({ data }) => {
      setProducts(data.data || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

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
          <Link href="/shop?sort=-totalSold" className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All <ChevronRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 size={24} className="animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {products.map((product, index) => (
              <Link key={product._id} href={`/product/${product.slug}`}>
                <div className="group rounded-2xl border border-border/50 hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                  <div className="relative p-4 bg-muted/20 flex items-center justify-center h-36">
                    {product.images?.[0] ? (
                      <Image src={product.images[0]} alt={product.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
                    ) : (
                      <span className="text-3xl">📦</span>
                    )}
                    <span className="absolute top-2 left-2 w-5 h-5 flex items-center justify-center bg-foreground text-background text-[9px] font-bold rounded-full z-10">
                      {index + 1}
                    </span>
                    <span className={`absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-md z-10 ${index < 3 ? velocityStyles.Hot : index < 6 ? velocityStyles.Rising : velocityStyles.New}`}>
                      {index < 3 ? 'Hot' : index < 6 ? 'Rising' : 'New'}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-medium text-foreground line-clamp-1 mb-1">{product.title}</h3>
                    <div className="flex items-center gap-1 mb-1.5">
                      <Star size={10} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-[10px] text-muted-foreground">{product.rating}</span>
                      <span className="text-[10px] text-muted-foreground">• {(product.totalSold || 0).toLocaleString()} sold</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-foreground">Rs. {product.price?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
