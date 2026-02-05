import React from 'react';
import '../styles/about.css';

function About() {
  return (
    <section className="about-container">
      <h1 className="about-title">Quiénes Somos</h1>

      <div className="about-card">
        <h2>🐾 Virtual Pet Shop</h2>
        <p>
          Virtual Pet Shop es una tienda online especializada en productos y
          servicios para mascotas. Brindamos la mejor experiencia de compra
          para los amantes de los animales, con productos de alta calidad y
          atención confiable.
        </p>
      </div>

      <div className="about-card">
        <h2>📜 Historia de la Tienda</h2>
        <p>
          Fundada en 2020, Virtual Pet Shop nació del amor por los animales y
          la necesidad de crear un espacio donde los dueños de mascotas
          encontraran todo lo necesario para su cuidado.
        </p>
      </div>

      <div className="about-card">
        <h2>❤️ Compromiso con el Bienestar Animal</h2>
        <p>
          Promovemos el bienestar animal a través de productos éticos,
          colaboraciones con refugios locales y educación sobre el cuidado
          responsable de las mascotas.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-box">
          <h3>🎯 Misión</h3>
          <p>
            Proporcionar productos y servicios de alta calidad que mejoren
            la vida de las mascotas y fortalezcan el vínculo con sus dueños.
          </p>
        </div>

        <div className="about-box">
          <h3>🚀 Visión</h3>
          <p>
            Ser la tienda online líder en productos para mascotas en Colombia,
            reconocida por innovación, confianza y compromiso.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;