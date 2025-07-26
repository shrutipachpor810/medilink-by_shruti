//pages/dashboard/patientdashboard.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, Upload, User, Activity, Clock, Shield, ArrowLeft, Bell, Settings, Heart, Star, Zap, TrendingUp } from "lucide-react";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  onButtonClick: () => void;
  gradient: string;
  iconBg: string;
  accentColor: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  buttonText,
  onButtonClick,
  gradient,
  iconBg,
  accentColor,
}) => {
  return (
    <Card className="relative overflow-hidden bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group cursor-pointer">
      {/* Unique geometric background patterns */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-500`} />
      
      {/* Dynamic floating elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 group-hover:rotate-180 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 group-hover:-rotate-90 transition-all duration-500" />
      
      {/* Glowing edge effect */}
      <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]`} />
      
      <CardHeader className="relative pb-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-4 rounded-2xl ${iconBg} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative`}>
            {icon}
            {/* Subtle glow effect */}
            <div className={`absolute inset-0 rounded-2xl ${accentColor} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm`} />
          </div>
          <div className="flex items-center text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full group-hover:bg-green-50 group-hover:text-green-600 transition-all duration-300">
            <Zap className="w-3 h-3 mr-1" />
            Instant
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300 leading-tight">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative pt-0">
        <p className="text-gray-600 text-sm leading-relaxed mb-8 group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
        
        <Button 
          className={`w-full bg-gradient-to-r ${gradient} hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-white border-0 font-semibold py-3 rounded-xl relative overflow-hidden group/btn`}
          onClick={onButtonClick}
        >
          {/* Button shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
          
          <span className="flex items-center justify-center relative z-10">
            {buttonText}
            <div className="ml-2 group-hover:translate-x-2 transition-transform duration-300">
              →
            </div>
          </span>
        </Button>
        
        {/* Enhanced security badge */}
        {(title === "Upload Reports" || title === "Update Profile") && (
          <div className="flex items-center justify-center mt-4 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full group-hover:bg-green-50 group-hover:text-green-600 transition-all duration-300">
            <Shield className="w-3 h-3 mr-1" />
            256-bit Encrypted
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: "Book Appointment",
      description: "Schedule consultations with top-rated doctors. Smart scheduling with real-time availability.",
      icon: <Calendar className="w-7 h-7 text-blue-600" />,
      buttonText: "Book Now",
      onButtonClick: () => navigate("/book-appointment"),
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      iconBg: "bg-blue-50",
      accentColor: "bg-blue-500",
    },
    {
      title: "Upload Reports",
      description: "AI-powered document analysis with instant OCR. Secure cloud storage with 99.9% uptime.",
      icon: <Upload className="w-7 h-7 text-emerald-600" />,
      buttonText: "Upload Files",
      onButtonClick: () => navigate("/upload-report"),
      gradient: "from-emerald-500 via-green-600 to-teal-600",
      iconBg: "bg-emerald-50",
      accentColor: "bg-emerald-500",
    },
    {
      title: "Update Profile",
      description: "Manage your health profile with intelligent suggestions. Sync with wearables and health apps.",
      icon: <User className="w-7 h-7 text-purple-600" />,
      buttonText: "Edit Profile",
      onButtonClick: () => navigate("/profile"),
      gradient: "from-purple-500 via-violet-600 to-indigo-600",
      iconBg: "bg-purple-50",
      accentColor: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -translate-x-48 -translate-y-48 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl translate-x-48 translate-y-48 animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Header Section */}
      <div className="relative bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-emerald-600/5" />
        <div className="relative px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  onClick={() => navigate(-1)}
                  className="mr-4 p-3 hover:bg-gray-100/80 rounded-xl transition-all duration-200 group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                </Button>
                <div className="flex items-center">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl mr-4 shadow-lg">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">MediLink</h1>
                    <p className="text-sm text-gray-600">Healthcare Dashboard</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="ghost" className="p-2 hover:bg-gray-100 rounded-xl relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </Button>
                <Button variant="ghost" className="p-2 hover:bg-gray-100 rounded-xl">
                  <Settings className="w-5 h-5 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="relative px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4 shadow-lg">
              <Heart className="w-4 h-4 mr-2 animate-pulse" />
              Your Health, Our Priority
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Welcome back! 👋
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take control of your healthcare journey with our intelligent platform designed for modern patients
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {dashboardItems.map((item, index) => (
              <div
                key={item.title}
                className="opacity-0 animate-fade-in"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: "both",
                }}
              >
                <DashboardCard {...item} />
              </div>
            ))}
          </div>
          
          {/* Enhanced Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">24/7</p>
                  <p className="text-sm text-gray-600">AI Support</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors duration-300">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">256-bit</p>
                  <p className="text-sm text-gray-600">Encryption</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors duration-300">
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">99.9%</p>
                  <p className="text-sm text-gray-600">Uptime</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors duration-300">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">4.9★</p>
                  <p className="text-sm text-gray-600">User Rating</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors duration-300">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Need immediate assistance?</h3>
                  <p className="text-sm text-gray-600">Our AI health assistant is available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PatientDashboard;