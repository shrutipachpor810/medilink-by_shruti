import express from "express";
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Real endpoints
router.post("/", protect, createAppointment); // Book appointment
router.get("/", protect, getAppointments);    // View appointments (doctor or patient)
router.put("/:id/status", protect, updateAppointmentStatus); // Change status
export default router;
