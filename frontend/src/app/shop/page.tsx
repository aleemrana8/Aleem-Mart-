'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shared/ProductCard';
import { SlidersHorizontal, Grid3X3, List, Loader2 } from 'lucide-react';
import api from '@/lib/api';

interface Product {
  _id: string;
  title: string;
  slug: string;
  images: string[];
  price: number;
  comparePrice?: number;
  rating: number;
  totalReviews: number;
  store?: { name: string; slug: string };
}

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState(searchParams.get('sort') || '-createdAt');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const search = searchParams.get('q') || '';

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { page: String(page), limit: '12', sort };
      if (category) params.category = category;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (search) params.search = search;

      const { data } = await api.get('/products', { params });
      setProducts(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotal(data.pagination?.total || 0);
    } catch (err) {
      console.error('Failed to load products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, sort, category, search]);

  const applyFilters = () => {
    setPage(1);
    fetchProducts();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Shop</span>
            {search && <><span>/</span><span className="text-foreground">&quot;{search}&quot;</span></>}
          </nav>

          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <aside className={`w-64 shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="rounded-2xl border border-border/50 p-5 space-y-6 sticky top-24">
                <div>
                  <h3 className="font-semibold text-foreground mb-3 text-sm">Categories</h3>
                  <ul className="space-y-1">
                    {[
                      { value: 'electronics', label: 'Electronics' },
                      { value: 'fashion', label: 'Fashion' },
                      { value: 'home-living', label: 'Home & Living' },
                      { value: 'beauty-health', label: 'Beauty & Health' },
                      { value: 'sports-fitness', label: 'Sports & Fitness' },
                      { value: 'gaming', label: 'Gaming' },
                      { value: 'books-stationery', label: 'Books & Stationery' },
                      { value: 'groceries', label: 'Groceries' },
                    ].map((cat) => (
                      <li key={cat.value}>
                        <button
                          onClick={() => { setCategory(category === cat.value ? '' : cat.value); setPage(1); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                            category === cat.value ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          }`}
                        >
                          {cat.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3 text-sm">Price Range</h3>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="input-premium text-sm w-full" />
                    <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="input-premium text-sm w-full" />
                  </div>
                  <button onClick={applyFilters} className="w-full mt-2 btn-premium py-2 text-xs font-semibold">Apply</button>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3 text-sm">Sort By</h3>
                  <ul className="space-y-1">
                    {[
                      { value: '-createdAt', label: 'Newest First' },
                      { value: 'price', label: 'Price: Low to High' },
                      { value: '-price', label: 'Price: High to Low' },
                      { value: '-rating', label: 'Top Rated' },
                      { value: '-totalSold', label: 'Best Selling' },
                    ].map((s) => (
                      <li key={s.value}>
                        <button
                          onClick={() => { setSort(s.value); setPage(1); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                            sort === s.value ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          }`}
                        >
                          {s.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 rounded-2xl border border-border/50 p-4">
                <div className="flex items-center gap-4">
                  <button
                    className="lg:hidden flex items-center gap-2 text-sm text-muted-foreground"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal size={16} /> Filters
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {loading ? 'Loading...' : `${total} products found`}
                  </span>
                </div>
                <div className="hidden sm:flex border border-border/50 rounded-xl overflow-hidden">
                  <button onClick={() => setViewMode('grid')} className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                    <Grid3X3 size={14} />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                    <List size={14} />
                  </button>
                </div>
              </div>

              {/* Loading */}
              {loading && (
                <div className="flex items-center justify-center py-20">
                  <Loader2 size={32} className="animate-spin text-primary" />
                </div>
              )}

              {/* Empty */}
              {!loading && products.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-lg font-medium text-foreground mb-2">No products found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
                </div>
              )}

              {/* Grid */}
              {!loading && products.length > 0 && (
                <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {products.map((product) => (
                    <ProductCard key={product._id} product={{
                      id: product._id,
                      title: product.title,
                      slug: product.slug,
                      images: product.images,
                      price: product.price,
                      comparePrice: product.comparePrice,
                      rating: product.rating,
                      totalReviews: product.totalReviews,
                      store: product.store || { name: 'Aleem Mart', slug: 'aleem-mart-official' },
                    }} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!loading && totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-4 py-2 rounded-xl border border-border/50 text-sm font-medium disabled:opacity-50 hover:bg-muted/50">Previous</button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
                    <button key={p} onClick={() => setPage(p)} className={`w-10 h-10 rounded-xl text-sm font-medium ${page === p ? 'bg-primary text-primary-foreground' : 'border border-border/50 hover:bg-muted/50'}`}>{p}</button>
                  ))}
                  <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-4 py-2 rounded-xl border border-border/50 text-sm font-medium disabled:opacity-50 hover:bg-muted/50">Next</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
