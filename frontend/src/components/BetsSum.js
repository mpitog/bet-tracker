import React, { useEffect, useState } from 'react';
import { fetchBetSummary } from '../api/axios';
import AddBetModal from './AddBetModal';

const BetsSum = () => {
  const [summary, setSummary] = useState(null);

  const loadSummary = async () => {
    try {
      const data = await fetchBetSummary();
      setSummary(data);
    } catch (err) {
      console.error('Error loading summary:', err);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

return (
  <>
    <h2 className='h2'>Summary</h2>
    {summary && (
      <div className="bet-summary">
        <p>
          Total Payout:{' '}
          <span
            style={{
              color:
                summary.total_payout > 0
                  ? 'green'
                  : summary.total_payout < 0
                  ? 'red'
                  : 'inherit',
            }}
          >
            {summary.total_payout.toFixed(2)}
          </span>
        </p>
        <p>
          Total Profit:{' '}
          <span
            style={{
              color:
                summary.total_profit > 0
                  ? 'green'
                  : summary.total_profit < 0
                  ? 'red'
                  : 'inherit',
            }}
          >
            {summary.total_profit.toFixed(2)}
          </span>
        </p>
      </div>
    )}
  </>
);

};

export default BetsSum;