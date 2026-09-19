import React from 'react';

export const ExpertiseGrid: React.FC = () => {
  return (
    <div className="w-full border-y border-white/5 bg-[#09090b]/80 backdrop-blur-md py-8">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
        <div className="flex items-start gap-4 aura-reveal">
          <iconify-icon icon="solar:shield-check-linear" class="text-3xl text-[#d8b485] shrink-0"></iconify-icon>
          <div>
            <h4 className="text-[10px] font-bold text-white tracking-widest mb-1 uppercase">
              Zero-Damage Blonding
            </h4>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Mandatory bleach strand test
              <br />
              &amp; bonded lifting chemistry
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 aura-reveal">
          <iconify-icon icon="solar:scissors-square-linear" class="text-3xl text-[#d8b485] shrink-0"></iconify-icon>
          <div>
            <h4 className="text-[10px] font-bold text-white tracking-widest mb-1 uppercase">
              Haircuts with Haik
            </h4>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Master butterfly layers,
              <br />
              curtain bangs &amp; curly sculpting
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 aura-reveal">
          <iconify-icon icon="solar:cup-hot-linear" class="text-3xl text-[#d8b485] shrink-0"></iconify-icon>
          <div>
            <h4 className="text-[10px] font-bold text-white tracking-widest mb-1 uppercase">
              Persian Hospitality
            </h4>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Fresh artisan espresso by Nima,
              <br />
              fragrant teas &amp; calm studio vibe
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 aura-reveal">
          <iconify-icon icon="solar:magic-stick-3-linear" class="text-3xl text-[#d8b485] shrink-0"></iconify-icon>
          <div>
            <h4 className="text-[10px] font-bold text-white tracking-widest mb-1 uppercase">
              Milbon &amp; Hair Botox
            </h4>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Japanese 5-step moisture,
              <br />
              keratin &amp; protein rebuild
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

