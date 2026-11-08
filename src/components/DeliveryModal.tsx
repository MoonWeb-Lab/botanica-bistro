import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, MapPin, Phone, User, Clock, CreditCard, Banknote, ShieldCheck, CheckCircle2, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { formatBelarusPhone, validateBelarusPhone } from '../utils/phoneValidation';

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
  onOpenMenu: () => void;
}

export const DeliveryModal: React.FC<DeliveryModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenMenu,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Cart, 2: Address & Phone, 3: Success

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [apartment, setApartment] = useState('');
  const [entrance, setEntrance] = useState('');
  const [floor, setFloor] = useState('');
  const [comment, setComment] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card_online' | 'card_courier' | 'cash'>('card_online');
  const [deliveryTiming, setDeliveryTiming] = useState<'asap' | 'scheduled'>('asap');
  const [scheduledTime, setScheduledTime] = useState('19:30');

  // Errors
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);

  // Generated order number
  const [orderNumber, setOrderNumber] = useState('');

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

  const subtotal = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const FREE_DELIVERY_THRESHOLD = 60;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : 7;
  const total = subtotal + deliveryFee;

  const validateCheckout = () => {
    let valid = true;

    if (!customerName.trim()) {
      setNameError('Укажите имя получателя');
      valid = false;
    } else {
      setNameError(null);
    }

    const phoneValidation = validateBelarusPhone(customerPhone);
    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.error);
      valid = false;
    } else {
      setPhoneError(null);
    }

    if (!street.trim() || !house.trim()) {
      setAddressError('Укажите улицу и номер дома в Минске');
      valid = false;
    } else {
      setAddressError(null);
    }

    return valid;
  };

  const handlePlaceOrder = () => {
    if (!validateCheckout()) return;
    const generated = `#BB-DEL-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generated);
    setStep(3);
  };

  const handleFinish = () => {
    onClearCart();
    setStep(1);
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-bistro-terracotta/10 border border-bistro-terracotta/20 flex items-center justify-center text-bistro-terracotta">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-bistro-terracotta font-bold">
                {step === 1 && `Корзина • ${cart.reduce((c, i) => c + i.quantity, 0)} блюд`}
                {step === 2 && 'Оформление доставки по Минску'}
                {step === 3 && 'Заказ передан на кухню'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-bistro-dark font-serif uppercase tracking-tight">
                {step === 1 && 'Гастрономическая доставка'}
                {step === 2 && 'Адрес и контактные данные'}
                {step === 3 && 'Заказ успешно оформлен!'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-bistro-cream text-bistro-muted hover:text-bistro-dark transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Cart Items */}
          {step === 1 && (
            <div>
              {cart.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-bistro-cream border border-bistro-sand flex items-center justify-center text-bistro-muted mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-bistro-dark mb-2">Ваша корзина пуста</h4>
                  <p className="text-xs text-bistro-muted max-w-sm mb-6 font-light">
                    Выберите фирменные блюда из авторского меню шефа Артура Миллера для доставки на дом или в офис.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenMenu();
                    }}
                    className="px-6 py-3 rounded-full bg-bistro-terracotta text-white font-bold uppercase tracking-wider text-xs shadow-sm hover:bg-bistro-terracotta-hover transition-colors flex items-center gap-2"
                  >
                    <span>Перейти к меню кухни</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Free Delivery Bar */}
                  <div className="p-3.5 rounded-2xl bg-bistro-cream/50 border border-bistro-border text-xs">
                    {subtotal >= FREE_DELIVERY_THRESHOLD ? (
                      <div className="flex items-center gap-2 text-bistro-olive font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Поздравляем! Для вашего заказа доставка по Минску бесплатна.</span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between text-bistro-text mb-1.5 font-medium">
                          <span>До бесплатной доставки по Минску:</span>
                          <span className="font-bold text-bistro-terracotta">
                            ещё {(FREE_DELIVERY_THRESHOLD - subtotal).toFixed(0)} BYN
                          </span>
                        </div>
                        <div className="w-full bg-bistro-border/60 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-bistro-terracotta h-full rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Items List */}
                  <div className="divide-y divide-bistro-border/60">
                    {cart.map((item) => (
                      <div key={item.dish.id} className="py-3.5 flex items-center gap-3 sm:gap-4">
                        <img
                          src={item.dish.image}
                          alt={item.dish.name}
                          className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-bistro-border/60"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-sm font-bold text-bistro-dark truncate">
                            {item.dish.name}
                          </h4>
                          <span className="text-[11px] text-bistro-muted block">
                            {item.dish.weight} • {item.dish.price} BYN за порцию
                          </span>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 border border-bistro-border rounded-full px-2 py-1 bg-bistro-cream/40">
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, -1)}
                            className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-bistro-text hover:text-bistro-terracotta shadow-xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-sans font-bold text-xs w-5 text-center text-bistro-dark">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, 1)}
                            className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-bistro-text hover:text-bistro-terracotta shadow-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right min-w-[70px]">
                          <span className="font-sans font-extrabold text-sm text-bistro-dark block">
                            {item.dish.price * item.quantity} BYN
                          </span>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => onRemoveItem(item.dish.id)}
                          className="text-bistro-muted hover:text-red-500 p-1.5 transition-colors"
                          title="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-bistro-cream/40 border border-bistro-border space-y-2 text-xs">
                    <div className="flex justify-between text-bistro-muted">
                      <span>Сумма блюд:</span>
                      <span className="font-sans font-bold text-bistro-dark">{subtotal} BYN</span>
                    </div>
                    <div className="flex justify-between text-bistro-muted">
                      <span>Доставка курьером по Минску:</span>
                      <span className="font-sans font-bold text-bistro-olive">
                        {deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} BYN`}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-bistro-border text-sm">
                      <span className="font-serif font-bold text-bistro-dark uppercase">Итого к оплате:</span>
                      <span className="font-sans text-xl font-black text-bistro-terracotta">
                        {total} BYN
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Delivery Details & Phone Validation */}
          {step === 2 && (
            <div className="space-y-5">
              {/* Recipient details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-bistro-muted font-semibold mb-1.5">
                    Имя получателя *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bistro-muted" />
                    <input
                      type="text"
                      placeholder="Алексей"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (nameError) setNameError(null);
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-bistro-border text-bistro-dark placeholder-bistro-muted/60 focus:outline-none focus:border-bistro-terracotta text-sm"
                    />
                  </div>
                  {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs uppercase tracking-wider text-bistro-muted font-semibold">
                      Телефон получателя *
                    </label>
                    <span className="text-[10px] text-bistro-olive font-medium">Беларусь (+375)</span>
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bistro-muted" />
                    <input
                      type="tel"
                      placeholder="+375 (29) 000-00-00"
                      value={customerPhone}
                      onChange={(e) => {
                        const formatted = formatBelarusPhone(e.target.value);
                        setCustomerPhone(formatted);
                        if (phoneError) setPhoneError(null);
                      }}
                      className={`w-full pl-10 pr-10 py-3 rounded-xl bg-white border text-bistro-dark placeholder-bistro-muted/60 focus:outline-none text-sm font-sans ${
                        phoneError
                          ? 'border-red-500 focus:border-red-500'
                          : customerPhone.length >= 19
                          ? 'border-emerald-600 focus:border-emerald-600'
                          : 'border-bistro-border focus:border-bistro-terracotta'
                      }`}
                    />
                    {customerPhone.length >= 19 && !phoneError && (
                      <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  {phoneError ? (
                    <p className="text-red-500 text-xs mt-1 font-medium">{phoneError}</p>
                  ) : (
                    <p className="text-[11px] text-bistro-muted mt-1">Формат: +375 (XX) XXX-XX-XX</p>
                  )}
                </div>
              </div>

              {/* Address in Minsk */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-bistro-muted font-semibold mb-1.5">
                  Адрес доставки в Минске *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bistro-muted" />
                    <input
                      type="text"
                      placeholder="Улица (например: пр. Победителей)"
                      value={street}
                      onChange={(e) => {
                        setStreet(e.target.value);
                        if (addressError) setAddressError(null);
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-bistro-border text-bistro-dark placeholder-bistro-muted/60 focus:outline-none focus:border-bistro-terracotta text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Дом / Корпус *"
                      value={house}
                      onChange={(e) => {
                        setHouse(e.target.value);
                        if (addressError) setAddressError(null);
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-bistro-border text-bistro-dark placeholder-bistro-muted/60 focus:outline-none focus:border-bistro-terracotta text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-3">
                  <input
                    type="text"
                    placeholder="Квартира / Офис"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-bistro-border text-bistro-dark placeholder-bistro-muted/60 focus:outline-none focus:border-bistro-terracotta text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Подъезд"
                    value={entrance}
                    onChange={(e) => setEntrance(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-bistro-border text-bistro-dark placeholder-bistro-muted/60 focus:outline-none focus:border-bistro-terracotta text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Этаж"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-bistro-border text-bistro-dark placeholder-bistro-muted/60 focus:outline-none focus:border-bistro-terracotta text-xs"
                  />
                </div>
                {addressError && <p className="text-red-500 text-xs mt-1.5">{addressError}</p>}
              </div>

              {/* Delivery Timing */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-bistro-muted font-semibold mb-2">
                  Время доставки:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryTiming('asap')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all text-xs font-semibold ${
                      deliveryTiming === 'asap'
                        ? 'border-bistro-terracotta bg-bistro-terracotta/10 text-bistro-terracotta ring-1 ring-bistro-terracotta'
                        : 'border-bistro-border bg-white text-bistro-text hover:border-bistro-border-strong'
                    }`}
                  >
                    <Clock className="w-4 h-4 shrink-0" />
                    <div>
                      <span>Как можно скорее</span>
                      <span className="block text-[10px] text-bistro-muted font-normal">~45–60 минут</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryTiming('scheduled')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all text-xs font-semibold ${
                      deliveryTiming === 'scheduled'
                        ? 'border-bistro-terracotta bg-bistro-terracotta/10 text-bistro-terracotta ring-1 ring-bistro-terracotta'
                        : 'border-bistro-border bg-white text-bistro-text hover:border-bistro-border-strong'
                    }`}
                  >
                    <Clock className="w-4 h-4 shrink-0" />
                    <div className="flex-1">
                      <span>Ко времени сегодня</span>
                      {deliveryTiming === 'scheduled' ? (
                        <select
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                          className="mt-1 block w-full text-xs font-semibold bg-white border border-bistro-border rounded-lg px-2 py-1 text-bistro-dark focus:outline-none focus:border-bistro-terracotta"
                        >
                          {['13:00', '14:00', '15:30', '17:00', '18:30', '19:30', '20:30', '21:30'].map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="block text-[10px] text-bistro-muted font-normal">{scheduledTime}</span>
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-bistro-muted font-semibold mb-2">
                  Способ оплаты:
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { id: 'card_online', label: 'Картой онлайн', icon: ShieldCheck },
                    { id: 'card_courier', label: 'Картой курьеру', icon: CreditCard },
                    { id: 'cash', label: 'Наличными', icon: Banknote },
                  ].map((pay) => {
                    const Icon = pay.icon;
                    const isSelected = paymentMethod === pay.id;
                    return (
                      <button
                        key={pay.id}
                        type="button"
                        onClick={() => setPaymentMethod(pay.id as any)}
                        className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-semibold ${
                          isSelected
                            ? 'border-bistro-terracotta bg-bistro-terracotta text-white shadow-sm'
                            : 'border-bistro-border bg-white text-bistro-text hover:bg-bistro-cream/50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px]">{pay.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Courier Comment */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-bistro-muted font-semibold mb-1">
                  Комментарий курьеру
                </label>
                <textarea
                  rows={2}
                  placeholder="Код домофона, оставить у двери, бесконтактная доставка..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-bistro-border text-bistro-dark placeholder-bistro-muted/60 focus:outline-none focus:border-bistro-terracotta text-xs"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Order Success Screen */}
          {step === 3 && (
            <div className="py-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-bistro-olive/10 border border-bistro-olive/30 text-bistro-olive flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-2xl font-serif font-bold text-bistro-dark uppercase mb-2">
                Заказ передан на кухню!
              </h4>
              <p className="text-bistro-muted text-sm max-w-md mb-6 font-light">
                Номер заказа: <strong className="text-bistro-terracotta">{orderNumber}</strong>.
                Шеф-повар уже готовит блюда. Курьер доставит заказ на <span className="text-bistro-dark font-medium">{customerPhone}</span> в течение 45–60 минут.
              </p>

              <div className="w-full max-w-md p-5 rounded-2xl bg-bistro-cream/50 border border-bistro-border text-left text-xs space-y-2.5 mb-6">
                <div className="flex justify-between">
                  <span className="text-bistro-muted">Получатель:</span>
                  <span className="text-bistro-dark font-bold font-serif">{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bistro-muted">Адрес доставки:</span>
                  <span className="text-bistro-dark font-medium truncate max-w-[240px]">
                    г. Минск, {street}, д. {house} {apartment ? `, кв. ${apartment}` : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bistro-muted">Оплата:</span>
                  <span className="text-bistro-dark font-medium">
                    {paymentMethod === 'card_online' && 'Картой онлайн (оплачено)'}
                    {paymentMethod === 'card_courier' && 'Терминал курьера при вручении'}
                    {paymentMethod === 'cash' && 'Наличными при получении'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-bistro-border items-baseline">
                  <span className="text-bistro-muted">Итого к оплате:</span>
                  <span className="font-sans font-black text-lg text-bistro-terracotta">
                    {total} BYN
                  </span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="px-8 py-3 rounded-full bg-bistro-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-bistro-terracotta-hover transition-colors shadow-sm"
              >
                Отлично, закрыть
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {cart.length > 0 && step < 3 && (
          <div className="p-4 sm:p-5 border-t border-bistro-border bg-bistro-cream/40 flex items-center justify-between">
            {step === 2 ? (
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-full bg-white border border-bistro-border text-bistro-text hover:bg-bistro-cream text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Назад в корзину</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenMenu();
                }}
                className="text-xs text-bistro-muted hover:text-bistro-dark font-medium"
              >
                + Добавить ещё блюда
              </button>
            )}

            {step === 1 ? (
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-full bg-bistro-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-bistro-terracotta-hover transition-all shadow-sm flex items-center gap-2"
              >
                <span>Оформить заказ ({total} BYN)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                className="px-6 py-2.5 rounded-full bg-bistro-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-bistro-terracotta-hover transition-all shadow-sm flex items-center gap-2"
              >
                <span>Подтвердить доставку</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
