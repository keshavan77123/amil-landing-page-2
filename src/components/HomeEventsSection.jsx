import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { Button } from './ui/Button';

const eventCategories = [
  {
    number: '01',
    title: 'Candlelight Dining',
    description:
      'Create a memorable evening with an intimate dining experience, thoughtful presentation, and warm hospitality.',
    image: '/images/events/RestaurentTable_8k.png',
    alt: 'Candlelight dining experience at Hotel Amil',
    link: '/events#romantic-section',
  },
  {
    number: '02',
    title: 'Family Celebrations',
    description:
      'Bring your loved ones together for birthdays, anniversaries, reunions, and other meaningful milestones.',
    image: '/images/events/EventBabyShower2_8k.png',
    alt: 'Family celebration and milestone gathering at Hotel Amil',
    link: '/events#birthday-section',
  },
  {
    number: '03',
    title: 'Banquets & Special Occasions',
    description:
      'Discover an elegant setting for gatherings, celebrations, and special events, supported by attentive hospitality.',
    image: '/images/events/BanquetHall3_8k.png',
    alt: 'Grand banquet and wedding reception at Hotel Amil',
    link: '/events#wedding-section',
  },
];

export const HomeEventsSection = () => {
  return (
    <section
      aria-label="Celebrations at Hotel Amil"
      className="relative w-full overflow-hidden bg-charcoal text-ivory py-10 sm:py-11 md:py-12 lg:py-14"
    >
      {/* 1. Full-width Cinematic Banquet Hall Photographic Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url('/images/amenities/banquetHall-8k.png')`,
        }}
      />

      {/* 2. Carefully Tuned Dark Charcoal Overlay for Typography Contrast & Warm Ambience */}
      <div className="absolute inset-0 bg-charcoal/65 sm:bg-charcoal/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/55 via-charcoal/35 to-charcoal/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-charcoal/30" />

      {/* 3. Two-Column Editorial Composition (Desktop ~45% Left / ~55% Right) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
          
          {/* ── LEFT COLUMN (~45% width on desktop) ── */}
          <div className="lg:col-span-5 text-left">
            <ScrollReveal yOffset={30}>
              {/* Uppercase Eyebrow Text */}
              <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-muted-gold block mb-3">
                CELEBRATIONS AT HOTEL AMIL
              </span>

              {/* Large Elegant Serif Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-warm-white font-normal leading-[1.16] tracking-tight mb-4">
                Made for moments that matter.
              </h2>

              {/* Amil Red Divider */}
              <div className="w-12 h-[2px] bg-amil-red mb-6" />

              {/* Supporting Description */}
              <p className="text-xs sm:text-sm lg:text-base font-sans text-ivory/80 font-light leading-relaxed mb-8 max-w-lg">
                From intimate candlelight dinners to joyful family celebrations and grand occasions, Hotel Amil provides an inviting setting for the moments you want to remember.
              </p>

              {/* Burgundy Amil Red CTA Button */}
              <Link to="/events#event-enquiry" className="inline-block">
                <Button
                  variant="primary"
                  size="lg"
                  className="group !px-7 !py-4 shadow-soft-luxury hover:shadow-elevated transition-all duration-300 flex items-center gap-2.5"
                >
                  <span className="tracking-luxury font-medium text-xs sm:text-sm">
                    PLAN YOUR EVENT
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
                </Button>
              </Link>
            </ScrollReveal>
          </div>

          {/* ── RIGHT COLUMN (~55% width on desktop): Three Horizontal Event Rows ── */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-white/15 border-y border-white/15">
              {eventCategories.map((item, index) => (
                <ScrollReveal
                  key={item.number}
                  delay={0.15 + index * 0.12}
                  yOffset={25}
                >
                  <Link
                    to={item.link}
                    className="group flex flex-row items-center gap-4 sm:gap-6 py-6 sm:py-7 transition-all duration-300 hover:bg-white/[0.04] px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-[2px]"
                  >
                    {/* 1. Photographic Image on the Left */}
                    <div className="w-24 sm:w-36 md:w-44 aspect-[4/3] flex-shrink-0 overflow-hidden rounded-[2px] bg-charcoal/60 border border-white/15 shadow-sm">
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/amenities/banquetHall-8k.png';
                        }}
                      />
                    </div>

                    {/* 2 & 3 & 4. Event Number, Title & Short Description in the Middle */}
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 sm:mb-2">
                        <span className="text-muted-gold font-sans text-xs sm:text-sm font-semibold tracking-luxury">
                          {item.number}
                        </span>
                        <span className="text-muted-gold/60 text-xs sm:text-sm font-light select-none">
                          —
                        </span>
                        <h3 className="text-base sm:text-lg lg:text-xl font-serif text-warm-white font-normal group-hover:text-muted-gold transition-colors duration-300 truncate sm:whitespace-normal">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-ivory/70 font-light leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {item.description}
                      </p>
                    </div>

                    {/* 5. Subtle Circular Arrow on the Right */}
                    <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-ivory/25 bg-ivory/10 text-ivory flex items-center justify-center transition-all duration-300 group-hover:border-amil-red group-hover:bg-amil-red shadow-sm group-hover:scale-105">
                      <ArrowRight className="w-4 h-4 stroke-[1.75] transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeEventsSection;
