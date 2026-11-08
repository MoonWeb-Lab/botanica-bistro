import React, { useState, useEffect } from 'react';
import { Utensils, Menu, X, Phone, Calendar, Clock } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Меню кухни', href: '#menu' },
    { name: 'Залы ресторана', href: '#zones' },
    { name: 'О шефе & Концепция', href: '#chef' },
    { name: 'Винная карта', href: '#wine' },
    { name: 'Отзывы', href: '#reviews' },
    { name: 'Контакты', href: '#contacts' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-bistro-bg/95 backdrop-blur-md border-b border-bistro-border py-3.5 shadow-xl shadow-black/50'
          : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Emblem */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-full bg-bistro-surface border border-bistro-honey/50 flex items-center justify-center text-bistro-honey group-hover:border-bistro-honey group-hover:scale-105 transition-all shadow-sm shadow-bistro-honey/20">
            <Utensils className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-widest text-xl font-bold text-white uppercase group-hover:text-bistro-honey transition-colors">
              Botanica Bistro
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-bistro-sage -mt-1 font-medium">
              Cuisine & Wine Bar
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wider text-bistro-linen hover:text-bistro-honey transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-bistro-honey hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-5">
          <a
            href="tel:+74957203388"
            className="flex items-center gap-2 text-xs font-semibold text-bistro-linen hover:text-white transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-bistro-surface border border-white/10 flex items-center justify-center text-bistro-honey">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span>+7 (495) 720-33-88</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="relative group overflow-hidden rounded-full bg-bistro-honey px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-bistro-honey-light hover:shadow-honey-glow active:scale-95 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-black" />
            <span>Забронировать стол</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={onOpenBooking}
            className="sm:hidden px-3.5 py-1.5 rounded-full bg-bistro-honey text-black text-xs font-bold uppercase tracking-wider"
          >
            Бронь
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-bistro-linen hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-bistro-surface/98 backdrop-blur-2xl border-b border-bistro-border px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif text-bistro-linen hover:text-bistro-honey py-2 border-b border-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-2 text-xs text-bistro-sage">
              <Clock className="w-4 h-4 text-bistro-honey" />
              <span>Вс — Чт: 12:00–23:00 • Пт — Сб: 12:00–01:00</span>
            </div>
            <a
              href="tel:+74957203388"
              className="flex items-center gap-2 text-sm font-semibold text-white"
            >
              <Phone className="w-4 h-4 text-bistro-honey" />
              <span>+7 (495) 720-33-88</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-full bg-bistro-honey text-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Выбрать стол онлайн</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
