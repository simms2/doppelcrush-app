'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import AppNav from '@/components/AppNav';
import RequireAuth from '@/components/RequireAuth';
import { getSupabaseBrowser } from '@/lib/supabase/client';

function tidyName(name: string = '') {
  if (!name) return 'Someone cute';
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const starterPrompts = [
  'Okay be honest… do we actually look alike?',
  'This match is dangerously familiar.',
  'You’re kind of giving my face card in another font.',
  'Twin energy or chaos energy?',
];

export default function ChatsPageClient() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [selectedMatchId, setSelectedMatchId] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    const matchFromUrl = searchParams.get('match') || '';
    if (matchFromUrl) {
      setSelectedMatchId(matchFromUrl);
    }
  }, [searchParams]);

  const loadMatches = useCallback(
    async (currentUser: any) => {
      setLoadingMatches(true);
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

      setLoadingMatches(false);
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
    setLoadingMessages(true);

    supabase
      .from('messages')
      .select('*')
      .eq('match_id', selectedMatchId)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        setMessages(data || []);
        setLoadingMessages(false);
      });
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

  function useStarterPrompt(prompt: string) {
    setText(prompt);
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
            <div className="dc-panel-top">
              <div>
                <div className="dc-kicker">Chats</div>
                <h2>Crush chats</h2>
                <p className="dc-muted">
                  The fun starts once someone makes it out of Discover.
                </p>
              </div>

              {!loadingMatches && matches.length > 0 ? (
                <div className="dc-badge">
                  {matches.length} {matches.length === 1 ? 'chat' : 'chats'}
                </div>
              ) : null}
            </div>

            <div className="dc-stack">
              {loadingMatches ? (
                <div className="dc-notice">Loading your chats...</div>
              ) : null}

              {!loadingMatches && !matches.length ? (
                <div className="dc-notice">
                  No chats yet. Go find someone cute first.
                  <div style={{ marginTop: 12 }}>
                    <Link className="dc-btn dc-btn-primary" href="/discover">
                      Back to Discover
                    </Link>
                  </div>
                </div>
              ) : null}

              {matches.map((match: any) => {
                const name = tidyName(match.otherProfile.first_name);
                const snippet =
                  selectedMatchId === match.id
                    ? 'You’re in this chat now'
                    : 'Tap to open chat';

                return (
                  <button
                    key={match.id}
                    className={`dc-chat-row ${selectedMatchId === match.id ? 'active' : ''}`}
                    onClick={() => setSelectedMatchId(match.id)}
                  >
                    <img
                      src={match.otherProfile.selfie_url || '/assets/user-lola.png'}
                      alt={name}
                    />
                    <div>
                      <strong>{name}</strong>
                      <div className="dc-muted">{snippet}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="dc-card dc-panel">
            {!selectedMatch ? (
              <div className="dc-notice">
                Pick a crush to start chatting.
              </div>
            ) : (
              <>
                <div className="dc-panel-top">
                  <div>
                    <div className="dc-kicker">Chatting with</div>
                    <h2>{tidyName(selectedMatch.otherProfile.first_name)}</h2>
                    <p className="dc-muted">
                      {selectedMatch.otherProfile.location
                        ? `Based in ${selectedMatch.otherProfile.location}`
                        : 'Location coming soon'}
                    </p>
                  </div>

                  <div className="dc-badge">
                    It’s a match
                  </div>
                </div>

                <div className="dc-chat-thread">
                  {loadingMessages ? (
                    <div className="dc-notice">Loading messages...</div>
                  ) : null}

                  {!loadingMessages && !messages.length ? (
                    <>
                      <div className="dc-notice">
                        Fresh chat. Break the ice.
                      </div>

                      <div className="dc-button-row" style={{ flexWrap: 'wrap', marginTop: 6 }}>
                        {starterPrompts.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            className="dc-btn dc-btn-light"
                            onClick={() => useStarterPrompt(prompt)}
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : null}

                  {!loadingMessages &&
                    messages.map((msg: any, index: number) => (
                      <div
                        key={`${msg.created_at || index}-${index}`}
                        className={`dc-msg ${msg.sender_id === user?.id ? 'me' : 'them'}`}
                      >
                        {msg.body}
                      </div>
                    ))}
                </div>

                <form className="dc-composer" onSubmit={sendMessage}>
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Say something cute..."
                  />
                  <button className="dc-btn dc-btn-primary">
                    Send
                  </button>
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