import React, { useEffect, useState } from 'react';

function Profile() {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', address: '' });
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error(err));
  }, [token]);

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:4000/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
      }),
    })
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Mi Perfil</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input name="name" value={profile.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input name="email" value={profile.email} disabled />
        </label>
        <br />
        <label>
          Teléfono:
          <input name="phone" value={profile.phone || ''} onChange={handleChange} />
        </label>
        <br />
        <label>
          Dirección:
          <input name="address" value={profile.address || ''} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Actualizar Perfil</button>
      </form>
    </div>
  );
}

export default Profile;