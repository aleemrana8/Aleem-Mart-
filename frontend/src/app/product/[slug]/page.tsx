'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { formatPrice } from '@/lib/utils';
import {
  Star, Heart, ShoppingCart, Share2, Shield, Truck, RotateCcw,
  ChevronRight, Minus, Plus, Check, Store, Package, Clock,
  ThumbsUp, Sparkles, Zap
} from 'lucide-react';

// Mock product data
const product = {
  title: 'Premium Wireless Noise-Cancelling Headphones Pro X100',
  price: 12999,
  comparePrice: 19999,
  rating: 4.7,
  totalReviews: 328,
  totalSold: 2100,
  stock: 15,
  brand: 'AudioMax',
  sku: 'AMX-HP-100',
  description: 'Experience unparalleled audio quality with our flagship noise-cancelling headphones. Featuring advanced ANC technology, 40-hour battery life, and premium comfort for all-day wear. The Pro X100 delivers studio-quality sound with deep bass, crystal-clear mids, and sparkling highs.',
  features: [
    'Active Noise Cancellation (ANC)',
    '40-Hour Battery Life',
    'Bluetooth 5.3 Multi-Point',
    'Hi-Res Audio Certified',
    'Foldable Premium Design',
    'Touch Controls & Voice Assistant',
  ],
  specifications: [
    { key: 'Driver Size', value: '40mm' },
    { key: 'Frequency Response', value: '20Hz - 40kHz' },
    { key: 'Impedance', value: '32 Ohm' },
    { key: 'Battery', value: '750mAh Li-Polymer' },
    { key: 'Charging', value: 'USB-C Fast Charge' },
    { key: 'Weight', value: '265g' },
    { key: 'Connectivity', value: 'Bluetooth 5.3, 3.5mm AUX' },
    { key: 'Colors', value: 'Midnight Black, Arctic White, Navy Blue' },
  ],
  variants: [
    { name: 'Midnight Black', inStock: true },
    { name: 'Arctic White', inStock: true },
    { name: 'Navy Blue', inStock: false },
  ],
  store: { name: 'AudioMax Official', slug: 'audiomax', rating: 4.8 },
  estimatedDelivery: '3-5 business days',
};

const reviews = [
  { id: '1', user: 'Ahmed K.', rating: 5, date: '2 weeks ago', comment: 'Best headphones I\'ve ever owned. The noise cancellation is incredible and battery lasts forever.', helpful: 24 },
  { id: '2', user: 'Sara M.', rating: 4, date: '1 month ago', comment: 'Great sound quality and comfortable for long sessions. Wish the case was a bit more compact.', helpful: 12 },
  { id: '3', user: 'Hassan R.', rating: 5, date: '1 month ago', comment: 'Premium build quality. Worth every rupee. The multi-point connection is a game changer.', helpful: 18 },
];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  const discount = Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/category/electronics" className="hover:text-foreground transition-colors">Electronics</Link>
            <ChevronRight size={12} />
            <span className="text-foreground truncate max-w-[200px]">Headphones</span>
          </nav>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="relative aspect-square rounded-3xl bg-muted/30 border border-border/50 overflow-hidden flex items-center justify-center">
                <div className="text-8xl">🎧</div>
                {discount > 0 && (
                  <span className="absolute top-4 left-4 px-3 py-1.5 bg-destructive text-destructive-foreground text-sm font-bold rounded-xl">
                    -{discount}% OFF
                  </span>
                )}
                <button className="absolute top-4 right-4 p-3 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 hover:bg-background hover:text-primary transition-colors">
                  <Heart size={18} />
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl border-2 flex items-center justify-center bg-muted/20 transition-all shrink-0 ${
                      selectedImage === i ? 'border-primary shadow-glow' : 'border-border/50 hover:border-border'
                    }`}
                  >
                    <span className="text-2xl">🎧</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-5"
            >
              {/* Store */}
              <div className="flex items-center justify-between">
                <Link href={`/store/${product.store.slug}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Store size={14} /> {product.store.name}
                </Link>
                <button className="p-2 rounded-xl hover:bg-muted/60 text-muted-foreground">
                  <Share2 size={16} />
                </button>
              </div>

              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={16} className={i <= Math.floor(product.rating) ? 'fill-primary text-primary' : 'fill-muted text-muted'} />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.totalReviews} reviews)</span>
                <span className="text-sm text-muted-foreground">|</span>
                <span className="text-sm text-muted-foreground">{product.totalSold.toLocaleString()} sold</span>
                <span className="text-sm text-success font-medium flex items-center gap-1">
                  <Check size={12} /> In Stock
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-muted/30 border border-border/50">
                <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.comparePrice)}</span>
                <span className="px-2.5 py-1 bg-success/10 text-success text-sm font-semibold rounded-lg">
                  Save {formatPrice(product.comparePrice - product.price)}
                </span>
              </div>

              {/* Variants */}
              <div className="space-y-2.5">
                <p className="text-sm font-medium text-foreground">Color: <span className="text-muted-foreground">{product.variants[selectedVariant].name}</span></p>
                <div className="flex gap-2">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.name}
                      onClick={() => setSelectedVariant(i)}
                      disabled={!v.inStock}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                        selectedVariant === i
                          ? 'border-primary bg-primary/5 text-primary'
                          : v.inStock
                          ? 'border-border/50 text-foreground hover:border-border'
                          : 'border-border/30 text-muted-foreground opacity-50 cursor-not-allowed line-through'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2.5">
                <p className="text-sm font-medium text-foreground">Quantity</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border/60 rounded-xl overflow-hidden">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-muted/60 transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-3 hover:bg-muted/60 transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-xs text-muted-foreground">{product.stock} pieces available</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex-1 btn-premium py-4 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} /> Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex-1 py-4 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                >
                  <Zap size={16} /> Buy Now
                </motion.button>
              </div>

              {/* Delivery & Trust */}
              <div className="space-y-3 p-4 rounded-2xl bg-muted/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <Truck size={16} className="text-success" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Free Standard Delivery</p>
                    <p className="text-xs text-muted-foreground">Estimated {product.estimatedDelivery}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw size={16} className="text-info" />
                  <div>
                    <p className="text-sm font-medium text-foreground">7-Day Easy Returns</p>
                    <p className="text-xs text-muted-foreground">Free return if product has issues</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield size={16} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Buyer Protection</p>
                    <p className="text-xs text-muted-foreground">Get a refund if item not as described</p>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground px-3 py-2 rounded-lg bg-muted/30 border border-border/30">
                  <Shield size={12} className="text-success" /> Genuine Product
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground px-3 py-2 rounded-lg bg-muted/30 border border-border/30">
                  <Package size={12} className="text-primary" /> Secure Packaging
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground px-3 py-2 rounded-lg bg-muted/30 border border-border/30">
                  <Clock size={12} className="text-info" /> 1 Year Warranty
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12 border-t border-border/50 pt-8">
            <div className="flex gap-1 border-b border-border/50 mb-6">
              {(['description', 'specifications', 'reviews'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-medium transition-colors relative capitalize ${
                    activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab === 'reviews' ? `Reviews (${product.totalReviews})` : tab}
                  {activeTab === tab && (
                    <motion.div layoutId="product-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {activeTab === 'description' && (
              <div className="max-w-3xl space-y-4">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                <h3 className="text-lg font-semibold text-foreground pt-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check size={14} className="text-success flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="max-w-2xl">
                <div className="rounded-2xl border border-border/50 overflow-hidden">
                  {product.specifications.map((spec, i) => (
                    <div key={spec.key} className={`flex items-center px-5 py-3.5 text-sm ${i % 2 === 0 ? 'bg-muted/20' : ''}`}>
                      <span className="w-48 font-medium text-foreground">{spec.key}</span>
                      <span className="text-muted-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl space-y-4">
                {/* AI Summary */}
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-3 mb-6">
                  <Sparkles size={16} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">AI Review Summary</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Customers love the excellent noise cancellation and premium build quality.
                      Battery life exceeds expectations. Some users wish the carrying case was more compact.
                    </p>
                  </div>
                </div>

                {reviews.map(review => (
                  <div key={review.id} className="p-4 rounded-2xl border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                          {review.user.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-foreground">{review.user}</span>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} size={12} className={i <= review.rating ? 'fill-primary text-primary' : 'fill-muted text-muted'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                    <button className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                      <ThumbsUp size={12} /> Helpful ({review.helpful})
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
