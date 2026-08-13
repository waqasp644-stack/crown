import React from 'react';

export default function StorySection() {
  return (
    <section id="story" className="py-20 bg-dark-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE: Auto-playing Video */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
            <video
              src="/story.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-3xl transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle Overlay Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
          </div>

          {/* RIGHT SIDE: Text Content */}
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-fire bg-fire/10 px-4 py-2 rounded-full border border-fire/20">
              Our Story
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Born from a <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-fire to-fireLight">Passion</span> for Perfect Burgers
            </h2>

            <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
              What started as a humble food truck in 2019 has grown into a movement. Our founder, Marcus Crown, believed that a burger could be more than fast food — it could be an art form.
            </p>

            <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
              Every ingredient is hand-selected, every patty is ground fresh daily, and every sauce is made from scratch. We don't cut corners because you deserve the best.
            </p>

            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-6">
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-fire">50K+</h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Burgers Served</p>
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-fire">4.9</h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Average Rating</p>
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-fire">12</h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Awards Won</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}