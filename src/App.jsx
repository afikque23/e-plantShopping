import { useState } from 'react';
import AboutUs from './AboutUs';
import ProductList, { Navbar } from './ProductList';
import CartItem from './CartItem';
import './App.css';

export default function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [page, setPage] = useState('home');
  const navigate = (nextPage) => {
    setPage(nextPage);
    setShowProductList(nextPage === 'plants');
  };

  return (
    <div className="app-container">
      <Navbar onNavigate={navigate} />
      {page === 'home' && !showProductList && (
        <>
          <main className="hero background-image">
            <div className="hero-copy">
              <p className="eyebrow">WELCOME TO PARADISE NURSERY</p>
              <h1>Welcome to <em>Paradise Nursery</em></h1>
              <p className="hero-text">Thoughtfully grown houseplants for slower mornings, brighter rooms, and a life closer to nature.</p>
              <button className="primary-button" type="button" onClick={() => { setShowProductList(true); setPage('plants'); }}>Get Started <span>→</span></button>
            </div>
          </main>
          <AboutUs />
        </>
      )}
      {showProductList && page === 'plants' && <ProductList />}
      {page === 'about' && <AboutUs />}
      {page === 'cart' && <CartItem onNavigate={navigate} />}
      <footer>© 2025 Paradise Nursery · Grown with care.</footer>
    </div>
  );
}
