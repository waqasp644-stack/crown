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
import {
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

import { menuItems } from './data/burgerData';


const PRIMARY_OWNER_EMAIL =
  "jkbrostrading@gmail.com";


export default function App() {

  /* =======================================================
     APP STATES
  ======================================================= */

  const [cart, setCart] = useState([]);

  const [showCartPage, setShowCartPage] =
    useState(false);

  const [showAdmin, setShowAdmin] =
    useState(false);

  const [showAuthModal, setShowAuthModal] =
    useState(false);

  const [showProfileModal, setShowProfileModal] =
    useState(false);

  /*
    false = Home
    true  = Complete Menu
  */
  const [showFullMenu, setShowFullMenu] =
    useState(false);

  const [cartPop, setCartPop] =
    useState(false);

  const [currentUser, setCurrentUser] =
    useState(null);


  /* =======================================================
     AUTH STATE
  ======================================================= */

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {

        setCurrentUser(user);

        if (user) {
          setShowCartPage(false);
          setShowAdmin(false);
          setShowAuthModal(false);
          setShowProfileModal(false);
        }
      }
    );

    return () => unsubscribe();

  }, []);


  /* =======================================================
     GO HOME
  ======================================================= */

  const handleGoHome = () => {

    setShowCartPage(false);
    setShowAdmin(false);
    setShowFullMenu(false);
    setShowProfileModal(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  /* =======================================================
     OPEN COMPLETE MENU
  ======================================================= */

  const handleGoMenu = () => {

    setShowCartPage(false);
    setShowAdmin(false);
    setShowFullMenu(true);
    setShowProfileModal(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = async () => {

    try {

      await signOut(auth);

      setShowAdmin(false);
      setShowCartPage(false);
      setShowProfileModal(false);
      setShowFullMenu(false);

    } catch (error) {

      console.error(
        "Logout error:",
        error
      );

    }
  };


  /* =======================================================
     ADD TO CART
  ======================================================= */

  const handleAddToCart = (
    itemOrId,
    qty = 1
  ) => {

    let targetItem;

    if (typeof itemOrId === 'object') {

      targetItem = itemOrId;

    } else {

      targetItem = menuItems.find(
        (item) => item.id === itemOrId
      );

    }

    if (!targetItem) return;


    setCart((prevCart) => {

      const existingItem =
        prevCart.find(
          (item) =>
            item.id === targetItem.id
        );


      /* Existing item */
      if (existingItem) {

        return prevCart.map((item) =>

          item.id === targetItem.id
            ? {
                ...item,
                quantity:
                  item.quantity + qty
              }
            : item

        );
      }


      /* New item */
      return [
        ...prevCart,
        {
          id: targetItem.id,

          title:
            targetItem.name ||
            targetItem.title ||
            'Item',

          price:
            targetItem.price || 0,

          image:
            targetItem.image,

          category:
            targetItem.category ||
            'Burgers',

          quantity: qty
        }
      ];

    });


    /* Cart animation */
    setCartPop(true);

    setTimeout(() => {
      setCartPop(false);
    }, 300);
  };


  /* =======================================================
     UPDATE CART QUANTITY
  ======================================================= */

  const updateQuantity = (
    id,
    newQty
  ) => {

    if (newQty <= 0) {

      removeItem(id);

      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQty
            }
          : item
      )
    );
  };


  /* =======================================================
     REMOVE CART ITEM
  ======================================================= */

  const removeItem = (id) => {

    setCart((prevCart) =>
      prevCart.filter(
        (item) => item.id !== id
      )
    );
  };


  /* =======================================================
     CLEAR CART
  ======================================================= */

  const clearCart = () => {
    setCart([]);
  };


  /* =======================================================
     ADMIN PAGE
  ======================================================= */

  if (showAdmin) {

    return (
      <AdminPanel
        onBack={() =>
          setShowAdmin(false)
        }
        primaryOwner={
          PRIMARY_OWNER_EMAIL
        }
      />
    );
  }


  /* =======================================================
     MAIN APP
  ======================================================= */

  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-fire selection:text-white">

      {/* ===================================================
          NAVBAR
      =================================================== */}

      <Navbar

        cartCount={cart.reduce(
          (sum, item) =>
            sum + item.quantity,
          0
        )}

        cartPop={cartPop}

        /* CART */
        onCartClick={() => {

          setShowCartPage(
            (prev) => !prev
          );

          setShowFullMenu(false);
        }}

        /* AUTH */
        onAuthClick={() =>
          setShowAuthModal(true)
        }

        /* ADMIN */
        onAdminClick={() =>
          setShowAdmin(true)
        }

        /* PROFILE */
        onOpenProfile={() =>
          setShowProfileModal(true)
        }

        currentUser={currentUser}

        /* LOGOUT */
        onLogout={handleLogout}

        /* HOME */
        onGoHome={handleGoHome}

        /* COMPLETE MENU */
        onMenuClick={handleGoMenu}

      />


      {/* ===================================================
          AUTH MODAL
      =================================================== */}

      <AuthModal

        isOpen={showAuthModal}

        onClose={() =>
          setShowAuthModal(false)
        }

      />


      {/* ===================================================
          PROFILE MODAL
      =================================================== */}

      <ProfileModal

        isOpen={showProfileModal}

        onClose={() =>
          setShowProfileModal(false)
        }

        currentUser={currentUser}

        onLogout={handleLogout}

      />


      {/* ===================================================
          CART PAGE
      =================================================== */}

      {showCartPage ? (

        <CartPage

          cart={cart}

          updateQuantity={
            updateQuantity
          }

          removeItem={
            removeItem
          }

          clearCart={
            clearCart
          }

          onContinueShopping={() => {

            setShowCartPage(false);

          }}

        />

      ) : showFullMenu ? (

        /* =================================================
           COMPLETE MENU PAGE
        ================================================= */

        <div className="pt-8 pb-16">

          <MenuSection

            onAddToCart={
              handleAddToCart
            }

            isFullMenu={true}

          />


          {/* BACK TO HOME */}
          <div className="text-center mt-8">

            <button

              onClick={
                handleGoHome
              }

              className="px-6 py-2.5 bg-dark-600 hover:bg-fire/20 border border-white/10 hover:border-fire/40 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"

            >
              ← Back to Home

            </button>

          </div>

        </div>

      ) : (

        /* =================================================
           NORMAL HOME PAGE
           ONLY 6 MENU ITEMS
        ================================================= */

        <>

          {/* ================= HERO ================= */}

          <div id="home">

            <Hero
              onAddToCart={
                handleAddToCart
              }
            />

          </div>


          {/* ================= MENU ================= */}

          {/*
            IMPORTANT:
            No outer id="menu" here.

            MenuSection itself already has:
            <section id="menu">
          */}

          <MenuSection

            onAddToCart={
              handleAddToCart
            }

            isFullMenu={false}

            onViewAllClick={
              handleGoMenu
            }

          />


          {/* ================= ABOUT ================= */}

          <div id="about">

            <ExplodedView />

          </div>


          {/* ================= OTHER SECTIONS ================= */}

          <StorySection />

          <Features />

          <Newsletter />

          <Footer />

        </>

      )}

    </div>
  );
}