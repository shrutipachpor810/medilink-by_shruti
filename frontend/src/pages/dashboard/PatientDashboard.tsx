import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Upload,
  User,
  Clock,
  Shield,
  Heart,
  Star,
  TrendingUp,
  HeartPulse,
  FileText,
  Stethoscope,
  LogOut,
} from "lucide-react";

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
}) => (
  <Card className="relative overflow-hidden bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group cursor-pointer h-full flex flex-col">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-500`} />
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 group-hover:rotate-180 transition-all duration-700" />
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 group-hover:-rotate-90 transition-all duration-500" />
    <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]`} />

    <CardHeader className="relative pb-6">
      <div className="flex items-start mb-4">
        <div className={`p-4 rounded-2xl ${iconBg} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative`}>
          {icon}
          <div className={`absolute inset-0 rounded-2xl ${accentColor} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm`} />
        </div>
      </div>
      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300 leading-tight">
        {title}
      </CardTitle>
    </CardHeader>

    <CardContent className="relative pt-0 flex flex-col flex-grow">
      <p className="text-gray-600 text-sm leading-relaxed mb-8 group-hover:text-gray-700 transition-colors duration-300 flex-grow">
        {description}
      </p>
      <Button
        className={`w-full bg-gradient-to-r ${gradient} hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-white border-0 font-semibold py-3 rounded-xl relative overflow-hidden group/btn`}
        onClick={onButtonClick}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
        <span className="flex items-center justify-center relative z-10">
          {buttonText}
          <div className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</div>
        </span>
      </Button>
    </CardContent>
  </Card>
);

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

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
    {
      title: "Give Feedback",
      description: "Rate your experience with doctors. Help others make informed decisions.",
      icon: <Star className="w-7 h-7 text-amber-500" />,
      buttonText: "Leave Feedback",
      onButtonClick: () => navigate("/give-feedback"),
      gradient: "from-yellow-400 via-amber-500 to-orange-500",
      iconBg: "bg-yellow-50",
      accentColor: "bg-amber-400",
    },
    {
      title: "View Prescriptions",
      description: "Check your prescriptions to stay up to date.",
      icon: <FileText className="w-7 h-7 text-indigo-500" />,
      buttonText: "Check Prescriptions",
      onButtonClick: () => navigate("/view-prescription"),
      gradient: "from-indigo-500 via-blue-600 to-indigo-700",
      iconBg: "bg-indigo-50",
      accentColor: "bg-indigo-500",
    },
    {
      title: "Add Health Records",
      description: "Track your vital health metrics regularly.",
      icon: <HeartPulse className="w-7 h-7 text-emerald-600" />,
      buttonText: "Add Records",
      onButtonClick: () => navigate("/upload-health-records"),
      gradient: "from-green-400 via-emerald-500 to-teal-500",
      iconBg: "bg-green-50",
      accentColor: "bg-emerald-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -translate-x-48 -translate-y-48 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl translate-x-48 translate-y-48 animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-slate-800">MediLink</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-slate-600 hover:text-red-600 flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Welcome */}
      <div className="relative px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-12 flex items-start space-x-4">
            <div className="p-3">
              <User className="w-10 h-10 text-green-700" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 via-green-900 to-purple-900 bg-clip-text text-transparent">
                Welcome, Patient!
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Take control of your healthcare journey with our intelligent platform designed for modern patients
              </p>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 items-stretch">
            {dashboardItems.map((item, index) => (
              <div key={item.title} className="opacity-0 animate-fade-in h-full" style={{ animationDelay: `${index * 200}ms`, animationFillMode: "both" }}>
                <DashboardCard {...item} />
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatCard label="AI Support" value="24/7" icon={<Clock className="w-6 h-6 text-blue-600" />} bg="blue" />
            <StatCard label="Encryption" value="256-bit" icon={<Shield className="w-6 h-6 text-emerald-600" />} bg="emerald" />
            <StatCard label="Uptime" value="99.9%" icon={<TrendingUp className="w-6 h-6 text-purple-600" />} bg="purple" />
            <StatCard label="User Rating" value="4.9★" icon={<Star className="w-6 h-6 text-amber-600" />} bg="amber" />
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

const StatCard = ({ label, value, icon, bg }: any) => (
  <div className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-${bg}-200 hover:shadow-xl transition-all duration-300 group`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
      <div className={`p-3 bg-${bg}-50 rounded-xl group-hover:bg-${bg}-100 transition-colors duration-300`}>
        {icon}
      </div>
    </div>
  </div>
);

export default PatientDashboard;
