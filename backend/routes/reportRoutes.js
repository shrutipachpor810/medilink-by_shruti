import express from 'express';
import { uploadReport, getReports } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// ✅ Upload route
router.post('/upload', protect, upload.single('file'), uploadReport);

// ✅ Get reports by user ID
router.get('/:userId', protect, getReports); // <--- THIS IS REQUIRED

export default router;
