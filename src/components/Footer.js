import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-fire to-fireDeep flex items-center justify-center">
                <span className="text-white font-bold text-sm font-display">C</span>
              </div>
              <span className="font-display text-xl font-bold text-white">CROWN<span className="text-fire">.</span></span>
            </div>
            <p className="text-sm text-gray-500 font-light leading-relaxed">Premium gourmet burgers, handcrafted with passion and the finest ingredients.</p>
            <div className="flex items-center gap-3 mt-5">
              {['Instagram', 'Twitter', 'Facebook', 'TikTok'].map(social => (
                <a key={social} href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-fire/10 border border-white/5 hover:border-fire/30 flex items-center justify-center text-gray-400 hover:text-fire text-xs transition-all">
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Menu', items: ['Crown Burger', 'Royal Smash', 'Truffle Royale', 'Sides', 'Drinks'] },
            { title: 'Company', items: ['Our Story', 'Careers', 'Press', 'Catering', 'Gift Cards'] },
            { title: 'Support', items: ['Contact Us', 'FAQs', 'Allergen Info', 'Privacy Policy', 'Terms'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-semibold text-white text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-500 hover:text-fire transition-colors font-light">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">&copy; 2025 Crown Burger. All rights reserved.</p>
          <p className="text-xs text-gray-600 font-light">Crafted with 🔥 for burger lovers worldwide.</p>
        </div>
      </div>
    </footer>
  );
}