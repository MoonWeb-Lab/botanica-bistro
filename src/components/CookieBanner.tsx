import React, { useState, useEffect } from 'react';
import { Cookie, X, Check, Shield } from 'lucide-react';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('botanica_bistro_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('botanica_bistro_cookie_consent', 'all');
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('botanica_bistro_cookie_consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 animate-in slide-in-from-bottom duration-300">
      <div className="rounded-3xl bg-white/95 backdrop-blur-xl border border-bistro-border p-5 shadow-soft-lift flex flex-col gap-4 text-xs">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-bistro-terracotta/10 border border-bistro-terracotta/20 flex items-center justify-center text-bistro-terracotta shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <h4 className="text-bistro-dark font-bold text-sm font-serif uppercase tracking-wider">
              Файлы Cookie & Приватность
            </h4>
          </div>
          <button
            onClick={handleAcceptEssential}
            className="text-bistro-muted hover:text-bistro-dark p-1 rounded transition-colors"
            title="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-bistro-text leading-relaxed font-light">
          Мы применяем cookie-файлы для сохранения выбранных параметров бронирования стола и персонализации обслуживания. Подробнее в нашей{' '}
          <button
            onClick={onOpenPrivacy}
            className="text-bistro-terracotta hover:underline font-semibold inline-flex items-center gap-1"
          >
            <span>Политике конфиденциальности</span>
          </button>
          .
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleAcceptAll}
            className="flex-1 py-2.5 px-4 rounded-full bg-bistro-terracotta hover:bg-bistro-terracotta-hover text-white font-bold uppercase tracking-wider text-[11px] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Принять все</span>
          </button>
          <button
            onClick={handleAcceptEssential}
            className="py-2.5 px-3 rounded-full bg-bistro-cream hover:bg-bistro-border/60 text-bistro-text font-semibold uppercase tracking-wider text-[11px] transition-colors flex items-center justify-center gap-1 border border-bistro-border"
          >
            <Shield className="w-3 h-3 text-bistro-muted" />
            <span>Необходимые</span>
          </button>
        </div>
      </div>
    </div>
  );
};
