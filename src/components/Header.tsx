import React, { useState, useEffect } from 'react';
import { Utensils, Menu, X, Phone, Calendar, Clock, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenDelivery: () => void;
  cartCount: number;
  cartTotal: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenDelivery,
  cartCount,
  cartTotal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Меню кухни', href: '#menu' },
    { name: 'Доставка', href: '#delivery' },
    { name: 'Залы ресторана', href: '#zones' },
    { name: 'О шефе & Концепция', href: '#chef' },
    { name: 'Винная карта', href: '#wine' },
    { name: 'Контакты', href: '#contacts' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-bistro-bg/95 backdrop-blur-md border-b border-bistro-border py-3 shadow-soft-lift'
          : 'bg-bistro-bg/80 backdrop-blur-sm border-b border-bistro-border/60 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Emblem */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-bistro-cream border border-bistro-sand flex items-center justify-center text-bistro-olive group-hover:border-bistro-terracotta group-hover:text-bistro-terracotta transition-all shadow-sm">
            <Utensils className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-wider text-xl font-bold text-bistro-dark uppercase group-hover:text-bistro-terracotta transition-colors">
              Botanica Bistro
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] text-bistro-olive -mt-0.5 font-semibold">
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
              className="text-xs font-semibold uppercase tracking-wider text-bistro-text/85 hover:text-bistro-terracotta transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-bistro-terracotta hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3.5">
          {/* Phone */}
          <a
            href="tel:+375297203388"
            className="flex items-center gap-2 text-xs font-semibold text-bistro-muted hover:text-bistro-dark transition-colors mr-1"
          >
            <div className="w-7 h-7 rounded-full bg-bistro-cream border border-bistro-sand flex items-center justify-center text-bistro-terracotta">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span>+375 (29) 720-33-88</span>
          </a>

          {/* Delivery Cart Button */}
          <button
            onClick={onOpenDelivery}
            className="relative px-3.5 py-2.5 rounded-full bg-white hover:bg-bistro-cream border border-bistro-border text-bistro-dark hover:border-bistro-terracotta transition-all flex items-center gap-2 shadow-xs"
            title="Корзина доставки"
          >
            <ShoppingBag className="w-4 h-4 text-bistro-terracotta" />
            {cartCount > 0 ? (
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-bistro-terracotta text-white flex items-center justify-center text-[10px] font-bold">
                  {cartCount}
                </span>
                <span className="font-sans font-bold text-xs text-bistro-dark">{cartTotal} BYN</span>
              </span>
            ) : (
              <span className="text-xs font-semibold">Доставка</span>
            )}
          </button>

          {/* Reservation Button */}
          <button
            onClick={onOpenBooking}
            className="relative group overflow-hidden rounded-full bg-bistro-dark px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-bistro-terracotta hover:shadow-terracotta-glow active:scale-95 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-bistro-sand" />
            <span>Забронировать стол</span>
          </button>
        </div>

        {/* Mobile menu trigger & Cart */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenDelivery}
            className="relative p-2 rounded-full bg-white border border-bistro-border text-bistro-dark"
            title="Корзина"
          >
            <ShoppingBag className="w-4 h-4 text-bistro-terracotta" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-bistro-terracotta text-white flex items-center justify-center text-[9px] font-bold">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenBooking}
            className="sm:hidden px-3 py-1.5 rounded-full bg-bistro-dark text-white text-[11px] font-bold uppercase tracking-wider hover:bg-bistro-terracotta transition-colors"
          >
            Бронь
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-bistro-dark hover:text-bistro-terracotta focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-bistro-bg/98 backdrop-blur-2xl border-b border-bistro-border px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif text-bistro-dark hover:text-bistro-terracotta py-2 border-b border-bistro-border/40 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-2 text-xs text-bistro-muted">
              <Clock className="w-4 h-4 text-bistro-olive" />
              <span>Вс — Чт: 12:00–23:00 • Пт — Сб: 12:00–01:00</span>
            </div>
            <a
              href="tel:+375297203388"
              className="flex items-center gap-2 text-sm font-semibold text-bistro-dark"
            >
              <Phone className="w-4 h-4 text-bistro-terracotta" />
              <span>+375 (29) 720-33-88</span>
            </a>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDelivery();
                }}
                className="py-3 rounded-full bg-white border border-bistro-border text-bistro-dark font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 hover:border-bistro-terracotta transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-bistro-terracotta" />
                <span>Доставка ({cartCount})</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="py-3 rounded-full bg-bistro-dark text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 hover:bg-bistro-terracotta transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-bistro-sand" />
                <span>Бронь стола</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
