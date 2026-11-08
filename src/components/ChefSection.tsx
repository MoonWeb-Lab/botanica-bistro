import React from 'react';
import { Award, Leaf, Flame, Sparkles } from 'lucide-react';

export const ChefSection: React.FC = () => {
  return (
    <section id="chef" className="py-24 bg-bistro-surface/40 border-t border-b border-bistro-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Chef Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-bistro-honey/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
                alt="Шеф-повар Артур Миллер"
                className="w-full h-[480px] sm:h-[540px] object-cover object-top brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bistro-bg via-transparent to-transparent opacity-80" />
              
              {/* Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-bistro-honey/30 text-xs">
                <div className="flex items-center gap-2 text-bistro-honey font-bold uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4" />
                  <span>Шеф-повар года</span>
                </div>
                <p className="text-white font-serif text-lg font-bold">Артур Миллер</p>
                <p className="text-bistro-muted text-[11px]">Стажировки: Сан-Себастьян (Испания) & Лион (Франция)</p>
              </div>
            </div>
          </div>

          {/* Philosophy Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bistro-elevated border border-bistro-honey/30 text-bistro-honey text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Философия & Концепция</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white uppercase tracking-tight mb-6">
              «Вкус начинается с чистоты продукта»
            </h2>

            <blockquote className="font-serif italic text-lg sm:text-xl text-bistro-honey-light mb-8 pl-4 border-l-2 border-bistro-honey leading-relaxed">
              «Мы не маскируем продукты сложными соусами. Наша задача — раскрыть естественную сладость запеченного топинамбура, морскую свежесть сибаса и аромат лесных сморчков. Это диалог природы и человека на вашей тарелке.»
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-lg bg-bistro-card border border-white/10 flex items-center justify-center text-bistro-honey">
                  <Leaf className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white font-serif uppercase">Локальные фермы</h4>
                <p className="text-xs text-bistro-muted font-light leading-relaxed">
                  Поставки дичи из Карелии, органических овощей из Тульской области и свежей зелени каждый день.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-9 h-9 rounded-lg bg-bistro-card border border-white/10 flex items-center justify-center text-bistro-honey">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white font-serif uppercase">Открытый огонь</h4>
                <p className="text-xs text-bistro-muted font-light leading-relaxed">
                  Японский гриль робата и дровяная печь с березовыми углями для идеальной карамелизации стейков.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-9 h-9 rounded-lg bg-bistro-card border border-white/10 flex items-center justify-center text-bistro-honey">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white font-serif uppercase">Своя лаборатория</h4>
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
