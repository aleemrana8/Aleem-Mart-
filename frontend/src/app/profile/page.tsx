'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, MapPin, Package, Heart, Bell, LogOut, Save, Plus, Trash2, Edit2 } from 'lucide-react';

const addresses = [
  { id: '1', label: 'Home', fullName: 'Muhammad Aleem', phone: '+92-315-1664843', street: 'Hostel City, Park Road', city: 'Islamabad', state: 'ICT', country: 'Pakistan', postalCode: '44000', isDefault: true },
  { id: '2', label: 'Office', fullName: 'Muhammad Aleem', phone: '+92-315-1664843', street: 'Hostel City, Park Road', city: 'Islamabad', state: 'ICT', country: 'Pakistan', postalCode: '44000', isDefault: false },
];

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Account</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-56 bg-white rounded-xl border p-3 h-fit">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      activeTab === tab.id ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white rounded-xl border p-6">
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
                    MA
                  </div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">First Name</label>
                    <Input defaultValue="Muhammad" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Last Name</label>
                    <Input defaultValue="Aleem" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                    <Input defaultValue="aleem@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Phone</label>
                    <Input defaultValue="+92-300-1234567" />
                  </div>
                </div>
                <div className="pt-4">
                  <Button><Save size={16} className="mr-2" /> Save Changes</Button>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Shipping Addresses</h2>
                  <Button size="sm"><Plus size={14} className="mr-1" /> Add Address</Button>
                </div>
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <div key={addr.id} className={`border rounded-xl p-4 ${addr.isDefault ? 'border-primary bg-primary/5' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{addr.label}</p>
                            {addr.isDefault && (
                              <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Default</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{addr.fullName}</p>
                          <p className="text-sm text-gray-500">{addr.street}</p>
                          <p className="text-sm text-gray-500">{addr.city}, {addr.state} {addr.postalCode}</p>
                          <p className="text-sm text-gray-500">{addr.phone}</p>
                        </div>
                        <div className="flex gap-1">
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg"><Edit2 size={14} className="text-gray-500" /></button>
                          <button className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={14} className="text-red-500" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
