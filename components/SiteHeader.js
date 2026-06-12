'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getSupabaseBrowser } from '@/lib/supabase/client';

const publicLinks = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/safety', label: 'Safety' },
  { href: '/faq', label: 'FAQ' },
];

const appLinks = [
  { href: '/discover', label: 'Discover' },
  { href: '/matches', label: 'Crushes' },
  { href: '/chats', label: 'Chats' },
  { href: '/settings', label: 'Settings' },
];

export default function SiteHeader({ appMode = false }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = getSupabaseBrowser();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  const links = appMode ? appLinks : publicLinks;

  function isActive(href) {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className={`dc-browser-bar ${appMode ? 'app-mode' : ''}`}>
      <Link href="/" className="dc-brand-link">
        <img className="dc-logo" src="/assets/logo-badge.svg" alt="DoppelCrush logo" />
        <div className="dc-brand-copy">
          <div className="dc-brand-row">
            <h1>DoppelCrush</h1>
            {appMode ? <span className="dc-live-pill">Live</span> : null}
          </div>
          <p>Because clearly you have good taste.</p>
        </div>
      </Link>

      <nav className={`dc-top-links ${appMode ? 'app' : 'public'}`}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`dc-top-link ${isActive(link.href) ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="dc-header-actions">
        {appMode ? (
          <button className="dc-btn dc-btn-ghost dc-btn-quiet" onClick={signOut}>
            Log out
          </button>
        ) : (
          <>
            <Link className="dc-btn dc-btn-ghost" href="/login">
              Log in
            </Link>
            <Link className="dc-btn dc-btn-dark" href="/signup">
              Start matching
            </Link>
          </>
        )}
      </div>
    </header>
  );
}