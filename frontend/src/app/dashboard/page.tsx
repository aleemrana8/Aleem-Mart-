'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { formatPrice } from '@/lib/utils';
import {
  Package, Clock, CheckCircle2, Truck, MapPin, Heart, Eye,
  Bell, Settings, CreditCard, Star, ChevronRight, ShoppingBag,
  RotateCcw, Download, Gift, Sparkles, TrendingUp
} from 'lucide-react';

const orders = [
  { id: 'AM-20260512-001', date: 'May 12, 2026', items: 3, total: 24999, status: 'delivered', tracking: 'Delivered on May 15' },
  { id: 'AM-20260508-002', date: 'May 8, 2026', items: 1, total: 12999, status: 'shipped', tracking: 'In transit - Arrives May 20' },
  { id: 'AM-20260501-003', date: 'May 1, 2026', items: 2, total: 7498, status: 'processing', tracking: 'Being prepared' },
];

const recentlyViewed = [
  { id: '1', title: 'Wireless Headphones Pro', price: 12999, image: '🎧' },
  { id: '2', title: 'Smart Watch X200', price: 11999, image: '⌚' },
  { id: '3', title: 'Laptop Stand Pro', price: 2999, image: '💻' },
  { id: '4', title: 'USB-C Hub 7-in-1', price: 2999, image: '🔌' },
];

const statusConfig = {
  delivered: { label: 'Delivered', color: 'text-success bg-success/10', icon: CheckCircle2 },
  shipped: { label: 'Shipped', color: 'text-info bg-info/10', icon: Truck },
  processing: { label: 'Processing', color: 'text-warning bg-warning/10', icon: Clock },
  cancelled: { label: 'Cancelled', color: 'text-destructive bg-destructive/10', icon: RotateCcw },
};

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('orders');

  const tabs = [
    { key: 'orders', label: 'My Orders', icon: Package },
    { key: 'wishlist', label: 'Wishlist', icon: Heart },
    { key: 'addresses', label: 'Addresses', icon: MapPin },
    { key: 'payments', label: 'Payments', icon: CreditCard },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6 lg:py-10">
          {/* User Banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-gradient-to-r from-brand-navy to-brand-navy-light p-6 lg:p-8 mb-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-brand-orange flex items-center justify-center text-white text-xl font-bold shadow-glow">
                MA
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-white">Welcome back, Muhammad Aleem</h1>
                <p className="text-sm text-neutral-400 mt-0.5">Member since May 2024 • Gold Tier</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-lg font-bold text-white">12</p>
                  <p className="text-[10px] text-neutral-400 uppercase">Orders</p>
                </div>
                <div className="text-center px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-lg font-bold text-primary">2,450</p>
                  <p className="text-[10px] text-neutral-400 uppercase">Points</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
            {/* Sidebar Tabs */}
            <nav className="space-y-1 lg:sticky lg:top-32 lg:self-start">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* Content */}
            <div className="space-y-6">
              {activeTab === 'orders' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">My Orders</h2>
                    <Link href="/orders" className="text-sm text-primary hover:underline">View All</Link>
                  </div>

                  {orders.map(order => {
                    const config = statusConfig[order.status as keyof typeof statusConfig];
                    const StatusIcon = config.icon;
                    return (
                      <div key={order.id} className="p-5 rounded-2xl border border-border/50 hover:border-border hover:shadow-card transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <div>
                            <p className="text-sm font-semibold text-foreground">{order.id}</p>
                            <p className="text-xs text-muted-foreground">{order.date} • {order.items} items</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${config.color}`}>
                              <StatusIcon size={12} /> {config.label}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Truck size={14} />
                            {order.tracking}
                          </div>
                          <p className="font-bold text-foreground">{formatPrice(order.total)}</p>
                        </div>
                        <div className="flex gap-2 mt-3 pt-3 border-t border-border/30">
                          <Link href={`/orders/${order.id}`} className="text-xs font-medium text-primary hover:underline">
                            View Details
                          </Link>
                          {order.status === 'delivered' && (
                            <>
                              <span className="text-border">•</span>
                              <button className="text-xs font-medium text-muted-foreground hover:text-foreground">Write Review</button>
                              <span className="text-border">•</span>
                              <button className="text-xs font-medium text-muted-foreground hover:text-foreground">Buy Again</button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {activeTab === 'wishlist' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <h2 className="text-lg font-bold text-foreground">My Wishlist</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {recentlyViewed.map(item => (
                      <div key={item.id} className="p-4 rounded-2xl border border-border/50 hover:shadow-card transition-all group">
                        <div className="aspect-square rounded-xl bg-muted/30 flex items-center justify-center mb-3 text-3xl">
                          {item.image}
                        </div>
                        <h3 className="text-sm font-medium text-foreground line-clamp-1">{item.title}</h3>
                        <p className="text-sm font-bold text-foreground mt-1">{formatPrice(item.price)}</p>
                        <button className="w-full mt-2 py-2 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'addresses' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">Saved Addresses</h2>
                    <button className="text-sm font-medium text-primary hover:underline">+ Add New</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl border-2 border-primary/30 bg-primary/5 relative">
                      <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-medium bg-primary/10 text-primary rounded-full">Default</span>
                      <p className="font-medium text-foreground">Home</p>
                      <p className="text-sm text-muted-foreground mt-1">Hostel City, Park Road</p>
                      <p className="text-sm text-muted-foreground">Islamabad, Pakistan</p>
                      <p className="text-sm text-muted-foreground">+92 315 1664843</p>
                    </div>
                    <div className="p-5 rounded-2xl border border-border/50 hover:border-border transition-colors">
                      <p className="font-medium text-foreground">Office</p>
                      <p className="text-sm text-muted-foreground mt-1">Blue Area, F-6</p>
                      <p className="text-sm text-muted-foreground">Islamabad, Pakistan</p>
                      <p className="text-sm text-muted-foreground">+92 315 1664843</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {(activeTab === 'payments' || activeTab === 'notifications' || activeTab === 'settings') && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                    <Settings size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground mt-1">This section is under development.</p>
                </motion.div>
              )}

              {/* Recently Viewed */}
              <div className="pt-6 border-t border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Eye size={16} className="text-muted-foreground" />
                    Recently Viewed
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {recentlyViewed.map(item => (
                    <Link key={item.id} href={`/product/${item.id}`} className="p-3 rounded-xl border border-border/50 hover:border-border hover:shadow-sm transition-all group">
                      <div className="aspect-square rounded-lg bg-muted/30 flex items-center justify-center text-2xl mb-2">
                        {item.image}
                      </div>
                      <p className="text-xs text-foreground line-clamp-1 font-medium">{item.title}</p>
                      <p className="text-xs font-bold text-foreground mt-0.5">{formatPrice(item.price)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}