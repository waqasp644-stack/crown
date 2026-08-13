import React, { useState, useEffect } from 'react';
import { ShoppingBagIcon, MenuIcon, XIcon } from './Icons';

export default function Navbar({ cartCount, cartPop }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-fire to-fireDeep flex items-center justify-center shadow-lg shadow-fire/20 group-hover:shadow-fire/40 transition-shadow">
              <span className="text-white font-bold text-sm font-display">C</span>
            </div>
            <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-white">
              CROWN<span className="text-fire">.</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Menu', 'Special Offers', 'Story', 'Locations'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-gray-400 hover:text-fire transition-colors duration-300 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-fire transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-fire transition-colors">
              <ShoppingBagIcon size={22} className={cartPop ? 'cart-pop' : ''} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-fire text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-fire/30 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-gray-400 hover:text-fire transition-colors">
              {mobileOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-nav mobile-menu-enter border-t border-white/5">
          <div className="px-4 py-4 space-y-1">
            {['Menu', 'Special Offers', 'Story', 'Locations'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-gray-400 hover:text-fire hover:bg-white/5 rounded-lg transition-all">
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}