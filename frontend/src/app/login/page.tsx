'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShoppingBag, Store } from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginAs, setLoginAs] = useState<'buyer' | 'seller'>('buyer');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { 
        email: formData.email, 
        password: formData.password,
        role: loginAs 
      });
      const { user, token, refreshToken } = data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      useAuthStore.getState().setUser(user);
      
      if (user.role === 'seller') router.push('/seller');
      else if (user.role === 'admin') router.push('/admin');
      else router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-xs text-primary hover:text-primary/80 transition-colors mb-4 inline-flex items-center gap-1">
            ← Back to Home
          </Link>
          <Link href="/" className="block text-2xl font-bold text-foreground">
            Aleem Mart
          </Link>
          <p className="text-sm text-muted-foreground mt-2">Sign in with any email & password</p>
        </div>

        <div className="rounded-2xl border border-border/50 p-8">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          {/* Role Selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setLoginAs('buyer')}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                loginAs === 'buyer'
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border/50 hover:border-border'
              }`}
            >
              <div className={`p-2.5 rounded-lg ${loginAs === 'buyer' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                <ShoppingBag size={20} />
              </div>
              <span className={`text-sm font-medium ${loginAs === 'buyer' ? 'text-primary' : 'text-muted-foreground'}`}>
                Buyer
              </span>
            </button>
            <button
              type="button"
              onClick={() => setLoginAs('seller')}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                loginAs === 'seller'
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border/50 hover:border-border'
              }`}
            >
              <div className={`p-2.5 rounded-lg ${loginAs === 'seller' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                <Store size={20} />
              </div>
              <span className={`text-sm font-medium ${loginAs === 'seller' ? 'text-primary' : 'text-muted-foreground'}`}>
                Seller
              </span>
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-premium pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-premium pl-10 pr-10"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-premium py-3 text-sm font-semibold flex items-center justify-center gap-2">
              {loading ? 'Signing in...' : `Sign In as ${loginAs === 'seller' ? 'Seller' : 'Buyer'}`}
              {!loading && <ArrowRight size={14} />}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Main Screen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
