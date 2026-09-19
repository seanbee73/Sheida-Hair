import React, { useState } from 'react';
import { SALON_INFO } from '../data/salonData';

export const Location: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeMapLayer, setActiveMapLayer] = useState<'streets' | 'transit' | 'satellite'>('streets');

  const fullAddress = '124 Willowdale Ave, North York, ON M2N 4Y2, Toronto, Canada';
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Sheida Hair Studio 124 Willowdale Ave North York ON M2N 4Y2')}`;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('124 Willowdale Ave, North York, ON M2N 4Y2')}`;

  const handleCopyAddress = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  return (
    <section
      id="location"
      className="max-w-[1400px] mx-auto w-full border-b border-white/5 py-20 px-6 relative scroll-mt-24 aura-reveal text-left"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-[#d8b485]"></div>
            <p className="text-[#d8b485] text-[10px] font-bold tracking-[0.2em] uppercase">
              Studio Location &amp; Visiting Us
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-[1.1] max-w-2xl">
            124 Willowdale Avenue, North York.
          </h2>
          <p className="text-sm text-zinc-400 font-light mt-3 max-w-xl">
            A serene, modern sanctuary with dedicated customer parking and easy TTC subway access near Sheppard &amp; Willowdale.
          </p>
        </div>

        {/* Quick Map Action Links */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopyAddress}
            className="px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase bg-[#0c0c0e] hover:bg-white/5 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 transition-all inline-flex items-center gap-2 rounded-none"
            title="Copy address to clipboard"
          >
            <iconify-icon
              icon={copiedAddress ? 'solar:check-circle-bold' : 'solar:copy-linear'}
              class={copiedAddress ? 'text-emerald-400 text-sm' : 'text-zinc-400 text-sm'}
            ></iconify-icon>
            <span>{copiedAddress ? 'Address Copied!' : 'Copy Address'}</span>
          </button>

          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase bg-[#0c0c0e] hover:bg-white/5 text-zinc-300 hover:text-white border border-white/10 hover:border-[#d8b485]/40 transition-all inline-flex items-center gap-2"
          >
            <iconify-icon icon="solar:routing-2-linear" class="text-[#d8b485] text-sm"></iconify-icon>
            <span>Get Directions</span>
          </a>

          <a
            href={mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase bg-[#d8b485] hover:bg-[#c2a277] text-zinc-950 transition-all inline-flex items-center gap-2 font-bold shadow-lg"
          >
            <iconify-icon icon="solar:map-point-bold" class="text-zinc-950 text-sm"></iconify-icon>
            <span>View on Google Maps</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Styled Map Visualizer & Direction Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left / Top: Styled Map Visualizer Container (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0c0c0e] border border-white/10 relative overflow-hidden flex flex-col min-h-[440px] md:min-h-[500px]">
          
          {/* Map Controls Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#09090b] z-20">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">
                Willowdale Studio &amp; Academy Map
              </span>
              <span className="hidden sm:inline text-zinc-600">|</span>
              <span className="hidden sm:inline text-[9px] text-[#d8b485] font-mono">
                43.7698° N, 79.4052° W
              </span>
            </div>

            {/* Map Layer Switcher */}
            <div className="flex items-center gap-1 bg-[#0c0c0e] p-1 border border-white/5 text-[9px] font-bold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setActiveMapLayer('streets')}
                className={`px-2 py-1 transition-colors ${
                  activeMapLayer === 'streets'
                    ? 'bg-[#d8b485] text-zinc-950'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Dark Map
              </button>
              <button
                type="button"
                onClick={() => setActiveMapLayer('transit')}
                className={`px-2 py-1 transition-colors ${
                  activeMapLayer === 'transit'
                    ? 'bg-[#d8b485] text-zinc-950'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Transit
              </button>
            </div>
          </div>

          {/* Cartographic Styled Map Viewport */}
          <div className="relative flex-grow w-full bg-[#08080a] overflow-hidden flex items-center justify-center p-4 select-none">
            
            {/* SVG Vector Map Rendering */}
            <svg
              className="absolute inset-0 w-full h-full object-cover opacity-85"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 600"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Grid Pattern */}
                <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                </pattern>
                {/* Radial Glow for Salon Location */}
                <radialGradient id="salonGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#d8b485" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#d8b485" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background Grid */}
              <rect width="800" height="600" fill="#08080a" />
              <rect width="800" height="600" fill="url(#mapGrid)" />

              {/* Major Road Arteries */}
              {/* Yonge St (West North-South Artery) */}
              <line x1="200" y1="0" x2="200" y2="600" stroke="#1f242d" strokeWidth="20" />
              
              {/* Willowdale Avenue (Main Studio North-South Street) */}
              <line x1="450" y1="0" x2="450" y2="600" stroke="#2a303c" strokeWidth="24" />
              <line x1="450" y1="0" x2="450" y2="600" stroke="#d8b485" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.5" />

              {/* Bayview Avenue (East North-South Artery) */}
              <line x1="700" y1="0" x2="700" y2="600" stroke="#1a1e26" strokeWidth="18" />

              {/* Finch Avenue East (North Horizontal) */}
              <line x1="0" y1="120" x2="800" y2="120" stroke="#191c22" strokeWidth="18" />
              {/* Empress Ave / Spring Garden Ave (Middle Horizontal) */}
              <line x1="0" y1="310" x2="800" y2="310" stroke="#191c22" strokeWidth="14" />
              {/* Sheppard Avenue East (South Horizontal) */}
              <line x1="0" y1="480" x2="800" y2="480" stroke="#222834" strokeWidth="22" />

              {/* Secondary Cross Streets */}
              <line x1="0" y1="210" x2="800" y2="210" stroke="#12141a" strokeWidth="8" />
              <line x1="0" y1="390" x2="800" y2="390" stroke="#12141a" strokeWidth="8" />

              {/* TTC Subway Line 1 & Line 4 Transit Overlay */}
              {activeMapLayer === 'transit' && (
                <g>
                  {/* Line 1 (Yonge) */}
                  <line x1="194" y1="0" x2="194" y2="600" stroke="#eab308" strokeWidth="4" strokeOpacity="0.75" />
                  {/* Line 4 (Sheppard) */}
                  <line x1="194" y1="480" x2="800" y2="480" stroke="#a855f7" strokeWidth="4" strokeOpacity="0.75" />
                  {/* Sheppard-Yonge Station */}
                  <circle cx="194" cy="480" r="7" fill="#08080a" stroke="#eab308" strokeWidth="3" />
                  {/* North York Centre Station */}
                  <circle cx="194" cy="310" r="6" fill="#08080a" stroke="#eab308" strokeWidth="2.5" />
                  {/* Bayview Station */}
                  <circle cx="700" cy="480" r="6" fill="#08080a" stroke="#a855f7" strokeWidth="2.5" />
                </g>
              )}

              {/* Blocks & Points of Interest */}
              <rect x="350" y="325" width="80" height="50" fill="#0f1218" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <rect x="470" y="270" width="110" height="60" fill="#0f1218" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

              {/* Radial Beacon around Salon */}
              <circle cx="450" cy="275" r="90" fill="url(#salonGlow)" />
              <circle cx="450" cy="275" r="50" fill="none" stroke="#d8b485" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />

              {/* Text Labels on Map */}
              <text x="465" y="60" fill="#d8b485" fontSize="11" fontFamily="sans-serif" fontWeight="bold" letterSpacing="2">WILLOWDALE AVENUE</text>
              <text x="215" y="60" fill="#71717a" fontSize="10" fontFamily="sans-serif" letterSpacing="1">YONGE STREET</text>
              <text x="715" y="60" fill="#52525b" fontSize="10" fontFamily="sans-serif" letterSpacing="1">BAYVIEW AVE</text>
              <text x="30" y="112" fill="#52525b" fontSize="10" fontFamily="sans-serif" letterSpacing="1">FINCH AVE E</text>
              <text x="30" y="302" fill="#52525b" fontSize="10" fontFamily="sans-serif" letterSpacing="1">SPRING GARDEN AVE</text>
              <text x="30" y="472" fill="#94a3b8" fontSize="10" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1">SHEPPARD AVE EAST</text>

              {/* Subway Station Labels */}
              <text x="80" y="495" fill="#fbbf24" fontSize="9" fontFamily="sans-serif" fontWeight="bold">🚇 SHEPPARD-YONGE</text>
              <text x="75" y="325" fill="#fbbf24" fontSize="9" fontFamily="sans-serif" fontWeight="bold">🚇 NORTH YORK CTR</text>
              <text x="640" y="505" fill="#c084fc" fontSize="9" fontFamily="sans-serif" fontWeight="bold">🚇 BAYVIEW STN</text>
            </svg>

            {/* Pulsing Salon Pin Overlay at Center */}
            <div className="absolute top-[44%] left-[56%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
              {/* Gold Pin Badge */}
              <div className="px-3.5 py-2 bg-[#0c0c0e]/95 border border-[#d8b485] text-white shadow-2xl rounded-sm flex items-center gap-2 backdrop-blur-md">
                <div className="w-2.5 h-2.5 rounded-full bg-[#d8b485] animate-ping"></div>
                <div className="text-left">
                  <span className="block text-[11px] font-bold text-[#d8b485] tracking-wider uppercase whitespace-nowrap">
                    SHEIDA HAIR STUDIO
                  </span>
                  <span className="block text-[9px] text-zinc-300 font-mono">
                    124 Willowdale Ave, North York
                  </span>
                </div>
              </div>
              
              {/* Pin Pointer Stem & Dot */}
              <div className="w-0.5 h-4 bg-[#d8b485]"></div>
              <div className="w-3 h-3 rounded-full bg-[#d8b485] border-2 border-zinc-950 shadow-md"></div>
            </div>

            {/* Bottom Overlay Card: Quick Information Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-[#0c0c0e]/90 backdrop-blur-md p-4 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold uppercase rounded-xs">
                    Tue – Sat
                  </span>
                  <span className="text-xs text-white font-medium">10:00 AM – 7:00 PM</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  124 Willowdale Ave • Call{' '}
                  <a href={`tel:${SALON_INFO.phoneRaw}`} className="text-[#d8b485] hover:underline font-mono">
                    {SALON_INFO.phone}
                  </a>
                </p>
              </div>

              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-white/10 hover:bg-[#d8b485] hover:text-zinc-950 text-white text-[10px] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shrink-0"
              >
                <span>Open in Google Maps</span>
                <iconify-icon icon="solar:arrow-right-up-linear" style={{ fontSize: '12px' }}></iconify-icon>
              </a>
            </div>
          </div>
        </div>

        {/* Right / Bottom: Directions & Transit Guide (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Box 1: Address & Fast Contact */}
          <div className="p-6 bg-[#0c0c0e] border border-white/5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2 text-[#d8b485]">
                <iconify-icon icon="solar:map-point-bold" style={{ fontSize: '18px' }}></iconify-icon>
                <span className="text-xs font-bold uppercase tracking-widest text-white">Studio Address</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">Willowdale, North York</span>
            </div>

            <div className="text-left space-y-1">
              <p className="text-base text-white font-medium">124 Willowdale Ave</p>
              <p className="text-xs text-zinc-400">North York, ON M2N 4Y2 • Toronto, Canada</p>
              <p className="text-[11px] text-zinc-500 font-mono pt-1">
                Sheida Hair Studio &amp; Academy • Free Customer Parking
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={`tel:${SALON_INFO.phoneRaw}`}
                className="flex-1 min-w-[130px] px-3.5 py-2.5 bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <iconify-icon icon="solar:phone-calling-linear" class="text-[#d8b485]"></iconify-icon>
                <span>(416) 209-8060</span>
              </a>
              <a
                href="#booking"
                className="flex-1 min-w-[130px] px-3.5 py-2.5 bg-[#d8b485] hover:bg-[#c2a277] text-zinc-950 text-[10px] font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors font-bold"
              >
                <iconify-icon icon="solar:calendar-date-bold" class="text-zinc-950"></iconify-icon>
                <span>Book Appointment</span>
              </a>
            </div>
          </div>

          {/* Box 2: Quick Directions by Transit & Car */}
          <div className="p-6 bg-[#0c0c0e] border border-white/5 space-y-4 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#d8b485] border-b border-white/5 pb-3 mb-4">
                <iconify-icon icon="solar:signpost-2-linear" style={{ fontSize: '18px' }}></iconify-icon>
                <span className="text-xs font-bold uppercase tracking-widest text-white">How To Reach Us</span>
              </div>

              <div className="space-y-4 text-left">
                {/* Subway */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    🚇
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                      By TTC Subway (Lines 1 &amp; 4)
                    </h4>
                    <p className="text-xs text-zinc-400 font-light mt-0.5 leading-relaxed">
                      Minutes from <strong className="text-zinc-200">Sheppard-Yonge Station</strong> (Line 1/Line 4) or <strong className="text-zinc-200">North York Centre Station</strong> with quick bus connection east along Sheppard or Empress.
                    </p>
                  </div>
                </div>

                {/* Bus & Transit */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    🚌
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                      TTC Bus Routes
                    </h4>
                    <p className="text-xs text-zinc-400 font-light mt-0.5 leading-relaxed">
                      Bus 98 Willowdale / Senlac and 84 Sheppard East stop right along Willowdale Ave and Sheppard Ave East.
                    </p>
                  </div>
                </div>

                {/* Driving & Parking */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    🚗
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                      Driving &amp; Parking
                    </h4>
                    <p className="text-xs text-zinc-400 font-light mt-0.5 leading-relaxed">
                      Convenient access off Hwy 401 via Yonge St or Bayview Ave to Willowdale Ave. <strong className="text-zinc-200">Free client plaza parking</strong> is available directly on site.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Hours Strip */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <iconify-icon icon="solar:clock-circle-linear" class="text-[#d8b485]"></iconify-icon>
                <span>Tue – Sat: 10:00 AM – 7:00 PM</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">By Appointment &amp; VIP</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
