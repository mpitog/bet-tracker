// src/components/CheckoutButton.js
import axios from 'axios';

const CheckoutButton = () => {
  const handleClick = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/create-checkout-session/`);
      const { checkout_url } = res.data;

      window.location.href = checkout_url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error('Error starting Stripe Checkout session:', error);
    }
  };

  return (
    <button onClick={handleClick} style={{ backgroundColor: '#27ae60', color: '#fff', padding: '0.7rem 1.4rem', borderRadius: '5px' }}>
      Donate
    </button>
  );
};

export default CheckoutButton;
