// utils/auth.ts

// Save token and role in localStorage
export const saveAuthData = (token: string, role: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

// Get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};


export const getRole = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user)?.role : null;
};

//get userId
export const getUserId = (): string | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user)?._id : null;
};


// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return !!getToken();
};

// Check if user is a doctor
export const isDoctor = (): boolean => {
  return getRole() === "doctor";
};

// Check if user is a patient
export const isPatient = (): boolean => {
  return getRole() === "patient";
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
