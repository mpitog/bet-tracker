// src/tests/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

// ✅ Mock AuthProvider to just render children
jest.mock('../auth/AuthProvider', () => ({
  AuthProvider: ({ children }) => <>{children}</>
}));

// ✅ Mock PrivateRoute to just render children (skip auth logic)
jest.mock('../auth/PrivateRoute', () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>
}));

// ✅ Mock all page components
jest.mock('../auth/Login', () => () => <div>Login Page</div>);
jest.mock('../HomePage', () => () => <div>Home Page</div>);
jest.mock('../Calculators', () => () => <div>Calculators Page</div>);

describe('App Routing', () => {
  test('renders login page on /login route', () => {
    window.history.pushState({}, 'Login', '/login');
    render(<App />);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('renders home page on / route', () => {
    window.history.pushState({}, 'Home', '/');
    render(<App />);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  test('renders calculators page on /calculators route', () => {
    window.history.pushState({}, 'Calculators', '/calculators');
    render(<App />);
    expect(screen.getByText('Calculators Page')).toBeInTheDocument();
  });
});
