import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Upload,
  FileText,
  User,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Stethoscope,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UserType {
  _id: string;
  name: string;
  email: string;
  role: "patient" | "doctor";
}

const API_URL = import.meta.env.VITE_BACKEND_URL;

const UploadReport: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [extractedText, setExtractedText] = useState<string>("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  const getAuthToken = () =>
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    "";

  const getCurrentUser = (): UserType | null => {
    try {
      const userStr =
        localStorage.getItem("user") ||
        localStorage.getItem("currentUser") ||
        "";
      if (userStr) return JSON.parse(userStr);
    } catch {
      return null;
    }
    return {
      _id: "current-user-id",
      name: "Current User",
      email: "user@example.com",
      role: "patient",
    };
  };

  const fetchDoctors = async () => {
    const token = getAuthToken();
    if (!token) return;
    setLoadingDoctors(true);
    try {
      const res = await axios.get(`${API_URL}/users/doctors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(res.data);
    } catch {
      setUploadStatus("Failed to load doctors ❌");
    } finally {
      setLoadingDoctors(false);
    }
  };

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    fetchDoctors();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file to upload.");
    if (!selectedDoctorId) return alert("Please select a doctor.");
    if (!currentUser) return alert("User not found. Please login again.");

    const token = getAuthToken();
    if (!token) {
      alert("Login required.");
      setUploadStatus("Authentication required ❌");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    if (currentUser.role === "patient") {
      formData.append("patientId", currentUser._id);
      formData.append("doctorId", selectedDoctorId);
    } else {
      formData.append("patientId", selectedDoctorId);
      formData.append("doctorId", currentUser._id);
    }

    try {
      setUploadStatus("Uploading & extracting OCR...");
      const res = await axios.post(
        `${API_URL}/reports/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUploadStatus("Upload successful ✅");
      setExtractedText(res.data?.extractedText || "No text extracted.");
      setFile(null);
      setSelectedDoctorId("");
      const fileInput = document.getElementById("file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error: any) {
      if (error.response?.status === 401)
        setUploadStatus("Authentication failed ❌");
      else if (error.response?.status === 400)
        setUploadStatus("Bad request ❌");
      else setUploadStatus("Upload failed ❌");
    }
  };

  const getStatusIcon = () => {
    if (uploadStatus.includes("Uploading"))
      return <Loader2 className="h-4 w-4 animate-spin text-blue-600" />;
    if (uploadStatus.includes("successful"))
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (
      uploadStatus.includes("failed") ||
      uploadStatus.includes("Authentication")
    )
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-[#f8fbff]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/patient-dashboard">
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

      {/* Two-column layout */}
      <main className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left - Upload */}
          <div className="flex flex-col">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-slate-800">
                Upload Medical Report
              </h2>
              <p className="text-slate-600">
                Securely share your reports with healthcare providers
              </p>
            </div>

            <Card className="flex-1 border-0 shadow-md rounded-xl">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="flex items-center text-lg font-semibold text-slate-800">
                  <Upload className="w-5 h-5 text-green-600 mr-2" />
                  Report Upload
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                {/* Current User */}
                {currentUser && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg mr-3">
                          <User className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">
                            {currentUser.name}
                          </div>
                          <div className="text-sm text-slate-600">
                            {currentUser.email}
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm capitalize">
                        {currentUser.role}
                      </span>
                    </div>
                  </div>
                )}

                {/* Doctor Select */}
                <div className="space-y-2">
                  <Label htmlFor="doctorSelect">
                    {currentUser?.role === "patient"
                      ? "Select Doctor"
                      : "Select Patient/Doctor"}
                  </Label>
                  {loadingDoctors ? (
                    <div className="flex items-center justify-center p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <Loader2 className="h-4 w-4 animate-spin text-slate-600 mr-2" />
                      Loading doctors...
                    </div>
                  ) : (
                    <select
                      id="doctorSelect"
                      value={selectedDoctorId}
                      onChange={(e) => setSelectedDoctorId(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-white"
                    >
                      <option value="">
                        {currentUser?.role === "patient"
                          ? "Select a doctor"
                          : "Select"}
                      </option>
                      {doctors.map((doc) => (
                        <option key={doc._id} value={doc._id}>
                          Dr. {doc.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="file">Medical Report File</Label>
                  <div className="relative">
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-green-50 file:text-green-700"
                    />
                    {file && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    )}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Only image files (PNG, JPG, JPEG) are supported
                    </p>
                  </div>
                </div>

                {/* Upload Button */}
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleUpload}
                  disabled={
                    !file ||
                    !selectedDoctorId ||
                    !currentUser ||
                    uploadStatus.includes("Uploading")
                  }
                >
                  {uploadStatus.includes("Uploading") ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Report
                    </>
                  )}
                </Button>

                {/* Status */}
                {uploadStatus && (
                  <div
                    className={`flex items-center space-x-2 p-3 rounded-lg text-sm font-medium ${
                      uploadStatus.includes("successful")
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : uploadStatus.includes("failed") ||
                          uploadStatus.includes("Authentication")
                        ? "bg-red-50 text-red-800 border border-red-200"
                        : "bg-blue-50 text-blue-800 border border-blue-200"
                    }`}
                  >
                    {getStatusIcon()}
                    <span>{uploadStatus}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Extracted Text */}
            {extractedText && (
              <Card className="mt-6 border-0 shadow-md rounded-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                    <FileText className="w-5 h-5 text-purple-600 mr-2" />
                    Extracted Text (OCR Results)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-h-80 overflow-y-auto">
                    <pre className="text-sm text-slate-800 whitespace-pre-wrap font-mono">
                      {extractedText}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right - Tips */}
          <div className="flex flex-col">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-slate-800">
                Report Upload Guidelines
              </h2>
              <p className="text-slate-600">
                Follow these steps for accurate OCR results
              </p>
            </div>

            <Card className="flex-1 border-0 shadow-md rounded-xl">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-lg font-semibold text-green-700 flex items-center">
                  <Lightbulb className="w-5 h-5 text-green-600 mr-2" />
                  Tips for Uploading
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <ul className="list-disc list-inside text-slate-700 space-y-3 text-sm">
                  <li>Only upload clear, readable images (PNG, JPG, JPEG).</li>
                  <li>Ensure the entire report page is visible in the image.</li>
                  <li>Do not upload screenshots from messaging apps.</li>
                  <li>Check that personal details are correct before uploading.</li>
                  <li>Upload one report at a time for accurate OCR results.</li>
                  <li>Contact your doctor for urgent medical cases.</li>
                </ul>
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
                  <strong>Tip:</strong> Clear images help in better text extraction.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadReport;
