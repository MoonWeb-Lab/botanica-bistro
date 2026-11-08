import React, { useState } from 'react';
import { MapPin, Phone, Clock, Car, Navigation, Check, Copy } from 'lucide-react';

export const ContactsSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('г. Москва, ул. Большая Никитская, 22/2');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contacts" className="py-24 bg-bistro-surface/50 border-t border-bistro-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Info Side */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bistro-elevated border border-bistro-honey/30 text-bistro-honey text-xs font-semibold uppercase tracking-wider mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>Локация в Центре</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white uppercase tracking-tight mb-6">
              Ждем вас в гости
            </h2>

            <p className="text-bistro-muted text-sm sm:text-base leading-relaxed mb-8 font-light">
              Мы находимся в гастрономическом сердце Москвы на Большой Никитской. Для гостей работает бесплатный Valet Parking — просто передайте ключи консьержу при въезде.
            </p>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-bistro-card border border-white/10 flex items-center justify-center text-bistro-honey shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-bistro-muted uppercase tracking-wider">Адрес</span>
                    <button
                      onClick={handleCopyAddress}
                      className="text-xs text-bistro-honey hover:underline flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Скопировано' : 'Скопировать'}</span>
                    </button>
                  </div>
                  <p className="text-base font-semibold text-white mt-0.5 font-serif">
                    г. Москва, ул. Большая Никитская, 22/2
                  </p>
                  <p className="text-xs text-bistro-muted mt-0.5">
                    м. Охотный Ряд (5 мин), м. Арбатская (7 мин)
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-bistro-card border border-white/10 flex items-center justify-center text-bistro-honey shrink-0 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-bistro-muted uppercase tracking-wider">Режим работы</span>
                  <p className="text-base font-semibold text-white mt-0.5 font-serif">
                    Вс — Чт: 12:00 – 23:00 • Пт — Сб: 12:00 – 01:00
                  </p>
                  <p className="text-xs text-bistro-muted mt-0.5">
                    Кухня принимает заказы до 22:30 (в выходные до 00:00)
                  </p>
                </div>
              </div>

              {/* Contacts & Valet */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-bistro-card border border-white/10 flex items-center justify-center text-bistro-honey shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-bistro-muted uppercase tracking-wider">Бронь и банкеты</span>
                  <a
                    href="tel:+74957203388"
                    className="block text-base font-semibold text-bistro-honey hover:underline mt-0.5 font-serif"
                  >
                    +7 (495) 720-33-88
                  </a>
                  <p className="text-xs text-bistro-muted mt-0.5">
                    Бесплатный Valet Parking • Дресс-код Smart Casual
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Atmospheric Map Image Preview */}
          <div className="relative rounded-3xl overflow-hidden border border-bistro-honey/30 shadow-2xl h-[420px] bg-bistro-card flex flex-col justify-end p-8 group">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
              alt="Botanica Bistro Restaurant Location"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.35] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Pin Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-bistro-honey text-black flex items-center justify-center shadow-honey-glow animate-bounce">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="mt-2 px-3 py-1 rounded-full bg-black/90 border border-bistro-honey/40 text-xs font-serif font-bold text-white shadow-lg">
                Botanica Bistro
              </div>
            </div>

            {/* Floating Card */}
            <div className="relative z-10 bg-bistro-surface/95 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-bistro-honey font-semibold uppercase flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5" />
                  <span>Valet Parking</span>
                </p>
                <p className="text-xs text-bistro-linen">Въезд со стороны Большой Никитской</p>
              </div>
              <a
                href="https://yandex.ru/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-bistro-honey text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-bistro-honey-light transition-colors shrink-0 ml-3"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Маршрут</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
