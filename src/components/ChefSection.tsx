import React from 'react';
import { Award, Leaf, Flame, Sparkles } from 'lucide-react';

export const ChefSection: React.FC = () => {
  return (
    <section id="chef" className="py-24 bg-bistro-cream/60 border-t border-b border-bistro-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Chef Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-bistro-border shadow-soft-lift bg-white">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
                alt="Шеф-повар Артур Миллер"
                className="w-full h-[480px] sm:h-[540px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
              
              {/* Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-bistro-border/80 text-xs shadow-paper-card">
                <div className="flex items-center gap-2 text-bistro-terracotta font-bold uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4" />
                  <span>Шеф-повар года • WhereToEat Belarus</span>
                </div>
                <p className="text-bistro-dark font-serif text-lg font-bold">Артур Миллер</p>
                <p className="text-bistro-muted text-[11px]">Стажировки: Сан-Себастьян (Испания) & Лион (Франция)</p>
              </div>
            </div>
          </div>

          {/* Philosophy Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-bistro-border text-bistro-olive text-xs font-semibold uppercase tracking-wider mb-4 shadow-paper-card">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Философия & Концепция</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-bistro-dark uppercase tracking-tight mb-6">
              «Вкус начинается с чистоты продукта»
            </h2>

            <blockquote className="font-serif italic text-lg sm:text-xl text-bistro-terracotta mb-8 pl-4 border-l-2 border-bistro-terracotta leading-relaxed">
              «Мы не маскируем продукты сложными соусами. Наша задача — раскрыть естественную сладость запеченного топинамбура, морскую свежесть сибаса и аромат лесных белых грибов. Это диалог природы и человека на вашей тарелке.»
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-bistro-border/60">
              <div className="rounded-2xl bg-white p-5 border border-bistro-border/80 shadow-paper-card space-y-2">
                <div className="w-9 h-9 rounded-full bg-bistro-cream border border-bistro-sand flex items-center justify-center text-bistro-olive">
                  <Leaf className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-bistro-dark font-serif uppercase">Локальные фермы</h4>
                <p className="text-xs text-bistro-muted font-light leading-relaxed">
                  Поставки органических трав и овощей из Минской области, крафтовых сыров Гродненщины и даров Налибокской пущи.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-bistro-border/80 shadow-paper-card space-y-2">
                <div className="w-9 h-9 rounded-full bg-bistro-cream border border-bistro-sand flex items-center justify-center text-bistro-terracotta">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-bistro-dark font-serif uppercase">Открытый огонь</h4>
                <p className="text-xs text-bistro-muted font-light leading-relaxed">
                  Японский гриль робата и дровяная печь с березовыми углями для идеальной карамелизации стейков.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-bistro-border/80 shadow-paper-card space-y-2">
                <div className="w-9 h-9 rounded-full bg-bistro-cream border border-bistro-sand flex items-center justify-center text-bistro-olive">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-bistro-dark font-serif uppercase">Своя лаборатория</h4>
                <p className="text-xs text-bistro-muted font-light leading-relaxed">
                  Ферментация, выпечка тартин-хлеба на 8-летней закваске и крафтовые авторские уксусы.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
