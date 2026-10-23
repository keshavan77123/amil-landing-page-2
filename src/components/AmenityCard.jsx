import React from 'react';
import { Clock, Users, Phone, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';

export const AmenityCard = ({ amenity, layout = 'B', reverse = false }) => {
  if (!amenity) return null;

  // Pattern B: Split Image and Text
  if (layout === 'B') {
    return (
      <div
        id={amenity.id}
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 md:py-16 border-b border-border-light/60 last:border-b-0 ${
          reverse ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Large Photography */}
        <div className={`lg:col-span-7 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="relative aspect-[16/10] overflow-hidden bg-charcoal/10 border border-border-light/60 group">
            <img
              src={amenity.image}
              alt={amenity.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Editorial Information */}
        <div className={`lg:col-span-5 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
          {amenity.eyebrow && (
            <span className="text-[11px] font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-2.5">
              {amenity.eyebrow}
            </span>
          )}

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-charcoal font-normal mb-3">
            {amenity.name}
          </h3>

          <div className="w-10 h-[2px] bg-amil-red mb-4" />

          <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed mb-6">
            {amenity.description}
          </p>

          {/* Timings & Capacity info */}
          <div className="space-y-2.5 text-xs text-charcoal-text/90 font-sans border-t border-border-light/60 pt-4 mb-6">
            {amenity.timings && (
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-amil-red mt-0.5 flex-shrink-0" />
                <span><strong>Hours:</strong> {amenity.timings}</span>
              </div>
            )}
            {amenity.capacity && (
              <div className="flex items-start space-x-2">
                <Users className="w-4 h-4 text-amil-red mt-0.5 flex-shrink-0" />
                <span><strong>Capacity:</strong> {amenity.capacity}</span>
              </div>
            )}
            {amenity.contact && (
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-amil-red mt-0.5 flex-shrink-0" />
                <span><strong>Inquiries:</strong> {amenity.contact}</span>
              </div>
            )}
            {amenity.rules && (
              <p className="text-[11px] text-text-muted italic pt-1">
                * Note: {amenity.rules}
              </p>
            )}
          </div>

          {/* Features checkmarks */}
          {amenity.features && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {amenity.features.map((feat, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-text-muted">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amil-red flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Pattern A: Card with Image Top, minimal text below
  return (
    <div className="group bg-warm-white border border-border-light/60 hover:border-amil-red/40 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal/10">
        <img
          src={amenity.image}
          alt={amenity.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {amenity.eyebrow && (
          <div className="absolute top-3 left-3 bg-charcoal/70 backdrop-blur-sm text-ivory text-[10px] font-sans font-medium tracking-luxury uppercase px-2.5 py-1">
            {amenity.eyebrow}
          </div>
        )}
      </div>

      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-serif text-charcoal group-hover:text-amil-red transition-colors mb-2">
            {amenity.name}
          </h3>
          <p className="text-xs font-sans text-text-muted leading-relaxed mb-4 line-clamp-3">
            {amenity.subtitle || amenity.description}
          </p>
        </div>

        <div className="border-t border-border-light/40 pt-3">
          <p className="text-[11px] font-sans text-text-muted flex items-center mb-3">
            <Clock className="w-3.5 h-3.5 mr-1.5 text-amil-red" />
            {amenity.timings}
          </p>
          <a href={`#${amenity.id}`}>
            <Button variant="secondary" size="sm" className="w-full text-[10px] tracking-wider py-2">
              View Venue Details
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AmenityCard;
