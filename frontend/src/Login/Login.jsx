import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import backgroundGif from "../assets/images/play.gif";
import useHoverSound from '../hooks/useHoverSound';
import useBgSound from '../hooks/useBgSound';
import useClickSound from '../hooks/useClickSound';
import GameTitle from '../components/GameTitle';
import styles from './Login.module.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const playHoverSound = useHoverSound();
  const playBgSound = useBgSound();
  const clickSound = useClickSound();

  useEffect(() => {
    document.addEventListener("click", playBgSound, { once: true });
    return () => {
      document.removeEventListener("click", playBgSound);
    };
  }, [playBgSound]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID);
      onLogin();
      navigate('/play');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('User not found. Please register first.');
      } else {
        setError(error.response?.data.message || 'Error logging in');
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
    return true;
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
          <h2>Login</h2>
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
          <div>
            <button
              type="submit"
              className={"game-button"}
              onMouseEnter={playHoverSound}
              onClick={clickSound}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {clickSound(); handleRegisterRedirect();}}
              className={"game-button"}
              onMouseEnter={playHoverSound}>
              Register
            </button>
          </div>
          {error && <p className={styles.message}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;