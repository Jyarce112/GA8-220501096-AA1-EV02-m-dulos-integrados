import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Products from './components/Products.jsx';
import Services from './components/Services.jsx';
import About from './components/About.jsx';
import Blog from './components/Blog.jsx';
import Contact from './components/Contact.jsx';
import Policies from './components/Policies.jsx';
import Cart from './components/Cart.jsx';
import AccountModal from './components/AccountModal.jsx';
import Footer from './components/Footer.jsx';
import Profile from './components/Profile.jsx';
import Checkout from './components/Checkout.jsx';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [cart, setCart] = useState([]);

  const [blogPosts, setBlogPosts] = useState([]);
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [errorBlog, setErrorBlog] = useState(null);

  // Modales
  const [showCart, setShowCart] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [accountTab, setAccountTab] = useState('login');

  // Usuario
  const [user, setUser] = useState(null);

  // Filtro productos
  const [categoryFilter, setCategoryFilter] = useState(null);

  const openAccountModal = (tab) => {
    setAccountTab(tab);
    setShowAccountModal(true);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setShowCart(true);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentSection('profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAccountTab('login');
    setCurrentSection('home');
  };

  // Blog
  useEffect(() => {
    axios.get('http://localhost:4000/blog-posts')
      .then(res => {
        setBlogPosts(res.data);
        setLoadingBlog(false);
      })
      .catch(() => {
        setErrorBlog('Error al cargar los posts');
        setLoadingBlog(false);
      });
  }, []);

  return (
    <BrowserRouter>
      <Header
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        cart={cart}
        onCartClick={() => setShowCart(true)}
        onOpenAccountModal={openAccountModal}
        user={user}
        onLogout={handleLogout}
      />

      {showCart && (
        <Cart
          cart={cart}
          setCart={setCart}
          onClose={() => setShowCart(false)}
        />
      )}

      {showAccountModal && (
        <AccountModal
          activeTab={accountTab}
          onClose={() => setShowAccountModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      <div className="app-container">
        <main>
          <Routes>
            {/* HOME / SECCIONES */}
            <Route
              path="/"
              element={
                <>
                  {currentSection === 'home' && (
                    <Home
                      setCurrentSection={setCurrentSection}
                      addToCart={addToCart}
                      setCategoryFilter={setCategoryFilter}
                    />
                  )}
                  {currentSection === 'products' && (
                    <Products
                      addToCart={addToCart}
                      cart={cart}
                      setCart={setCart}
                      categoryFilter={categoryFilter}
                    />
                  )}
                  {currentSection === 'services' && <Services />}
                  {currentSection === 'about' && <About />}
                  {currentSection === 'blog' && (
                    <>
                      {loadingBlog && <p>Cargando posts...</p>}
                      {errorBlog && <p>{errorBlog}</p>}
                      {!loadingBlog && !errorBlog && (
                        <Blog posts={blogPosts} />
                      )}
                    </>
                  )}
                  {currentSection === 'contact' && <Contact />}
                  {currentSection === 'policies' && <Policies />}
                  {currentSection === 'profile' && user && (
                    <Profile user={user} setUser={setUser} />
                  )}
                </>
              }
            />

            {/* CHECKOUT */}
            <Route
              path="/checkout"
              element={
                cart.length === 0
                  ? <Navigate to="/" />
                  : <Checkout cart={cart} setCart={setCart} />
              }
            />
          </Routes>
        </main>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;