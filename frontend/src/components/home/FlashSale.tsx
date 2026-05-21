'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Zap } from 'lucide-react';

export function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashItems = [
    { id: 'the-ordinary-niacinamide-serum', title: 'Niacinamide Serum', price: 1499, originalPrice: 2499, discount: 40, sold: 78 },
    { id: 'jbl-flip-6-portable-speaker', title: 'JBL Flip 6 Speaker', price: 9999, originalPrice: 12999, discount: 23, sold: 92 },
    { id: 'ps5-dualsense-wireless-controller', title: 'PS5 DualSense Controller', price: 9999, originalPrice: 12999, discount: 23, sold: 156 },
    { id: 'cerave-moisturizing-cream-539g', title: 'CeraVe Cream 539g', price: 3499, originalPrice: 4999, discount: 30, sold: 45 },
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary rounded-xl">
              <Zap size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Flash Sale</h2>
              <p className="text-sm text-muted-foreground">Limited time — don&apos;t miss out!</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">Ends in:</span>
            <div className="flex gap-1 font-mono">
              {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((val, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="text-muted-foreground font-bold">:</span>}
                  <span className="bg-foreground text-background px-2 py-1 rounded-lg text-xs font-bold">
                    {String(val).padStart(2, '0')}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {flashItems.map((item) => (
            <Link key={item.id} href={`/product/${item.id}`}>
              <div className="rounded-2xl border border-border/50 p-4 hover:shadow-card-hover transition-all duration-300 group">
                <div className="relative mb-3">
                  <div className="w-full h-28 bg-muted/30 rounded-xl flex items-center justify-center">
                    <span className="text-3xl group-hover:scale-110 transition-transform">📦</span>
                  </div>
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-destructive text-destructive-foreground text-xs font-bold">
                    -{item.discount}%
                  </span>
                </div>
                <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-1">{item.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold text-foreground">Rs. {item.price.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground line-through">Rs. {item.originalPrice.toLocaleString()}</span>
                </div>
                <div className="mt-2.5">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${Math.min(item.sold, 100)}%` }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{item.sold} sold</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/shop?sort=-discount" className="inline-flex items-center px-6 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted/60 transition-colors">
            View All Flash Deals
          </Link>
        </div>
      </div>
    </section>
  );
}
