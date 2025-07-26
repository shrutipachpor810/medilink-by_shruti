
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, FileText, Users, User, Heart, LogOut, Stethoscope } from "lucide-react";

const DoctorDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
      localStorage.setItem("role", "doctor");
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
            Welcome, {user.fullName||'Doctor'}! 👩‍⚕️
          </h2>
          <p className="text-slate-600 text-lg">
            Manage your practice and care for your patients
          </p>
        </div>

        {/* Feature Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        <Link to="/view-reports">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl text-slate-800">Patient Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Access and review patient medical reports and documents
              </p>
            </CardContent>
          </Card>
        </Link>

          <Link to="/profile">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-slate-800">My Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Update your professional information and credentials
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Doctor Stats */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <p className="text-slate-600">Today's Appointments</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">48</div>
              <p className="text-slate-600">Total Patients</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <p className="text-slate-600">Patient Satisfaction</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">156</div>
              <p className="text-slate-600">Reports Reviewed</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800 flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div>
                    <p className="font-medium text-slate-800">Patient consultation completed</p>
                    <p className="text-sm text-slate-600">John Doe - 2:30 PM</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Completed</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div>
                    <p className="font-medium text-slate-800">New appointment request</p>
                    <p className="text-sm text-slate-600">Sarah Wilson - Tomorrow 10:00 AM</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Pending</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-slate-800">Medical report uploaded</p>
                    <p className="text-sm text-slate-600">Michael Brown - Blood Test Results</p>
                  </div>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">New</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
