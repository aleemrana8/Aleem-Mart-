'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { formatPrice } from '@/lib/utils';
import {
  Lock, CreditCard, Truck, Shield, ChevronRight, MapPin,
  Check, Zap, Tag, Package, ArrowLeft
} from 'lucide-react';

const cartItems = [
  { id: '1', title: 'Premium Wireless Headphones Pro X100', price: 12999, quantity: 1, image: '🎧', variant: 'Midnight Black' },
  { id: '2', title: 'USB-C Hub 7-in-1', price: 2999, quantity: 2, image: '🔌', variant: 'Silver' },
];

export default function CheckoutPage() {
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [coupon, setCoupon] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const steps = [
    { key: 'shipping', label: 'Shipping', number: 1 },
    { key: 'payment', label: 'Payment', number: 2 },
    { key: 'review', label: 'Review', number: 3 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1100px] mx-auto px-4 lg:px-6 py-6 lg:py-10">
          {/* Back + Title */}
          <div className="flex items-center gap-3 mb-6">
            <Link href="/cart" className="p-2 rounded-xl hover:bg-muted/60 text-muted-foreground">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Checkout</h1>
              <p className="text-sm text-muted-foreground">Complete your order securely</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <button
                  onClick={() => setStep(s.key as typeof step)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    step === s.key ? 'bg-primary/10 text-primary' :
                    steps.findIndex(x => x.key === step) > i ? 'text-success' : 'text-muted-foreground'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === s.key ? 'bg-primary text-primary-foreground' :
                    steps.findIndex(x => x.key === step) > i ? 'bg-success text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {steps.findIndex(x => x.key === step) > i ? <Check size={12} /> : s.number}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && <ChevronRight size={14} className="text-muted-foreground" />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
            {/* Main Content */}
            <div className="space-y-6">
              {step === 'shipping' && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="p-6 rounded-2xl border border-border/50">
                    <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                      <MapPin size={16} className="text-primary" /> Shipping Address
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
                        <input className="input-premium" placeholder="Muhammad Aleem" defaultValue="Muhammad Aleem" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Phone</label>
                        <input className="input-premium" placeholder="+92 315 1664843" defaultValue="+92 315 1664843" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Address</label>
                        <input className="input-premium" placeholder="Street address" defaultValue="Hostel City, Park Road" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">City</label>
                        <input className="input-premium" placeholder="City" defaultValue="Islamabad" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Postal Code</label>
                        <input className="input-premium" placeholder="44000" defaultValue="44000" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl border border-border/50">
                    <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                      <Truck size={16} className="text-primary" /> Delivery Method
                    </h2>
                    <div className="space-y-3">
                      <label className="flex items-center gap-4 p-4 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer">
                        <input type="radio" name="delivery" defaultChecked className="accent-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">Standard Delivery</p>
                          <p className="text-xs text-muted-foreground">3-5 business days</p>
                        </div>
                        <span className="text-sm font-semibold text-success">FREE</span>
                      </label>
                      <label className="flex items-center gap-4 p-4 rounded-xl border border-border/50 cursor-pointer hover:border-border transition-colors">
                        <input type="radio" name="delivery" className="accent-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                            <Zap size={12} className="text-primary" /> Express Delivery
                          </p>
                          <p className="text-xs text-muted-foreground">1-2 business days</p>
                        </div>
                        <span className="text-sm font-semibold text-foreground">Rs. 200</span>
                      </label>
                    </div>
                  </div>

                  <button onClick={() => setStep('payment')} className="w-full btn-premium py-4 text-sm font-semibold flex items-center justify-center gap-2">
                    Continue to Payment <ChevronRight size={16} />
                  </button>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="p-6 rounded-2xl border border-border/50">
                    <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
                      <CreditCard size={16} className="text-primary" /> Payment Method
                    </h2>
                    <div className="space-y-3">
                      {[
                        { key: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard' },
                        { key: 'jazzcash', label: 'JazzCash', desc: 'Mobile wallet' },
                        { key: 'easypaisa', label: 'Easypaisa', desc: 'Mobile wallet' },
                        { key: 'cod', label: 'Cash on Delivery', desc: 'Pay when delivered' },
                      ].map(method => (
                        <label
                          key={method.key}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                            paymentMethod === method.key ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-border'
                          }`}
                        >
                          <input type="radio" name="payment" value={method.key} checked={paymentMethod === method.key}
                            onChange={(e) => setPaymentMethod(e.target.value)} className="accent-primary" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{method.label}</p>
                            <p className="text-xs text-muted-foreground">{method.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep('shipping')} className="px-6 py-3 rounded-xl border border-border text-sm font-medium hover:bg-muted/60 transition-colors">Back</button>
                    <button onClick={() => setStep('review')} className="flex-1 btn-premium py-3 text-sm font-semibold flex items-center justify-center gap-2">
                      Review Order <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'review' && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="p-6 rounded-2xl border border-border/50 space-y-4">
                    <h2 className="text-base font-semibold text-foreground">Order Items</h2>
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center gap-4 py-3 border-b border-border/30 last:border-0">
                        <div className="w-14 h-14 rounded-xl bg-muted/30 flex items-center justify-center text-2xl">{item.image}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.variant} • Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-foreground">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep('payment')} className="px-6 py-3 rounded-xl border border-border text-sm font-medium hover:bg-muted/60 transition-colors">Back</button>
                    <button className="flex-1 btn-premium py-4 text-sm font-semibold flex items-center justify-center gap-2">
                      <Lock size={14} /> Place Order • {formatPrice(total)}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="p-5 rounded-2xl border border-border/50 space-y-4">
                <h3 className="font-semibold text-foreground">Order Total</h3>
                <div className="space-y-3 pb-3 border-b border-border/30">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center text-lg">{item.image}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-xs font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-success font-medium">Free</span></div>
                  <div className="flex justify-between pt-2 border-t border-border/50">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-lg font-bold text-foreground">{formatPrice(total)}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-border/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield size={12} className="text-success" /> Secure 256-bit SSL encryption
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Package size={12} className="text-primary" /> Buyer protection guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
