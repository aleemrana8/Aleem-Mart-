'use client';

import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

const monthlyRevenue = [
  { month: 'Aug', value: 1200000 },
  { month: 'Sep', value: 1450000 },
  { month: 'Oct', value: 1800000 },
  { month: 'Nov', value: 2100000 },
  { month: 'Dec', value: 2800000 },
  { month: 'Jan', value: 2456800 },
];

const topSellers = [
  { name: 'TechZone Official', revenue: 'Rs. 567,890', orders: 234, growth: '+15%' },
  { name: 'FashionHub', revenue: 'Rs. 456,780', orders: 345, growth: '+22%' },
  { name: 'HomeDecor Plus', revenue: 'Rs. 234,560', orders: 123, growth: '+8%' },
  { name: 'SportsMax', revenue: 'Rs. 189,450', orders: 89, growth: '+12%' },
  { name: 'AudioMax', revenue: 'Rs. 156,780', orders: 67, growth: '+5%' },
];

const topProducts = [
  { name: 'Wireless Earbuds Pro', sales: 456, revenue: 'Rs. 2,507,544' },
  { name: 'Smart Watch X200', sales: 234, revenue: 'Rs. 2,804,766' },
  { name: 'Gaming Mouse RGB', sales: 567, revenue: 'Rs. 1,983,933' },
  { name: 'Cotton Casual Shirt', sales: 789, revenue: 'Rs. 1,813,311' },
  { name: 'Bluetooth Speaker', sales: 345, revenue: 'Rs. 1,552,050' },
];

export default function AdminAnalyticsPage() {
  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.value));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
        <p className="text-gray-500">Revenue, performance, and growth insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue (MTD)', value: 'Rs. 2.45M', icon: DollarSign, change: '+18.5%', color: 'text-green-600 bg-green-50' },
          { label: 'Orders (MTD)', value: '3,456', icon: ShoppingCart, change: '+12.2%', color: 'text-blue-600 bg-blue-50' },
          { label: 'New Users (MTD)', value: '1,234', icon: Users, change: '+8.4%', color: 'text-purple-600 bg-purple-50' },
          { label: 'Products Sold', value: '4,567', icon: Package, change: '+15.7%', color: 'text-amber-600 bg-amber-50' },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-white rounded-xl border p-5">
              <div className={`p-2 rounded-lg ${metric.color} inline-flex mb-3`}>
                <Icon size={18} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-xs text-gray-500 mt-1">{metric.label}</p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp size={12} /> {metric.change} vs last month
              </p>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart (Simple Bar Chart) */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-gray-900">Monthly Revenue</h2>
          <select className="border rounded-lg px-3 py-1.5 text-sm">
            <option>Last 6 months</option>
            <option>Last 12 months</option>
            <option>This year</option>
          </select>
        </div>
        <div className="flex items-end gap-4 h-48">
          {monthlyRevenue.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
              <p className="text-xs text-gray-500">Rs. {(m.value / 1000000).toFixed(1)}M</p>
              <div
                className="w-full bg-primary/80 rounded-t-lg transition-all hover:bg-primary"
                style={{ height: `${(m.value / maxRevenue) * 100}%` }}
              ></div>
              <p className="text-xs font-medium text-gray-600">{m.month}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Sellers */}
        <div className="bg-white rounded-xl border">
          <div className="p-5 border-b">
            <h2 className="font-semibold text-gray-900">Top Sellers</h2>
          </div>
          <div className="divide-y">
            {topSellers.map((seller, i) => (
              <div key={seller.name} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-400 w-5">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{seller.name}</p>
                    <p className="text-xs text-gray-500">{seller.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{seller.revenue}</p>
                  <p className="text-xs text-green-600">{seller.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border">
          <div className="p-5 border-b">
            <h2 className="font-semibold text-gray-900">Best Selling Products</h2>
          </div>
          <div className="divide-y">
            {topProducts.map((product, i) => (
              <div key={product.name} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-400 w-5">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} units sold</p>
                  </div>
                </div>
                <p className="text-sm font-medium">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
