'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuthStore } from '@/store/useAuthStore';
import {
  User, Package, Heart, MapPin, CreditCard, Settings,
  LogOut, ChevronRight, Shield, Bell, Store
} from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated || !user) return null;

  const menuItems = [
    { icon: Package, label: 'My Orders', href: '/orders', desc: 'Track, return, or buy again' },
    { icon: Heart, label: 'Wishlist', href: '/wishlist', desc: 'Your saved items' },
    { icon: MapPin, label: 'Addresses', href: '/account', desc: 'Manage delivery addresses' },
    { icon: CreditCard, label: 'Payment Methods', href: '/account', desc: 'Manage payment options' },
    { icon: Bell, label: 'Notifications', href: '/account', desc: 'Notification preferences' },
    { icon: Shield, label: 'Security', href: '/account', desc: 'Password & login settings' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-[900px] mx-auto px-4 lg:px-6 py-6 lg:py-10">
          {/* Profile Header */}
          <div className="p-6 rounded-2xl border border-border/50 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-brand-orange flex items-center justify-center text-white text-xl font-bold shadow-glow shrink-0">
              {user.firstName?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-foreground">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground mt-1 capitalize">
                {user.role} account
              </p>
            </div>
            {user.role === 'seller' && (
              <Link href="/seller" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                <Store size={14} /> Seller Dashboard
              </Link>
            )}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="p-4 rounded-2xl border border-border/50 hover:shadow-card-hover hover:border-primary/20 transition-all duration-300 group flex items-center gap-4"
                >
                  <div className="p-2.5 rounded-xl bg-muted/40 group-hover:bg-primary/10 transition-colors">
                    <Icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground/50 group-hover:text-primary transition-colors" />
                </Link>
              );
            })}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full p-4 rounded-2xl border border-border/50 hover:border-destructive/30 hover:bg-destructive/5 transition-all duration-300 flex items-center gap-4 group"
          >
            <div className="p-2.5 rounded-xl bg-muted/40 group-hover:bg-destructive/10 transition-colors">
              <LogOut size={18} className="text-muted-foreground group-hover:text-destructive transition-colors" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground group-hover:text-destructive transition-colors">Sign Out</p>
              <p className="text-xs text-muted-foreground">Log out of your account</p>
            </div>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
