import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import HeroBookingBar from './HeroBookingBar';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

// Phone-specific hero photography slides for Hotel Amil (7 slides in exact required order)
const mobileHeroSlides = [
  {
    id: 'm1',
    image: "/images/MobileHeroImage/Lobby_MobileHero2.png",
    eyebrow: "HOTEL AMIL • RAJAPALAYAM",
    tagline: "For Your Comfort...",
    title: "A refined sanctuary in the Western Ghats foothills.",
    subtitle: "Experience quiet luxury, curated culinary excellence, and timeless South Indian hospitality.",
    ctaText: "Explore Hotel",
    ctaLink: "/events",
  },
  {
    id: 'm2',
    image: "/images/MobileHeroImage/AmilExterior_MobileHero.webp",
    eyebrow: "HOTEL AMIL • RAJAPALAYAM",
    tagline: "Modern Grandeur",
    title: "Contemporary architectural elegance in Rajapalayam.",
    subtitle: "A welcoming landmark offering quiet sophistication, tranquil comfort, and genuine hospitality.",
    ctaText: "Book Your Stay",
    ctaLink: "/events",
  },
  {
    id: 'm7',
    image: "/images/MobileHeroImage/Restaurent_mobile_hero.png",
    eyebrow: "GASTRONOMY",
    tagline: "Culinary Excellence",
    title: "Savor exquisite flavors in our elegant restaurant.",
    subtitle: "Experience the finest cuisine crafted with passion and tradition.",
    ctaText: "Discover Dining",
    ctaLink: "/dining",
  },
  {
    id: 'm3',
    image: "/images/MobileHeroImage/Execucutive_MobileHero.webp",
    eyebrow: "ACCOMMODATION",
    tagline: "Uncompromised Rest",
    title: "Spacious executive suites crafted with bespoke elegance.",
    subtitle: "Plush king bedding, acoustic tranquility, and modern residential comforts.",
    ctaText: "Explore Suites",
    ctaLink: "/rooms",
  },
  {
    id: 'm4',
    image: "/images/MobileHeroImage/SwimmingPool_MobileHero.webp",
    eyebrow: "WELLNESS & REJUVENATION",
    tagline: "Azure Pool",
    title: "Relax and unwind by our pristine swimming pool.",
    subtitle: "Enjoy a refreshing dip in our tranquil pool surrounded by serene views.",
    ctaText: "View Amenities",
    ctaLink: "/amenities",
  },
  {
    id: 'm5',
    image: "/images/MobileHeroImage/Bar_MobileHero.webp",
    eyebrow: "WELLNESS & REJUVENATION",
    tagline: "The Azure Lounge",
    title: "Open-air tranquility amidst gentle mountain breezes.",
    subtitle: "Unwind by the lounge after a day of temple exploration across Virudhunagar.",
    ctaText: "View Amenities",
    ctaLink: "/amenities",
  },
  {
    id: 'm6',
    image: "/images/MobileHeroImage/FamilyRoom_MobileHero.webp",
    eyebrow: "ACCOMMODATION",
    tagline: "Luxurious Comfort",
    title: "Elegant family rooms designed for ultimate relaxation.",
    subtitle: "Thoughtfully crafted spaces with modern amenities for a memorable stay.",
    ctaText: "Explore Rooms",
    ctaLink: "/rooms",
  },
];

// High-resolution photography slides for Hotel Amil (Tablet & Desktop)
const heroSlides = [
  {
    id: 1,
    image: "/images/hero/lobby-hero-8k.png",
    eyebrow: "HOTEL AMIL • RAJAPALAYAM",
    tagline: "For Your Comfort...",
    title: "A refined sanctuary in the Western Ghats foothills.",
    subtitle: "Experience quiet luxury, curated culinary excellence, and timeless South Indian hospitality.",
    ctaText: "Book Your Stay",
    ctaLink: "/booking",
    position: "left", // 'left' | 'center'
  },
  {
    id: 3,
    image: "/images/hero/AmilFrontHero4_8k.png",
    eyebrow: "HOTEL AMIL • RAJAPALAYAM",
    tagline: "Modern Grandeur",
    title: "Contemporary architectural elegance in Rajapalayam.",
    subtitle: "A welcoming landmark offering quiet sophistication, tranquil comfort, and genuine hospitality.",
    ctaText: "Book Your Stay",
    ctaLink: "/booking",
    position: "center",
  },
  {
    id: 2,
    image: "/images/hero/singleBed-8k.png",
    eyebrow: "ACCOMMODATION",
    tagline: "Uncompromised Rest",
    title: "Spacious executive suites crafted with bespoke elegance.",
    subtitle: "Plush king bedding, acoustic tranquility, and modern residential comforts.",
    ctaText: "Explore Suites",
    ctaLink: "/rooms",
    position: "right",
  },
  {
    id: 4,
    image: "/images/hero/bar%20hero%20-%204k.png",
    eyebrow: "WELLNESS & REJUVENATION",
    tagline: "The Azure Pool",
    title: "Open-air tranquility amidst gentle mountain breezes.",
    subtitle: "Unwind by the sundeck after a day of temple exploration across Virudhunagar.",
    ctaText: "View Amenities",
    ctaLink: "/amenities",
    position: "center",
  },
  {
    id: 5,
    image: "/images/hero/RealSwimmingPool_8k.png",
    eyebrow: "WELLNESS & REJUVENATION",
    tagline: "Azure Pool",
    title: "Relax and unwind by our pristine swimming pool.",
    subtitle: "Enjoy a refreshing dip in our tranquil pool surrounded by serene views.",
    ctaText: "View Amenities",
    ctaLink: "/amenities",
    position: "center",
  },
  {
    id: 6,
    image: "/images/hero/twinHero-8k.png",
    eyebrow: "ACCOMMODATION",
    tagline: "Luxurious Comfort",
    title: "Elegant twin rooms designed for ultimate relaxation.",
    subtitle: "Thoughtfully crafted spaces with modern amenities for a memorable stay.",
    ctaText: "Explore Rooms",
    ctaLink: "/rooms",
    position: "left",
  },
  {
    id: 7,
    image: "/images/hero/SaffronRestauentHero_8k.png",
    eyebrow: "GASTRONOMY",
    tagline: "Culinary Excellence",
    title: "Savor exquisite flavors in our elegant restaurant.",
    subtitle: "Experience the finest cuisine crafted with passion and tradition.",
    ctaText: "Discover Dining",
    ctaLink: "/dining",
    position: "left",
  }
];

export const HeroCarousel = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [imagesReady, setImagesReady] = useState(false);

  // Responsive device check: Width < 640px is designated for phone-specific hero
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });

  const [isLandscapeMobile, setIsLandscapeMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640 && window.innerWidth > window.innerHeight;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setIsLandscapeMobile(mobile && window.innerWidth > window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeSlides = isMobile ? mobileHeroSlides : heroSlides;

  // Preload hero images to avoid blank frames.
  // Phone: Only preloads lightweight WebP assets; decodes slide 0 immediately for instant render.
  // Desktop/Tablet: Preserves existing Promise.all preloading.
  useEffect(() => {
    let cancelled = false;
    const slidesToPreload = isMobile ? mobileHeroSlides : heroSlides;
    const sources = Array.from(new Set(slidesToPreload.map((slide) => slide.image)));

    if (isMobile) {
      // Decode first mobile slide immediately to show the hero promptly without 17MB download
      const firstImage = new Image();
      firstImage.onload = () => {
        if (!cancelled) setImagesReady(true);
      };
      firstImage.onerror = () => {
        if (!cancelled) setImagesReady(true);
      };
      firstImage.src = sources[0];

      // Decode remaining mobile slides in background
      sources.slice(1).forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    } else {
      Promise.all(
        sources.map(
          (src) =>
            new Promise((resolve) => {
              const probe = new Image();
              probe.onload = () => resolve();
              probe.onerror = () => {
                if (import.meta.env.DEV) {
                  console.error(`[HeroCarousel] Failed to load hero image: ${src}`);
                }
                resolve();
              };
              probe.src = src;
            })
        )
      ).then(() => {
        if (!cancelled) setImagesReady(true);
      });
    }

    return () => {
      cancelled = true;
    };
  }, [isMobile]);

  return (
    <div className="relative w-full">
      {/* Hero Viewport: Clamped fluid height on mobile, 100dvh on tablet & desktop */}
      <div
        style={
          isMobile
            ? {
                height: isLandscapeMobile
                  ? 'clamp(240px, 75svh, 320px)'
                  : 'clamp(380px, 58svh, 540px)',
              }
            : undefined
        }
        className="relative w-full overflow-hidden group sm:h-[100dvh] sm:min-h-[520px] lg:min-h-[540px] sm:max-h-[1080px]"
      >
        {imagesReady ? (
          <Swiper
            key={isMobile ? 'mobile-swiper' : 'desktop-swiper'}
            modules={[Autoplay, EffectFade, Navigation, Pagination, Keyboard, A11y]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1400}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            keyboard={{ enabled: true }}
            pagination={{
              clickable: true,
              el: '.custom-hero-pagination',
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="w-full h-full"
          >
            {activeSlides.map((slide) => (
              <SwiperSlide key={slide.id} className="relative w-full h-full">
                {/* Full-Bleed Background Photography */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out scale-105"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                >
                  {/* Subtle gradient tint on phone: stronger behind text, clear across main photo; subtle 15% tint on tablet/desktop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-charcoal/10 to-transparent sm:bg-none sm:bg-charcoal/15" />
                </div>

                {/* Phone-Only Hero Content Overlay (Hidden on Tablet & Desktop) */}
                <div
                  style={
                    isLandscapeMobile
                      ? { paddingBottom: '1.5rem' }
                      : { paddingBottom: 'clamp(3.5rem, 7svh, 4.5rem)' }
                  }
                  className="sm:hidden absolute inset-0 z-10 flex flex-col justify-end items-center text-center px-2 min-[340px]:px-3 min-[360px]:px-4 pointer-events-none invisible opacity-0 transition-opacity duration-300 [.swiper-slide-active_&]:visible [.swiper-slide-active_&]:opacity-100"
                >
                  {/* Logo A: Centered over bed area, directly above category label */}
                  <Link
                    to="/"
                    aria-label="Hotel Amil - Return to Homepage"
                    className="pointer-events-auto inline-flex items-center justify-center group mb-1.5 min-[340px]:mb-2 min-[360px]:mb-2.5"
                  >
                    <img
                      src="/images/brand/hotel-amil-logo-reversed.svg"
                      alt="Hotel Amil"
                      style={{
                        height: isLandscapeMobile
                          ? 'clamp(1.75rem, 8svh, 2.25rem)'
                          : 'clamp(3.5rem, 7.5svh, 4.75rem)',
                      }}
                      className="w-auto max-w-[80vw] object-contain [filter:drop-shadow(0_2px_5px_rgba(0,0,0,0.65))_drop-shadow(0_8px_24px_rgba(0,0,0,0.42))_brightness(1.08)]"
                    />
                  </Link>

                  {slide.eyebrow && (
                    <span className="text-[8.5px] min-[340px]:text-[9px] min-[360px]:text-[10px] uppercase font-sans font-semibold tracking-[0.12em] min-[340px]:tracking-luxury text-muted-gold mb-0.5 min-[360px]:mb-1 drop-shadow-sm">
                      {slide.eyebrow}
                    </span>
                  )}
                  {slide.title && (
                    <h1 className="text-[13.5px] min-[300px]:text-[14.5px] min-[340px]:text-base min-[360px]:text-lg font-serif text-ivory font-normal leading-snug max-w-[245px] min-[300px]:max-w-[265px] min-[340px]:max-w-[290px] min-[360px]:max-w-[310px] mb-0.5 min-[360px]:mb-1 drop-shadow-md">
                      {slide.title}
                    </h1>
                  )}
                  {slide.subtitle && (
                    <p className={`text-[9.5px] min-[340px]:text-[10px] min-[360px]:text-[11px] font-sans text-ivory/85 font-light leading-relaxed max-w-[235px] min-[300px]:max-w-[250px] min-[340px]:max-w-[260px] min-[360px]:max-w-[280px] line-clamp-2 mb-2 min-[360px]:mb-2.5 drop-shadow-sm ${isLandscapeMobile ? 'hidden' : 'block'}`}>
                      {slide.subtitle}
                    </p>
                  )}
                  {slide.ctaText && slide.ctaLink && (
                    <Link
                      to={slide.ctaLink}
                      className="pointer-events-auto inline-flex items-center justify-center px-3 py-1 min-[340px]:px-3.5 min-[360px]:px-4 min-[360px]:py-1.5 bg-amil-red hover:bg-amil-red-dark text-ivory text-[9.5px] min-[340px]:text-[10px] min-[360px]:text-[10.5px] uppercase tracking-[0.12em] min-[340px]:tracking-luxury font-semibold rounded-sm shadow-md transition-transform duration-200 active:scale-95"
                    >
                      {slide.ctaText}
                    </Link>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          /* First slide shown as a static layer until hero images are decoded */
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${activeSlides[0].image})` }}
          >
            <div className="absolute inset-0 bg-charcoal/15" />
          </div>
        )}

        {/* Desktop Subtle Navigation Arrows (Near edges, visible on hover) */}
        <div className="hidden md:flex absolute inset-y-0 left-6 z-20 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button
            ref={prevRef}
            aria-label="Previous image"
            className="pointer-events-auto w-12 h-12 rounded-full border border-ivory/40 bg-charcoal/50 backdrop-blur-sm text-ivory flex items-center justify-center hover:bg-amil-red hover:border-amil-red transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        <div className="hidden md:flex absolute inset-y-0 right-6 z-20 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button
            ref={nextRef}
            aria-label="Next image"
            className="pointer-events-auto w-12 h-12 rounded-full border border-ivory/40 bg-charcoal/50 backdrop-blur-sm text-ivory flex items-center justify-center hover:bg-amil-red hover:border-amil-red transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Custom Pagination Container: positioned above the floating booking card on phones, original responsive positions on tablet/desktop */}
        <div
          style={
            isMobile
              ? {
                  bottom: isLandscapeMobile
                    ? '0.35rem'
                    : 'clamp(2.25rem, 4.8svh, 3rem)',
                }
              : undefined
          }
          className="custom-hero-pagination absolute sm:!bottom-[17.5rem] md:!bottom-[18rem] lg:!bottom-[5.5rem] xl:!bottom-[6.5rem] left-0 right-0 z-20 flex items-center justify-center space-x-2"
        />
      </div>

      {/* Booking Bar: In normal document flow below hero on phones, absolute overlay on tablet/desktop */}
      <HeroBookingBar />
    </div>
  );
};

export default HeroCarousel;
