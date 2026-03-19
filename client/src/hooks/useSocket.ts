import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAssignmentStore } from '../store/useAssignmentStore';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

export const useSocket = () => {
  const updateAssignmentStatus = useAssignmentStore((state) => state.updateAssignmentStatus);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('assignmentUpdate', (data) => {
      console.log('Assignment update received:', data);
      updateAssignmentStatus(data.id, data.status, data.assignment);
    });

    return () => {
      socket.disconnect();
    };
  }, [updateAssignmentStatus]);
};
