import React, { useMemo, useState, useRef, useEffect } from 'react';
import '../styles/header.css';

const menuItems = [
  { key: 'home', label: 'Inicio' },
  { key: 'products', label: 'Productos' },
  { key: 'services', label: 'Servicios' },
  { key: 'about', label: 'Nosotros' },
  { key: 'blog', label: 'Blog' },
  { key: 'contact', label: 'Contacto' },
  { key: 'policies', label: 'Políticas' },
];

function Header({
  currentSection,
  setCurrentSection,
  cart,
  onCartClick,
  onOpenAccountModal,
  user,
  onLogout,
}) {
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [cart]
  );

  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="vps-header">
      {/* Logo */}
      <div
        className="vps-logo"
        tabIndex={0}
        aria-label="Virtual Pet Shop logo"
        onClick={() => setCurrentSection('home')}
        style={{ cursor: 'pointer' }}
      >
        🐾 Virtual Pet Shop
      </div>

      {/* Navegación */}
      <nav
        className="vps-nav-menu"
        aria-label="Menú de navegación principal"
      >
        {menuItems.map((item) => (
          <button
            key={item.key}
            className={`vps-nav-button ${
              currentSection === item.key ? 'vps-active' : ''
            }`}
            onClick={() => setCurrentSection(item.key)}
            aria-current={
              currentSection === item.key ? 'page' : undefined
            }
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Acciones derecha */}
      <div
        className="header-actions"
        style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
      >
        {/* Mi Cuenta */}
        <div style={{ position: 'relative' }} ref={accountMenuRef}>
          <button
            className="btn-account"
            onClick={() => setAccountMenuOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={accountMenuOpen}
            aria-controls="account-menu"
          >
            👤 {user ? user.name : 'Mi Cuenta'}
          </button>

          {accountMenuOpen && (
            <ul
              id="account-menu"
              role="menu"
              style={menuStyle}
            >
              {!user ? (
                <>
                  <li role="none">
                    <button
                      role="menuitem"
                      style={menuItemStyle}
                      onClick={() => {
                        onOpenAccountModal('login');
                        setAccountMenuOpen(false);
                      }}
                    >
                      Iniciar Sesión
                    </button>
                  </li>
                  <li role="none">
                    <button
                      role="menuitem"
                      style={menuItemStyle}
                      onClick={() => {
                        onOpenAccountModal('register');
                        setAccountMenuOpen(false);
                      }}
                    >
                      Crear Cuenta
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li role="none">
                    <button
                      role="menuitem"
                      style={menuItemStyle}
                      onClick={() => {
                        setCurrentSection('profile');
                        setAccountMenuOpen(false);
                      }}
                    >
                      Mi Perfil
                    </button>
                  </li>
                  <li role="none">
                    <button
                      role="menuitem"
                      style={menuItemStyle}
                      onClick={() => {
                        onLogout();
                        setAccountMenuOpen(false);
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>

        {/* Carrito */}
        <div
          className="vps-cart-icon"
          role="button"
          tabIndex={0}
          aria-label={`Carrito con ${totalItems} productos`}
          onClick={onCartClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onCartClick();
          }}
          style={{ cursor: 'pointer' }}
        >
          🛒 <span className="vps-cart-count">{totalItems}</span>
        </div>
      </div>
    </header>
  );
}

/* estilos inline reutilizables */
const menuStyle = {
  position: 'absolute',
  top: '100%',
  right: 0,
  background: 'white',
  border: '1px solid #ccc',
  borderRadius: '6px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
  listStyle: 'none',
  padding: '8px 0',
  margin: 0,
  minWidth: '160px',
  zIndex: 1000,
};

const menuItemStyle = {
  width: '100%',
  padding: '10px 20px',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: '0.95rem',
  color: '#333',
};

export default Header;