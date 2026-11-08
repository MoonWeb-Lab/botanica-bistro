import React from 'react';
import { Utensils, Phone, MapPin, Clock, ArrowUp, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-bistro-bg border-t border-bistro-border text-bistro-muted text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-bistro-surface border border-bistro-honey/40 flex items-center justify-center text-bistro-honey shadow-sm">
                <Utensils className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-widest text-lg font-bold text-white uppercase">
                  Botanica Bistro
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-bistro-sage -mt-0.5">
                  Cuisine & Wine Bar
                </span>
              </div>
            </div>
            <p className="text-xs text-bistro-muted leading-relaxed mb-4 font-light">
              Гастрономический ресторан авторской кухни и панорамная оранжерея в историческом центре Москвы.
            </p>
            <div className="text-xs text-bistro-honey font-mono">
              ИНН: 7703891402 • Ресторанный холдинг Botanica
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-4 font-serif">
              Навигация
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-bistro-honey transition-colors">Авторское меню</a>
              </li>
              <li>
                <a href="#zones" className="hover:text-bistro-honey transition-colors">Залы и посадка</a>
              </li>
              <li>
                <a href="#chef" className="hover:text-bistro-honey transition-colors">Шеф-повар & Концепция</a>
              </li>
              <li>
                <a href="#wine" className="hover:text-bistro-honey transition-colors">Винная карта</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-bistro-honey transition-colors">Отзывы гостей</a>
              </li>
            </ul>
          </div>

          {/* Hours & Contacts */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-4 font-serif">
              Часы приема гостей
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-bistro-honey shrink-0" />
                <span>Вс — Чт: 12:00 – 23:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-bistro-honey shrink-0" />
                <span>Пт — Сб: 12:00 – 01:00</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-bistro-honey shrink-0" />
                <span>ул. Большая Никитская, 22/2</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-bistro-honey shrink-0" />
                <a href="tel:+74957203388" className="hover:text-bistro-honey transition-colors">
                  +7 (495) 720-33-88
                </a>
              </div>
            </div>
          </div>

          {/* MoonWeb Lab Badge */}
          <div className="bg-bistro-surface/70 rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bistro-elevated text-bistro-honey text-[10px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                <span>MoonWeb Lab Showcase</span>
              </div>
              <p className="text-xs text-bistro-linen font-light">
                Премиальный цифровой кейс для ресторанного и HoReCa бизнеса с онлайн-букингом столов.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-bistro-muted">© 2026 MoonWeb Lab</span>
              <button
                onClick={scrollToTop}
                className="w-8 h-8 rounded-full bg-bistro-elevated hover:bg-bistro-honey text-bistro-linen hover:text-black flex items-center justify-center transition-colors"
                title="Наверх"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-bistro-muted gap-4">
          <p>© 2026 Botanica Bistro. Все права защищены.</p>
          <div className="flex items-center gap-5">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors"
            >
              Политика конфиденциальности
            </button>
            <span className="text-gray-600">|</span>
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors"
            >
              Согласие на обработку данных
            </button>
            <span className="text-gray-600">|</span>
            <span>Правила посещения ресторана</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
