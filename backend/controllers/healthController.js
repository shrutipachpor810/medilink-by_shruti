import { HealthRecord } from '../models/HealthRecord.js';

// Add a new health record
export const addHealthRecord = async (req, res) => {
  try {
    const record = new HealthRecord(req.body);
    const saved = await record.save();
    res.status(201).json({ message: 'Health record saved', data: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all records for a patient
export const getHealthRecordsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const records = await HealthRecord.find({ patientId }).sort({ date: 1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
