// src/Calculators.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header'; // Adjust the import path as necessary
import './styles/main.css';
import ArbitrageCalculator from './components/ArbitrageCalculator';

const Calculators = () => {
  return (
    <>
      <Header />
      <div style={{ padding: '1rem' }}>
        <h2>Betting Calculators</h2>
        <ArbitrageCalculator />
        {/* Future calculators will go here */}
      </div>
    </>
  );
};

export default Calculators;