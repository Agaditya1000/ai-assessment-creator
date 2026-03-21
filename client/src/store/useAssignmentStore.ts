import { create } from 'zustand';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

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
  assignments: Assignment[];
  currentAssignment: Assignment | null;
  loading: boolean;
  error: string | null;
  createAssignment: (data: any) => Promise<string>;
  fetchAssignment: (id: string) => Promise<void>;
  fetchAssignments: () => Promise<void>;
  deleteAssignment: (id: string) => Promise<void>;
  updateAssignmentStatus: (id: string, status: string, assignment?: Assignment) => void;
}

export const useAssignmentStore = create<AssignmentState>((set, get) => ({
  assignments: [],
  currentAssignment: null,
  loading: false,
  error: null,

  createAssignment: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/assignments/create`, data);
      set({ loading: false });
      // Refetch after creation to keep count sync
      get().fetchAssignments();
      return response.data.assignmentId;
    } catch (err: any) {
      set({ loading: false });
      const errorMsg = err.response?.data?.error || 'Failed to create assignment';
      set({ error: errorMsg });
      throw err;
    }
  },

  deleteAssignment: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/assignments/${id}`);
      set((state) => ({
        assignments: state.assignments.filter((a) => a._id !== id),
        loading: false
      }));
    } catch (err: any) {
      set({ loading: false, error: err.message });
      throw err;
    }
  },

  fetchAssignments: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/assignments/all`);
      set({ assignments: response.data, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message });
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
