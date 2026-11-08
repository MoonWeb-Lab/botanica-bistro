import React, { useState, useEffect } from 'react';
import { X, User, Phone, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { SEATING_ZONES, TIME_SLOTS } from '../data/mockData';
import { SeatingZone, ReservationState } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedZone?: SeatingZone | null;
}

interface DateSlot {
  dateStr: string;
  dayName: string;
  dayNum: string;
  monthName: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedZone,
}) => {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<ReservationState>({
    zoneId: SEATING_ZONES[0].id,
    date: '',
    time: TIME_SLOTS[4] || '18:30',
    guestsCount: 2,
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    occasion: 'Романтический ужин',
    wishes: '',
  });

  const [datesList, setDatesList] = useState<DateSlot[]>([]);
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Generate 7 upcoming dates
  useEffect(() => {
    const dates: DateSlot[] = [];
    const today = new Date();
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const dayName = i === 0 ? 'Сегодня' : i === 1 ? 'Завтра' : days[d.getDay()];
      const dayNum = d.getDate().toString();
      const monthName = months[d.getMonth()];
      const dateStr = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
      dates.push({ dateStr, dayName, dayNum, monthName });
    }
    setDatesList(dates);
    if (!booking.date && dates[0]) {
      setBooking((prev) => ({ ...prev, date: dates[0].dateStr }));
    }
  }, []);

  // Sync preselected zone
  useEffect(() => {
    if (preselectedZone) {
      setBooking((prev) => ({ ...prev, zoneId: preselectedZone.id }));
      setStep(2);
    }
  }, [preselectedZone]);

  // Handle ESC key
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

  const currentZone = SEATING_ZONES.find((z) => z.id === booking.zoneId) || SEATING_ZONES[0];

  const occasions = [
    'Романтический ужин',
    'День рождения',
    'Деловая встреча',
    'Семейный обед',
    'Дегустационный сет шефа',
  ];

  const validateStep4 = () => {
    let valid = true;
    if (!booking.customerName.trim()) {
      setNameError('Укажите имя для резерва стола');
      valid = false;
    } else {
      setNameError(null);
    }

    if (!booking.customerPhone.trim() || booking.customerPhone.length < 10) {
      setPhoneError('Введите корректный номер телефона');
      valid = false;
    } else {
      setPhoneError(null);
    }

    return valid;
  };

  const handleNextStep = () => {
    if (step === 4) {
      if (!validateStep4()) return;
      setStep(5);
      return;
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1 && step < 5) {
      setStep(step - 1);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setBooking({
      zoneId: SEATING_ZONES[0].id,
      date: datesList[0]?.dateStr || '',
      time: '18:30',
      guestsCount: 2,
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      occasion: 'Романтический ужин',
      wishes: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-bistro-dark/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white border border-bistro-border rounded-3xl shadow-soft-lift overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-bistro-border flex items-center justify-between bg-bistro-cream/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bistro-terracotta" />
              <span className="text-[10px] uppercase tracking-widest text-bistro-terracotta font-bold">
                {step === 5 ? 'Резерв оформлен' : `Шаг ${step} из 4 • Бронирование стола`}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-bistro-dark font-serif uppercase tracking-tight mt-0.5">
              {step === 1 && 'Выберите зону ресторана'}
              {step === 2 && 'Персоны и повод визита'}
              {step === 3 && 'Дата и время посадки'}
              {step === 4 && 'Данные для подтверждения'}
              {step === 5 && 'Стол успешно забронирован!'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-bistro-cream text-bistro-muted hover:text-bistro-dark hover:bg-bistro-border/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {step < 5 && (
          <div className="h-1 bg-bistro-cream w-full">
            <div
              className="h-full bg-bistro-terracotta transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Select Seating Zone */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SEATING_ZONES.map((zone) => {
                const isSelected = booking.zoneId === zone.id;
                return (
                  <div
                    key={zone.id}
                    onClick={() => setBooking((prev) => ({ ...prev, zoneId: zone.id }))}
                    className={`rounded-2xl border transition-all cursor-pointer overflow-hidden p-4 flex flex-col justify-between ${
                      isSelected
                        ? 'border-bistro-terracotta bg-bistro-terracotta/5 ring-1 ring-bistro-terracotta shadow-sm'
                        : 'border-bistro-border bg-bistro-cream/20 hover:border-bistro-border-strong hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="relative h-28 w-full rounded-xl overflow-hidden mb-3">
                        <img
                          src={zone.image}
                          alt={zone.name}
                          className="w-full h-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-bistro-terracotta text-white flex items-center justify-center shadow-md">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <h4 className="font-serif text-base font-bold text-bistro-dark">{zone.name}</h4>
                      <p className="text-[11px] text-bistro-terracotta font-semibold mt-0.5">{zone.tagline}</p>
                      <p className="text-xs text-bistro-muted mt-1.5 line-clamp-2">{zone.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 2: Guests & Occasion */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Number of Guests */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-bistro-muted font-semibold mb-3">
                  Количество гостей:
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {[1, 2, 3, 4, 5, 6, 8].map((num) => {
                    const isSelected = booking.guestsCount === num;
                    return (
                      <button
                        key={num}
                        onClick={() => setBooking((prev) => ({ ...prev, guestsCount: num }))}
                        className={`py-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? 'border-bistro-terracotta bg-bistro-terracotta text-white font-bold shadow-sm'
                            : 'border-bistro-border bg-bistro-cream/30 text-bistro-text hover:border-bistro-border-strong hover:bg-white'
                        }`}
                      >
                        <span className="font-serif text-lg font-bold">{num}</span>
                        <span className={`text-[9px] uppercase ${isSelected ? 'text-white/90' : 'text-bistro-muted'}`}>
                          {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-bistro-muted font-semibold mb-3">
                  Повод визита:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {occasions.map((occ) => {
                    const isSelected = booking.occasion === occ;
                    return (
                      <button
                        key={occ}
                        onClick={() => setBooking((prev) => ({ ...prev, occasion: occ }))}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-bistro-terracotta bg-bistro-terracotta/10 text-bistro-terracotta font-bold'
                            : 'border-bistro-border bg-bistro-cream/30 text-bistro-text hover:border-bistro-border-strong hover:bg-white'
                        }`}
                      >
                        <span>{occ}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-bistro-terracotta shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Dates */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-bistro-muted font-semibold mb-3">
                  Дата визита:
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {datesList.map((item) => {
                    const isSelected = booking.date === item.dateStr;
                    return (
                      <button
                        key={item.dateStr}
                        onClick={() => setBooking((prev) => ({ ...prev, date: item.dateStr }))}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? 'border-bistro-terracotta bg-bistro-terracotta text-white font-bold shadow-sm'
                            : 'border-bistro-border bg-bistro-cream/30 text-bistro-text hover:border-bistro-border-strong hover:bg-white'
                        }`}
                      >
                        <span className={`text-[10px] uppercase ${isSelected ? 'text-white/90' : 'text-bistro-muted'}`}>
                          {item.dayName}
                        </span>
                        <span className="font-serif text-lg font-bold my-0.5">{item.dayNum}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-bistro-muted'}`}>
                          {item.monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-bistro-muted font-semibold mb-3">
                  Время посадки:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = booking.time === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setBooking((prev) => ({ ...prev, time: slot }))}
                        className={`py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'border-bistro-terracotta bg-bistro-terracotta text-white font-bold shadow-sm'
                            : 'border-bistro-border bg-bistro-cream/30 text-bistro-text hover:border-bistro-border-strong hover:bg-white'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Contact Information */}
          {step === 4 && (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-bistro-cream/50 border border-bistro-border space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-bistro-muted">Зона:</span>
                  <span className="font-serif font-bold text-bistro-dark">{currentZone.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bistro-muted">Гостей:</span>
                  <span className="font-bold text-bistro-dark">{booking.guestsCount} чел. ({booking.occasion})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bistro-muted">Дата и время:</span>
                  <span className="font-bold text-bistro-terracotta">
                    {booking.date} в {booking.time}
                  </span>
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-bistro-muted font-semibold mb-1.5">
                    Имя гостя *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bistro-muted" />
                    <input
                      type="text"
                      placeholder="Константин"
                      value={booking.customerName}
                      onChange={(e) => setBooking((prev) => ({ ...prev, customerName: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-bistro-border text-bistro-dark placeholder-bistro-muted/60 focus:outline-none focus:border-bistro-terracotta text-sm"
                    />
                  </div>
                  {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-bistro-muted font-semibold mb-1.5">
                    Контактный телефон *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bistro-muted" />
                    <input
                      type="tel"
                      placeholder="+375 (29) 000-00-00"
                      value={booking.customerPhone}
                      onChange={(e) => setBooking((prev) => ({ ...prev, customerPhone: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-bistro-border text-bistro-dark placeholder-bistro-muted/60 focus:outline-none focus:border-bistro-terracotta text-sm"
                    />
                  </div>
                  {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-bistro-muted font-semibold mb-1.5">
                    Особые пожелания (аллергии, предзаказ цветов к столу)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Например: столик ближе к пальмам, нужен стульчик для ребенка"
                    value={booking.wishes}
                    onChange={(e) => setBooking((prev) => ({ ...prev, wishes: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-bistro-border text-bistro-dark placeholder-bistro-muted/60 focus:outline-none focus:border-bistro-terracotta text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Success Confirmation Screen */}
          {step === 5 && (
            <div className="py-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-bistro-olive/10 border border-bistro-olive/30 text-bistro-olive flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-2xl font-serif font-bold text-bistro-dark uppercase mb-2">
                Стол забронирован!
              </h4>
              <p className="text-bistro-muted text-sm max-w-md mb-6 font-light">
                Номер бронирования: <strong className="text-bistro-terracotta">#BB-{Math.floor(1000 + Math.random() * 9000)}</strong>.
                Мы отправили электронное подтверждение на телефон <span className="text-bistro-dark font-medium">{booking.customerPhone}</span>.
              </p>

              <div className="w-full max-w-md p-5 rounded-2xl bg-bistro-cream/50 border border-bistro-border text-left text-xs space-y-2.5 mb-6">
                <div className="flex justify-between">
                  <span className="text-bistro-muted">Гость:</span>
                  <span className="text-bistro-dark font-serif font-bold text-sm">{booking.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bistro-muted">Зона посадки:</span>
                  <span className="text-bistro-dark font-medium">{currentZone.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bistro-muted">Персон:</span>
                  <span className="text-bistro-dark font-medium">{booking.guestsCount} ({booking.occasion})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bistro-muted">Дата и время:</span>
                  <span className="text-bistro-terracotta font-bold">
                    {booking.date} в {booking.time}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-bistro-border">
                  <span className="text-bistro-muted">Адрес:</span>
                  <span className="text-bistro-dark">г. Минск, ул. Революционная, 17</span>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="px-8 py-3 rounded-full bg-bistro-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-bistro-terracotta-hover transition-colors shadow-sm"
              >
                Отлично, закрыть
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step < 5 && (
          <div className="p-4 sm:p-5 border-t border-bistro-border bg-bistro-cream/40 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={handlePrevStep}
                className="px-4 py-2.5 rounded-full bg-white border border-bistro-border text-bistro-text hover:bg-bistro-cream text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Назад</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-full bg-bistro-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-bistro-terracotta-hover transition-all shadow-sm flex items-center gap-2"
            >
              <span>{step === 4 ? 'Подтвердить бронь' : 'Продолжить'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
