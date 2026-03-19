import { create } from 'zustand';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface Question {
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  type?: string;
  correctAnswer?: string;
}

interface Section {
  title: string;
  instruction: string;
  questions: Question[];
}

interface Assignment {
  _id: string;
  title: string;
  topic: string;
  schoolName?: string;
  subject?: string;
  classLevel?: string;
  timeAllowed?: string;
  dueDate: string;
  questionTypes: string[];
  totalMarks: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  sections: Section[];
}

interface AssignmentState {
  currentAssignment: Assignment | null;
  loading: boolean;
  error: string | null;
  createAssignment: (data: any) => Promise<string>;
  fetchAssignment: (id: string) => Promise<void>;
  updateAssignmentStatus: (id: string, status: string, assignment?: Assignment) => void;
}

export const useAssignmentStore = create<AssignmentState>((set) => ({
  currentAssignment: null,
  loading: false,
  error: null,

  createAssignment: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/assignments/create`, data);
      set({ loading: false });
      return response.data.assignmentId;
    } catch (err: any) {
      set({ loading: false, error: err.message });
      throw err;
    }
  },

  fetchAssignment: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/assignments/${id}`);
      set({ currentAssignment: response.data, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message });
    }
  },

  updateAssignmentStatus: (id, status, assignment) => {
    set((state) => {
      if (state.currentAssignment?._id === id) {
        return {
          currentAssignment: assignment || { ...state.currentAssignment, status: status as any },
        };
      }
      return state;
    });
  },
}));
