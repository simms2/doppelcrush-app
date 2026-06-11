'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/discover', label: 'Discover' },
  { href: '/matches', label: 'Matches' },
  { href: '/chats', label: 'Chats' },
  { href: '/settings', label: 'Settings' },
];

export default function AppNav() {
  const pathname = usePathname();
  return (
    <div className="dc-bottom-nav">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={`dc-nav-pill ${pathname === link.href ? 'active' : ''}`}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}
