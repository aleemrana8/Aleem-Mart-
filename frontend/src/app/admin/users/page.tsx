'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Ban, CheckCircle, Eye, Mail } from 'lucide-react';

const users = [
  { id: '1', name: 'Ali Hassan', email: 'ali@example.com', role: 'buyer', status: 'active', orders: 12, joined: '2024-01-01', lastActive: '2 hours ago' },
  { id: '2', name: 'Sara Khan', email: 'sara@example.com', role: 'buyer', status: 'active', orders: 8, joined: '2024-01-03', lastActive: '5 min ago' },
  { id: '3', name: 'Usman Malik', email: 'usman@example.com', role: 'seller', status: 'active', orders: 0, joined: '2023-12-15', lastActive: '1 day ago' },
  { id: '4', name: 'Fatima Noor', email: 'fatima@example.com', role: 'buyer', status: 'blocked', orders: 2, joined: '2023-11-20', lastActive: '30 days ago' },
  { id: '5', name: 'Hassan Ahmed', email: 'hassan@example.com', role: 'buyer', status: 'active', orders: 24, joined: '2023-09-10', lastActive: '10 min ago' },
  { id: '6', name: 'Ayesha Raza', email: 'ayesha@example.com', role: 'seller', status: 'active', orders: 0, joined: '2024-01-10', lastActive: '3 hours ago' },
];

export default function AdminUsersPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-500">View and manage all platform users</p>
        </div>
        <div className="text-sm text-gray-500">
          Total: <span className="font-semibold text-gray-900">15,234</span> users
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search by name or email..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          {['all', 'buyers', 'sellers', 'blocked'].map((f) => (
            <Button key={f} variant={filter === f ? 'default' : 'outline'} size="sm" onClick={() => setFilter(f)} className="capitalize">
              {f}
            </Button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Joined</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Last Active</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={user.role === 'seller' ? 'default' : 'secondary'} className="capitalize">
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={user.status === 'active' ? 'success' : 'destructive'} className="capitalize">
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{user.orders}</td>
                  <td className="px-5 py-4 text-sm text-gray-500">{user.joined}</td>
                  <td className="px-5 py-4 text-sm text-gray-500">{user.lastActive}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="View Profile">
                        <Eye size={16} className="text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Send Email">
                        <Mail size={16} className="text-gray-500" />
                      </button>
                      {user.status === 'active' ? (
                        <button className="p-1.5 hover:bg-red-50 rounded-lg" title="Block User">
                          <Ban size={16} className="text-red-500" />
                        </button>
                      ) : (
                        <button className="p-1.5 hover:bg-green-50 rounded-lg" title="Unblock">
                          <CheckCircle size={16} className="text-green-600" />
                        </button>
                      )}
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
