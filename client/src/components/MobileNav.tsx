'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Book, Sparkles } from 'lucide-react';

const mobileItems = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'My Groups', icon: Users, href: '/groups' },
  { name: 'Library', icon: Book, href: '/library' },
  { name: 'AI Toolkit', icon: Sparkles, href: '/toolkit' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="mobile-only" style={{
      position: 'fixed',
      bottom: '1.5rem',
      left: '1rem',
      right: '1rem',
      backgroundColor: '#111827',
      borderRadius: '24px',
      padding: '0.75rem 1rem',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 1000,
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
    }}>
      {mobileItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.name} href={item.href} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            color: isActive ? 'white' : '#9ca3af',
            transition: 'color 0.2s',
            flex: 1
          }}>
            <item.icon size={26} />
            <span style={{ fontSize: '0.75rem', fontWeight: isActive ? '700' : '500' }}>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
