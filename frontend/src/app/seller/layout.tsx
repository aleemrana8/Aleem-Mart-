'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, ShoppingCart, Tags, BarChart3,
  MessageSquare, Settings, Star, Truck, Store, Plus, LogOut
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

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden lg:flex flex-col">
        <div className="p-6 border-b">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Aleem Mart"
              width={130}
              height={40}
              className="h-9 w-auto"
            />
          </Link>
          <p className="text-xs text-gray-500 mt-2">Seller Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sellerNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Link href="/seller/products/new" className="flex items-center gap-2 w-full bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition justify-center">
            <Plus size={16} />
            Add Product
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">Seller Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-500 hover:text-primary">
              View Store →
            </Link>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary">S</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
