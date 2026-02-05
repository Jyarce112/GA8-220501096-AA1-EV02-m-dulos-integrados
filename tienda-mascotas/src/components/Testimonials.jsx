import React from 'react';
import '../styles/testimonials.css';

const testimonials = [
  {
    id: 1,
    stars: 5,
    text: 'Excelente servicio y productos de calidad. Mi perro Max está muy feliz con su nueva comida.',
    customer: 'María González',
    verified: true,
  },
  {
    id: 2,
    stars: 5,
    text: 'La entrega fue súper rápida y el empaque perfecto. Definitivamente volveré a comprar.',
    customer: 'Carlos Rodríguez',
    verified: true,
  },
  {
    id: 3,
    stars: 5,
    text: 'Gran variedad de productos para mi gato. Los precios son muy competitivos.',
    customer: 'Ana Martínez',
    verified: true,
  },
];

function Testimonials() {
  return (
    <section className="vps-testimonials">
      <h2>Lo que dicen nuestros clientes</h2>
      <div className="vps-testimonials-grid">
        {testimonials.map(({ id, stars, text, customer, verified }) => (
          <article
            key={id}
            className="vps-testimonial-card"
            tabIndex={0}
            aria-label={`Testimonio de ${customer}`}
          >
            <div className="vps-stars" aria-label={`${stars} estrellas`}>
              {'★'.repeat(stars)}
            </div>
            <p className="vps-testimonial-text">"{text}"</p>
            <div className="vps-customer">
              <strong>{customer}</strong> {verified && <span className="vps-verified">Cliente verificado</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;