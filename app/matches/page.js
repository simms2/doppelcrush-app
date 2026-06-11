'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import AppNav from '@/components/AppNav';
import RequireAuth from '@/components/RequireAuth';
import { getSupabaseBrowser } from '@/lib/supabase/client';

export default function MatchesPage() {
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (currentUser) => {
    const supabase = getSupabaseBrowser();
    const { data: matchRows } = await supabase
      .from('matches')
      .select('*')
      .or(`user_one.eq.${currentUser.id},user_two.eq.${currentUser.id}`)
      .order('created_at', { ascending: false });

    const otherIds = (matchRows || []).map((row) => row.user_one === currentUser.id ? row.user_two : row.user_one);

    if (!otherIds.length) {
      setMatches([]);
      setLoading(false);
      return;
    }

    const { data: profiles } = await supabase.from('profiles').select('*').in('id', otherIds);
    const profileMap = new Map((profiles || []).map((p) => [p.id, p]));
    const joined = (matchRows || []).map((row) => ({
      ...row,
      otherProfile: profileMap.get(row.user_one === currentUser.id ? row.user_two : row.user_one),
    })).filter((row) => row.otherProfile);

    setMatches(joined);
    setLoading(false);
  }, []);

  return (
    <RequireAuth onUserLoaded={(loadedUser) => { setUser(loadedUser); load(loadedUser); }}>
      <main className="dc-page-shell">
        <SiteHeader appMode />
        <section className="dc-card dc-panel">
          <div className="dc-kicker">Matches</div>
          <h2>Your people</h2>
          {loading ? <div className="dc-notice">Loading matches…</div> : null}
          {!loading && matches.length === 0 ? <div className="dc-notice">No matches yet. Your face twin might still be getting ready.</div> : null}
          <div className="dc-stack">
            {matches.map((match) => (
              <div key={match.id} className="dc-match-card">
                <img className="dc-match-photo" src={match.otherProfile.selfie_url || '/assets/user-lola.png'} alt={match.otherProfile.first_name} />
                <div className="dc-match-meta">
                  <h3>{match.otherProfile.first_name}, {match.otherProfile.age}</h3>
                  <div className="dc-badge">It’s a match</div>
                  <p className="dc-muted">{match.otherProfile.bio || 'Cute. Familiar. Elite taste.'}</p>
                </div>
                <div className="dc-action-stack">
                  <Link className="dc-btn dc-btn-primary" href={`/chats?match=${match.id}`}>Start chatting</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        <AppNav />
      </main>
    </RequireAuth>
  );
}
