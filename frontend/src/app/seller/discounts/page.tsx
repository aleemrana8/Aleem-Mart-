'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const discounts = [
  { id: '1', code: 'STORE10', type: 'percentage', value: 10, minOrder: 2000, maxDiscount: 500, usage: 45, limit: 100, status: 'active', expires: '2024-02-28' },
  { id: '2', code: 'FLAT200', type: 'fixed', value: 200, minOrder: 1500, maxDiscount: 200, usage: 12, limit: 50, status: 'active', expires: '2024-01-31' },
  { id: '3', code: 'NEWYEAR15', type: 'percentage', value: 15, minOrder: 3000, maxDiscount: 1000, usage: 50, limit: 50, status: 'expired', expires: '2024-01-01' },
];

export default function SellerDiscountsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discounts & Coupons</h1>
          <p className="text-gray-500">Create store-specific discount codes</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus size={16} className="mr-2" /> Create Coupon
        </Button>
      </div>

      {/* Create Coupon Form */}
      {showForm && (
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">New Coupon</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Coupon Code</label>
              <Input placeholder="e.g., SUMMER20" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Discount Type</label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm">
                <option>Percentage</option>
                <option>Fixed Amount</option>
                <option>Free Shipping</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Discount Value</label>
              <Input type="number" placeholder="10" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Minimum Order (Rs.)</label>
              <Input type="number" placeholder="1000" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Max Discount (Rs.)</label>
              <Input type="number" placeholder="500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Usage Limit</label>
              <Input type="number" placeholder="100" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Expiry Date</label>
              <Input type="date" />
            </div>
          </div>
          <div className="flex gap-3">
            <Button>Create Coupon</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Existing Coupons */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Discount</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Min Order</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Usage</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Expires</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {discounts.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <code className="text-sm font-mono font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">{d.code}</code>
                  </td>
                  <td className="px-5 py-4 text-sm font-medium">
                    {d.type === 'percentage' ? `${d.value}%` : `Rs. ${d.value}`}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">Rs. {d.minOrder.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{d.usage} / {d.limit}</td>
                  <td className="px-5 py-4">
                    <Badge variant={d.status === 'active' ? 'success' : 'secondary'} className="capitalize">{d.status}</Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{d.expires}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg"><Edit2 size={14} className="text-gray-500" /></button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={14} className="text-red-500" /></button>
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
