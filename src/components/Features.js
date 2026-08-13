import React from 'react';

export default function Features() {
  const features = [
    { icon: '🔥', title: 'Open Flame Grilled', desc: 'Every patty is seared over an open flame for that perfect smoky char.' },
    { icon: '🌾', title: 'Locally Sourced', desc: 'We partner with local farms for the freshest, highest-quality ingredients.' },
    { icon: '👨‍🍳', title: 'Chef Crafted', desc: 'Our recipes are developed by award-winning chefs with decades of experience.' },
    { icon: '⚡', title: 'Fast & Fresh', desc: 'From order to table in under 12 minutes without compromising quality.' },
  ];

  return (
    <section className="relative py-20 sm:py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="text-center group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}