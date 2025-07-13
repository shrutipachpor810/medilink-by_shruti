import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🧠 Hit your login backend
      const res = await axios.post('http://localhost:5001/auth/login', formData);
        const token = res.data.token;
localStorage.setItem('token', token);
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      if (res.status === 200) {
        const { role } = res.data.user;
        alert('Login successful!');

        if (role === 'doctor') {
          navigate('/dashboard/doctor');
        } else {
          navigate('/dashboard/patient');
        }
      } else {
        alert('Login failed!');
      }
    } catch (err) {
      console.error(err);
      alert('Error logging in. Please check your credentials.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.input}
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.button}>Login</button>

        <p className={styles.switchText}>
          Don’t have an account? <Link to="/auth/signup" className={styles.signupLink}>Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
