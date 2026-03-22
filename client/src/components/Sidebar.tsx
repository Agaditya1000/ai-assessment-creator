'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Home, Users, FileText, Wrench, FilePlus2, Settings, Plus, X, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { useAssignmentStore } from '@/store/useAssignmentStore';
import { useUIStore } from '@/store/useUIStore';

const navItems = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'My Groups', icon: Users, href: '/groups' },
  { name: 'Assignments', icon: FileText, href: '/?tab=assignments', badge: 0 },
  { name: 'AI Teacher\'s Toolkit', icon: Wrench, href: '/toolkit' },
  { name: 'My Library', icon: FilePlus2, href: '/?tab=library' },
];

export default function Sidebar() {
  return (
    <Suspense fallback={<div className="sidebar-container" style={{ width: 'var(--sidebar-width)', height: '100vh', backgroundColor: '#FFFFFF' }} />}>
      <SidebarContent />
    </Suspense>
  );
}

function SidebarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab');
  const { isSidebarCollapsed, isMobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const { assignments, fetchAssignments } = useAssignmentStore();

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-only"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      <aside 
        className={`sidebar-container ${isMobileMenuOpen ? 'mobile-open' : ''}`}
        style={{
          width: 'var(--sidebar-width)',
          height: 'var(--sidebar-height)',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: isSidebarCollapsed ? '1.5rem 0.75rem 2.5rem' : '1.5rem 1.5rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          left: 'var(--sidebar-left)',
          top: 'var(--sidebar-top)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        {/* Mobile Close Button */}
        <button 
          className="mobile-only"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#6B7280'
          }}
        >
          <X size={24} />
        </button>

        {/* Logo Section */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          marginBottom: '2rem',
          paddingLeft: isSidebarCollapsed ? '0.35rem' : '0'
        }}>
          {/* Mobile Logo: Stylized "V" */}
          <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'var(--logo-bg)', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'white', 
              fontWeight: '900', 
              fontSize: '1.2rem',
              flexShrink: 0
            }}>V</div>
            {!isSidebarCollapsed && (
              <span style={{ fontWeight: '800', fontSize: '1.25rem', color: '#111827' }}>VedaAI</span>
            )}
          </div>

          {/* Desktop Logo: Image from src/images/desktop logo.jpeg */}
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
            <img 
              src="/desktop-logo.jpeg" 
              alt="VedaAI" 
              style={{ 
                width: isSidebarCollapsed ? '40px' : '40px', 
                height: isSidebarCollapsed ? '40px' : '40px', 
                objectFit: 'contain',
                flexShrink: 0
              }} 
            />
            {!isSidebarCollapsed && (
              <span style={{ fontWeight: '800', fontSize: '1.25rem', color: '#111827', whiteSpace: 'nowrap' }}>VedaAI</span>
            )}
          </div>
        </div>

      {/* Action Button */}
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}>
        <Link href="/create" style={{ textDecoration: 'none', width: '100%' }}>
          <button style={{
            width: '100%',
            height: '48px',
            padding: isSidebarCollapsed ? '0' : '0.85rem',
            backgroundColor: '#111827',
            color: 'white',
            border: '2px solid #f26440',
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isSidebarCollapsed ? '0' : '0.75rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 8px 16px rgba(242, 100, 64, 0.25)',
            transition: 'all 0.3s ease'
          }}>
            <Sparkles size={18} fill="white" /> 
            {!isSidebarCollapsed && <span style={{ whiteSpace: 'nowrap' }}>Create Assignment</span>}
          </button>
        </Link>
      </div>

      {/* Nav Items */}
      <nav style={{ 
        flex: 1, 
        overflowY: 'auto', 
        paddingRight: '4px',
        marginBottom: '1rem',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}>
        <style>{`
          nav::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {navItems.map((item) => {
          let isActive = pathname === item.href;
          
          // Handle tab-based active states for home-pointing links
          if (pathname === '/') {
            const itemTab = item.href.includes('tab=') ? item.href.split('tab=')[1] : null;
            if (!currentTab) {
              isActive = item.name === 'Home';
            } else {
              isActive = currentTab === itemTab;
            }
          } else if (item.name === 'Assignments' && pathname.includes('output')) {
            isActive = true; // Still show Assignments as active when viewing a specific assessment
          }

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
                  {!isSidebarCollapsed && <span style={{ whiteSpace: 'nowrap' }}>{item.name}</span>}
                </div>
                {['Assignments', 'My Library'].includes(item.name) && (
                  <span style={{
                    backgroundColor: '#f26440',
                    color: 'white',
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontWeight: '800',
                    boxShadow: '0 2px 6px rgba(242, 100, 64, 0.3)'
                  }}>{assignments.length}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile */}
      <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', color: '#6B7280', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', justifyContent: isSidebarCollapsed ? 'center' : 'flex-start' }}>
          <Settings size={20} />
          {!isSidebarCollapsed && <span style={{ whiteSpace: 'nowrap' }}>Settings</span>}
        </div>
        <div style={{
          padding: isSidebarCollapsed ? '0.65rem' : '1rem',
          backgroundColor: '#F3F4F6',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: isSidebarCollapsed ? '0' : '0.85rem',
          border: '1px solid #E5E7EB',
          justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            minWidth: '40px', 
            borderRadius: '10px', 
            backgroundColor: '#FFE4DE', 
            overflow: 'hidden', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <img src={isMobileMenuOpen ? "/mobile-avatar.jpg" : "/avatar.jpg"} alt="school" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {!isSidebarCollapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontWeight: '700', fontSize: '0.85rem', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Delhi Public School</p>
              <p style={{ margin: 0, fontSize: '0.7rem', color: '#6B7280', fontWeight: '500' }}>Bokaro Steel City</p>
            </div>
          )}
        </div>
      </div>
      </aside>
    </>
  );
}
