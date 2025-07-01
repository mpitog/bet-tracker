// components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../auth/AuthProvider';

const Header = () => {
  const { logout } = useAuth();

  const linkStyle = {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    padding: '0.5rem 1rem'
  };

  const activeStyle = {
    borderBottom: '2px solid #3498db',
    color: '#3498db'
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <header style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f4f4f4', borderBottom: '1px solid #ddd' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <h1 style={{ margin: 0 }}>Bet Tracker</h1>
          <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <NavLink to="/" end style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>Home</NavLink>
            <NavLink to="/calculators" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>Calculators</NavLink>
          </nav>
        </div>
        <motion.button
          onClick={logout}
          style={{ background: '#e74c3c', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}
        >
          Logout
        </motion.button>
      </header>
    </motion.div>
  );
};

export default Header;
