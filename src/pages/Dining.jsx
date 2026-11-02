import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Phone, Users, Utensils, Coffee, Sparkles, Check, ChevronRight, ChevronDown, BookOpen, X } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import ScrollReveal from '../components/ScrollReveal';
import { saffronRestaurantData, cafeData } from '../data/dining';
import DishCard from '../components/dining/DishCard';

export const Dining = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  // Responsive device breakpoint tracking (< 640px is mobile, >= 640px is tablet/desktop)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });

  // Initial visible count: 4 on mobile, 8 on tablet & desktop
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640 ? 4 : 8;
    }
    return 8;
  });

  // Track viewport resize to adjust initial count seamlessly without resetting category or losing progress
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile((prevIsMobile) => {
        if (prevIsMobile !== mobile) {
          setVisibleCount((prevCount) => {
            // Adjust initial count when transitioning between mobile and desktop/tablet
            if (mobile && prevCount === 8) {
              return 4;
            }
            if (!mobile && prevCount === 4) {
              return 8;
            }
            // Preserve user's expanded progress if they have clicked View More
            return prevCount;
          });
          return mobile;
        }
        return prevIsMobile;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    'All',
    'Breakfast',
    'Soups',
    'Starters',
    'Main Course',
    'Biryani',
    'Snacks',
    'Desserts',
    'Beverages',
    'Vegetarian',
    'Non-Vegetarian'
  ];

  const allDishes = saffronRestaurantData.signatureDishes;

  const filteredDishes = useMemo(() => {
    if (selectedCategory === 'All') {
      return allDishes;
    }
    if (selectedCategory === 'Vegetarian') {
      return allDishes.filter((dish) => dish.isVeg === true);
    }
    if (selectedCategory === 'Non-Vegetarian') {
      return allDishes.filter((dish) => dish.isVeg === false);
    }
    return allDishes.filter(
      (dish) => dish.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory, allDishes]);

  const displayedDishes = filteredDishes.slice(0, visibleCount);
  const hasMore = visibleCount < filteredDishes.length;

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Reset to responsive initial count: 4 on mobile, 8 on desktop/tablet
    setVisibleCount(isMobile ? 4 : 8);
  };

  const handleViewMore = () => {
    // Responsive batch size: 4 on mobile, 8 on desktop/tablet
    const batchSize = isMobile ? 4 : 8;
    setVisibleCount((prev) => prev + batchSize);
  };

  return (
    <div className="bg-ivory pt-28 pb-24">
      {/* 1. Saffron Restaurant Hero Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <ScrollReveal yOffset={25}>
          <SectionHeading
            eyebrow="FINE DINING & GASTRONOMY"
            title="Saffron Restaurant"
            subtitle="The premier dining destination at Hotel Amil, celebrating royal South Indian culinary heritage, authentic Chettinad spices, clay oven tandoors, and global flavours."
          />
        </ScrollReveal>

        {/* Pattern B Split: Restaurant Photography Left | Story & Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mt-10">
          <div className="lg:col-span-7">
            <ScrollReveal yOffset={30}>
              <div className="relative aspect-[16/10] overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury group">
                <img
                  src={saffronRestaurantData.images[0]}
                  alt="Saffron Restaurant Fine Dining Ambience"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory text-[10px] font-sans tracking-luxury uppercase">
                  Saffron Restaurant • Seating for 120
                </div>
              </div>
            </ScrollReveal>

            {/* Thumbnail preview strip */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              {saffronRestaurantData.images.slice(1, 4).map((img, i) => (
                <div key={i} className="aspect-[16/10] overflow-hidden border border-border-light/60">
                  <img src={img} alt={`Saffron interior ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal delay={0.2} yOffset={30}>
              <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block">
                {saffronRestaurantData.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-charcoal font-normal">
                {saffronRestaurantData.tagline}
              </h2>
              
              <div className="w-12 h-[2px] bg-amil-red" />

              <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed">
                {saffronRestaurantData.description}
              </p>

              {/* Service Timings Box */}
              <div className="p-5 bg-warm-white border border-border-light/80 space-y-3 text-xs font-sans">
                <h4 className="text-[11px] font-semibold uppercase tracking-luxury text-charcoal flex items-center">
                  <Clock className="w-4 h-4 text-amil-red mr-2" />
                  Meal Services & Timings
                </h4>
                {saffronRestaurantData.timings.map((t, idx) => (
                  <div key={idx} className="border-t border-border-light/50 pt-2 first:border-0 first:pt-0">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-charcoal">{t.meal}</strong>
                      <span className="text-amil-red font-medium">{t.time}</span>
                    </div>
                    <p className="text-[11px] text-text-muted mt-0.5">{t.notes}</p>
                  </div>
                ))}
              </div>

              {/* Direct Reservation & Contact CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a href={`tel:${saffronRestaurantData.contact.directPhone.replace(/\s+/g, '')}`} className="w-full sm:w-auto flex-1">
                  <Button variant="primary" size="md" className="w-full">
                    <Phone className="w-3.5 h-3.5 mr-2 inline" />
                    Reserve a Table
                  </Button>
                </a>
                <Link to="/contact" className="w-full sm:w-auto flex-1">
                  <Button variant="secondary" size="md" className="w-full">
                    Banquet Dining Query
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Signature Dishes & Menu Highlights */}
      <section className="relative py-20 bg-[#F8F5EE] border-y border-border-light/60 overflow-hidden">
        {/* Subtle Decorative Botanical Corner Accents (Behind Content) */}
        <div className="absolute -top-4 -left-4 sm:top-2 sm:left-4 pointer-events-none opacity-20 select-none text-muted-gold" aria-hidden="true">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M10 90 C 20 60, 40 30, 85 15 C 60 40, 30 60, 10 90 Z" fill="currentColor" fillOpacity="0.08" />
            <path d="M30 65 C 35 50, 48 40, 60 38" />
            <path d="M45 50 C 55 42, 68 35, 75 32" />
            <path d="M20 75 C 28 68, 38 65, 45 64" />
            <circle cx="85" cy="15" r="2" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute -top-4 -right-4 sm:top-2 sm:right-4 pointer-events-none opacity-20 select-none text-muted-gold transform -scale-x-100" aria-hidden="true">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M10 90 C 20 60, 40 30, 85 15 C 60 40, 30 60, 10 90 Z" fill="currentColor" fillOpacity="0.08" />
            <path d="M30 65 C 35 50, 48 40, 60 38" />
            <path d="M45 50 C 55 42, 68 35, 75 32" />
            <path d="M20 75 C 28 68, 38 65, 45 64" />
            <circle cx="85" cy="15" r="2" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal yOffset={25}>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-10 sm:w-16 h-[1px] bg-muted-gold/50" />
                <span className="text-[11px] sm:text-xs font-sans font-semibold tracking-luxury-wide uppercase text-amil-red">
                  CURATED SELECTIONS
                </span>
                <div className="w-10 sm:w-16 h-[1px] bg-muted-gold/50" />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-serif text-charcoal font-normal tracking-tight">
                Signature Dishes at Saffron Restaurant
              </h2>

              <p className="text-xs sm:text-sm font-sans text-text-muted mt-2.5 max-w-2xl mx-auto leading-relaxed">
                Each specialty is prepared with traditional flavours, using the finest ingredients and time-honoured recipes.
              </p>
            </div>
          </ScrollReveal>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-5xl mx-auto px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`text-xs font-sans font-medium px-4 py-2 rounded-md border transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#8F2424] border-[#8F2424] text-ivory shadow-xs font-semibold'
                    : 'bg-white border-border-light/80 text-charcoal-text hover:border-amil-red/60 hover:bg-white/90'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Responsive Dishes Grid: 4 cols on desktop, 2 cols on tablet/wide phone, 1 col on narrow phone */}
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 auto-rows-fr">
            {displayedDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>

          {/* View More & Explore Full Menu Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            {hasMore && (
              <button
                type="button"
                onClick={handleViewMore}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md bg-[#8F2424] hover:bg-amil-red text-ivory text-xs sm:text-sm font-sans font-medium shadow-sm transition-all duration-200 cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
                View More Dishes
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsMenuModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md bg-white border border-[#8F2424]/60 hover:border-amil-red hover:bg-[#8F2424]/5 text-[#8F2424] text-xs sm:text-sm font-sans font-medium shadow-2xs transition-all duration-200 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amil-red" />
              Explore Full Menu
            </button>
          </div>

          {/* Delicate Bottom Ornament Accent */}
          <div className="flex items-center justify-center gap-2 mt-8 text-muted-gold/50" aria-hidden="true">
            <div className="w-8 h-[1px] bg-muted-gold/40" />
            <span className="text-[8px]">◆</span>
            <div className="w-8 h-[1px] bg-muted-gold/40" />
          </div>
        </div>
      </section>

      {/* Accessible Saffron Restaurant Full Menu Information Dialog */}
      {isMenuModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="menu-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-xs"
        >
          <div className="bg-white border border-border-light rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-elevated relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsMenuModalOpen(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-charcoal p-1.5 rounded-full hover:bg-charcoal/5 transition-colors"
              aria-label="Close menu information"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-1">
              SAFFRON RESTAURANT
            </span>
            <h3 id="menu-dialog-title" className="text-2xl font-serif text-charcoal mb-2">
              Explore Full Menu
            </h3>
            <div className="w-10 h-[2px] bg-amil-red mb-4" />

            <p className="text-xs sm:text-sm font-sans text-text-muted leading-relaxed mb-4">
              Our comprehensive à la carte menu is curated daily with fresh regional ingredients, authentic Chettinad gravies, Virudhunagar biryanis, clay oven tandoori breads, and house desserts.
            </p>

            <div className="bg-warm-white border border-border-light/70 p-4 rounded-lg space-y-2 mb-6 text-xs font-sans text-charcoal">
              <div className="flex justify-between items-center py-1 border-b border-border-light/40">
                <span className="text-text-muted">Direct Reservations:</span>
                <span className="font-semibold text-amil-red">{saffronRestaurantData.contact.directPhone}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-border-light/40">
                <span className="text-text-muted">In-Room Extension:</span>
                <span className="font-semibold text-charcoal">Ext. 201</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-text-muted">Meal Timings:</span>
                <span className="font-medium text-charcoal">7:00 AM – 11:00 PM</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${saffronRestaurantData.contact.directPhone.replace(/\s+/g, '')}`}
                className="flex-1"
              >
                <Button variant="primary" size="md" className="w-full">
                  <Phone className="w-3.5 h-3.5 mr-2 inline" />
                  Call Saffron Dining
                </Button>
              </a>
              <Button
                variant="secondary"
                size="md"
                className="flex-1"
                onClick={() => setIsMenuModalOpen(false)}
              >
                Back to Dishes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 3. The 24-Hour Amil Cafe Spotlight */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-5">
            <ScrollReveal yOffset={30}>
              <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block">
                {cafeData.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-charcoal font-normal">
                {cafeData.name}
              </h2>
              <p className="text-sm font-cormorant italic text-muted-gold">
                {cafeData.tagline}
              </p>

              <div className="w-12 h-[2px] bg-amil-red" />

              <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed">
                {cafeData.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
                {cafeData.features.map((f, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-charcoal-text font-sans">
                    <Check className="w-3.5 h-3.5 text-amil-red flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <a href={`tel:${saffronRestaurantData.contact.directPhone.replace(/\s+/g, '')}`}>
                  <Button variant="secondary" size="md">
                    Inquire at Cafe Desk
                  </Button>
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <ScrollReveal delay={0.2} yOffset={30}>
              <div className="relative aspect-[16/10] overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury group">
                <img
                  src={cafeData.image}
                  alt="24-Hour Amil Cafe Lounge"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory text-[10px] font-sans tracking-luxury uppercase">
                  Open 24/7 Continuous Service
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. In-Room Dining & CP Breakfast Banner */}
      <section className="bg-charcoal text-ivory py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase text-muted-gold block">
              HOTEL AMIL RESIDENTS EXCLUSIVE
            </span>
            <h3 className="text-2xl font-serif">CP Complimentary Breakfast & In-Room Dining</h3>
            <p className="text-xs font-sans text-ivory/70 max-w-xl leading-relaxed">
              All resident bookings include our complimentary breakfast buffet at Saffron Restaurant from 7:00 AM to 10:30 AM. In-room dining service is accessible 24 hours by dialing <strong>Ext. 201</strong>.
            </p>
          </div>
          <Link to="/booking" className="flex-shrink-0">
            <Button variant="primary" size="md">
              Book a Room with Breakfast
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dining;
