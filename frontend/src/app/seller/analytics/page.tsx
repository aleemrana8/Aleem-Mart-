'use client';

import { DollarSign, TrendingUp, ShoppingCart, Eye, Package, Star } from 'lucide-react';

const monthlyData = [
  { month: 'Aug', revenue: 45000, orders: 23 },
  { month: 'Sep', revenue: 67000, orders: 34 },
  { month: 'Oct', revenue: 89000, orders: 45 },
  { month: 'Nov', revenue: 120000, orders: 56 },
  { month: 'Dec', revenue: 156000, orders: 78 },
  { month: 'Jan', revenue: 134000, orders: 65 },
];

const topProducts = [
  { name: 'Wireless Earbuds Pro X100', sold: 45, revenue: 'Rs. 247,455', views: 1234 },
  { name: 'Bluetooth Speaker Mini', sold: 34, revenue: 'Rs. 135,966', views: 890 },
  { name: 'USB-C Hub 7-in-1', sold: 28, revenue: 'Rs. 83,972', views: 567 },
  { name: 'Laptop Stand Adjustable', sold: 22, revenue: 'Rs. 65,978', views: 456 },
  { name: 'Wireless Charging Pad', sold: 19, revenue: 'Rs. 37,981', views: 345 },
];

export default function SellerAnalyticsPage() {
  const maxRevenue = Math.max(...monthlyData.map(m => m.revenue));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500">Track your store performance and revenue</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Revenue (MTD)', value: 'Rs. 134,000', icon: DollarSign, change: '+12%', color: 'text-green-600 bg-green-50' },
          { label: 'Orders (MTD)', value: '65', icon: ShoppingCart, change: '+8%', color: 'text-blue-600 bg-blue-50' },
          { label: 'Store Views', value: '3,456', icon: Eye, change: '+15%', color: 'text-purple-600 bg-purple-50' },
          { label: 'Avg. Rating', value: '4.7', icon: Star, change: '+0.2', color: 'text-amber-600 bg-amber-50' },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-white rounded-xl border p-4">
              <div className={`p-2 rounded-lg ${metric.color} inline-flex mb-2`}>
                <Icon size={18} />
              </div>
              <p className="text-xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-xs text-gray-500">{metric.label}</p>
              <p className="text-xs text-green-600 mt-1">{metric.change} vs last month</p>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-semibold text-gray-900 mb-6">Monthly Revenue</h2>
        <div className="flex items-end gap-4 h-48">
          {monthlyData.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
              <p className="text-xs text-gray-500">Rs. {(m.revenue / 1000).toFixed(0)}K</p>
              <div
                className="w-full bg-primary/80 rounded-t-lg transition-all hover:bg-primary"
                style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
              ></div>
              <p className="text-xs font-medium text-gray-600">{m.month}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl border">
        <div className="p-5 border-b">
          <h2 className="font-semibold text-gray-900">Top Performing Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Units Sold</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Views</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {topProducts.map((product, i) => (
                <tr key={product.name} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm font-bold text-gray-400">{i + 1}</td>
                  <td className="px-5 py-3 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{product.sold}</td>
                  <td className="px-5 py-3 text-sm font-medium">{product.revenue}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{product.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
