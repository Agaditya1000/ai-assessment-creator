'use client';

import { useEffect, useState } from 'react';
import { useAssignmentStore } from '@/store/useAssignmentStore';
import ZeroState from '@/components/ZeroState';
import AssignmentCard from '@/components/AssignmentCard';
import { Search, Filter, Plus, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function Dashboard() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(`${API_URL}/assignments/all`); // I'll need to implement this endpoint
        setAssignments(res.data);
      } catch (err) {
        console.error('Failed to fetch assignments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ 
      padding: 'var(--main-left === "12px" ? "18px 20px" : "0")',
      maxWidth: 'var(--main-width)',
      margin: '0 auto'
    }}>
      {assignments.length === 0 ? (
        <ZeroState />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Dashboard Header */}
          <div style={{ paddingBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="mobile-only" style={{ 
                  width: '32px', 
                  height: '32px', 
                  backgroundColor: 'white', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  cursor: 'pointer'
                }}>
                   <ArrowLeft size={18} color="#111827" />
                </div>
                <div className="desktop-only" style={{ width: '8px', height: '8px', backgroundColor: '#34D399', borderRadius: '50%' }}></div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, color: '#111827' }}>Assignments</h2>
            </div>
            <p style={{ color: '#6B7280', margin: 0, fontSize: '0.85rem', fontWeight: '500', paddingLeft: 'var(--main-left === "12px" ? "0" : "20px")' }}>Manage and create assignments for your classes.</p>
          </div>

          {/* Filters Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#6B7280', fontSize: '0.85rem', fontWeight: '600' }}>
              <Filter size={16} />
              <span>Filter By</span>
            </div>
            
            <div style={{ flex: 1, maxWidth: '400px', minWidth: '250px', position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} size={16} />
              <input 
                type="text" 
                placeholder="Search Assignment" 
                className="input-field" 
                style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '30px', 
                  paddingLeft: '2.75rem',
                  borderColor: '#E5E7EB',
                  fontSize: '0.85rem'
                }} 
              />
            </div>
          </div>

          {/* Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '12px',
            paddingBottom: '8rem' 
          }}>
            {assignments.map((asgn) => (
              <AssignmentCard 
                key={asgn._id}
                id={asgn._id}
                title={asgn.title}
                assignedOn={asgn.createdAt}
                dueDate={asgn.dueDate}
              />
            ))}
          </div>

          {/* Desktop Floating Action Button (Center bottom) */}
          <div className="desktop-only" style={{
            position: 'fixed',
            bottom: '2rem',
            left: 'calc(var(--sidebar-width) / 2 + 50%)',
            transform: 'translateX(-50%)',
            zIndex: 100
          }}>
            <Link href="/create" style={{ textDecoration: 'none' }}>
              <button style={{
                backgroundColor: '#111827',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}>
                <Plus size={20} /> Create Assignment
              </button>
            </Link>
          </div>

        </div>
      )}

      {/* Shared Mobile Floating Action Button (Bottom right) */}
      <div className="mobile-only" style={{
        position: 'fixed',
        bottom: '5.5rem',
        right: '1.25rem',
        zIndex: 1000
      }}>
        <Link href="/create">
           <button style={{
             width: '56px',
             height: '56px',
             borderRadius: '50%',
             backgroundColor: 'white',
             color: 'var(--primary)',
             border: 'none',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
             cursor: 'pointer'
           }}>
             <Plus size={32} strokeWidth={3} />
           </button>
        </Link>
      </div>
    </div>
  );
}
