'use client';

import { useState, useEffect } from 'react';
import { Users, Store, Package, ShoppingCart, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Globe, Activity, Shield, Zap, ArrowUpRight, ArrowDownRight, Brain, BarChart3, MapPin } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, RadialBarChart, RadialBar
} from 'recharts';

// Platform revenue time-series (30 days)
const revenueTimeSeries = [
  { date: 'Nov 15', revenue: 62000, orders: 89 },
  { date: 'Nov 16', revenue: 78000, orders: 112 },
  { date: 'Nov 17', revenue: 85000, orders: 120 },
  { date: 'Nov 18', revenue: 71000, orders: 98 },
  { date: 'Nov 19', revenue: 92000, orders: 134 },
  { date: 'Nov 20', revenue: 88000, orders: 125 },
  { date: 'Nov 21', revenue: 105000, orders: 148 },
  { date: 'Nov 22', revenue: 98000, orders: 140 },
  { date: 'Nov 23', revenue: 112000, orders: 156 },
  { date: 'Nov 24', revenue: 95000, orders: 132 },
  { date: 'Nov 25', revenue: 89000, orders: 122 },
  { date: 'Nov 26', revenue: 118000, orders: 165 },
  { date: 'Nov 27', revenue: 125000, orders: 172 },
  { date: 'Nov 28', revenue: 108000, orders: 150 },
];

const categoryData = [
  { name: 'Electronics', revenue: 890000, percentage: 36 },
  { name: 'Fashion', revenue: 567000, percentage: 23 },
  { name: 'Home & Kitchen', revenue: 345000, percentage: 14 },
  { name: 'Health & Beauty', revenue: 234000, percentage: 10 },
  { name: 'Sports', revenue: 189000, percentage: 8 },
  { name: 'Others', revenue: 231800, percentage: 9 },
];

const COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#6B7280'];

const trafficSources = [
  { name: 'Direct', value: 35, visitors: 45000 },
  { name: 'Organic', value: 30, visitors: 38000 },
  { name: 'Social', value: 20, visitors: 25000 },
  { name: 'Paid Ads', value: 10, visitors: 12000 },
  { name: 'Referral', value: 5, visitors: 6000 },
];

const sellerGrowth = [
  { month: 'Jul', sellers: 85 },
  { month: 'Aug', sellers: 92 },
  { month: 'Sep', sellers: 98 },
  { month: 'Oct', sellers: 110 },
  { month: 'Nov', sellers: 118 },
  { month: 'Dec', sellers: 128 },
];

const topSellers = [
  { name: 'TechZone Official', revenue: 567890, orders: 234, rating: 4.8, growth: 15 },
  { name: 'FashionHub', revenue: 456780, orders: 345, rating: 4.5, growth: 22 },
  { name: 'HomeDecor Plus', revenue: 234560, orders: 123, rating: 4.6, growth: 8 },
  { name: 'AudioMax', revenue: 189450, orders: 89, rating: 4.7, growth: 12 },
  { name: 'SportsMax', revenue: 156780, orders: 67, rating: 4.3, growth: 5 },
];

const pendingActions = [
  { type: 'Seller Approvals', count: 5, icon: Store, urgent: true },
  { type: 'Product Reports', count: 3, icon: AlertTriangle, urgent: true },
  { type: 'Refund Requests', count: 8, icon: DollarSign, urgent: false },
  { type: 'Review Moderation', count: 12, icon: CheckCircle, urgent: false },
  { type: 'Fraud Alerts', count: 2, icon: Shield, urgent: true },
];

const recentActivity = [
  { action: 'New seller registered', detail: 'TechGadgets Store - Lahore', time: '5 min ago', type: 'info' },
  { action: 'High-value order placed', detail: 'Rs. 89,500 - Electronics bundle', time: '12 min ago', type: 'success' },
  { action: 'Product flagged for review', detail: 'Reported by 3 users', time: '30 min ago', type: 'warning' },
  { action: 'Payout processed', detail: 'Rs. 245,000 to 12 sellers', time: '1 hour ago', type: 'success' },
  { action: 'Unusual login activity', detail: 'IP from new location detected', time: '2 hours ago', type: 'danger' },
];

const activityColors: Record<string, string> = {
  info: 'bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
};

const cityOrders = [
  { city: 'Lahore', orders: 1234, percentage: 35 },
  { city: 'Karachi', orders: 987, percentage: 28 },
  { city: 'Islamabad', orders: 567, percentage: 16 },
  { city: 'Rawalpindi', orders: 345, percentage: 10 },
  { city: 'Faisalabad', orders: 234, percentage: 7 },
  { city: 'Peshawar', orders: 145, percentage: 4 },
];

// Animated counter
function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function AdminDashboard() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
          <p className="text-gray-500">Enterprise Marketplace Intelligence</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
            <Activity size={12} /> Live
          </div>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            {(['7d', '30d', '90d'] as const).map((p) => (
              <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all ${period === p ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl border p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg text-green-600 bg-green-50"><DollarSign size={16} /></div>
            <span className="flex items-center text-xs font-medium text-green-600"><ArrowUpRight size={12} /> 18.5%</span>
          </div>
          <p className="text-lg font-bold text-gray-900"><AnimatedCounter value={2456800} prefix="Rs. " /></p>
          <p className="text-xs text-gray-500">Total Revenue</p>
        </div>
        <div className="bg-white rounded-xl border p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg text-blue-600 bg-blue-50"><ShoppingCart size={16} /></div>
            <span className="flex items-center text-xs font-medium text-green-600"><ArrowUpRight size={12} /> 12.2%</span>
          </div>
          <p className="text-lg font-bold text-gray-900"><AnimatedCounter value={3456} /></p>
          <p className="text-xs text-gray-500">Total Orders</p>
        </div>
        <div className="bg-white rounded-xl border p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg text-purple-600 bg-purple-50"><Store size={16} /></div>
            <span className="flex items-center text-xs font-medium text-green-600"><ArrowUpRight size={12} /> +10</span>
          </div>
          <p className="text-lg font-bold text-gray-900"><AnimatedCounter value={128} /></p>
          <p className="text-xs text-gray-500">Active Sellers</p>
        </div>
        <div className="bg-white rounded-xl border p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg text-amber-600 bg-amber-50"><Users size={16} /></div>
            <span className="flex items-center text-xs font-medium text-green-600"><ArrowUpRight size={12} /> +234</span>
          </div>
          <p className="text-lg font-bold text-gray-900"><AnimatedCounter value={15234} /></p>
          <p className="text-xs text-gray-500">Total Users</p>
        </div>
        <div className="bg-white rounded-xl border p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg text-cyan-600 bg-cyan-50"><Package size={16} /></div>
            <span className="flex items-center text-xs font-medium text-green-600"><ArrowUpRight size={12} /> +89</span>
          </div>
          <p className="text-lg font-bold text-gray-900"><AnimatedCounter value={4567} /></p>
          <p className="text-xs text-gray-500">Products</p>
        </div>
        <div className="bg-white rounded-xl border p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg text-emerald-600 bg-emerald-50"><TrendingUp size={16} /></div>
            <span className="flex items-center text-xs font-medium text-green-600"><ArrowUpRight size={12} /></span>
          </div>
          <p className="text-lg font-bold text-gray-900">3.8%</p>
          <p className="text-xs text-gray-500">Conversion Rate</p>
        </div>
      </div>

      {/* Revenue Chart + Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Platform Revenue & Orders</h2>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-400 rounded-full" /> Revenue</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-400 rounded-full" /> Orders</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={revenueTimeSeries}>
              <defs>
                <linearGradient id="adminRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#9CA3AF" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }} formatter={(value: number, name: string) => [name === 'revenue' ? `Rs. ${value.toLocaleString()}` : value, name === 'revenue' ? 'Revenue' : 'Orders']} />
              <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#F59E0B" fill="url(#adminRevenueGrad)" strokeWidth={2.5} />
              <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Traffic Sources</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={trafficSources} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" label={false}>
                {trafficSources.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {trafficSources.map((source, i) => (
              <div key={source.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  {source.name}
                </span>
                <span className="text-gray-500">{source.visitors.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Revenue + Seller Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Revenue by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#9CA3AF" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke="#9CA3AF" width={100} />
              <Tooltip contentStyle={{ borderRadius: 12 }} formatter={(value: number) => [`Rs. ${value.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" radius={[0, 6, 6, 0]}>
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Seller Growth Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={sellerGrowth}>
              <defs>
                <linearGradient id="sellerGrowthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <Tooltip contentStyle={{ borderRadius: 12 }} />
              <Area type="monotone" dataKey="sellers" stroke="#8B5CF6" fill="url(#sellerGrowthGrad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 rounded-xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Brain size={20} className="text-amber-400" />
          <h2 className="font-semibold">AI Platform Insights</h2>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Real-time</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/10">
            <p className="text-xs text-amber-300 font-medium">Revenue Forecast</p>
            <p className="text-sm mt-1">Revenue projected to reach Rs. 3.2M next month (+30% MoM)</p>
            <p className="text-xs text-white/50 mt-2">82% confidence</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/10">
            <p className="text-xs text-red-300 font-medium">Anomaly Detected</p>
            <p className="text-sm mt-1">Electronics orders spiked +45% - viral product driving traffic</p>
            <p className="text-xs text-white/50 mt-2">High severity</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/10">
            <p className="text-xs text-green-300 font-medium">Growth Opportunity</p>
            <p className="text-sm mt-1">Home & Kitchen category growing 22% faster than market average</p>
            <p className="text-xs text-white/50 mt-2">Expand seller recruitment</p>
          </div>
        </div>
      </div>

      {/* Top Sellers + Orders by City */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Sellers Table */}
        <div className="bg-white rounded-xl border">
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Top Performing Sellers</h2>
            <a href="/admin/sellers" className="text-sm text-primary hover:underline">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Seller</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Revenue</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Rating</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topSellers.map((seller) => (
                  <tr key={seller.name} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{seller.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Rs. {(seller.revenue / 1000).toFixed(0)}k</td>
                    <td className="px-4 py-3 text-sm"><span className="text-yellow-500">★</span> {seller.rating}</td>
                    <td className="px-4 py-3 text-sm text-green-600">+{seller.growth}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Orders by City */}
        <div className="bg-white rounded-xl border p-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-gray-400" />
            <h2 className="font-semibold text-gray-900">Orders by City</h2>
          </div>
          <div className="space-y-3">
            {cityOrders.map((city) => (
              <div key={city.city}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700 font-medium">{city.city}</span>
                  <span className="text-gray-500">{city.orders.toLocaleString()} orders</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-1000" style={{ width: `${city.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Actions + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border">
          <div className="p-5 border-b">
            <h2 className="font-semibold text-gray-900">Pending Actions</h2>
          </div>
          <div className="p-5 space-y-3">
            {pendingActions.map((action) => {
              const Icon = action.icon;
              return (
                <div key={action.type} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${action.urgent ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{action.type}</p>
                      <p className="text-xs text-gray-500">{action.count} pending</p>
                    </div>
                  </div>
                  {action.urgent && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                  <button className="text-xs text-primary hover:underline font-medium">Review</button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border">
          <div className="p-5 border-b">
            <h2 className="font-semibold text-gray-900">Live Activity Feed</h2>
          </div>
          <div className="p-5 space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex gap-3">
                <div className={`w-2 h-2 ${activityColors[activity.type]} rounded-full mt-2 shrink-0`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.detail}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">1.8d</p>
          <p className="text-xs text-gray-500 mt-1">Avg. Fulfillment Time</p>
          <p className="text-xs text-green-600 mt-1">-0.3d vs last month</p>
        </div>
        <div className="bg-white rounded-xl border p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">3.2%</p>
          <p className="text-xs text-gray-500 mt-1">Return Rate</p>
          <p className="text-xs text-green-600 mt-1">-0.5% vs last month</p>
        </div>
        <div className="bg-white rounded-xl border p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">0.8%</p>
          <p className="text-xs text-gray-500 mt-1">Dispute Rate</p>
          <p className="text-xs text-green-600 mt-1">Below 1% target</p>
        </div>
        <div className="bg-white rounded-xl border p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">2.4h</p>
          <p className="text-xs text-gray-500 mt-1">Seller Response Time</p>
          <p className="text-xs text-amber-600 mt-1">Target: &lt;2h</p>
        </div>
      </div>
    </div>
  );
}
