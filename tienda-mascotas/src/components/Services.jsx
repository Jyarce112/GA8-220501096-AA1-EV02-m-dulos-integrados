import React, { useState } from 'react';
import '../styles/services.css';

const servicesList = [
  {
    id: 1,
    icon: 'fas fa-bone',
    title: 'Paseo de Mascotas',
    description: 'Servicio profesional de paseo para que tu mascota se mantenga activa y feliz.',
  },
  {
    id: 2,
    icon: 'fas fa-cut',
    title: 'Peluquería Canina',
    description: 'Corte, baño y cuidado especializado para el pelaje de tu mascota.',
  },
  {
    id: 3,
    icon: 'fas fa-stethoscope',
    title: 'Consulta Veterinaria',
    description: 'Atención médica para mantener la salud y bienestar de tu mascota.',
  },
  {
    id: 4,
    icon: 'fas fa-dog',
    title: 'Entrenamiento',
    description: 'Clases y asesorías para el buen comportamiento y adiestramiento.',
  },
];

const adoptablePets = [
  {
    id: 1,
    name: 'Max',
    species: 'Perro',
    age: '3 años',
    description: 'Un perro amigable y juguetón que busca un hogar amoroso.',
  },
  {
    id: 2,
    name: 'Luna',
    species: 'Gato',
    age: '2 años',
    description: 'Gata tranquila y cariñosa, ideal para familias.',
  },
  {
    id: 3,
    name: 'Paco',
    species: 'Conejo',
    age: '1 año',
    description: 'Conejo activo y curioso, perfecto para niños.',
  },
];

function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', date: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [adoptionRequests, setAdoptionRequests] = useState([]);

  // Manejo de formulario para reservar servicio
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aquí podrías enviar datos a backend o API
    setFormSubmitted(true);
  }

  // Función para solicitar adopción
  function requestAdoption(petId) {
    if (adoptionRequests.includes(petId)) {
      alert('Ya has solicitado adoptar a esta mascota.');
      return;
    }
    setAdoptionRequests(prev => [...prev, petId]);
    alert('Solicitud de adopción enviada. Nos pondremos en contacto contigo pronto.');
  }

  return (
    <section className="vps-services-section">
      <h2>Servicios</h2>
      <div className="vps-services-grid">
        {servicesList.map(service => (
          <article
            key={service.id}
            className="vps-service-card"
            tabIndex={0}
            aria-label={service.title}
            onClick={() => {
              setSelectedService(service);
              setFormSubmitted(false);
              setFormData({ name: '', email: '', date: '' });
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className="vps-service-icon" aria-hidden="true">
              <i className={service.icon} style={{ fontSize: '3rem', color: '#2c5aa0' }}></i>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>

      {/* Formulario de reserva de servicio */}
      {selectedService && (
        <div className="vps-service-form-container">
          <h3>Reservar: {selectedService.title}</h3>
          {formSubmitted ? (
            <p className="vps-thank-you-message">
              Gracias por reservar el servicio de {selectedService.title}. Nos contactaremos contigo pronto.
            </p>
          ) : (
            <form className="vps-service-form" onSubmit={handleSubmit}>
              <label>
                Nombre:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Fecha deseada:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">Enviar Reserva</button>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="vps-cancel-btn"
              >
                Cancelar
              </button>
            </form>
          )}
        </div>
      )}

      {/* Sección de adopción */}
      <section className="vps-adoption-section">
        <h2>Adopta una Mascota</h2>
        <div className="vps-adoption-grid">
          {adoptablePets.map(pet => (
            <article key={pet.id} className="vps-adoption-card" tabIndex={0} aria-label={`Mascota ${pet.name}`}>
              <h3>{pet.name}</h3>
              <p><strong>Especie:</strong> {pet.species}</p>
              <p><strong>Edad:</strong> {pet.age}</p>
              <p>{pet.description}</p>
              <button
                onClick={() => requestAdoption(pet.id)}
                disabled={adoptionRequests.includes(pet.id)}
                aria-disabled={adoptionRequests.includes(pet.id)}
              >
                {adoptionRequests.includes(pet.id) ? 'Solicitud Enviada' : 'Solicitar Adopción'}
              </button>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Services;