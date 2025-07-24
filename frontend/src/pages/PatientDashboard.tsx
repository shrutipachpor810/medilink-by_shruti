
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, FileText, Upload, User, Heart, LogOut } from "lucide-react";

const PatientDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-800">MediLink</h1>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-slate-600 hover:text-red-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Welcome back, {user.fullName}! 👋
          </h2>
          <p className="text-slate-600 text-lg">
            Manage your healthcare journey with ease
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          <Link to="/book-appointment">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-slate-800">Book Appointment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Schedule appointments with qualified doctors at your convenience
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/view-appointments">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-slate-800">View Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Check your upcoming and past appointments with detailed information
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/upload-report">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-slate-800">Upload Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Securely upload and manage your medical reports and documents
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/profile">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl text-slate-800">My Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Update your personal information and account settings
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
              <p className="text-slate-600">Total Appointments</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">3</div>
              <p className="text-slate-600">Uploaded Reports</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
              <p className="text-slate-600">Upcoming Visits</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
