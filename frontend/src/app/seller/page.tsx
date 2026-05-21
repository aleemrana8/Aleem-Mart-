'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Package, ShoppingCart, DollarSign, TrendingUp, Eye, Star, AlertTriangle, ArrowUpRight, ArrowDownRight, Brain, Target, Users, Loader2 } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';

interface Metric {
  current: number;
  previous: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
}

interface Analytics {
  overview: {
    totalRevenue: Metric;
    totalOrders: Metric;
    totalProducts: number;
    averageOrderValue: Metric;
    conversionRate: Metric;
    storeRating: number;
    totalReviews: number;
  };
  revenueChart: { date: string; value: number }[];
  ordersChart: { date: string; value: number }[];
  conversionFunnel: { views: number; addToCart: number; checkout: number; purchase: number; conversionRate: number };
  productPerformance: { name: string; views: number; orders: number; revenue: number; conversion: number; stock: number }[];
  customerAnalytics: { newCustomers: number; returningCustomers: number; repeatPurchaseRate: number; topCities: { city: string; orders: number }[] };
  revenueByDay: { day: string; revenue: number }[];
}

function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const steps = 50;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const aiInsights = [
  { type: 'revenue', icon: TrendingUp, title: 'Revenue Forecast', description: 'Revenue projected to grow 15% next month based on current trajectory.', confidence: 82, color: 'text-green-600 bg-green-50 dark:bg-green-900/30' },
  { type: 'inventory', icon: AlertTriangle, title: 'Stock Alert', description: 'Products with low stock should be reordered soon to avoid lost sales.', confidence: 88, color: 'text-red-600 bg-red-50 dark:bg-red-900/30' },
  { type: 'pricing', icon: Target, title: 'Price Optimization', description: 'Consider competitive pricing adjustments for better conversion rates.', confidence: 75, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30' },
  { type: 'customers', icon: Users, title: 'Customer Insight', description: 'Majority of customers are repeat buyers. Loyalty rewards can boost retention 20%.', confidence: 91, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30' },
];

export default function SellerDashboard() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (!isAuthenticated) {
        await useAuthStore.getState().checkAuth();
      }
      setAuthChecked(true);
    };
    check();
  }, []);

  useEffect(() => {
    if (!authChecked) return;
    const currentUser = useAuthStore.getState().user;
    const authed = useAuthStore.getState().isAuthenticated;
    if (!authed || currentUser?.role !== 'seller') {
      router.push('/login');
      return;
    }
    fetchAnalytics();
    fetchRecentOrders();
  }, [authChecked, period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/analytics/seller?period=${period}`);
      if (data.success) setAnalytics(data.data);
    } catch (err) {
      console.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const { data } = await api.get('/orders/seller/orders?limit=5');
      if (data.success) setRecentOrders(data.data?.orders || data.data || []);
    } catch {}
  };

  if (loading && !analytics) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!analytics) return <div className="p-8 text-center text-muted-foreground">Failed to load analytics</div>;

  const { overview, revenueChart, conversionFunnel, productPerformance, customerAnalytics, revenueByDay } = analytics;

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Seller Dashboard</h1>
          <p className="text-muted-foreground">AI-Powered Analytics & Insights</p>
        </div>
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          {(['7d', '30d', '90d'] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all ${period === p ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: overview.totalRevenue.current, prefix: 'Rs. ', icon: DollarSign, change: overview.totalRevenue.changePercent, trend: overview.totalRevenue.trend, color: 'text-green-600 bg-green-50 dark:bg-green-900/30', bar: 'bg-green-500' },
          { label: 'Total Orders', value: overview.totalOrders.current, prefix: '', icon: ShoppingCart, change: overview.totalOrders.changePercent, trend: overview.totalOrders.trend, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30', bar: 'bg-blue-500' },
          { label: 'Conversion Rate', value: overview.conversionRate.current, suffix: '%', icon: TrendingUp, change: overview.conversionRate.changePercent, trend: overview.conversionRate.trend, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30', bar: 'bg-purple-500' },
          { label: 'Store Rating', value: overview.storeRating, suffix: '/5', icon: Star, change: 0, trend: 'stable' as const, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30', bar: 'bg-amber-500' },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-card rounded-xl border border-border/50 p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${kpi.color}`}><Icon size={20} /></div>
                {kpi.change !== 0 && (
                  <span className={`flex items-center text-xs font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {Math.abs(kpi.change)}%
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-foreground">
                <AnimatedCounter value={kpi.value} prefix={kpi.prefix || ''} suffix={kpi.suffix || ''} />
              </p>
              <p className="text-sm text-muted-foreground mt-1">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart + Weekly */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Revenue & Orders Trend</h2>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-400 rounded-full" /> Revenue</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-400 rounded-full" /> Orders</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={revenueChart.map((r, i) => ({ ...r, orders: analytics.ordersChart[i]?.value || 0 }))}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => v.slice(5)} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))' }} formatter={(value: number, name: string) => [name === 'value' ? `Rs. ${value.toLocaleString()}` : value, name === 'value' ? 'Revenue' : 'Orders']} />
              <Area yAxisId="left" type="monotone" dataKey="value" stroke="#F59E0B" fill="url(#revGrad)" strokeWidth={2.5} />
              <Bar yAxisId="right" dataKey="orders" fill="#3B82F6" opacity={0.7} radius={[4, 4, 0, 0]} barSize={16} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border/50 p-5">
          <h2 className="font-semibold text-foreground mb-4">Weekly Pattern</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ borderRadius: 12 }} formatter={(value: number) => [`Rs. ${value.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                {revenueByDay.map((entry, index) => (
                  <Cell key={index} fill={entry.revenue === Math.max(...revenueByDay.map(d => d.revenue)) ? '#F59E0B' : 'hsl(var(--muted))'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-amber-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-amber-950/30 rounded-xl border border-border/50 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="text-purple-600" size={20} />
          <h2 className="font-semibold text-foreground">AI-Powered Insights</h2>
          <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full font-medium">Smart</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiInsights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div key={insight.type} className="bg-background/80 backdrop-blur rounded-lg p-4 border border-border/30 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${insight.color}`}><Icon size={16} /></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground text-sm">{insight.title}</h4>
                      <span className="text-xs text-muted-foreground">{insight.confidence}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Funnel + Cities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border/50 p-5">
          <h2 className="font-semibold text-foreground mb-4">Conversion Funnel</h2>
          <div className="space-y-3">
            {[
              { name: 'Store Views', value: conversionFunnel.views, fill: '#3B82F6' },
              { name: 'Add to Cart', value: conversionFunnel.addToCart, fill: '#8B5CF6' },
              { name: 'Checkout', value: conversionFunnel.checkout, fill: '#A855F7' },
              { name: 'Purchase', value: conversionFunnel.purchase, fill: '#F59E0B' },
            ].map((item) => {
              const percentage = Math.round((item.value / conversionFunnel.views) * 100);
              return (
                <div key={item.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-medium text-foreground">{item.value.toLocaleString()} ({percentage}%)</span>
                  </div>
                  <div className="h-7 bg-muted rounded-lg overflow-hidden">
                    <div className="h-full rounded-lg transition-all duration-1000" style={{ width: `${percentage}%`, backgroundColor: item.fill }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border/50 p-5">
          <h2 className="font-semibold text-foreground mb-4">Top Cities</h2>
          <div className="space-y-3">
            {customerAnalytics.topCities.map((city, i) => (
              <div key={city.city} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{city.city}</span>
                    <span className="text-sm text-muted-foreground">{city.orders} orders</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-2 bg-primary/70 rounded-full" style={{ width: `${(city.orders / customerAnalytics.topCities[0].orders) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{customerAnalytics.newCustomers}</p>
              <p className="text-xs text-muted-foreground">New Customers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{customerAnalytics.repeatPurchaseRate}%</p>
              <p className="text-xs text-muted-foreground">Repeat Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-card rounded-xl border border-border/50">
        <div className="p-5 border-b border-border/50 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Top Products</h2>
          <Link href="/seller/products" className="text-sm text-primary hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Product</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Views</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Orders</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Revenue</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {productPerformance.map((p) => (
                <tr key={p.name} className="hover:bg-muted/30">
                  <td className="px-5 py-4 text-sm font-medium text-foreground">{p.name}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{p.views.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{p.orders}</td>
                  <td className="px-5 py-4 text-sm font-medium text-foreground">Rs. {p.revenue.toLocaleString()}</td>
                  <td className="px-5 py-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${p.stock < 20 ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'}`}>{p.stock}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-xl border border-border/50">
        <div className="p-5 border-b border-border/50 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Recent Orders</h2>
          <Link href="/seller/orders" className="text-sm text-primary hover:underline">View All</Link>
        </div>
        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Order</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Customer</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Total</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {recentOrders.map((order: any) => (
                  <tr key={order._id} className="hover:bg-muted/30">
                    <td className="px-5 py-4 text-sm font-medium text-foreground">{order.orderNumber || order._id?.slice(-8)}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{order.user?.firstName || 'Customer'}</td>
                    <td className="px-5 py-4 text-sm font-medium text-foreground">Rs. {(order.totalAmount || 0).toLocaleString()}</td>
                    <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status] || 'bg-muted text-muted-foreground'}`}>{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <Package className="mx-auto mb-2" size={24} />
            <p className="text-sm">No orders yet. They will appear here once customers purchase.</p>
          </div>
        )}
      </div>
    </div>
  );
}
