import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar({ cartCount }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/productos' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contacto', path: '/contacto' },
    { name: 'Políticas', path: '/politicas' },
  ];

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="vps-navbar">
      <div className="vps-logo">Virtual Pet Shop</div>
      <div
        className="vps-hamburger"
        onClick={toggleMenu}
        aria-label="Menú"
        aria-expanded={menuOpen}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter') toggleMenu(); }}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`vps-nav-menu ${menuOpen ? 'vps-open' : ''}`}>
        {menuItems.map(item => (
          <li key={item.path} className={location.pathname === item.path ? 'vps-active' : ''}>
            <Link to={item.path} onClick={closeMenu}>{item.name}</Link>
          </li>
        ))}
        <li className="vps-cart-icon">
          <Link to="/carrito" onClick={closeMenu} aria-label="Carrito de compras">
            🛒
            {cartCount > 0 && <span className="vps-cart-count">{cartCount}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;