import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileUrl: String,
  extractedText: String,
  uploadedAt: { type: Date, default: Date.now }
});

const Report = mongoose.model('Report', reportSchema);
export default Report;
