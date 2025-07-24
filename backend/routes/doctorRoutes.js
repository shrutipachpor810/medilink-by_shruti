import express from "express";
import { getAppointmentsForDoctor } from "../controllers/doctorController.js";

const router = express.Router();

router.get("/appointments/:id", getAppointmentsForDoctor); // id = doctorId

export default router;
