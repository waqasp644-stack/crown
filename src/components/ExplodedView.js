import React, { useState, useEffect, useRef } from 'react';
import { FlameIcon, CheckIcon } from './Icons';
import { burgerLayers } from '../data/burgerData';

export default function ExplodedView() {
  const [isExploded, setIsExploded] = useState(false);
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsExploded(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const gap = isExploded ? 32 : 4;

  return (
    <section id="special-offers" ref={sectionRef} className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-fire/3 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-fire text-xs font-semibold uppercase tracking-[0.3em] mb-4 block">Interactive Experience</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Every Layer <span className="gold-shimmer italic">Matters</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto font-light">
            Discover what makes our Crown Burger extraordinary. Hover over each layer to explore.
          </p>
          <button onClick={() => setIsExploded(!isExploded)}
            className={`mt-6 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border ${isExploded ? 'bg-fire/20 border-fire/40 text-fire' : 'bg-white/5 border-white/10 text-gray-300 hover:border-fire/30 hover:text-fire'}`}>
            {isExploded ? 'Collapse Layers' : 'Explode Ingredients'}
          </button>
        </div>

        <div className="relative max-w-2xl mx-auto flex flex-col items-center" style={{ gap: `${gap}px`, transition: 'gap 0.6s cubic-bezier(0.34,1.56,0.64,1)' }}>
          {burgerLayers.map((layer, i) => {
            const isHovered = hoveredLayer === layer.id;
            return (
              <div key={layer.id}
                className="layer-card relative w-full cursor-pointer"
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
                style={{
                  transform: isHovered && isExploded ? 'scale(1.03) translateX(10px)' : 'scale(1) translateX(0)',
                  zIndex: isHovered ? 20 : 10 - i,
                }}>
                <div className={`relative flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl border transition-all duration-500 ${
                  isHovered ? 'bg-white/10 border-fire/40 shadow-xl shadow-fire/10' : 'bg-dark-700/80 border-white/5 hover:border-white/10'
                }`}>
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-300"
                    style={{ background: `linear-gradient(135deg, ${layer.color}33, ${layer.color}11)`, boxShadow: isHovered ? `0 0 20px ${layer.color}44` : 'none' }}>
                    {layer.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white text-sm sm:text-base truncate">{layer.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-fire/10 text-fire font-medium flex-shrink-0">{layer.cal}</span>
                    </div>
                    <p className={`text-xs sm:text-sm text-gray-400 font-light transition-all duration-500 ${isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                      {layer.detail}
                    </p>
                  </div>

                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isHovered ? 'bg-fire text-white scale-100' : 'bg-white/5 text-gray-500 scale-90'}`}>
                    <CheckIcon size={14} />
                  </div>
                </div>

                {isExploded && i < burgerLayers.length - 1 && (
                  <div className="absolute left-8 sm:left-10 -bottom-1 w-px bg-gradient-to-b from-white/10 to-transparent" style={{ height: gap / 2 }}></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-dark-700 border border-white/5 text-sm text-gray-400">
            <FlameIcon size={14} className="text-fire" />
            Total: <span className="text-white font-semibold">1,005 calories</span> of pure perfection
          </span>
        </div>
      </div>
    </section>
  );
}