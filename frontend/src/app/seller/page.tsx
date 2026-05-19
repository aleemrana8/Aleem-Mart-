'use client';

import { Package, ShoppingCart, DollarSign, TrendingUp, Eye, Star } from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: 'Rs. 245,680', change: '+12.5%', icon: DollarSign, color: 'text-green-600 bg-green-50' },
  { label: 'Total Orders', value: '156', change: '+8.2%', icon: ShoppingCart, color: 'text-blue-600 bg-blue-50' },
  { label: 'Products', value: '48', change: '+3', icon: Package, color: 'text-purple-600 bg-purple-50' },
  { label: 'Store Views', value: '2,340', change: '+15.3%', icon: Eye, color: 'text-amber-600 bg-amber-50' },
];

const recentOrders = [
  { id: 'AM-KJ3F2-ABC123', customer: 'Ali Hassan', items: 2, total: 5499, status: 'pending' },
  { id: 'AM-LM4G5-DEF456', customer: 'Sara Khan', items: 1, total: 12999, status: 'shipped' },
  { id: 'AM-NO6H7-GHI789', customer: 'Usman Ahmed', items: 3, total: 3299, status: 'delivered' },
  { id: 'AM-PQ8I9-JKL012', customer: 'Fatima Noor', items: 1, total: 7999, status: 'confirmed' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
};

export default function SellerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here&apos;s what&apos;s happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-medium text-green-600">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border">
        <div className="p-5 border-b flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Orders</h2>
          <a href="/seller/orders" className="text-sm text-primary hover:underline">View All</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{order.items}</td>
                  <td className="px-5 py-4 text-sm font-medium">Rs. {order.total.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Store Rating</h3>
          <div className="flex items-center gap-3">
            <div className="text-4xl font-bold text-gray-900">4.7</div>
            <div>
              <div className="flex text-yellow-400">
                {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <p className="text-sm text-gray-500">Based on 234 reviews</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Top Product</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">🎧</div>
            <div>
              <p className="font-medium text-gray-900 text-sm">Wireless Headphones Pro</p>
              <p className="text-xs text-gray-500">152 sold this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
