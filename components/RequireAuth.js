'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowser } from '@/lib/supabase/client';

export default function RequireAuth({ children, onUserLoaded = null }) {
  const router = useRouter();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let mounted = true;
    const supabase = getSupabaseBrowser();

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      if (!data?.user) {
        router.replace('/login');
        return;
      }
      if (onUserLoaded) onUserLoaded(data.user);
      setStatus('ready');
    });

    return () => {
      mounted = false;
    };
  }, [router, onUserLoaded]);

  if (status !== 'ready') {
    return (
      <div className="dc-page-shell">
        <div className="dc-card dc-panel center-panel">
          <div className="dc-kicker">Loading</div>
          <h2>Opening DoppelCrush…</h2>
          <p className="dc-muted">Hang tight while we check your session.</p>
        </div>
      </div>
    );
  }

  return children;
}
