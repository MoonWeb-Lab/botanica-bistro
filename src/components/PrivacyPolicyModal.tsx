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
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-bistro-surface border border-bistro-honey/40 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-bistro-border flex items-center justify-between bg-bistro-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-bistro-elevated border border-bistro-honey/30 flex items-center justify-center text-bistro-honey">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-bistro-honey font-bold">
                152-ФЗ & Стандарты Безопасности
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white font-serif uppercase tracking-tight">
                Политика конфиденциальности Botanica Bistro
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-bistro-elevated text-bistro-muted hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-bistro-linen leading-relaxed font-light">
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2 font-serif">
              <FileText className="w-4 h-4 text-bistro-honey" />
              1. Общие положения
            </h4>
            <p>
              Настоящая Политика регламентирует обработку и защиту персональных данных посетителей сервиса онлайн-бронирования ресторана <strong>Botanica Bistro</strong> (ООО «Ботаника Ресторантс», ИНН 7703891402, г. Москва, ул. Большая Никитская, д. 22/2).
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2 font-serif">
              <Eye className="w-4 h-4 text-bistro-honey" />
              2. Состав и цели обработки данных
            </h4>
            <p>Для бронирования стола и обеспечения персонализированного сервиса мы обрабатываем:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-bistro-muted">
              <li>Имя гостя (для фиксации резерва и приветствия в зале);</li>
              <li>Контактный номер телефона (для SMS/мессенджер-подтверждения);</li>
              <li>Адрес электронной почты (для отправки электронного приглашения и кассовых чеков);</li>
              <li>Количество персон, выбранную зону зала и особые пожелания (аллергии, предзаказ вин);</li>
              <li>Технические файлы cookie для стабильной работы онлайн-сервиса.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2 font-serif">
              <Lock className="w-4 h-4 text-bistro-honey" />
              3. Защита информации
            </h4>
            <p>
              Персональные сведения не передаются третьим лицам, за исключением случаев, прямо предусмотренных законодательством РФ. Передача данных осуществляется по зашифрованному протоколу TLS 1.3.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2 font-serif">
              <Check className="w-4 h-4 text-bistro-honey" />
              4. Отзыв согласия
            </h4>
            <p>
              Вы можете в любой момент отозвать свое согласие на обработку персональных данных, направив письмо на адрес: <strong className="text-bistro-honey">privacy@botanica-bistro.demo</strong> или позвонив консьерж-службе: <strong className="text-white">+7 (495) 720-33-88</strong>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-bistro-border bg-bistro-card flex items-center justify-between">
          <span className="text-[11px] text-bistro-muted">
            Редакция от 8 ноября 2026 года
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-bistro-honey text-black text-xs font-bold uppercase tracking-wider hover:bg-bistro-honey-light transition-colors"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};
