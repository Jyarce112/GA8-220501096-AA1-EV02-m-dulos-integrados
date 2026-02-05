import React, { useState } from 'react';
import '../styles/contact.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // lógica para enviar el formulario (API, email, etc.)
    setSubmitted(true);
  }

  return (
    <section className="vps-contact-content">
      <h2>Contacto</h2>
      {submitted ? (
        <p className="vps-thank-you-message">Gracias por contactarnos. Te responderemos pronto.</p>
      ) : (
        <form className="vps-contact-form" onSubmit={handleSubmit}>
          <div className="vps-form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="vps-form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="vps-form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button className="vps-submit-btn" type="submit">Enviar</button>
        </form>
      )}
    </section>
  );
}

export default Contact;