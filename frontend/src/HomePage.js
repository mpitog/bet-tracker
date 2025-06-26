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
          <th style={styles.thtd}>Created</th>
          <th style={styles.thtd}>Sportsbook</th>
          <th style={styles.thtd}>Market</th>
          <th style={styles.thtd}>Event Name</th>
          <th style={styles.thtd}>Sport</th>
          <th style={styles.thtd}>League</th>
          <th style={styles.thtd}>Type</th>
          <th style={styles.thtd}>Bet</th>
          <th style={styles.thtd}>Stake</th>
          <th style={styles.thtd}>Odds</th>
          <th style={styles.thtd}>Payout</th>
          <th style={styles.thtd}>Profit</th>
          <th style={styles.thtd}>Status</th>
          <th style={styles.thtd}>Bonus</th>
        </tr>
      </thead>
       <tbody>
    {bets.map((bet) => {
      const status = bet.status;
      let chipStyle = { ...styles.chipBase, ...styles.chipDefault };

      if (status === 'won') chipStyle = { ...styles.chipBase, ...styles.chipWon };
      else if (status === 'half_won') chipStyle = { ...styles.chipBase, ...styles.chipHalfWon };
      else if (status === 'lost') chipStyle = { ...styles.chipBase, ...styles.chipLost };
      else if (status === 'half_lost') chipStyle = { ...styles.chipBase, ...styles.chipHalfLost };

      return (
        <tr key={bet.id}>
          <td style={styles.thtd}>{bet.created_at ? new Date(bet.created_at).toLocaleDateString() : 'N/A'}</td>
          <td style={styles.thtd}>{bet.sportsbook_display || 'N/A'}</td>
          <td style={styles.thtd}>{bet.market_name || 'N/A'}</td>
          <td style={styles.thtd}>{bet.event_name || 'N/A'}</td>
          <td style={styles.thtd}>{bet.sport_display || 'N/A'}</td>
          <td style={styles.thtd}>{bet.league_display || 'N/A'}</td>
          <td style={styles.thtd}><span className="chip chip-default">{bet.bet_type_display || 'N/A'}</span></td>
          <td style={styles.thtd}>{bet.bet_name || 'N/A'}</td>
          <td style={styles.thtd}>{bet.stake ? `$${parseFloat(bet.stake).toFixed(2)}` : 'N/A'}</td>
          <td style={styles.thtd}>{bet.odds || 'N/A'}</td>
          <td style={styles.thtd}>{bet.payout || 'N/A'}</td>
          <td
        style={{
          ...styles.thtd,
          color:
            bet.profit > 0
          ? '#27ae60'
          : bet.profit < 0
          ? '#e74c3c'
          : undefined,
          fontWeight: bet.profit !== 0 ? 'bold' : undefined,
        }}
          >
        {bet.profit || 'N/A'}
          </td>
          <td style={styles.thtd}>
        <span style={chipStyle}>{bet.status_display || 'N/A'}</span>
          </td>
          <td style={styles.thtd}>
        {bet.bonus_bet ? (
          <span role="img" aria-label="Yes" style={{ color: '#27ae60', fontSize: '1.2em' }}>✅</span>
        ) : (
          <span role="img" aria-label="No" style={{ color: '#e74c3c', fontSize: '1.2em' }}>❌</span>
        )}
          </td>
        </tr>
      );
    })}
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
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fafafa',
    border: '1px solid #ddd',
    borderRadius: '6px',
    overflow: 'hidden',
    fontSize: '0.95rem',
  },
  thtd: {
    padding: '12px 16px',
    borderBottom: '1px solid #e0e0e0',
    textAlign: 'left',
  },
  chipBase: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'white',
    textTransform: 'capitalize',
  },
  chipWon: { backgroundColor: '#27ae60' },
  chipHalfWon: { backgroundColor: '#27ae60' },
  chipLost: { backgroundColor: '#e74c3c' },
  chipHalfLost: { backgroundColor: '#e74c3c' },
  chipDefault: { backgroundColor: '#7f8c8d' },
};


export default HomePage;
