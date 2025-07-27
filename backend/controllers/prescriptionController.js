import Prescription from '../models/Prescription.js';

export const uploadPrescription = async (req, res) => {
  try {
    const { doctorId, patientId, appointmentId, notes } = req.body;

    const prescription = await Prescription.create({
      doctorId,
      patientId,
      appointmentId,
      notes
    });

    res.status(201).json({
      message: 'Prescription uploaded successfully.',
      data: prescription
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getPrescriptionsForPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const prescriptions = await Prescription.find({ patientId })
      .populate('doctorId', 'name')
      .populate('appointmentId', 'date')
      .sort({ createdAt: -1 });

    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch prescriptions.', error: err.message });
  }
};
