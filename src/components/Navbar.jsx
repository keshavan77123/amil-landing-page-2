import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, CalendarCheck } from 'lucide-react';
import { Button } from './ui/Button';
import { hotelData } from '../data/hotel';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const lastScrollY = React.useRef(0);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const SCROLL_THRESHOLD = 10;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hysteresis range to prevent threshold jitter:
      // Solid header activates past 60px; returns to transparent when near top (< 30px)
      if (currentScrollY > 60) {
        setIsScrolled(true);
      } else if (currentScrollY < 30) {
        setIsScrolled(false);
      }

      // Scroll-direction hide/show logic
      if (currentScrollY <= 0) {
        // At the top: always show
        setIsNavHidden(false);
      } else {
        const delta = currentScrollY - lastScrollY.current;
        if (delta > SCROLL_THRESHOLD) {
          // Scrolling down past threshold: hide
          setIsNavHidden(true);
        } else if (delta < -SCROLL_THRESHOLD) {
          // Scrolling up past threshold: show
          setIsNavHidden(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and reset nav visibility on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsNavHidden(false);
    setGuestModalOpen(false);
    lastScrollY.current = 0;
  }, [location.pathname]);

  // Support Escape key to close Guest Account modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setGuestModalOpen(false);
      }
    };
    if (guestModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [guestModalOpen]);

  // Determine whether to use transparent dark header or solid ivory header
  const isTransparent = isHomePage && !isScrolled;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Dining', path: '/dining' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'Events', path: '/events' },
    { name: 'Nearby', path: '/nearby' },
    { name: 'Contact', path: '/contact' },
  ];

  const primaryNavLinks = navLinks.slice(0, 4);
  const secondaryNavLinks = navLinks.slice(4);

  const renderNavLinks = (links) =>
    links.map((link) => {
      const isActive = location.pathname === link.path;
      return (
        <Link
          key={link.name}
          to={link.path}
          className={`text-[16px] leading-6 whitespace-nowrap uppercase tracking-[0.04em] font-montserrat font-medium transition-all duration-300 relative py-1 ${
            isActive
              ? 'text-amil-red'
              : isTransparent
              ? 'text-ivory/90 hover:text-white'
              : 'text-charcoal-text/80 hover:text-amil-red'
          }`}
        >
          {link.name}
          {isActive && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amil-red rounded-full" />
          )}
        </Link>
      );
    });

  return (
    <>
      <header
        style={{ transition: 'transform 550ms cubic-bezier(0.22, 1, 0.36, 1), background 500ms ease-in-out, color 500ms ease-in-out, padding 500ms ease-in-out, box-shadow 500ms ease-in-out, border-color 500ms ease-in-out' }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          isNavHidden && !mobileMenuOpen
            ? '-translate-y-full pointer-events-none'
            : 'translate-y-0'
        } ${
          isTransparent
            ? 'bg-gradient-to-b from-charcoal/55 via-charcoal/20 to-transparent text-ivory py-3 md:py-3.5'
            : 'bg-ivory/95 backdrop-blur-md text-charcoal-text shadow-sm border-b border-border-light/70 py-2.5 md:py-3'
        }`}
      >
        {/* Desktop Split Navigation Header (Grid: Left Group | Center Logo | Right Group + Book Now) */}
        <div className="hidden lg:grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-8 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-5 xl:gap-x-10">
          {/* Left Navigation Group: Home, Rooms, Dining, Amenities */}
          <div className="flex min-w-0 items-center justify-end">
            <nav className="flex items-center gap-4 xl:gap-7 whitespace-nowrap">
              {renderNavLinks(primaryNavLinks)}
            </nav>
          </div>

          {/* Center: Hotel Amil Logo (Precisely centered at viewport center on homepage, preserved in-flow on other pages) */}
          <div className={`flex items-center justify-center shrink-0 ${isHomePage ? 'w-32 xl:w-40 h-16' : ''}`}>
            <Link
              to="/"
              className={`flex items-center justify-center group transition-transform duration-300 py-0.5 ${
                isHomePage
                  ? 'lg:absolute lg:left-[50vw] lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:z-20'
                  : ''
              }`}
            >
              <img
                src={isTransparent ? "/images/brand/hotel-amil-logo-reversed.svg" : "/images/brand/hotel-amil-logo-red.svg"}
                alt="Hotel Amil"
                className="h-16 w-auto object-contain transition-all duration-300"
              />
            </Link>
          </div>

          {/* Right Navigation Group: Events, Nearby, Contact + Far-Right Book Now CTA */}
          <div className="flex min-w-0 items-center justify-between w-full">
            <nav className="flex items-center gap-4 xl:gap-7 whitespace-nowrap">
              {renderNavLinks(secondaryNavLinks)}
            </nav>

            <div className="shrink-0 pl-5 xl:pl-8">
              <Link to="/booking">
                <Button
                  variant="primary"
                  size="sm"
                  className="text-[16px] tracking-normal font-semibold px-[22px] py-3 shadow-sm"
                >
                  <CalendarCheck className="w-3.5 h-3.5 mr-1.5 inline" />
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Navigation Header (< 1024px) */}
        {isHomePage ? (
          <>
            {/* Phone Homepage Header (< 640px): Left Hamburger, Viewport-Centered Logo, No Book Now */}
            <div className="sm:hidden relative flex items-center justify-between w-full h-16 px-4">
              {/* Left-Side Hamburger Menu */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`min-w-[44px] min-h-[44px] p-2 rounded-sm transition-colors focus:outline-none flex items-center justify-center z-20 ${
                  isTransparent
                    ? 'text-ivory hover:bg-white/10'
                    : 'text-amil-red hover:bg-black/5'
                }`}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-7 h-7 stroke-2" /> : <Menu className="w-7 h-7 stroke-2" />}
              </button>

              {/* Logo B: Compact Fixed Header Logo (Fades in when header is solid & scrolled, hidden when transparent) */}
              <Link
                to="/"
                aria-label="Hotel Amil - Return to Homepage"
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group py-1 z-10 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                  mobileMenuOpen || isTransparent
                    ? 'opacity-0 pointer-events-none invisible'
                    : 'opacity-100 pointer-events-auto visible'
                }`}
              >
                <img
                  src="/images/brand/hotel-amil-logo-red.svg"
                  alt="Hotel Amil"
                  className="h-14 w-auto object-contain drop-shadow-sm"
                />
              </Link>

              {/* Right-Side Profile / Guest Account Icon */}
              <button
                type="button"
                onClick={() => setGuestModalOpen(true)}
                className={`min-w-[44px] min-h-[44px] p-2 rounded-sm transition-colors focus:outline-none flex items-center justify-center z-20 ${
                  mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
                } ${
                  isTransparent
                    ? 'text-ivory hover:bg-white/10'
                    : 'text-amil-red hover:bg-black/5'
                }`}
                aria-label="Guest Account"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="7.25" r="4.25" />
                  <path d="M4.5 20.5C4.5 16.36 7.86 13 12 13s7.5 3.36 7.5 7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5z" />
                </svg>
              </button>
            </div>

            {/* Tablet Homepage Header (640px–1023px): 100% Preserved Left Logo, Right Book Now + Hamburger */}
            <div className="hidden sm:flex lg:hidden max-w-7xl mx-auto px-6 lg:px-8 items-center justify-between w-full">
              <Link to="/" className="flex items-center group transition-transform duration-300 py-1">
                <img
                  src={isTransparent ? "/images/brand/hotel-amil-logo-reversed.svg" : "/images/brand/hotel-amil-logo-red.svg"}
                  alt="Hotel Amil"
                  className="h-[4.25rem] w-auto object-contain transition-all duration-300"
                />
              </Link>

              <div className="flex items-center space-x-4">
                <Link to="/booking">
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-[16px] tracking-normal font-semibold px-[22px] py-3 shadow-sm"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 mr-1.5 inline" />
                    Book Now
                  </Button>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`p-2 rounded-sm transition-colors focus:outline-none ${
                    isTransparent
                      ? 'text-ivory hover:bg-white/10'
                      : 'text-charcoal-text hover:bg-black/5'
                  }`}
                  aria-label="Toggle navigation menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Phone Non-Homepage Header (< 640px): Left Hamburger, Centered Logo, Empty Right */}
            <div className="sm:hidden relative flex items-center justify-between w-full h-16 px-4">
              {/* Left-Side Hamburger Menu */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`min-w-[44px] min-h-[44px] p-2 rounded-sm transition-colors focus:outline-none flex items-center justify-center z-20 ${
                  isTransparent
                    ? 'text-ivory hover:bg-white/10'
                    : 'text-amil-red hover:bg-black/5'
                }`}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-7 h-7 stroke-2" /> : <Menu className="w-7 h-7 stroke-2" />}
              </button>

              {/* Horizontally Centered Hotel Amil Logo */}
              <Link
                to="/"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group py-1 z-10 transition-all duration-300"
              >
                <img
                  src={isTransparent ? "/images/brand/hotel-amil-logo-reversed.svg" : "/images/brand/hotel-amil-logo-red.svg"}
                  alt="Hotel Amil"
                  className="h-14 sm:h-[4.25rem] w-auto object-contain transition-all duration-300 drop-shadow-sm"
                />
              </Link>

              {/* Right-Side Profile / Guest Account Icon */}
              <button
                type="button"
                onClick={() => setGuestModalOpen(true)}
                className={`min-w-[44px] min-h-[44px] p-2 rounded-sm transition-colors focus:outline-none flex items-center justify-center z-20 ${
                  mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
                } ${
                  isTransparent
                    ? 'text-ivory hover:bg-white/10'
                    : 'text-amil-red hover:bg-black/5'
                }`}
                aria-label="Guest Account"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="7.25" r="4.25" />
                  <path d="M4.5 20.5C4.5 16.36 7.86 13 12 13s7.5 3.36 7.5 7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5z" />
                </svg>
              </button>
            </div>

            {/* Tablet Non-Homepage Header (640px–1023px): 100% Preserved Left Logo, Right Book Now + Hamburger */}
            <div className="hidden sm:flex lg:hidden max-w-7xl mx-auto px-6 lg:px-8 items-center justify-between w-full">
              <Link to="/" className="flex items-center group transition-transform duration-300 py-1">
                <img
                  src={isTransparent ? "/images/brand/hotel-amil-logo-reversed.svg" : "/images/brand/hotel-amil-logo-red.svg"}
                  alt="Hotel Amil"
                  className="h-[4.25rem] w-auto object-contain transition-all duration-300"
                />
              </Link>

              <div className="flex items-center space-x-4">
                <Link to="/booking">
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-[16px] tracking-normal font-semibold px-[22px] py-3 shadow-sm"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 mr-1.5 inline" />
                    Book Now
                  </Button>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`p-2 rounded-sm transition-colors focus:outline-none ${
                    isTransparent
                      ? 'text-ivory hover:bg-white/10'
                      : 'text-charcoal-text hover:bg-black/5'
                  }`}
                  aria-label="Toggle navigation menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Mobile Slide-down / Fullscreen Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal/95 backdrop-blur-lg lg:hidden transition-all duration-500 ease-in-out flex flex-col justify-between pt-24 pb-12 px-8 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-6 text-center">
          <div className="mb-2">
            <img
              src="/images/brand/hotel-amil-logo-reversed.svg"
              alt="Hotel Amil"
              className="h-20 mx-auto object-contain mb-2"
            />
            <p className="text-muted-gold font-cormorant text-base italic">For Your Comfort...</p>
          </div>

          <div className="w-12 h-[1px] bg-amil-red/40 mx-auto" />

          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base uppercase tracking-luxury-wide font-serif transition-colors py-1 ${
                  isActive ? 'text-amil-red font-medium' : 'text-ivory/80 hover:text-ivory'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="space-y-4 text-center">
          <Link to="/booking" className="block w-full">
            <Button variant="primary" size="lg" className="w-full text-xs tracking-luxury">
              Book Your Stay
            </Button>
          </Link>
          <div className="text-xs text-ivory/60 space-y-1">
            <p>{hotelData.fullAddress}</p>
            <p>Reservations: {hotelData.phone}</p>
          </div>
        </div>
      </div>

      {/* Guest Account Coming Soon Modal */}
      {guestModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setGuestModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="guest-account-title"
        >
          <div
            className="relative w-full max-w-sm bg-ivory border border-border-light rounded-sm shadow-2xl p-6 sm:p-7 text-center transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              id="guest-account-title"
              className="font-serif text-2xl font-normal text-amil-red mb-3 tracking-wide"
            >
              Guest Account
            </h3>

            <p className="text-charcoal-text/80 text-sm leading-relaxed mb-6 font-sans">
              Guest account access is coming soon. Stay tuned for a more personalised Hotel Amil experience.
            </p>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setGuestModalOpen(false)}
              className="w-full tracking-luxury text-xs py-3 font-semibold uppercase"
            >
              GOT IT
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
