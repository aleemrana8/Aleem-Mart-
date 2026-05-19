'use client';

import { Flame, Clock, Star, ShoppingCart, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const trendingProducts = [
  { id: 1, name: 'AirPods Pro Max Clone', price: 4999, soldCount: 1234, rating: 4.7, image: '🎧', velocity: 'Hot' },
  { id: 2, name: 'Gaming Mouse RGB', price: 2499, soldCount: 890, rating: 4.5, image: '🖱️', velocity: 'Rising' },
  { id: 3, name: 'Mechanical Keyboard 75%', price: 6999, soldCount: 567, rating: 4.8, image: '⌨️', velocity: 'Hot' },
  { id: 4, name: 'Portable Charger 20000mAh', price: 3499, soldCount: 2100, rating: 4.6, image: '🔋', velocity: 'Hot' },
  { id: 5, name: 'Ring Light 18inch', price: 4499, soldCount: 445, rating: 4.4, image: '💡', velocity: 'Rising' },
  { id: 6, name: 'Webcam 4K Ultra', price: 5999, soldCount: 334, rating: 4.5, image: '📷', velocity: 'New' },
  { id: 7, name: 'Monitor Arm Dual', price: 3999, soldCount: 278, rating: 4.6, image: '🖥️', velocity: 'Rising' },
  { id: 8, name: 'Desk Pad XXL', price: 1499, soldCount: 1890, rating: 4.3, image: '🎨', velocity: 'Hot' },
];

const velocityColors: Record<string, string> = {
  Hot: 'bg-red-100 text-red-700',
  Rising: 'bg-amber-100 text-amber-700',
  New: 'bg-blue-100 text-blue-700',
};

function CountdownTimer() {
  const [time, setTime] = useState({ hours: 5, minutes: 23, seconds: 45 });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
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

  return (
    <div className="flex items-center gap-1">
      <Clock size={14} className="text-red-500" />
      <span className="text-xs font-mono font-bold text-red-600">
        {String(time.hours).padStart(2, '0')}:{String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
      </span>
      <span className="text-xs text-gray-500 ml-1">left</span>
    </div>
  );
}

export function TrendingNow() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg animate-pulse">
              <Flame size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
              <p className="text-sm text-gray-500">Most popular products this week</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <CountdownTimer />
            <a href="/products?sort=trending" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View All <ChevronRight size={16} />
            </a>
          </div>
        </div>

        {/* Scrollable Product Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {trendingProducts.slice(0, 8).map((product, index) => (
            <div key={product.id} className="group bg-white rounded-xl border hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <span className="text-3xl group-hover:scale-110 transition-transform">{product.image}</span>
                {/* Ranking badge */}
                <span className="absolute top-2 left-2 w-6 h-6 flex items-center justify-center bg-gray-900 text-white text-[10px] font-bold rounded-full">
                  {index + 1}
                </span>
                <span className={`absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${velocityColors[product.velocity]}`}>
                  {product.velocity}
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-xs font-medium text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
                <div className="flex items-center gap-1 mb-1">
                  <Star size={10} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-[10px] text-gray-500">{product.rating}</span>
                  <span className="text-[10px] text-gray-400">• {product.soldCount.toLocaleString()} sold</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">Rs. {product.price.toLocaleString()}</span>
                  <button className="p-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                    <ShoppingCart size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
