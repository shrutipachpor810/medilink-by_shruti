import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Heart, ArrowLeft, Calendar, Clock, User, FileText } from "lucide-react";
import { format } from "date-fns";
import axios from "../../utils/axios";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const role = localStorage.getItem("role") || "doctor";
      console.log("User role:", role);
      const res = await axios.get(`/appointments?role=${role}`);
      const isDoctor = role === "doctor";
      setAppointments(res.data);
    } catch (err) {
      console.error("❌ Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`/appointments/${id}/status`, { status });
      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === id ? { ...apt, status } : apt
        )
      );
    } catch (err) {
      console.error("❌ Status update failed:", err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "completed":
        return "bg-blue-100 text-blue-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return "✅";
      case "pending":
        return "⏳";
      case "completed":
        return "✅";
      case "cancelled":
        return "❌";
      default:
        return "📋";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/doctor-dashboard">
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">My Appointments</h2>
            <p className="text-slate-600">View and manage your scheduled appointments</p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {["confirmed", "pending", "completed"].map((status) => (
              <Card key={status} className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className={`text-2xl font-bold mb-2 ${getStatusColor(status)}`}>
                    {appointments.filter((apt) => apt.status === status).length}
                  </div>
                  <p className="text-slate-600 capitalize">{status}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <User className="h-5 w-5 text-blue-600 mr-2" />
                        <h3 className="font-semibold text-slate-800 text-lg">
                          {appointment.name}
                        </h3>
                        <Badge className={`ml-3 ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)} {appointment.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-slate-600 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {format(new Date(appointment.dateTime), "PPP")}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {format(new Date(appointment.dateTime), "p")}
                        </div>
                      </div>

                      <div className="mb-2">
                        {appointment.message && (
                          <p className="text-slate-800 font-medium">Reason: {appointment.message}</p>
                        )}
                      </div>

                      {appointment.notes && (
                        <div className="flex items-start mt-2">
                          <FileText className="h-4 w-4 text-slate-500 mr-2 mt-1" />
                          <p className="text-slate-600 text-sm">{appointment.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-4 md:mt-0 md:ml-6">
                      {appointment.status === "pending" && (
                        <div className="flex flex-col space-y-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => updateStatus(appointment._id, "confirmed")}
                          >
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200"
                            onClick={() => updateStatus(appointment._id, "cancelled")}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                      {appointment.status === "confirmed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(appointment._id, "pending")}
                        >
                          Reschedule
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {!loading && appointments.length === 0 && (
            <Card className="border-0 shadow-lg mt-10">
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No appointments yet</h3>
                <p className="text-slate-600 mb-6">
                  You haven't booked any appointments. Start by scheduling your first visit.
                </p>
                <Link to="/book-appointment">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Book Appointment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ViewAppointments;
