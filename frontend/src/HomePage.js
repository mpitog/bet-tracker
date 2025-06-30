// src/HomePage.js
import React, { useEffect, useState } from 'react';
import { useAuth } from './auth/AuthProvider';
import { motion } from 'framer-motion';
import './index.css';

const styles = {
  thtd: {
    padding: '8px',
    borderBottom: '1px solid #ccc',
    textAlign: 'left',
    maxWidth: '72px',
  },
  input: {
    padding: '10px 10px',
    border: '1px solid #bfc9d9',
    borderRadius: '5px',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    background: '#f8fafc',
    margin: '6px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
    maxWidth: '300px',
    display: 'flex',
  },

};

function HomePage() {
  const [bets, setBets] = useState([]);
  const { accessToken, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const [formValues, setFormValues] = useState({
    sportsbook: '',
    market_name: '',
    event_name: '',
    sport: '',
    league: '',
    bet_type: '',
    bet_name: '',
    stake: '',
    odds: '',
    bonus_bet: false,
    status: 'pending'
  });

  const BET_TYPES = [
    ['normal', 'Normal'], ['low_hold', 'Low Hold'], ['arb', 'Arbitrage'], 
    ['middle','Middle'], ['positive_ev', 'Positive EV'], ['future','Future']
  ];
  const SPORTSBOOKS = [
    ['skybook', 'Skybook'], ['bovada', 'Bovada'], ['betonline', 'BetOnline']
  ];
  const SPORTS = [
    ['soccer', 'Soccer'], ['basketball', 'Basketball'], ['american_football', 'Am.Football'],
    ['ice_hockey','Ice Hockey'], ['baseball','Baseball'], ['tennis', 'Tennis']
  ];
  const LEAGUES = [
    ['epl', 'English Premier League'], ['nba', 'NBA'], ['nfl', 'NFL'], ['ucl', 'UEFA Champions League']
  ];
  const STATUSES = [
    ['won', 'Won'], ['lost', 'Lost'], ['cashout', 'Cashout'], ['pending', 'Pending'],
    ['refunded', 'Refunded'], ['half_won', 'Half Won'], ['half_lost', 'Half Lost']
  ];

  const requiredFields = [
    'sportsbook', 'market_name', 'event_name', 'sport',
    'league', 'bet_type', 'bet_name', 'stake', 'odds', 'status'
  ];

  const isFormValid = requiredFields.every(key => formValues[key] !== '' && formValues[key] !== null);

  useEffect(() => {
    if (!accessToken) return;

    fetch('http://127.0.0.1:8000/api/bets/', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => {
        if (res.status === 401) {
          setBets([]);
          setLoading(false);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) setBets(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching bets:', error);
        setBets([]);
        setLoading(false);
      });
  }, [accessToken]);

const handleSave = () => {
  const cleanedFormValues = {
    ...formValues,
    stake: parseFloat(formValues.stake) || 0,
    odds: parseFloat(formValues.odds) || 0
  };

  fetch('http://127.0.0.1:8000/api/bets/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(cleanedFormValues)
  })
    .then(async res => {
      if (!res.ok) {
        const errorDetails = await res.json();
        console.error('❌ Backend validation errors:', errorDetails);
        throw new Error('Failed to save');
      }
      return res.json();
    })
    .then(newBet => {
      setBets(prev => [...prev, newBet]);
      setShowModal(false);
      setFormTouched(false);
      setFormValues({
        sportsbook: '',
        market_name: '',
        event_name: '',
        sport: '',
        league: '',
        bet_type: '',
        bet_name: '',
        stake: '',
        odds: '',
        bonus_bet: false,
        status: 'pending'
      });
    })
    .catch(err => console.error('Save error:', err));
};


  // delete handler
  const handleDelete = (betId) => {
    if (!window.confirm('Are you sure you want to delete this bet?')) return;
    fetch(`http://127.0.0.1:8000/api/bets/${betId}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => {
        if (res.ok) {
          setBets(prev => prev.filter(bet => bet.id !== betId));
        } else {
          throw new Error('Failed to delete');
        }
      })
      .catch(err => console.error('Delete error:', err));
  };

  // edit handler
  const handleEdit = (betId, updatedFields) => {
    fetch(`http://127.0.0.1:8000/api/bets/${betId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(updatedFields)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update');
        }
        return res.json();
      })
      .then(updatedBet => {
        setBets(prev =>
          prev.map(bet => (bet.id === betId ? { ...bet, ...updatedBet } : bet))
        );
      })
      .catch(err => console.error('Edit error:', err));
  };


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <header style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f4f4f4', borderBottom: '1px solid #ddd' }}>
        <h1 style={{ margin: 0 }}>Bet Tracker</h1>
        <motion.button onClick={logout} style={{ background: '#e74c3c', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}>Logout</motion.button>
      </header>

      <main style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0 }}>Bets</h2>
          <button
            onClick={() => setShowModal(true)}
            style={{ backgroundColor: '#3498db', color: 'white', padding: '0.6rem 1rem', borderRadius: '5px' }}
          >
            Add a Bet
          </button>
        </div>

        {!loading && bets.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fafafa', border: '1px solid #ddd' }}>
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
                <th style={styles.thtd}>Status</th>
                <th style={styles.thtd}>Payout</th>
                <th style={styles.thtd}>Profit</th>
                <th style={styles.thtd}>Bonus</th>
                <th style={{ ...styles.thtd, width: '32px' }}></th>
              </tr>
            </thead>
            <tbody>
              {bets.map((bet) => (
                <tr
                  key={bet.id}
                  style={{ position: 'relative', cursor: 'pointer' }}
                  className="bet-row"
                >
                  <td style={styles.thtd}>{bet.created_at ? new Date(bet.created_at).toLocaleDateString() : 'N/A'}</td>
                  <td style={styles.thtd}>{bet.sportsbook_display || 'N/A'}</td>
                  <td style={styles.thtd}>{bet.market_name || 'N/A'}</td>
                  <td style={styles.thtd}>{bet.event_name || 'N/A'}</td>
                  <td style={styles.thtd}>{bet.sport_display || 'N/A'}</td>
                  <td style={styles.thtd}>{bet.league_display || 'N/A'}</td>
                  <td style={styles.thtd}>{bet.bet_type_display || 'N/A'}</td>
                  <td style={styles.thtd}>{bet.bet_name || 'N/A'}</td>
                  <td style={styles.thtd}>{bet.stake ? `$${parseFloat(bet.stake).toFixed(2)}` : 'N/A'}</td>
                  <td style={styles.thtd}>{bet.odds || 'N/A'}</td>
                  <td style={{ ...styles.thtd, position: 'relative' }}>
                    {bet.editingStatus ? (
                      <select
                        value={bet.status}
                        onChange={e => {
                          const newStatus = e.target.value;
                          handleEdit(bet.id, { status: newStatus });
                          setBets(prev =>
                            prev.map(b =>
                              b.id === bet.id ? { ...b, status: newStatus, editingStatus: false } : b
                            )
                          );
                        }}
                        onBlur={() =>
                          setBets(prev =>
                            prev.map(b =>
                              b.id === bet.id ? { ...b, editingStatus: false } : b
                            )
                          )
                        }
                        autoFocus
                        style={{
                          fontSize: '0.95rem',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          border: '1px solid #bfc9d9',
                          background: '#f8fafc',
                          marginRight: '4px',
                          minWidth: '80px'
                        }}
                      >
                        {STATUSES.map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    ) : (
                      <span>
                        {bet.status_display || 'N/A'}
                        <button
                          className="edit-pencil"
                          title="Edit Status"
                          onClick={() =>
                            setBets(prev =>
                              prev.map(b =>
                                b.id === bet.id ? { ...b, editingStatus: true } : b
                              )
                            )
                          }
                          style={{
                            display: 'inline-block',
                            marginLeft: '6px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#000',
                            padding: 0,
                            verticalAlign: 'middle',
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M14.85 2.85a1.2 1.2 0 0 1 1.7 1.7l-1.1 1.1-1.7-1.7 1.1-1.1zm-2.1 2.1 1.7 1.7-8.2 8.2c-.1.1-.2.2-.3.3l-2.1.6c-.3.1-.6-.2-.5-.5l.6-2.1c.1-.1.2-.2.3-.3l8.2-8.2z" />
                          </svg>
                        </button>
                      </span>
                    )}
                  </td>
                  <td style={styles.thtd}>{bet.payout ? `$${parseFloat(bet.payout).toFixed(2)}` : 'N/A'}</td>
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
                    {typeof bet.profit === 'number'
                      ? `$${parseFloat(bet.profit).toFixed(2)}`
                      : 'N/A'}
                  </td>
                  <td style={styles.thtd}>{bet.bonus_bet ? '✅' : '❌'}</td>
                  <td style={{ ...styles.thtd, width: '32px', position: 'relative', padding: 0 }}>
                    
                    
                    {/* Delete X icon */}
                    <button
                      className="delete-x"
                      title="Delete"
                      onClick={() => handleDelete(bet.id)}
                      style={{
                        display: 'none',
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        cursor: 'pointer',
                        background: 'transparent',
                        border: 'none',
                        zIndex: 2,
                        transition: 'color 0.2s',
                        lineHeight: 1,
                        padding: 0,
                      }}
                      tabIndex={-1}
                    >
                      &#10005;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && bets.length === 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '240px' }}>
            <h2 style={{ color: '#888', fontWeight: 400 }}>Please add your bets</h2>
          </div>
        )}

        {/* Inline CSS for hover effect */}
        <style>
          {`
            .bet-row:hover .delete-x,
            .bet-row:hover .edit-pencil {
              display: inline-block !important;
            }
            .delete-x:hover {
              color: #e74c3c;
            }
            .edit-pencil:hover {
              color: #2980b9;
            }
          `}
        </style>

        {showModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000
            }}
            onClick={() => setShowModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '8px',
                width: '420px',
                maxWidth: '100vw',
                boxSizing: 'border-box',
                boxShadow: '0 4px 24px rgba(0,0,0,0.15)'
              }}
            >
              <h2 style={{ marginTop: 0 }}>Add New Bet</h2>
              <form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
                onSubmit={e => e.preventDefault()}
              >
                {/* Text/number fields */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {[
                          ['market_name', 'Market Name', 'text'],
                          ['event_name', 'Event Name', 'text'],
                          ['bet_name', 'Bet Name', 'text'],
                          ['stake', 'Stake', 'number'],
                          ['odds', 'Odds', 'number']
                          ].map(([key, label, type]) => (
                          <input
                            key={key}
                            type={type}
                            placeholder={label}
                            value={formValues[key]}
                            style={{ ...styles.input, width: '100%' }}
                            onChange={(e) => setFormValues({ ...formValues, [key]: type === 'number' ? e.target.value : e.target.value })}
                            onBlur={() => setFormTouched(true)}
                          />
                          ))}
                        </div>
                        {/* Select fields */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {[
                          ['sportsbook', 'Sportsbook', SPORTSBOOKS],
                          ['sport', 'Sport', SPORTS],
                          ['league', 'League', LEAGUES],
                          ['bet_type', 'Bet Type', BET_TYPES],
                          ['status', 'Status', STATUSES]
                          ].map(([key, label, options]) => (
                          <select
                            key={key}
                            value={formValues[key]}
                            style={{ ...styles.input, width: '100%' }}
                            onChange={(e) => setFormValues({ ...formValues, [key]: e.target.value })}
                          >
                            <option value="">{`Select ${label}`}</option>
                            {options.map(([value, optionLabel]) => (
                            <option key={value} value={value}>{optionLabel}</option>
                            ))}
                          </select>
                          ))}
                        </div>
                        {/* Cashout amount input if status is cashout */}
                        {formValues.status === 'cashout' && (
                          <input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="Cashout Amount"
                          value={formValues.cashout_amount || ''}
                          style={{ ...styles.input, width: '100%' }}
                          onChange={e => setFormValues({ ...formValues, cashout_amount: e.target.value })}
                          onBlur={() => setFormTouched(true)}
                          />
                        )}
                        {/* Checkbox */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={formValues.bonus_bet}
                    onChange={(e) => setFormValues({ ...formValues, bonus_bet: e.target.checked })}
                  /> Bonus Bet
                </label>
                {/* Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                  <button
                    type="button"
                    disabled={!formTouched || !isFormValid}
                    onClick={handleSave}
                    style={{
                      backgroundColor: !formTouched || !isFormValid ? '#ccc' : '#27ae60',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: !formTouched || !isFormValid ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </motion.div>
  );
}

export default HomePage;