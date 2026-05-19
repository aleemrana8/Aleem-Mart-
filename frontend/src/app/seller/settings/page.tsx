'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, User, Lock, CreditCard, Bell } from 'lucide-react';
import { useState } from 'react';

export default function SellerSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'payout', label: 'Payout', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500">Manage your seller account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="w-full lg:w-48 bg-white rounded-xl border p-3 h-fit">
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
              <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">First Name</label>
                  <Input defaultValue="Ahmed" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Last Name</label>
                  <Input defaultValue="Ali" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                  <Input defaultValue="ahmed@techzone.pk" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Phone</label>
                  <Input defaultValue="+92-300-1234567" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">CNIC</label>
                  <Input defaultValue="35201-1234567-8" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="space-y-4 max-w-md">
              <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Current Password</label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">New Password</label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Confirm New Password</label>
                <Input type="password" placeholder="Confirm new password" />
              </div>
            </div>
          )}

          {activeTab === 'payout' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Payout Settings</h2>
              <p className="text-sm text-gray-500">Configure how you receive your earnings</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Bank Name</label>
                  <Input defaultValue="Meezan Bank" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Account Title</label>
                  <Input defaultValue="Ahmed Ali" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Account Number / IBAN</label>
                  <Input defaultValue="PK36MEZN0001234567890123" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Payout Schedule</label>
                  <select className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option>Weekly (Every Monday)</option>
                    <option selected>Bi-Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">Current Balance: Rs. 45,670</p>
                <p className="text-xs text-blue-600 mt-1">Next payout: January 22, 2024</p>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
              <div className="space-y-3">
                {[
                  { label: 'New Orders', desc: 'Get notified when you receive a new order' },
                  { label: 'Order Status Updates', desc: 'Updates on delivery and returns' },
                  { label: 'New Reviews', desc: 'When customers leave reviews' },
                  { label: 'Messages', desc: 'New customer messages' },
                  { label: 'Low Stock Alerts', desc: 'When products go below 5 units' },
                  { label: 'Payout Notifications', desc: 'Payout processed and balance updates' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-9 h-5 bg-gray-200 peer-checked:bg-primary rounded-full peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-6 border-t mt-6">
            <Button>
              <Save size={16} className="mr-2" /> Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
