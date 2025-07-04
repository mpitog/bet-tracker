// src/Calculators.js
import React from 'react';
import Header from './components/Header'; // Adjust the import path as necessary
import './styles/main.css';
import ArbitrageCalculator from './components/ArbitrageCalculator';
import ExpectedvalueCalculator from './components/ExpectedvalueCalculator';

const Calculators = () => {
return (
    <>
        <Header />
        <div className='calculator-flex-col'>
            <h2>Betting Calculators</h2>
            <div className='main-calculator-grid-two-col' >
                <ArbitrageCalculator />
                <ExpectedvalueCalculator />
                {/* Future calculators will go here */}
            </div>
        </div>
    </>
);
};

export default Calculators;