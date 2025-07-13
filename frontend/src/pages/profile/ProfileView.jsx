import { useEffect, useState } from 'react';
import axios from '../../utils/axios'; // ✅ this sends token with every request

import styles from './ProfileView.module.css';

function ProfileView() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5001/users/profile');
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:5001/users/profile', profile);

      alert('Profile updated successfully ✅');
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Update failed ❌');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Your Profile</h2>
      <div className={styles.profileCard}>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          disabled={!editing}
          className={styles.input}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          disabled
          className={styles.input}
        />

        <label>Role</label>
        <input
          type="text"
          name="role"
          value={profile.role}
          disabled
          className={styles.input}
        />

        {!editing ? (
          <button className={styles.editButton} onClick={() => setEditing(true)}>Edit</button>
        ) : (
          <button className={styles.saveButton} onClick={handleSave}>Save</button>
        )}
      </div>
    </div>
  );
}

export default ProfileView;
