'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Package, Truck, CheckCircle, Clock, Loader2, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';
import { formatPrice } from '@/lib/utils';

interface OrderItem {
  _id: string;
  product: { title: string; images: string[] };
  quantity: number;
  price: number;
  status: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  user: { firstName: string; lastName: string; email: string };
  items: OrderItem[];
  totalAmount: number;
  status: string;
  shippingAddress: { city: string; state: string };
  paymentMethod: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  processing: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
  packed: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400',
  shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  returned: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
};

const statusOptions = ['confirmed', 'processing', 'packed', 'shipped', 'delivered'];

export default function SellerOrdersPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      if (!isAuthenticated) await useAuthStore.getState().checkAuth();
      const currentUser = useAuthStore.getState().user;
      const authed = useAuthStore.getState().isAuthenticated;
      if (!authed || currentUser?.role !== 'seller') {
        router.push('/login');
        return;
      }
      fetchOrders();
    };
    init();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ limit: '20' });
      if (statusFilter !== 'all') params.append('status', statusFilter);
      const { data } = await api.get(`/orders/seller/orders?${params}`);
      if (data.success) setOrders(data.data?.orders || data.data || []);
    } catch (err) {
      console.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, itemId: string, newStatus: string) => {
    try {
      setUpdatingOrder(orderId);
      await api.put(`/orders/${orderId}/items/${itemId}/status`, { status: newStatus });
      await fetchOrders();
    } catch (err) {
      alert('Failed to update order status');
    } finally {
      setUpdatingOrder(null);
    }
  };

  const filtered = orders.filter(o => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (o.orderNumber || '').toLowerCase().includes(q) ||
      (o.user?.firstName || '').toLowerCase().includes(q) ||
      (o.user?.lastName || '').toLowerCase().includes(q);
  });

  // Count by status
  const counts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground">Manage and fulfill customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending', value: counts.pending || 0, color: 'text-yellow-600', icon: Clock },
          { label: 'Processing', value: (counts.confirmed || 0) + (counts.processing || 0), color: 'text-blue-600', icon: Package },
          { label: 'Shipped', value: counts.shipped || 0, color: 'text-purple-600', icon: Truck },
          { label: 'Delivered', value: counts.delivered || 0, color: 'text-green-600', icon: CheckCircle },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card rounded-xl border border-border/50 p-4 text-center">
              <Icon className={`mx-auto mb-2 ${stat.color}`} size={20} />
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border/50 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search by order ID or customer..."
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
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      {filtered.length > 0 ? (
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Order</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Customer</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Items</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Total</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Payment</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Date</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filtered.map((order) => (
                  <tr key={order._id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-foreground">{order.orderNumber || `#${order._id.slice(-6)}`}</td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm text-foreground">{order.user?.firstName} {order.user?.lastName}</p>
                        <p className="text-xs text-muted-foreground">{order.shippingAddress?.city}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{order.items?.length || 0}</td>
                    <td className="px-5 py-4 text-sm font-medium text-foreground">{formatPrice(order.totalAmount)}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status] || 'bg-muted text-muted-foreground'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground capitalize">{order.paymentMethod || 'COD'}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      {order.status !== 'delivered' && order.status !== 'cancelled' && order.items?.[0] && (
                        <div className="relative inline-block">
                          <select
                            disabled={updatingOrder === order._id}
                            onChange={(e) => {
                              if (e.target.value) updateOrderStatus(order._id, order.items[0]._id, e.target.value);
                            }}
                            defaultValue=""
                            className="text-xs border border-border/60 rounded-lg px-2 py-1.5 bg-background text-foreground appearance-none pr-6 cursor-pointer disabled:opacity-50"
                          >
                            <option value="" disabled>Update</option>
                            {statusOptions
                              .filter(s => statusOptions.indexOf(s) > statusOptions.indexOf(order.status))
                              .map(s => <option key={s} value={s} className="capitalize">{s}</option>)
                            }
                          </select>
                          <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        </div>
                      )}
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
          <h3 className="font-semibold text-foreground mb-1">No orders found</h3>
          <p className="text-sm text-muted-foreground">
            {statusFilter !== 'all' ? 'Try a different filter' : 'Orders will appear here once customers purchase'}
          </p>
        </div>
      )}
    </div>
  );
}
