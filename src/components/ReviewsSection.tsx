import React from 'react';
import { Star, MessageSquareQuote, Award } from 'lucide-react';
import { REVIEWS } from '../data/mockData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-bistro-cream/50 border-t border-b border-bistro-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-bistro-border text-bistro-olive text-xs font-semibold uppercase tracking-wider mb-3 shadow-paper-card">
            <Award className="w-3.5 h-3.5" />
            <span>Оценки & Критика</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-bistro-dark uppercase tracking-tight mb-4">
            Отзывы наших гостей
          </h2>
          <p className="text-bistro-muted text-sm sm:text-base leading-relaxed font-light">
            Средний рейтинг 4.96 по независимым ресторанным гидам и подтвержденным отзывам посетителей.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="rounded-3xl bg-white border border-bistro-border/80 p-7 flex flex-col justify-between hover:border-bistro-terracotta/50 transition-all shadow-paper-card hover:shadow-soft-lift relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                    ))}
                  </div>
                  <MessageSquareQuote className="w-6 h-6 text-bistro-sand" />
                </div>

                <p className="text-bistro-text text-sm leading-relaxed mb-6 font-serif italic text-base">
                  «{rev.comment}»
                </p>
              </div>

              <div className="pt-4 border-t border-bistro-border/40 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-bistro-dark text-sm">{rev.author}</h4>
                  <p className="text-[11px] text-bistro-terracotta font-semibold mt-0.5">
                    Любимое блюдо: {rev.favoriteDish}
                  </p>
                  <p className="text-[10px] text-bistro-muted mt-0.5">{rev.source}</p>
                </div>
                <span className="text-xs text-bistro-muted">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
