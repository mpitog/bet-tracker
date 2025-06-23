// src/auth/Login.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      console.log("✅ Login succeeded, redirecting...");
      navigate('/'); // ← this should now trigger a re-render
    } catch (err) {
      console.error("❌ Login error:", err);
      setError('Login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5',
    },
    box: {
      background: '#fff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      width: '320px',
      boxSizing: 'border-box',
    },
    logo: {
      textAlign: 'center',
      marginBottom: '1.5rem',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      marginBottom: '1rem',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    button: {
      padding: '0.75rem',
      background: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
      marginBottom: '1rem',
      textAlign: 'center',
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.container}
    >
      <motion.div whileHover={{ scale: 1.02 }} style={styles.box}>
        <div style={styles.logo}>LOGO</div>
        {error && <p style={styles.error}>{error}</p>}

        {loading ? (
          <div className="spinner" />
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              style={styles.input}
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              style={styles.input}
              type="password"        // ← masked input
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
