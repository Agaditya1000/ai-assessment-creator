'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Book, Wrench, Plus } from 'lucide-react';

const mobileNavItems = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'My Groups', icon: Users, href: '/groups' },
  { name: 'Library', icon: Book, href: '/library' },
  { name: 'AI Toolkit', icon: Wrench, href: '/toolkit' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-only" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '72px',
      backgroundColor: '#111827',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 1rem',
      zIndex: 1000,
      borderTop: '1px solid rgba(255,255,255,0.1)',
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
    }}>
      {mobileNavItems.map((item) => {
        const isActive = pathname === item.href || (item.name === 'Home' && pathname === '/');
        return (
          <Link key={item.name} href={item.href} style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              color: isActive ? '#FFFFFF' : '#9CA3AF',
              transition: 'all 0.2s',
            }}>
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span style={{ fontSize: '0.65rem', fontWeight: isActive ? '700' : '500' }}>{item.name}</span>
            </div>
          </Link>
        );
      })}
      
      <Link href="/create" style={{ textDecoration: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '-72px',
          right: '24px',
          width: '60px',
          height: '60px',
          backgroundColor: '#FFFFFF',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          color: 'var(--primary)',
          border: '1px solid rgba(0,0,0,0.08)'
        }}>
          <Plus size={36} strokeWidth={3.5} />
        </div>
      </Link>
    </nav>
  );
}
