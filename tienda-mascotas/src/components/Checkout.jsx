import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutModal from '../components/CheckoutModal';
import '../styles/checkout.css';

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  // Calcular total desde el carrito
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePaymentSuccess = () => {
    // Limpiar carrito
    setCart([]);

    // Limpiar localStorage si lo usas
    localStorage.removeItem('cart');
    localStorage.removeItem('cartTotal');

    // Volver al home
    navigate('/');
  };

  const handleClose = () => {
    navigate(-1); // volver a la página anterior
  };

  return (
    <div className="checkout-page">
      <CheckoutModal
        total={total}
        onClose={handleClose}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

export default Checkout;