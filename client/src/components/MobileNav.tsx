'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, ClipboardList, FilePlus2, Sparkles, Plus } from 'lucide-react';

const mobileNavItems = [
  { name: 'Home', icon: LayoutGrid, href: '/' },
  { name: 'Assignments', icon: ClipboardList, href: '/?tab=assignments' },
  { name: 'Library', icon: FilePlus2, href: '/library' },
  { name: 'AI Toolkit', icon: Sparkles, href: '/toolkit' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-only" style={{
      position: 'fixed',
      bottom: '12px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      height: '84px',
      backgroundColor: '#111827',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 1.25rem',
      zIndex: 1000,
      borderRadius: '40px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.24)',
      border: '1px solid rgba(255,255,255,0.08)'
    }}>
      {mobileNavItems.map((item) => {
        const isActive = pathname === item.href || (item.name === 'Home' && pathname === '/');
        return (
          <Link key={item.name} href={item.href} style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              color: isActive ? '#FFFFFF' : '#9CA3AF',
              transition: 'all 0.2s',
            }}>
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} style={{ opacity: isActive ? 1 : 0.7 }} />
              <span style={{ fontSize: '0.7rem', fontWeight: isActive ? '700' : '500' }}>{item.name}</span>
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
