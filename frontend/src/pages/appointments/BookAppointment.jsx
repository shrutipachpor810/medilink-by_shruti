import { useState } from 'react';
import axios from 'axios';
import styles from './BookAppointment.module.css';

function BookAppointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
 
        const response = await axios.post('http://localhost:5001/appointments',formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json'
        }
      }
    );
      

      if (response.status === 201 || response.status === 200) {
        alert('✅ Appointment booked successfully!');
        // Clear form
        setFormData({ name: '', email: '', phone: '', date: '', message: '' });
      } else {
        alert('❌ Something went wrong, please try again.');
      }
    } 
    catch (error) {
    // 📌 Step 4: FULL DEBUGGING BLOCK
    console.error("🛑 AXIOS ERROR:", error);
    if (error.response) {
      console.log("📡 Server responded with:", error.response.data);
      alert(`❌ Server Error: ${error.response.data.message}`);
    } else if (error.request) {
      console.log("📴 No response from server:", error.request);
      alert("❌ No response from server");
    } else {
      console.log("❓ Error setting up request:", error.message);
      alert("❌ Error: " + error.message);
    }
  }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        
        <img src="doctor.jpg" alt="Doctor" className={styles.image} />
      </div>

      <div className={styles.right}>
        <h1 className={styles.brand}>MediLink</h1>
        <h2 className={styles.title}>Book Your <span>Appointment</span></h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className={styles.row}>
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange}></textarea>

          <button type="submit" className={styles.button}>BOOK NOW</button>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;
