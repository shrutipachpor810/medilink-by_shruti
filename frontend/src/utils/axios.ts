import axios, { AxiosInstance } from 'axios';

// Create an Axios instance with base URL
const instance: AxiosInstance = axios.create({
  baseURL: 'https://medilink-uz08.onrender.com', // Use your deployed backend URL instead of localhost
});

// Automatically attach token from localStorage (if present)
const token: string | null = localStorage.getItem('token');
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
