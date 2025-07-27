import express from 'express';
import { submitFeedback, getDoctorFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

// POST: Submit feedback
router.post('/feedback', submitFeedback);

// GET: Get all feedback for a doctor
router.get('/feedback/:doctorId', getDoctorFeedback);

export default router;
