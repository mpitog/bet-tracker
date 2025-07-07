// StripeCheckout.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51RhSbZC6r1RPyowrAl9DNMIhbYtpoaFrIIQLZj0PiIu47fjBITewhy5qrfEjk7Umh3VXCXG9MDWANBGwErKSt7LJ00WGCCCSrl');

const StripeCheckout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeCheckout;
