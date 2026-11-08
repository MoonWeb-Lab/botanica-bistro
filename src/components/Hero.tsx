import React from 'react';
import { Calendar, ChevronRight, Award, Wine, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-bistro-bg">
      {/* Background imagery: daylight greenhouse interior with soft editorial light vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1800&q=80"
          alt="Botanica Bistro Sunlit Interior"
          className="w-full h-full object-cover object-center brightness-[0.92] contrast-[0.98] scale-105"
        />
        {/* Soft linen/paper gradient overlay so text is ultra-crisp and airy */}
        <div className="absolute inset-0 bg-gradient-to-t from-bistro-bg via-bistro-bg/75 to-bistro-bg/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-bistro-bg/90 via-transparent to-bistro-bg/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Status Pill in warm sand & olive */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-bistro-border backdrop-blur-md mb-8 shadow-paper-card">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bistro-olive opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-bistro-olive"></span>
          </span>
          <span className="text-[11px] uppercase tracking-widest text-bistro-text font-semibold">
            Большая Никитская • Открыта бронь на вечернюю посадку
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-bistro-dark mb-6 uppercase leading-[1.05]">
          Гармония вкусов. <br />
          <span className="text-bistro-terracotta italic font-normal">
            Природная эстетика.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-bistro-muted font-light mb-10 leading-relaxed">
          Авторская средиземноморская и фермерская кухня от шеф-повара Артура Миллера. Панорамная оранжерея под стеклянным куполом и коллекция из 250+ редких вин.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-bistro-terracotta text-white font-bold uppercase tracking-wider text-xs transition-all duration-300 hover:bg-bistro-terracotta-light hover:shadow-terracotta-glow active:scale-95 flex items-center justify-center gap-3 group"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>Забронировать стол онлайн</span>
            <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#menu"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/90 hover:bg-white text-bistro-dark border border-bistro-border hover:border-bistro-terracotta font-semibold uppercase tracking-wider text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-paper-card"
          >
            <span>Посмотреть сезонное меню</span>
          </a>
        </div>

        {/* Trust Badges Bar in soft cream paper cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 w-full pt-4">
          <div className="rounded-2xl bg-white/85 backdrop-blur-md border border-bistro-border/80 p-4 shadow-paper-card flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-1.5 text-bistro-terracotta mb-1">
              <Award className="w-4 h-4" />
              <span className="font-serif text-bistro-dark text-lg font-bold">ТОП-10</span>
            </div>
            <span className="text-[11px] text-bistro-muted">WhereToEat Moscow 2026</span>
          </div>

          <div className="rounded-2xl bg-white/85 backdrop-blur-md border border-bistro-border/80 p-4 shadow-paper-card flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-1.5 text-bistro-olive mb-1">
              <Wine className="w-4 h-4 text-bistro-olive" />
              <span className="font-serif text-bistro-dark text-lg font-bold">250+ вин</span>
            </div>
            <span className="text-[11px] text-bistro-muted">Винный погреб и энотека</span>
          </div>

          <div className="rounded-2xl bg-white/85 backdrop-blur-md border border-bistro-border/80 p-4 shadow-paper-card flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-1.5 text-bistro-olive mb-1">
              <Sparkles className="w-4 h-4 text-bistro-olive" />
              <span className="font-serif text-bistro-dark text-lg font-bold">Farm-to-Table</span>
            </div>
            <span className="text-[11px] text-bistro-muted">Локальные эко-продукты</span>
          </div>

          <div className="rounded-2xl bg-white/85 backdrop-blur-md border border-bistro-border/80 p-4 shadow-paper-card flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-1.5 text-bistro-terracotta mb-1">
              <MapPin className="w-4 h-4 text-bistro-terracotta" />
              <span className="font-serif text-bistro-dark text-lg font-bold">Никитская</span>
            </div>
            <span className="text-[11px] text-bistro-muted">Центр + Valet Parking</span>
          </div>
        </div>
      </div>
    </section>
  );
};
