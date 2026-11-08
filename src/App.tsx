import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { DeliverySection } from './components/DeliverySection';
import { SeatingZonesSection } from './components/SeatingZonesSection';
import { ChefSection } from './components/ChefSection';
import { WineSection } from './components/WineSection';
import { ContactsSection } from './components/ContactsSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { DeliveryModal } from './components/DeliveryModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { CookieBanner } from './components/CookieBanner';
import { SeatingZone, Dish, CartItem } from './types';
import { Calendar, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<SeatingZone | null>(null);
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCta(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (dish: Dish) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (dishId: string) => {
    setCart((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartSum = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  const handleOpenBooking = () => {
    setSelectedZone(null);
    setIsBookingOpen(true);
  };

  const handleSelectZone = (zone: SeatingZone) => {
    setSelectedZone(zone);
    setIsBookingOpen(true);
  };

  const handleSelectDishToBook = (_dish: Dish) => {
    setSelectedZone(null);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedZone(null);
  };

  return (
    <div className="min-h-screen bg-bistro-bg text-bistro-text flex flex-col font-sans selection:bg-bistro-terracotta selection:text-white">
      {/* Navigation Header */}
      <Header
        onOpenBooking={handleOpenBooking}
        onOpenDelivery={() => setIsDeliveryOpen(true)}
        cartCount={totalCartCount}
        cartTotal={totalCartSum}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero onOpenBooking={handleOpenBooking} />
        <MenuSection
          onSelectDishToBook={handleSelectDishToBook}
          onAddToCart={handleAddToCart}
          cart={cart}
        />
        <DeliverySection
          onOpenDelivery={() => setIsDeliveryOpen(true)}
          onOpenMenu={() => {
            const el = document.getElementById('menu');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <SeatingZonesSection onSelectZone={handleSelectZone} />
        <ChefSection />
        <WineSection />
        <ContactsSection />
      </main>

      {/* Footer */}
      <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      {/* Table Reservation Wizard Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedZone={selectedZone}
      />

      {/* Gourmet Food Delivery Modal */}
      <DeliveryModal
        isOpen={isDeliveryOpen}
        onClose={() => setIsDeliveryOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenMenu={() => {
          const el = document.getElementById('menu');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Cookie Consent Banner */}
      <CookieBanner onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      {/* Floating Cart Pill (when cart has items) */}
      {totalCartCount > 0 && !isDeliveryOpen && (
        <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 animate-in fade-in slide-in-from-bottom duration-300">
          <button
            onClick={() => setIsDeliveryOpen(true)}
            className="px-6 py-3.5 rounded-full bg-bistro-dark text-white shadow-soft-lift flex items-center gap-3 border border-white/10 hover:bg-bistro-terracotta transition-all hover:scale-105 active:scale-95 group"
          >
            <div className="w-6 h-6 rounded-full bg-bistro-terracotta flex items-center justify-center text-xs font-bold text-white">
              {totalCartCount}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold">Оформить доставку:</span>
              <span className="font-sans font-black text-sm text-bistro-sand">{totalCartSum} BYN</span>
            </div>
            <ArrowRight className="w-4 h-4 text-bistro-sand group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Mobile Sticky Floating CTA */}
      <div
        className={`fixed bottom-6 right-6 z-30 sm:hidden transition-all duration-300 ${
          showFloatingCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <button
          onClick={handleOpenBooking}
          className="px-5 py-3 rounded-full bg-bistro-terracotta text-white font-bold uppercase tracking-wider text-xs shadow-soft-lift flex items-center gap-2 border border-bistro-terracotta/20 active:scale-95 transition-transform"
        >
          <Calendar className="w-4 h-4 text-white" />
          <span>Бронь стола</span>
        </button>
      </div>
    </div>
  );
};

export default App;
