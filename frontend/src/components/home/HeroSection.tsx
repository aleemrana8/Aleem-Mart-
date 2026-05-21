'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, Sparkles, Star, Zap, Package } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-[15%] w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-[40%] w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-10 md:py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20"
            >
              <Sparkles size={14} />
              AI-Powered Shopping Experience
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-display-lg font-bold text-foreground leading-[1.1]">
              The Future of{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-brand-orange to-primary">
                Smart Commerce
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Discover thousands of products from verified sellers. AI-personalized recommendations, 
              lightning-fast delivery, and premium shopping experience.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-premium flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
                >
                  Start Shopping <ArrowRight size={16} />
                </motion.button>
              </Link>
              <Link href="/seller">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-7 py-3.5 rounded-xl border-2 border-border/80 text-foreground text-sm font-semibold hover:bg-muted/60 transition-colors"
                >
                  Become a Seller
                </motion.button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-5 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-success/10 text-success">
                  <Truck size={14} />
                </div>
                Free Delivery
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                  <ShieldCheck size={14} />
                </div>
                Secure Payments
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-info/10 text-info">
                  <Package size={14} />
                </div>
                Easy Returns
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[480px]">
              {/* Main visual card */}
              <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-muted/50 to-accent/10 border border-border/50 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center space-y-4">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary to-brand-orange flex items-center justify-center shadow-glow"
                  >
                    <span className="text-4xl">🛍️</span>
                  </motion.div>
                  <p className="text-sm text-muted-foreground">10,000+ Products Available</p>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-6 right-6 glass-card px-4 py-3 rounded-2xl"
              >
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Up to 70% Off</p>
                    <p className="text-xs text-muted-foreground">Summer Collection</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute bottom-10 left-2 glass-card px-4 py-3 rounded-2xl"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={12} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-foreground">100K+ Happy Customers</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute bottom-28 right-4 glass-card px-4 py-3 rounded-2xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs font-medium text-foreground">500+ Active Sellers</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
