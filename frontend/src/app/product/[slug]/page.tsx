'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Star, Heart, ShoppingCart, Truck, ShieldCheck, RefreshCcw,
  Share2, Minus, Plus, ChevronRight, Store
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  // Sample product data
  const product = {
    title: 'Wireless Bluetooth Headphones Pro - Active Noise Cancelling',
    price: 4999,
    comparePrice: 8999,
    rating: 4.5,
    totalReviews: 234,
    totalSold: 1500,
    stock: 45,
    brand: 'AudioTech',
    sku: 'ATH-BT500',
    description: 'Experience premium sound quality with our Wireless Bluetooth Headphones Pro. Featuring Active Noise Cancelling technology, 40-hour battery life, and ultra-comfortable ear cushions for all-day wear.',
    specifications: [
      { key: 'Connectivity', value: 'Bluetooth 5.3' },
      { key: 'Battery Life', value: '40 hours' },
      { key: 'Noise Cancelling', value: 'Yes - ANC' },
      { key: 'Weight', value: '250g' },
      { key: 'Driver Size', value: '40mm' },
    ],
    variants: ['Black', 'White', 'Navy Blue'],
    store: { name: 'TechZone Official', slug: 'techzone', rating: 4.7 },
    estimatedDelivery: '3-5 business days',
  };

  const discount = Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container-custom py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight size={14} />
            <Link href="/category/electronics" className="hover:text-primary">Electronics</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 truncate">Headphones</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border p-8 flex items-center justify-center h-96">
                <div className="text-8xl">🎧</div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl border-2 bg-white flex items-center justify-center shrink-0 ${
                      selectedImage === i ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <span className="text-2xl">🎧</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-5">
              <div>
                <Link href={`/store/${product.store.slug}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                  <Store size={14} /> {product.store.name}
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{product.title}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.totalReviews} reviews)</span>
                <span className="text-sm text-gray-400">|</span>
                <span className="text-sm text-gray-500">{product.totalSold.toLocaleString()} sold</span>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>
                  <Badge variant="destructive">-{discount}%</Badge>
                </div>
              </div>

              {/* Variants */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Color</label>
                <div className="flex gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                        selectedVariant === v
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 text-center min-w-[50px] font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2 hover:bg-gray-100 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">{product.stock} items available</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button size="xl" className="flex-1 gap-2">
                  <ShoppingCart size={20} /> Add to Cart
                </Button>
                <Button size="xl" variant="outline" className="flex-1">
                  Buy Now
                </Button>
                <Button size="xl" variant="outline" className="px-4">
                  <Heart size={20} />
                </Button>
                <Button size="xl" variant="outline" className="px-4">
                  <Share2 size={20} />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck size={18} className="text-primary shrink-0" />
                  <span>{product.estimatedDelivery}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck size={18} className="text-primary shrink-0" />
                  <span>Genuine Product</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RefreshCcw size={18} className="text-primary shrink-0" />
                  <span>7-Day Return</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl border overflow-hidden">
            <div className="border-b flex">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium capitalize transition ${
                    activeTab === tab
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6">
              {activeTab === 'description' && (
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              )}
              {activeTab === 'specifications' && (
                <table className="w-full">
                  <tbody>
                    {product.specifications.map((spec) => (
                      <tr key={spec.key} className="border-b last:border-0">
                        <td className="py-3 text-sm font-medium text-gray-700 w-1/3">{spec.key}</td>
                        <td className="py-3 text-sm text-gray-600">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === 'reviews' && (
                <p className="text-gray-500 text-center py-8">Reviews will be loaded from the API</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
