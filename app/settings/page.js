'use client';

import { useCallback, useState } from 'react';
import SiteHeader from '@/components/SiteHeader';
import AppNav from '@/components/AppNav';
import RequireAuth from '@/components/RequireAuth';
import { getSupabaseBrowser } from '@/lib/supabase/client';

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState('');

  const load = useCallback(async (loadedUser) => {
    const supabase = getSupabaseBrowser();
    const { data } = await supabase.from('profiles').select('*').eq('id', loadedUser.id).maybeSingle();
    setProfile(data);
  }, []);

  async function resetProfile() {
    if (!user) return;
    const confirmed = window.confirm('Reset your profile data for this user?');
    if (!confirmed) return;
    const supabase = getSupabaseBrowser();
    await supabase.from('profiles').delete().eq('id', user.id);
    setStatus('Profile deleted. Run onboarding again to recreate it.');
  }

  return (
    <RequireAuth onUserLoaded={(loadedUser) => { setUser(loadedUser); load(loadedUser); }}>
      <main className="dc-page-shell">
        <SiteHeader appMode />
        <section className="dc-card dc-panel">
          <div className="dc-kicker">Settings</div>
          <h2>Account and safety</h2>
          <div className="dc-settings-list">
            <div className="dc-setting-row"><span>Logged in as</span><strong>{user?.email || 'Loading…'}</strong></div>
            <div className="dc-setting-row"><span>Preferred mode</span><strong>{profile?.mode_preference || 'Not set'}</strong></div>
            <div className="dc-setting-row"><span>Privacy and safety</span><strong>18+, opt-in only</strong></div>
          </div>
          {status ? <div className="dc-notice">{status}</div> : null}
          <div className="dc-button-row">
            <button className="dc-btn dc-btn-ghost" onClick={resetProfile}>Delete profile data</button>
          </div>
        </section>
        <AppNav />
      </main>
    </RequireAuth>
  );
}
