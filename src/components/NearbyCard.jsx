import React from 'react';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

export const NearbyCard = ({ item, isStrip = true, onClick }) => {
  if (!item) return null;

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer flex-shrink-0 bg-warm-white border border-border-light/60 hover:border-amil-red/40 transition-all duration-300 ${
        isStrip
          ? 'w-[280px] sm:w-[320px] md:w-[360px]'
          : 'w-full'
      }`}
    >
      {/* Rectangular Image */}
      <div className="relative aspect-[16/11] overflow-hidden bg-charcoal/10">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-charcoal/70 backdrop-blur-sm text-ivory text-[10px] font-sans font-medium tracking-luxury uppercase px-2.5 py-1">
          {item.category}
        </div>
      </div>

      {/* Caption & Details */}
      <div className="p-5">
        <div className="flex items-center text-[11px] text-amil-red font-medium tracking-wide mb-1.5">
          <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
          <span>{item.distance}</span>
        </div>

        <h3 className="text-lg font-serif text-charcoal group-hover:text-amil-red transition-colors mb-2">
          {item.name}
        </h3>

        <p className="text-xs font-sans text-text-muted leading-relaxed mb-4 line-clamp-2">
          {item.shortDescription}
        </p>

        <div className="pt-2 border-t border-border-light/40 flex items-center justify-between text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red group-hover:translate-x-1 transition-transform">
          <span>Explore Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};

export default NearbyCard;
