import React, { useState } from 'react';
import { Phone, Sun, Moon, Menu, X } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface HeaderProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  onBookClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme = 'dark', onToggleTheme, onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#09090b]/90 backdrop-blur-md border-b border-white/5 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <a
          href="#home"
          className="flex items-center gap-3 cursor-pointer group shrink-0"
          aria-label="Sheida Hair Studio Home"
        >
          <div className="w-10 h-10 rounded-sm border border-[#d8b485]/50 bg-[#0c0c0e] flex items-center justify-center text-[#d8b485] font-serif font-bold text-xl group-hover:border-[#d8b485] transition-colors">
            S
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm sm:text-base font-bold tracking-widest text-white uppercase group-hover:text-[#d8b485] transition-colors">
              SHEIDA HAIR
            </span>
            <span className="text-[9px] tracking-[0.2em] sm:tracking-[0.25em] text-zinc-400 uppercase font-medium">
              Studio &amp; Academy • North York
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-7 xl:gap-8 text-[10px] lg:text-[11px] font-bold tracking-widest text-white/80 uppercase whitespace-nowrap">
          <a href="#services" className="hover:text-[#d8b485] transition-colors py-2">
            Services &amp; Pricing
          </a>
          <a href="#portfolio" className="hover:text-[#d8b485] transition-colors py-2">
            Hair Portfolio
          </a>
          <a href="#stylists" className="hover:text-[#d8b485] transition-colors py-2">
            Our Stylists
          </a>
          <a href="#reviews" className="hover:text-[#d8b485] transition-colors py-2">
            Reviews
          </a>
          <a href="#about" className="hover:text-[#d8b485] transition-colors py-2">
            About Salon
          </a>
          <a href="#location" className="hover:text-[#d8b485] transition-colors py-2">
            Hours &amp; Location
          </a>
        </nav>

        {/* Action Controls & Top Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={`tel:${SALON_INFO.phoneRaw}`}
            className="hidden xl:inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-[#d8b485] transition-colors border-r border-white/10 pr-4"
            title="Call to book an appointment"
          >
            <Phone className="w-3.5 h-3.5 text-[#d8b485]" />
            <span>{SALON_INFO.phone}</span>
          </a>

          {/* Light / Dark Mode Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              id="theme-toggle-button"
              type="button"
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="inline-flex items-center justify-center w-10 h-10 rounded border border-white/10 hover:border-[#d8b485]/60 bg-white/5 hover:bg-white/10 text-[#d8b485] hover:text-white transition-all cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#d8b485]" />
              ) : (
                <Moon className="w-4 h-4 text-[#d8b485]" />
              )}
            </button>
          )}

          <a
            href="#booking"
            onClick={onBookClick}
            className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2.5 text-[10px] font-bold tracking-widest text-zinc-950 bg-[#d8b485] hover:bg-[#c2a277] transition-colors uppercase whitespace-nowrap"
          >
            Book Appointment →
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden ml-1 text-zinc-400 hover:text-white p-2 rounded focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-[#d8b485]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09090b] border-b border-white/10 px-6 py-6 space-y-4 text-left shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <a
              href={`tel:${SALON_INFO.phoneRaw}`}
              className="flex items-center gap-2 text-xs font-mono text-[#d8b485]"
            >
              <Phone className="w-3.5 h-3.5 text-[#d8b485]" />
              <span>{SALON_INFO.phone}</span>
            </a>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-zinc-400 font-mono">Tue–Sat: 10:00 AM - 7:00 PM</span>
            </div>
          </div>

          <nav className="flex flex-col gap-3 text-xs font-bold tracking-widest text-zinc-300 uppercase">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d8b485] py-2 border-b border-white/5"
            >
              Services &amp; Pricing
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d8b485] py-2 border-b border-white/5"
            >
              Hair Portfolio
            </a>
            <a
              href="#stylists"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d8b485] py-2 border-b border-white/5"
            >
              Our Stylists
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d8b485] py-2 border-b border-white/5"
            >
              Client Reviews (4.9 ★)
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d8b485] py-2 border-b border-white/5"
            >
              About Sheida Studio
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d8b485] py-2 border-b border-white/5"
            >
              Hours &amp; Location (124 Willowdale)
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center px-6 py-3 text-[10px] font-bold tracking-widest text-zinc-950 bg-[#d8b485] hover:bg-[#c2a277] uppercase text-center"
            >
              Book Appointment Online →
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
