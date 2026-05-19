'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, ShoppingCart, Tags, BarChart3,
  MessageSquare, Settings, Star, Truck, Store, Plus, Menu, X
} from 'lucide-react';

const sellerNav = [
  { label: 'Dashboard', href: '/seller', icon: LayoutDashboard },
  { label: 'Products', href: '/seller/products', icon: Package },
  { label: 'Orders', href: '/seller/orders', icon: ShoppingCart },
  { label: 'Discounts', href: '/seller/discounts', icon: Tags },
  { label: 'Analytics', href: '/seller/analytics', icon: BarChart3 },
  { label: 'Reviews', href: '/seller/reviews', icon: Star },
  { label: 'Messages', href: '/seller/messages', icon: MessageSquare },
  { label: 'Shipping', href: '/seller/shipping', icon: Truck },
  { label: 'Store', href: '/seller/store', icon: Store },
  { label: 'Settings', href: '/seller/settings', icon: Settings },
];

export default function SellerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <>
      <div className="p-6 border-b border-border/50">
        <Link href="/" className="text-lg font-bold text-foreground">
          Aleem Mart
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Seller Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {sellerNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/50">
        <Link href="/seller/products/new" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 w-full btn-premium px-4 py-2.5 text-sm font-medium justify-center">
          <Plus size={16} />
          Add Product
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-border/50 hidden lg:flex flex-col bg-background">
        <NavContent />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-background flex flex-col shadow-xl">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-1 text-muted-foreground">
              <X size={18} />
            </button>
            <NavContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="border-b border-border/50 px-4 lg:px-6 py-4 flex items-center justify-between bg-background">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground">
              <Menu size={20} />
            </button>
            <h2 className="font-semibold text-foreground">Seller Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              View Store →
            </Link>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary">S</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
