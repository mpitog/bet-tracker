// src/HomePage.js
import React, { useEffect, useState } from 'react';
import { useAuth } from './auth/AuthProvider';
import { motion } from 'framer-motion';
import './index.css';

function HomePage() {
  console.log("✅ HomePage mounted");
  const [bets, setBets] = useState([]);
  const { accessToken, logout } = useAuth();
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!accessToken) return;

  console.log("🎯 Fetching bets with token...");
  fetch('http://127.0.0.1:8000/api/bets/', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(res => {
      if (res.status === 401) {
        console.warn("⚠️ Unauthorized – token may have expired.");

        setBets([]); // prevent crashes
        setLoading(false);
        return null;
      }
      return res.json();
    })
    .then(data => {
      if (data) {
        setBets(data);
      }
      setLoading(false);
    })
    .catch(error => {
      console.error('❌ Error fetching bets:', error);
      setBets([]); // ensure it's an array
      setLoading(false);
    });
}, [accessToken]);


   return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header style={styles.header}>
        <div style={styles.logo}>LOGO</div>
        <motion.button
          style={styles.logoutButton}
          whileTap={{ scale: 0.9 }}
          onClick={logout}
        >
          Logout
        </motion.button>
      </header>

<main style={{ padding: '1rem' }}>
  <h1>Bets</h1>
  {loading ? (
    <div className="spinner" />
  ) : (
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign:"left", }}>
      <thead>
        <tr>
          <th>Market</th>
          <th>Sport</th>
          <th>League</th>
          <th>Type</th>
          <th>Bet</th>
          <th>Stake</th>
          <th>Odds</th>
          <th>Status</th>
          <th>Created</th>
          <th>Updated</th>
          <th>Bonus</th>
        </tr>
      </thead>
      <tbody>
        {bets.map((bet) => (
          <tr
            key={bet.id}
            style={{ borderBottom: '1px solid #ccc' }}
          >
            <td>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {bet.market_name || 'N/A'}
              </motion.div>
            </td>
            <td>{bet.sport || 'N/A'}</td>
            <td>{bet.league || 'N/A'}</td>
            <td>{bet.bet_type || 'N/A'}</td>
            <td>{bet.bet_name || 'N/A'}</td>
            <td>{bet.stake || 'N/A'}</td>
            <td>{bet.odds || 'N/A'}</td>
            <td>{bet.status || 'N/A'}</td>
            <td>{bet.created_at ? new Date(bet.created_at).toLocaleDateString() : 'N/A'}</td>
            <td>{bet.updated_at ? new Date(bet.updated_at).toLocaleDateString() : 'N/A'}</td>
            <td>{bet.bonus_bet ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</main>

    </motion.div>
  );
}

const styles = {
  header: {
    background: '#f4f4f4',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.2rem'
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};


export default HomePage;
