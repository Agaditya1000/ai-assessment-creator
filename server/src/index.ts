import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import assignmentRoutes from './routes/assignmentRoutes.js';
import { initWorker } from './workers/generationWorker.js';
import { setIoInstance } from './queues/generationQueue.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/assignments', assignmentRoutes);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Initialize BullMQ Worker fallback context
setIoInstance(io);
initWorker(io);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vedaai';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.warn('MongoDB connection failed. Data features will be unavailable.');
    console.error('MongoDB Error Details:', err.message);
  });

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
