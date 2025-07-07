// src/HomePage.js
import React, { useEffect, useState } from 'react';
import { useAuth } from './auth/AuthProvider';
import { motion } from 'framer-motion';
import './index.css';
import { SPORTSBOOKS } from './constants/constants';
import { BET_TYPES } from './constants/constants';
import { STATUSES } from './constants/constants';
import { SPORTS } from './constants/constants';
import { LEAGUES } from './constants/constants';
import { requiredFields } from './constants/constants';
import Header from './components/Header';
import './styles/main.css';
import AddBetModal from './components/AddBetModal';
import CheckoutButton from './components/CheckoutButton';

function HomePage() {
  const [bets, setBets] = useState([]);
  const { accessToken, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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
      <div>
        <Header />
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
                <th className="thtd">Created</th>
                <th className="thtd">Sportsbook</th>
                <th className="thtd">Market</th>
                <th className="thtd">Event Name</th>
                <th className="thtd">Sport</th>
                <th className="thtd">League</th>
                <th className="thtd">Type</th>
                <th className="thtd">Bet</th>
                <th className="thtd">Stake</th>
                <th className="thtd">Odds</th>
                <th className="thtd">Status</th>
                <th className="thtd">Payout</th>
                <th className="thtd">Profit</th>
                <th className="thtd">Bonus Bet</th>
                <th className="thtd"></th>
              </tr>
            </thead>
            <tbody>
              {bets.map((bet) => (
                <tr
                  key={bet.id}
                  style={{ position: 'relative', cursor: 'pointer' }}
                  className="bet-row"
                >
                  <td className="thtd">{bet.created_at ? new Date(bet.created_at).toLocaleDateString() : 'N/A'}</td>
                  <td className="thtd">{bet.sportsbook_display || 'N/A'}</td>
                  <td className="thtd">{bet.market_name || 'N/A'}</td>
                  <td className="thtd">{bet.event_name || 'N/A'}</td>
                  <td className="thtd">{bet.sport_display || 'N/A'}</td>
                  <td className="thtd">{bet.league_display || 'N/A'}</td>
                  <td className="thtd">{bet.bet_type_display || 'N/A'}</td>
                  <td className="thtd">{bet.bet_name || 'N/A'}</td>
                  <td className="thtd">{bet.stake ? `$${parseFloat(bet.stake).toFixed(2)}` : 'N/A'}</td>
                  <td className="thtd">{bet.odds || 'N/A'}</td>
                  <td className="thtd" style={{ position: 'relative' }}>
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
                  <td className="thtd">{bet.payout ? `$${parseFloat(bet.payout).toFixed(2)}` : 'N/A'}</td>
                  <td className="thtd"
                    style={{
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
                  <td className="thtd">{bet.bonus_bet ? '✅' : '❌'}</td>
                  <td className="thtd" style={{ width: '32px', position: 'relative', padding: 0 }}>


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
        {/* modal for adding new bet */}
        <AddBetModal
          show={showModal}
          setShowModal={setShowModal}
          formValues={formValues}
          setFormValues={setFormValues}
          handleSave={handleSave}
          SPORTSBOOKS={SPORTSBOOKS}
          SPORTS={SPORTS}
          LEAGUES={LEAGUES}
          BET_TYPES={BET_TYPES}
          STATUSES={STATUSES}
        />
        {/* Checkout button */}
        <div style={{ marginTop: '2rem', textAlign: 'right' }}>
         <CheckoutButton />
        </div>
      </main>

    </div>
  );
}

export default HomePage;