import { Router } from 'express';
import Assignment from '../models/Assignment.js';
import { addGenerationJob } from '../queues/generationQueue.js';

const router = Router();

router.post('/create', async (req, res) => {
  console.log('API Request: POST /api/assignments/create', req.body);
  try {
    const {
      title,
      topic,
      schoolName,
      subject,
      classLevel,
      timeAllowed,
      dueDate,
      questionTypes,
      numQuestions,
      totalMarks,
      additionalInstructions,
    } = req.body;

    const assignment = new Assignment({
      title,
      topic,
      schoolName,
      subject,
      classLevel,
      timeAllowed,
      dueDate,
      questionTypes,
      numQuestions,
      totalMarks,
      additionalInstructions,
      status: 'pending',
    });

    await assignment.save();
    await addGenerationJob(assignment._id.toString());

    res.status(201).json({
      message: 'Assignment created and job queued',
      assignmentId: assignment._id,
    });
  } catch (error: any) {
    console.error('Error creating assignment:', error.message);
    if (error.errors) {
      console.error('Validation Errors:', Object.keys(error.errors).map(k => `${k}: ${error.errors[k].message}`));
    }
    console.error('Request Body:', req.body);
    res.status(500).json({ error: 'Failed to create assignment', details: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assignment' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete assignment' });
  }
});

export default router;


