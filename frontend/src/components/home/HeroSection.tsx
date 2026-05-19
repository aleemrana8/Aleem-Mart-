'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="container-custom py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <ShieldCheck size={16} />
              Trusted by 100,000+ customers
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Shop the Future of{' '}
              <span className="text-primary">Online Shopping</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Discover thousands of products from verified sellers. From electronics to fashion, find everything you need at the best prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop">
                <Button size="xl" className="gap-2">
                  Shop Now <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/seller/register">
                <Button size="xl" variant="outline" className="gap-2">
                  Become a Seller
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-primary" />
                Free Delivery
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-primary" />
                Secure Payments
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[500px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-5xl">🛍️</span>
                </div>
                <p className="text-gray-500 text-sm">Hero banner image</p>
              </div>
              {/* Floating Cards */}
              <div className="absolute top-8 right-8 bg-white rounded-xl shadow-lg p-4 animate-bounce">
                <p className="text-sm font-medium text-gray-900">Up to 70% Off</p>
                <p className="text-xs text-gray-500">Summer Collection</p>
              </div>
              <div className="absolute bottom-12 left-4 bg-white rounded-xl shadow-lg p-4">
                <p className="text-sm font-medium text-green-600">✓ 10,000+ Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
