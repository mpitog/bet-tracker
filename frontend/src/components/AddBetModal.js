// components/AddBetModal.js
import React, { useState, useMemo } from 'react';

const AddBetModal = ({
  show,
  setShowModal,
  formValues,
  setFormValues,
  handleSave,
  SPORTSBOOKS,
  SPORTS,
  LEAGUES,
  BET_TYPES,
  STATUSES
}) => {
const requiredFields = [
  'market_name','bet_date', 'event_name', 'bet_name', 'stake', 'odds',
  'sportsbook', 'sport', 'league', 'bet_type', 'status'
];

const [formTouched, setFormTouched] = useState(false);
const isFormValid = useMemo(() =>
  requiredFields.every(
    (field) =>
      formValues[field] !== '' &&
      formValues[field] !== null &&
      formValues[field] !== undefined
  ),
  [formValues]
);

if (!show) return null;
  return (
    <div
      className="modal-overlay"
      onClick={() => setShowModal(false)}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ marginTop: 0 }}>Add New Bet</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={e => e.preventDefault()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              ['bet_date', 'Bet Date', 'date'],
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
                className="inputField"
                onChange={(e) => {
                  setFormValues({ ...formValues, [key]: e.target.value });
                  setFormTouched(true);
                }}
              />
            ))}
          </div>

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
                className="inputField"
                onChange={(e) => {
                  setFormValues({ ...formValues, [key]: e.target.value });
                  setFormTouched(true);
                }}
              >
                <option value="">{`Select ${label}`}</option>
                {options.map(([value, optionLabel]) => (
                  <option key={value} value={value}>{optionLabel}</option>
                ))}
              </select>
            ))}
          </div>

          {formValues.status === 'cashout' && (
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Cashout Amount"
              value={formValues.cashout_amount || ''}
              className="inputField"
              onChange={e => {
                setFormValues({ ...formValues, cashout_amount: e.target.value });
                setFormTouched(true);
              }}
            />
          )}

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input
              type="checkbox"
              checked={formValues.bonus_bet}
              onChange={(e) => {
                setFormValues({ ...formValues, bonus_bet: e.target.checked });
                setFormTouched(true);
              }}
            /> Bonus Bet
          </label>

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
  );
};

export default AddBetModal;