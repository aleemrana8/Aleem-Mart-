'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Eye, Package } from 'lucide-react';

const orders = [
  { id: 'AM-KJ3F2-ABC', customer: 'Ali Hassan', items: 2, total: 5499, status: 'pending', date: '2024-01-15', payment: 'COD' },
  { id: 'AM-LM4G5-DEF', customer: 'Sara Khan', items: 1, total: 12999, status: 'shipped', date: '2024-01-14', payment: 'Stripe' },
  { id: 'AM-NO6H7-GHI', customer: 'Usman Ahmed', items: 3, total: 3299, status: 'delivered', date: '2024-01-13', payment: 'JazzCash' },
  { id: 'AM-PQ8I9-JKL', customer: 'Fatima Noor', items: 1, total: 7999, status: 'confirmed', date: '2024-01-12', payment: 'COD' },
  { id: 'AM-RS0J1-MNO', customer: 'Hassan Ali', items: 2, total: 15499, status: 'cancelled', date: '2024-01-11', payment: 'Easypaisa' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  packed: 'bg-indigo-100 text-indigo-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  returned: 'bg-orange-100 text-orange-800',
};

export default function SellerOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500">Manage and fulfill customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending', value: 12, color: 'text-yellow-600' },
          { label: 'Processing', value: 8, color: 'text-blue-600' },
          { label: 'Shipped', value: 23, color: 'text-purple-600' },
          { label: 'Delivered', value: 156, color: 'text-green-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl border p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search by order ID or customer..." className="pl-9" />
        </div>
        <select className="border rounded-lg px-3 py-2 text-sm bg-white">
          <option>All Status</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Payment</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-5 py-4 text-sm text-gray-500">{order.date}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{order.items}</td>
                  <td className="px-5 py-4 text-sm font-medium">Rs. {order.total.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{order.payment}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="View">
                        <Eye size={16} className="text-gray-500" />
                      </button>
                      {order.status === 'pending' && (
                        <button className="p-1.5 hover:bg-blue-50 rounded-lg" title="Process">
                          <Package size={16} className="text-blue-600" />
                        </button>
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
