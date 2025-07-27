import express from 'express';
import { uploadPrescription, getPrescriptionsForPatient } from '../controllers/prescriptionController.js';

const router = express.Router();

// POST: Upload prescription (text only)
router.post('/', uploadPrescription);

// GET: Fetch all prescriptions for a patient
router.get('/:patientId', getPrescriptionsForPatient);

export default router;
