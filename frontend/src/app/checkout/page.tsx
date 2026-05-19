'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, CreditCard, Banknote, Smartphone, Lock } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const orderSummary = {
    items: [
      { title: 'Wireless Headphones Pro', qty: 1, price: 4999 },
      { title: 'Premium Cotton T-Shirt', qty: 2, price: 1299 },
    ],
    subtotal: 7597,
    shipping: 0,
    discount: 0,
    total: 7597,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container-custom py-8">
        {/* Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {['Address', 'Payment', 'Review'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`text-sm ${step === i + 1 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>{s}</span>
              {i < 2 && <ChevronRight size={16} className="text-gray-300 mx-2" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                    <Input placeholder="Muhammad Aleem" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</label>
                    <Input placeholder="+92 300 1234567" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Street Address</label>
                    <Input placeholder="House #, Street, Area" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">City</label>
                    <Input placeholder="Lahore" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">State/Province</label>
                    <Input placeholder="Punjab" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Postal Code</label>
                    <Input placeholder="54000" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Country</label>
                    <Input placeholder="Pakistan" defaultValue="Pakistan" />
                  </div>
                </div>
                <Button size="lg" className="mt-6" onClick={() => setStep(2)}>
                  Continue to Payment
                </Button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { id: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when you receive' },
                    { id: 'stripe', label: 'Credit/Debit Card', icon: CreditCard, desc: 'Visa, Mastercard' },
                    { id: 'jazzcash', label: 'JazzCash', icon: Smartphone, desc: 'Mobile wallet' },
                    { id: 'easypaisa', label: 'Easypaisa', icon: Smartphone, desc: 'Mobile wallet' },
                  ].map((method) => {
                    const Icon = method.icon;
                    return (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition ${
                          paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-primary"
                        />
                        <Icon size={24} className="text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">{method.label}</p>
                          <p className="text-xs text-gray-500">{method.desc}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button size="lg" onClick={() => setStep(3)}>Review Order</Button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-lg font-semibold mb-4">Review Your Order</h2>
                <div className="space-y-4">
                  {orderSummary.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.qty)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                  <Button size="lg" className="gap-2">
                    <Lock size={16} /> Place Order - {formatPrice(orderSummary.total)}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({orderSummary.items.length} items)</span>
                  <span>{formatPrice(orderSummary.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(orderSummary.total)}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <Lock size={14} />
                <span>Secure checkout powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
