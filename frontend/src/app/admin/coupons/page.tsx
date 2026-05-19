'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, Copy } from 'lucide-react';

const coupons = [
  { id: '1', code: 'WELCOME10', type: 'percentage', value: 10, minOrder: 1000, maxDiscount: 500, usage: 234, limit: 1000, status: 'active', expires: '2024-02-28' },
  { id: '2', code: 'FLAT500', type: 'fixed', value: 500, minOrder: 3000, maxDiscount: 500, usage: 89, limit: 500, status: 'active', expires: '2024-01-31' },
  { id: '3', code: 'NEWYEAR25', type: 'percentage', value: 25, minOrder: 5000, maxDiscount: 2000, usage: 450, limit: 500, status: 'expired', expires: '2024-01-01' },
  { id: '4', code: 'SUMMER15', type: 'percentage', value: 15, minOrder: 2000, maxDiscount: 1500, usage: 0, limit: 300, status: 'scheduled', expires: '2024-06-30' },
  { id: '5', code: 'FREESHIP', type: 'freeShipping', value: 0, minOrder: 2500, maxDiscount: 250, usage: 678, limit: null, status: 'active', expires: '2024-12-31' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'secondary' | 'destructive'> = {
  active: 'success',
  expired: 'secondary',
  scheduled: 'warning',
  disabled: 'destructive',
};

export default function AdminCouponsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coupons & Promotions</h1>
          <p className="text-gray-500">Create and manage platform-wide discount coupons</p>
        </div>
        <Button>
          <Plus size={16} className="mr-2" /> Create Coupon
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Coupons', value: '12' },
          { label: 'Total Redemptions', value: '1,451' },
          { label: 'Total Savings', value: 'Rs. 345K' },
          { label: 'Avg. Discount', value: 'Rs. 238' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border p-4 text-center">
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Value</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Min Order</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Usage</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Expires</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">{coupon.code}</code>
                      <button className="p-1 hover:bg-gray-100 rounded" title="Copy code">
                        <Copy size={12} className="text-gray-400" />
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600 capitalize">
                    {coupon.type === 'freeShipping' ? 'Free Shipping' : coupon.type}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium">
                    {coupon.type === 'percentage' ? `${coupon.value}%` : coupon.type === 'fixed' ? `Rs. ${coupon.value}` : '-'}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">Rs. {coupon.minOrder.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {coupon.usage}{coupon.limit ? ` / ${coupon.limit}` : ' / ∞'}
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={statusVariant[coupon.status]} className="capitalize">{coupon.status}</Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{coupon.expires}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Edit">
                        <Edit2 size={14} className="text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg" title="Delete">
                        <Trash2 size={14} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
