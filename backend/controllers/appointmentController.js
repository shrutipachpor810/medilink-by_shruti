import Appointment from "../models/appointmentModel.js";

const createAppointment = async (req, res) => {
  try {
    const { name, email, phone, date, message } = req.body;

    const newAppointment = await Appointment.create({
      patientId: req.user._id,  // from auth token
      name,
      email,
      phone,
      message,
      dateTime: date,
      status: "pending"
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("❌ Error creating appointment:", error);
    res.status(500).json({ message: "Error creating appointment", error });
  }
};

const getAppointments = async (req, res) => {
  try {
    const role = req.query.role;
    const filter =
      role === "doctor"
        ? { doctorId: req.user._id }
        : { patientId: req.user._id };

    const appointments = await Appointment.find(filter);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error });
  }
};

export { createAppointment, getAppointments, updateAppointmentStatus };
