import React, { useState, useEffect } from 'react';
import {
  StarIcon,
  FlameIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon,
  ArrowRightIcon
} from './Icons';

import { menuItems as staticMenuItems } from '../data/burgerData';

import { db } from '../firebase';
import {
  collection,
  onSnapshot
} from 'firebase/firestore';


/* =========================================================
   MENU CARD
========================================================= */

function MenuCard({ item, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAdd = () => {
    if (!onAddToCart) return;

    onAddToCart(item, quantity);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <div className="group relative bg-dark-700/60 border border-white/5 rounded-3xl overflow-hidden hover:border-fire/20 transition-all duration-500 hover:shadow-2xl hover:shadow-fire/5 flex flex-col">

      {/* ================= BADGE ================= */}
      {item.badge && (
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`
              px-3 py-1 rounded-full text-[11px]
              font-bold uppercase tracking-wider

              ${
                item.badge === 'Premium'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
                  : item.badge === 'Bestseller'
                  ? 'bg-gradient-to-r from-fire to-fireLight text-white'
                  : 'bg-white/10 text-white border border-white/20'
              }
            `}
          >
            {item.badge}
          </span>
        </div>
      )}

      {/* ================= IMAGE ================= */}
      <div className="relative h-56 sm:h-64 overflow-hidden bg-dark-600">

        {/* Loading background */}
        <div
          className={`
            absolute inset-0 bg-dark-600
            transition-opacity duration-500
            ${imageLoaded ? 'opacity-0' : 'opacity-100'}
          `}
        />

        <img
          src={item.image}
          alt={item.name || item.title || 'Menu Item'}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-700 via-transparent to-transparent pointer-events-none" />

        {/* Calories */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
          <FlameIcon
            size={12}
            className="text-fire"
          />

          <span className="text-[11px] font-medium text-gray-200">
            {item.calories || 500} cal
          </span>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">

          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                size={13}
                fill={
                  star <= Math.floor(item.rating || 5)
                    ? '#FF4500'
                    : 'none'
                }
                className={
                  star <= Math.floor(item.rating || 5)
                    ? 'text-fire'
                    : 'text-gray-600'
                }
              />
            ))}
          </div>

          <span className="text-xs text-gray-400">
            {item.rating || 5.0}
          </span>

          <span className="text-xs text-gray-600">
            ({item.reviews || 100})
          </span>
        </div>

        {/* Tagline */}
        <span className="text-fire text-[11px] font-semibold uppercase tracking-widest mb-1">
          {item.tagline || item.category || 'Special'}
        </span>

        {/* Name */}
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-fire transition-colors duration-300">
          {item.name || item.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400 font-light leading-relaxed mb-5 flex-1">
          {item.description || 'Delicious freshly prepared item.'}
        </p>

        {/* ================= BOTTOM ================= */}
        <div className="flex items-center justify-between gap-3">

          {/* Price */}
          <span className="font-display text-2xl font-bold text-white">
            ${Number(item.price || 0).toFixed(2)}
          </span>

          <div className="flex items-center gap-3">

            {/* Quantity */}
            <div className="flex items-center bg-dark-600 rounded-xl border border-white/5 overflow-hidden">

              <button
                onClick={() =>
                  setQuantity(Math.max(1, quantity - 1))
                }
                className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                aria-label="Decrease quantity"
              >
                <MinusIcon size={16} />
              </button>

              <span className="w-8 text-center text-sm font-semibold text-white">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity(Math.min(10, quantity + 1))
                }
                className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                aria-label="Increase quantity"
              >
                <PlusIcon size={16} />
              </button>

            </div>

            {/* Add */}
            <button
              onClick={handleAdd}
              className={`
                relative px-5 py-2.5 rounded-xl
                font-semibold text-sm transition-all
                duration-300 flex items-center gap-2
                cursor-pointer

                ${
                  added
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-fire hover:bg-fireLight text-white shadow-lg shadow-fire/20 hover:shadow-fire/40 hover:scale-105 active:scale-95'
                }
              `}
            >
              {added ? (
                <>
                  <CheckIcon size={16} />
                  Added!
                </>
              ) : (
                <>
                  <PlusIcon size={16} />
                  Add
                </>
              )}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   MENU SECTION
========================================================= */

export default function MenuSection({
  onAddToCart,
  isFullMenu = false,
  onViewAllClick
}) {

  const [items, setItems] = useState(staticMenuItems);

  /* =======================================================
     FIRESTORE PRODUCTS
  ======================================================= */

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {

        const firestoreItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        /*
          Agar Firestore mein products hain:
          Static items + Firestore items
        */
        if (firestoreItems.length > 0) {
          setItems([
            ...staticMenuItems,
            ...firestoreItems
          ]);
        } else {
          setItems(staticMenuItems);
        }
      },

      (error) => {
        console.error(
          "Error fetching products:",
          error
        );

        // Firebase error ho to static items use hon
        setItems(staticMenuItems);
      }
    );

    return () => unsubscribe();
  }, []);


  /* =======================================================
     HOME = 6 ITEMS
     FULL MENU = ALL ITEMS
  ======================================================= */

  const displayedItems = isFullMenu
    ? items
    : items.slice(0, 6);


  return (
    <section
      id="menu"
      className="relative py-20 sm:py-32"
    >

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-fire/3 rounded-full blur-[120px]" />
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">

          <span className="text-fire text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">
            Our Menu
          </span>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">

            {isFullMenu ? 'Complete ' : 'Crafted '}

            <span className="gold-shimmer italic">
              Masterpieces
            </span>

          </h2>

          <p className="text-gray-400 max-w-lg mx-auto font-light">
            {isFullMenu
              ? 'Explore our entire collection of delicious burgers and items.'
              : 'Each burger is a symphony of flavors, crafted with precision and passion.'
            }
          </p>

        </div>


        {/* ================= MENU GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          {displayedItems.map((item, index) => (
            <MenuCard
              key={
                item.id ||
                item.title ||
                item.name ||
                `menu-item-${index}`
              }
              item={item}
              onAddToCart={onAddToCart}
            />
          ))}

        </div>


        {/* ================= EMPTY STATE ================= */}
        {displayedItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">
              No menu items available.
            </p>
          </div>
        )}


        {/* =================================================
            VIEW ALL
            ONLY HOME PAGE
        ================================================= */}
        {!isFullMenu && items.length > 6 && (
          <div className="text-center mt-12">

            <button
              onClick={onViewAllClick}
              className="px-8 py-3 bg-dark-600 hover:bg-fire/20 border border-white/10 hover:border-fire/40 text-white rounded-2xl font-semibold text-sm transition-all shadow-lg cursor-pointer inline-flex items-center gap-2"
            >
              <span>
                View All Items ({items.length})
              </span>

              <ArrowRightIcon size={16} />
            </button>

          </div>
        )}


        {/* ================= BACK TO TOP ================= */}
        <div className="text-center mt-16">

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })
            }
            className="inline-flex items-center gap-2 text-fire hover:text-fireLight transition-colors font-medium group cursor-pointer"
          >
            <span>
              Back To Top
            </span>

            <ArrowRightIcon
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

        </div>

      </div>
    </section>
  );
}