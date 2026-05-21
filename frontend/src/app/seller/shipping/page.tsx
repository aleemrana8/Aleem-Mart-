'use client';

import { useState } from 'react';
import { Truck, Package, MapPin, Clock, Save } from 'lucide-react';

const shippingZones = [
  { id: 1, name: 'Punjab', cities: 'Lahore, Islamabad, Rawalpindi, Faisalabad, Multan', rate: 200, deliveryDays: '2-3' },
  { id: 2, name: 'Sindh', cities: 'Karachi, Hyderabad, Sukkur', rate: 300, deliveryDays: '3-5' },
  { id: 3, name: 'KPK', cities: 'Peshawar, Mardan, Abbottabad', rate: 350, deliveryDays: '3-5' },
  { id: 4, name: 'Balochistan', cities: 'Quetta, Gwadar', rate: 500, deliveryDays: '5-7' },
];

export default function SellerShippingPage() {
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('5000');
  const [processingTime, setProcessingTime] = useState('1-2');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Shipping Settings</h1>
        <p className="text-muted-foreground">Configure shipping zones, rates, and delivery times</p>
      </div>

      {/* General Settings */}
      <div className="bg-card rounded-xl border border-border/50 p-6 space-y-4">
        <h2 className="font-semibold text-foreground flex items-center gap-2"><Truck size={18} /> General Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Free Shipping Threshold (Rs.)</label>
            <input
              type="number"
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="e.g. 5000"
            />
            <p className="text-xs text-muted-foreground mt-1">Orders above this amount get free shipping</p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Processing Time</label>
            <select
              value={processingTime}
              onChange={(e) => setProcessingTime(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border/60 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="same-day">Same Day</option>
              <option value="1-2">1-2 Business Days</option>
              <option value="2-3">2-3 Business Days</option>
              <option value="3-5">3-5 Business Days</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">Time to prepare order before handoff to courier</p>
          </div>
        </div>
      </div>

      {/* Shipping Zones */}
      <div className="bg-card rounded-xl border border-border/50">
        <div className="p-5 border-b border-border/50 flex items-center justify-between">
          <h2 className="font-semibold text-foreground flex items-center gap-2"><MapPin size={18} /> Shipping Zones</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Zone</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Coverage</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Rate</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">Delivery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {shippingZones.map((zone) => (
                <tr key={zone.id} className="hover:bg-muted/30">
                  <td className="px-5 py-4 text-sm font-medium text-foreground">{zone.name}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{zone.cities}</td>
                  <td className="px-5 py-4 text-sm font-medium text-foreground">Rs. {zone.rate}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground flex items-center gap-1"><Clock size={12} />{zone.deliveryDays} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Courier Partners */}
      <div className="bg-card rounded-xl border border-border/50 p-6">
        <h2 className="font-semibold text-foreground flex items-center gap-2 mb-4"><Package size={18} /> Courier Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'TCS', status: 'Active', deliverySpeed: '2-5 days' },
            { name: 'Leopards Courier', status: 'Active', deliverySpeed: '3-5 days' },
            { name: 'Pakistan Post', status: 'Inactive', deliverySpeed: '5-10 days' },
          ].map((courier) => (
            <div key={courier.name} className="p-4 rounded-lg border border-border/50 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">{courier.name}</p>
                <p className="text-xs text-muted-foreground">{courier.deliverySpeed}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${courier.status === 'Active' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-muted text-muted-foreground'}`}>
                {courier.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button className="btn-premium px-6 py-2.5 text-sm font-medium rounded-lg flex items-center gap-2">
        <Save size={16} /> Save Settings
      </button>
    </div>
  );
}
