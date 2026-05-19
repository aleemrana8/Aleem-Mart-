'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit2, Trash2, Eye, MoreVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

const products = [
  { id: '1', title: 'Wireless Bluetooth Headphones Pro', price: 4999, stock: 45, status: 'active', rating: 4.5, sold: 152, image: '🎧' },
  { id: '2', title: 'Smart Watch Series X', price: 12999, stock: 12, status: 'active', rating: 4.7, sold: 89, image: '⌚' },
  { id: '3', title: 'USB-C Hub 7-in-1', price: 3499, stock: 0, status: 'outOfStock', rating: 4.3, sold: 234, image: '🔌' },
  { id: '4', title: 'Mechanical Gaming Keyboard', price: 7999, stock: 28, status: 'active', rating: 4.6, sold: 67, image: '⌨️' },
  { id: '5', title: 'Portable Bluetooth Speaker', price: 2999, stock: 56, status: 'draft', rating: 0, sold: 0, image: '🔊' },
];

const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'destructive' | 'secondary' }> = {
  active: { label: 'Active', variant: 'success' },
  draft: { label: 'Draft', variant: 'secondary' },
  outOfStock: { label: 'Out of Stock', variant: 'destructive' },
  inactive: { label: 'Inactive', variant: 'warning' },
};

export default function SellerProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500">Manage your product catalog</p>
        </div>
        <Link href="/seller/products/new">
          <Button className="gap-2">
            <Plus size={16} /> Add Product
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <select className="border rounded-lg px-3 py-2 text-sm bg-white">
          <option>All Status</option>
          <option>Active</option>
          <option>Draft</option>
          <option>Out of Stock</option>
        </select>
        <select className="border rounded-lg px-3 py-2 text-sm bg-white">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Fashion</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Sold</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                        {product.image}
                      </div>
                      <span className="font-medium text-sm text-gray-900 max-w-[200px] truncate">
                        {product.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-medium">{formatPrice(product.price)}</td>
                  <td className="px-5 py-4 text-sm">
                    <span className={product.stock === 0 ? 'text-red-600 font-medium' : 'text-gray-600'}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={statusConfig[product.status].variant}>
                      {statusConfig[product.status].label}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{product.sold}</td>
                  <td className="px-5 py-4 text-sm">
                    {product.rating > 0 ? (
                      <span className="flex items-center gap-1">
                        ★ {product.rating}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="View">
                        <Eye size={16} className="text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Edit">
                        <Edit2 size={16} className="text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Delete">
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
