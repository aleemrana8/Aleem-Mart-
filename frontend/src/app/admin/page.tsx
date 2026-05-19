'use client';

import { Users, Store, Package, ShoppingCart, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: 'Rs. 2,456,800', change: '+18.5%', icon: DollarSign, color: 'text-green-600 bg-green-50' },
  { label: 'Total Orders', value: '3,456', change: '+12.2%', icon: ShoppingCart, color: 'text-blue-600 bg-blue-50' },
  { label: 'Active Sellers', value: '128', change: '+5', icon: Store, color: 'text-purple-600 bg-purple-50' },
  { label: 'Total Users', value: '15,234', change: '+234', icon: Users, color: 'text-amber-600 bg-amber-50' },
  { label: 'Products', value: '4,567', change: '+89', icon: Package, color: 'text-cyan-600 bg-cyan-50' },
  { label: 'Growth', value: '+23.4%', change: 'vs last month', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
];

const pendingActions = [
  { type: 'Seller Approval', count: 5, icon: Store, urgent: true },
  { type: 'Product Reports', count: 3, icon: AlertTriangle, urgent: true },
  { type: 'Refund Requests', count: 8, icon: DollarSign, urgent: false },
  { type: 'Review Moderation', count: 12, icon: CheckCircle, urgent: false },
];

const recentActivity = [
  { action: 'New seller registered', detail: 'TechGadgets Store', time: '5 min ago' },
  { action: 'Order refund requested', detail: 'Order #AM-KJ3F2-ABC123', time: '15 min ago' },
  { action: 'Product reported', detail: 'Counterfeit product report', time: '30 min ago' },
  { action: 'New category requested', detail: 'Pet Supplies', time: '1 hour ago' },
  { action: 'Seller payout processed', detail: 'Rs. 45,000 to AudioMax', time: '2 hours ago' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">Platform overview and management controls</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border p-4">
              <div className={`p-2 rounded-lg ${stat.color} inline-flex mb-2`}>
                <Icon size={18} />
              </div>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Actions */}
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
                  <button className="text-xs text-primary hover:underline font-medium">Review</button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border">
          <div className="p-5 border-b">
            <h2 className="font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-5 space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.detail}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
