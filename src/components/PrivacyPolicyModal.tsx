import React, { useEffect } from 'react';
import { X, ShieldCheck, Lock, Eye, FileText, Check } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-bistro-dark/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white border border-bistro-border rounded-3xl shadow-soft-lift overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-bistro-border flex items-center justify-between bg-bistro-cream/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-bistro-olive/10 border border-bistro-olive/30 flex items-center justify-center text-bistro-olive">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-bistro-olive font-bold">
                Закон РБ № 99-З & Стандарты НЦЗПД
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-bistro-dark font-serif uppercase tracking-tight">
                Политика конфиденциальности Botanica Bistro
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-bistro-cream text-bistro-muted hover:text-bistro-dark hover:bg-bistro-border/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-bistro-text leading-relaxed font-light">
          <div>
            <h4 className="text-bistro-dark font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2 font-serif">
              <FileText className="w-4 h-4 text-bistro-terracotta" />
              1. Общие положения
            </h4>
            <p>
              Настоящая Политика регламентирует порядок обработки и защиты персональных данных посетителей сервиса онлайн-бронирования ресторана <strong>Botanica Bistro</strong> (ООО «Ботаника Ресторанс», УНП 193582410, Республика Беларусь, г. Минск, ул. Революционная, д. 17) в соответствии с Законом Республики Беларусь от 7 мая 2021 г. № 99-З «О защите персональных данных».
            </p>
          </div>

          <div>
            <h4 className="text-bistro-dark font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2 font-serif">
              <Eye className="w-4 h-4 text-bistro-terracotta" />
              2. Состав и цели обработки данных
            </h4>
            <p>Для бронирования стола и обеспечения персонального гастрономического сервиса мы обрабатываем:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-bistro-muted">
              <li>Имя гостя (для фиксации брони и встречи администратором в зале);</li>
              <li>Контактный номер телефона (для SMS/мессенджер-подтверждения резерва);</li>
              <li>Адрес электронной почты (для отправки электронного приглашения);</li>
              <li>Количество персон, выбранный зал и особые пожелания (аллергии, предзаказ вин);</li>
              <li>Технические файлы cookie для корректной работы сервиса бронирования.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-bistro-dark font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2 font-serif">
              <Lock className="w-4 h-4 text-bistro-terracotta" />
              3. Защита информации
            </h4>
            <p>
              Персональные сведения гостей не передаются третьим лицам, за исключением случаев, прямо предусмотренных действующим законодательством Республики Беларусь. Передача данных осуществляется по защищенному протоколу TLS 1.3.
            </p>
          </div>

          <div>
            <h4 className="text-bistro-dark font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2 font-serif">
              <Check className="w-4 h-4 text-bistro-olive" />
              4. Отзыв согласия
            </h4>
            <p>
              Вы можете в любой момент отозвать свое согласие на обработку персональных данных, направив запрос на адрес: <strong className="text-bistro-terracotta">privacy@botanica-bistro.by</strong> или обратившись к консьерж-службе ресторана: <strong className="text-bistro-dark">+375 (29) 720-33-88</strong>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-bistro-border bg-bistro-cream/40 flex items-center justify-between">
          <span className="text-[11px] text-bistro-muted">
            Редакция от 8 ноября 2026 года • Минск, Беларусь
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-bistro-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-bistro-terracotta-hover transition-colors shadow-sm"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};
