'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/discover', label: 'Discover' },
  { href: '/matches', label: 'Crushes' },
  { href: '/chats', label: 'Chats' },
  { href: '/settings', label: 'Settings' },
];

export default function AppNav() {
  const pathname = usePathname();

  function isActive(href) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav className="dc-bottom-nav" aria-label="App navigation">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`dc-nav-pill ${isActive(link.href) ? 'active' : ''}`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}