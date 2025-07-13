import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import DoctorDashboard from './pages/dashboard/DoctorDashboard';
import PatientDashboard from './pages/dashboard/PatientDashboard';
import ProfileView from './pages/profile/ProfileView';
import BookAppointment from './pages/appointments/BookAppointment';

import './globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/appointments/book" element={<BookAppointment />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
