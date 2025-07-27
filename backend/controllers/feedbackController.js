import Feedback from '../models/Feedback.js';

export const submitFeedback = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentId, rating, feedback } = req.body;

    const existing = await Feedback.findOne({ appointmentId });
    if (existing) {
      return res.status(400).json({ message: 'Feedback already submitted for this appointment.' });
    }

    const newFeedback = new Feedback({ patientId, doctorId, appointmentId, rating, feedback });
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully.', data: newFeedback });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback.', error: error.message });
  }
};

export const getDoctorFeedback = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const feedbacks = await Feedback.find({ doctorId }).sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving feedback.', error: error.message });
  }
};
