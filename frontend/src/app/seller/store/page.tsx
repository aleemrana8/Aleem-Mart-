'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Upload, Store } from 'lucide-react';

export default function SellerStorePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
        <p className="text-gray-500">Customize your store appearance and policies</p>
      </div>

      {/* Store Banner */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center relative">
          <div className="text-center">
            <Upload size={24} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Click to upload store banner (1200x300px)</p>
          </div>
        </div>
        <div className="p-6 -mt-12 relative">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 bg-white rounded-xl border-4 border-white shadow-lg flex items-center justify-center">
              <Store size={32} className="text-gray-400" />
            </div>
            <div className="pb-2">
              <h2 className="text-xl font-bold text-gray-900">TechZone Official</h2>
              <p className="text-sm text-gray-500">Member since January 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Store Info */}
      <div className="bg-white rounded-xl border p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">Store Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Store Name</label>
            <Input defaultValue="TechZone Official" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Store Slug</label>
            <Input defaultValue="techzone-official" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Store Description</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2 text-sm min-h-[100px]"
              defaultValue="Your one-stop shop for premium tech gadgets, accessories, and electronics. Fast delivery across Pakistan."
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Contact Email</label>
            <Input defaultValue="store@techzone.pk" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</label>
            <Input defaultValue="+92-300-1234567" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">City</label>
            <Input defaultValue="Lahore" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Business Type</label>
            <select className="w-full border rounded-lg px-3 py-2 text-sm">
              <option>Individual</option>
              <option selected>Registered Business</option>
              <option>Corporation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Policies */}
      <div className="bg-white rounded-xl border p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">Store Policies</h3>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Return Policy</label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 text-sm min-h-[80px]"
            defaultValue="We accept returns within 7 days of delivery. Items must be unused and in original packaging. Refund will be processed within 3-5 business days."
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Shipping Policy</label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 text-sm min-h-[80px]"
            defaultValue="Free shipping on orders above Rs. 3,000. Standard delivery 3-5 business days. Express delivery available for select cities."
          />
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <Button>
          <Save size={16} className="mr-2" /> Save Changes
        </Button>
      </div>
    </div>
  );
}
