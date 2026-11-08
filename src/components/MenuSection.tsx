import React, { useState } from 'react';
import { Utensils, Sparkles, Wine, Star, ShoppingBag, Calendar } from 'lucide-react';
import { DISHES } from '../data/mockData';
import { Dish, CartItem } from '../types';

interface MenuSectionProps {
  onSelectDishToBook: (dish: Dish) => void;
  onAddToCart: (dish: Dish) => void;
  cart: CartItem[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectDishToBook,
  onAddToCart,
  cart,
}) => {
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

  const getDishQuantityInCart = (dishId: string) => {
    const item = cart.find((i) => i.dish.id === dishId);
    return item ? item.quantity : 0;
  };

  return (
    <section id="menu" className="py-24 bg-bistro-cream/50 border-t border-b border-bistro-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-bistro-border text-bistro-olive text-xs font-semibold uppercase tracking-wider mb-3 shadow-paper-card">
            <Utensils className="w-3.5 h-3.5" />
            <span>Сезонная гастрономия Минска</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-bistro-dark uppercase tracking-tight mb-4">
            Авторское меню
          </h2>
          <p className="text-bistro-muted text-sm sm:text-base leading-relaxed font-light">
            Блюда создаются из фермерских продуктов утренней поставки, дикоросов Налибокской пущи и ремесленных сыров. Доступны для подачи в ресторане и бережной доставки по Минску.
          </p>
        </div>

        {/* Category Buttons in Pill Style */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-bistro-dark text-white font-bold shadow-md'
                  : 'bg-white text-bistro-text hover:text-bistro-terracotta border border-bistro-border hover:border-bistro-terracotta/40 shadow-sm'
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
                    ? 'bg-bistro-olive text-white border-bistro-olive font-semibold shadow-sm'
                    : 'bg-white/80 border-bistro-border text-bistro-muted hover:text-bistro-dark hover:border-bistro-border'
                }`}
              >
                {tag.id === 'chef' && <Star className="w-3 h-3 fill-amber-400 text-amber-500" />}
                {tag.id === 'vegan' && <Sparkles className="w-3 h-3 text-emerald-600" />}
                <span>{tag.label}</span>
                {isSelected && <span className="ml-1 text-[10px] text-white">✕</span>}
              </button>
            );
          })}
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredDishes.map((dish) => {
            const qty = getDishQuantityInCart(dish.id);
            return (
              <div
                key={dish.id}
                className="group rounded-3xl bg-white border border-bistro-border/80 hover:border-bistro-terracotta/50 transition-all duration-300 overflow-hidden flex flex-col shadow-paper-card hover:shadow-soft-lift h-full"
              >
                {/* Photo with zoom on hover */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-bistro-cream shrink-0">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                  {/* Weight tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-bistro-border/60 text-[11px] font-medium text-bistro-dark shadow-sm">
                    {dish.weight}
                  </div>

                  {/* Chef badge */}
                  {dish.tags.includes('chef') && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-bistro-terracotta text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <Star className="w-2.5 h-2.5 fill-white" />
                      <span>Выбор шефа</span>
                    </div>
                  )}
                </div>

                {/* Content Details with fixed heights for absolute alignment */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Title Container - fixed 52px */}
                  <div className="h-14 mb-2 flex items-start">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-bistro-dark group-hover:text-bistro-terracotta transition-colors leading-snug line-clamp-2">
                      {dish.name}
                    </h3>
                  </div>

                  {/* Description Container - fixed 56px */}
                  <div className="h-14 mb-3">
                    <p className="text-xs text-bistro-muted leading-relaxed line-clamp-3 font-light">
                      {dish.description}
                    </p>
                  </div>

                  {/* Sommelier Pairing note - fixed 38px */}
                  <div className="h-9 mb-2">
                    {dish.winePairing && (
                      <div className="p-2 rounded-xl bg-bistro-cream/70 border border-bistro-border/60 text-[11px] text-bistro-text flex items-center gap-2">
                        <Wine className="w-3.5 h-3.5 text-bistro-olive shrink-0" />
                        <span className="truncate">
                          <strong className="text-bistro-olive font-semibold">Пейринг:</strong> {dish.winePairing}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price & Action Bar - 100% strictly aligned across all cards */}
                <div className="p-4 sm:p-5 pt-3.5 border-t border-bistro-border/50 flex items-center justify-between mt-auto bg-white/80">
                  {/* Highly legible bold price */}
                  <div className="flex items-baseline gap-1">
                    <span className="font-sans text-2xl font-black text-bistro-dark tracking-tight tabular-nums">
                      {dish.price}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-bistro-terracotta">
                      BYN
                    </span>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onAddToCart(dish)}
                      className={`px-3 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1 active:scale-95 shadow-xs ${
                        qty > 0
                          ? 'bg-bistro-terracotta text-white shadow-terracotta-glow'
                          : 'bg-bistro-cream hover:bg-bistro-terracotta text-bistro-dark hover:text-white'
                      }`}
                      title="Добавить в доставку"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>{qty > 0 ? `В заказе (${qty})` : 'В заказ'}</span>
                    </button>

                    <button
                      onClick={() => onSelectDishToBook(dish)}
                      className="px-2.5 py-2 rounded-full bg-white hover:bg-bistro-cream border border-bistro-border text-bistro-dark hover:text-bistro-terracotta text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
                      title="Забронировать стол к этому блюду"
                    >
                      <Calendar className="w-3 h-3" />
                      <span className="hidden sm:inline">Бронь</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
