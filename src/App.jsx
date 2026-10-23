import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Dining from './pages/Dining';
import Amenities from './pages/Amenities';
import Events from './pages/Events';
import Nearby from './pages/Nearby';
import Policy from './pages/Policy';
import BookingEnquiry from './pages/BookingEnquiry';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Payment from './pages/Payment';

// Helper component to reset scroll position on route changes
const ScrollToTopOnNavigate = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }
  }, [pathname, hash]);

  return null;
};

export function App() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory text-charcoal-text font-sans selection:bg-amil-red selection:text-ivory">
      <ScrollToTopOnNavigate />
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:roomId" element={<RoomDetail />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/saffron-restaurant" element={<Dining />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/events" element={<Events />} />
          <Route path="/nearby" element={<Nearby />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/booking" element={<BookingEnquiry />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}

export default App;
