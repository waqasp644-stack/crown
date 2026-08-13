import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ExplodedView from './components/ExplodedView';
import MenuSection from './components/MenuSection';
import StorySection from './components/StorySection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { menuItems } from './data/burgerData';

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartPop, setCartPop] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const addToCart = useCallback((itemId, qty) => {
    setCartCount(prev => prev + qty);
    setCartPop(true);
    setTimeout(() => setCartPop(false), 400);

    const item = menuItems.find(i => i.id === itemId);
    setToast({ visible: true, message: `${qty}x ${item.name} added to cart!` });
    setTimeout(() => setToast({ visible: false, message: '' }), 2500);
  }, []);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar cartCount={cartCount} cartPop={cartPop} />
      <Hero onScrollToMenu={scrollToMenu} />
      <Features />
      <ExplodedView />
      <MenuSection onAddToCart={addToCart} />
      <StorySection />
      <Newsletter />
      <Footer />
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}