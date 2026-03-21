'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAssignmentStore } from '@/store/useAssignmentStore';
import { useSocket } from '@/hooks/useSocket';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Download, RefreshCcw, AlertCircle, Printer } from 'lucide-react';

export default function AssessmentOutput() {
  const { id } = useParams();
  const router = useRouter();
  const fetchAssignment = useAssignmentStore((state) => state.fetchAssignment);
  const assignment = useAssignmentStore((state) => state.currentAssignment);
  const loading = useAssignmentStore((state) => state.loading);

  useSocket();

  useEffect(() => {
    if (id) {
      fetchAssignment(id as string);
    }
  }, [id, fetchAssignment]);

  if (!assignment && loading) return <div>Loading...</div>;
  if (!assignment) return <div>Not found.</div>;

  const isCompleted = assignment.status === 'completed';
  const isProcessing = assignment.status === 'processing' || assignment.status === 'pending';

  return (
    <div className="output-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <AnimatePresence mode="wait">
        {isProcessing ? (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card"
            style={{ padding: '4rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '24px' }}
          >
            <Clock size={64} color="var(--primary)" style={{ margin: '0 auto 2rem' }} className="animate-spin" />
            <h2 style={{ fontWeight: 'bold' }}>AI is crafting your assessment...</h2>
            <p style={{ color: 'var(--text-muted)' }}>This usually takes 20-30 seconds.</p>
          </motion.div>
        ) : isCompleted ? (
          <motion.div
            key="paper-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* AI Greeting Banner */}
            <div className="no-print" style={{ 
              backgroundColor: '#374151', 
              color: 'white', 
              padding: '2rem', 
              borderRadius: '24px', 
              marginBottom: '2rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', lineHeight: '1.5', maxWidth: '85%' }}>
                Certainly! Here are customized Question Paper for your {assignment.classLevel} {assignment.subject} classes on the {assignment.topic} chapters:
              </p>
              <button 
                onClick={() => window.print()}
                style={{
                  backgroundColor: 'white',
                  color: '#111827',
                  border: 'none',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '30px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <Download size={18} /> Download as PDF
              </button>
            </div>

            {/* The Actual Question Paper */}
            <div
              className="print-paper"
              style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '4rem',
                boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
                color: '#1f2937'
              }}
            >
              {/* School Header */}
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.25rem', fontWeight: '800', margin: '0 0 0.5rem', color: '#111827' }}>
                  {assignment.schoolName || 'Delhi Public School'}
                </h1>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0 0 0.5rem', color: '#374151' }}>
                  Subject: {assignment.subject || assignment.title}
                </h2>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0, color: '#4b5563' }}>
                  Class: {assignment.classLevel || 'N/A'}
                </h3>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                <span>Time Allowed: {assignment.timeAllowed || '45 minutes'}</span>
                <span>Maximum Marks: {assignment.totalMarks}</span>
              </div>

              <p style={{ fontWeight: 'bold', marginBottom: '2.5rem' }}>All questions are compulsory unless stated otherwise.</p>

              {/* Student Info Lines */}
              <div style={{ marginBottom: '4rem', display: 'grid', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <span style={{ fontWeight: 'bold' }}>Name:</span> 
                  <div style={{ flex: 1, borderBottom: '1px solid #000', height: '1.2rem' }}></div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <span style={{ fontWeight: 'bold' }}>Roll Number:</span> 
                  <div style={{ width: '200px', borderBottom: '1px solid #000', height: '1.2rem' }}></div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <span style={{ fontWeight: 'bold' }}>Class: {assignment.classLevel} Section:</span> 
                  <div style={{ width: '200px', borderBottom: '1px solid #000', height: '1.2rem' }}></div>
                </div>
              </div>

              {/* Sections */}
              {assignment.sections.map((section, sIdx) => (
                <div key={sIdx} style={{ marginBottom: '4rem' }}>
                  <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>{section.title}</h2>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{section.questions[0]?.type || 'Description'}</h3>
                    <p style={{ fontStyle: 'italic', margin: '0.5rem 0' }}>{section.instruction}</p>
                  </div>

                  <div style={{ display: 'grid', gap: '2rem' }}>
                    {section.questions.map((q, qIdx) => (
                      <div key={qIdx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <span style={{ fontWeight: '600', minWidth: '25px' }}>{qIdx + 1}.</span>
                        <p style={{ margin: 0, lineHeight: '1.6', fontSize: '1.1rem', flex: 1 }}>
                          <span style={{ fontWeight: 'bold', color: '#6b7280', marginRight: '0.5rem' }}>
                            [{q.difficulty === 'hard' ? 'Challenging' : q.difficulty === 'medium' ? 'Moderate' : 'Easy'}]
                          </span>
                          {q.text} 
                          <span style={{ fontWeight: 'bold', marginLeft: '0.5rem' }}>[{q.marks} Marks]</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <p style={{ fontWeight: 'bold', marginTop: '4rem' }}>End of Question Paper</p>

              {/* Answer Key */}
              <div style={{ marginTop: '6rem', pageBreakBefore: 'always' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '2rem' }}>Answer Key:</h2>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {assignment.sections.flatMap(s => s.questions).map((q, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                      <span style={{ fontWeight: 'bold' }}>{idx + 1}.</span>
                      <p style={{ margin: 0, color: '#4b5563', lineHeight: '1.6' }}>
                        {q.correctAnswer || 'Answer placeholder...'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
