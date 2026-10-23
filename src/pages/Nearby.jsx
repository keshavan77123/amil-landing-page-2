import React, { useState } from 'react';
import { MapPin, Clock, Compass, X, Car, Info } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import ScrollStrip from '../components/ScrollStrip';
import NearbyCard from '../components/NearbyCard';
import ScrollReveal from '../components/ScrollReveal';
import { Button } from '../components/ui/Button';
import { nearbyAttractionsData } from '../data/nearby';

export const Nearby = () => {
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  return (
    <div className="bg-ivory pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <ScrollReveal yOffset={25}>
          <SectionHeading
            eyebrow="REGIONAL DISCOVERY"
            title="Heritage, Waterfalls & Foothill Sanctuaries"
            subtitle="Explore historic Dravidian architecture, sacred herbal hills, cascading Western Ghats waterfalls, and wildlife reserves situated within minutes of Hotel Amil."
          />
        </ScrollReveal>

        {/* Primary Layout: Pattern D Horizontal Scrollable Strip */}
        <div className="my-10 bg-warm-white border border-border-light/70 p-6 sm:p-10 shadow-soft-luxury">
          <ScrollStrip
            eyebrow="CURATED EXCURSIONS"
            title="Popular Destinations Strip"
          >
            {nearbyAttractionsData.map((item) => (
              <NearbyCard
                key={item.id}
                item={item}
                isStrip={true}
                onClick={() => setSelectedAttraction(item)}
              />
            ))}
          </ScrollStrip>
        </div>

        {/* Secondary Expansion: Full Pattern A Grid for Comprehensive Browsing */}
        <div className="mt-20">
          <div className="mb-8">
            <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-1">
              COMPLETE GUIDE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-charcoal font-normal">
              All Regional Attractions & Driving Distances
            </h2>
            <div className="w-12 h-[2px] bg-amil-red mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nearbyAttractionsData.map((item, idx) => (
              <ScrollReveal key={item.id} delay={idx * 0.1} yOffset={30}>
                <NearbyCard
                  item={item}
                  isStrip={false}
                  onClick={() => setSelectedAttraction(item)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Concierge Chauffeur Box */}
        <div className="mt-16 p-8 bg-charcoal text-ivory border border-ivory/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-muted-gold text-xs font-sans tracking-luxury uppercase font-semibold">
              <Car className="w-4 h-4" />
              <span>Chauffeur & Guided Sightseeing</span>
            </div>
            <h3 className="text-xl font-serif">Plan Custom Itineraries with Our Concierge</h3>
            <p className="text-xs font-sans text-ivory/70 max-w-xl">
              Hotel Amil provides AC sedan and Innova transfers, temple darshan timings coordination, and breakfast hampers for early morning excursion trips.
            </p>
          </div>
          <a href="tel:+919443312345" className="flex-shrink-0">
            <Button variant="primary" size="md">
              Call Concierge Desk
            </Button>
          </a>
        </div>
      </div>

      {/* Modal Detail for Selected Attraction */}
      {selectedAttraction && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedAttraction(null)}
        >
          <div
            className="bg-warm-white border border-border-light max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedAttraction(null)}
              className="absolute top-4 right-4 p-2 text-charcoal hover:text-amil-red transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="aspect-[16/9] w-full overflow-hidden mb-6 bg-charcoal/10">
              <img
                src={selectedAttraction.image}
                alt={selectedAttraction.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center text-xs font-sans text-amil-red font-medium tracking-wide mb-2">
              <MapPin className="w-4 h-4 mr-1.5" />
              <span>{selectedAttraction.distance}</span>
            </div>

            <h3 className="text-2xl font-serif text-charcoal mb-3">
              {selectedAttraction.name}
            </h3>

            <p className="text-xs sm:text-sm font-sans text-text-muted leading-relaxed mb-6">
              {selectedAttraction.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border-light/60 pt-4 text-xs font-sans">
              <div>
                <strong className="text-charcoal block mb-1">Ideal Visiting Hours:</strong>
                <span className="text-text-muted">{selectedAttraction.bestTimeToVisit}</span>
              </div>
              <div>
                <strong className="text-charcoal block mb-1">Travel Advice:</strong>
                <span className="text-text-muted">{selectedAttraction.travelAdvice}</span>
              </div>
            </div>

            <div className="mt-8 text-right">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedAttraction(null)}
              >
                Close Window
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nearby;
