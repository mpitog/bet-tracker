//\src\components\ ArbitrageCalculator.js
import React, { useState, useEffect } from 'react';
import '../styles/main.css';

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

    const isBlank = oddsA === '' && stakeA === '' && oddsB === '';

    return (
        <>
            <div className="calculator-container">
                <h2 style={{ marginBottom: '1rem' }}>
                    Arbitrage Calculator
                    <span
                        style={{
                            marginLeft: '8px',
                            cursor: 'pointer',
                            position: 'relative',
                            display: 'inline-block'
                        }}
                        tabIndex={0}
                        onFocus={e => {
                            const tooltip = e.target.querySelector('.tooltip-text');
                            if (tooltip) tooltip.style.visibility = 'visible';
                        }}
                        onBlur={e => {
                            const tooltip = e.target.querySelector('.tooltip-text');
                            if (tooltip) tooltip.style.visibility = 'hidden';
                        }}
                        onMouseEnter={e => {
                            const tooltip = e.currentTarget.querySelector('.tooltip-text');
                            if (tooltip) tooltip.style.visibility = 'visible';
                        }}
                        onMouseLeave={e => {
                            const tooltip = e.currentTarget.querySelector('.tooltip-text');
                            if (tooltip) tooltip.style.visibility = 'hidden';
                        }}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ verticalAlign: 'middle' }}
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12" y2="8" />
                        </svg>
                        <span
                            className="tooltip-text"
                        >
                         Enter the odds for any two-way market in the calculator on the left, and it will determine whether an arbitrage opportunity exists and calculate the optimal stake for each outcome.
                        </span>
                    </span>
                </h2>
                <div className="calculator-grid-two-col">
                    <div>
                        <div className="input-group">
                            <label className="input-label">Decimal Odds A:</label>
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
                            <label className="input-label">Stake A:</label>
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
                            <label className="input-label">Decimal Odds B:</label>
                            <input
                                className="inputField"
                                type="number"
                                value={oddsB}
                                onChange={(e) => setOddsB(e.target.value)}
                                step="any"
                                min="1"
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Stake B:</label>
                            <input
                                className="inputField"
                                type="number"
                                value={isBlank ? "" : stakeB}
                                step="any"
                                min="0"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="output-group" >
                        <p><strong>Payout A:</strong> {payoutA.toFixed(2)}</p>
                        <p><strong>Payout B:</strong> {payoutB.toFixed(2)}</p>
                        <p><strong>Total Stake:</strong> {totalStake.toFixed(2)}</p>
                        <p><strong>Total Payout:</strong> {payoutA.toFixed(2)}</p>
                        <p className={getProfitClass()}><strong>Profit:</strong> {profit.toFixed(2)}</p>
                        <p className={getProfitClass()}><strong>Profit (%):</strong> {profitPercent.toFixed(2)}%</p>
                    </div>
                </div>
            </div>
        </>
    );
};


export default ArbitrageCalculator;
