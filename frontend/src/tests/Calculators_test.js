// src/tests/Calculators.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Calculators from '../Calculators';
import '@testing-library/jest-dom';

jest.mock('../components/Header', () => () => <div>Header</div>);
jest.mock('../components/ArbitrageCalculator', () => () => <div>Arbitrage Calculator</div>);
jest.mock('../components/ExpectedvalueCalculator', () => () => <div>Expected Value Calculator</div>);

describe('Calculators Page', () => {
  test('renders header and main title', () => {
    render(<Calculators />);
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Betting Calculators')).toBeInTheDocument();
  });

  test('renders Arbitrage and Expected Value calculators', () => {
    render(<Calculators />);
    expect(screen.getByText('Arbitrage Calculator')).toBeInTheDocument();
    expect(screen.getByText('Expected Value Calculator')).toBeInTheDocument();
  });
});
