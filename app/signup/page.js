'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import { getSupabaseBrowser } from '@/lib/supabase/client';

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') === 'chaos' ? 'chaos' : 'doppel';
  const [form, setForm] = useState({ email: '', password: '', firstName: '' });
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [ownPhoto, setOwnPhoto] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!ageConfirmed || !ownPhoto) {
      setError('Please confirm you are 18+ and that you will only upload your own photo.');
      return;
    }

    setLoading(true);
    const supabase = getSupabaseBrowser();
    const { error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.firstName,
          preferred_mode: mode,
        },
      },
    });
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    router.push(`/onboarding?mode=${mode}`);
  }

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <main className="dc-page-shell">
      <SiteHeader />
      <div className="dc-auth-wrap">
        <div className="dc-card dc-auth-card">
          <Link href="/" className="dc-back-link">← Back to homepage</Link>
          <div className="dc-kicker">Create account</div>
          <h2>Create your DoppelCrush account</h2>
          <p className="dc-muted">One selfie away from the plot twist.</p>
          <form className="dc-form" onSubmit={handleSubmit}>
            <label>First name</label>
            <input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} required />
            <label>Email</label>
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />
            <label>Password</label>
            <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} required />
            <label className="dc-check"><input type="checkbox" checked={ageConfirmed} onChange={(e) => setAgeConfirmed(e.target.checked)} /> I confirm I am 18 or over</label>
            <label className="dc-check"><input type="checkbox" checked={ownPhoto} onChange={(e) => setOwnPhoto(e.target.checked)} /> I confirm I will only upload photos of myself</label>
            {error ? <div className="dc-error">{error}</div> : null}
            <button className="dc-btn dc-btn-primary" disabled={loading}>{loading ? 'Creating account…' : 'Continue'}</button>
          </form>
          <p className="dc-muted center-copy">Already got an account? <Link href="/login" className="dc-inline-link">Log in</Link></p>
        </div>
      </div>
    </main>
  );
}
