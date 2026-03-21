import { useState, useRef, useEffect } from 'react';
import { MoreVertical, MoreHorizontal, Trash2, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAssignmentStore } from '@/store/useAssignmentStore';

interface AssignmentCardProps {
  id: string;
  title: string;
  assignedOn: string;
  dueDate: string;
}

export default function AssignmentCard({ id, title, assignedOn, dueDate }: AssignmentCardProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { deleteAssignment } = useAssignmentStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this assignment?')) {
      await deleteAssignment(id);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: 'var(--realistic-shadow)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative',
        border: '1px solid #F3F4F6',
        minWidth: 0,
        zIndex: showDropdown ? 50 : 1,
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 10 }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: '#111827', lineHeight: '1.4' }}>{title}</h3>
        <div ref={dropdownRef}>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: '#6B7280', 
              padding: '4px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <MoreVertical size={20} />
          </button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  padding: '8px',
                  minWidth: '160px',
                  zIndex: 100,
                  border: '1px solid #F3F4F6'
                }}
              >
                <Link href={`/output/${id}`} style={{ textDecoration: 'none' }} onClick={(e) => e.stopPropagation()}>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: '#374151',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <Eye size={18} />
                    View Assignment
                  </div>
                </Link>
                <div 
                  onClick={handleDelete}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: '#EF4444',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'background-color 0.2s',
                    marginTop: '2px'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Trash2 size={18} />
                  Delete
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '12px', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: 'auto',
        fontSize: '0.75rem'
      }}>
        <p style={{ margin: 0, color: '#6B7280', fontWeight: '500', display: 'flex', gap: '4px' }}>
          <span style={{ fontWeight: '700' }}>Assigned on:</span> 
          <span>{new Date(assignedOn).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')}</span>
        </p>
        <p style={{ margin: 0, color: '#111827', fontWeight: '700', display: 'flex', gap: '4px' }}>
          <span>Due:</span> 
          <span>{new Date(dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')}</span>
        </p>
      </div>

      {!showDropdown && (
        <Link href={`/output/${id}`} style={{ position: 'absolute', inset: 0, zIndex: 1 }} aria-label={`View ${title}`} />
      )}
    </motion.div>
  );
}
