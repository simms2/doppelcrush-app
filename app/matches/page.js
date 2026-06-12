'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import AppNav from '@/components/AppNav';
import RequireAuth from '@/components/RequireAuth';
import { getSupabaseBrowser } from '@/lib/supabase/client';

function tidyName(name = '') {
  if (!name) return 'Someone cute';
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (currentUser) => {
    const supabase = getSupabaseBrowser();

    const { data: matchRows } = await supabase
      .from('matches')
      .select('*')
      .or(`user_one.eq.${currentUser.id},user_two.eq.${currentUser.id}`)
      .order('created_at', { ascending: false });

    const otherIds = (matchRows || []).map((row) =>
      row.user_one === currentUser.id ? row.user_two : row.user_one
    );

    if (!otherIds.length) {
      setMatches([]);
      setLoading(false);
      return;
    }

    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .in('id', otherIds);

    const profileMap = new Map((profiles || []).map((p) => [p.id, p]));

    const joined = (matchRows || [])
      .map((row) => ({
        ...row,
        otherProfile: profileMap.get(
          row.user_one === currentUser.id ? row.user_two : row.user_one
        ),
      }))
      .filter((row) => row.otherProfile);

    setMatches(joined);
    setLoading(false);
  }, []);

  return (
    <RequireAuth
      onUserLoaded={(loadedUser) => {
        load(loadedUser);
      }}
    >
      <main className="dc-page-shell">
        <SiteHeader appMode />

        <section className="dc-card dc-panel">
          <div className="dc-panel-top">
            <div>
              <div className="dc-kicker">Crushes</div>
              <h2>Your people</h2>
              <p className="dc-muted">
                The ones that made it out of Discover.
              </p>
            </div>

            {!loading && matches.length > 0 ? (
              <div className="dc-badge">
                {matches.length} {matches.length === 1 ? 'match' : 'matches'}
              </div>
            ) : null}
          </div>

          {loading ? (
            <div className="dc-notice">Checking for new crushes...</div>
          ) : null}

          {!loading && matches.length === 0 ? (
            <div className="dc-notice">
              No crushes yet. Head back to Discover and see who’s giving your energy.
              <div style={{ marginTop: 12 }}>
                <Link className="dc-btn dc-btn-primary" href="/discover">
                  Back to Discover
                </Link>
              </div>
            </div>
          ) : null}

          <div className="dc-stack">
            {matches.map((match) => {
              const person = match.otherProfile;
              const name = tidyName(person.first_name);
              const bio = person.bio || 'Cute, familiar, and definitely worth a chat.';
              const location = person.location
                ? `Based in ${person.location}`
                : 'Location coming soon';

              return (
                <div key={match.id} className="dc-match-card">
                  <img
                    className="dc-match-photo"
                    src={person.selfie_url || '/assets/user-lola.png'}
                    alt={name}
                  />

                  <div className="dc-match-meta">
                    <div className="dc-match-title-row">
                      <h3>
                        {name}
                        {person.age ? `, ${person.age}` : ''}
                      </h3>
                      <div className="dc-badge">It’s a match</div>
                    </div>

                    <p className="dc-match-vibe">{bio}</p>

                    <div className="dc-match-subrow">
                      <span className="dc-location-pill">{location}</span>
                      <span className="dc-small dc-muted">Chat unlocked</span>
                    </div>
                  </div>

                  <div className="dc-action-stack">
                    <Link className="dc-btn dc-btn-primary" href={`/chats?match=${match.id}`}>
                      Open chat
                    </Link>
                    <Link className="dc-btn dc-btn-ghost" href="/discover">
                      Keep scrolling
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <AppNav />
      </main>
    </RequireAuth>
  );
}