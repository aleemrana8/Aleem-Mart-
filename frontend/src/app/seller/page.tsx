'use client';

import { useState, useEffect } from 'react';
import { Package, ShoppingCart, DollarSign, TrendingUp, Eye, Star, Zap, AlertTriangle, ArrowUpRight, ArrowDownRight, Brain, Target, Users, BarChart3 } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart
} from 'recharts';

// Revenue time series data (30 days)
const revenueData = [
  { date: 'Dec 1', revenue: 8500, orders: 5 },
  { date: 'Dec 2', revenue: 12400, orders: 8 },
  { date: 'Dec 3', revenue: 9800, orders: 6 },
  { date: 'Dec 4', revenue: 15200, orders: 10 },
  { date: 'Dec 5', revenue: 11900, orders: 7 },
  { date: 'Dec 6', revenue: 18500, orders: 12 },
  { date: 'Dec 7', revenue: 14300, orders: 9 },
  { date: 'Dec 8', revenue: 16800, orders: 11 },
  { date: 'Dec 9', revenue: 9200, orders: 6 },
  { date: 'Dec 10', revenue: 13600, orders: 9 },
  { date: 'Dec 11', revenue: 11200, orders: 7 },
  { date: 'Dec 12', revenue: 17800, orders: 12 },
  { date: 'Dec 13', revenue: 14500, orders: 10 },
  { date: 'Dec 14', revenue: 19200, orders: 13 },
];

const weeklyData = [
  { day: 'Mon', revenue: 45000, orders: 28 },
  { day: 'Tue', revenue: 52000, orders: 34 },
  { day: 'Wed', revenue: 48000, orders: 30 },
  { day: 'Thu', revenue: 61000, orders: 38 },
  { day: 'Fri', revenue: 78000, orders: 48 },
  { day: 'Sat', revenue: 89000, orders: 52 },
  { day: 'Sun', revenue: 72000, orders: 44 },
];

const funnelData = [
  { name: 'Store Views', value: 12450, fill: '#3B82F6' },
  { name: 'Product Views', value: 8900, fill: '#6366F1' },
  { name: 'Add to Cart', value: 2890, fill: '#8B5CF6' },
  { name: 'Checkout', value: 1450, fill: '#A855F7' },
  { name: 'Purchase', value: 610, fill: '#F59E0B' },
];

const categoryRevenue = [
  { name: 'Electronics', value: 45 },
  { name: 'Audio', value: 25 },
  { name: 'Accessories', value: 18 },
  { name: 'Other', value: 12 },
];

const COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#6366F1'];

const topProducts = [
  { name: 'Wireless Earbuds Pro', views: 3456, orders: 145, revenue: 797355, conversion: 4.2, stock: 23 },
  { name: 'Bluetooth Speaker X9', views: 2340, orders: 89, revenue: 355911, conversion: 3.8, stock: 45 },
  { name: 'USB-C Hub 7-in-1', views: 1890, orders: 67, revenue: 200933, conversion: 3.5, stock: 12 },
  { name: 'Laptop Stand Pro', views: 1234, orders: 45, revenue: 134955, conversion: 3.6, stock: 67 },
  { name: 'Phone Case Premium', views: 890, orders: 34, revenue: 50966, conversion: 3.8, stock: 150 },
];

const recentOrders = [
  { id: 'AM-KJ3F2', customer: 'Ali Hassan', items: 2, total: 5499, status: 'pending', time: '2 min ago' },
  { id: 'AM-LM4G5', customer: 'Sara Khan', items: 1, total: 12999, status: 'shipped', time: '18 min ago' },
  { id: 'AM-NO6H7', customer: 'Usman Ahmed', items: 3, total: 3299, status: 'delivered', time: '1 hr ago' },
  { id: 'AM-PQ8I9', customer: 'Fatima Noor', items: 1, total: 7999, status: 'confirmed', time: '2 hr ago' },
  { id: 'AM-RS1J2', customer: 'Ahmed Raza', items: 2, total: 9450, status: 'pending', time: '3 hr ago' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
};

const aiInsights = [
  { type: 'revenue', icon: TrendingUp, title: 'Revenue Forecast', description: 'Revenue projected to grow 15% next month based on current trajectory.', confidence: 82, color: 'text-green-600 bg-green-50' },
  { type: 'inventory', icon: AlertTriangle, title: 'Stock Alert', description: 'Wireless Earbuds Pro will run out in 5 days. Reorder 50 units recommended.', confidence: 88, color: 'text-red-600 bg-red-50' },
  { type: 'pricing', icon: Target, title: 'Price Optimization', description: '3 products priced 10-15% above market avg. Consider adjusting for better conversion.', confidence: 75, color: 'text-amber-600 bg-amber-50' },
  { type: 'customers', icon: Users, title: 'Customer Insight', description: '68% of customers are repeat buyers. Launch loyalty rewards for 20% more retention.', confidence: 91, color: 'text-blue-600 bg-blue-50' },
];

// Animated counter component
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

export default function SellerDashboard() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="text-gray-500">AI-Powered Analytics & Insights</p>
        </div>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {(['7d', '30d', '90d'] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all ${period === p ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards with animated counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-5 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg text-green-600 bg-green-50"><DollarSign size={20} /></div>
            <span className="flex items-center text-xs font-medium text-green-600"><ArrowUpRight size={14} /> 16%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900"><AnimatedCounter value={345680} prefix="Rs. " /></p>
          <p className="text-sm text-gray-500 mt-1">Total Revenue</p>
          <div className="mt-2 h-1 bg-gray-100 rounded-full"><div className="h-1 bg-green-500 rounded-full w-[75%]" /></div>
        </div>
        <div className="bg-white rounded-xl border p-5 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg text-blue-600 bg-blue-50"><ShoppingCart size={20} /></div>
            <span className="flex items-center text-xs font-medium text-green-600"><ArrowUpRight size={14} /> 18%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900"><AnimatedCounter value={234} /></p>
          <p className="text-sm text-gray-500 mt-1">Total Orders</p>
          <div className="mt-2 h-1 bg-gray-100 rounded-full"><div className="h-1 bg-blue-500 rounded-full w-[68%]" /></div>
        </div>
        <div className="bg-white rounded-xl border p-5 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg text-purple-600 bg-purple-50"><TrendingUp size={20} /></div>
            <span className="flex items-center text-xs font-medium text-green-600"><ArrowUpRight size={14} /> 4.2%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900"><AnimatedCounter value={4} suffix="%" /></p>
          <p className="text-sm text-gray-500 mt-1">Conversion Rate</p>
          <div className="mt-2 h-1 bg-gray-100 rounded-full"><div className="h-1 bg-purple-500 rounded-full w-[42%]" /></div>
        </div>
        <div className="bg-white rounded-xl border p-5 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg text-amber-600 bg-amber-50"><Eye size={20} /></div>
            <span className="flex items-center text-xs font-medium text-green-600"><ArrowUpRight size={14} /> 23%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900"><AnimatedCounter value={12450} /></p>
          <p className="text-sm text-gray-500 mt-1">Store Views</p>
          <div className="mt-2 h-1 bg-gray-100 rounded-full"><div className="h-1 bg-amber-500 rounded-full w-[85%]" /></div>
        </div>
      </div>

      {/* Revenue Chart + Weekly Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Revenue & Orders Trend</h2>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-400 rounded-full" /> Revenue</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-400 rounded-full" /> Orders</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#9CA3AF" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }} formatter={(value: number, name: string) => [name === 'revenue' ? `Rs. ${value.toLocaleString()}` : value, name === 'revenue' ? 'Revenue' : 'Orders']} />
              <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#F59E0B" fill="url(#revenueGradient)" strokeWidth={2.5} />
              <Bar yAxisId="right" dataKey="orders" fill="#3B82F6" opacity={0.7} radius={[4, 4, 0, 0]} barSize={20} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Weekly Sales Pattern</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }} formatter={(value: number) => [`Rs. ${value.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                {weeklyData.map((entry, index) => (
                  <Cell key={index} fill={entry.revenue === Math.max(...weeklyData.map(d => d.revenue)) ? '#F59E0B' : '#E5E7EB'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-amber-50 rounded-xl border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="text-purple-600" size={20} />
          <h2 className="font-semibold text-gray-900">AI-Powered Insights</h2>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">Smart</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiInsights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div key={insight.type} className="bg-white/80 backdrop-blur rounded-lg p-4 border border-white/50 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${insight.color}`}><Icon size={16} /></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 text-sm">{insight.title}</h4>
                      <span className="text-xs text-gray-400">{insight.confidence}% confidence</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conversion Funnel + Category Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Conversion Funnel</h2>
          <div className="space-y-3">
            {funnelData.map((item, index) => {
              const percentage = Math.round((item.value / funnelData[0].value) * 100);
              return (
                <div key={item.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-medium">{item.value.toLocaleString()} <span className="text-gray-400">({percentage}%)</span></span>
                  </div>
                  <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div className="h-full rounded-lg transition-all duration-1000" style={{ width: `${percentage}%`, backgroundColor: item.fill }} />
                  </div>
                </div>
              );
            })}
            <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-xs text-amber-800"><strong>Insight:</strong> Cart-to-checkout drop-off is 50%. Consider exit-intent popups or abandoned cart emails.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Revenue by Category</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categoryRevenue} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                {categoryRevenue.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {categoryRevenue.map((cat, i) => (
              <span key={cat.name} className="flex items-center gap-1 text-xs text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-xl border">
        <div className="p-5 border-b flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Top Products Performance</h2>
          <a href="/seller/products" className="text-sm text-primary hover:underline">View All</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Views</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Conversion</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {topProducts.map((product) => (
                <tr key={product.name} className="hover:bg-gray-50">
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{product.views.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{product.orders}</td>
                  <td className="px-5 py-4 text-sm font-medium">Rs. {product.revenue.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm"><span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">{product.conversion}%</span></td>
                  <td className="px-5 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock < 20 ? 'bg-red-50 text-red-700' : product.stock < 50 ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'}`}>
                      {product.stock} units
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{order.items}</td>
                  <td className="px-5 py-4 text-sm font-medium">Rs. {order.total.toLocaleString()}</td>
                  <td className="px-5 py-4"><span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>{order.status}</span></td>
                  <td className="px-5 py-4 text-sm text-gray-400">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Store Rating</h3>
          <div className="flex items-center gap-3">
            <div className="text-4xl font-bold text-gray-900">4.7</div>
            <div>
              <div className="flex text-yellow-400">{'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}</div>
              <p className="text-sm text-gray-500">Based on 456 reviews</p>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            {[5, 4, 3, 2, 1].map((stars) => {
              const widths = [72, 18, 6, 3, 1];
              return (
                <div key={stars} className="flex items-center gap-2 text-xs">
                  <span className="w-3 text-gray-500">{stars}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full"><div className="h-2 bg-amber-400 rounded-full" style={{ width: `${widths[5 - stars]}%` }} /></div>
                  <span className="w-8 text-right text-gray-400">{widths[5 - stars]}%</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Sales Forecast (AI)</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div><p className="text-xs text-gray-500">Next 7 Days</p><p className="font-bold text-gray-900">Rs. 89,000</p></div>
              <ArrowUpRight className="text-green-600" size={20} />
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div><p className="text-xs text-gray-500">Next 30 Days</p><p className="font-bold text-gray-900">Rs. 380,000</p></div>
              <ArrowUpRight className="text-blue-600" size={20} />
            </div>
            <p className="text-xs text-gray-400 text-center">79% model confidence • Updated daily</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Customer Segments</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between"><span className="text-sm text-gray-600">VIP Loyalists</span><span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">7%</span></div>
            <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Regular Buyers</span><span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">28%</span></div>
            <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Bargain Hunters</span><span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">37%</span></div>
            <div className="flex items-center justify-between"><span className="text-sm text-gray-600">One-Time Buyers</span><span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">28%</span></div>
          </div>
          <p className="text-xs text-gray-400 mt-3">K-Means RFM Clustering • 1,234 customers</p>
        </div>
      </div>
    </div>
  );
}
