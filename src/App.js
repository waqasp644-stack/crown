import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import StorySection from './components/StorySection';
import Features from './components/Features';
import ExplodedView from './components/ExplodedView';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartPage from './components/CartPage';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { menuItems } from './data/burgerData';

const PRIMARY_OWNER_EMAIL = "jkbrostrading@gmail.com";

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCartPage, setShowCartPage] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [cartPop, setCartPop] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  // Monitor Auth State (User Login hotay hi Direct Homepage Redirect)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setShowCartPage(false);
        setShowAdmin(false);
        setShowAuthModal(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setShowAdmin(false);
    setShowCartPage(false);
    setShowProfileModal(false);
  };

  const handleGoHome = () => {
    setShowCartPage(false);
    setShowAdmin(false);
  };

  const handleAddToCart = (itemOrId, qty = 1) => {
    let targetItem = typeof itemOrId === 'object' 
      ? itemOrId 
      : menuItems.find(i => i.id === itemOrId);

    if (!targetItem) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === targetItem.id);
      if (existingItem) {
        return prevCart.map(i =>
          i.id === targetItem.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prevCart, { 
        id: targetItem.id, 
        title: targetItem.name || targetItem.title || 'Item', 
        price: targetItem.price || 0,
        image: targetItem.image,
        category: targetItem.category || 'Burgers',
        quantity: qty 
      }];
    });

    setCartPop(true);
    setTimeout(() => setCartPop(false), 300);
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeItem(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => item.id === id ? { ...item, quantity: newQty } : item)
    );
  };

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  if (showAdmin) {
    return (
      <AdminPanel 
        onBack={() => setShowAdmin(false)} 
        primaryOwner={PRIMARY_OWNER_EMAIL} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-fire selection:text-white">
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        cartPop={cartPop} 
        onCartClick={() => setShowCartPage(!showCartPage)}
        onAuthClick={() => setShowAuthModal(true)}
        onAdminClick={() => setShowAdmin(true)}
        onOpenProfile={() => setShowProfileModal(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onGoHome={handleGoHome}
      />

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      <ProfileModal 
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {showCartPage ? (
        <CartPage 
          cart={cart}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          clearCart={clearCart}
          onContinueShopping={() => setShowCartPage(false)}
        />
      ) : (
        <>
          <Hero onAddToCart={handleAddToCart} />
          <MenuSection onAddToCart={handleAddToCart} />
          <ExplodedView />
          <StorySection />
          <Features />
          <Newsletter />
          <Footer />
        </>
      )}
    </div>
  );
}