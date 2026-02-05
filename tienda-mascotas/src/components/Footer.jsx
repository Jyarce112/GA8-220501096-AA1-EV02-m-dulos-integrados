import React from 'react';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="vps-footer">
      <div className="vps-footer-container">
        <div className="vps-footer-column">
          <h3>Virtual Pet Shop</h3>
          <p>Tu tienda online de confianza para el cuidado de mascotas</p>
          <div className="vps-social-icons">
            <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">📘</a>
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">📸</a>
            <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">🐦</a>
            <a href="#" aria-label="YouTube" target="_blank" rel="noopener noreferrer">▶️</a>
          </div>
        </div>

        <div className="vps-footer-column">
          <h4>Productos</h4>
          <ul>
            <li><a href="#dogs">Perros</a></li>
            <li><a href="#cats">Gatos</a></li>
            <li><a href="#small-pets">Pequeñas Mascotas</a></li>
            <li><a href="#birds">Aves</a></li>
            <li><a href="#fish">Peces y Acuarios</a></li>
          </ul>
        </div>

        <div className="vps-footer-column">
          <h4>Servicios</h4>
          <ul>
            <li>Guardería</li>
            <li>Veterinario</li>
            <li>Entrenamiento</li>
            <li>Peluquería</li>
          </ul>
        </div>

        <div className="vps-footer-column">
          <h4>Contacto</h4>
          <ul>
            <li>📞 +57 318 222 4457</li>
            <li>✉️ info@virtualpetshop.com</li>
            <li>📍 Pereira, Colombia</li>
          </ul>
        </div>
      </div>

      <div className="vps-footer-bottom">
        <p>© 2025 Virtual Pet Shop. Todos los derechos reservados. Creado por Jairo Andres Yarce</p>
      </div>
    </footer>
  );
}

export default Footer;