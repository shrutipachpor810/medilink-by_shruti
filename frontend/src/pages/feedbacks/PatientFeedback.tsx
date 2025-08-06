import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, ArrowLeft, Stethoscope, Lightbulb } from "lucide-react";

const PatientFeedback = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const patientId = token ? JSON.parse(atob(token.split(".")[1]))?.id : "";

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5001/users/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Error fetching doctors", err));
  }, []);

  useEffect(() => {
    if (!selectedDoctorId) return;
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5001/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const currentUserId = JSON.parse(atob(token.split(".")[1]))?.id;
        const filtered = res.data.filter(
          (app: any) =>
            app.doctorId === selectedDoctorId &&
            app.patientId === currentUserId
        );
        setAppointments(filtered);
      })
      .catch((err) => console.error("Error fetching appointments", err));
  }, [selectedDoctorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5001/api/feedback",
        {
          doctorId: selectedDoctorId,
          patientId,
          appointmentId: selectedAppointmentId,
          rating,
          feedback,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(res.data.message);
      setRating("");
      setFeedback("");
      setSelectedAppointmentId("");
    } catch (err: any) {
      console.error("Feedback submission error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Error submitting feedback.");
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => navigate("/patient-dashboard")}
              variant="ghost"
              className="text-slate-600 hover:text-orange-600 flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Stethoscope className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-slate-800">MediLink</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tips Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <Lightbulb className="w-6 h-6 text-amber-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Tips for Giving Feedback</h3>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
            <li>Be honest and constructive.</li>
            <li>Share both positives and areas of improvement.</li>
            <li>Be specific about your experience.</li>
            <li>Keep it respectful and professional.</li>
            <li>Keep it short and relevant.</li>
            <li>Offer helpful suggestions.</li>
            <li>Focus on service quality.</li>

          </ul>
        </div>

        {/* Feedback Form */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold mb-6 text-green-600">Submit Feedback</h2>
          {message && (
            <div className="mb-4 text-center text-sm font-medium text-green-600">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Doctor
              </label>
              <select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-orange-300"
              >
                <option value="">-- Select --</option>
                {doctors.map((doc: any) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Appointment
              </label>
              <select
                value={selectedAppointmentId}
                onChange={(e) => setSelectedAppointmentId(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-orange-300"
              >
                <option value="">-- Select --</option>
                {appointments.map((app: any) => (
                  <option key={app._id} value={app._id}>
                    {new Date(app.dateTime).toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-orange-300"
              >
                <option value="">-- Ratings --</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                rows={4}
                className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring focus:ring-orange-300"
                placeholder="Write your feedback here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green text-white py-2 px-4 rounded-md font-semibold transition duration-200"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientFeedback;
