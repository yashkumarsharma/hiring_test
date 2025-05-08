import { useState } from 'react';
import axios from 'axios';

import backgroundGif from "../assets/images/play.gif";
import GameTitle from '../components/GameTitle';
import styles from './Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data.message || 'Error registering');
    }
  };

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${backgroundGif})`,
      }}
    >
      <GameTitle />
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={styles.input}
          />
          <div className="login-button-container">
            <button type="submit" className={"game-button"}>
              Register
            </button>
          </div>
          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;