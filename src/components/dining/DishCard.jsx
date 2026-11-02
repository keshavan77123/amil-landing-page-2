import React, { useState } from 'react';

/**
 * DishCard Component
 * Displays a single curated dish with strictly uniform dimensions.
 * Every card has identical width and height within each responsive breakpoint.
 * Features consistent image aspect ratios, reserved text heights, and zero prices.
 */
export const DishCard = ({ dish }) => {
  const [imgSrc, setImgSrc] = useState(dish.image || dish.fallbackImage);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    if (!imgError && dish.fallbackImage && imgSrc !== dish.fallbackImage) {
      setImgSrc(dish.fallbackImage);
      setImgError(true);
    }
  };

  return (
    <article
      className="group bg-white border border-[#DED5C9]/85 hover:border-amil-red/45 rounded-lg overflow-hidden shadow-2xs hover:shadow-soft-luxury transition-all duration-300 flex flex-row w-full h-[142px] sm:h-[144px] lg:h-[146px] box-border min-w-0"
    >
      {/* Fixed-Dimension Image Container */}
      <div className="w-[105px] min-[480px]:w-[85px] sm:w-[115px] lg:w-[115px] xl:w-[125px] flex-shrink-0 h-full relative overflow-hidden bg-charcoal/5 box-border">
        <img
          src={imgSrc}
          alt={dish.name}
          loading="lazy"
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-charcoal/5 pointer-events-none group-hover:opacity-0 transition-opacity" />
      </div>

      {/* Structured Text & Metadata Container with Reserved Heights */}
      <div className="flex-1 p-2 min-[480px]:p-2 sm:p-3 flex flex-col justify-between min-w-0 h-full box-border">
        {/* Top Line: Category Tag & Dietary Indicator (Fixed Height) */}
        <div className="flex items-center justify-between gap-1 h-5 flex-shrink-0 mb-1">
          <span className="text-[9px] sm:text-[10px] font-sans font-semibold tracking-wider uppercase px-2 py-0.5 rounded-[3px] bg-[#FDF2F0] text-amil-red inline-block whitespace-nowrap leading-none truncate max-w-[120px]">
            {dish.category}
          </span>

          {/* FSSAI Standard Veg / Non-Veg Indicator */}
          {typeof dish.isVeg === 'boolean' && (
            <span
              className={`w-3.5 h-3.5 border flex items-center justify-center p-0.5 rounded-[2px] bg-white flex-shrink-0 ${
                dish.isVeg ? 'border-[#0E8A34]' : 'border-[#A52A2A]'
              }`}
              title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
              aria-label={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  dish.isVeg ? 'bg-[#0E8A34]' : 'bg-[#A52A2A]'
                }`}
              />
            </span>
          )}
        </div>

        {/* Dish Title - Reserved 2-line height, wraps naturally */}
        <div className="h-[38px] flex items-center mb-1 flex-shrink-0 overflow-hidden">
          <h3
            className="font-serif font-medium text-charcoal text-[13px] sm:text-[14px] leading-[1.25] group-hover:text-amil-red transition-colors line-clamp-2"
            title={dish.name}
          >
            {dish.name}
          </h3>
        </div>

        {/* Description - Reserved 3-line height, fully accessible */}
        <div className="h-[42px] sm:h-[44px] overflow-hidden flex-shrink-0">
          <p
            className="text-[10.5px] sm:text-[11px] font-sans text-text-muted leading-[1.3] line-clamp-3"
            title={dish.description}
          >
            {dish.description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default DishCard;
