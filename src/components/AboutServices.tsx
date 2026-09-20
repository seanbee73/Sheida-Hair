import React, { useState } from 'react';
import { HairService } from '../types';
import { ChevronDown, ChevronUp, Sparkles, Clock, Check, ArrowRight } from 'lucide-react';

interface AboutServicesProps {
  services: HairService[];
  onSelectServiceForBooking?: (serviceName: string) => void;
}

export const AboutServices: React.FC<AboutServicesProps> = ({
  services,
  onSelectServiceForBooking,
}) => {
  const [showFullMenu, setShowFullMenu] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Haircuts with Haik',
    'Color Services',
    'Team Haircuts & Styling',
    'Hair Treatments',
  ];

  // 4 curated flagship services for the default preview
  const signatureServiceIds = [
    'srv_haik_cut',
    'srv_balayage',
    'srv_milbon_5step',
    'srv_keratin',
  ];

  const signatureServices = services.filter((s) => signatureServiceIds.includes(s.id));

  // If full menu is active, filter by activeCategory; otherwise show signature 4
  const displayedServices = showFullMenu
    ? activeCategory === 'All'
      ? services
      : services.filter((s) => s.category === activeCategory)
    : signatureServices.length > 0
    ? signatureServices
    : services.slice(0, 4);

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    if (!showFullMenu) {
      setShowFullMenu(true);
    }
  };

  const toggleFullMenu = () => {
    const nextState = !showFullMenu;
    setShowFullMenu(nextState);
    if (!nextState) {
      setActiveCategory('All');
      // Scroll smoothly back to the top of the services section when collapsing
      const el = document.getElementById('services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section
      id="services"
      className="max-w-[1400px] mx-auto w-full border-b border-white/5 py-20 px-6 relative scroll-mt-24 aura-reveal text-left"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-[#d8b485]"></div>
            <p className="text-[#d8b485] text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-[#d8b485]" />
              {showFullMenu ? 'Complete Pricing & Services Menu' : 'Signature Services Preview'}
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-[1.1] max-w-2xl">
            Bespoke colour, haircuts with Haik &amp; restorative treatments.
          </h2>
          <p className="text-sm text-zinc-400 font-light mt-3 max-w-xl">
            Every appointment begins with an honest consultation and strand diagnostic. Transparent pricing powered by Mangomint with complimentary artisan coffee by Nima.
          </p>
        </div>

        {/* Category Selector / Expand Control */}
        <div className="flex flex-col items-start lg:items-end gap-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat && showFullMenu;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-3.5 py-2 text-[10px] font-bold tracking-widest uppercase transition-all border ${
                    isSelected
                      ? 'bg-[#d8b485] text-zinc-950 border-[#d8b485]'
                      : 'bg-[#0c0c0e] text-zinc-400 border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <span className="text-[11px] text-zinc-500 font-mono">
            {showFullMenu
              ? `Showing ${displayedServices.length} of ${services.length} services`
              : `Showing 4 curated signature highlights`}
          </span>
        </div>
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedServices.map((service) => (
          <div
            key={service.id}
            className="p-6 sm:p-8 bg-[#0c0c0e] border border-white/5 hover:border-white/15 transition-all duration-300 relative flex flex-col justify-between group"
          >
            {service.popular && (
              <span className="absolute top-4 right-4 bg-[#d8b485]/10 text-[#d8b485] border border-[#d8b485]/30 text-[8px] font-bold tracking-widest uppercase px-2 py-0.5">
                Popular Service
              </span>
            )}

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2 pr-16">
                <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                  {service.category}
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-zinc-500" /> {service.duration}
                </span>
              </div>

              <h3 className="text-lg font-medium text-white mb-2 group-hover:text-[#d8b485] transition-colors">
                {service.name}
              </h3>

              <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Features & Highlights */}
              {service.features && service.features.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] px-2 py-1 bg-white/5 text-zinc-300 border border-white/5 font-mono flex items-center gap-1"
                    >
                      <Check className="w-2.5 h-2.5 text-[#d8b485]" /> {feat}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing & Booking Row */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-zinc-500">
                  Estimated Price
                </span>
                <span className="text-lg font-bold text-[#d8b485] font-mono">
                  {service.priceEstimate}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (onSelectServiceForBooking) {
                      onSelectServiceForBooking(service.name);
                    }
                    const bookingElem = document.getElementById('booking');
                    bookingElem?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 text-[10px] font-bold tracking-widest text-zinc-950 bg-[#d8b485] hover:bg-[#c2a277] uppercase transition-colors flex items-center gap-1"
                >
                  Book Service <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Option 1 Interactive Expand / Collapse Action Banner */}
      <div className="mt-10 flex flex-col items-center">
        <button
          onClick={toggleFullMenu}
          className={`w-full sm:w-auto min-w-[340px] px-8 py-4 border text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
            showFullMenu
              ? 'bg-[#141418] text-white border-white/20 hover:border-[#d8b485] hover:text-[#d8b485]'
              : 'bg-[#d8b485] text-zinc-950 border-[#d8b485] hover:bg-[#c2a277]'
          }`}
        >
          {showFullMenu ? (
            <>
              <span>Collapse to Signature Highlights Only</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>View Complete Service &amp; Pricing Menu ({services.length} Services)</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>

        {!showFullMenu && (
          <p className="text-[11px] text-zinc-500 font-light mt-3 tracking-wide text-center">
            Includes all haircuts with Haik &amp; team, balayage &amp; colour techniques, and Milbon / Keratin hair treatments.
          </p>
        )}
      </div>

      {/* Note about Consultation & Custom Estimates */}
      <div className="mt-12 p-6 bg-[#0c0c0e] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-[#d8b485] shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-400 leading-relaxed">
            <strong className="text-white">Consultation &amp; Strand Test First:</strong> All major chemical colour and bleach appointments require a preliminary consultation and strand test to evaluate hair porosity and verify zero damage.
          </p>
        </div>
        <a
          href="tel:4162098060"
          className="shrink-0 text-xs font-mono font-bold text-[#d8b485] hover:underline whitespace-nowrap"
        >
          Questions? Call (416) 209-8060
        </a>
      </div>
    </section>
  );
};

