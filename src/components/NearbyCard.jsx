import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

export const NearbyCard = ({ item, isStrip = true, onClick }) => {
  if (!item) return null;

  // Reliable image fallback sequence (Phase 2.7.2):
  // 1. gallery[0].src
  // 2. item.image
  // 3. Rakatachi's existing placeholder image or default placeholder
  const imageSrc =
    item.gallery?.[0]?.src ||
    item.image ||
    (item.id === 'rakatachi-amman-kovil'
      ? '/images/nearby/placeholders/rakatachi-amman-kovil-1.svg'
      : '/images/nearby/placeholders/default.svg');

  // Description fallback
  const description = item.description || item.shortDescription || '';

  // Distance and travel time formatting in existing card format
  const distanceDisplay =
    item.drivingTime && !item.distance?.includes('(')
      ? `${item.distance} (${item.drivingTime})`
      : item.distance;

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer flex-shrink-0 flex flex-col h-full bg-warm-white border border-border-light/60 hover:border-amil-red/40 transition-all duration-300 ${
        isStrip
          ? 'w-[280px] sm:w-[320px] md:w-[360px]'
          : 'w-full'
      }`}
    >
      {/* Rectangular Image */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-charcoal/10 flex-shrink-0">
        <img
          src={imageSrc}
          alt={item.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = item.id === 'rakatachi-amman-kovil'
              ? '/images/nearby/placeholders/rakatachi-amman-kovil-1.svg'
              : '/images/nearby/placeholders/default.svg';
          }}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-charcoal/70 backdrop-blur-sm text-ivory text-[10px] font-sans font-medium tracking-luxury uppercase px-2.5 py-1">
          {item.category}
        </div>
      </div>

      {/* Caption & Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center text-[11px] text-amil-red font-medium tracking-wide mb-1.5 flex-shrink-0">
            <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
            <span>{distanceDisplay}</span>
          </div>

          <div className="h-[56px] min-h-[56px] mb-2 flex items-start">
            <h3 className="text-lg font-serif text-charcoal group-hover:text-amil-red transition-colors line-clamp-2 leading-snug">
              {item.name}
            </h3>
          </div>

          <div className="h-[40px] min-h-[40px] mb-4">
            <p className="text-xs font-sans text-text-muted leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-border-light/40 flex items-center justify-between text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red group-hover:translate-x-1 transition-transform mt-auto">
          <span>Explore Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};

export default NearbyCard;
