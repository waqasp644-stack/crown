import React from 'react';
import { ArrowRightIcon, ChevronDownIcon } from './Icons';
import { floatingIngredients } from '../data/burgerData';

export default function Hero({ onScrollToMenu }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fire/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-900 to-transparent z-10"></div>
      </div>

      {floatingIngredients.map((ing, i) => (
        <div key={i}
          className={`absolute ${ing.cls} pointer-events-none z-10`}
          style={{ top: ing.top, left: ing.left, right: ing.right, bottom: ing.bottom, animationDelay: `${ing.delay}s` }}>
          <div className={`rounded-full border ${ing.border} bg-gradient-to-br ${ing.bg} backdrop-blur-sm flex items-center justify-center`}
            style={{ width: ing.size, height: ing.size }}>
            <div className="w-2/3 h-2/3 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
          </div>
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fire/10 border border-fire/20 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 bg-fire rounded-full animate-pulse"></span>
          <span className="text-xs font-medium text-fire uppercase tracking-widest">Premium Since 2019</span>
        </div>

        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-6 tracking-tight">
          <span className="glossy-title block">CROWN</span>
          <span className="glossy-title block" style={{ animationDelay: '0.5s' }}>BURGER</span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-4 font-light leading-relaxed">
          Where culinary artistry meets bold flavors. Handcrafted with the finest ingredients for an unforgettable experience.
        </p>

        <div className="hero-float my-8 sm:my-12 relative inline-block">
          <div className="absolute inset-0 bg-fire/10 rounded-full blur-3xl scale-75"></div>
          <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop&q=80"
            alt="Crown Burger" className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover rounded-full shadow-2xl shadow-fire/10 border-2 border-fire/10 glow-pulse" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button onClick={onScrollToMenu}
            className="group relative px-8 py-4 bg-fire hover:bg-fireLight text-white font-semibold rounded-2xl shadow-xl shadow-fire/20 hover:shadow-fire/40 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3">
            <span>Explore Menu</span>
            <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 hover:border-fire/30 transition-all duration-300 backdrop-blur-sm">
            Our Story
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDownIcon size={24} className="text-gray-500" />
        </div>
      </div>
    </section>
  );
}