'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';
import {
  Star, Heart, ShoppingCart, Share2, Shield, Truck, RotateCcw,
  ChevronRight, Minus, Plus, Check, Store, Package, Clock,
  ThumbsUp, Sparkles, Zap, Loader2
} from 'lucide-react';

interface ProductData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  images: string[];
  price: number;
  comparePrice?: number;
  rating: number;
  totalReviews: number;
  totalSold: number;
  stock: number;
  brand?: string;
  sku?: string;
  category?: { name: string; slug: string };
  store?: { name: string; slug: string; rating?: number };
  specifications?: { key: string; value: string }[];
  tags?: string[];
  estimatedDelivery?: string;
  variants?: { name: string; sku: string; price: number; stock: number; isActive: boolean }[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { addToCart, isLoading: cartLoading } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${slug}`);
        setProduct(data.data);
      } catch (err) {
        console.error('Product not found');
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    try {
      await addToCart(product!._id, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (err) {
      console.error('Add to cart failed:', err);
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    try {
      await addToCart(product!._id, quantity);
      router.push('/cart');
    } catch (err) {
      console.error('Buy now failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 size={40} className="animate-spin text-primary" />
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h1>
            <p className="text-muted-foreground mb-4">This product may have been removed or doesn&apos;t exist.</p>
            <Link href="/shop" className="btn-premium px-6 py-3 text-sm font-semibold inline-block">Browse Products</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = product.comparePrice ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight size={12} />
            {product.category && (
              <>
                <Link href={`/shop?category=${product.category.slug}`} className="hover:text-foreground transition-colors">{product.category.name}</Link>
                <ChevronRight size={12} />
              </>
            )}
            <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
          </nav>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
              <div className="relative aspect-square rounded-3xl bg-muted/30 border border-border/50 overflow-hidden">
                <Image
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {discount > 0 && (
                  <span className="absolute top-4 left-4 px-3 py-1.5 bg-destructive text-destructive-foreground text-sm font-bold rounded-xl">
                    -{discount}% OFF
                  </span>
                )}
                <button className="absolute top-4 right-4 p-3 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 hover:bg-background hover:text-primary transition-colors">
                  <Heart size={18} />
                </button>
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-xl border-2 overflow-hidden relative shrink-0 transition-all ${
                        selectedImage === i ? 'border-primary shadow-glow' : 'border-border/50 hover:border-border'
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-5">
              {/* Store */}
              {product.store && (
                <div className="flex items-center justify-between">
                  <Link href={`/store/${product.store.slug}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Store size={14} /> {product.store.name}
                  </Link>
                  <button className="p-2 rounded-xl hover:bg-muted/60 text-muted-foreground">
                    <Share2 size={16} />
                  </button>
                </div>
              )}

              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">{product.title}</h1>

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
                {product.stock > 0 ? (
                  <span className="text-sm text-success font-medium flex items-center gap-1"><Check size={12} /> In Stock</span>
                ) : (
                  <span className="text-sm text-destructive font-medium">Out of Stock</span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-muted/30 border border-border/50">
                <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
                {product.comparePrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">{formatPrice(product.comparePrice)}</span>
                    <span className="px-2.5 py-1 bg-success/10 text-success text-sm font-semibold rounded-lg">
                      Save {formatPrice(product.comparePrice - product.price)}
                    </span>
                  </>
                )}
              </div>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2.5">
                  <p className="text-sm font-medium text-foreground">Variant: <span className="text-muted-foreground">{product.variants[selectedVariant]?.name}</span></p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v, i) => (
                      <button
                        key={v.name}
                        onClick={() => setSelectedVariant(i)}
                        disabled={v.stock === 0}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                          selectedVariant === i
                            ? 'border-primary bg-primary/5 text-primary'
                            : v.stock > 0
                            ? 'border-border/50 text-foreground hover:border-border'
                            : 'border-border/30 text-muted-foreground opacity-50 cursor-not-allowed line-through'
                        }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
                  <span className="text-xs text-muted-foreground">{product.stock} available</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleAddToCart}
                  disabled={cartLoading || product.stock === 0}
                  className="flex-1 btn-premium py-4 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {cartLoading ? <Loader2 size={16} className="animate-spin" /> : addedToCart ? <><Check size={16} /> Added!</> : <><ShoppingCart size={16} /> Add to Cart</>}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 py-4 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
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
                    <p className="text-xs text-muted-foreground">Estimated {product.estimatedDelivery || '3-5 business days'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw size={16} className="text-blue-500" />
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
                  <Clock size={12} className="text-blue-500" /> 1 Year Warranty
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
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4">
                    {product.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground capitalize">{tag.replace('-', ' ')}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && product.specifications && (
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
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-3 mb-6">
                  <Sparkles size={16} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Product Rating: {product.rating}/5</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on {product.totalReviews} verified customer reviews.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Customer reviews will appear here once they are submitted.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
