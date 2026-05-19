'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const announcements = [
  '🚚 Free Delivery on orders above Rs. 5,000',
  '💳 Cash on Delivery Available Nationwide',
  '🎉 Summer Sale - Up to 70% Off on Selected Items',
  '📞 24/7 Customer Support Available',
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm relative">
      <p className="animate-fade-in">{announcements[currentIndex]}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition"
        aria-label="Close announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
}
