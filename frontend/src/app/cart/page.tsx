'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Minus, Plus, Trash2, ShoppingBag, Shield, Truck, Tag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const cartItems = [
    { id: '1', title: 'Wireless Bluetooth Headphones Pro', price: 4999, quantity: 1, image: '🎧', stock: 10 },
    { id: '2', title: 'Premium Cotton T-Shirt - Navy Blue', price: 1299, quantity: 2, image: '👕', stock: 50 },
    { id: '3', title: 'Smart Watch Series X', price: 12999, quantity: 1, image: '⌚', stock: 5 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1100px] mx-auto px-4 lg:px-6 py-6 lg:py-10">
          <h1 className="text-xl font-bold text-foreground mb-1">Shopping Cart</h1>
          <p className="text-sm text-muted-foreground mb-6">{cartItems.length} items in your cart</p>

          {cartItems.length === 0 ? (
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
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl border border-border/50 flex gap-4 group hover:shadow-card-hover transition-shadow">
                    <div className="w-20 h-20 bg-muted/30 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-3xl">{item.image}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-foreground truncate">{item.title}</h3>
                      <p className="text-base font-bold text-foreground mt-1">{formatPrice(item.price)}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center rounded-xl border border-border/60 overflow-hidden">
                          <button className="p-2 hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground">
                            <Minus size={14} />
                          </button>
                          <span className="px-4 text-sm font-medium text-foreground">{item.quantity}</span>
                          <button className="p-2 hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground">
                            <Plus size={14} />
                          </button>
                        </div>
                        <button className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
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
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground font-medium">{formatPrice(subtotal)}</span>
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

                  {/* Coupon */}
                  <div className="flex gap-2">
                    <input type="text" placeholder="Coupon code" className="flex-1 h-9 px-3 rounded-lg border border-border/60 bg-muted/20 text-sm outline-none focus:border-primary/60 placeholder:text-muted-foreground" />
                    <button className="px-3 h-9 rounded-lg bg-muted text-sm font-medium hover:bg-muted/80 transition-colors">Apply</button>
                  </div>

                  <Link href="/checkout" className="btn-premium w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 block">
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
