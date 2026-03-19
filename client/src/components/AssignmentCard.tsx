'use client';

import { MoreVertical, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface AssignmentCardProps {
  id: string;
  title: string;
  assignedOn: string;
  dueDate: string;
}

export default function AssignmentCard({ id, title, assignedOn, dueDate }: AssignmentCardProps) {
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
        border: 'none',
        minWidth: 0
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: '#111827', lineHeight: '1.4' }}>{title}</h3>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: '4px' }}>
          <MoreVertical size={20} />
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#6B7280', fontWeight: '500' }}>
          <span style={{ fontWeight: '700' }}>Assigned on :</span> {new Date(assignedOn).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')}
        </p>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#111827', fontWeight: '700' }}>
          Due : {new Date(dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')}
        </p>
      </div>

      <Link href={`/output/${id}`} style={{ position: 'absolute', inset: 0 }} aria-label={`View ${title}`} />
    </motion.div>
  );
}
