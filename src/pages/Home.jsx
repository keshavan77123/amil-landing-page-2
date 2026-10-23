import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, ShieldCheck, Clock, MapPin } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import RoomCard from '../components/RoomCard';
import ScrollStrip from '../components/ScrollStrip';
import NearbyCard from '../components/NearbyCard';
import SectionHeading from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import ScrollReveal from '../components/ScrollReveal';
import HomeEventsSection from '../components/HomeEventsSection';
import { roomsData } from '../data/rooms';
import { amenitiesData } from '../data/amenities';
import { nearbyAttractionsData } from '../data/nearby';

export const Home = () => {
  return (
    <div className="bg-ivory">
      {/* 1. Homepage Hero (Pattern C Carousel) */}
      <HeroCarousel />

      {/* 1b. Hotel Amil Entrance Section (Text Left | Image Right) */}
      <section className="py-20 md:py-24 bg-warm-white border-y border-border-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Text Left */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ScrollReveal yOffset={30}>
                <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-3">
                  WELCOME TO HOTEL AMIL
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal leading-[1.18] mb-4">
                  An Inviting Welcome to Hotel Amil
                </h2>

                <div className="w-12 h-[2px] bg-amil-red mb-6" />

                <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed mb-4">
                  Discover Hotel Amil, where a welcoming atmosphere, thoughtful hospitality, and comfortable surroundings come together to create a memorable stay. From the moment you arrive, experience the warmth and care that make every visit special.
                </p>

                <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed mb-8">
                  Whether you are visiting for business, a family holiday, or a peaceful getaway, Hotel Amil offers a convenient and comfortable setting for your stay. Our welcoming entrance reflects our commitment to making every guest feel at home.
                </p>

                <Link to="/rooms">
                  <Button variant="secondary" size="md">
                    EXPLORE OUR ROOMS
                  </Button>
                </Link>
              </ScrollReveal>
            </div>

            {/* Entrance Image Right */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ScrollReveal delay={0.2} yOffset={30}>
                <div className="relative aspect-[16/11] overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury group">
                  <img
                    src="/images/home/NightEntrance_8k.png"
                    alt="Hotel Amil entrance facade, Rajapalayam"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 right-4 bg-charcoal/80 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory text-[10px] font-sans tracking-luxury uppercase">
                    Rajapalayam, Tamil Nadu
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Welcome Section (Pattern B: Image Left | Text Right, Editorial Asymmetry) */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Large Image Left */}
          <div className="lg:col-span-7">
            <ScrollReveal yOffset={30}>
              <div className="relative aspect-[16/11] overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury group">
                <img
                  src="/images/home/Swimming Poll Day -8k.png"
                  alt="Swimming pool at Hotel Amil Rajapalayam"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory text-[10px] font-sans tracking-luxury uppercase">
                  Rajapalayam, Tamil Nadu
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Text Right (Pattern B: Eyebrow, Serif Heading, Red Divider, Short Text, Minimal CTA) */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.2} yOffset={30}>
              <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-3">
                WELCOME TO HOTEL AMIL
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal leading-[1.18] mb-4">
                A refined sanctuary of calm in Virudhunagar.
              </h2>
              
              <div className="w-12 h-[2px] bg-amil-red mb-6" />

              <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed mb-4">
                Nestled near the picturesque Western Ghats in Rajapalayam, Hotel Amil redefines provincial luxury with quiet restraint, uncompromising spatial design, and sincere South Indian warmth.
              </p>

              <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed mb-8">
                Whether you arrive for business conferences, sacred visits to the famed Srivilliputhur Andal Temple, or scenic exploration of Ayyanar Falls, our suites and dining venues provide an atmosphere designed entirely for your comfort.
              </p>

              <Link to="/rooms">
                <Button variant="secondary" size="md">
                  Discover Our Accommodations
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. Alternating Section 2: TEXT LEFT | IMAGE RIGHT (Section 14) */}
      <section className="py-20 md:py-24 bg-warm-white border-y border-border-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Text Left */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ScrollReveal yOffset={30}>
                <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-3">
                  UNCOMPROMISED REST
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal leading-[1.18] mb-4">
                  Crafted for restorative slumber.
                </h2>
                
                <div className="w-12 h-[2px] bg-amil-red mb-6" />

                <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed mb-6">
                  Every guest room balances acoustic soundproofing with generous natural daylight, premium pocket-spring mattresses, Italian marble finishes, and 360-degree virtual tour accessibility.
                </p>

                <div className="space-y-3 mb-8 text-xs font-sans text-charcoal-text">
                  <div className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-amil-red" />
                    <span>360° Interactive Virtual Room Tours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-amil-red" />
                    <span>Individual Climate Control & Silent AC Units</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-amil-red" />
                    <span>High-Speed Fiber Connectivity in All Suites</span>
                  </div>
                </div>

                <Link to="/rooms">
                  <Button variant="primary" size="md">
                    View Suite Collections
                  </Button>
                </Link>
              </ScrollReveal>
            </div>

            {/* Image Right */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ScrollReveal delay={0.2} yOffset={30}>
                <div className="relative aspect-[16/11] overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury group">
                  <img
                    src="/images/home/Entrance 8k - 3.png"
                    alt="Entrance facade of Hotel Amil Rajapalayam"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 right-4 bg-charcoal/80 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory text-[10px] font-sans tracking-luxury uppercase">
                    Quiet Luxury • Custom Linens
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Rooms Preview (Section 15: Pattern A Grid of 4 categories) */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal yOffset={25}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-2">
                ACCOMMODATIONS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal">
                Four Refined Categories
              </h2>
              <div className="w-12 h-[2px] bg-amil-red mt-4" />
            </div>
            <Link to="/rooms" className="mt-4 md:mt-0">
              <span className="text-xs uppercase font-sans font-semibold tracking-luxury text-amil-red hover:text-amil-red-dark flex items-center">
                View All Specifications <ArrowRight className="w-4 h-4 ml-1.5" />
              </span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Pattern A: Grid of 4 room cards with hover zoom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {roomsData.map((room, idx) => (
            <ScrollReveal key={room.id} delay={idx * 0.1} yOffset={30}>
              <RoomCard room={room} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. Pattern C: Mid-Page Statement Banner */}
      <section className="relative w-full py-28 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/home/Restaurent 8k -2.png')`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <ScrollReveal yOffset={30}>
            {/* Pattern C: Floating Text Box with backdrop blur */}
            <div className="max-w-lg p-7 sm:p-10 bg-charcoal/70 backdrop-blur-md border border-ivory/20 text-center shadow-soft-luxury">
              <span className="text-[11px] font-sans font-semibold tracking-luxury uppercase text-muted-gold block mb-2">
                GASTRONOMY & HOSPITALITY
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-ivory font-normal leading-tight mb-4">
                Savor the authentic flavors of Rajapalayam.
              </h2>
              <div className="w-10 h-[2px] bg-amil-red mx-auto mb-5" />
              <p className="text-xs sm:text-sm font-sans text-ivory/80 font-light leading-relaxed mb-8">
                From morning filter coffee to midnight delicacies at our 24-Hour Amil Cafe, our culinary masters honor traditional Tamil spices and world classics.
              </p>
              <Link to="/amenities">
                <Button variant="primary" size="md">
                  Explore Dining & Venues
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Alternating Section 3: IMAGE LEFT | TEXT RIGHT (Saffron Restaurant Showcase) */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Saffron Restaurant Photography Left */}
          <div className="lg:col-span-7">
            <ScrollReveal yOffset={30}>
              <div className="relative aspect-[16/11] overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury group">
                <img
                  src="/images/home/amilRestaurent-8k.png"
                  alt="Saffron Restaurant Fine Dining Interior"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory text-[10px] font-sans tracking-luxury uppercase">
                  Saffron Restaurant • Fine Dining
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Saffron Restaurant Text Right */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.2} yOffset={30}>
              <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-3">
                FINE DINING AT HOTEL AMIL
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal leading-[1.18] mb-4">
                Saffron Restaurant.
              </h2>
              
              <div className="w-12 h-[2px] bg-amil-red mb-6" />

              <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed mb-6">
                Savor the authentic culinary heritage of Tamil Nadu, fragrant Virudhunagar golden biryani, stone-ground Chettinad pepper delicacies, clay oven tandoors, and fresh coastal seafood prepared by seasoned master chefs.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs font-sans mb-8">
                <div className="p-3 bg-warm-white border border-border-light/60">
                  <strong className="block text-charcoal">Breakfast Buffet</strong>
                  <span className="text-text-muted text-[11px]">7:00 AM – 10:30 AM (CP Plan)</span>
                </div>
                <div className="p-3 bg-warm-white border border-border-light/60">
                  <strong className="block text-charcoal">Lunch & Dinner</strong>
                  <span className="text-text-muted text-[11px]">Royal A la Carte & Thalis</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link to="/dining">
                  <Button variant="primary" size="md">
                    Explore Saffron Restaurant
                  </Button>
                </Link>
                <a href="tel:+914563222333">
                  <Button variant="secondary" size="md">
                    Reserve Table
                  </Button>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 7. Alternating Section 4: TEXT LEFT | IMAGE RIGHT (24-Hour Amil Cafe) */}
      <section className="py-20 md:py-24 bg-warm-white border-y border-border-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Cafe Text Left */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ScrollReveal yOffset={30}>
                <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-3">
                  ROUND-THE-CLOCK BISTRO
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-charcoal font-normal leading-[1.18] mb-4">
                  The 24-Hour Amil Cafe.
                </h2>
                
                <div className="w-12 h-[2px] bg-amil-red mb-6" />

                <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed mb-6">
                  Continuous day-and-night comfort for late arrivals and dawn travelers. Enjoy artisanal South Indian degree filter coffee, European espresso roasts, fresh croissants, and warm savory platters at any hour.
                </p>

                <div className="space-y-2.5 mb-8 text-xs font-sans text-charcoal-text">
                  <div className="flex items-center space-x-2.5">
                    <Clock className="w-4 h-4 text-amil-red flex-shrink-0" />
                    <span>Open 24 Hours Daily, 7 Days a Week</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Sparkles className="w-4 h-4 text-amil-red flex-shrink-0" />
                    <span>Authentic Degree Filter Kaapi & Artisan Bakes</span>
                  </div>
                </div>

                <Link to="/dining">
                  <Button variant="secondary" size="md">
                    View Cafe Details
                  </Button>
                </Link>
              </ScrollReveal>
            </div>

            {/* Cafe Image Right */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ScrollReveal delay={0.2} yOffset={30}>
                <div className="relative aspect-[16/11] overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury group">
                  <img
                    src="/images/home/cafe 8k -2.png"
                    alt="Interior of the 24-Hour Amil Cafe and Bistro"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-charcoal/80 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory text-[10px] font-sans tracking-luxury uppercase">
                    Open 24/7
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Celebrations at Hotel Amil (Events Showcase) */}
      <HomeEventsSection />

      {/* 7. Nearby Attractions (Pattern D: Horizontal Scrollable Strip with Round Arrows) */}
      <section className="py-20 md:py-28 bg-warm-white border-t border-border-light/60">
        <ScrollStrip
          eyebrow="REGIONAL DISCOVERY"
          title="Popular Destinations Around Rajapalayam"
        >
          {nearbyAttractionsData.map((item) => (
            <Link key={item.id} to="/nearby">
              <NearbyCard item={item} isStrip={true} />
            </Link>
          ))}
        </ScrollStrip>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-right">
          <Link to="/nearby" className="text-xs uppercase font-sans font-semibold tracking-luxury text-amil-red hover:text-amil-red-dark inline-flex items-center">
            View All Local Itineraries <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      </section>

      {/* 8. Editorial Closing Statement */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal yOffset={20}>
          <img
            src="/images/brand/hotel-amil-logo-red.svg"
            alt="Hotel Amil"
            className="h-20 sm:h-24 mx-auto mb-6 object-contain"
          />
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif text-charcoal font-normal italic leading-snug mb-6">
            "True luxury is not ostentation. It is the quiet presence of thoughtful hospitality, restful sleep, and genuine human care."
          </blockquote>
          <p className="text-xs uppercase font-sans font-semibold tracking-luxury text-amil-red">
            Hotel Amil • For Your Comfort...
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Home;
