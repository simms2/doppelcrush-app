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

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setLoading(false);

      if (signInError.message?.toLowerCase().includes('invalid login credentials')) {
        setError('That email/password combo is not giving a match. Try again.');
      } else {
        setError(signInError.message);
      }

      return;
    }

    const user = data?.user;

    if (!user) {
      setLoading(false);
      setError('We could not load your account just yet. Try again.');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_complete')
      .eq('id', user.id)
      .maybeSingle();

    setLoading(false);

    if (!profile?.onboarding_complete) {
      router.push('/onboarding');
      return;
    }

    router.push('/discover');
  }

  return (
    <main className="dc-page-shell">
      <SiteHeader />

      <div className="dc-auth-wrap">
        <div className="dc-card dc-auth-card">
          <Link href="/" className="dc-back-link">
            ← Back to homepage
          </Link>

          <div className="dc-kicker">Welcome back</div>
          <h2>Your crushes are waiting</h2>
          <p className="dc-muted">
            Log back in and pick up where the chaos left off.
          </p>

          <form className="dc-form" onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="you@example.com"
            />

            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="Your password"
            />

            {error ? <div className="dc-error">{error}</div> : null}

            <button className="dc-btn dc-btn-primary" disabled={loading}>
              {loading ? 'Getting you back in...' : 'Log in'}
            </button>
          </form>

          <p className="dc-muted center-copy">
            Need an account?{' '}
            <Link href="/signup" className="dc-inline-link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}