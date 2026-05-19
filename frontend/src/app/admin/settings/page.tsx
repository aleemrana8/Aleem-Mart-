'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Globe, Mail, CreditCard, Shield, Bell, Palette } from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-gray-500">Configure system-wide settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Tabs */}
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

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-xl border p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Platform Name</label>
                  <Input defaultValue="Aleem Mart" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Platform URL</label>
                  <Input defaultValue="https://aleemmart.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Support Email</label>
                  <Input defaultValue="raleem811811@gmail.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Support Phone</label>
                  <Input defaultValue="+92-315-1664843" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Default Currency</label>
                  <select className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option>PKR (Pakistani Rupee)</option>
                    <option>USD (US Dollar)</option>
                    <option>EUR (Euro)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Commission Rate (%)</label>
                  <Input type="number" defaultValue="10" />
                  <p className="text-xs text-gray-500 mt-1">Platform commission on each seller transaction</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Minimum Order Amount</label>
                  <Input type="number" defaultValue="500" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Email Configuration</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">SMTP Host</label>
                  <Input defaultValue="smtp.gmail.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">SMTP Port</label>
                  <Input defaultValue="587" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">From Email</label>
                  <Input defaultValue="noreply@aleemmart.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">From Name</label>
                  <Input defaultValue="Aleem Mart" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Payment Settings</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Stripe</h3>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="space-y-2">
                    <Input placeholder="Publishable Key" defaultValue="pk_test_..." />
                    <Input placeholder="Secret Key" defaultValue="sk_test_..." type="password" />
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Cash on Delivery</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-9 h-5 bg-gray-200 peer-checked:bg-primary rounded-full peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">Allow cash on delivery for orders</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">JazzCash</h3>
                    <Badge className="bg-yellow-100 text-yellow-800">Setup Required</Badge>
                  </div>
                  <Input placeholder="Merchant ID" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-checked:bg-primary rounded-full peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Rate Limiting</p>
                    <p className="text-sm text-gray-500">100 requests per 15 minutes per IP</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-checked:bg-primary rounded-full peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition"></div>
                  </label>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Session Timeout (hours)</label>
                  <Input type="number" defaultValue="24" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Max Login Attempts</label>
                  <Input type="number" defaultValue="5" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
              <div className="space-y-3">
                {[
                  { label: 'New Seller Registration', desc: 'Email when a new seller registers' },
                  { label: 'Order Disputes', desc: 'Alert for customer disputes' },
                  { label: 'Low Stock Alerts', desc: 'When products go below threshold' },
                  { label: 'Refund Requests', desc: 'Customer refund requests' },
                  { label: 'Product Reports', desc: 'Reported products or reviews' },
                  { label: 'Daily Summary', desc: 'Daily sales and activity report' },
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

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Primary Color</label>
                  <div className="flex items-center gap-3">
                    <input type="color" defaultValue="#e94560" className="h-10 w-10 border rounded cursor-pointer" />
                    <Input defaultValue="#e94560" className="max-w-[150px]" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Logo</label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <p className="text-sm text-gray-500">Drop logo image here or click to upload</p>
                    <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (max 2MB)</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Favicon</label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <p className="text-sm text-gray-500">Drop favicon here or click to upload</p>
                    <p className="text-xs text-gray-400 mt-1">ICO, PNG (32x32 or 16x16)</p>
                  </div>
                </div>
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

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${className}`}>{children}</span>;
}
