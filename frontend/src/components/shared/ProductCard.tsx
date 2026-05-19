'use client';

import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    slug: string;
    images: string[];
    price: number;
    comparePrice?: number;
    rating: number;
    totalReviews: number;
    store: { name: string; slug: string };
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.comparePrice
    ? getDiscountPercentage(product.price, product.comparePrice)
    : 0;

  return (
    <div className="group bg-white rounded-xl border hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block relative">
        <div className="relative w-full h-48 sm:h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">🛍️</div>
          {/* Placeholder for real image */}
        </div>
        {discount > 0 && (
          <Badge variant="destructive" className="absolute top-3 left-3">
            -{discount}%
          </Badge>
        )}
        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
          onClick={(e) => { e.preventDefault(); }}
        >
          <Heart size={16} className="text-gray-600" />
        </button>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/store/${product.store.slug}`} className="text-xs text-primary hover:underline">
          {product.store.name}
        </Link>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-medium text-gray-900 mt-1 line-clamp-2 text-sm hover:text-primary transition">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.totalReviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          size="sm"
          className="w-full mt-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => { e.preventDefault(); }}
        >
          <ShoppingCart size={14} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
