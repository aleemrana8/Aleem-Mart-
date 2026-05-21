'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import api from '@/lib/api';
import { Heart, ShoppingCart, Trash2, Loader2, Star, Check } from 'lucide-react';

interface WishlistItem {
  _id: string;
  product: {
    _id: string;
    title: string;
    slug: string;
    images: string[];
    price: number;
    comparePrice?: number;
    rating: number;
    totalReviews: number;
    stock: number;
  };
}

export default function WishlistPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { addToCart } = useCartStore();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchWishlist();
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      const { data } = await api.get('/wishlist');
      setItems(data.data || []);
    } catch (err) {
      console.error('Failed to load wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await api.delete(`/wishlist/${productId}`);
      setItems(items.filter(i => i.product._id !== productId));
    } catch (err) {
      console.error('Failed to remove:', err);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId);
      setAddedIds(new Set([...addedIds, productId]));
      setTimeout(() => {
        setAddedIds(prev => { const n = new Set(prev); n.delete(productId); return n; });
      }, 2000);
    } catch (err) {
      router.push('/login');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Heart size={56} className="mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">Please login to view your wishlist</h2>
            <Link href="/login" className="btn-premium px-6 py-3 text-sm font-semibold inline-block mt-4">Login</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1100px] mx-auto px-4 lg:px-6 py-6 lg:py-10">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <Heart size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">My Wishlist</h1>
                <p className="text-sm text-muted-foreground">{items.length} saved items</p>
              </div>
            </div>
            <Link href="/shop" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Browse More →
            </Link>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={56} className="mx-auto text-muted-foreground/30 mb-4" />
              <h2 className="text-lg font-semibold text-foreground mb-2">Your wishlist is empty</h2>
              <p className="text-sm text-muted-foreground mb-6">Save items you love for later</p>
              <Link href="/shop" className="btn-premium px-6 py-3 text-sm font-semibold inline-block">Explore Products</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {items.map((item) => {
                const p = item.product;
                const discount = p.comparePrice ? Math.round((1 - p.price / p.comparePrice) * 100) : 0;
                const added = addedIds.has(p._id);
                return (
                  <div key={item._id} className="rounded-2xl border border-border/50 overflow-hidden group hover:shadow-card-hover transition-all duration-300">
                    <div className="relative aspect-square bg-muted/20 overflow-hidden">
                      {p.images?.[0] ? (
                        <Image src={p.images[0]} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
                      )}
                      {discount > 0 && (
                        <span className="absolute top-3 left-3 px-2 py-0.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-md">
                          -{discount}%
                        </span>
                      )}
                      <button
                        onClick={() => removeFromWishlist(p._id)}
                        className="absolute top-3 right-3 p-2 bg-background/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-destructive/10 hover:text-destructive transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                      {p.stock === 0 && (
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
                          <span className="bg-background text-foreground px-3 py-1.5 rounded-full text-xs font-semibold border border-border/60">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <Link href={`/product/${p.slug}`}>
                        <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition-colors mb-1.5">{p.title}</h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={11} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-[11px] text-muted-foreground">{p.rating} ({p.totalReviews})</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-base font-bold text-foreground">{formatPrice(p.price)}</span>
                        {p.comparePrice && (
                          <span className="text-xs text-muted-foreground line-through">{formatPrice(p.comparePrice)}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(p._id)}
                        disabled={p.stock === 0 || added}
                        className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                          added
                            ? 'bg-success/10 text-success border border-success/20'
                            : p.stock === 0
                              ? 'bg-muted text-muted-foreground cursor-not-allowed'
                              : 'btn-premium'
                        }`}
                      >
                        {added ? <><Check size={13} /> Added to Cart</> : <><ShoppingCart size={13} /> Add to Cart</>}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
