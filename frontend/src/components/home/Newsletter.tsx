'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex p-3 bg-primary/20 rounded-xl mb-4">
            <Mail size={28} className="text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Stay in the Loop
          </h2>
          <p className="text-gray-400 mb-8">
            Subscribe to get exclusive offers, new arrivals, and insider deals delivered to your inbox.
          </p>

          {subscribed ? (
            <div className="bg-green-500/20 text-green-300 p-4 rounded-xl">
              ✓ Thank you for subscribing! Check your email for exclusive deals.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                required
              />
              <Button type="submit" size="lg" className="rounded-xl px-6 whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          )}

          <p className="text-xs text-gray-500 mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
