'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import { getSupabaseBrowser } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = getSupabaseBrowser();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.push('/discover');
  }

  return (
    <main className="dc-page-shell">
      <SiteHeader />
      <div className="dc-auth-wrap">
        <div className="dc-card dc-auth-card">
          <Link href="/" className="dc-back-link">← Back to homepage</Link>
          <div className="dc-kicker">Welcome back</div>
          <h2>Your matches are waiting</h2>
          <p className="dc-muted">Log in to jump back into your feed.</p>
          <form className="dc-form" onSubmit={handleSubmit}>
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            {error ? <div className="dc-error">{error}</div> : null}
            <button className="dc-btn dc-btn-primary" disabled={loading}>{loading ? 'Logging in…' : 'Log in'}</button>
          </form>
          <p className="dc-muted center-copy">Need an account? <Link href="/signup" className="dc-inline-link">Create one</Link></p>
        </div>
      </div>
    </main>
  );
}
