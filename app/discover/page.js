'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import AppNav from '@/components/AppNav';
import RequireAuth from '@/components/RequireAuth';
import MatchCard from '@/components/MatchCard';
import { getSupabaseBrowser } from '@/lib/supabase/client';
import { makePairKey, scoreProfiles } from '@/lib/demo';

export default function DiscoverPage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [mode, setMode] = useState('doppel');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const load = useCallback(async (currentUser) => {
    const supabase = getSupabaseBrowser();
    const { data: myProfile } = await supabase.from('profiles').select('*').eq('id', currentUser.id).maybeSingle();
    if (!myProfile?.onboarding_complete) {
      router.replace('/onboarding');
      return;
    }
    setProfile(myProfile);
    setMode(myProfile.mode_preference || 'doppel');

    const { data: swipes } = await supabase.from('swipes').select('target_id').eq('swiper_id', currentUser.id);
    const seen = new Set((swipes || []).map((row) => row.target_id));

    const { data: otherProfiles } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', currentUser.id)
      .eq('onboarding_complete', true)
      .order('created_at', { ascending: false });

    const filtered = (otherProfiles || []).filter((item) => !seen.has(item.id));
    setCandidates(filtered);
    setLoading(false);
  }, [router]);

  async function handleLike(target) {
    if (!user || !profile) return;
    const supabase = getSupabaseBrowser();
    await supabase.from('swipes').upsert({
      swiper_id: user.id,
      target_id: target.id,
      action: 'like',
      mode,
    });

    const { data: reverse } = await supabase
      .from('swipes')
      .select('*')
      .eq('swiper_id', target.id)
      .eq('target_id', user.id)
      .eq('action', 'like')
      .maybeSingle();

    if (reverse) {
      await supabase.from('matches').upsert({
        pair_key: makePairKey(user.id, target.id),
        user_one: user.id,
        user_two: target.id,
      }, { onConflict: 'pair_key' });
      setMessage(`It’s a match with ${target.first_name}.`);
    }

    setCandidates((prev) => prev.filter((item) => item.id !== target.id));
  }

  async function handlePass(target) {
    if (!user) return;
    const supabase = getSupabaseBrowser();
    await supabase.from('swipes').upsert({
      swiper_id: user.id,
      target_id: target.id,
      action: 'pass',
      mode,
    });
    setCandidates((prev) => prev.filter((item) => item.id !== target.id));
  }

  const scoredCandidates = useMemo(() => {
    return candidates.map((candidate) => ({
      profile: candidate,
      score: scoreProfiles(profile, candidate, mode),
    }));
  }, [candidates, profile, mode]);

  return (
    <RequireAuth onUserLoaded={(loadedUser) => { setUser(loadedUser); load(loadedUser); }}>
      <main className="dc-page-shell">
        <SiteHeader appMode />
        <section className="dc-card dc-panel">
          <div className="dc-panel-top">
            <div>
              <div className="dc-kicker">Discover</div>
              <h2>Your matches</h2>
              <p className="dc-muted">Swipe through people who match your energy.</p>
            </div>
            <div className="dc-pill-toggle">
              <button className={mode === 'doppel' ? 'active' : ''} onClick={() => setMode('doppel')}>Doppel</button>
              <button className={mode === 'chaos' ? 'active' : ''} onClick={() => setMode('chaos')}>Chaos</button>
            </div>
          </div>
          {message ? <div className="dc-notice">{message}</div> : null}
          {loading ? <div className="dc-notice">Loading matches…</div> : null}
          {!loading && scoredCandidates.length === 0 ? <div className="dc-notice">No new matches right now. Ask a friend to join or reset your swipe history later.</div> : null}
          <div className="dc-stack">
            {scoredCandidates.map(({ profile: item, score }) => (
              <MatchCard key={item.id} profile={item} score={score} onLike={handleLike} onPass={handlePass} />
            ))}
          </div>
        </section>
        <AppNav />
      </main>
    </RequireAuth>
  );
}
