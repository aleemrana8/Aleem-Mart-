'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, AlertTriangle } from 'lucide-react';

const orders = [
  { id: 'AM-KJ3F2-ABC', buyer: 'Ali Hassan', seller: 'TechZone', items: 2, total: 15499, status: 'processing', payment: 'paid', date: '2024-01-15', dispute: false },
  { id: 'AM-LM4G5-DEF', buyer: 'Sara Khan', seller: 'FashionHub', items: 3, total: 8999, status: 'shipped', payment: 'paid', date: '2024-01-14', dispute: false },
  { id: 'AM-NO6H7-GHI', buyer: 'Usman Ahmed', seller: 'GamersParadise', items: 1, total: 45999, status: 'delivered', payment: 'paid', date: '2024-01-12', dispute: false },
  { id: 'AM-PQ8I9-JKL', buyer: 'Fatima Noor', seller: 'HomeDecor', items: 2, total: 12499, status: 'disputed', payment: 'paid', date: '2024-01-10', dispute: true },
  { id: 'AM-RS0J1-MNO', buyer: 'Hassan Ali', seller: 'TechZone', items: 1, total: 3299, status: 'refunded', payment: 'refunded', date: '2024-01-08', dispute: true },
  { id: 'AM-TU2K3-PQR', buyer: 'Ayesha Raza', seller: 'SportsMax', items: 4, total: 6799, status: 'pending', payment: 'cod', date: '2024-01-15', dispute: false },
];

const statusConfig: Record<string, { color: string }> = {
  pending: { color: 'bg-yellow-100 text-yellow-800' },
  processing: { color: 'bg-blue-100 text-blue-800' },
  shipped: { color: 'bg-purple-100 text-purple-800' },
  delivered: { color: 'bg-green-100 text-green-800' },
  disputed: { color: 'bg-red-100 text-red-800' },
  refunded: { color: 'bg-orange-100 text-orange-800' },
  cancelled: { color: 'bg-gray-100 text-gray-800' },
};

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-500">Monitor all platform orders and resolve disputes</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Orders', value: '3,456', color: 'text-gray-900' },
          { label: 'Pending', value: '89', color: 'text-yellow-600' },
          { label: 'Processing', value: '124', color: 'text-blue-600' },
          { label: 'Disputes', value: '5', color: 'text-red-600' },
          { label: 'Revenue', value: 'Rs. 2.4M', color: 'text-green-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border p-4 text-center">
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search by order ID, buyer, or seller..." className="pl-9" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'processing', 'shipped', 'disputed'].map((f) => (
            <Button key={f} variant={filter === f ? 'default' : 'outline'} size="sm" onClick={() => setFilter(f)} className="capitalize">
              {f}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Buyer</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Seller</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Payment</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      {order.id}
                      {order.dispute && <AlertTriangle size={14} className="text-red-500" />}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{order.buyer}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{order.seller}</td>
                  <td className="px-5 py-4 text-sm font-medium">Rs. {order.total.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <Badge variant={order.payment === 'paid' ? 'success' : order.payment === 'refunded' ? 'warning' : 'secondary'} className="capitalize">
                      {order.payment}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusConfig[order.status]?.color}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{order.date}</td>
                  <td className="px-5 py-4 text-right">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="View Details">
                      <Eye size={16} className="text-gray-500" />
                    </button>
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
