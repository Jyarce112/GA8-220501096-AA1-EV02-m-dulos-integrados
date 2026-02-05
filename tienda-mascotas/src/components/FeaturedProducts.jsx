import React from 'react';

const featuredProducts = [
  {
    id: 1,
    icon: 'fas fa-dog',
    name: 'Alimento Premium para Perros',
    description: 'Alimento balanceado de alta calidad para perros adultos',
    price: 45000,
    category: 'perros',
  },
  {
    id: 2,
    icon: 'fas fa-cat',
    name: 'Arena para Gatos',
    description: 'Arena aglomerante con control de olores',
    price: 25000,
    category: 'gatos',
  },
  {
    id: 3,
    icon: 'fas fa-hamster',
    name: 'Jaula para Hámster',
    description: 'Jaula espaciosa con accesorios incluidos',
    price: 120000,
    category: 'hamsters',
  },
  {
    id: 4,
    icon: 'fas fa-crow',
    name: 'Semillas para Canarios',
    description: 'Mezcla nutritiva de semillas para canarios',
    price: 15000,
    category: 'aves',
  },
];

function FeaturedProducts({ addToCart }) {
  return (
    <section className="vps-featured-products">
      <h2>Productos Destacados</h2>
      <div className="vps-products-grid">
        {featuredProducts.map(product => (
          <div
            key={product.id}
            className="vps-product-card"
            tabIndex={0}
            aria-label={product.name}
          >
            <div className="vps-product-image">
              <i
                className={product.icon}
                aria-hidden="true"
                style={{ fontSize: '48px', color: '#2c5aa0' }}
              ></i>
            </div>
            <div className="vps-product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="vps-product-price">
                ${product.price.toLocaleString()}
              </div>
              <button
                className="vps-add-to-cart"
                onClick={() => addToCart(product)}
                aria-label={`Agregar ${product.name} al carrito`}
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;