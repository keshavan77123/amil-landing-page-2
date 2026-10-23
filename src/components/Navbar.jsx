import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, CalendarCheck } from 'lucide-react';
import { Button } from './ui/Button';
import { hotelData } from '../data/hotel';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const lastScrollY = React.useRef(0);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const SCROLL_THRESHOLD = 10;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Existing isScrolled logic (unchanged)
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
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
    lastScrollY.current = 0;
  }, [location.pathname]);

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

        {/* Mobile Navigation Header */}
        <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center group transition-transform duration-300 py-1">
            <img
              src={isTransparent ? "/images/brand/hotel-amil-logo-reversed.svg" : "/images/brand/hotel-amil-logo-red.svg"}
              alt="Hotel Amil"
              className="h-16 sm:h-[4.25rem] w-auto object-contain transition-all duration-300"
            />
          </Link>

          {/* Header Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Book Now Button */}
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

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-sm transition-colors focus:outline-none ${
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
    </>
  );
};

export default Navbar;
