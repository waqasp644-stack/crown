import React from 'react';

export default function StorySection() {
  return (
    <section id="story" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-fire/3 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl">
              <img src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=700&h=500&fit=crop&q=80"
                alt="Our Story" className="w-full h-80 sm:h-[450px] object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-fire/20 rounded-2xl -z-10"></div>
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-fire/10 rounded-xl -z-10"></div>
          </div>

          <div>
            <span className="text-fire text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">Our Story</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Born from a <span className="italic gold-shimmer">Passion</span> for Perfect Burgers
            </h2>
            <div className="space-y-4 text-gray-400 font-light leading-relaxed">
              <p>
                What started as a humble food truck in 2019 has grown into a movement. Our founder, Marcus Crown, believed that a burger could be more than fast food — it could be an art form.
              </p>
              <p>
                Every ingredient is hand-selected, every patty is ground fresh daily, and every sauce is made from scratch. We don't cut corners because you deserve the best.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/5">
              {[
                { num: '50K+', label: 'Burgers Served' },
                { num: '4.9', label: 'Average Rating' },
                { num: '12', label: 'Awards Won' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-fire">{s.num}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}