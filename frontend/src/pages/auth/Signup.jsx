import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Signup.module.css';
import { Link } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Signup Data:', formData);
    try {
      const response = await axios.post('http://localhost:5001/auth/signup', formData);

      if (response.status === 200 || response.status === 201) {
        alert('Wohoo! Successful Signup 🎉');
        // Redirect based on role
        if (formData.role === 'doctor') {
          navigate('/dashboard/doctor');
        } else {
          navigate('/dashboard/patient');
        }
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error occurred. Check console.');
    }
  };

  return (
    <div className={styles.container}>
       <h1 className={styles.heading}>SIGN UP</h1>
      <h2 className={styles.heading}>Create your account</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" className={styles.input} value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className={styles.input} value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className={styles.input} value={formData.password} onChange={handleChange} required />
        <select name="role" className={styles.select} value={formData.role} onChange={handleChange}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button type="submit" className={styles.button}>Sign Up</button>
        <p className={styles.switchText}>
  Already have an account? <Link to="/auth/login" className={styles.loginLink}>Login</Link>
</p>
      </form>
    </div>
  );
}

export default Signup;
