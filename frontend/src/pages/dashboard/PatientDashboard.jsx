import { useNavigate } from 'react-router-dom';
import styles from './PatientDashboard.module.css';

function PatientDashboard() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome, Patient 🧑‍⚕️</h1>
      <div className={styles.cardGrid}>
        <button onClick={() => navigate('/profile')} className={styles.card}>👤 View Profile</button>
        <button onClick={() => navigate('/appointments/book')} className={styles.card}>📅 Book Appointment</button>
        <button onClick={() => navigate('/appointments')} className={styles.card}>📋 View Appointments</button>
        <button onClick={() => navigate('/reports/upload')} className={styles.card}>📤 Upload Report</button>
      </div>
    </div>
  );
}

export default PatientDashboard;
