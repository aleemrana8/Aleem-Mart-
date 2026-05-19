'use client';

import { useState } from 'react';
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
    <section className="py-16 bg-brand-navy">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex p-3 bg-primary/20 rounded-xl mb-4">
            <Mail size={24} className="text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Stay in the Loop</h2>
          <p className="text-sm text-white/60 mb-8">
            Subscribe for exclusive offers, new arrivals, and insider deals.
          </p>

          {subscribed ? (
            <div className="bg-success/20 text-success p-4 rounded-xl text-sm">
              ✓ Thank you! Check your email for exclusive deals.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-11 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm outline-none focus:border-primary/60"
                required
              />
              <button type="submit" className="btn-premium px-6 h-11 text-sm font-semibold whitespace-nowrap">
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[11px] text-white/40 mt-4">No spam. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
