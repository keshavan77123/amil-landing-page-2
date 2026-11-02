import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, ArrowRight, CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/Button';

export const HERO_SLIDES = [
  {
    id: 'wedding',
    image: '/images/events/EventsFunction_8k.png',
    eyebrow: 'CELEBRATE AT HOTEL AMIL',
    heading: 'Made for Moments That Matter.',
    description:
      'From magnificent wedding receptions to grand family celebrations, discover a welcoming setting crafted with timeless elegance for your lifetime milestones.',
    categoryName: 'Wedding & Reception',
    targetId: '#wedding-section',
    features: ['Up to 300+ Banquet Capacity', 'Traditional Leaf & Buffet Dining', 'Private Bridal Suite']
  },
  {
    id: 'corporate',
    image: '/images/events/CorporateMeeting_8k.png',
    eyebrow: 'BUSINESS & HOSPITALITY',
    heading: 'Where Business Meets Hospitality.',
    description:
      'Host executive conferences, bank reviews, seminars, and training symposiums in Rajapalayam with modern AV technology, uninterrupted power, and premium catering.',
    categoryName: 'Corporate & Bank Meetings',
    targetId: '#corporate-section',
    features: ['High-Lumen HD Projector & Sound', 'Flexible Theater or Classroom Layout', 'Executive High Tea & Luncheon']
  },
  {
    id: 'baby-shower',
    image: '/images/events/EventBabyShower2_8k.png',
    eyebrow: "CELEBRATE LIFE'S BLESSINGS",
    heading: 'Welcoming a Little Miracle.',
    description:
      'Cherish traditional Valaikappu and Seemantham rituals or modern baby shower celebrations in an auspicious, warm, and tastefully styled banquet environment.',
    categoryName: 'Baby Shower',
    targetId: '#baby-shower-section',
    features: ['Custom Flower Stage & Cradle Setup', 'Authentic 5-Rice Valaikappu Feast', 'Mother-to-Be Green Room']
  },
  {
    id: 'couple',
    image: '/images/events/event-couple.jpg',
    eyebrow: 'INTIMATE OCCASIONS',
    heading: 'Just the Two of You.',
    description:
      'Experience an unforgettable candlelight dinner, anniversary dinner, or romantic milestone with tailored 4-course dining, ambient music, and discreet butler service.',
    categoryName: 'Private Couple Occasions',
    targetId: '#couple-section',
    features: ['Private Candlelight Table for Two', "Chef's Curated Tasting Menu", 'Custom Cake & Floral Styling']
  },
  {
    id: 'birthday',
    image: '/images/events/EventsBirthDay2_8k.png',
    eyebrow: 'VIBRANT CELEBRATIONS',
    heading: 'Make Every Birthday Memorable.',
    description:
      'From 1st birthday fairy wonderlands with illuminated marquee letters to milestone jubilee parties, celebrate with joyful decor, music, and delicious dining.',
    categoryName: 'Birthday Parties',
    targetId: '#birthday-section',
    features: ['Themed Balloon Arches & Marquee Lights', 'Kids-Friendly Buffets & Sundaes', 'Dedicated Dance & Party Game Area']
  }
];

const contentVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

export const EventsHero = ({ onOpenBookingModal }) => {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const SLIDE_DURATION = 5500;

  const advance = useCallback((dir = 1) => {
    setActive((prev) => (prev + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isHovered) return;
    timerRef.current = setInterval(() => advance(1), SLIDE_DURATION);
    return () => clearInterval(timerRef.current);
  }, [advance, isHovered, prefersReducedMotion]);

  const slide = HERO_SLIDES[active];

  const handleSmoothScroll = (e, targetHref) => {
    e.preventDefault();
    const targetId = targetHref.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full min-h-[440px] sm:min-h-[500px] md:min-h-[100svh] overflow-hidden flex flex-col justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Hotel Amil Events Hero Carousel"
    >
      {/* ── Background Slides with Smooth Crossfade ── */}
      {HERO_SLIDES.map((s, index) => (
        <div
          key={s.id}
          aria-hidden={index !== active}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${s.image})`,
            opacity: index === active ? 1 : 0,
            transform: index === active ? 'scale(1.03)' : 'scale(1)',
            transition: 'opacity 1000ms ease-in-out, transform 7000ms ease-out',
            zIndex: 1
          }}
        />
      ))}

      {/* ── Cinematic Ambient Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-charcoal/40 z-10" />

      {/* ── Main Content Area ── */}
      <div className="relative z-20 flex-grow flex items-center pt-[82px] pb-6 sm:pt-24 sm:pb-10 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center">
            
            {/* Left Column: Heading & Text */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`hero-content-${slide.id}`}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Eyebrow */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amil-red animate-pulse" />
                    <span className="text-[10px] sm:text-xs font-sans font-semibold tracking-luxury uppercase text-muted-gold">
                      {slide.eyebrow}
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-serif text-ivory font-normal leading-[1.15] sm:leading-[1.12] mb-2.5 sm:mb-4">
                    {slide.heading}
                  </h1>

                  {/* Amil Red Accent Bar */}
                  <div className="w-10 sm:w-14 h-[2px] bg-amil-red mb-2.5 sm:mb-5" />

                  {/* Description */}
                  <p className="text-xs sm:text-sm md:text-base font-sans text-ivory/85 font-light leading-relaxed mb-3.5 sm:mb-7 max-w-xl line-clamp-3 md:line-clamp-none">
                    {slide.description}
                  </p>

                  {/* Dual Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => onOpenBookingModal && onOpenBookingModal(slide.categoryName)}
                      className="group flex items-center justify-center gap-2 !py-2 !px-3.5 sm:!py-3.5 sm:!px-6 shadow-elevated text-center"
                    >
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ivory/90 shrink-0" />
                      <span className="tracking-luxury text-[10px] sm:text-xs font-semibold whitespace-nowrap">
                        CHECK AVAILABILITY & PRICING
                      </span>
                    </Button>

                    <a
                      href={slide.targetId}
                      onClick={(e) => handleSmoothScroll(e, slide.targetId)}
                      className="inline-block"
                    >
                      <button
                        type="button"
                        className="px-3 py-2 sm:px-5 sm:py-3.5 border border-ivory/40 hover:border-ivory bg-charcoal/40 hover:bg-ivory/10 text-ivory text-[10px] sm:text-xs font-sans font-medium tracking-luxury uppercase transition-all duration-300 rounded-[2px] flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
                      >
                        <span>EXPLORE {slide.categoryName.toUpperCase()}</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                      </button>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Slide Spotlight Highlights */}
            <div className="hidden lg:block lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`hero-card-${slide.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.45 }}
                  className="bg-charcoal/60 backdrop-blur-md border border-ivory/20 p-6 xl:p-8 rounded-[2px] shadow-2xl text-ivory"
                >
                  <div className="flex items-center justify-between border-b border-ivory/15 pb-4 mb-5">
                    <div>
                      <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase text-muted-gold block">
                        CATEGORY HIGHLIGHT
                      </span>
                      <h2 className="text-lg font-serif text-warm-white font-normal mt-0.5">
                        {slide.categoryName}
                      </h2>
                    </div>
                    <span className="text-xs font-sans text-ivory/60">
                      0{active + 1} / 0{HERO_SLIDES.length}
                    </span>
                  </div>

                  <div className="space-y-3.5 mb-6">
                    {slide.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-muted-gold flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-sans text-ivory/90 font-light leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={slide.targetId}
                    onClick={(e) => handleSmoothScroll(e, slide.targetId)}
                    className="inline-flex items-center gap-2 text-xs font-sans font-medium text-muted-gold hover:text-ivory uppercase tracking-wider transition-colors pt-2"
                  >
                    <span>View Specifications & Gallery</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsHero;
