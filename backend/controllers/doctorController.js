import Appointment from "../models/appointmentModel.js";
import User from "../models/userModel.js";

export const getAppointmentsForDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("patient", "name email phone")
      .sort({ date: -1 });

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching appointments", error });
  }
};
