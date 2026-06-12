'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import AppNav from '@/components/AppNav';
import RequireAuth from '@/components/RequireAuth';
import { getSupabaseBrowser } from '@/lib/supabase/client';

function formatMode(mode) {
  if (mode === 'chaos') return 'Chaos Mode';
  if (mode === 'doppel') return 'Doppel Mode';
  return 'Not set';
}

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (loadedUser) => {
    const supabase = getSupabaseBrowser();
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', loadedUser.id)
      .maybeSingle();

    setProfile(data);
  }, []);

  async function resetProfile() {
    if (!user) return;

    const confirmed = window.confirm(
      'Delete your profile and start again from onboarding?'
    );

    if (!confirmed) return;

    setLoading(true);
    setStatus('');

    const supabase = getSupabaseBrowser();
    const { error } = await supabase.from('profiles').delete().eq('id', user.id);

    setLoading(false);

    if (error) {
      setStatus(`Could not delete your profile yet: ${error.message}`);
      return;
    }

    setProfile(null);
    setStatus('Profile deleted. You can run onboarding again whenever you’re ready.');
  }

  return (
    <RequireAuth
      onUserLoaded={(loadedUser) => {
        setUser(loadedUser);
        load(loadedUser);
      }}
    >
      <main className="dc-page-shell">
        <SiteHeader appMode />

        <section className="dc-card dc-panel">
          <div className="dc-panel-top">
            <div>
              <div className="dc-kicker">Settings</div>
              <h2>Your account</h2>
              <p className="dc-muted">
                Keep things cute, safe, and under control.
              </p>
            </div>

            <div className="dc-badge">
              {profile?.onboarding_complete ? 'Profile live' : 'Setup needed'}
            </div>
          </div>

          <div className="dc-settings-list">
            <div className="dc-setting-row">
              <span>Logged in as</span>
              <strong>{user?.email || 'Loading...'}</strong>
            </div>

            <div className="dc-setting-row">
              <span>Preferred mode</span>
              <strong>{formatMode(profile?.mode_preference)}</strong>
            </div>

            <div className="dc-setting-row">
              <span>Profile status</span>
              <strong>
                {profile?.onboarding_complete ? 'Ready to match' : 'Needs onboarding'}
              </strong>
            </div>

            <div className="dc-setting-row">
              <span>Privacy and safety</span>
              <strong>18+, opt-in only</strong>
            </div>
          </div>

          <div className="dc-info-grid info-grid-tight">
            <div className="dc-card dc-panel">
              <div className="dc-kicker pink">Good to know</div>
              <h3>Use your own selfie</h3>
              <p className="dc-muted">
                DoppelCrush works best when the face card is actually yours.
              </p>
            </div>

            <div className="dc-card dc-panel">
              <div className="dc-kicker">Need a reset?</div>
              <h3>Start fresh anytime</h3>
              <p className="dc-muted">
                Delete your profile data and go through onboarding again if you want a clean restart.
              </p>
            </div>
          </div>

          {status ? <div className="dc-notice">{status}</div> : null}

          <div className="dc-button-row" style={{ marginTop: 18, flexWrap: 'wrap' }}>
            <Link className="dc-btn dc-btn-light" href="/discover">
              Back to Discover
            </Link>

            <button
              className="dc-btn dc-btn-ghost"
              onClick={resetProfile}
              disabled={loading}
            >
              {loading ? 'Deleting profile...' : 'Delete profile data'}
            </button>
          </div>
        </section>

        <AppNav />
      </main>
    </RequireAuth>
  );
}