'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  // Sample cart items
  const cartItems = [
    { id: '1', title: 'Wireless Bluetooth Headphones Pro', price: 4999, quantity: 1, image: '🎧', stock: 10 },
    { id: '2', title: 'Premium Cotton T-Shirt - Navy Blue', price: 1299, quantity: 2, image: '👕', stock: 50 },
    { id: '3', title: 'Smart Watch Series X', price: 12999, quantity: 1, image: '⌚', stock: 5 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container-custom py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart ({cartItems.length} items)</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven&apos;t added anything to your cart yet.</p>
              <Link href="/shop">
                <Button size="lg">Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl border p-4 flex gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-3xl">{item.image}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                      <p className="text-lg font-bold text-primary mt-1">{formatPrice(item.price)}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border rounded-lg">
                          <button className="p-1.5 hover:bg-gray-100 transition">
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-medium">{item.quantity}</span>
                          <button className="p-1.5 hover:bg-gray-100 transition">
                            <Plus size={14} />
                          </button>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-red-500 transition">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border p-6 sticky top-24">
                  <h2 className="font-semibold text-lg text-gray-900 mb-4">Order Summary</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-xs text-green-600">🎉 Free shipping on orders above Rs. 5,000</p>
                    )}
                    <hr />
                    <div className="flex justify-between text-base">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-primary text-lg">{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Coupon */}
                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="flex-1 px-3 py-2 border rounded-lg text-sm"
                    />
                    <Button variant="outline" size="sm">Apply</Button>
                  </div>

                  <Link href="/checkout" className="block mt-4">
                    <Button size="lg" className="w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link href="/shop" className="block mt-3">
                    <Button variant="ghost" size="sm" className="w-full text-gray-500">
                      Continue Shopping
                    </Button>
                  </Link>
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
