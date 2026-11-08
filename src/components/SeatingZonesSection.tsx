import React from 'react';
import { Users, Check, ArrowRight, Eye } from 'lucide-react';
import { SEATING_ZONES } from '../data/mockData';
import { SeatingZone } from '../types';

interface SeatingZonesSectionProps {
  onSelectZone: (zone: SeatingZone) => void;
}

export const SeatingZonesSection: React.FC<SeatingZonesSectionProps> = ({ onSelectZone }) => {
  return (
    <section id="zones" className="py-24 bg-bistro-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-bistro-border text-bistro-olive text-xs font-semibold uppercase tracking-wider mb-3 shadow-paper-card">
            <Eye className="w-3.5 h-3.5" />
            <span>Атмосфера Зала</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-bistro-dark uppercase tracking-tight mb-4">
            Зоны посадки и интерьер
          </h2>
          <p className="text-bistro-muted text-sm sm:text-base leading-relaxed font-light">
            Каждая зона Botanica Bistro обладает своим уникальным настроением — от романтического ужина в тропической оранжерее до гастрономического шоу у Chef’s Table.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SEATING_ZONES.map((zone) => (
            <div
              key={zone.id}
              className="group rounded-3xl bg-white border border-bistro-border/80 hover:border-bistro-terracotta/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-paper-card hover:shadow-soft-lift"
            >
              <div>
                {/* Visual Zone Photo */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-bistro-cream">
                  <img
                    src={zone.image}
                    alt={zone.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.95]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                  {/* Capacity Pill */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-bistro-border/60 flex items-center gap-1.5 text-xs text-bistro-dark font-medium shadow-sm">
                    <Users className="w-3.5 h-3.5 text-bistro-olive" />
                    <span>{zone.capacity}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 sm:p-8">
                  <span className="text-xs font-semibold uppercase tracking-widest text-bistro-terracotta">
                    {zone.tagline}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-bistro-dark mt-1 mb-3">
                    {zone.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-bistro-muted leading-relaxed font-light mb-6">
                    {zone.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2 mb-6">
                    {zone.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-bistro-text">
                        <Check className="w-3.5 h-3.5 text-bistro-olive shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 sm:p-8 pt-0">
                <button
                  onClick={() => onSelectZone(zone)}
                  className="w-full py-3.5 rounded-full bg-bistro-cream hover:bg-bistro-terracotta text-bistro-dark hover:text-white font-bold uppercase tracking-wider text-xs transition-all duration-200 flex items-center justify-center gap-2 group-hover:bg-bistro-terracotta group-hover:text-white shadow-sm"
                >
                  <span>Забронировать стол в этой зоне</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
