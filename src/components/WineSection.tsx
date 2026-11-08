import React, { useState } from 'react';
import { Wine, Star, Compass } from 'lucide-react';
import { WINES } from '../data/mockData';

export const WineSection: React.FC = () => {
  const [activeType, setActiveType] = useState<'all' | 'white' | 'red' | 'sparkling'>('all');

  const filteredWines = activeType === 'all'
    ? WINES
    : WINES.filter((w) => w.type === activeType);

  return (
    <section id="wine" className="py-24 bg-bistro-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-bistro-border text-bistro-olive text-xs font-semibold uppercase tracking-wider mb-3 shadow-paper-card">
            <Wine className="w-3.5 h-3.5" />
            <span>Коллекция Энотеки</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-bistro-dark uppercase tracking-tight mb-4">
            Винная коллекция
          </h2>
          <p className="text-bistro-muted text-sm sm:text-base leading-relaxed font-light">
            250+ отобранных образцов: от признанной классики Бургундии и Пьемонта до биодинамических и редких оранжевых вин малых европейских виноделен.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {[
            { id: 'all', label: 'Вся карта' },
            { id: 'white', label: 'Белые вина' },
            { id: 'red', label: 'Красные вина' },
            { id: 'sparkling', label: 'Шампань & Игристое' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveType(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeType === tab.id
                  ? 'bg-bistro-dark text-white font-bold shadow-md'
                  : 'bg-white text-bistro-text hover:text-bistro-terracotta border border-bistro-border hover:border-bistro-terracotta/40 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Wine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWines.map((wine) => (
            <div
              key={wine.id}
              className="rounded-3xl bg-white border border-bistro-border/80 p-6 sm:p-7 flex flex-col justify-between hover:border-bistro-terracotta/50 transition-all shadow-paper-card hover:shadow-soft-lift group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-bistro-terracotta">
                        {wine.region}
                      </span>
                      <span className="text-[11px] text-bistro-muted">• {wine.vintage}</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-bistro-dark group-hover:text-bistro-terracotta transition-colors mt-0.5">
                      {wine.name}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="px-2.5 py-1 rounded-full bg-bistro-cream border border-bistro-sand flex items-center gap-1 text-xs font-bold text-bistro-dark shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{wine.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-bistro-olive font-semibold mb-3">
                  Сортовой состав: {wine.grape}
                </p>

                <p className="text-xs sm:text-sm text-bistro-muted leading-relaxed font-light mb-6">
                  {wine.notes}
                </p>
              </div>

              <div className="pt-4 border-t border-bistro-border/40 flex items-center justify-between">
                <div className="flex items-baseline gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-bistro-muted block">Бутылка 750 мл</span>
                    <span className="font-serif text-xl font-bold text-bistro-dark">
                      {wine.priceBottle.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  {wine.priceGlass && (
                    <div className="pl-4 border-l border-bistro-border/50">
                      <span className="text-[10px] uppercase text-bistro-muted block">Бокал 150 мл</span>
                      <span className="font-serif text-lg font-bold text-bistro-terracotta">
                        {wine.priceGlass.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  )}
                </div>

                <span className="text-[11px] text-bistro-muted flex items-center gap-1 font-medium">
                  <Compass className="w-3.5 h-3.5 text-bistro-olive" /> Температура: 10–12°C
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
