'use client';

import { useState } from 'react';
import { Trophy, Star, Gift, Zap, Target, Users, ArrowUpRight, Crown, Flame } from 'lucide-react';

const mockProfile = {
  points: 1250,
  lifetimePoints: 2450,
  tier: 'gold' as const,
  streakDays: 12,
  badges: ['first_purchase', 'reviewer', 'streak_7'],
  referralCode: 'AMUSER42',
  referralCount: 3,
};

const TIER_CONFIG = {
  bronze: { color: 'from-amber-700 to-amber-900', label: 'Bronze', icon: '🥉', minPoints: 0 },
  silver: { color: 'from-gray-300 to-gray-500', label: 'Silver', icon: '🥈', minPoints: 500 },
  gold: { color: 'from-yellow-400 to-amber-500', label: 'Gold', icon: '🥇', minPoints: 2000 },
  platinum: { color: 'from-slate-300 to-slate-600', label: 'Platinum', icon: '💎', minPoints: 5000 },
  diamond: { color: 'from-cyan-300 to-blue-600', label: 'Diamond', icon: '👑', minPoints: 15000 },
};

const allBadges = [
  { id: 'first_purchase', name: 'First Purchase', icon: '🛒', earned: true },
  { id: 'reviewer', name: 'Reviewer', icon: '⭐', earned: true },
  { id: 'streak_7', name: 'Week Warrior', icon: '🔥', earned: true },
  { id: 'streak_30', name: 'Monthly Master', icon: '💪', earned: false },
  { id: 'big_spender', name: 'Big Spender', icon: '💎', earned: false },
  { id: 'referrer', name: 'Social Star', icon: '🌟', earned: false },
  { id: 'early_bird', name: 'Early Bird', icon: '🐦', earned: false },
  { id: 'explorer', name: 'Explorer', icon: '🗺️', earned: false },
];

const pointsHistory = [
  { action: 'Purchase - Wireless Earbuds', points: 55, date: '2 hours ago', type: 'earn' },
  { action: 'Daily Login Bonus', points: 5, date: 'Today', type: 'earn' },
  { action: 'Redeemed Discount', points: -200, date: 'Yesterday', type: 'redeem' },
  { action: 'Product Review', points: 25, date: '2 days ago', type: 'earn' },
  { action: 'Streak Bonus (7 days)', points: 50, date: '5 days ago', type: 'earn' },
  { action: 'Referral - Sara joined', points: 100, date: '1 week ago', type: 'earn' },
];

export default function LoyaltyPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'history' | 'redeem'>('overview');
  const tierConfig = TIER_CONFIG[mockProfile.tier];
  const nextTier = TIER_CONFIG.platinum;
  const progress = Math.round(((mockProfile.lifetimePoints - TIER_CONFIG.gold.minPoints) / (nextTier.minPoints - TIER_CONFIG.gold.minPoints)) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${tierConfig.color} text-white py-12 px-4`}>
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown size={24} />
                <span className="text-sm font-medium opacity-90">Aleem Mart Rewards</span>
              </div>
              <h1 className="text-3xl font-bold mb-1">{tierConfig.icon} {tierConfig.label} Member</h1>
              <p className="opacity-80 text-sm">Keep shopping to unlock Platinum perks!</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">{mockProfile.points.toLocaleString()}</p>
              <p className="text-sm opacity-80">Available Points</p>
              <p className="text-xs opacity-60 mt-1">≈ Rs. {Math.floor(mockProfile.points * 0.5).toLocaleString()} value</p>
            </div>
          </div>
          {/* Progress to next tier */}
          <div className="mt-6">
            <div className="flex justify-between text-xs opacity-80 mb-1">
              <span>{tierConfig.label}</span>
              <span>{mockProfile.lifetimePoints.toLocaleString()} / {nextTier.minPoints.toLocaleString()} pts</span>
              <span>{nextTier.label}</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto max-w-4xl px-4 -mt-4">
        <div className="flex bg-white rounded-xl shadow-sm border overflow-hidden">
          {[
            { key: 'overview', label: 'Overview', icon: Target },
            { key: 'badges', label: 'Badges', icon: Trophy },
            { key: 'history', label: 'History', icon: Zap },
            { key: 'redeem', label: 'Redeem', icon: Gift },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${activeTab === key ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6 pb-12">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Stats Cards */}
              <div className="bg-white rounded-xl border p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Your Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2"><Flame size={14} className="text-red-500" /> Login Streak</span>
                    <span className="font-bold text-gray-900">{mockProfile.streakDays} days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2"><Trophy size={14} className="text-amber-500" /> Badges Earned</span>
                    <span className="font-bold text-gray-900">{mockProfile.badges.length}/{allBadges.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2"><Users size={14} className="text-blue-500" /> Referrals</span>
                    <span className="font-bold text-gray-900">{mockProfile.referralCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-2"><Star size={14} className="text-purple-500" /> Lifetime Points</span>
                    <span className="font-bold text-gray-900">{mockProfile.lifetimePoints.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Referral Card */}
              <div className="bg-white rounded-xl border p-5">
                <h3 className="font-semibold text-gray-900 mb-2">Refer & Earn</h3>
                <p className="text-xs text-gray-500 mb-4">Share your code and earn 100 pts when they sign up + 200 pts on their first purchase!</p>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-dashed">
                  <span className="font-mono font-bold text-lg text-primary flex-1">{mockProfile.referralCode}</span>
                  <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary/90">Copy</button>
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">{mockProfile.referralCount} friends referred so far</p>
              </div>

              {/* Tier Benefits */}
              <div className="md:col-span-2 bg-white rounded-xl border p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Your {tierConfig.label} Benefits</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-lg font-bold text-green-700">5%</p>
                    <p className="text-xs text-gray-500">Extra Discount</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-lg font-bold text-blue-700">Free</p>
                    <p className="text-xs text-gray-500">Shipping</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-lg font-bold text-purple-700">1.5x</p>
                    <p className="text-xs text-gray-500">Points Multiplier</p>
                  </div>
                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <p className="text-lg font-bold text-amber-700">Priority</p>
                    <p className="text-xs text-gray-500">Support</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allBadges.map((badge) => (
                <div key={badge.id} className={`bg-white rounded-xl border p-4 text-center transition-all ${badge.earned ? 'hover:shadow-lg' : 'opacity-50 grayscale'}`}>
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <p className="text-sm font-medium text-gray-900">{badge.name}</p>
                  <p className={`text-xs mt-1 ${badge.earned ? 'text-green-600' : 'text-gray-400'}`}>
                    {badge.earned ? '✓ Earned' : 'Locked'}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white rounded-xl border divide-y">
              {pointsHistory.map((item, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                  <span className={`font-bold text-sm ${item.type === 'earn' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.type === 'earn' ? '+' : ''}{item.points} pts
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'redeem' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border p-5 hover:shadow-lg transition-shadow">
                <div className="text-2xl mb-3">🏷️</div>
                <h4 className="font-semibold text-gray-900">Rs. 100 Discount</h4>
                <p className="text-xs text-gray-500 mt-1 mb-4">Apply on your next order</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-600">200 pts</span>
                  <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary/90">Redeem</button>
                </div>
              </div>
              <div className="bg-white rounded-xl border p-5 hover:shadow-lg transition-shadow">
                <div className="text-2xl mb-3">🚚</div>
                <h4 className="font-semibold text-gray-900">Free Shipping</h4>
                <p className="text-xs text-gray-500 mt-1 mb-4">One-time free delivery</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-600">100 pts</span>
                  <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary/90">Redeem</button>
                </div>
              </div>
              <div className="bg-white rounded-xl border p-5 hover:shadow-lg transition-shadow">
                <div className="text-2xl mb-3">🎁</div>
                <h4 className="font-semibold text-gray-900">Rs. 500 Voucher</h4>
                <p className="text-xs text-gray-500 mt-1 mb-4">Min. order Rs. 3,000</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-600">800 pts</span>
                  <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary/90">Redeem</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
