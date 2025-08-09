import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Calendar, Clock, User, Eye, Download, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const ViewReports = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Get token and user auth functions - replace with your actual implementation
  const getToken = () => {
    return localStorage.getItem('token') || localStorage.getItem('authToken') || '';
  };

  const isLoggedIn = () => {
    return !!getToken();
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      setError("You must be logged in to view reports.");
      return;
    }

    const fetchReports = async () => {
      try {
        const token = getToken();
        const userId = localStorage.getItem("userId");
        
        // Using fetch instead of axios for artifact compatibility
        const response = await fetch(`${API_URL}/reports/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        
        const data = await response.json();
        setReports(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch reports.");
      }
    };

    fetchReports();
  }, []);

  const isImage = (filename: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);

  const getReportTypeStats = () => {
    const total = reports.length;
    const withText = reports.filter(r => r.extractedText && r.extractedText.trim()).length;
    const withImages = reports.filter(r => r.fileUrl && isImage(r.fileUrl)).length;
    
    return { total, withText, withImages };
  };

  const stats = getReportTypeStats();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
              <div className="container mx-auto px-6 py-4">
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
      

      <div className="max-w-6xl mx-auto p-6">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Medical Reports</h1>
          <p className="text-gray-600">View and manage your uploaded medical documents</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-green-600">{stats.total}</span>
              </div>
              <p className="text-gray-600 font-medium">Total Reports</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-blue-600">{stats.withText}</span>
              </div>
              <p className="text-gray-600 font-medium">With OCR Text</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-purple-600">{stats.withImages}</span>
              </div>
              <p className="text-gray-600 font-medium">With Images</p>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        {reports.length === 0 ? (
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-500">You haven't uploaded any medical reports yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reports.map((report, index) => (
              <Card key={index} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Patient Icon and Info */}
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-900">
                          {report.patientName || "Unknown Patient"}
                        </span>
                      </div>
                      
                      {/* Report Type Badge */}
                      <div className="flex items-center">
                        {report.reportType && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ✓ {report.reportType}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-900">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-900">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {report.uploadedAt 
                        ? new Date(report.uploadedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })
                        : "Date not available"
                      }
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {report.uploadedAt 
                        ? new Date(report.uploadedAt).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })
                        : "Time not available"
                      }
                    </div>
                  </div>

                  {/* OCR Text Preview */}
                  {report.extractedText && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Extracted Text:</p>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <p className="text-sm text-gray-800 line-clamp-3">
                          {report.extractedText.length > 200 
                            ? `${report.extractedText.substring(0, 200)}...`
                            : report.extractedText
                          }
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Image Preview */}
                  {report.fileUrl && isImage(report.fileUrl) && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Report Image:</p>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 inline-block">
                        <img
                          src={`${API_URL}/${report.fileUrl}`}
                          alt={`Report ${index + 1}`}
                          className="h-20 w-20 object-cover rounded"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReports;