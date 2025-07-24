import express from 'express';
import { getProfile, updateProfile, getDoctors } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /users/profile
router.get('/profile', protect, getProfile);

// PUT /users/profile
router.put('/profile', protect, updateProfile);

//GET /users/doctors
router.get('/doctors', getDoctors);

export default router;
