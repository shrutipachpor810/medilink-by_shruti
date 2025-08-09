import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import {
  ArrowLeft,
  Stethoscope,
  Calendar,
  Activity,
  TrendingUp,
  User,
  Heart,
  Droplets,
  Apple,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const DoctorHealthRecord = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [healthRecords, setHealthRecords] = useState([]);
  const token = localStorage.getItem('token');

  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${API_URL}/users/patients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(res.data);
    } catch (err) {
      console.error('Error fetching patients:', err);
    }
  };

  const fetchAppointments = async (patientId: string) => {
    try {
      const res = await axios.get(`${API_URL}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data.filter((a: any) => a.patientId === patientId));
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  const fetchHealthRecords = async (patientId: string) => {
    try {
      const res = await axios.get(`${API_URL}/api/health-records/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHealthRecords(res.data);
    } catch (err) {
      console.error('Error fetching health records:', err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    if (selectedPatientId) {
      fetchAppointments(selectedPatientId);
      fetchHealthRecords(selectedPatientId);
    }
  }, [selectedPatientId]);

  const chartData = healthRecords.map((record: any) => {
    const [sys, dia] = record.bp?.split('/') || ['0', '0'];
    return {
      date: new Date(record.date).toLocaleDateString(),
      sugar: record.sugar ?? 0,
      weight: record.weight ?? 0,
      systolic: parseInt(sys) || 0,
      diastolic: parseInt(dia) || 0,
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
              <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Link to="/doctor-dashboard">
                      <Button variant="ghost" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                    </Link>
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="h-8 w-8 text-green-600" />
                      <h1 className="text-2xl font-bold text-slate-800">MediLink</h1>
                    </div>
                  </div>
                </div>
              </div>
            </header>

      <main className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Patient Health Records</h2>
            <p className="text-gray-600">Monitor and analyze patient health data and appointment history</p>
          </div>

          {/* Patient Selection */}
          <div className="flex items-center mt-4 md:mt-0 space-x-3">
            <User className="h-5 w-5 text-blue-600" />
            <select
              className="border border-gray-200 rounded-lg px-4 py-2 text-gray-900 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
            >
              <option value="">Select patient...</option>
              {patients.map((p: any) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Section - Big Graph */}
          <div className="xl:col-span-2 space-y-8">
            {!selectedPatientId && (
              <div className="bg-white rounded-3xl shadow-sm p-12 text-center text-gray-500">
                <p>Select a patient to view their records and appointments.</p>
              </div>
            )}

            {appointments.length > 0 && (
              <div className="bg-white rounded-3xl shadow-sm p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" /> Recent Appointments
                </h3>
                {appointments.map((a: any) => (
                  <div key={a._id} className="bg-blue-50 rounded-xl p-4 mb-4">
                    {new Date(a.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    <span className="ml-2 text-sm">({a.status})</span>
                  </div>
                ))}
              </div>
            )}

            {/* Big Chart */}
            {healthRecords.length > 0 && (
              <div className="bg-white rounded-3xl shadow-sm p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 text-purple-600 mr-2" /> Health Analytics
                </h3>
                <ResponsiveContainer width="100%" height={450}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="systolic" fill="#3b82f6" />
                    <Bar dataKey="diastolic" fill="#06b6d4" />
                    <Bar dataKey="sugar" fill="#10b981" />
                    <Bar dataKey="weight" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Right Section - Small Health Records + Tips */}
          <div className="space-y-8">
            {healthRecords.length > 0 && (
              <div className="bg-white rounded-3xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Activity className="h-5 w-5 text-green-600 mr-2" /> Health Records
                </h3>
                <div className="max-h-[250px] overflow-y-auto pr-2">
                  {healthRecords.map((r: any) => (
                    <div key={r._id} className="bg-green-50 rounded-xl p-3 mb-3 text-sm">
                      {new Date(r.date).toLocaleDateString()} - BP: {r.bp || 'N/A'}, Sugar:{' '}
                      {r.sugar || 'N/A'}, Weight: {r.weight || 'N/A'}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-white rounded-3xl shadow-sm p-8 sticky top-8">
              <h3 className="text-lg font-bold flex items-center mb-4">
                <Shield className="h-5 w-5 text-green-600 mr-2" /> Health Tips
              </h3>
              <div className="mb-4">
                <h4 className="font-semibold text-red-600 flex items-center mb-2">
                  <Heart className="h-4 w-4 mr-2" /> Blood Pressure
                </h4>
                <ul className="list-disc list-inside text-sm">
                  <li>Reduce salt intake</li>
                  <li>Exercise regularly</li>
                  <li>Avoid smoking & alcohol</li>
                  <li>Manage stress</li>
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-blue-600 flex items-center mb-2">
                  <Droplets className="h-4 w-4 mr-2" /> Blood Sugar
                </h4>
                <ul className="list-disc list-inside text-sm">
                  <li>Avoid sugary drinks</li>
                  <li>Control portions</li>
                  <li>Stay active</li>
                  <li>Regular screenings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 flex items-center mb-2">
                  <Apple className="h-4 w-4 mr-2" /> Pro Tip
                </h4>
                <p className="text-sm">
                  Regular monitoring helps detect health issues early. Share data with your doctor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorHealthRecord;
