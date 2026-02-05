// Global variables
let currentSection = 'home';
let cart = [];
let products = [];
let blogPosts = [];
let currentUser = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  loadProducts();
  loadBlogPosts();
  showSection('home');
  updateCartCount();
  loadFeaturedProducts();
  setupEventListeners();
}

function setupEventListeners() {
  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
  
  // Close modals when clicking outside
  window.addEventListener('click', function(event) {
    const accountModal = document.getElementById('account-modal');
    const cartModal = document.getElementById('cart-modal');
    
    if (event.target === accountModal) {
      toggleAccount();
    }
    if (event.target === cartModal) {
      toggleCart();
    }
  });
}

// Navigation functions
function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));
  
  // Show selected section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }
  
  // Update navigation
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => link.classList.remove('active'));
  
  const activeLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
  
  currentSection = sectionId;
  
  // Load section-specific content
  if (sectionId === 'products') {
    showProducts('all');
  } else if (sectionId === 'blog') {
    showBlogCategory('all');
  } else if (sectionId === 'policies') {
    showPolicy('faq');
  }
}

// Product functions
function loadProducts() {
  products = [
    {
      id: 1,
      name: 'Alimento Premium para Perros',
      category: 'dogs',
      price: 45000,
      image: '🐕',
      description: 'Alimento balanceado de alta calidad para perros adultos'
    },
    {
      id: 2,
      name: 'Arena para Gatos',
      category: 'cats',
      price: 25000,
      image: '🐱',
      description: 'Arena aglomerante con control de olores'
    },
    {
      id: 3,
      name: 'Jaula para Hámster',
      category: 'small-pets',
      price: 120000,
      image: '🐹',
      description: 'Jaula espaciosa con accesorios incluidos'
    },
    {
      id: 4,
      name: 'Semillas para Canarios',
      category: 'birds',
      price: 15000,
      image: '🐦',
      description: 'Mezcla nutritiva de semillas para canarios'
    },
    {
      id: 5,
      name: 'Filtro para Acuario',
      category: 'fish',
      price: 85000,
      image: '🐠',
      description: 'Sistema de filtración completo para acuarios'
    },
    {
      id: 6,
      name: 'Collar Antipulgas',
      category: 'dogs',
      price: 35000,
      image: '🐕',
      description: 'Collar con protección de 8 meses'
    },
    {
      id: 7,
      name: 'Rascador para Gatos',
      category: 'cats',
      price: 65000,
      image: '🐱',
      description: 'Torre rascadora con múltiples niveles'
    },
    {
      id: 8,
      name: 'Alimento para Conejos',
      category: 'small-pets',
      price: 28000,
      image: '🐰',
      description: 'Pellets nutritivos para conejos'
    }
  ];
}

function showProducts(category) {
  const productsGrid = document.getElementById('products-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  // Update filter buttons
  filterBtns.forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`[onclick="showProducts('${category}')"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
  
  // Filter products
  let filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
  
  // Render products
  productsGrid.innerHTML = filteredProducts.map(product => `
    <div class="product-card">
      <div class="product-image">${product.image}</div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-price">$${product.price.toLocaleString()}</div>
        <button class="add-to-cart" onclick="addToCart(${product.id})">
          Agregar al Carrito
        </button>
      </div>
    </div>
  `).join('');
}

function loadFeaturedProducts() {
  const featuredGrid = document.getElementById('featured-products-grid');
  const featuredProducts = products.slice(0, 4);
  
  featuredGrid.innerHTML = featuredProducts.map(product => `
    <div class="product-card">
      <div class="product-image">${product.image}</div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-price">$${product.price.toLocaleString()}</div>
        <button class="add-to-cart" onclick="addToCart(${product.id})">
          Agregar al Carrito
        </button>
      </div>
    </div>
  `).join('');
}

// Cart functions
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  updateCartCount();
  showCartNotification();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartDisplay();
  updateCartCount();
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;
  
  item.quantity += change;
  
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    updateCartDisplay();
    updateCartCount();
  }
}

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
    cartTotal.textContent = '0';
    return;
  }
  
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="product-image">${item.image}</div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="cart-item-price">$${item.price.toLocaleString()}</div>
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          <button class="remove-item" onclick="removeFromCart(${item.id})">Eliminar</button>
        </div>
      </div>
    </div>
  `).join('');
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = total.toLocaleString();
}

function toggleCart() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.classList.toggle('active');
  
  if (cartModal.classList.contains('active')) {
    updateCartDisplay();
  }
}

function proceedToCheckout() {
  if (cart.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  
  alert('Redirigiendo al proceso de pago...');
  // Here you would implement the checkout process
}

function showCartNotification() {
  // Simple notification - you could enhance this with a toast notification
  const notification = document.createElement('div');
  notification.textContent = 'Producto agregado al carrito';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--success-color);
    color: white;
    padding: 15px 20px;
    border-radius: var(--border-radius);
    z-index: 3000;
    animation: fadeInUp 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Services functions
function showService(serviceType) {
  const serviceDetails = document.getElementById('service-details');
  
  const services = {
    daycare: {
      title: 'Guardería para Mascotas',
      content: `
        <h3>Guardería para Mascotas</h3>
        <p>Ofrecemos un servicio de guardería profesional para tu mascota mientras no estás en casa.</p>
        <h4>Servicios incluidos:</h4>
        <ul>
          <li>Cuidado personalizado las 24 horas</li>
          <li>Alimentación según horarios establecidos</li>
          <li>Ejercicio y tiempo de juego</li>
          <li>Administración de medicamento si es necesario</li>
          <li>Reportes diarios con fotos</li>
        </ul>
        <p><strong>Precio:</strong> Desde $50,000 por día</p>
        <button class="cta-btn">Reservar Ahora</button>
      `
    },
    veterinary: {
      title: 'Consulta Veterinaria',
      content: `
        <h3>Consulta Veterinaria</h3>
        <p>Contamos con veterinarios certificados para el cuidado de la salud de tu mascota.</p>
        <h4>Servicios disponibles:</h4>
        <ul>
          <li>Consultas generales</li>
          <li>Vacunación completa</li>
          <li>Desparasitación</li>
          <li>Cirugías menores</li>
          <li>Exámenes de laboratorio</li>
          <li>Emergencias veterinarias</li>
        </ul>
        <p><strong>Precio:</strong> Consulta desde $80,000</p>
        <button class="cta-btn">Agendar Cita</button>
      `
    },
    training: {
      title: 'Entrenamiento y Adiestramiento',
      content: `
        <h3>Entrenamiento y Adiestramiento</h3>
        <p>Programas de entrenamiento profesional para mejorar el comportamiento de tu mascota.</p>
        <h4>Programas disponibles:</h4>
        <ul>
          <li>Obediencia básica</li>
          <li>Corrección de comportamientos</li>
          <li>Socialización</li>
          <li>Entrenamiento avanzado</li>
          <li>Preparación para competencias</li>
        </ul>
        <p><strong>Precio:</strong> Desde $120,000 por sesión</p>
        <button class="cta-btn">Iniciar Entrenamiento</button>
      `
    },
    grooming: {
      title: 'Peluquería Canina',
      content: `
        <h3>Peluquería Canina</h3>
        <p>Servicios completos de estética y cuidado personal para tu mascota.</p>
        <h4>Servicios incluidos:</h4>
        <ul>
          <li>Baño con productos especializados</li>
          <li>Corte de pelo según raza</li>
          <li>Corte de uñas</li>
          <li>Limpieza de oídos</li>
          <li>Cepillado dental</li>
          <li>Tratamientos especiales para piel</li>
        </ul>
        <p><strong>Precio:</strong> Desde $60,000</p>
        <button class="cta-btn">Reservar Cita</button>
      `
    }
  };
  
  const service = services[serviceType];
  if (service) {
    serviceDetails.innerHTML = service.content;
    serviceDetails.classList.add('active');
  }
}

// Blog functions
function loadBlogPosts() {
  blogPosts = [
    {
      id: 1,
      title: 'Cómo cuidar a tu cachorro en sus primeros meses',
      category: 'care',
      excerpt: 'Consejos esenciales para el cuidado de cachorros recién nacidos...',
      date: '2025-01-15',
      image: '🐶'
    },
    {
      id: 2,
      title: 'La mejor alimentación para gatos senior',
      category: 'nutrition',
      excerpt: 'Descubre qué alimentos son ideales para gatos mayores...',
      date: '2025-01-12',
      image: '🐱'
    },
    {
      id: 3,
      title: 'Signos de enfermedad en mascotas pequeñas',
      category: 'health',
      excerpt: 'Aprende a identificar síntomas de enfermedad en tu mascota...',
      date: '2025-01-10',
      image: '🏥'
    },
    {
      id: 4,
      title: 'Ejercicios diarios para perros activos',
      category: 'care',
      excerpt: 'Rutinas de ejercicio para mantener a tu perro saludable...',
      date: '2025-01-08',
      image: '🎾'
    },
    {
      id: 5,
      title: 'Nutrición balanceada para aves domésticas',
      category: 'nutrition',
      excerpt: 'Todo lo que necesitas saber sobre la alimentación de aves...',
      date: '2025-01-05',
      image: '🐦'
    },
    {
      id: 6,
      title: 'Prevención de parásitos en mascotas',
      category: 'health',
      excerpt: 'Métodos efectivos para prevenir pulgas, garrapatas y más...',
      date: '2025-01-03',
      image: '🛡️'
    }
  ];
}

function showBlogCategory(category) {
  const blogGrid = document.getElementById('blog-grid');
  const filterBtns = document.querySelectorAll('.blog-filter');
  
  // Update filter buttons
  filterBtns.forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`[onclick="showBlogCategory('${category}')"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
  
  // Filter blog posts
  let filteredPosts = category === 'all' ? blogPosts : blogPosts.filter(p => p.category === category);
  
  // Render blog posts
  blogGrid.innerHTML = filteredPosts.map(post => `
    <div class="blog-card">
      <div class="blog-image">${post.image}</div>
      <div class="blog-content">
        <h3>${post.title}</h3>
        <div class="blog-meta">
          <span>${formatDate(post.date)}</span> • 
          <span>${getCategoryName(post.category)}</span>
        </div>
        <p class="blog-excerpt">${post.excerpt}</p>
      </div>
    </div>
  `).join('');
}

function getCategoryName(category) {
  const categories = {
    care: 'Cuidado',
    nutrition: 'Alimentación',
    health: 'Salud'
  };
  return categories[category] || category;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Account functions
function toggleAccount() {
  const accountModal = document.getElementById('account-modal');
  accountModal.classList.toggle('active');
}

function showAccountTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  const tabBtns = document.querySelectorAll('.tab-btn');
  
  tabs.forEach(tab => tab.classList.remove('active'));
  tabBtns.forEach(btn => btn.classList.remove('active'));
  
  document.getElementById(`${tabName}-tab`).classList.add('active');
  document.querySelector(`[onclick="showAccountTab('${tabName}')"]`).classList.add('active');
}

function showProfileSection(section) {
  const profileContent = document.getElementById('profile-content');
  
  const sections = {
    orders: `
      <h4>Historial de Pedidos</h4>
      <div class="order-history">
        <p>No tienes pedidos anteriores.</p>
      </div>
    `,
    personal: `
      <h4>Datos Personales</h4>
      <form>
        <input type="text" placeholder="Nombre completo" value="">
        <input type="email" placeholder="Correo electrónico" value="">
        <input type="tel" placeholder="Teléfono" value="">
        <button type="submit">Actualizar Datos</button>
      </form>
    `,
    addresses: `
      <h4>Direcciones de Envío</h4>
      <div class="addresses">
        <p>No tienes direcciones guardadas.</p>
        <button class="cta-btn">Agregar Dirección</button>
      </div>
    `
  };
  
  profileContent.innerHTML = sections[section] || '';
}

// Policies functions
function showPolicy(policyType) {
  const policyContent = document.getElementById('policy-content');
  const policyBtns = document.querySelectorAll('.policy-btn');
  
  // Update policy buttons
  policyBtns.forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`[onclick="showPolicy('${policyType}')"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
  
  const policies = {
    faq: `
      <h3>Preguntas Frecuentes</h3>
      <h4>¿Cómo puedo realizar un pedido?</h4>
      <p>Puedes realizar tu pedido a través de nuestra página web agregando productos al carrito y siguiendo el proceso de checkout.</p>
      
      <h4>¿Cuáles son los métodos de pago disponibles?</h4>
      <p>Aceptamos tarjetas de crédito, débito, PSE y pagos contra entrega en algunas zonas.</p>
      
      <h4>¿Hacen entregas a domicilio?</h4>
      <p>Sí, realizamos entregas en toda la ciudad. Los tiempos de entrega varían según la zona.</p>
      
      <h4>¿Puedo devolver un producto?</h4>
      <p>Sí, aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que el producto esté en perfectas condiciones.</p>
      
      <h4>¿Ofrecen garantía en los productos?</h4>
      <p>Todos nuestros productos cuentan con garantía del fabricante. Los términos varían según el producto.</p>
    `,
    shipping: `
      <h3>Políticas de Envío</h3>
      <h4>Zonas de Cobertura</h4>
      <p>Realizamos entregas en toda la ciudad de Bogotá y municipios aledaños.</p>
      
      <h4>Tiempos de Entrega</h4>
      <ul>
        <li>Zona urbana: 1-2 días hábiles</li>
        <li>Zona suburbana: 2-3 días hábiles</li>
        <li>Municipios cercanos: 3-5 días hábiles</li>
      </ul>
      
      <h4>Costos de Envío</h4>
      <ul>
        <li>Envío gratuito en compras superiores a $100,000</li>
        <li>Zona urbana: $8,000</li>
        <li>Zona suburbana: $12,000</li>
        <li>Municipios: $15,000</li>
      </ul>
      
      <h4>Horarios de Entrega</h4>
      <p>Las entregas se realizan de lunes a sábado de 8:00 AM a 6:00 PM.</p>
    `,
    returns: `
      <h3>Políticas de Devoluciones</h3>
      <h4>Condiciones para Devoluciones</h4>
      <ul>
        <li>El producto debe estar en su empaque original</li>
        <li>No debe haber sido usado o consumido</li>
        <li>Debe conservar todas las etiquetas y sellos</li>
        <li>La solicitud debe realizarse dentro de 30 días</li>
      </ul>
      
      <h4>Productos No Retornables</h4>
      <ul>
        <li>Alimentos para mascotas abiertos</li>
        <li>Productos de higiene personal</li>
        <li>Medicamentos veterinarios</li>
        <li>Productos personalizados</li>
      </ul>
      
      <h4>Proceso de Devolución</h4>
      <p>Para iniciar una devolución, contacta nuestro servicio al cliente con tu número de pedido. Te proporcionaremos las instrucciones detalladas.</p>
      
      <h4>Reembolsos</h4>
      <p>Los reembolsos se procesan en 5-10 días hábiles una vez recibido y verificado el producto.</p>
    `,
    terms: `
      <h3>Términos y Condiciones</h3>
      <h4>Aceptación de Términos</h4>
      <p>Al utilizar nuestro sitio web y servicios, aceptas estos términos y condiciones en su totalidad.</p>
      
      <h4>Uso del Sitio Web</h4>
      <p>Este sitio web es para uso personal y no comercial. No puedes reproducir, distribuir o modificar el contenido sin autorización.</p>
      
      <h4>Precios y Disponibilidad</h4>
      <p>Los precios están sujetos a cambios sin previo aviso. La disponibilidad de productos puede variar.</p>
      
      <h4>Responsabilidad</h4>
      <p>Virtual Pet Shop no se hace responsable por daños indirectos o consecuenciales derivados del uso de nuestros productos o servicios.</p>
      
      <h4>Modificaciones</h4>
      <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación.</p>
    `,
    privacy: `
      <h3>Aviso de Privacidad</h3>
      <h4>Recopilación de Información</h4>
      <p>Recopilamos información personal cuando te registras, realizas una compra o te comunicas con nosotros.</p>
      
      <h4>Uso de la Información</h4>
      <ul>
        <li>Procesar pedidos y pagos</li>
        <li>Mejorar nuestros servicios</li>
        <li>Comunicarnos contigo sobre tu cuenta</li>
        <li>Enviar promociones (con tu consentimiento)</li>
      </ul>
      
      <h4>Protección de Datos</h4>
      <p>Implementamos medidas de seguridad para proteger tu información personal contra acceso no autorizado.</p>
      
      <h4>Compartir Información</h4>
      <p>No vendemos, intercambiamos o transferimos tu información personal a terceros sin tu consentimiento, excepto cuando sea necesario para completar transacciones.</p>
      
      <h4>Cookies</h4>
      <p>Utilizamos cookies para mejorar tu experiencia de navegación. Puedes desactivarlas en tu navegador si lo prefieres.</p>
      
      <h4>Contacto</h4>
      <p>Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en info@virtualpetshop.com</p>
    `
  };
  
  policyContent.innerHTML = policies[policyType] || '';
}

// Contact form handler
function handleContactForm(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  
  // Here you would typically send the data to a server
  alert('Mensaje enviado correctamente. Te contactaremos pronto.');
  event.target.reset();
}

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(amount);
}

// Search functionality
function performSearch() {
  const searchInput = document.querySelector('.search-bar input');
  const query = searchInput.value.toLowerCase().trim();
  
  if (!query) return;
  
  // Filter products based on search query
  const searchResults = products.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );
  
  // Show products section with search results
  showSection('products');
  
  const productsGrid = document.getElementById('products-grid');
  
  if (searchResults.length === 0) {
    productsGrid.innerHTML = '<p class="no-results">No se encontraron productos para tu búsqueda.</p>';
    return;
  }
  
  productsGrid.innerHTML = searchResults.map(product => `
    <div class="product-card">
      <div class="product-image">${product.image}</div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-price">$${product.price.toLocaleString()}</div>
        <button class="add-to-cart" onclick="addToCart(${product.id})">
          Agregar al Carrito
        </button>
      </div>
    </div>
  `).join('');
}

// Add search functionality to search button and Enter key
document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.querySelector('.search-bar button');
  const searchInput = document.querySelector('.search-bar input');
  
  if (searchButton) {
    searchButton.addEventListener('click', performSearch);
  }
  
  if (searchInput) {
    searchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        performSearch();
      }
    });
  }
});
