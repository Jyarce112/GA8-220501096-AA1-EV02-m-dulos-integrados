import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/profile.css';

function Profile({ user, setUser }) {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  // =====================
  // CARGAR PERFIL
  // =====================
  useEffect(() => {
    if (!token) {
      setError('No has iniciado sesión');
      setLoading(false);
      return;
    }

    axios
      .get('http://localhost:4000/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch(() => {
        setError('Error al cargar el perfil');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  // =====================
  // HANDLERS
  // =====================
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const res = await axios.put(
        'http://localhost:4000/profile',
        {
          name: profile.name,
          phone: profile.phone,
          address: profile.address,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(res.data.message || 'Perfil actualizado correctamente');

      // Actualizar usuario global
      setUser((prev) => ({
        ...prev,
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
      }));
    } catch {
      setError('Error al guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  // =====================
  // ESTADOS
  // =====================
  if (loading) {
    return <p style={{ textAlign: 'center' }}>Cargando perfil…</p>;
  }

  if (error) {
    return (
      <p style={{ textAlign: 'center', color: 'red' }}>
        {error}
      </p>
    );
  }

  // =====================
  // UI
  // =====================
  return (
    <div className="profile-container">
      <h2>Mi Perfil</h2>

      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={profile.email}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="text"
            name="phone"
            value={profile.phone || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            name="address"
            value={profile.address || ''}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
}

export default Profile;