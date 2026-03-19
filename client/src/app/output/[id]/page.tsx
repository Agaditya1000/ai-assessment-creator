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
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Top Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isProcessing && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 'bold' }}><Clock className="animate-spin" size={20} /> Generating...</div>}
          {isCompleted && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22c55e', fontWeight: 'bold' }}><CheckCircle size={20} /> Generated Successfully</div>}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-primary" style={{ backgroundColor: '#111827', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', borderRadius: '8px' }}>
            <Download size={18} /> Download as PDF
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isProcessing ? (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card"
            style={{ padding: '4rem', textAlign: 'center', backgroundColor: 'white' }}
          >
            <Clock size={64} color="var(--primary)" style={{ margin: '0 auto 2rem' }} className="animate-spin" />
            <h2 style={{ fontWeight: 'bold' }}>AI is crafting your assessment...</h2>
            <p style={{ color: 'var(--text-muted)' }}>This usually takes 20-30 seconds.</p>
          </motion.div>
        ) : isCompleted ? (
          <motion.div
            key="paper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '4rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              color: '#1f2937'
            }}
          >
            {/* School Header */}
            <div style={{ textAlign: 'center', borderBottom: '2px solid #f3f4f6', paddingBottom: '2rem', marginBottom: '3rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 0.5rem', color: '#111827' }}>{assignment.schoolName || 'Your Institution'}</h1>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 0.25rem', color: '#374151' }}>Subject: {assignment.subject || assignment.title}</h2>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0, color: '#4b5563' }}>Class: {assignment.classLevel || 'N/A'}</h3>
            </div>

            {/* Exam Details Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', marginBottom: '2rem', fontSize: '1rem' }}>
              <span>Time Allowed: {assignment.timeAllowed || 'N/A'}</span>
              <span>Maximum Marks: {assignment.totalMarks}</span>
            </div>

            <p style={{ fontWeight: 'bold', marginBottom: '2rem', fontStyle: 'italic' }}>All questions are compulsory unless stated otherwise.</p>

            {/* Student Info Lines */}
            <div style={{ marginBottom: '3rem', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px', display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}><strong>Name:</strong> <div style={{ flex: 1, borderBottom: '1px solid #94a3b8' }}></div></div>
              <div style={{ display: 'flex', gap: '1rem' }}><strong>Roll Number:</strong> <div style={{ flex: 1, borderBottom: '1px solid #94a3b8' }}></div></div>
              <div style={{ display: 'flex', gap: '1rem' }}><strong>Class: {assignment.classLevel || 'N/A'} Section:</strong> <div style={{ flex: 1, borderBottom: '1px solid #94a3b8' }}></div></div>
            </div>

            {/* Question Sections */}
            {assignment.sections.map((section, sIdx) => (
              <div key={sIdx} style={{ marginBottom: '3rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '800', textDecoration: 'underline' }}>{section.title}</h2>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{section.questions[0]?.type || 'Short Answer Questions'}</h3>
                  <p style={{ fontStyle: 'italic', margin: '0.25rem 0 1rem' }}>{section.instruction}</p>
                </div>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {section.questions.map((q, qIdx) => (
                    <div key={qIdx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: 'bold', minWidth: '30px' }}>{qIdx + 1}.</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                          <p style={{ margin: 0, lineHeight: '1.6', fontSize: '1.05rem' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 'bold', marginRight: '0.5rem' }}>[{q.difficulty.toUpperCase()}]</span>
                            {q.text}
                          </p>
                          <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>[{q.marks} Marks]</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Footer */}
            <div style={{ textAlign: 'center', borderTop: '2px solid #f3f4f6', paddingTop: '2rem', marginTop: '4rem', fontWeight: 'bold', color: '#111827' }}>
              End of Question Paper
            </div>

            {/* Answer Key (Specific Figma Request) */}
            <div style={{ marginTop: '6rem', pageBreakBefore: 'always' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem', borderBottom: '2px solid #111827', paddingBottom: '0.5rem' }}>Answer Key:</h2>
              <div style={{ backgroundColor: '#f9fafb', padding: '2rem', borderRadius: '12px', display: 'grid', gap: '1.5rem' }}>
                {assignment.sections.flatMap(s => s.questions).map((q, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                    <span style={{ fontWeight: 'bold', minWidth: '30px' }}>{idx + 1}.</span>
                    <p style={{ margin: 0, color: '#4b5563' }}>
                      {q.correctAnswer || 'Answer logic placeholder based on AI generation...'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
