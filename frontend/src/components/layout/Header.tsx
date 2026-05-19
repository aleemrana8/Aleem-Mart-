'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categories = [
  { name: 'Electronics', slug: 'electronics', subcategories: ['Phones', 'Laptops', 'Tablets', 'Accessories'] },
  { name: 'Fashion', slug: 'fashion', subcategories: ['Men', 'Women', 'Kids', 'Shoes'] },
  { name: 'Home & Living', slug: 'home-living', subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bath'] },
  { name: 'Beauty', slug: 'beauty', subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrances'] },
  { name: 'Gaming', slug: 'gaming', subcategories: ['Consoles', 'Games', 'Accessories', 'PC Gaming'] },
  { name: 'Sports', slug: 'sports', subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Swimming'] },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      {/* Main Header */}
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo-dark.svg"
              alt="Aleem Mart"
              width={160}
              height={45}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 h-11 rounded-full border-2 border-gray-200 focus:border-primary"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            <Link href="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition hidden sm:block">
              <Heart size={22} className="text-gray-700" />
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <ShoppingCart size={22} className="text-gray-700" />
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            <Link href="/login">
              <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                <User size={16} />
                Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 h-10 rounded-full border-2 border-gray-200"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full">
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="hidden lg:block border-t bg-gray-50">
        <div className="container-custom">
          <ul className="flex items-center gap-6 h-10 text-sm">
            {categories.map((cat) => (
              <li key={cat.slug} className="group relative">
                <Link
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-1 text-gray-700 hover:text-primary transition font-medium"
                >
                  {cat.name}
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                </Link>
                {/* Dropdown */}
                <div className="absolute top-full left-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 pt-2">
                  <div className="bg-white rounded-lg shadow-lg border p-4 min-w-[180px]">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        href={`/category/${cat.slug}/${sub.toLowerCase()}`}
                        className="block py-1.5 px-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ))}
            <li>
              <Link href="/deals" className="text-primary font-semibold hover:underline">
                🔥 Deals
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-white absolute top-full left-0 right-0 shadow-lg max-h-[70vh] overflow-y-auto">
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="block py-2 px-3 rounded-lg hover:bg-gray-100 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <hr />
            <div className="space-y-2">
              <Link href="/login" className="block py-2 px-3 rounded-lg hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                Login / Sign Up
              </Link>
              <Link href="/wishlist" className="block py-2 px-3 rounded-lg hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                Wishlist
              </Link>
              <Link href="/orders" className="block py-2 px-3 rounded-lg hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                My Orders
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
