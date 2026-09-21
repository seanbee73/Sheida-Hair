import React from 'react';
import { SALON_INFO } from '../data/salonData';

export const AboutSalon: React.FC = () => {
  return (
    <section
      id="about"
      className="max-w-[1400px] mx-auto w-full border-b border-white/5 flex flex-col lg:flex-row mt-0 scroll-mt-24 aura-reveal text-left"
    >
      {/* Left Column: About & Heritage */}
      <div className="flex-1 p-8 sm:p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-white/5 relative bg-[#0c0c0e]">
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center opacity-5 mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80')`,
          }}
        ></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#d8b485]"></div>
            <p className="text-[#d8b485] text-[10px] font-bold tracking-[0.2em] uppercase">
              Our Story &amp; Philosophy
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-[1.1] max-w-md aura-reveal">
            Master hair colour &amp; zero-damage care.
          </h2>

          <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6 max-w-md">
            With over 20 years of premier hair artistry in Toronto, <strong className="text-white">Sheida Hair Studio</strong> was founded on the fundamental principle that breathtaking blonde transformations and dimensional balayage should never come at the expense of hair health.
          </p>

          <p className="text-sm text-zinc-400 font-light leading-relaxed mb-10 max-w-md">
            Under the direction of Master Colorist Sheida and Master Haircutter Haik, our studio brings together specialized artisans in color chemistry, precision butterfly layering, Milbon Japanese restorative treatments, and heartfelt hospitality.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md pt-6 border-t border-white/10">
            <div>
              <span className="block text-2xl font-bold text-[#d8b485] font-mono">
                20+ Years
              </span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                Master Hair Artistry
              </span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-[#d8b485] font-mono">
                500+ ★
              </span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                4.9 Google Reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Salon Amenities & Comfort */}
      <div className="w-full lg:w-[50%] xl:w-[45%] flex flex-col bg-[#09090b]">
        <div className="p-8 sm:p-12 lg:p-16 flex-grow">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#d8b485]"></div>
            <p className="text-[#d8b485] text-[10px] font-bold tracking-[0.2em] uppercase">
              The Client Experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SALON_INFO.amenities.map((amenity, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#0c0c0e] border border-white/5 hover:border-white/10 transition-colors"
              >
                <iconify-icon
                  icon={amenity.icon}
                  class="text-2xl text-[#d8b485] mb-3 block"
                ></iconify-icon>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  {amenity.title}
                </h4>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {amenity.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
