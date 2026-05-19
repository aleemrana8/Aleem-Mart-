'use client';

import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const wishlistItems = [
  { id: '1', title: 'Smart Watch X200', price: 11999, comparePrice: 14999, image: '/placeholder.jpg', slug: 'smart-watch-x200', inStock: true, rating: 4.5 },
  { id: '2', title: 'Gaming Laptop Pro', price: 189999, comparePrice: 220000, image: '/placeholder.jpg', slug: 'gaming-laptop-pro', inStock: true, rating: 4.8 },
  { id: '3', title: 'Wireless Noise Cancelling Headphones', price: 8999, comparePrice: 12999, image: '/placeholder.jpg', slug: 'wireless-headphones', inStock: false, rating: 4.3 },
  { id: '4', title: 'Mechanical Keyboard RGB', price: 6499, comparePrice: 7999, image: '/placeholder.jpg', slug: 'mechanical-keyboard', inStock: true, rating: 4.6 },
  { id: '5', title: 'Portable Power Bank 20000mAh', price: 3499, comparePrice: 4999, image: '/placeholder.jpg', slug: 'power-bank-20000', inStock: true, rating: 4.4 },
];

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Heart size={24} className="text-primary fill-primary" />
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          <p className="text-sm text-gray-500">{wishlistItems.length} items</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-xl border p-12 text-center">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-4">Save items you love for later</p>
            <Link href="/shop">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border overflow-hidden group">
                <div className="h-48 bg-gray-100 relative flex items-center justify-center">
                  <div className="text-gray-300 text-4xl">📷</div>
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-red-50 transition">
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="font-medium text-gray-900 text-sm hover:text-primary transition line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-yellow-500">★ {item.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-gray-900">Rs. {item.price.toLocaleString()}</span>
                    {item.comparePrice && (
                      <span className="text-sm text-gray-400 line-through">Rs. {item.comparePrice.toLocaleString()}</span>
                    )}
                  </div>
                  <Button
                    className="w-full mt-3"
                    size="sm"
                    disabled={!item.inStock}
                  >
                    <ShoppingCart size={14} className="mr-2" />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
