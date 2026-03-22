'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAssignmentStore } from '@/store/useAssignmentStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Plus, ChevronLeft, ChevronRight, Minus } from 'lucide-react';

interface QuestionTypeConfig {
  type: string;
  count: number;
  marks: number;
}

export default function CreateAssignment() {
  const router = useRouter();
  const createAssignment = useAssignmentStore((state) => state.createAssignment);
  const loading = useAssignmentStore((state) => state.loading);
  const error = useAssignmentStore((state) => state.error);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dueDate: '',
    additionalInstructions: '',
  });

  const [questionTypes, setQuestionTypes] = useState<QuestionTypeConfig[]>([
    { type: 'Multiple Choice Questions', count: 1, marks: 1 },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addQuestionType = () => {
    setQuestionTypes([...questionTypes, { type: 'Multiple Choice Questions', count: 1, marks: 1 }]);
  };

  const removeQuestionType = (index: number) => {
    setQuestionTypes(questionTypes.filter((_, i) => i !== index));
  };

  const updateQuestionType = (index: number, field: keyof QuestionTypeConfig, value: any) => {
    const updated = [...questionTypes];
    updated[index] = { ...updated[index], [field]: value };
    setQuestionTypes(updated);
  };

  const handleSubmit = async () => {
    const totalQuestions = questionTypes.reduce((sum, q) => sum + q.count, 0);
    const totalMarks = questionTypes.reduce((sum, q) => sum + q.count * q.marks, 0);

    const extractMetadata = (text: string) => {
      const trimmedText = text.trim();
      if (!trimmedText) return { extractedTitle: 'New Assignment', extractedClass: 'N/A', extractedSubject: '' };

      const lines = trimmedText.split('\n').filter(l => l.trim() !== '');
      let extractedTitle = '';
      let extractedClass = 'N/A';
      let extractedSubject = '';

      for (const line of lines) {
        const titleMatch = line.match(/(?:Assignment|Title|Topic|Paper):\s*(.*)/i);
        const classMatch = line.match(/(?:Class|Grade|Level|Standard):\s*(.*)/i);
        const subjectMatch = line.match(/(?:Subject):\s*(.*)/i);

        if (titleMatch?.[1]) extractedTitle = titleMatch[1].trim();
        if (classMatch?.[1]) extractedClass = classMatch[1].trim();
        if (subjectMatch?.[1]) extractedSubject = subjectMatch[1].trim();
      }

      // If no title found via keywords, take the first 50 chars of the first line
      if (!extractedTitle && lines[0]) {
        extractedTitle = lines[0].trim();
        if (extractedTitle.length > 50) {
          extractedTitle = extractedTitle.substring(0, 47) + '...';
        }
      }

      return { 
        extractedTitle: extractedTitle || 'New Assignment', 
        extractedClass, 
        extractedSubject 
      };
    };

    const { extractedTitle, extractedClass, extractedSubject } = extractMetadata(formData.additionalInstructions);

    const payload = {
      ...formData,
      numQuestions: totalQuestions,
      totalMarks: totalMarks,
      questionTypes: questionTypes.map(q => q.type),
      title: extractedTitle,
      subject: extractedSubject || extractedTitle,
      topic: formData.additionalInstructions || 'General Assessment',
      classLevel: extractedClass,
    };

    try {
      const id = await createAssignment(payload);
      router.push(`/output/${id}`);
    } catch (error) {
      console.error('Failed to create:', error);
    }
  };

  const totalQuestions = questionTypes.reduce((sum, q) => sum + q.count, 0);
  const totalMarks = questionTypes.reduce((sum, q) => sum + q.count * q.marks, 0);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Progress Bar */}
      <div style={{ width: '100%', height: '4px', backgroundColor: '#e5e7eb', borderRadius: '2px', marginBottom: '3rem', position: 'relative' }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: step === 1 ? '50%' : '100%' }}
          style={{ height: '100%', backgroundColor: '#374151', borderRadius: '2px' }}
        />
      </div>

      <div className="glass-card" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text)' }}>Create Assignment</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Set up a new assignment for your students</p>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            border: '1px solid #fecaca',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ display: 'grid', gap: '2rem' }}>
          {/* Assignment Details Header */}
          <div style={{ backgroundColor: '#f9fafb', padding: '1rem 1.5rem', borderRadius: '12px', fontWeight: 'bold' }}>
            Assignment Details
            <p style={{ fontWeight: 'normal', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>Basic information about your assignment</p>
          </div>

          {/* Upload Area */}
          <div style={{
            border: '2px dashed #e5e7eb',
            borderRadius: '16px',
            padding: '3rem',
            textAlign: 'center',
            backgroundColor: '#fcfcfc',
            cursor: 'pointer'
          }}>
            <Upload size={40} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
            <h4 style={{ margin: '0 0 0.5rem', fontWeight: 'bold' }}>Choose a file or drag & drop it here</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>PDF, TEXT, up to 10MB (Optional)</p>
            <button style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: 'white',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>Browse Files</button>
          </div>

          {/* Form Fields - Only Due Date remains */}
          <div className="form-grid">
            <div className="col-span-full">
              <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text)', marginBottom: '0.5rem', display: 'block' }}>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="input-field"
                style={{ backgroundColor: 'white' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>

            <div>
              <div className="question-row-header" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '0.9rem', marginBottom: '1rem' }}>
                <span>Question Type</span>
                <div style={{ display: 'flex', gap: '3rem' }}>
                  <span>No. of Questions</span>
                  <span>Marks</span>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {questionTypes.map((q, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <select
                      value={q.type}
                      onChange={(e) => updateQuestionType(idx, 'type', e.target.value)}
                      className="input-field"
                      style={{ flex: 1, backgroundColor: 'white' }}
                    >
                      <option>Multiple Choice Questions</option>
                      <option>Short Questions</option>
                      <option>Numerical Problems</option>
                      <option>Diagram/Graph-Based Questions</option>
                    </select>

                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: '30px', padding: '4px' }}>
                      <button onClick={() => updateQuestionType(idx, 'count', Math.max(1, q.count - 1))} style={{ border: 'none', background: 'none', padding: '4px' }}><Minus size={16} /></button>
                      <span style={{ width: '30px', textAlign: 'center', fontWeight: 'bold' }}>{q.count}</span>
                      <button onClick={() => updateQuestionType(idx, 'count', q.count + 1)} style={{ border: 'none', background: 'none', padding: '4px' }}><Plus size={16} /></button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: '30px', padding: '4px' }}>
                      <button onClick={() => updateQuestionType(idx, 'marks', Math.max(1, q.marks - 1))} style={{ border: 'none', background: 'none', padding: '4px' }}><Minus size={16} /></button>
                      <span style={{ width: '30px', textAlign: 'center', fontWeight: 'bold' }}>{q.marks}</span>
                      <button onClick={() => updateQuestionType(idx, 'marks', q.marks + 1)} style={{ border: 'none', background: 'none', padding: '4px' }}><Plus size={16} /></button>
                    </div>

                    <button onClick={() => removeQuestionType(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={20} /></button>
                  </div>
                ))}
              </div>

              <button
                onClick={addQuestionType}
                style={{
                  marginTop: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text)',
                  fontWeight: '700',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Plus size={20} fill="var(--text)" color="white" /> Add Question Type
              </button>
            </div>

            <div style={{ textAlign: 'right', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <p style={{ margin: 0, fontWeight: '700' }}>Total Questions : {totalQuestions}</p>
              <p style={{ margin: 0, fontWeight: '700' }}>Total Marks : {totalMarks}</p>
            </div>

            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text)', marginBottom: '0.5rem', display: 'block' }}>Additional Information (For better output)</label>
              <textarea
                name="additionalInstructions"
                value={formData.additionalInstructions}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g Generate a question paper for 3 hour exam duration..."
                rows={4}
                style={{ backgroundColor: 'white' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        <button
          onClick={() => router.back()}
          style={{
            padding: '0.8rem 2rem',
            borderRadius: '30px',
            border: '1px solid var(--border)',
            backgroundColor: 'white',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <ChevronLeft size={20} /> Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: '0.8rem 2rem',
            borderRadius: '30px',
            backgroundColor: '#111827',
            color: 'white',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Generating...' : 'Next'} <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
