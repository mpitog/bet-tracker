//\src\components/// ExpectedvalueCalculator.js
import React, { useState, useEffect } from 'react';
import '../styles/main.css';

const ExpectedvalueCalculator = () => {
    const [oddsA, setOddsA] = useState('');
    const [stakeA, setStakeA] = useState('');
    const [fairWinProb, setFairWinProb] = useState('');

    const [fairLossProb, setFairLossProb] = useState(0);
    const [expectedValue, setExpectedValue] = useState(0);
    const [profit, setProfit] = useState(0);
    useEffect(() => {
        const oA = parseFloat(oddsA);
        const sA = parseFloat(stakeA);
        const pWin = parseFloat(fairWinProb);
        if (isNaN(oA) || isNaN(sA) || isNaN(pWin)) {
            setFairLossProb(0);
            setExpectedValue(0);
            return;
        }

        const pLoss = 1 - pWin;
        const ev = (pWin * (oA * sA - sA)) - (pLoss * sA);

        setFairLossProb(pLoss);
        setExpectedValue(ev);
    }, [oddsA, stakeA, fairWinProb]);

    const getProfitClass = () => {
        if (expectedValue > 0) return 'profit-positive';
        if (expectedValue < 0) return 'profit-negative';
        return '';
    };

    const isBlank = oddsA === '' && stakeA === '' && fairWinProb === '';

    return (
        <>
            <div className="calculator-container">
                <h2 style={{ marginBottom: '1rem' }}>
                    Expected Value Calculator
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
                            Calculates your profit margin against the sportsbook for a specific bet. The Expected Value (EV) Calculator uses three inputs: your stake, the odds of your wager, and the implied probability of winning.
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
                            <label className="input-label">Fair Win Prob. (0-1):</label>
                            <input
                                className="inputField"
                                type="number"
                                value={fairWinProb}
                                onChange={(e) => setFairWinProb(e.target.value)}
                                step="any"
                                min="0"
                                max="1"
                            />
                        </div>
                    </div>

                    <div className="output-group">
                        <p><strong>Fair Loss Probability:</strong> {isBlank ? '' : fairLossProb.toFixed(4)}</p>
                        <p className={getProfitClass()}><strong>Expected Value:</strong> {isBlank ? '' : expectedValue.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </>
    );
};


export default ExpectedvalueCalculator;
