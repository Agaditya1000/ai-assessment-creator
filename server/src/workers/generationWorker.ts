import { Worker, Job } from 'bullmq';
import { Redis } from 'ioredis';
import Assignment from '../models/Assignment.js';
import { generateAssessment } from '../services/aiService.js';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

dotenv.config();

const connectionConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: 0,
  lazyConnect: true,
};

// Standalone function that can be called by either BullMQ or directly
export const processGeneration = async (assignmentId: string, io: Server) => {
  console.log(`Processing assignment ${assignmentId}...`);

  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) throw new Error('Assignment not found');

    assignment.status = 'processing';
    await assignment.save();
    io.emit('assignmentUpdate', { id: assignmentId, status: 'processing' });

    const aiResponse = await generateAssessment(
      assignment.topic,
      assignment.numQuestions,
      assignment.questionTypes,
      assignment.additionalInstructions
    );

    assignment.sections = aiResponse.sections;
    assignment.status = 'completed';
    await assignment.save();

    io.emit('assignmentUpdate', {
      id: assignmentId,
      status: 'completed',
      assignment,
    });
    console.log(`Assignment ${assignmentId} completed successfully`);
  } catch (error) {
    console.error(`Assignment ${assignmentId} failed:`, error);
    await Assignment.findByIdAndUpdate(assignmentId, { status: 'failed' });
    io.emit('assignmentUpdate', { id: assignmentId, status: 'failed' });
    throw error;
  }
};

export const initWorker = (io: Server) => {
  const redisMonitor = new Redis({
    ...connectionConfig,
    retryStrategy: () => null,
  });

  redisMonitor.on('error', () => {}); // Silence connection errors

  redisMonitor.connect().then(() => {
    console.log('Redis detected for Worker. Initializing BullMQ Worker.');
    const worker = new Worker(
      'generation-queue',
      async (job: Job) => {
        await processGeneration(job.data.assignmentId, io);
      },
      { connection: connectionConfig }
    );

    worker.on('failed', (job, err) => {
      console.error(`Job ${job?.id} failed with ${err.message}`);
    });
  }).catch(err => {
    // console.log('Redis unavailable for Worker. Worker disabled.');
  });
};
