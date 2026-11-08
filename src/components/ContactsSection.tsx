import React, { useState } from 'react';
import { MapPin, Phone, Clock, Car, Navigation, Check, Copy } from 'lucide-react';

export const ContactsSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('г. Минск, ул. Революционная, 17');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contacts" className="py-24 bg-bistro-bg border-t border-bistro-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Info Side */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-bistro-border text-bistro-olive text-xs font-semibold uppercase tracking-wider mb-4 shadow-paper-card">
              <MapPin className="w-3.5 h-3.5" />
              <span>Локация в Центре Минска</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-bistro-dark uppercase tracking-tight mb-6">
              Ждем вас в гости
            </h2>

            <p className="text-bistro-muted text-sm sm:text-base leading-relaxed mb-8 font-light">
              Мы находимся в историческом сердце Минска в Верхнем городе на пешеходной улице Революционной. Для гостей ресторана работает бесплатный Valet Parking — передайте ключи консьержу при заезде во внутренний дворик.
            </p>

            <div className="space-y-5">
              {/* Address */}
              <div className="rounded-2xl bg-white border border-bistro-border/80 p-5 shadow-paper-card flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-bistro-cream border border-bistro-sand flex items-center justify-center text-bistro-terracotta shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-bistro-muted uppercase tracking-wider font-semibold">Адрес</span>
                    <button
                      onClick={handleCopyAddress}
                      className="text-xs text-bistro-terracotta hover:underline flex items-center gap-1 font-semibold"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Скопировано' : 'Скопировать'}</span>
                    </button>
                  </div>
                  <p className="text-base font-semibold text-bistro-dark mt-0.5 font-serif">
                    г. Минск, ул. Революционная, 17
                  </p>
                  <p className="text-xs text-bistro-muted mt-0.5">
                    Верхний город • м. Немига (4 мин пешком), м. Октябрьская / Купаловская
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="rounded-2xl bg-white border border-bistro-border/80 p-5 shadow-paper-card flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-bistro-cream border border-bistro-sand flex items-center justify-center text-bistro-olive shrink-0 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-bistro-muted uppercase tracking-wider font-semibold">Режим работы</span>
                  <p className="text-base font-semibold text-bistro-dark mt-0.5 font-serif">
                    Вс — Чт: 12:00 – 23:00 • Пт — Сб: 12:00 – 01:00
                  </p>
                  <p className="text-xs text-bistro-muted mt-0.5">
                    Кухня принимает заказы до 22:30 (в выходные дни до 00:00)
                  </p>
                </div>
              </div>

              {/* Contacts & Valet */}
              <div className="rounded-2xl bg-white border border-bistro-border/80 p-5 shadow-paper-card flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-bistro-cream border border-bistro-sand flex items-center justify-center text-bistro-terracotta shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-bistro-muted uppercase tracking-wider font-semibold">Бронь столов & Консьерж</span>
                  <div className="flex flex-wrap items-center gap-3 mt-0.5">
                    <a
                      href="tel:+375297203388"
                      className="text-base font-semibold text-bistro-terracotta hover:underline font-serif"
                    >
                      +375 (29) 720-33-88
                    </a>
                    <span className="text-xs text-bistro-muted">•</span>
                    <a
                      href="tel:+375173228800"
                      className="text-sm font-semibold text-bistro-dark hover:text-bistro-terracotta"
                    >
                      +375 (17) 322-88-00
                    </a>
                  </div>
                  <p className="text-xs text-bistro-muted mt-0.5">
                    Бесплатный Valet Parking для гостей • Дресс-код Smart Casual
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Atmospheric Map Image Preview */}
          <div className="relative rounded-3xl overflow-hidden border border-bistro-border shadow-soft-lift h-[440px] bg-white flex flex-col justify-end p-6 sm:p-8 group">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
              alt="Botanica Bistro Restaurant Location"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.75] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bistro-dark/85 via-black/30 to-transparent" />

            {/* Pin Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-bistro-terracotta text-white flex items-center justify-center shadow-terracotta-glow animate-bounce">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="mt-2 px-3.5 py-1 rounded-full bg-white/95 border border-bistro-border text-xs font-serif font-bold text-bistro-dark shadow-lg">
                Botanica Bistro • Минск
              </div>
            </div>

            {/* Floating Card */}
            <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-bistro-border flex items-center justify-between shadow-paper-card">
              <div>
                <p className="text-xs text-bistro-terracotta font-semibold uppercase flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5" />
                  <span>Valet Parking</span>
                </p>
                <p className="text-xs text-bistro-dark font-medium">Заезд со стороны ул. Комсомольской</p>
              </div>
              <a
                href="https://yandex.by/maps/157/minsk/?ll=27.552880%2C53.902250&z=17"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-bistro-dark text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-bistro-terracotta transition-colors shrink-0 ml-3"
              >
                <Navigation className="w-3.5 h-3.5 text-bistro-sand" />
                <span>Маршрут</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
