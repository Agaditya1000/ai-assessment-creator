'use client';

import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ZeroState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 'var(--main-width)',
        height: 'var(--main-height)',
        minHeight: '400px',
        textAlign: 'center',
        margin: '0 auto',
        padding: '24px'
      }}
    >
      <div style={{ position: 'relative', marginBottom: '2rem', width: '280px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Background Sketch Elements */}
        <svg width="280" height="240" viewBox="0 0 280 240" fill="none" style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
          <circle cx="140" cy="120" r="100" fill="#F3F4F6" />
          <path d="M40 60 Q 60 40 80 60" stroke="#94A3B8" strokeWidth="2" fill="none" />
          <path d="M220 180 Q 240 200 260 180" stroke="#94A3B8" strokeWidth="2" fill="none" />
          <circle cx="210" cy="50" r="4" fill="#6366F1" opacity="0.4" />
          <circle cx="70" cy="190" r="3" fill="#F59E0B" opacity="0.4" />
        </svg>

        {/* Magnifying Glass */}
        <div style={{ position: 'relative', transform: 'rotate(-5deg)' }}>
           <div style={{ 
             width: '100px', 
             height: '100px', 
             border: '12px solid #E5E7EB', 
             borderRadius: '50%', 
             backgroundColor: 'white',
             boxShadow: '0 8px 16px rgba(0,0,0,0.05)'
           }}></div>
           <div style={{ 
             position: 'absolute', 
             bottom: '-15px', 
             right: '-15px', 
             width: '12px', 
             height: '50px', 
             backgroundColor: '#E5E7EB', 
             borderRadius: '6px', 
             transform: 'rotate(-45deg)', 
             transformOrigin: 'top center' 
           }}></div>
           
           {/* Bold Red X */}
           <div style={{
             position: 'absolute',
             top: '50%',
             left: '50%',
             transform: 'translate(-50%, -50%)',
             color: '#EF4444',
             fontSize: '4rem',
             lineHeight: 1,
             fontWeight: '900',
             fontFamily: 'system-ui'
           }}>✕</div>
        </div>
      </div>

      <h2 style={{ 
        fontSize: 'clamp(1.2rem, 5vw, 1.5rem)', 
        fontWeight: '800', 
        marginBottom: '0.75rem', 
        color: '#111827' 
      }}>No assignments yet</h2>
      <p style={{ 
        color: '#6b7280', 
        lineHeight: '1.5', 
        marginBottom: '2.5rem', 
        fontSize: 'clamp(0.85rem, 3vw, 0.95rem)',
        maxWidth: '400px'
      }}>
        Create your first assignment to start collecting and grading student submissions. 
        You can set up rubrics, define marking criteria, and let AI assist with grading.
      </p>

      <Link href="/create" style={{ textDecoration: 'none' }} className="desktop-only">
        <button style={{
          padding: '0.85rem 2rem',
          backgroundColor: '#111827',
          color: 'white',
          border: 'none',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontWeight: '600',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          <Plus size={20} /> Create Your First Assignment
        </button>
      </Link>

      <div className="mobile-only">
        <Link href="/create" style={{ textDecoration: 'none' }}>
           <button style={{
             padding: '1rem 2.5rem',
             backgroundColor: '#111827',
             color: 'white',
             border: 'none',
             borderRadius: '30px',
             fontWeight: '700',
             fontSize: '1rem',
             display: 'flex',
             alignItems: 'center',
             gap: '0.5rem',
             boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
           }}>
             <Plus size={20} /> Create Your First Assignment
           </button>
        </Link>
      </div>
    </motion.div>
  );
}
