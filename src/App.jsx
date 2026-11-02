import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import VirtualAssistanceButton from './components/VirtualAssistanceButton';
import CartButton from './components/CartButton';
import CartDrawer from './components/cart/CartDrawer';
import { CartProvider } from './context/CartContext';

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
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [showFloatingOnHome, setShowFloatingOnHome] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  const [isLandscapeMobile, setIsLandscapeMobile] = React.useState(() =>
    typeof window !== 'undefined'
      ? window.innerWidth < 640 && window.innerWidth > window.innerHeight
      : false
  );

  // Individual collision suppression states: true if button obstructs booking controls
  const [collisions, setCollisions] = React.useState({
    cart: false,
    va: false,
    wa: false,
  });

  const checkCollisions = React.useCallback(() => {
    // If not on homepage, no hero booking card exists, so no collisions can occur
    if (!isHomePage) {
      setCollisions((prev) => (prev.cart || prev.va || prev.wa ? { cart: false, va: false, wa: false } : prev));
      return;
    }

    const bookingCard = document.getElementById('hero-booking-card');
    const checkRatesBtn = document.getElementById('hero-check-rates-btn');

    if (!bookingCard && !checkRatesBtn) {
      setCollisions((prev) => (prev.cart || prev.va || prev.wa ? { cart: false, va: false, wa: false } : prev));
      return;
    }

    // Collect active booking control targets
    const targetRects = [];
    if (checkRatesBtn) {
      const r = checkRatesBtn.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) targetRects.push(r);
    }
    if (bookingCard) {
      const r = bookingCard.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) targetRects.push(r);
    }

    const vh = window.innerHeight;
    const vw = window.innerWidth;

    // Filter targets that are actually within the visible viewport bounds
    const visibleTargets = targetRects.filter((t) => t.bottom > 0 && t.top < vh && t.right > 0 && t.left < vw);

    if (visibleTargets.length === 0) {
      setCollisions((prev) => (prev.cart || prev.va || prev.wa ? { cart: false, va: false, wa: false } : prev));
      return;
    }

    const cartEl = document.getElementById('floating-cart-btn');
    const vaEl = document.getElementById('floating-va-btn');
    const waEl = document.getElementById('floating-whatsapp-btn');

    // Helper to compute resting bounding box (compensating for translate offsets and transitions)
    const getRestingRect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return null;

      const isHidden = el.getAttribute('aria-hidden') === 'true' || el.classList.contains('invisible');
      const isVa = el.id === 'floating-va-btn';

      let xOffset = 0;
      let yOffset = 0;

      // Extract current computed translation matrix to account for transition intermediate states
      let tx = 0;
      let ty = 0;
      try {
        const style = window.getComputedStyle(el);
        const transform = style.transform || style.webkitTransform;
        if (transform && transform !== 'none') {
          if (typeof DOMMatrixReadOnly !== 'undefined') {
            const m = new DOMMatrixReadOnly(transform);
            tx = m.m41;
            ty = m.m42;
          } else {
            const match = transform.match(/matrix(?:3d)?\((.+)\)/);
            if (match) {
              const p = match[1].split(',').map((s) => parseFloat(s.trim()));
              if (p.length === 6) {
                tx = p[4] || 0;
                ty = p[5] || 0;
              } else if (p.length === 16) {
                tx = p[12] || 0;
                ty = p[13] || 0;
              }
            }
          }
        }
      } catch (e) {
        // fallback
      }

      if (isVa) {
        // For VA button: if hidden or in transition with horizontal translation, offset by tx (or 112 fallback)
        if (isHidden) {
          xOffset = tx !== 0 ? tx : 112;
        } else if (tx !== 0) {
          xOffset = tx;
        }
      } else {
        // For other FABs: if hidden or in transition with vertical translation, offset by ty (or 16 fallback)
        if (isHidden) {
          yOffset = ty !== 0 ? ty : 16;
        } else if (ty !== 0) {
          yOffset = ty;
        }
      }

      return {
        left: r.left - xOffset,
        right: r.right - xOffset,
        top: r.top - yOffset,
        bottom: r.bottom - yOffset,
        width: r.width,
        height: r.height,
      };
    };

    const cartRect = getRestingRect(cartEl);
    const vaRect = getRestingRect(vaEl);
    const waRect = getRestingRect(waEl);

    const buffer = 4; // 4px safety clearance around booking controls

    const doesOverlap = (fabRect) => {
      if (!fabRect) return false;
      return visibleTargets.some((target) => {
        return !(
          fabRect.right + buffer < target.left ||
          fabRect.left - buffer > target.right ||
          fabRect.bottom + buffer < target.top ||
          fabRect.top - buffer > target.bottom
        );
      });
    };

    const nextCart = doesOverlap(cartRect);
    const nextVa = doesOverlap(vaRect);
    const nextWa = doesOverlap(waRect);

    setCollisions((prev) => {
      if (prev.cart === nextCart && prev.va === nextVa && prev.wa === nextWa) {
        return prev;
      }
      return { cart: nextCart, va: nextVa, wa: nextWa };
    });
  }, [isHomePage]);

  useEffect(() => {
    let rafId = null;

    const updateAll = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setIsLandscapeMobile(mobile && window.innerWidth > window.innerHeight);

      if (window.scrollY >= 60) {
        setShowFloatingOnHome(true);
      } else {
        setShowFloatingOnHome(false);
      }

      checkCollisions();
    };

    const handleThrottledUpdate = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateAll();
      });
    };

    updateAll();
    window.addEventListener('scroll', handleThrottledUpdate, { passive: true });
    window.addEventListener('resize', handleThrottledUpdate, { passive: true });

    let ro = null;
    const cardEl = document.getElementById('hero-booking-card');
    if (cardEl && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        handleThrottledUpdate();
      });
      ro.observe(cardEl);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleThrottledUpdate);
      window.removeEventListener('resize', handleThrottledUpdate);
      if (ro) ro.disconnect();
    };
  }, [checkCollisions]);

  // Floating controls baseline:
  // - On non-homepage routes: always visible
  // - On tablet/desktop: always visible by default
  // - On mobile homepage: gracefully hidden at scrollY < 60 to keep initial view uncluttered
  const baseFloatingVisible = !isHomePage || !isMobile || showFloatingOnHome;

  // Collision-aware resolution: each button is visible IF baseline says visible AND no geometric collision
  const isCartVisible = baseFloatingVisible && !collisions.cart;
  const isVaVisible = baseFloatingVisible && !collisions.va;
  const isWaVisible = baseFloatingVisible && !collisions.wa;

  return (
    <CartProvider>
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

        <CartDrawer />
        <CartButton isVisible={isCartVisible} isLandscapeMobile={isLandscapeMobile} />
        <VirtualAssistanceButton isVisible={isVaVisible} isLandscapeMobile={isLandscapeMobile} />
        <WhatsAppButton isVisible={isWaVisible} isLandscapeMobile={isLandscapeMobile} />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
