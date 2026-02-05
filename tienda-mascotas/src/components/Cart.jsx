import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/cart.css';

function Cart({ cart, setCart, onClose }) {
  const navigate = useNavigate();

  const changeQuantity = (id, delta) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = id => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 👉 Ir a /checkout
  const handleProceedToPayment = () => {
    // Guardar info para el checkout
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartTotal', total);

    onClose();              // cerrar modal carrito
    navigate('/checkout');  // navegar a checkout
  };

  // Bloquear scroll SOLO mientras el carrito está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="cart-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cart-modal" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Carrito de Compras</h2>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Cerrar carrito"
          >
            ×
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 && <p>Tu carrito está vacío</p>}

          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">{item.image}</div>

              <div className="cart-item-details">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">
                  ${item.price.toLocaleString()}
                </p>

                <div className="cart-item-quantity">
                  <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <>
            <div className="cart-total">
              <strong>Total:</strong> ${total.toLocaleString()}
            </div>

            <button
              className="checkout-btn"
              onClick={handleProceedToPayment}
            >
              Proceder al Pago
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;