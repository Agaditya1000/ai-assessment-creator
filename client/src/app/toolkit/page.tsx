'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Book, Layout, ArrowRight } from 'lucide-react';

const tools = [
  {
    id: 'assessment-creator',
    name: 'AI Assessment Creator',
    description: 'Generate high-quality question papers and assessments in seconds using AI. Supports multiple formats and difficulty levels.',
    icon: FileText,
    color: '#f26440',
    href: '/create',
    status: 'Ready'
  },
  {
    id: 'lesson-planner',
    name: 'AI Lesson Planner',
    description: 'Create comprehensive lesson plans with learning objectives, activities, and resources tailored to your curriculum.',
    icon: Book,
    color: '#3b82f6',
    href: '#',
    status: 'Coming Soon'
  },
  {
    id: 'rubric-generator',
    name: 'AI Rubric Generator',
    description: 'Design clear and consistent grading rubrics for any assignment or project with custom criteria.',
    icon: Layout,
    color: '#10b981',
    href: '#',
    status: 'Coming Soon'
  }
];

export default function Toolkit() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '4rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
           <Sparkles size={24} color="var(--primary)" />
           <span style={{ fontWeight: '700', color: 'var(--primary)', letterSpacing: '0.05em', fontSize: '0.8rem', textTransform: 'upper' }}>
             AI TEACHER'S TOOLKIT
           </span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: '#111827' }}>
          Empower Your Teaching with AI
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
          Select a tool below to start generating high-quality educational content for your students in minutes.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {tools.map((tool, idx) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass-card"
            style={{ 
              padding: '2rem', 
              backgroundColor: 'white', 
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {tool.status === 'Coming Soon' && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: '#f3f4f6',
                color: '#6b7280',
                fontSize: '0.7rem',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '20px',
                border: '1px solid #e5e7eb'
              }}>
                {tool.status}
              </div>
            )}

            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '16px', 
              backgroundColor: `${tool.color}15`, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '1.5rem',
              color: tool.color
            }}>
              <tool.icon size={28} />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>
              {tool.name}
            </h3>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem', flex: 1 }}>
              {tool.description}
            </p>

            {tool.status === 'Ready' ? (
              <Link href={tool.href} style={{ textDecoration: 'none' }}>
                <button style={{
                  width: '100%',
                  padding: '0.85rem',
                  backgroundColor: '#111827',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}>
                  Open Tool <ArrowRight size={18} />
                </button>
              </Link>
            ) : (
              <button disabled style={{
                width: '100%',
                padding: '0.85rem',
                backgroundColor: '#f3f4f6',
                color: '#9ca3af',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'not-allowed'
              }}>
                Coming Soon
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
