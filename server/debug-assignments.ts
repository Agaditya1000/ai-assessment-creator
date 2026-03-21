import mongoose from 'mongoose';
import Assignment from './src/models/Assignment.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vedaai';

async function debug() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const latest = await Assignment.find().sort({ createdAt: -1 }).limit(5);
    console.log('--- LATEST 5 ASSIGNMENTS ---');
    latest.forEach(a => {
      console.log(`ID: ${a._id}`);
      console.log(`Title: ${a.title}`);
      console.log(`Status: ${a.status}`);
      console.log(`Sections count: ${a.sections?.length || 0}`);
      console.log('---------------------------');
    });

    await mongoose.disconnect();
  } catch (err) {
    console.error('Debug script failed:', err);
  }
}

debug();
