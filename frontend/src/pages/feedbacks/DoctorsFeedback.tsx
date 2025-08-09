import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Stethoscope,
  Star,
  MessageSquare,
  Users,
} from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const DoctorFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const doctorId = token ? JSON.parse(atob(token.split(".")[1]))?.id : "";

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(
          `${API_URL}${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFeedbackList(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError("Failed to load feedback.");
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchFeedback();
    } else {
      setError("Doctor not logged in.");
      setLoading(false);
    }
  }, [doctorId, token]);

  const totalFeedbacks = feedbackList.length;
  const averageRating =
    totalFeedbacks > 0
      ? (
          feedbackList.reduce((sum, fb) => sum + fb.rating, 0) / totalFeedbacks
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
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
      <main className="pt-28 p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feedback List */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-green-700 mb-6 text-left">
              Patient Feedback
            </h2>

            {loading && (
              <p className="text-center text-gray-600">Loading feedback...</p>
            )}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && feedbackList.length === 0 && (
              <div className="text-center py-10">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No feedback available yet.</p>
              </div>
            )}

            <ul className="space-y-5">
              {feedbackList.map((fb) => (
                <li
                  key={fb._id}
                  className="border border-gray-200 rounded-lg p-5 bg-gradient-to-r from-white to-blue-50 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      {new Date(fb.createdAt).toLocaleString()}
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {fb.rating}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{fb.feedback}</p>

                  {fb.patientId?.name && (
                    <p className="text-sm text-gray-500">
                      — {fb.patientId.name}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Insights Panel */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-green-600 mb-4">
              Feedback Insights
            </h3>
            <div className="space-y-4">
              <div className="bg-blue-100 p-4 rounded-lg shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Feedbacks</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {totalFeedbacks}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <div className="bg-green-100 p-4 rounded-lg shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-green-800">
                    {averageRating} ★
                  </p>
                </div>
                <Star className="h-8 w-8 text-green-500" />
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Most Recent Rating</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {feedbackList[feedbackList.length - 1]?.rating || "N/A"} ★
                  </p>
                </div>
                <MessageSquare className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorFeedback;
