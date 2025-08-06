import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import BookAppointment from "./pages/appointments/BookAppointment";
import ViewAppointments from "./pages/appointments/ViewAppointments";
import PatientFeedback from "./pages/feedbacks/PatientFeedback";
import DoctorFeedback from "./pages/feedbacks/DoctorsFeedback";
import UploadReport from "./pages/reports/UploadReport";
import ViewReports from "./pages/reports/ViewReports";
import ProfilePage from "./pages/profile/ProfilePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import RoleBasedDashboard from "./pages/RoleBasedDashboard";
import DoctorPrescriptionUploader from "./pages/prescription/DoctorPrescriptionUploader";
import PatientPrescriptionViewer from "./pages/prescription/PatientPrescriptionViewer";
import PatientHealthRecord from "./pages/healthrecord/PatientHealthRecord";
import DoctorHealthRecord from "./pages/healthrecord/DoctorHeathRecord";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Role-based routes */}
          <Route
            path="/book-appointment"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <BookAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-report"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <UploadReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/give-feedback"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientFeedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/take-feedback"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorFeedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-reports"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <ViewReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-prescription"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorPrescriptionUploader />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-prescription"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientPrescriptionViewer/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-health-records"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorHealthRecord/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-health-records"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientHealthRecord/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-appointments"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <ViewAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={['doctor','patient']}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route path="/dashboard" element={<RoleBasedDashboard />} />

          {/* Dashboards (you can guard them too if needed) */}
          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient-dashboard"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
