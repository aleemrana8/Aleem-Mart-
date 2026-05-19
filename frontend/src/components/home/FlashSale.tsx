'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
    { id: '1', title: 'TWS Earbuds Pro', price: 2999, originalPrice: 7999, discount: 63, sold: 78 },
    { id: '2', title: 'Smart Band Fitness Tracker', price: 1499, originalPrice: 4999, discount: 70, sold: 92 },
    { id: '3', title: 'Phone Case Premium', price: 499, originalPrice: 1499, discount: 67, sold: 156 },
    { id: '4', title: 'USB-C Fast Charger 65W', price: 1999, originalPrice: 4499, discount: 56, sold: 45 },
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-primary/5 to-primary/10">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Zap size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Flash Sale</h2>
              <p className="text-gray-500">Limited time deals - Don&apos;t miss out!</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={20} className="text-primary" />
            <span className="text-sm text-gray-600">Ends in:</span>
            <div className="flex gap-1">
              <span className="bg-gray-900 text-white px-2 py-1 rounded font-mono text-sm font-bold">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-gray-900 font-bold">:</span>
              <span className="bg-gray-900 text-white px-2 py-1 rounded font-mono text-sm font-bold">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-gray-900 font-bold">:</span>
              <span className="bg-gray-900 text-white px-2 py-1 rounded font-mono text-sm font-bold">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flashItems.map((item) => (
            <Link key={item.id} href={`/product/${item.id}`}>
              <div className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow border">
                <div className="relative mb-3">
                  <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">📦</span>
                  </div>
                  <Badge variant="destructive" className="absolute top-2 left-2">
                    -{item.discount}%
                  </Badge>
                </div>
                <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-primary">Rs. {item.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-400 line-through">Rs. {item.originalPrice.toLocaleString()}</span>
                </div>
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${Math.min(item.sold, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.sold} sold</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/flash-sale">
            <Button variant="outline" size="lg">View All Flash Deals</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
