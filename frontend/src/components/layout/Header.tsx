'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeToggleCompact } from '@/components/ui/ThemeToggle';
import {
  Search, Heart, ShoppingCart, User, Menu, X, ChevronDown,
  ChevronRight, MapPin, Headphones, Package, Sparkles,
  Smartphone, Shirt, Home, Palette, Gamepad2, Dumbbell,
  Gift, Zap, TrendingUp
} from 'lucide-react';

const categories = [
  { 
    name: 'Electronics', slug: 'electronics', icon: Smartphone,
    featured: 'New iPhone 15 Pro',
    subcategories: [
      { name: 'Smartphones', slug: 'smartphones' },
      { name: 'Laptops', slug: 'laptops' },
      { name: 'Tablets', slug: 'tablets' },
      { name: 'Audio', slug: 'audio' },
      { name: 'Wearables', slug: 'wearables' },
      { name: 'Cameras', slug: 'cameras' },
    ]
  },
  {
    name: 'Fashion', slug: 'fashion', icon: Shirt,
    featured: 'Summer Collection 2026',
    subcategories: [
      { name: "Men's Clothing", slug: 'mens' },
      { name: "Women's Clothing", slug: 'womens' },
      { name: 'Kids', slug: 'kids' },
      { name: 'Shoes', slug: 'shoes' },
      { name: 'Accessories', slug: 'accessories' },
      { name: 'Watches', slug: 'watches' },
    ]
  },
  {
    name: 'Home & Kitchen', slug: 'home-kitchen', icon: Home,
    featured: 'Smart Home Essentials',
    subcategories: [
      { name: 'Furniture', slug: 'furniture' },
      { name: 'Kitchen', slug: 'kitchen' },
      { name: 'Bedding', slug: 'bedding' },
      { name: 'Decor', slug: 'decor' },
      { name: 'Appliances', slug: 'appliances' },
      { name: 'Storage', slug: 'storage' },
    ]
  },
  {
    name: 'Beauty', slug: 'health-beauty', icon: Palette,
    featured: 'Top Beauty Brands',
    subcategories: [
      { name: 'Skincare', slug: 'skincare' },
      { name: 'Makeup', slug: 'makeup' },
      { name: 'Haircare', slug: 'haircare' },
      { name: 'Fragrances', slug: 'fragrances' },
      { name: 'Men Grooming', slug: 'grooming' },
      { name: 'Wellness', slug: 'wellness' },
    ]
  },
  {
    name: 'Gaming', slug: 'gaming', icon: Gamepad2,
    featured: 'PS5 & Xbox Series',
    subcategories: [
      { name: 'Consoles', slug: 'consoles' },
      { name: 'PC Gaming', slug: 'pc-gaming' },
      { name: 'Games', slug: 'games' },
      { name: 'Accessories', slug: 'gaming-accessories' },
      { name: 'VR', slug: 'vr' },
      { name: 'Gaming Chairs', slug: 'chairs' },
    ]
  },
  {
    name: 'Sports', slug: 'sports', icon: Dumbbell,
    featured: 'Fitness Equipment Sale',
    subcategories: [
      { name: 'Fitness', slug: 'fitness' },
      { name: 'Outdoor', slug: 'outdoor' },
      { name: 'Team Sports', slug: 'team-sports' },
      { name: 'Swimming', slug: 'swimming' },
      { name: 'Cycling', slug: 'cycling' },
      { name: 'Yoga', slug: 'yoga' },
    ]
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(null);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <header className={cn(
      'sticky top-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-premium-sm'
        : 'bg-background border-b border-border/30'
    )}>
      {/* Main Header */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Mobile Menu */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-muted/80 text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-brand-orange flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="hidden sm:block font-bold text-lg text-foreground tracking-tight">
              Aleem<span className="text-primary">Mart</span>
            </span>
          </Link>

          {/* Delivery Location (desktop) */}
          <button className="hidden xl:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-muted/60">
            <MapPin size={14} className="text-primary" />
            <span className="text-xs">Deliver to</span>
            <span className="font-medium text-foreground">Islamabad</span>
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className={cn(
              'relative w-full transition-all duration-300',
              searchFocused && 'scale-[1.01]'
            )}>
              <div className={cn(
                'flex items-center rounded-2xl border-2 transition-all duration-200 bg-muted/30',
                searchFocused ? 'border-primary/60 shadow-glow bg-background' : 'border-border/60 hover:border-border'
              )}>
                <div className="flex items-center pl-4 pr-2">
                  <Search size={16} className="text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className="flex-1 h-11 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
                <button className="m-1 px-4 h-9 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5">
                  <Search size={14} />
                  <span className="hidden lg:inline">Search</span>
                </button>
              </div>
              
              {/* Search Suggestions */}
              <AnimatePresence>
                {searchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-background rounded-2xl border border-border/60 shadow-premium-lg p-3 z-50"
                  >
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-2">Trending</p>
                        <div className="space-y-0.5">
                          {['iPhone 15 Pro Max', 'Samsung Galaxy S24', 'Gaming Laptop', 'Wireless Earbuds'].map((item, i) => (
                            <Link
                              key={item}
                              href={`/search?q=${encodeURIComponent(item)}`}
                              className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-muted/60 transition-colors"
                            >
                              <TrendingUp size={14} className="text-primary" />
                              <span className="text-sm text-foreground">{item}</span>
                              <span className="ml-auto text-[10px] text-muted-foreground">#{i + 1}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <ThemeToggleCompact />

            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-xl hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors hidden sm:flex"
            >
              <Heart size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              <User size={18} />
              <div className="hidden lg:block text-left">
                <p className="text-[10px] leading-none text-muted-foreground">Hello, Sign in</p>
                <p className="text-xs font-semibold text-foreground">Account</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="flex items-center rounded-xl border border-border/60 bg-muted/30 px-3 h-10">
            <Search size={16} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-full bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground ml-2"
            />
          </div>
        </div>
      </div>

      {/* Mega Menu Navigation */}
      <nav className="hidden lg:block border-t border-border/30 bg-muted/20" ref={megaMenuRef}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <ul className="flex items-center gap-1 h-11 text-sm">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isOpen = megaMenuOpen === cat.slug;
              return (
                <li key={cat.slug} className="relative">
                  <button
                    onMouseEnter={() => setMegaMenuOpen(cat.slug)}
                    onClick={() => setMegaMenuOpen(isOpen ? null : cat.slug)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isOpen ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                    )}
                  >
                    <Icon size={15} />
                    {cat.name}
                    <ChevronDown size={12} className={cn('transition-transform', isOpen && 'rotate-180')} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        onMouseLeave={() => setMegaMenuOpen(null)}
                        className="absolute top-full left-0 mt-1 w-[320px] bg-background rounded-2xl border border-border/60 shadow-premium-lg p-4 z-50"
                      >
                        <div className="space-y-1 mb-3">
                          {cat.subcategories.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/category/${cat.slug}/${sub.slug}`}
                              className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-muted/60 transition-colors group"
                              onClick={() => setMegaMenuOpen(null)}
                            >
                              <span className="text-sm text-foreground">{sub.name}</span>
                              <ChevronRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-border/50 pt-3">
                          <Link
                            href={`/category/${cat.slug}`}
                            className="flex items-center justify-between px-3 py-2 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
                            onClick={() => setMegaMenuOpen(null)}
                          >
                            <span className="text-sm font-medium text-primary">See All {cat.name}</span>
                            <ChevronRight size={14} className="text-primary" />
                          </Link>
                          {cat.featured && (
                            <div className="mt-2 px-3 py-2 rounded-xl bg-muted/40">
                              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Featured</p>
                              <p className="text-sm font-medium text-foreground">{cat.featured}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
            <li className="ml-auto flex items-center gap-3">
              <Link href="/deals" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-primary hover:bg-primary/10 transition-colors">
                <Zap size={14} />
                Deals
              </Link>
              <Link href="/seller/register" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sell on Aleem Mart
              </Link>
              <Link href="/help" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Headphones size={14} />
                Help
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-border/50 bg-background overflow-hidden"
          >
            <div className="p-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-muted/60 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon size={16} />
                    </div>
                    <span className="font-medium text-foreground">{cat.name}</span>
                    <ChevronRight size={16} className="ml-auto text-muted-foreground" />
                  </Link>
                );
              })}
              <div className="border-t border-border/50 pt-3 mt-3 space-y-1">
                <Link href="/deals" className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-muted/60" onClick={() => setIsMenuOpen(false)}>
                  <div className="p-2 rounded-lg bg-primary/10 text-primary"><Zap size={16} /></div>
                  <span className="font-medium text-primary">Deals & Offers</span>
                </Link>
                <Link href="/login" className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-muted/60" onClick={() => setIsMenuOpen(false)}>
                  <div className="p-2 rounded-lg bg-muted text-muted-foreground"><User size={16} /></div>
                  <span className="font-medium text-foreground">Sign In / Register</span>
                </Link>
                <Link href="/orders" className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-muted/60" onClick={() => setIsMenuOpen(false)}>
                  <div className="p-2 rounded-lg bg-muted text-muted-foreground"><Package size={16} /></div>
                  <span className="font-medium text-foreground">My Orders</span>
                </Link>
                <Link href="/wishlist" className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-muted/60" onClick={() => setIsMenuOpen(false)}>
                  <div className="p-2 rounded-lg bg-muted text-muted-foreground"><Heart size={16} /></div>
                  <span className="font-medium text-foreground">Wishlist</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
