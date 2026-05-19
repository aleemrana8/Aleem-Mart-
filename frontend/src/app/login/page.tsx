'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData.email, formData.password);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOtpLoading(true);
    try {
      await api.post('/auth/send-login-otp', { email: formData.email });
      setOtpSent(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOtpLoading(true);
    try {
      const { data } = await api.post('/auth/verify-login-otp', { email: formData.email, otp });
      const { user, token, refreshToken } = data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      useAuthStore.getState().setUser(user);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-bold text-foreground">
            Aleem Mart
          </Link>
          <p className="text-sm text-muted-foreground mt-2">Welcome back! Sign in to your account</p>
        </div>

        <div className="rounded-2xl border border-border/50 p-8">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          {/* Mode Toggle */}
          <div className="flex gap-1 bg-muted/30 p-1 rounded-xl mb-6">
            <button
              onClick={() => { setMode('password'); setOtpSent(false); setError(''); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${mode === 'password' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
            >
              Password
            </button>
            <button
              onClick={() => { setMode('otp'); setError(''); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${mode === 'otp' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
            >
              Email OTP
            </button>
          </div>

          {mode === 'password' ? (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded accent-primary" />
                  <span className="text-xs text-muted-foreground">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-xs text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" disabled={isLoading} className="w-full btn-premium py-3 text-sm font-semibold flex items-center justify-center gap-2">
                {isLoading ? 'Signing in...' : 'Sign In'}
                {!isLoading && <ArrowRight size={14} />}
              </button>
            </form>
          ) : (
            <>
              {!otpSent ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email Address</label>
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
                  <p className="text-xs text-muted-foreground">We&apos;ll send a 6-digit code to your email</p>
                  <button type="submit" disabled={otpLoading} className="w-full btn-premium py-3 text-sm font-semibold flex items-center justify-center gap-2">
                    {otpLoading ? 'Sending...' : 'Send Login Code'}
                    {!otpLoading && <Mail size={14} />}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="text-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                      <Shield size={20} className="text-success" />
                    </div>
                    <p className="text-sm text-foreground font-medium">Check your email</p>
                    <p className="text-xs text-muted-foreground mt-1">Code sent to {formData.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Enter 6-digit code</label>
                    <input
                      type="text"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="input-premium text-center text-lg tracking-[0.5em] font-mono"
                      maxLength={6}
                      required
                    />
                  </div>
                  <button type="submit" disabled={otpLoading || otp.length !== 6} className="w-full btn-premium py-3 text-sm font-semibold">
                    {otpLoading ? 'Verifying...' : 'Verify & Sign In'}
                  </button>
                  <button type="button" onClick={() => { setOtpSent(false); setOtp(''); }} className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Use a different email
                  </button>
                </form>
              )}
            </>
          )}

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary font-medium hover:text-primary/80 transition-colors">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
