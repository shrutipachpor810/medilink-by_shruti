import { useNavigate } from 'react-router-dom';
import styles from './App.module.css';

function App() {
  const navigate = useNavigate(); // ✅ used below

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to MediLink 👩‍⚕️</h1>
      <button className={styles.button} onClick={() => navigate('/auth/signup')}>
        Get Started
      </button>
    </div>
  );
}

export default App;
