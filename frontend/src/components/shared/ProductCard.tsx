'use client';

import Link from 'next/link';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { cn } from '@/lib/utils';

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
  variant?: 'default' | 'compact';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const discount = product.comparePrice
    ? getDiscountPercentage(product.price, product.comparePrice)
    : 0;

  return (
    <div className="group relative bg-card rounded-2xl border border-border/50 hover:border-border hover:shadow-card-hover transition-all duration-300 overflow-hidden">
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block relative">
        <div className={cn(
          'relative w-full bg-muted/30 flex items-center justify-center overflow-hidden',
          variant === 'compact' ? 'h-40' : 'h-48 sm:h-56'
        )}>
          <div className="text-4xl group-hover:scale-110 transition-transform duration-500 ease-out-expo">🛍️</div>
        </div>
        
        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-lg">
            -{discount}%
          </span>
        )}
        
        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
          <button
            className="p-2 bg-background/90 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm hover:bg-background hover:text-primary transition-colors"
            onClick={(e) => { e.preventDefault(); }}
            aria-label="Add to wishlist"
          >
            <Heart size={14} />
          </button>
          <button
            className="p-2 bg-background/90 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm hover:bg-background hover:text-primary transition-colors"
            onClick={(e) => { e.preventDefault(); }}
            aria-label="Quick view"
          >
            <Eye size={14} />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/store/${product.store.slug}`} className="text-[11px] uppercase tracking-wider text-primary hover:underline font-medium">
          {product.store.name}
        </Link>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-medium text-foreground mt-1.5 line-clamp-2 text-sm leading-snug hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} size={11} className={cn(
                i <= Math.floor(product.rating) ? 'fill-primary text-primary' : 'fill-muted text-muted'
              )} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.totalReviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2.5">
          <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(product.comparePrice)}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          className="w-full mt-3 py-2.5 rounded-xl text-sm font-medium bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
          onClick={(e) => { e.preventDefault(); }}
        >
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
