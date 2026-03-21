'use client';

import { useEffect, useState } from 'react';
import { useAssignmentStore } from '@/store/useAssignmentStore';
import ZeroState from '@/components/ZeroState';
import AssignmentCard from '@/components/AssignmentCard';
import { Search, Filter, Plus, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

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
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      {assignments.length === 0 ? (
        <ZeroState />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Dashboard Header */}
          <div style={{ paddingBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="mobile-only" style={{ 
                  width: '44px', 
                  height: '44px', 
                  backgroundColor: 'white', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  border: '1px solid #F3F4F6'
                }}>
                   <ArrowLeft size={22} color="#111827" />
                </div>
                <div className="desktop-only" style={{ width: '8px', height: '8px', backgroundColor: '#34D399', borderRadius: '50%' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, color: '#0F172A' }}>Assignments</h2>
                  <p className="mobile-only" style={{ color: '#64748B', margin: 0, fontSize: '0.9rem', fontWeight: '500' }}>Manage and create assignments for your classes.</p>
                </div>
            </div>
            <p className="desktop-only" style={{ color: '#6B7280', margin: 0, fontSize: '0.85rem', fontWeight: '500', paddingLeft: '20px' }}>Manage and create assignments for your classes.</p>
          </div>

          {/* Filters Bar */}
          <div className="filter-bar-container" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: '1.25rem',
            backgroundColor: 'white',
            padding: '20px 24px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            marginBottom: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94A3B8', fontSize: '0.95rem', fontWeight: '500' }}>
              <Filter size={20} />
              <span>Filter By</span>
            </div>
            
            <div className="search-input-wrapper" style={{ flex: 1, maxWidth: '440px', minWidth: '260px', position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={20} />
              <input 
                type="text" 
                placeholder="Search Assignment" 
                style={{ 
                  backgroundColor: '#F8FAFC', 
                  borderRadius: '30px', 
                  paddingLeft: '3.5rem',
                  paddingRight: '1rem',
                  paddingTop: '0.85rem',
                  paddingBottom: '0.85rem',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.95rem',
                  width: '100%',
                  outline: 'none',
                  color: '#1E293B'
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

    </div>
  );
}
