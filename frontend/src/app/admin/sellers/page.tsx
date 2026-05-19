'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle, XCircle, Eye, MoreVertical } from 'lucide-react';

const sellers = [
  { id: '1', name: 'TechZone Official', owner: 'Ahmed Ali', email: 'ahmed@techzone.pk', status: 'approved', products: 48, revenue: 'Rs. 245,680', rating: 4.7 },
  { id: '2', name: 'FashionHub', owner: 'Sara Khan', email: 'sara@fashionhub.pk', status: 'approved', products: 124, revenue: 'Rs. 567,890', rating: 4.5 },
  { id: '3', name: 'GamersParadise', owner: 'Usman Malik', email: 'usman@gamers.pk', status: 'pending', products: 0, revenue: 'Rs. 0', rating: 0 },
  { id: '4', name: 'HomeDecor Plus', owner: 'Fatima Noor', email: 'fatima@homedecor.pk', status: 'pending', products: 0, revenue: 'Rs. 0', rating: 0 },
  { id: '5', name: 'SportsMax', owner: 'Ali Raza', email: 'ali@sportsmax.pk', status: 'suspended', products: 67, revenue: 'Rs. 123,450', rating: 3.2 },
];

const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'destructive' | 'secondary' }> = {
  approved: { label: 'Approved', variant: 'success' },
  pending: { label: 'Pending', variant: 'warning' },
  suspended: { label: 'Suspended', variant: 'destructive' },
  rejected: { label: 'Rejected', variant: 'secondary' },
};

export default function AdminSellersPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sellers Management</h1>
          <p className="text-gray-500">Approve, manage, and monitor seller accounts</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border p-4 flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search sellers..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'suspended'].map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {/* Sellers Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Store</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Owner</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Products</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sellers.map((seller) => (
                <tr key={seller.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{seller.name}</p>
                      <p className="text-xs text-gray-500">{seller.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{seller.owner}</td>
                  <td className="px-5 py-4">
                    <Badge variant={statusConfig[seller.status].variant}>
                      {statusConfig[seller.status].label}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{seller.products}</td>
                  <td className="px-5 py-4 text-sm font-medium">{seller.revenue}</td>
                  <td className="px-5 py-4 text-sm">{seller.rating > 0 ? `★ ${seller.rating}` : '-'}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {seller.status === 'pending' && (
                        <>
                          <button className="p-1.5 hover:bg-green-50 rounded-lg" title="Approve">
                            <CheckCircle size={16} className="text-green-600" />
                          </button>
                          <button className="p-1.5 hover:bg-red-50 rounded-lg" title="Reject">
                            <XCircle size={16} className="text-red-500" />
                          </button>
                        </>
                      )}
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="View">
                        <Eye size={16} className="text-gray-500" />
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
