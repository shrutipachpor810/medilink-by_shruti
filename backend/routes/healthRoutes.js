import express from 'express';
import { addHealthRecord, getHealthRecordsByPatient } from '../controllers/healthController.js';

const router = express.Router();

router.post('/health-records', addHealthRecord);
router.get('/health-records/:patientId', getHealthRecordsByPatient);

export default router;
