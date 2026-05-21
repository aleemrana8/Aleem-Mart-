'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Star, Heart, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';

export function AIRecommendations() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products?sort=-rating&limit=6').then(({ data }) => {
      setProducts(data.data || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

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
          <Link href="/shop" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All <ChevronRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 size={24} className="animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {products.map((product) => {
              const discount = product.comparePrice ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;
              return (
                <Link key={product._id} href={`/product/${product.slug}`}>
                  <div className="group rounded-2xl border border-border/50 hover:shadow-card-hover transition-all duration-300 overflow-hidden hover:-translate-y-0.5">
                    <div className="relative aspect-square bg-muted/20 flex items-center justify-center overflow-hidden">
                      {product.images?.[0] ? (
                        <Image src={product.images[0]} alt={product.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" sizes="(max-width: 640px) 50vw, 16vw" />
                      ) : (
                        <span className="text-4xl">📦</span>
                      )}
                      {product.isFeatured && (
                        <span className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-md z-10">
                          AI Pick
                        </span>
                      )}
                      {discount > 0 && (
                        <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 bg-destructive text-destructive-foreground rounded-md z-10">
                          -{discount}%
                        </span>
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-2 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 z-10">
                        <button className="p-2 bg-background rounded-full shadow-lg hover:bg-destructive hover:text-destructive-foreground transition-colors">
                          <Heart size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-medium text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">{product.title}</h3>
                      <div className="flex items-center gap-1 mb-1.5">
                        <Star size={10} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-[10px] text-muted-foreground">{product.rating} ({product.totalReviews})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">Rs. {product.price?.toLocaleString()}</span>
                        {product.comparePrice && (
                          <span className="text-[10px] text-muted-foreground line-through">Rs. {product.comparePrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
