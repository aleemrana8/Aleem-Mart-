'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuthStore } from '@/store/useAuthStore';
import { formatPrice } from '@/lib/utils';
import api from '@/lib/api';
import {
  Package, Truck, CheckCircle, XCircle, Clock, ChevronRight,
  ShoppingBag, Loader2, RotateCcw, MapPin, CreditCard
} from 'lucide-react';

interface OrderItem {
  _id: string;
  title: string;
  image?: string;
  quantity: number;
  price: number;
  total: number;
  status: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    city: string;
    state: string;
  };
  paymentMethod: string;
  status: string;
  paymentStatus: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  createdAt: string;
}

const statusConfig: Record<string, { icon: any; color: string; bg: string; label: string }> = {
  pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-500/10 border-yellow-500/20', label: 'Pending' },
  confirmed: { icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-500/10 border-blue-500/20', label: 'Confirmed' },
  processing: { icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-500/10 border-indigo-500/20', label: 'Processing' },
  shipped: { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-500/10 border-purple-500/20', label: 'Shipped' },
  delivered: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-500/10 border-green-500/20', label: 'Delivered' },
  cancelled: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-500/10 border-red-500/20', label: 'Cancelled' },
  returned: { icon: RotateCcw, color: 'text-orange-600', bg: 'bg-orange-500/10 border-orange-500/20', label: 'Returned' },
};

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders/my-orders');
      setOrders(data.data || []);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const filters = [
    { key: 'all', label: 'All Orders' },
    { key: 'pending', label: 'Pending' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Package size={56} className="mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">Please login to view your orders</h2>
            <Link href="/login" className="btn-premium px-6 py-3 text-sm font-semibold inline-block mt-4">Login</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1100px] mx-auto px-4 lg:px-6 py-6 lg:py-10">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <h1 className="text-xl font-bold text-foreground">My Orders</h1>
              <p className="text-sm text-muted-foreground mt-0.5">{orders.length} total orders</p>
            </div>
            <Link href="/shop" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Continue Shopping →
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1 scrollbar-hide">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  filter === f.key
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted/40 text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Orders List */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag size={56} className="mx-auto text-muted-foreground/30 mb-4" />
              <h2 className="text-lg font-semibold text-foreground mb-2">
                {filter === 'all' ? 'No orders yet' : `No ${filter} orders`}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">Your order history will appear here.</p>
              <Link href="/shop" className="btn-premium px-6 py-3 text-sm font-semibold inline-block">Start Shopping</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const config = statusConfig[order.status] || statusConfig.pending;
                const StatusIcon = config.icon;
                return (
                  <div key={order._id} className="rounded-2xl border border-border/50 overflow-hidden hover:shadow-card-hover transition-all duration-300">
                    {/* Order Header */}
                    <div className="px-5 py-3.5 border-b border-border/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-muted/20">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-foreground">{order.orderNumber}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.color}`}>
                          <StatusIcon size={12} />
                          {config.label}
                        </span>
                        <span className="text-sm font-bold text-foreground">{formatPrice(order.total)}</span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-5 space-y-3">
                      {order.items.slice(0, 3).map((item) => (
                        <div key={item._id} className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-muted/30 rounded-xl overflow-hidden relative shrink-0">
                            {item.image ? (
                              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="56px" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xl">📦</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                          </div>
                          <p className="text-sm font-medium text-foreground shrink-0">{formatPrice(item.total)}</p>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <p className="text-xs text-muted-foreground pl-[72px]">+ {order.items.length - 3} more items</p>
                      )}
                    </div>

                    {/* Order Footer */}
                    <div className="px-5 py-3 border-t border-border/30 bg-muted/10 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin size={11} /> {order.shippingAddress?.city}
                        </span>
                        <span className="flex items-center gap-1 capitalize">
                          <CreditCard size={11} /> {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                        </span>
                      </div>
                      <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                        View Details <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
