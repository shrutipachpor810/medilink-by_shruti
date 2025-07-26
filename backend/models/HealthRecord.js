
import mongoose from 'mongoose';

const healthRecordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  bp: { type: String },
  sugar: { type: Number },
  weight: { type: Number }
});

export const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);
