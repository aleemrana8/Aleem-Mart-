'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Ban, CheckCircle, AlertTriangle } from 'lucide-react';

const products = [
  { id: '1', title: 'Wireless Earbuds Pro X100', seller: 'TechZone Official', price: 5499, stock: 45, status: 'active', category: 'Electronics', reports: 0 },
  { id: '2', title: 'Slim Fit Casual Shirt', seller: 'FashionHub', price: 2299, stock: 120, status: 'active', category: 'Fashion', reports: 0 },
  { id: '3', title: 'Gaming Mouse RGB Pro', seller: 'GamersParadise', price: 3499, stock: 0, status: 'outOfStock', category: 'Electronics', reports: 0 },
  { id: '4', title: 'Counterfeit Product XYZ', seller: 'ShadyStore', price: 999, stock: 50, status: 'reported', category: 'Electronics', reports: 5 },
  { id: '5', title: 'Premium Leather Wallet', seller: 'FashionHub', price: 4599, stock: 32, status: 'active', category: 'Accessories', reports: 0 },
  { id: '6', title: 'Suspicious Electronics', seller: 'UnknownSeller', price: 199, stock: 999, status: 'reported', category: 'Electronics', reports: 12 },
];

const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'destructive' | 'secondary' }> = {
  active: { label: 'Active', variant: 'success' },
  draft: { label: 'Draft', variant: 'secondary' },
  outOfStock: { label: 'Out of Stock', variant: 'warning' },
  reported: { label: 'Reported', variant: 'destructive' },
  suspended: { label: 'Suspended', variant: 'destructive' },
};

export default function AdminProductsPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
          <p className="text-gray-500">Monitor, moderate, and manage marketplace products</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search products..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'reported', 'outOfStock'].map((f) => (
            <Button key={f} variant={filter === f ? 'default' : 'outline'} size="sm" onClick={() => setFilter(f)} className="capitalize">
              {f === 'outOfStock' ? 'Out of Stock' : f}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Seller</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Reports</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{product.title}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{product.seller}</td>
                  <td className="px-5 py-4 text-sm font-medium">Rs. {product.price.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{product.stock}</td>
                  <td className="px-5 py-4">
                    <Badge variant={statusConfig[product.status]?.variant || 'secondary'}>
                      {statusConfig[product.status]?.label || product.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    {product.reports > 0 ? (
                      <span className="text-sm text-red-600 font-medium flex items-center gap-1">
                        <AlertTriangle size={14} /> {product.reports}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">0</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="View">
                        <Eye size={16} className="text-gray-500" />
                      </button>
                      {product.status === 'reported' && (
                        <>
                          <button className="p-1.5 hover:bg-green-50 rounded-lg" title="Approve">
                            <CheckCircle size={16} className="text-green-600" />
                          </button>
                          <button className="p-1.5 hover:bg-red-50 rounded-lg" title="Remove">
                            <Ban size={16} className="text-red-500" />
                          </button>
                        </>
                      )}
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
