import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import AmenityCard from '../components/AmenityCard';
import ScrollReveal from '../components/ScrollReveal';
import { amenitiesData } from '../data/amenities';

export const Amenities = () => {
  return (
    <div className="bg-ivory pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <ScrollReveal yOffset={25}>
          <SectionHeading
            eyebrow="FACILITIES & SERVICES"
            title="Dining, Wellness & Celebrations"
            subtitle="Explore our array of dining destinations, round-the-clock cafe, banquet conventions, and tranquil recreation facilities designed for unmatched comfort."
          />
        </ScrollReveal>

        {/* Quick Venue Jump Links */}
        <div className="flex flex-wrap gap-2 sm:gap-3 my-8 pb-4 border-b border-border-light/60">
          {amenitiesData.map((venue) => (
            <a
              key={venue.id}
              href={`#${venue.id}`}
              className="text-xs font-sans uppercase tracking-luxury px-3.5 py-1.5 bg-warm-white border border-border-light/80 hover:border-amil-red hover:text-amil-red transition-colors text-charcoal-text"
            >
              {venue.name}
            </a>
          ))}
        </div>

        {/* Venue Sections (Pattern B Alternating Editorial Sections) */}
        <div className="space-y-4">
          {amenitiesData.map((amenity, idx) => (
            <ScrollReveal key={amenity.id} yOffset={30}>
              <AmenityCard
                amenity={amenity}
                layout="B"
                reverse={idx % 2 === 1}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Amenities;
