import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  Stethoscope,
  Heart,
  Droplets,
  Apple,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

const DoctorPrescriptionUploader = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [notes, setNotes] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [noAppointmentMessage, setNoAppointmentMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5001/users/patients", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("Error fetching patients:", err));
  }, [token]);

  useEffect(() => {
    if (selectedPatientId) {
      axios
        .get(
          `http://localhost:5001/appointments?role=doctor&patientId=${selectedPatientId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setAppointments(res.data);
          if (res.data.length === 0) {
            setNoAppointmentMessage(
              "⚠️ This patient has no appointments with you."
            );
          } else {
            setNoAppointmentMessage("");
          }
        })
        .catch((err) => {
          console.error("Error fetching appointments:", err);
          toast.error("Failed to fetch appointments");
        });
    } else {
      setAppointments([]);
      setNoAppointmentMessage("");
    }
  }, [selectedPatientId, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPatientId || !selectedAppointmentId || !notes.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const doctorId = decodedToken.id;

      await axios.post(
        "http://localhost:5001/api/prescriptions",
        {
          patientId: selectedPatientId,
          doctorId,
          appointmentId: selectedAppointmentId,
          notes,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Prescription uploaded successfully");
      setSuccessMessage("✅ Prescription uploaded successfully!");
      setSelectedPatientId("");
      setSelectedAppointmentId("");
      setAppointments([]);
      setNotes("");
      setNoAppointmentMessage("");

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload prescription");
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md border-b border-slate-200 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
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
      </header>

      {/* Main */}
      <main className="pt-28 min-h-screen p-6 bg-gradient-to-br from-green-100 via-white to-green-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Form Card */}
          <Card className="w-full md:w-2/3 shadow-lg rounded-2xl border border-green-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-green-800">
                Upload Prescription
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Select Patient */}
                <div>
                  <Label htmlFor="patient">Select Patient</Label>
                  <select
                    id="patient"
                    value={selectedPatientId}
                    onChange={(e) => {
                      setSelectedPatientId(e.target.value);
                      setSelectedAppointmentId("");
                      setSuccessMessage("");
                    }}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="">-- Select Patient --</option>
                    {patients.map((patient) => (
                      <option key={patient._id} value={patient._id}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* No Appointment Message */}
                {noAppointmentMessage && (
                  <p className="text-yellow-700 bg-yellow-100 rounded px-3 py-2 text-sm">
                    {noAppointmentMessage}
                  </p>
                )}

                {/* Select Appointment */}
                <div>
                  <Label htmlFor="appointment">Select Appointment</Label>
                  <select
                    id="appointment"
                    value={selectedAppointmentId}
                    onChange={(e) => setSelectedAppointmentId(e.target.value)}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    disabled={!selectedPatientId || appointments.length === 0}
                  >
                    <option value="">-- Select Appointment --</option>
                    {appointments.map((appt) => (
                      <option key={appt._id} value={appt._id}>
                        {new Date(appt.dateTime).toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes">Prescription Notes</Label>
                  <Textarea
                    id="notes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter prescription details..."
                    className="text-sm"
                  />
                </div>

                {/* Success Message */}
                {successMessage && (
                  <p className="text-green-700 bg-green-100 rounded px-3 py-2 text-sm">
                    {successMessage}
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                  disabled={appointments.length === 0}
                >
                  Upload Prescription
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Tips Sidebar */}
          <Card className="w-full md:w-1/3 bg-white shadow-md rounded-2xl border border-green-100">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-700">
                Quick Health Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <div>
                <h4 className="font-semibold text-red-600 flex items-center mb-1">
                  <Heart className="h-4 w-4 mr-2" /> Blood Pressure
                </h4>
                <ul className="list-disc list-inside text-slate-600">
                  <li>Reduce salt intake</li>
                  <li>Exercise regularly</li>
                  <li>Manage stress levels</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-600 flex items-center mb-1">
                  <Droplets className="h-4 w-4 mr-2" /> Blood Sugar
                </h4>
                <ul className="list-disc list-inside text-slate-600">
                  <li>Avoid sugary drinks</li>
                  <li>Eat more fiber-rich foods</li>
                  <li>Monitor glucose levels regularly</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-green-700 flex items-center mb-1">
                  <Apple className="h-4 w-4 mr-2" /> Nutrition
                </h4>
                <ul className="list-disc list-inside text-slate-600">
                  <li>Consume fresh fruits and vegetables</li>
                  <li>Stay hydrated</li>
                  <li>Limit processed foods</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-purple-600 flex items-center mb-1">
                  <Shield className="h-4 w-4 mr-2" /> General Advice
                </h4>
                <p className="text-slate-600">
                  Always double-check prescriptions for accuracy and potential drug interactions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default DoctorPrescriptionUploader;
