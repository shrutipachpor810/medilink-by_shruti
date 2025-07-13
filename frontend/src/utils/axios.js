import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001', // backend base URL
});

// Automatically attach token from localStorage (if present)
const token = localStorage.getItem('token');
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
