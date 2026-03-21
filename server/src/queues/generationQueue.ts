import { Queue } from 'bullmq';
import { Redis } from 'ioredis';
import dotenv from 'dotenv';
import { processGeneration } from '../workers/generationWorker.js';
import { Server } from 'socket.io';

dotenv.config();

let ioInstance: Server | null = null;
let isRedisAvailable = false; // Start as false, set to true ONLY if connected
let queueInstance: Queue | null = null;

const connectionConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  tls: process.env.REDIS_PASSWORD ? {} : undefined, // Enable TLS for cloud providers like Upstash
  maxRetriesPerRequest: 0, // Don't hang on failed requests
  lazyConnect: true,
};

// We keep a separate connection just to monitor Redis availability
const redisMonitor = new Redis({
  ...connectionConfig,
  retryStrategy: () => null, // Don't retry monitor connection
});

redisMonitor.on('error', () => {}); // Silence connection errors

redisMonitor.connect().then(() => {
  console.log('Redis connected successfully. Enabling BullMQ.');
  isRedisAvailable = true;
  queueInstance = new Queue('generation-queue', {
    connection: connectionConfig,
  });
}).catch(err => {
  console.warn('Redis unavailable. BullMQ disabled. Falling back to direct in-memory processing.');
  isRedisAvailable = false;
});

export const setIoInstance = (io: Server) => {
  ioInstance = io;
};

export const addGenerationJob = async (assignmentId: string) => {
  if (isRedisAvailable && queueInstance) {
    try {
      await queueInstance.add('generate-assessment', { assignmentId });
      console.log(`Queued assignment ${assignmentId} via Redis`);
      return;
    } catch (err) {
      console.warn('Failed to add to queue, falling back to direct processing');
    }
  }

  // Fallback: Direct processing if Redis is unavailable
  if (ioInstance) {
    console.log(`Processing assignment ${assignmentId} directly (No Redis)`);
    // Fire and forget on the background
    processGeneration(assignmentId, ioInstance).catch(err => {
      console.error('Direct generation failed:', err);
    });
  } else {
    console.error('Cannot process generation: No IO Instance set');
  }
};
