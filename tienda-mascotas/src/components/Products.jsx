import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/products.css';

function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [addedProductId, setAddedProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar productos');
        setLoading(false);
      });
  }, []);

  // Filtrado por categoría y búsqueda
  const filteredProducts = products.filter(product => {
    const matchesCategory = filter === 'all' || product.category === filter;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Función para agregar al carrito con límite de cantidad 10
  function addToCart(productId) {
    setCart(prevCart => {
      const item = prevCart.find(i => i.id === productId);
      if (item) {
        if (item.quantity >= 10) {
          alert('Has alcanzado la cantidad máxima para este producto.');
          return prevCart;
        }
        return prevCart.map(i =>
          i.id === productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        const product = products.find(p => p.id === productId);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setAddedProductId(productId);
  }

  // Limpiar la confirmación visual después de 2 segundos
  useEffect(() => {
    if (addedProductId !== null) {
      const timer = setTimeout(() => setAddedProductId(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [addedProductId]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="vps-products-section">
      <h2>Productos</h2>

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        aria-label="Buscar productos"
        style={{ marginBottom: '1rem', padding: '8px', width: '100%', maxWidth: '400px' }}
      />

      {/* Filtros */}
      <div className="vps-product-filters" role="group" aria-label="Filtros de productos">
        {['all', 'dogs', 'cats', 'small-pets', 'birds', 'fish'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'vps-active' : ''}
            aria-pressed={filter === cat}
          >
            {cat === 'all'
              ? 'Todos'
              : cat === 'dogs'
              ? 'Perros'
              : cat === 'cats'
              ? 'Gatos'
              : cat === 'small-pets'
              ? 'Pequeñas Mascotas'
              : cat === 'birds'
              ? 'Aves'
              : 'Peces y Acuarios'}
          </button>
        ))}
      </div>

      {/* Productos */}
      <div className="vps-products-grid">
        {filteredProducts.length === 0 && <p>No se encontraron productos.</p>}
        {filteredProducts.map(product => (
          <article key={product.id} className="vps-product-card" tabIndex={0} aria-label={product.name}>
            <div className="vps-product-image" aria-hidden="true">{product.image}</div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="vps-product-price">${product.price.toLocaleString()}</div>
            <button
              className="vps-add-to-cart"
              onClick={() => addToCart(product.id)}
              disabled={cart.find(i => i.id === product.id)?.quantity >= 10}
              aria-disabled={cart.find(i => i.id === product.id)?.quantity >= 10}
            >
              {addedProductId === product.id ? 'Agregado ✓' : 'Agregar al Carrito'}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Products;