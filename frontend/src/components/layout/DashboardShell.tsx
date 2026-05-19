'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggleCompact } from '@/components/ui/ThemeToggle';
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3,
  Settings, LogOut, ChevronLeft, Bell, Search, Menu, X,
  Store, Tag, Star, Heart, MessageSquare, Truck, CreditCard,
  Shield, Sparkles, Crown, Gift
} from 'lucide-react';

/**
 * ALEEM MART — ENTERPRISE DASHBOARD SHELL
 * Premium layout system with glassmorphism sidebar
 */

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: string | number;
}

interface DashboardShellProps {
  children: ReactNode;
  role: 'admin' | 'seller';
  user?: { name: string; email: string; avatar?: string; role?: string };
}

const adminNav: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={18} /> },
  { label: 'Products', href: '/admin/products', icon: <Package size={18} /> },
  { label: 'Orders', href: '/admin/orders', icon: <ShoppingCart size={18} />, badge: 12 },
  { label: 'Users', href: '/admin/users', icon: <Users size={18} /> },
  { label: 'Sellers', href: '/admin/sellers', icon: <Store size={18} /> },
  { label: 'Analytics', href: '/admin/analytics', icon: <BarChart3 size={18} /> },
  { label: 'Discounts', href: '/admin/discounts', icon: <Tag size={18} /> },
  { label: 'Reviews', href: '/admin/reviews', icon: <Star size={18} /> },
  { label: 'Messages', href: '/admin/messages', icon: <MessageSquare size={18} />, badge: 3 },
  { label: 'AI Engine', href: '/admin/ai', icon: <Sparkles size={18} /> },
  { label: 'Security', href: '/admin/security', icon: <Shield size={18} /> },
  { label: 'Settings', href: '/admin/settings', icon: <Settings size={18} /> },
];

const sellerNav: NavItem[] = [
  { label: 'Dashboard', href: '/seller', icon: <LayoutDashboard size={18} /> },
  { label: 'Products', href: '/seller/products', icon: <Package size={18} /> },
  { label: 'Orders', href: '/seller/orders', icon: <ShoppingCart size={18} />, badge: 5 },
  { label: 'Analytics', href: '/seller/analytics', icon: <BarChart3 size={18} /> },
  { label: 'Reviews', href: '/seller/reviews', icon: <Star size={18} /> },
  { label: 'Shipping', href: '/seller/shipping', icon: <Truck size={18} /> },
  { label: 'Payments', href: '/seller/payments', icon: <CreditCard size={18} /> },
  { label: 'Promotions', href: '/seller/promotions', icon: <Gift size={18} /> },
  { label: 'Messages', href: '/seller/messages', icon: <MessageSquare size={18} />, badge: 2 },
  { label: 'Settings', href: '/seller/settings', icon: <Settings size={18} /> },
];

export function DashboardShell({ children, role, user }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navItems = role === 'admin' ? adminNav : sellerNav;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col h-full border-r border-border/50 bg-card/50 backdrop-blur-xl transition-all duration-300',
        collapsed ? 'w-[68px]' : 'w-[260px]'
      )}>
        {/* Logo / Brand */}
        <div className="flex items-center h-16 px-4 border-b border-border/50">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-brand-orange flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-foreground whitespace-nowrap"
              >
                Aleem Mart
              </motion.span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1.5 rounded-lg hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={16} className={cn('transition-transform', collapsed && 'rotate-180')} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto scrollbar-hide space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'sidebar-nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60',
                )}
                title={collapsed ? item.label : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId={`nav-indicator-${role}`}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-primary/15 text-primary">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-border/50 p-3">
          <div className={cn('flex items-center gap-3 px-2 py-2 rounded-xl', collapsed && 'justify-center')}>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold flex-shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.role || role}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-[260px] flex flex-col bg-card border-r border-border/50 lg:hidden"
            >
              <div className="flex items-center justify-between h-14 px-4 border-b border-border/50">
                <span className="font-bold text-foreground">Aleem Mart</span>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-muted/80">
                  <X size={18} />
                </button>
              </div>
              <nav className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                        isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/60',
                      )}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-primary/15 text-primary">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-border/50 bg-card/30 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-muted/80 text-muted-foreground"
            >
              <Menu size={20} />
            </button>
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/40 border border-border/50 w-64">
              <Search size={14} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1"
              />
              <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded bg-muted border border-border/60 text-muted-foreground">⌘K</kbd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggleCompact />
            <button className="relative p-2 rounded-xl hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
