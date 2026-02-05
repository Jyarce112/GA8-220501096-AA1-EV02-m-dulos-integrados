import React from 'react';

const categories = [
  { id: 1, icon: 'fas fa-dog', label: 'Perros', value: 'perros' },
  { id: 2, icon: 'fas fa-cat', label: 'Gatos', value: 'gatos' },
  { id: 3, icon: 'fas fa-dove', label: 'Aves', value: 'aves' },
  { id: 4, icon: 'fas fa-fish', label: 'Peces', value: 'peces' },
];

function Categories({ onCategoryClick }) {
  return (
    <section className="vps-quick-categories">
      <h2>Categorías Populares</h2>
      <div className="vps-categories-grid">
        {categories.map(cat => (
          <div
            key={cat.id}
            className="vps-category-card"
            tabIndex={0}
            role="button"
            aria-label={`Categoría ${cat.label}`}
            onClick={() => onCategoryClick(cat.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onCategoryClick(cat.value);
              }
            }}
          >
            <i className={cat.icon} aria-hidden="true"></i>
            <h3>{cat.label}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;