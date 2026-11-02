import React from 'react';
import { MapPin, Navigation, ExternalLink, Car } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import { Button } from '../components/ui/Button';
import { hotelData } from '../data/hotel';
import { nearbyDestinations } from '../data/nearbyDestinations';
import DestinationGallery from '../components/nearby/DestinationGallery';

export const Nearby = () => {
  return (
    <div className="bg-ivory pt-24 sm:pt-28 pb-16 sm:pb-20">
      {/* ── 1. EDITORIAL PAGE HEADER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <ScrollReveal yOffset={20}>
          <SectionHeading
            eyebrow="REGIONAL DISCOVERY & SACRED HERITAGE"
            title="Dravidian Temples, Waterfalls & Western Ghats Foothills"
            subtitle="From monumental thousand-year-old gopurams and sacred elemental Shiva stalams to refreshing mountain waterfalls and panoramic botanical ridges, explore fourteen distinguished destinations within serene driving distance of Hotel Amil, Rajapalayam."
          />
        </ScrollReveal>
      </div>

      {/* ── 2. THE 14 ALTERNATING LUXURY DESTINATION SHOWCASES ── */}
      <div className="space-y-0">
        {nearbyDestinations.map((item, idx) => {
          // Odd-numbered destination (1, 3, 5... => idx 0, 2, 4): Info on left, Gallery on right
          // Even-numbered destination (2, 4, 6... => idx 1, 3, 5): Gallery on left, Info on right
          const isOdd = idx % 2 === 0;

          return (
            <section
              key={item.id}
              id={item.id}
              className={`py-7 sm:py-8 lg:py-10 ${
                idx % 2 === 0 ? 'bg-ivory' : 'bg-warm-white'
              } border-b border-border-light/70 scroll-mt-24 sm:scroll-mt-28`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ── MOBILE-ONLY HEADING (Stacks 1st on mobile) ── */}
                <div className="lg:hidden mb-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase text-amil-red">
                      {item.category}
                    </span>
                    <span className="text-border-light">•</span>
                    <span className="text-[10px] font-sans font-medium text-muted-gold tracking-luxury">
                      DESTINATION {String(idx + 1).padStart(2, '0')} / 14
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif text-charcoal font-normal leading-snug">
                    {item.name}
                  </h3>
                  <div className="w-10 h-[2px] bg-amil-red mt-2.5" />
                </div>

                {/* ── RESPONSIVE 2-COLUMN GRID ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
                  {/* Column A: Gallery (7 cols) — Right on Odd, Left on Even */}
                  <div className={`lg:col-span-7 ${isOdd ? 'lg:order-2' : 'lg:order-1'}`}>
                    <ScrollReveal yOffset={20}>
                      <DestinationGallery
                        destinationName={item.name}
                        gallery={item.gallery}
                        distance={item.distance}
                        drivingTime={item.drivingTime}
                      />
                    </ScrollReveal>
                  </div>

                  {/* Column B: Information (5 cols) — Left on Odd, Right on Even */}
                  <div className={`lg:col-span-5 ${isOdd ? 'lg:order-1' : 'lg:order-2'}`}>
                    <ScrollReveal delay={0.08} yOffset={20}>
                      <div className="space-y-3.5">
                        {/* Desktop-Only Heading */}
                        <div className="hidden lg:block">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase text-amil-red">
                              {item.category}
                            </span>
                            <span className="text-border-light">•</span>
                            <span className="text-[10px] font-sans font-medium text-muted-gold tracking-luxury">
                              DESTINATION {String(idx + 1).padStart(2, '0')} / 14
                            </span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-serif text-charcoal font-normal leading-snug">
                            {item.name}
                          </h3>
                          <div className="w-10 h-[2px] bg-amil-red mt-2.5" />
                        </div>

                        {/* Description (~30 words) */}
                        <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed">
                          {item.description}
                        </p>

                        {/* Location & Travel Information */}
                        <div className="pt-2 border-t border-border-light/60 space-y-1.5 text-xs font-sans">
                          <div className="flex items-start gap-2.5 text-charcoal">
                            <MapPin className="w-4 h-4 text-amil-red flex-shrink-0 mt-0.5" />
                            <span className="text-text-muted leading-relaxed">
                              <strong className="text-charcoal font-medium">Location: </strong>
                              {item.location}
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5 text-text-muted text-[11px] sm:text-xs">
                            <Navigation className="w-3.5 h-3.5 text-muted-gold flex-shrink-0" />
                            <span>
                              {item.distance} • {item.drivingTime}
                            </span>
                          </div>
                        </div>

                        {/* Directions CTA Button */}
                        <div className="pt-1.5">
                          <a
                            href={item.directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                          >
                            <Button variant="secondary" size="sm" className="group">
                              <span>Get Directions</span>
                              <ExternalLink className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── 3. CHAUFFEUR & CONCIERGE DESK CALLOUT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
        <ScrollReveal yOffset={20}>
          <div className="p-6 sm:p-8 md:p-10 bg-charcoal text-ivory border border-ivory/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft-luxury rounded-[2px]">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-muted-gold text-xs font-sans tracking-luxury uppercase font-semibold">
                <Car className="w-4 h-4" />
                <span>Chauffeur & Guided Excursions</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-normal">
                Curate Tailored Regional Excursions with Our Concierge
              </h3>
              <p className="text-xs sm:text-sm font-sans text-ivory/70 max-w-xl font-light leading-relaxed">
                Hotel Amil provides AC sedan and Innova transfers, temple darshan timings coordination, and breakfast hampers for early morning excursion trips across Virudhunagar and Tenkasi districts.
              </p>
            </div>
            <a
              href={`tel:${hotelData.mobile.replace(/\s+/g, '')}`}
              className="flex-shrink-0"
            >
              <Button variant="primary" size="md">
                Call Concierge Desk
              </Button>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Nearby;