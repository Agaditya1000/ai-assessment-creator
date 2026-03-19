'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, FileText, Wrench, Book, Settings, Plus, Sparkles } from 'lucide-react';

const navItems = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'My Groups', icon: Users, href: '/groups' },
  { name: 'Assignments', icon: FileText, href: '/', badge: 0 },
  { name: 'AI Teacher\'s Toolkit', icon: Wrench, href: '/toolkit' },
  { name: 'My Library', icon: Book, href: '/library' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      height: 'var(--sidebar-height)',
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'fixed',
      left: 'var(--sidebar-left)',
      top: 'var(--sidebar-top)',
      padding: '24px',
      zIndex: 100,
      boxShadow: 'var(--realistic-shadow)',
      border: 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'linear-gradient(180deg, rgba(229, 104, 32, 1) 0%, rgba(212, 94, 62, 1) 100%)',
          borderRadius: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '900',
          fontSize: '1.4rem',
          boxShadow: '0 4px 12px rgba(229, 104, 32, 0.2)'
        }}>V</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, color: '#111827', letterSpacing: '-0.02em' }}>VedaAI</h1>
      </div>

      {/* Action Button */}
      <div style={{ marginBottom: '2.5rem' }}>
        <Link href="/create" style={{ textDecoration: 'none' }}>
          <button style={{
            width: '100%',
            padding: '0.85rem',
            backgroundColor: '#111827',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(17, 24, 39, 0.2)'
          }}>
            <Plus size={20} /> Create Assignment
          </button>
        </Link>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.name === 'Assignments' && (pathname === '/' || pathname.includes('output')));
          return (
            <Link key={item.name} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                marginBottom: '0.25rem',
                backgroundColor: isActive ? '#F3F4F6' : 'transparent',
                color: isActive ? '#111827' : '#6B7280',
                fontWeight: isActive ? '700' : '500',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <item.icon size={20} style={{ opacity: isActive ? 1 : 0.7 }} />
                  <span>{item.name}</span>
                </div>
                {item.name === 'Assignments' && (
                  <span style={{
                    backgroundColor: '#F3F4F6',
                    color: '#6B7280',
                    fontSize: '0.75rem',
                    padding: '2px 10px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontWeight: 'bold'
                  }}>0</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile */}
      <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', color: '#6B7280', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}>
          <Settings size={20} />
          <span>Settings</span>
        </div>
        <div style={{
          padding: '0.85rem',
          backgroundColor: '#F9FAFB',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          border: '1px solid #F3F4F6'
        }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#FFE4DE', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=School" alt="school" style={{ width: '100%', height: '100%' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontWeight: '700', fontSize: '0.85rem', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Your Institution</p>
            <p style={{ margin: 0, fontSize: '0.7rem', color: '#6B7280', fontWeight: '500' }}>Location</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
