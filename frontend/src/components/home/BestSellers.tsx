'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/shared/ProductCard';
import { Loader2 } from 'lucide-react';
import api from '@/lib/api';

export function BestSellers() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products/best-sellers').then(({ data }) => {
      setProducts(data.data?.slice(0, 4) || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Best Sellers</h2>
            <p className="text-sm text-muted-foreground mt-1">Our most popular products this month</p>
          </div>
          <Link href="/shop?sort=-totalSold" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All →
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 size={24} className="animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={{
                id: product._id,
                title: product.title,
                slug: product.slug,
                images: product.images,
                price: product.price,
                comparePrice: product.comparePrice,
                rating: product.rating,
                totalReviews: product.totalReviews,
                store: product.store || { name: 'Aleem Mart', slug: 'aleem-mart-official' },
              }} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
