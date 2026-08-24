import React, { useState } from 'react';
import { ArrowRightIcon, ChevronDownIcon } from './Icons';
import { floatingIngredients } from '../data/burgerData';

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleExploreClick = () => {
    const element = document.getElementById('menu');

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] bg-fire/5 rounded-full blur-[120px]" />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />

      </div>


      {/* ================= FLOATING INGREDIENTS ================= */}
      {floatingIngredients.map((ing, i) => (
        <div
          key={i}
          className={`absolute ${ing.cls} pointer-events-none z-10`}
          style={{
            top: ing.top,
            left: ing.left,
            right: ing.right,
            bottom: ing.bottom,
            animationDelay: `${ing.delay}s`
          }}
        >
          <div
            className={`rounded-full border ${ing.border} bg-gradient-to-br ${ing.bg} backdrop-blur-sm flex items-center justify-center`}
            style={{
              width: ing.size,
              height: ing.size
            }}
          >
            <div className="w-2/3 h-2/3 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
          </div>
        </div>
      ))}


      {/* =================================================
          CENTER CONTAINER
      ================================================= */}
      <div className="relative z-20 min-h-[calc(100vh-72px)] flex items-center justify-center">

        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">

          {/* ================= BADGE ================= */}
          <div className="flex justify-center">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fire/10 border border-fire/20 backdrop-blur-sm">

              <span className="w-2 h-2 bg-fire rounded-full animate-pulse" />

              <span className="text-[10px] sm:text-xs font-medium text-fire uppercase tracking-[0.18em] sm:tracking-widest">
                Premium Since 2019
              </span>

            </div>

          </div>


          {/* ================= TITLE ================= */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight mt-5">

            <span className="glossy-title block">
              CROWN
            </span>

            <span
              className="glossy-title block"
              style={{ animationDelay: '0.5s' }}
            >
              BURGER
            </span>

          </h1>


          {/* ================= DESCRIPTION ================= */}
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto mt-4 leading-relaxed font-light">
            Where culinary artistry meets bold flavors.
            Handcrafted with the finest ingredients for
            an unforgettable experience.
          </p>


          {/* ================= BURGER ================= */}
          <div className="relative flex justify-center items-center mt-6 sm:mt-7">

            <div className="absolute w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-fire/10 rounded-full blur-3xl" />

            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop&q=85"
              alt="Crown Burger"
              className="
                relative
                w-52 h-52
                sm:w-60 sm:h-60
                md:w-68 md:h-68
                lg:w-72 lg:h-72
                object-cover
                rounded-full
                border-2
                border-fire/10
                shadow-2xl
                shadow-fire/20
                glow-pulse
              "
            />

          </div>


          {/* ================= BUTTONS ================= */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6">

            {/* Explore Menu */}
            <button
              onClick={handleExploreClick}
              className="
                group
                w-full
                sm:w-auto
                min-w-[180px]
                px-7
                py-3.5
                bg-fire
                hover:bg-fireLight
                text-white
                font-semibold
                rounded-2xl
                shadow-xl
                shadow-fire/20
                hover:shadow-fire/40
                transition-all
                duration-300
                hover:scale-105
                active:scale-95
                flex
                items-center
                justify-center
                gap-3
                cursor-pointer
              "
            >
              <span>Explore Menu</span>

              <ArrowRightIcon
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>


            {/* Our Story */}
            <button
              onClick={() => setIsVideoOpen(true)}
              className="
                w-full
                sm:w-auto
                min-w-[180px]
                px-7
                py-3.5
                bg-white/5
                hover:bg-white/10
                text-white
                font-semibold
                rounded-2xl
                border
                border-white/10
                hover:border-fire/30
                transition-all
                duration-300
                backdrop-blur-sm
                active:scale-95
                cursor-pointer
              "
            >
              Our Story
            </button>

          </div>

        </div>

      </div>


      {/* ================= SCROLL INDICATOR ================= */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 animate-bounce">

        <ChevronDownIcon
          size={22}
          className="text-gray-500"
        />

      </div>


      {/* =================================================
          VIDEO MODAL
      ================================================= */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">

          <div className="relative w-full max-w-xs sm:max-w-sm bg-dark-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

            {/* Close */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="
                absolute
                top-3
                right-3
                z-20
                w-8
                h-8
                flex
                items-center
                justify-center
                bg-black/70
                hover:bg-fire
                text-white
                rounded-full
                transition-colors
                font-bold
                text-xs
                cursor-pointer
              "
            >
              ✕
            </button>

            {/* Video */}
            <div className="relative w-full overflow-hidden rounded-3xl">

              <video
                src="/story.mp4"
                controls
                autoPlay
                className="w-full h-auto max-h-[80vh] object-cover rounded-3xl"
              />

            </div>

          </div>

        </div>
      )}

    </section>
  );
}