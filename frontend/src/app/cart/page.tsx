'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Minus, Plus, Trash2, ShoppingBag, Shield, Truck, Tag, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, totalItems, totalPrice, isLoading, fetchCart, updateQuantity, removeItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const shipping = totalPrice > 5000 ? 0 : 200;
  const total = totalPrice + shipping;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag size={56} className="mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">Please login to view your cart</h2>
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
          <h1 className="text-xl font-bold text-foreground mb-1">Shopping Cart</h1>
          <p className="text-sm text-muted-foreground mb-6">{totalItems} items in your cart</p>

          {isLoading && items.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag size={56} className="mx-auto text-muted-foreground/30 mb-4" />
              <h2 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-sm text-muted-foreground mb-6">Looks like you haven&apos;t added anything yet.</p>
              <Link href="/shop" className="btn-premium px-6 py-3 text-sm font-semibold inline-block">Continue Shopping</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
              {/* Cart Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item._id} className="p-4 rounded-2xl border border-border/50 flex gap-4 group hover:shadow-card-hover transition-shadow">
                    <Link href={`/product/${item.product.slug}`} className="w-20 h-20 bg-muted/30 rounded-xl overflow-hidden relative shrink-0">
                      {item.product.images?.[0] ? (
                        <Image src={item.product.images[0]} alt={item.product.title} fill className="object-cover" sizes="80px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">🛍️</div>
                      )}
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.product.slug}`}>
                        <h3 className="text-sm font-medium text-foreground truncate hover:text-primary transition-colors">{item.product.title}</h3>
                      </Link>
                      <p className="text-base font-bold text-foreground mt-1">{formatPrice(item.price)}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center rounded-xl border border-border/60 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                            className="p-2 hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-4 text-sm font-medium text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="p-2 hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground disabled:opacity-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-foreground">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:sticky lg:top-32 lg:self-start">
                <div className="p-5 rounded-2xl border border-border/50 space-y-4">
                  <h2 className="font-semibold text-foreground">Order Summary</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                      <span className="text-foreground font-medium">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={shipping === 0 ? 'text-success font-medium' : 'text-foreground'}>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-xs text-success flex items-center gap-1"><Truck size={12} /> Free shipping on orders above Rs. 5,000</p>
                    )}
                    <div className="flex justify-between pt-3 border-t border-border/50">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="text-lg font-bold text-foreground">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Link href="/checkout" className="btn-premium w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 block text-center">
                    Proceed to Checkout
                  </Link>

                  <Link href="/shop" className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Continue Shopping
                  </Link>

                  {/* Trust Badges */}
                  <div className="pt-3 border-t border-border/30 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield size={12} className="text-success" /> Buyer protection guarantee
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Tag size={12} className="text-primary" /> Best price match
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
