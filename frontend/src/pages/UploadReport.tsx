import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Heart, ArrowLeft, Upload, FileText, Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

// ✅ Get user + token from localStorage
const user = JSON.parse(localStorage.getItem("user") || "{}");
const token = localStorage.getItem("token");
const patientId = user?._id;

const UploadReport = () => {
  const [uploadedReports, setUploadedReports] = useState<any[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [reportName, setReportName] = useState("");
  const [reportNotes, setReportNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (patientId) {
      fetchReports();
    }
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get(`/reports/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUploadedReports(res.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(["dragenter", "dragover"].includes(e.type));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    if (!(file.type.startsWith("image/") || file.type === "application/pdf")) {
      toast.error("Only PDF, JPG, PNG files allowed");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("patientId", patientId);
    if (doctorId) {
    formData.append("doctorId", doctorId); // only if valid
    } // Placeholder until you implement doctor selection
    formData.append("notes", reportNotes);

    try {
      setLoading(true);
      const res = await axios.post("/api/reports/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Report uploaded & scanned successfully!");
      setUploadedReports((prev) => [res.data, ...prev]);
      setReportName("");
      setReportNotes("");
    } catch (err: any) {
  if (err.response) {
    // Server responded but with error status
    console.error("Upload failed: Response error", {
      status: err.response.status,
      data: err.response.data,
    });
    toast.error(`Upload failed: ${err.response.status} - ${err.response.data?.message || "Server Error"}`);
  } else if (err.request) {
    // Request made, no response
    console.error("Upload failed: No response from server", err.request);
    toast.error("Upload failed: No response from server");
  } else {
    // Something else triggered error
    console.error("Upload failed: Error setting up request", err.message);
    toast.error(`Upload error: ${err.message}`);
  }
}
  };

  const handleDelete = async (id: string) => {
    try {
      // You can connect this to backend later if needed
      setUploadedReports((prev) => prev.filter((r) => r._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/patient-dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-slate-800">MediLink</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Upload Medical Reports</h2>
          <p className="text-slate-600 mb-8">Securely store and analyze your reports</p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Upload New Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="reportName">Report Name</Label>
                  <Input
                    id="reportName"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    placeholder="e.g., X-Ray Chest"
                  />
                </div>

                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? "border-blue-500 bg-blue-50" : "border-slate-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-10 w-10 text-slate-400 mx-auto mb-4" />
                  <p className="text-lg text-slate-700 font-medium">Drag & drop files</p>
                  <p className="text-slate-500">or</p>
                  <Button variant="outline" className="mt-2 relative">
                    Choose File
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileInput}
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                  </Button>
                  <p className="text-sm mt-2 text-slate-500">PDF, JPG, PNG (max 10MB)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reportNotes">Notes (Optional)</Label>
                  <Textarea
                    id="reportNotes"
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Smart Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-3 items-start">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">OCR Extraction</h3>
                      <p className="text-sm text-slate-600">
                        Extracts medical text for AI-based understanding
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-start">
                    <Heart className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold">Encrypted & Private</h3>
                      <p className="text-sm text-slate-600">Stored securely with your account</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Uploaded Reports */}
          <Card className="border-0 shadow-lg mt-8">
            <CardHeader>
              <CardTitle>Your Reports</CardTitle>
            </CardHeader>
            <CardContent>
              {uploadedReports.length > 0 ? (
                <div className="space-y-4">
                  {uploadedReports.map((report) => (
                    <div
                      key={report._id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
                    >
                      <div className="flex items-center space-x-4">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{reportName || "Uploaded Report"}</h3>
                          <p className="text-sm text-slate-600">
                            {new Date(report.uploadedAt).toLocaleDateString()}
                          </p>
                          {report.extractedText && (
                            <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                              OCR: {report.extractedText}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <a href={`/${report.fileUrl}`} target="_blank">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </a>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600"
                          onClick={() => handleDelete(report._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-slate-500 py-8">No reports yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UploadReport;
