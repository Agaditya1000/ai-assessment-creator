'use client';

import { Bell, ChevronDown, MoveLeft, Grid, Menu } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'Assignment' }: HeaderProps) {
  return (
    <header className="header-container" style={{
      padding: '1rem',
      position: 'sticky',
      top: 0,
      zIndex: 900
    }}>
      <div className="header-content" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '0 12px 0 24px',
        boxShadow: 'var(--realistic-shadow)',
        width: 'var(--header-width)',
        height: 'var(--header-height)',
        position: 'fixed',
        left: 'var(--header-left)',
        right: '12px',
        top: 'var(--header-top)'
      }}>
        {/* Mobile: Logo | Desktop: Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
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
               fontSize: '1.1rem',
               boxShadow: '0 4px 12px rgba(229, 104, 32, 0.2)'
             }}>V</div>
             <span style={{ fontWeight: '800', fontSize: '1.2rem', color: '#111827' }}>VedaAI</span>
          </div>

          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#6B7280' }}>
              <MoveLeft size={20} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#D1D5DB' }}>
              <Grid size={18} />
              <span style={{ fontWeight: '600', color: '#111827', fontSize: '0.95rem' }}>{title}</span>
            </div>
          </div>
        </div>

        {/* User Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <Bell size={20} color="#111827" />
            <div style={{ position: 'absolute', top: -1, right: -1, width: '8px', height: '8px', backgroundColor: '#F14922', borderRadius: '50%', border: '2px solid white' }}></div>
          </div>

          <div className="desktop-only" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.4rem 0.75rem',
            borderRadius: '30px',
            border: '1px solid #F3F4F6',
            backgroundColor: '#FFFFFF',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden' }}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="user" />
            </div>
            <span style={{ fontWeight: '600', fontSize: '0.85rem', color: '#111827' }}>User</span>
            <ChevronDown size={14} color="#6B7280" />
          </div>

          <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden' }}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" alt="user" />
            </div>
            <Menu size={24} color="#111827" style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </div>
    </header>
  );
}
