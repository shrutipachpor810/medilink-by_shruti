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
import chatbotRoutes from "./routes/chatbot.js";
import healthRoutes from './routes/healthRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS config (allow frontend at 5173 to access backend)
app.use(cors({
  origin: ['http://localhost:8081',
    'https://medilink-frontend-theta.vercel.app'], // frontend dev server
  credentials: true
}));  

// Middleware to parse incoming JSON
app.use(express.json());

// Route handlers
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/reports", reportRoutes);
app.use("/chatbot", chatbotRoutes);

app.use("/api/doctor", doctorRoutes);
app.use('/api', healthRoutes);
app.use('/api', feedbackRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
