import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, User, Stethoscope, CheckCircle, AlertCircle, Loader2, Activity, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Types
interface Doctor {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
}

const UploadReport: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [extractedText, setExtractedText] = useState<string>("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Get token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token') || localStorage.getItem('authToken') || '';
  };

  // Get current user info
  const getCurrentUser = (): User | null => {
    try {
      const userStr = localStorage.getItem('user') || localStorage.getItem('currentUser') || '';
      if (userStr) {
        return JSON.parse(userStr);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    
    return {
      _id: 'current-user-id',
      name: 'Current User',
      email: 'user@example.com',
      role: 'patient'
    };
  };

  // Fetch doctors from API
  const fetchDoctors = async () => {
    const token = getAuthToken();
    if (!token) return;

    setLoadingDoctors(true);
    try {
      const response = await axios.get("http://localhost:5001/users/doctors", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
      setUploadStatus("Failed to load doctors ❌");
    } finally {
      setLoadingDoctors(false);
    }
  };

  // Initialize component
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    fetchDoctors();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    if (!selectedDoctorId) {
      alert("Please select a doctor.");
      return;
    }

    if (!currentUser) {
      alert("User information not found. Please login again.");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      alert("You must be logged in to upload reports.");
      setUploadStatus("Authentication required ❌");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    
    if (currentUser.role === 'patient') {
      formData.append("patientId", currentUser._id);
      formData.append("doctorId", selectedDoctorId);
    } else if (currentUser.role === 'doctor') {
      formData.append("patientId", selectedDoctorId);
      formData.append("doctorId", currentUser._id);
    }

    try {
      setUploadStatus("Uploading & extracting OCR...");
      
      const response = await axios.post("http://localhost:5001/reports/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });

      setUploadStatus("Upload successful ✅");
      
      const ocrText = response.data?.extractedText || "No text extracted.";
      setExtractedText(ocrText);
      
      setFile(null);
      setSelectedDoctorId("");
      
      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error: any) {
      console.error("Upload failed:", error);
      
      if (error.response?.status === 401) {
        setUploadStatus("Authentication failed - Please login again ❌");
      } else if (error.response?.status === 400) {
        setUploadStatus("Bad request - Check your file and data ❌");
      } else {
        setUploadStatus("Upload failed ❌");
      }
    }
  };

  const getStatusIcon = () => {
    if (uploadStatus.includes("Uploading")) return <Loader2 className="h-4 w-4 animate-spin text-blue-600" />;
    if (uploadStatus.includes("successful")) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (uploadStatus.includes("failed") || uploadStatus.includes("Authentication")) return <AlertCircle className="h-4 w-4 text-red-600" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  onClick={() => navigate(-1)}
                  className="mr-4 p-2 hover:bg-gray-100"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center">
                  <Activity className="w-8 h-8 text-green-600 mr-3" />
                  <h1 className="text-2xl font-bold text-gray-900">MediLink</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Medical Report</h2>
            <p className="text-gray-600">Securely upload and share your medical reports with healthcare providers</p>
          </div>

          {/* Main Upload Card */}
          <Card className="bg-white border border-gray-200 mb-6">
            <CardHeader className="border-b border-gray-100 pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <Upload className="w-5 h-5 text-green-600 mr-2" />
                Report Upload
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Current User Info */}
                {currentUser && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg mr-3">
                          <User className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{currentUser.name}</div>
                          <div className="text-sm text-gray-600">{currentUser.email}</div>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium capitalize">
                        {currentUser.role}
                      </span>
                    </div>
                  </div>
                )}

                {/* Doctor Selection */}
                <div className="space-y-2">
                  <Label htmlFor="doctorSelect" className="text-sm font-medium text-gray-700">
                    {currentUser?.role === 'patient' ? 'Select Doctor' : 'Select Patient/Doctor'}
                  </Label>
                  
                  {loadingDoctors ? (
                    <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-600 mr-2" />
                      <span className="text-gray-600">Loading doctors...</span>
                    </div>
                  ) : (
                    <select
                      id="doctorSelect"
                      value={selectedDoctorId}
                      onChange={(e) => setSelectedDoctorId(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                    >
                      <option value="">
                        {currentUser?.role === 'patient' ? 'Select a doctor' : 'Select'}
                      </option>
                      {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>
                          Dr. {doctor.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="file" className="text-sm font-medium text-gray-700">
                    Medical Report File
                  </Label>
                  
                  <div className="relative">
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-green-50 file:text-green-700"
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
                      Only image files (PNG, JPG, JPEG) are supported for OCR processing
                    </p>
                  </div>
                </div>

                {/* Upload Button */}
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  onClick={handleUpload}
                  disabled={!file || !selectedDoctorId || !currentUser || uploadStatus.includes("Uploading")}
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

                {/* Status Message */}
                {uploadStatus && (
                  <div className={`flex items-center space-x-2 p-3 rounded-lg text-sm font-medium ${
                    uploadStatus.includes("successful") ? "bg-green-50 text-green-800 border border-green-200" : 
                    uploadStatus.includes("failed") || uploadStatus.includes("Authentication") ? "bg-red-50 text-red-800 border border-red-200" :
                    "bg-blue-50 text-blue-800 border border-blue-200"
                  }`}>
                    {getStatusIcon()}
                    <span>{uploadStatus}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Report Summary */}
          {(selectedDoctorId || currentUser) && (
            <Card className="bg-white border border-gray-200 mb-6">
              <CardHeader className="border-b border-gray-100 pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <FileText className="w-5 h-5 text-blue-600 mr-2" />
                  Report Summary
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 block mb-1">Patient</Label>
                    <div className="text-gray-900 py-2 px-3 bg-gray-50 rounded border">
                      {currentUser?.role === 'patient' 
                        ? currentUser.name 
                        : selectedDoctorId 
                          ? doctors.find(d => d._id === selectedDoctorId)?.name || 'Selected Patient'
                          : 'Not selected'
                      }
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700 block mb-1">Doctor</Label>
                    <div className="text-gray-900 py-2 px-3 bg-gray-50 rounded border">
                      {currentUser?.role === 'doctor' 
                        ? `Dr. ${currentUser.name}` 
                        : selectedDoctorId 
                          ? `Dr. ${doctors.find(d => d._id === selectedDoctorId)?.name || 'Selected'}`
                          : 'Not selected'
                      }
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700 block mb-1">File Status</Label>
                    <div className="text-gray-900 py-2 px-3 bg-gray-50 rounded border">
                      {file ? file.name : 'No file selected'}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700 block mb-1">Upload Date</Label>
                    <div className="text-gray-900 py-2 px-3 bg-gray-50 rounded border">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Extracted Text */}
          {extractedText && (
            <Card className="bg-white border border-gray-200">
              <CardHeader className="border-b border-gray-100 pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <FileText className="w-5 h-5 text-purple-600 mr-2" />
                  Extracted Text (OCR Results)
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-80 overflow-y-auto">
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">
                    {extractedText}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadReport;