import React from 'react';
import Categories from './Categories';
import FeaturedProducts from './FeaturedProducts';
import Testimonials from './Testimonials';

function Home({ setCurrentSection, addToCart, setCategoryFilter }) {
  return (
    <section className="vps-home-section">
      <div className="vps-hero-banner">
        <div className="vps-banner-content">
          <h2>¡Bienvenido a Virtual Pet Shop!</h2>
          <p>Todo lo que tu mascota necesita en un solo lugar</p>
          <button
            className="vps-cta-btn"
            onClick={() => {
              setCategoryFilter(null); // Quitar filtro si hay
              setCurrentSection('products');
            }}
            aria-label="Explorar productos"
          >
            Explorar Productos
          </button>
        </div>
      </div>

      <Categories 
        onCategoryClick={(category) => {
          setCategoryFilter(category);
          setCurrentSection('products');
        }}
      />
      <FeaturedProducts addToCart={addToCart} />
      <Testimonials />
    </section>
  );
}

export default Home;