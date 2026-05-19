'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Package, Eye, RotateCcw } from 'lucide-react';

const orders = [
  {
    id: 'AM-KJ3F2-ABC123',
    date: '2024-01-15',
    total: 15499,
    status: 'shipped',
    items: [
      { title: 'Wireless Earbuds Pro X100', quantity: 1, price: 5499, image: '/placeholder.jpg' },
      { title: 'Smart Watch X200', quantity: 1, price: 9999, image: '/placeholder.jpg' },
    ],
  },
  {
    id: 'AM-LM4G5-DEF456',
    date: '2024-01-10',
    total: 2299,
    status: 'delivered',
    items: [
      { title: 'Slim Fit Casual Shirt - Blue', quantity: 1, price: 2299, image: '/placeholder.jpg' },
    ],
  },
  {
    id: 'AM-NO6H7-GHI789',
    date: '2024-01-05',
    total: 8499,
    status: 'delivered',
    items: [
      { title: 'Gaming Mouse RGB Pro', quantity: 1, price: 3499, image: '/placeholder.jpg' },
      { title: 'Gaming Mousepad XL', quantity: 1, price: 1500, image: '/placeholder.jpg' },
      { title: 'USB-C Hub 7-in-1', quantity: 1, price: 3500, image: '/placeholder.jpg' },
    ],
  },
  {
    id: 'AM-PQ8I9-JKL012',
    date: '2023-12-28',
    total: 4599,
    status: 'cancelled',
    items: [
      { title: 'Premium Leather Wallet', quantity: 1, price: 4599, image: '/placeholder.jpg' },
    ],
  },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  returned: 'bg-orange-100 text-orange-800',
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-sm text-gray-500">{orders.length} orders</p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border overflow-hidden">
              {/* Order Header */}
              <div className="px-5 py-3 bg-gray-50 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-medium text-gray-900">{order.id}</span>
                  <span className="text-gray-500">{order.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                  <span className="text-sm font-semibold">Rs. {order.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-5 space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                      <Package size={20} className="text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">Rs. {item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="px-5 py-3 border-t bg-gray-50 flex gap-3">
                <button className="text-xs text-primary hover:underline font-medium flex items-center gap-1">
                  <Eye size={12} /> View Details
                </button>
                {order.status === 'delivered' && (
                  <button className="text-xs text-gray-600 hover:underline font-medium flex items-center gap-1">
                    <RotateCcw size={12} /> Return/Exchange
                  </button>
                )}
                {order.status === 'shipped' && (
                  <button className="text-xs text-purple-600 hover:underline font-medium flex items-center gap-1">
                    <Package size={12} /> Track Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
