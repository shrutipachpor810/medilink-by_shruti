// src/pages/RoleBasedDashboard.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoleBasedDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(currentUser);

    if (user.role === "doctor") {
      navigate("/doctor-dashboard");
    } else if (user.role === "patient") {
      navigate("/patient-dashboard");
    } else {
      navigate("/unauthorized");
    }
  }, [navigate]);

  return <p className="text-center mt-10 text-slate-600">Redirecting to your dashboard...</p>;
};

export default RoleBasedDashboard;
