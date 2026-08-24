import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const PRIMARY_OWNER_EMAIL = "jkbrostrading@gmail.com";

export default function Navbar({ 
  cartCount = 0, 
  cartPop = false, 
  onCartClick, 
  onAuthClick, 
  onAdminClick, 
  onOpenProfile,
  currentUser,
  onLogout,
  onGoHome
}) {
  const [allowedAdmins, setAllowedAdmins] = useState([PRIMARY_OWNER_EMAIL.toLowerCase()]);

  // Firestore se Admin emails fetch karna
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "admins"), (snapshot) => {
      const extraAdmins = snapshot.docs.map(doc => doc.data().email?.toLowerCase());
      setAllowedAdmins([PRIMARY_OWNER_EMAIL.toLowerCase(), ...extraAdmins]);
    });
    return () => unsub();
  }, []);

  // Check Admin Privilege
  const userEmail = currentUser?.email?.toLowerCase();
  const isAdmin = userEmail && allowedAdmins.includes(userEmail);

  return (
    <nav className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
      {/* Brand Logo */}
      <div onClick={onGoHome} className="flex items-center gap-3 cursor-pointer">
        <div className="w-9 h-9 bg-gradient-to-tr from-orange-600 to-red-600 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-orange-600/30">
          C
        </div>
        <h1 className="font-extrabold text-xl tracking-wider uppercase font-display text-white">
          Crown <span className="text-orange-500">Burger</span>
        </h1>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <button onClick={onGoHome} className="hover:text-white transition-colors">Home</button>
        <a href="#menu" onClick={onGoHome} className="hover:text-white transition-colors">Menu</a>
        <a href="#about" onClick={onGoHome} className="hover:text-white transition-colors">About</a>

        {/* Admin Link - Sirf Allowed Admins ko dikhega */}
        {isAdmin && (
          <button 
            onClick={onAdminClick}
            className="text-orange-400 font-bold hover:text-orange-300 border border-orange-500/30 px-3 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 transition-all flex items-center gap-1.5"
          >
            <span>🛡️</span> Admin Panel
          </button>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Cart Icon */}
        <button 
          onClick={onCartClick}
          className={`relative p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all ${cartPop ? 'scale-110 border border-orange-500' : 'border border-white/10'}`}
        >
          <span className="text-lg">🛍️</span>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-orange-600 to-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
              {cartCount}
            </span>
          )}
        </button>

        {/* Profile User Icons */}
        {currentUser ? (
          <div className="flex items-center gap-2">
            {/* View Profile Icon */}
            <button 
              onClick={onOpenProfile}
              title="View Profile"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Logout Icon */}
            <button 
              onClick={onLogout}
              title="Sign Out"
              className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 hover:text-red-300 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button 
              onClick={onAuthClick}
              className="text-xs font-semibold px-4 py-2 hover:text-white text-gray-300 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={onAuthClick}
              className="text-xs font-semibold px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl shadow-lg shadow-orange-600/20 transition-all"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}