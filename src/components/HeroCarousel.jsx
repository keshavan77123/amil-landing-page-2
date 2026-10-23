import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import HeroBookingBar from './HeroBookingBar';
import { ChevronLeft, ChevronRight } from 'lucide-react';



// High-resolution photography slides for Hotel Amil
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
    image: "/images/hero/SwimmingPool_8k.png",
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

  // Preload every hero image before the carousel starts, so a slide is never
  // rendered before its bitmap is decoded (which showed a blank cream frame).
  useEffect(() => {
    let cancelled = false;
    const sources = Array.from(new Set(heroSlides.map((slide) => slide.image)));

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

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative w-full h-[100dvh] min-h-[480px] sm:min-h-[520px] lg:min-h-[540px] max-h-[1080px] overflow-hidden group">
      {imagesReady ? (
      <Swiper
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
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Full-Bleed Background Photography */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out scale-105"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Subtle global cinematic tint - reduced for brighter images */}
              <div className="absolute inset-0 bg-charcoal/15" />
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
      ) : (
        /* First slide shown as a static layer until all hero images are decoded */
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroSlides[0].image})` }}
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

      {/* Custom Pagination Container at Bottom Center */}
      <div className="custom-hero-pagination absolute bottom-[16.5rem] lg:bottom-[5.5rem] xl:bottom-[6.5rem] left-0 right-0 z-20 flex items-center justify-center space-x-2" />
      <HeroBookingBar />
    </div>
  );
};

export default HeroCarousel;
