import React from 'react';
import { Calendar, ChevronRight, Award, Wine, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background imagery: atmospheric greenhouse restaurant lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80"
          alt="Botanica Bistro Greenhouse Interior"
          className="w-full h-full object-cover object-center brightness-[0.27] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bistro-bg via-bistro-bg/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-bistro-bg/95 via-transparent to-bistro-bg/95" />
        {/* Warm honey ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bistro-honey/10 rounded-full blur-[150px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-bistro-surface/90 border border-bistro-honey/30 backdrop-blur-md mb-8 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] uppercase tracking-widest text-bistro-linen font-medium">
            Большая Никитская • Открыта бронь на вечернюю посадку
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white mb-6 uppercase leading-[1.05]">
          Гармония вкусов. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-bistro-honey-light via-bistro-honey to-bistro-terracotta italic font-normal">
            Природная эстетика.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-bistro-linen/90 font-light mb-10 leading-relaxed">
          Авторская средиземноморская и фермерская кухня от шеф-повара Артура Миллера. Панорамная оранжерея под стеклянным куполом и коллекция из 250+ редких вин.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-bistro-honey text-black font-bold uppercase tracking-wider text-xs transition-all duration-300 hover:bg-bistro-honey-light hover:shadow-honey-glow active:scale-95 flex items-center justify-center gap-3 group"
          >
            <Calendar className="w-4 h-4 text-black" />
            <span>Забронировать стол онлайн</span>
            <ChevronRight className="w-4 h-4 text-black/70 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#menu"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-bistro-surface/80 hover:bg-bistro-elevated text-bistro-cream border border-bistro-honey/30 hover:border-bistro-honey font-semibold uppercase tracking-wider text-xs transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Посмотреть сезонное меню</span>
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full border-t border-white/10 pt-8">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-1.5 text-bistro-honey mb-1">
              <Award className="w-4 h-4" />
              <span className="font-serif text-white text-lg font-bold">ТОП-10</span>
            </div>
            <span className="text-xs text-bistro-muted">WhereToEat Moscow 2026</span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-1.5 text-white mb-1">
              <Wine className="w-4 h-4 text-bistro-honey" />
              <span className="font-serif text-lg font-bold">250+ позиций</span>
            </div>
            <span className="text-xs text-bistro-muted">Винный погреб и энотека</span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-1.5 text-white mb-1">
              <Sparkles className="w-4 h-4 text-bistro-honey" />
              <span className="font-serif text-lg font-bold">Farm-to-Table</span>
            </div>
            <span className="text-xs text-bistro-muted">100% органические продукты</span>
          </div>

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-1.5 text-white mb-1">
              <MapPin className="w-4 h-4 text-bistro-honey" />
              <span className="font-serif text-lg font-bold">Большая Никитская</span>
            </div>
            <span className="text-xs text-bistro-muted">Центр + Valet Parking</span>
          </div>
        </div>
      </div>
    </section>
  );
};
