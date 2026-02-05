import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/accountModal.css';

function AccountModal({ onClose, activeTab = 'login', onLoginSuccess }) {
  const [activeTabState, setActiveTabState] = useState(activeTab);

  // LOGIN
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // REGISTER
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);

  useEffect(() => {
    setActiveTabState(activeTab);
  }, [activeTab]);

  // =====================
  // LOGIN
  // =====================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/login', {
        email: loginEmail,
        password: loginPassword,
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);

      onLoginSuccess(user);
      onClose();
    } catch (error) {
      setLoginError(
        error.response?.data?.error || 'Error al iniciar sesión'
      );
    } finally {
      setLoginLoading(false);
    }
  };

  // =====================
  // REGISTER
  // =====================
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError(null);
    setRegisterLoading(true);

    try {
      await axios.post('http://localhost:4000/register', {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });

      alert('Cuenta creada correctamente. Ahora inicia sesión.');
      setActiveTabState('login');
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
    } catch (error) {
      setRegisterError(
        error.response?.data?.error || 'Error al registrar usuario'
      );
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="account-modal-overlay" onClick={onClose}>
      <div className="account-modal" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="account-modal-header">
          <button
            className={activeTabState === 'login' ? 'active' : ''}
            onClick={() => setActiveTabState('login')}
          >
            Iniciar Sesión
          </button>
          <button
            className={activeTabState === 'register' ? 'active' : ''}
            onClick={() => setActiveTabState('register')}
          >
            Registrarse
          </button>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* CONTENT */}
        <div className="account-modal-content">
          {/* LOGIN */}
          {activeTabState === 'login' && (
            <form onSubmit={handleLogin}>
              <label>Correo electrónico</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />

              <label>Contraseña</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />

              {loginError && <p className="error">{loginError}</p>}

              <button type="submit" disabled={loginLoading}>
                {loginLoading ? 'Ingresando...' : 'Iniciar Sesión'}
              </button>
            </form>
          )}

          {/* REGISTER */}
          {activeTabState === 'register' && (
            <form onSubmit={handleRegister}>
              <label>Nombre completo</label>
              <input
                type="text"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                required
              />

              <label>Correo electrónico</label>
              <input
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />

              <label>Contraseña</label>
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />

              {registerError && <p className="error">{registerError}</p>}

              <button type="submit" disabled={registerLoading}>
                {registerLoading ? 'Creando...' : 'Crear Cuenta'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountModal;