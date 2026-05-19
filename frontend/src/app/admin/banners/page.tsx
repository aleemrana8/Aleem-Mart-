'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, Eye, Image as ImageIcon, MoveUp, MoveDown } from 'lucide-react';

const banners = [
  { id: '1', title: 'Summer Sale - Up to 70% Off', position: 'hero', status: 'active', link: '/shop?sale=summer', image: '/banners/summer-sale.jpg', order: 1, clicks: 1234 },
  { id: '2', title: 'New Arrivals - Electronics', position: 'hero', status: 'active', link: '/category/electronics', image: '/banners/electronics.jpg', order: 2, clicks: 890 },
  { id: '3', title: 'Free Shipping on Orders 3000+', position: 'top-bar', status: 'active', link: '/shop', image: '', order: 1, clicks: 456 },
  { id: '4', title: 'Flash Sale - 24 Hours Only', position: 'hero', status: 'scheduled', link: '/flash-sale', image: '/banners/flash.jpg', order: 3, clicks: 0 },
  { id: '5', title: 'Ramadan Collection', position: 'hero', status: 'inactive', link: '/category/fashion', image: '/banners/ramadan.jpg', order: 4, clicks: 2345 },
];

const positionColors: Record<string, string> = {
  hero: 'bg-blue-100 text-blue-800',
  'top-bar': 'bg-purple-100 text-purple-800',
  sidebar: 'bg-green-100 text-green-800',
  popup: 'bg-amber-100 text-amber-800',
};

export default function AdminBannersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banners & CMS</h1>
          <p className="text-gray-500">Manage homepage banners, promotions, and visual content</p>
        </div>
        <Button>
          <Plus size={16} className="mr-2" /> Add Banner
        </Button>
      </div>

      {/* Banner Grid Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {banners.filter(b => b.status === 'active' && b.position === 'hero').map((banner) => (
          <div key={banner.id} className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl h-40 flex items-center justify-center relative overflow-hidden group">
            <div className="text-center p-4">
              <ImageIcon size={24} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-600">{banner.title}</p>
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
              <button className="p-2 bg-white rounded-lg"><Edit2 size={14} /></button>
              <button className="p-2 bg-white rounded-lg"><Eye size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Banners Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-medium text-gray-900">All Banners</h3>
          <select className="border rounded-lg px-3 py-1.5 text-sm">
            <option>All Positions</option>
            <option>Hero</option>
            <option>Top Bar</option>
            <option>Sidebar</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Order</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Banner</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Position</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Clicks</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {banners.map((banner) => (
                <tr key={banner.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1 hover:bg-gray-100 rounded"><MoveUp size={12} className="text-gray-400" /></button>
                      <span className="text-sm font-medium text-gray-500">{banner.order}</span>
                      <button className="p-1 hover:bg-gray-100 rounded"><MoveDown size={12} className="text-gray-400" /></button>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-900">{banner.title}</p>
                    <p className="text-xs text-gray-500">{banner.link}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${positionColors[banner.position]}`}>
                      {banner.position}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={banner.status === 'active' ? 'success' : banner.status === 'scheduled' ? 'warning' : 'secondary'} className="capitalize">
                      {banner.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{banner.clicks.toLocaleString()}</td>
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
