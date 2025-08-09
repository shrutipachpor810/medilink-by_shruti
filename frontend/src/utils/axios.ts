import axios, { AxiosInstance } from 'axios';

// Read from environment variable (Vite requires "VITE_" prefix)
const API_URL: string = import.meta.env.VITE_BACKEND_URL as string;



const instance: AxiosInstance = axios.create({
  baseURL: API_URL || 'http://localhost:5001', // Fallback for local dev
});

console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

// Attach token automatically if available
const token: string | null = localStorage.getItem('token');
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
