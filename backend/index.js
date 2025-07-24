import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 20;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

import doctorRoutes from "./routes/doctorRoutes.js";


// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS config (allow frontend at 5173 to access backend)
app.use(cors({
<<<<<<< HEAD
  origin: 'http://localhost:8081', // frontend dev server
=======
  origin: "http://localhost:5173",
>>>>>>> c8b66be488c22e178a39c5052a6fceb889988620
  credentials: true
}));

// Middleware to parse incoming JSON
app.use(express.json());

// Route handlers
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/reports", reportRoutes);

app.use("/api/doctor", doctorRoutes);
// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
