'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Search, Edit2, Trash2, Eye, Loader2, Package } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';
import { formatPrice } from '@/lib/utils';

interface Product {
  _id: string;
  title: string;
  slug: string;
  price: number;
  salePrice?: number;
  stock: number;
  totalSold: number;
  rating: number;
  images: string[];
  isActive: boolean;
  category?: { name: string };
}

export default function SellerProductsPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      if (!isAuthenticated) await useAuthStore.getState().checkAuth();
      const currentUser = useAuthStore.getState().user;
      const authed = useAuthStore.getState().isAuthenticated;
      if (!authed || currentUser?.role !== 'seller') {
        router.push('/login');
        return;
      }
      fetchProducts();
    };
    init();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/products?limit=50&seller=me');
      if (data.success) setProducts(data.data || []);
    } catch (err) {
      console.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      setDeleting(id);
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete product');
    } finally {
      setDeleting(null);
    }
  };

  const filtered = products.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' ? true : statusFilter === 'active' ? p.isActive && p.stock > 0 : statusFilter === 'outOfStock' ? p.stock === 0 : !p.isActive;
    return matchSearch && matchStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog ({products.length} products)</p>
        </div>
        <Link href="/seller/products/new" className="flex items-center gap-2 btn-premium px-4 py-2.5 text-sm font-medium rounded-lg">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border/50 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border/60 bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-border/60 rounded-lg px-3 py-2 text-sm bg-background text-foreground"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="outOfStock">Out of Stock</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Products Table */}
      {filtered.length > 0 ? (
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Product</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Price</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Stock</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Sold</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Rating</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filtered.map((product) => (
                  <tr key={product._id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {product.images?.[0] ? (
                          <Image src={product.images[0]} alt="" width={40} height={40} className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <Package size={16} className="text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm text-foreground max-w-[200px] truncate">{product.title}</p>
                          <p className="text-xs text-muted-foreground">{product.category?.name || 'Uncategorized'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-foreground">
                      {product.salePrice ? (
                        <div>
                          <span>{formatPrice(product.salePrice)}</span>
                          <span className="text-xs text-muted-foreground line-through ml-1">{formatPrice(product.price)}</span>
                        </div>
                      ) : formatPrice(product.price)}
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <span className={product.stock === 0 ? 'text-red-600 font-medium' : 'text-foreground'}>{product.stock}</span>
                    </td>
                    <td className="px-5 py-4">
                      {product.stock === 0 ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400">Out of Stock</span>
                      ) : product.isActive ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400">Active</span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">Inactive</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{product.totalSold || 0}</td>
                    <td className="px-5 py-4 text-sm">
                      {product.rating > 0 ? (
                        <span className="flex items-center gap-1 text-foreground">★ {product.rating.toFixed(1)}</span>
                      ) : <span className="text-muted-foreground">-</span>}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/product/${product.slug}`} className="p-1.5 hover:bg-muted rounded-lg" title="View">
                          <Eye size={16} className="text-muted-foreground" />
                        </Link>
                        <Link href={`/seller/products/${product._id}/edit`} className="p-1.5 hover:bg-muted rounded-lg" title="Edit">
                          <Edit2 size={16} className="text-muted-foreground" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          disabled={deleting === product._id}
                          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg disabled:opacity-50"
                          title="Delete"
                        >
                          {deleting === product._id ? (
                            <Loader2 size={16} className="animate-spin text-red-400" />
                          ) : (
                            <Trash2 size={16} className="text-red-400" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border/50 p-12 text-center">
          <Package className="mx-auto mb-3 text-muted-foreground" size={40} />
          <h3 className="font-semibold text-foreground mb-1">No products found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {searchQuery ? 'Try a different search term' : 'Start by adding your first product'}
          </p>
          {!searchQuery && (
            <Link href="/seller/products/new" className="inline-flex items-center gap-2 btn-premium px-4 py-2 text-sm font-medium rounded-lg">
              <Plus size={16} /> Add Product
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
