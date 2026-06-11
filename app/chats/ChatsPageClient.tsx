'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import AppNav from '@/components/AppNav';
import RequireAuth from '@/components/RequireAuth';
import { getSupabaseBrowser } from '@/lib/supabase/client';

export default function ChatsPageClient() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [selectedMatchId, setSelectedMatchId] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const matchFromUrl = searchParams.get('match') || '';
    if (matchFromUrl) {
      setSelectedMatchId(matchFromUrl);
    }
  }, [searchParams]);

  const loadMatches = useCallback(
    async (currentUser: any) => {
      const supabase = getSupabaseBrowser();

      const { data: matchRows } = await supabase
        .from('matches')
        .select('*')
        .or(`user_one.eq.${currentUser.id},user_two.eq.${currentUser.id}`)
        .order('created_at', { ascending: false });

      const ids = (matchRows || []).map((row: any) =>
        row.user_one === currentUser.id ? row.user_two : row.user_one
      );

      const { data: profiles } = ids.length
        ? await supabase.from('profiles').select('*').in('id', ids)
        : { data: [] };

      const profileMap = new Map((profiles || []).map((p: any) => [p.id, p]));

      const joined = (matchRows || [])
        .map((row: any) => ({
          ...row,
          otherProfile: profileMap.get(
            row.user_one === currentUser.id ? row.user_two : row.user_one
          ),
        }))
        .filter((row: any) => row.otherProfile);

      setMatches(joined);

      if (!selectedMatchId && joined[0]) {
        setSelectedMatchId(joined[0].id);
      }
    },
    [selectedMatchId]
  );

  const selectedMatch = useMemo(
    () => matches.find((m: any) => m.id === selectedMatchId),
    [matches, selectedMatchId]
  );

  useEffect(() => {
    if (!selectedMatchId) return;

    const supabase = getSupabaseBrowser();

    supabase
      .from('messages')
      .select('*')
      .eq('match_id', selectedMatchId)
      .order('created_at', { ascending: true })
      .then(({ data }) => setMessages(data || []));
  }, [selectedMatchId]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedMatchId || !user || !text.trim()) return;

    const supabase = getSupabaseBrowser();
    const payload = {
      match_id: selectedMatchId,
      sender_id: user.id,
      body: text.trim(),
    };

    const { error } = await supabase.from('messages').insert(payload);

    if (!error) {
      setMessages((prev) => [...prev, payload]);
      setText('');
    }
  }

  return (
    <RequireAuth
      onUserLoaded={(loadedUser: any) => {
        setUser(loadedUser);
        loadMatches(loadedUser);
      }}
    >
      <main className="dc-page-shell">
        <SiteHeader appMode />

        <div className="dc-chat-layout">
          <section className="dc-card dc-panel">
            <div className="dc-kicker">Chats</div>
            <h2>Conversations</h2>

            <div className="dc-stack">
              {!matches.length ? (
                <div className="dc-notice">
                  When it’s a match, your chats show up here.
                </div>
              ) : null}

              {matches.map((match: any) => (
                <button
                  key={match.id}
                  className={`dc-chat-row ${
                    selectedMatchId === match.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedMatchId(match.id)}
                >
                  <img
                    src={match.otherProfile.selfie_url || '/assets/user-lola.png'}
                    alt={match.otherProfile.first_name}
                  />
                  <div>
                    <strong>{match.otherProfile.first_name}</strong>
                    <div className="dc-muted">Tap to open chat</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="dc-card dc-panel">
            {!selectedMatch ? (
              <div className="dc-notice">Pick a match to start chatting.</div>
            ) : (
              <>
                <div className="dc-panel-top">
                  <div>
                    <div className="dc-kicker">Chatting with</div>
                    <h2>{selectedMatch.otherProfile.first_name}</h2>
                  </div>
                </div>

                <div className="dc-chat-thread">
                  {!messages.length ? (
                    <>
                      <div className="dc-msg them">
                        Okay be honest… do we actually look alike?
                      </div>
                      <div className="dc-msg me">
                        This match is dangerously familiar.
                      </div>
                    </>
                  ) : (
                    messages.map((msg: any, index: number) => (
                      <div
                        key={`${msg.created_at || index}-${index}`}
                        className={`dc-msg ${
                          msg.sender_id === user?.id ? 'me' : 'them'
                        }`}
                      >
                        {msg.body}
                      </div>
                    ))
                  )}
                </div>

                <form className="dc-composer" onSubmit={sendMessage}>
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type your message"
                  />
                  <button className="dc-btn dc-btn-primary">Send</button>
                </form>
              </>
            )}
          </section>
        </div>

        <AppNav />
      </main>
    </RequireAuth>
  );
}