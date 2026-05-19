'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import api from '@/lib/api';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    const verify = async () => {
      try {
        const { data } = await api.post('/auth/verify-email', { token });
        setStatus('success');
        setMessage(data.message || 'Email verified successfully!');
      } catch (err: any) {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed');
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm text-center">
        {status === 'loading' && (
          <div className="space-y-4">
            <Loader2 size={40} className="mx-auto text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Verifying your email...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <CheckCircle size={32} className="text-success" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Email Verified!</h1>
            <p className="text-sm text-muted-foreground">{message}</p>
            <Link href="/login" className="btn-premium inline-flex px-6 py-3 text-sm font-semibold mt-4">
              Continue to Login
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <XCircle size={32} className="text-destructive" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Verification Failed</h1>
            <p className="text-sm text-muted-foreground">{message}</p>
            <Link href="/login" className="btn-premium inline-flex px-6 py-3 text-sm font-semibold mt-4">
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
