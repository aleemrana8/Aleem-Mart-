'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';
import {
  Lock, CreditCard, Truck, Shield, ChevronRight, MapPin,
  Check, Zap, Package, ArrowLeft, Loader2, CheckCircle
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalItems, totalPrice, fetchCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState('');

  const [shipping, setShipping] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Pakistan',
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
      if (user) {
        setShipping(s => ({ ...s, fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim() }));
      }
    } else {
      router.push('/login');
    }
  }, [isAuthenticated]);

  const shippingFee = totalPrice > 5000 ? 0 : 200;
  const total = totalPrice + shippingFee;

  const handlePlaceOrder = async () => {
    setError('');
    setPlacing(true);
    try {
      const { data } = await api.post('/orders', {
        shippingAddress: {
          fullName: shipping.fullName,
          phone: shipping.phone,
          street: shipping.address,
          city: shipping.city,
          state: shipping.state,
          postalCode: shipping.postalCode,
          country: shipping.country,
        },
        paymentMethod,
      });
      setOrderNumber(data.data.orderNumber);
      setOrderPlaced(true);
      fetchCart(); // refresh cart (should be empty now)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} className="text-success" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Order Placed!</h1>
            <p className="text-muted-foreground mb-1">Your order <strong className="text-foreground">#{orderNumber}</strong> has been confirmed.</p>
            <p className="text-sm text-muted-foreground mb-6">You will receive a confirmation email shortly.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/orders" className="btn-premium px-6 py-3 text-sm font-semibold">View Orders</Link>
              <Link href="/shop" className="px-6 py-3 rounded-xl border border-border text-sm font-medium hover:bg-muted/50 transition-colors">Continue Shopping</Link>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

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

          {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl mb-4">{error}</div>}

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
                        <input className="input-premium" placeholder="Full name" value={shipping.fullName} onChange={(e) => setShipping({...shipping, fullName: e.target.value})} required />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Phone</label>
                        <input className="input-premium" placeholder="+92 3XX XXXXXXX" value={shipping.phone} onChange={(e) => setShipping({...shipping, phone: e.target.value})} required />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Address</label>
                        <input className="input-premium" placeholder="Street address" value={shipping.address} onChange={(e) => setShipping({...shipping, address: e.target.value})} required />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">City</label>
                        <input className="input-premium" placeholder="City" value={shipping.city} onChange={(e) => setShipping({...shipping, city: e.target.value})} required />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">State / Province</label>
                        <input className="input-premium" placeholder="Punjab" value={shipping.state} onChange={(e) => setShipping({...shipping, state: e.target.value})} required />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Postal Code</label>
                        <input className="input-premium" placeholder="44000" value={shipping.postalCode} onChange={(e) => setShipping({...shipping, postalCode: e.target.value})} required />
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
                        <span className="text-sm font-semibold text-success">{totalPrice > 5000 ? 'FREE' : 'Rs. 200'}</span>
                      </label>
                      <label className="flex items-center gap-4 p-4 rounded-xl border border-border/50 cursor-pointer hover:border-border transition-colors">
                        <input type="radio" name="delivery" className="accent-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground flex items-center gap-1.5"><Zap size={12} className="text-primary" /> Express Delivery</p>
                          <p className="text-xs text-muted-foreground">1-2 business days</p>
                        </div>
                        <span className="text-sm font-semibold text-foreground">Rs. 500</span>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!shipping.fullName || !shipping.phone || !shipping.address || !shipping.city || !shipping.state) {
                        setError('Please fill in all shipping details');
                        return;
                      }
                      setError('');
                      setStep('payment');
                    }}
                    className="w-full btn-premium py-4 text-sm font-semibold flex items-center justify-center gap-2"
                  >
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
                        { key: 'cod', label: 'Cash on Delivery', desc: 'Pay when delivered' },
                        { key: 'jazzcash', label: 'JazzCash', desc: 'Mobile wallet' },
                        { key: 'easypaisa', label: 'Easypaisa', desc: 'Mobile wallet' },
                        { key: 'stripe', label: 'Credit / Debit Card', desc: 'Visa, Mastercard' },
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
                    <h2 className="text-base font-semibold text-foreground">Order Items ({totalItems})</h2>
                    {items.map(item => (
                      <div key={item._id} className="flex items-center gap-4 py-3 border-b border-border/30 last:border-0">
                        <div className="w-14 h-14 rounded-xl bg-muted/30 overflow-hidden relative">
                          {item.product.images?.[0] ? (
                            <Image src={item.product.images[0]} alt="" fill className="object-cover" sizes="56px" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">🛍️</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.product.title}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-foreground">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 rounded-2xl border border-border/50">
                    <h2 className="text-base font-semibold text-foreground mb-3">Shipping To</h2>
                    <p className="text-sm text-muted-foreground">{shipping.fullName}</p>
                    <p className="text-sm text-muted-foreground">{shipping.address}, {shipping.city} {shipping.postalCode}</p>
                    <p className="text-sm text-muted-foreground">{shipping.phone}</p>
                    <p className="text-sm text-muted-foreground mt-2">Payment: <span className="text-foreground font-medium capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod}</span></p>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep('payment')} className="px-6 py-3 rounded-xl border border-border text-sm font-medium hover:bg-muted/60 transition-colors">Back</button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={placing}
                      className="flex-1 btn-premium py-4 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {placing ? <Loader2 size={16} className="animate-spin" /> : <Lock size={14} />}
                      {placing ? 'Placing Order...' : `Place Order • ${formatPrice(total)}`}
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
                  {items.map(item => (
                    <div key={item._id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted/30 overflow-hidden relative">
                        {item.product.images?.[0] ? (
                          <Image src={item.product.images[0]} alt="" fill className="object-cover" sizes="40px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg">🛍️</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground truncate">{item.product.title}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-xs font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className={shippingFee === 0 ? 'text-success font-medium' : ''}>{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</span></div>
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
