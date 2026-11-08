import React, { useState } from 'react';
import { Utensils, Sparkles, Wine, Star } from 'lucide-react';
import { DISHES } from '../data/mockData';
import { Dish } from '../types';

interface MenuSectionProps {
  onSelectDishToBook: (dish: Dish) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectDishToBook }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'starters' | 'pasta' | 'mains' | 'desserts'>('all');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Все меню' },
    { id: 'starters', label: 'Закуски & Севиче' },
    { id: 'pasta', label: 'Паста & Ризотто' },
    { id: 'mains', label: 'Основные блюда' },
    { id: 'desserts', label: 'Десерты' },
  ];

  const filterTags = [
    { id: 'chef', label: 'Шеф рекомендует' },
    { id: 'seafood', label: 'Морепродукты' },
    { id: 'vegan', label: 'Вегетарианское' },
    { id: 'gluten-free', label: 'Без глютена' },
  ];

  const filteredDishes = DISHES.filter((dish) => {
    const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;
    const matchesTag = !activeTag || dish.tags.includes(activeTag as any);
    return matchesCategory && matchesTag;
  });

  return (
    <section id="menu" className="py-24 bg-bistro-surface/50 border-t border-b border-bistro-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bistro-elevated border border-bistro-honey/30 text-bistro-honey text-xs font-semibold uppercase tracking-wider mb-3">
            <Utensils className="w-3.5 h-3.5" />
            <span>Сезонная гастрономия</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white uppercase tracking-tight mb-4">
            Авторское меню
          </h2>
          <p className="text-bistro-muted text-sm sm:text-base leading-relaxed font-light">
            Блюда создаются из фермерских продуктов утренней поставки, дикой рыбы и ремесленных сыров. Каждая позиция дополнена винной рекомендацией от шеф-сомелье.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-bistro-honey text-black font-bold shadow-honey-glow'
                  : 'bg-bistro-card text-bistro-linen hover:text-white border border-white/5 hover:border-bistro-honey/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dietary Tag Chips */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          <span className="text-xs text-bistro-muted mr-1 hidden sm:inline">Фильтр:</span>
          {filterTags.map((tag) => {
            const isSelected = activeTag === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => setActiveTag(isSelected ? null : tag.id)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-bistro-elevated border-bistro-honey text-bistro-honey font-semibold'
                    : 'bg-transparent border-white/10 text-bistro-muted hover:text-bistro-linen hover:border-white/20'
                }`}
              >
                {tag.id === 'chef' && <Star className="w-3 h-3 fill-bistro-honey text-bistro-honey" />}
                {tag.id === 'vegan' && <Sparkles className="w-3 h-3 text-emerald-400" />}
                <span>{tag.label}</span>
                {isSelected && <span className="ml-1 text-[10px] text-bistro-honey">✕</span>}
              </button>
            );
          })}
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="group rounded-2xl bg-bistro-card border border-white/5 hover:border-bistro-honey/40 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1 shadow-bistro-card"
            >
              <div>
                {/* Photo with zoom on hover */}
                <div className="relative h-56 w-full overflow-hidden bg-bistro-elevated">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bistro-card via-transparent to-transparent opacity-80" />

                  {/* Weight tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-medium text-bistro-linen">
                    {dish.weight}
                  </div>

                  {/* Chef badge */}
                  {dish.tags.includes('chef') && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-bistro-honey text-black text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <Star className="w-2.5 h-2.5 fill-black" />
                      <span>Выбор шефа</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-bistro-honey transition-colors leading-snug">
                      {dish.name}
                    </h3>
                  </div>

                  <p className="text-xs text-bistro-muted leading-relaxed mb-4 line-clamp-3 font-light">
                    {dish.description}
                  </p>

                  {/* Sommelier Pairing note */}
                  {dish.winePairing && (
                    <div className="p-2.5 rounded-lg bg-bistro-surface border border-bistro-border/60 text-[11px] text-bistro-linen flex items-center gap-2 mb-4">
                      <Wine className="w-3.5 h-3.5 text-bistro-honey shrink-0" />
                      <span className="truncate">
                        <strong className="text-bistro-honey">Пейринг:</strong> {dish.winePairing}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between mt-2">
                <div>
                  <span className="font-serif text-xl font-bold text-bistro-honey">
                    {dish.price.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <button
                  onClick={() => onSelectDishToBook(dish)}
                  className="px-3.5 py-2 rounded-full bg-bistro-elevated hover:bg-bistro-honey text-bistro-linen hover:text-black text-[11px] font-bold uppercase tracking-wider transition-all duration-200 group-hover:bg-bistro-honey group-hover:text-black"
                >
                  Забронировать
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
