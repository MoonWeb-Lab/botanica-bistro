import React from 'react';
import { ShoppingBag, Clock, ShieldCheck, Sparkles, ArrowRight, Truck } from 'lucide-react';

interface DeliverySectionProps {
  onOpenDelivery: () => void;
  onOpenMenu: () => void;
}

export const DeliverySection: React.FC<DeliverySectionProps> = ({
  onOpenDelivery,
  onOpenMenu,
}) => {
  return (
    <section id="delivery" className="py-20 bg-bistro-cream/40 border-t border-b border-bistro-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-bistro-border p-8 sm:p-12 shadow-soft-lift relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-bistro-terracotta/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Info Col */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bistro-cream border border-bistro-sand text-bistro-terracotta text-xs font-semibold uppercase tracking-wider shadow-xs">
                <Truck className="w-3.5 h-3.5" />
                <span>Гастрономическая доставка по Минску</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-bistro-dark uppercase tracking-tight">
                Ресторанная кухня Botanica у вас дома
              </h2>

              <p className="text-bistro-muted text-sm sm:text-base leading-relaxed font-light">
                Наши повара бережно приготовят авторские блюда, а курьеры доставят их в специальных термобоксах с сохранением температуры, текстуры и ресторанной эстетики подачи.
              </p>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-3.5 rounded-2xl bg-bistro-cream/50 border border-bistro-border/60">
                  <div className="flex items-center gap-2 text-bistro-olive font-bold text-xs uppercase mb-1">
                    <Clock className="w-4 h-4" />
                    <span>45–60 минут</span>
                  </div>
                  <p className="text-[11px] text-bistro-muted">Быстрая доставка по всему Минску в пределах МКАД</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-bistro-cream/50 border border-bistro-border/60">
                  <div className="flex items-center gap-2 text-bistro-terracotta font-bold text-xs uppercase mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>От 60 BYN</span>
                  </div>
                  <p className="text-[11px] text-bistro-muted">Бесплатная доставка при заказе от 60 рублей</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-bistro-cream/50 border border-bistro-border/60">
                  <div className="flex items-center gap-2 text-bistro-olive font-bold text-xs uppercase mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Эко-упаковка</span>
                  </div>
                  <p className="text-[11px] text-bistro-muted">Биоразлагаемые термобоксы с контролем пара</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenMenu}
                  className="px-6 py-3 rounded-full bg-bistro-terracotta hover:bg-bistro-terracotta-hover text-white font-bold uppercase tracking-wider text-xs shadow-sm transition-all flex items-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Выбрать блюда в меню</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenDelivery}
                  className="px-6 py-3 rounded-full bg-bistro-cream hover:bg-bistro-sand text-bistro-dark font-bold uppercase tracking-wider text-xs border border-bistro-border transition-colors"
                >
                  <span>Открыть корзину</span>
                </button>
              </div>
            </div>

            {/* Visual Col */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-bistro-border shadow-paper-card">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                  alt="Delivery Gourmet Dishes"
                  className="w-full h-72 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-bistro-border text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif font-bold text-bistro-dark text-sm">Гастро-сеты к вашему столу</p>
                      <p className="text-[11px] text-bistro-muted">Приборы, крафтовый хлеб и масло в комплекте</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-bistro-olive/10 text-bistro-olive font-bold text-[10px] uppercase">
                      В наличии
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
