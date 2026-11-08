import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { SeatingZonesSection } from './components/SeatingZonesSection';
import { ChefSection } from './components/ChefSection';
import { WineSection } from './components/WineSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactsSection } from './components/ContactsSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { CookieBanner } from './components/CookieBanner';
import { SeatingZone, Dish } from './types';
import { Calendar } from 'lucide-react';

export const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<SeatingZone | null>(null);
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCta(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="min-h-screen bg-bistro-bg text-bistro-cream flex flex-col font-sans selection:bg-bistro-honey selection:text-black">
      {/* Navigation Header */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* Main Content */}
      <main className="flex-1">
        <Hero onOpenBooking={handleOpenBooking} />
        <MenuSection onSelectDishToBook={handleSelectDishToBook} />
        <SeatingZonesSection onSelectZone={handleSelectZone} />
        <ChefSection />
        <WineSection />
        <ReviewsSection />
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

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Cookie Consent Banner */}
      <CookieBanner onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      {/* Mobile Sticky Floating CTA */}
      <div
        className={`fixed bottom-6 right-6 z-30 sm:hidden transition-all duration-300 ${
          showFloatingCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <button
          onClick={handleOpenBooking}
          className="px-5 py-3 rounded-full bg-bistro-honey text-black font-bold uppercase tracking-wider text-xs shadow-honey-glow flex items-center gap-2 border border-black/20 active:scale-95 transition-transform"
        >
          <Calendar className="w-4 h-4 text-black" />
          <span>Бронь стола</span>
        </button>
      </div>
    </div>
  );
};

export default App;
