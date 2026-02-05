import React, { useState, useEffect } from 'react';
import '../styles/checkout.css'; // Asegúrate de tener este archivo con los estilos recomendados

function CheckoutModal({ total, onClose, onPaymentSuccess }) {
  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');

    // Validación simple
    if (!form.name || !form.cardNumber || !form.expiry || !form.cvv) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);

    // Simular proceso de pago con delay
    setTimeout(() => {
      setLoading(false);
      onPaymentSuccess();
      onClose();
      alert('Pago realizado con éxito. ¡Gracias por tu compra!');
    }, 2000);
  };

  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="checkout-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      tabIndex={-1}
    >
      <div className="checkout-modal" onClick={e => e.stopPropagation()}>
        <h2 id="checkout-title">Pago</h2>
        <p>Total a pagar: ${total.toLocaleString()}</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Nombre en la tarjeta:
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Juan Pérez"
              autoComplete="cc-name"
            />
          </label>
          <label>
            Número de tarjeta:
            <input
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              maxLength={16}
              placeholder="1234 5678 9012 3456"
              autoComplete="cc-number"
              inputMode="numeric"
            />
          </label>
          <label>
            Fecha de expiración (MM/AA):
            <input
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              maxLength={5}
              placeholder="12/24"
              autoComplete="cc-exp"
              inputMode="numeric"
            />
          </label>
          <label>
            CVV:
            <input
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              maxLength={3}
              placeholder="123"
              autoComplete="cc-csc"
              inputMode="numeric"
            />
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <button type="submit" disabled={loading}>
              {loading ? 'Procesando...' : 'Pagar'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn-cancel"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;