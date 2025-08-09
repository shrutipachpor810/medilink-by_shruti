import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  FileText,
  Stethoscope,
  BookOpenText,
  ShieldPlus,
  Info,
  Lightbulb,
  ArrowLeft,
} from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const PatientPrescriptionViewer = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }

    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const patientId = decodedToken.id;

        const response = await axios.get(
          `${API_URL}/api/prescriptions/${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Updated Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 mb-8 w-full">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to={
                  user?.role === "doctor"
                    ? "/doctor-dashboard"
                    : "/patient-dashboard"
                }
              >
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
        {/* Prescription History */}
        <div className="lg:col-span-2">
          <Card className="shadow-md border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-black-700">
                <FileText className="h-5 w-5" />
                <span>Your Prescription History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-8 text-green-600">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span>Loading prescriptions...</span>
                </div>
              ) : prescriptions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No prescriptions found.
                </p>
              ) : (
                <ul className="space-y-4">
                  {prescriptions.map((prescription: any) => (
                    <li
                      key={prescription._id}
                      className="p-4 bg-green-50 border border-green-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-700">
                          <strong>Doctor:</strong>{" "}
                          {prescription.doctorId?.name || "Unknown"}
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(prescription.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-3 text-gray-800 whitespace-pre-line text-sm">
                        <strong className="text-green-700">Notes:</strong>{" "}
                        {prescription.notes}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Tips & Importance */}
        <div className="space-y-4">
          {/* Why It Matters */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700 space-x-2">
                <BookOpenText className="h-5 w-5" />
                <span>Why Prescriptions Matter</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>
                <ShieldPlus className="inline h-4 w-4 mr-2 text-green-600" />
                Ensure safe, accurate, and personalized medication.
              </p>
              <p>
                <Info className="inline h-4 w-4 mr-2 text-emerald-500" />
                Serve as a medical record for future reference.
              </p>
              <p>
                <FileText className="inline h-4 w-4 mr-2 text-teal-600" />
                Help in emergency care and follow-up treatments.
              </p>
              <p>
                <Stethoscope className="inline h-4 w-4 mr-2 text-lime-600" />
                Monitor your ongoing treatment and health improvements.
              </p>
            </CardContent>
          </Card>

          {/* Helpful Tip */}
          <Card className="bg-blue-50 border border-blue-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-900 text-sm space-x-2">
                <Lightbulb className="h-4 w-4 text-blue-600" />
                <span>Health Tip</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-800 text-sm">
              Always keep a recent digital or printed prescription handy while
              traveling or switching doctors. It saves time and ensures proper
              care.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientPrescriptionViewer;
