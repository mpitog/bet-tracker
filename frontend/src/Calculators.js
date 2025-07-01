// src/Calculators.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header'; // Adjust the import path as necessary
import './styles/main.css';

const ArbitrageCalculator = () => {
  const [oddsA, setOddsA] = useState('');
  const [stakeA, setStakeA] = useState('');
  const [oddsB, setOddsB] = useState('');

  const [payoutA, setPayoutA] = useState(0);
  const [stakeB, setStakeB] = useState(0);
  const [payoutB, setPayoutB] = useState(0);
  const [totalStake, setTotalStake] = useState(0);
  const [profit, setProfit] = useState(0);
  const [profitPercent, setProfitPercent] = useState(0);

  useEffect(() => {
    const oA = parseFloat(oddsA);
    const sA = parseFloat(stakeA);
    const oB = parseFloat(oddsB);

    if (isNaN(oA) || isNaN(sA) || isNaN(oB)) return;

    const calculatedPayoutA = oA * sA;
    const calculatedStakeB = calculatedPayoutA / oB;
    const calculatedPayoutB = oB * calculatedStakeB;
    const calculatedTotalStake = sA + calculatedStakeB;
    const calculatedProfit = calculatedPayoutA - calculatedTotalStake;
    const calculatedProfitPercent = (calculatedProfit / calculatedPayoutA) * 100;

    setPayoutA(calculatedPayoutA);
    setStakeB(calculatedStakeB);
    setPayoutB(calculatedPayoutB);
    setTotalStake(calculatedTotalStake);
    setProfit(calculatedProfit);
    setProfitPercent(calculatedProfitPercent);
  }, [oddsA, stakeA, oddsB]);

  const getProfitClass = () => {
    if (profit > 0) return 'profit-positive';
    if (profit < 0) return 'profit-negative';
    return '';
  };

  return (
    <>
      <Header />
      <div style={{ padding: '1rem' }}>
        <h2>Arbitrage Calculator</h2>

        <div className="input-group">
          <label>Decimal Odds A:</label>
          <input
            className="inputField"
            type="number"
            value={oddsA}
            onChange={(e) => setOddsA(e.target.value)}
            step="any"
            min="1"
          />
        </div>

        <div className="input-group">
          <label>Stake A:</label>
          <input
            className="inputField"
            type="number"
            value={stakeA}
            onChange={(e) => setStakeA(e.target.value)}
            step="any"
            min="0"
          />
        </div>

        <div className="input-group">
          <label>Decimal Odds B:</label>
          <input
            className="inputField"
            type="number"
            value={oddsB}
            onChange={(e) => setOddsB(e.target.value)}
            step="any"
            min="1"
          />
        </div>

        <hr />

        <div className="output-group">
          <p><strong>Payout A:</strong> {payoutA.toFixed(2)}</p>
          <p><strong>Stake B:</strong> {stakeB.toFixed(2)}</p>
          <p><strong>Payout B:</strong> {payoutB.toFixed(2)}</p>
          <p><strong>Total Stake:</strong> {totalStake.toFixed(2)}</p>
          <p><strong>Total Payout:</strong> {payoutA.toFixed(2)}</p>
          <p className={getProfitClass()}><strong>Profit:</strong> {profit.toFixed(2)}</p>
          <p className={getProfitClass()}><strong>Profit (%):</strong> {profitPercent.toFixed(2)}%</p>
        </div>
      </div>
    </>
  );
};

export default ArbitrageCalculator;
