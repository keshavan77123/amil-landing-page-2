import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Phone, Users, Utensils, Coffee, Sparkles, Check, ChevronRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import ScrollReveal from '../components/ScrollReveal';
import { saffronRestaurantData, cafeData } from '../data/dining';

export const Dining = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Regional Heritage', 'Chettinad Special', 'Coastal Catch', 'Vegetarian Feast', 'Tandoor & Clay Oven'];

  const filteredDishes = selectedCategory === 'All'
    ? saffronRestaurantData.signatureDishes
    : saffronRestaurantData.signatureDishes.filter(d => d.category === selectedCategory);

  return (
    <div className="bg-ivory pt-28 pb-24">
      {/* 1. Saffron Restaurant Hero Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <ScrollReveal yOffset={25}>
          <SectionHeading
            eyebrow="FINE DINING & GASTRONOMY"
            title="Saffron Restaurant"
            subtitle="The premier dining destination at Hotel Amil, celebrating royal South Indian culinary heritage, authentic Chettinad spices, clay oven tandoors, and global flavours."
          />
        </ScrollReveal>

        {/* Pattern B Split: Restaurant Photography Left | Story & Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mt-10">
          <div className="lg:col-span-7">
            <ScrollReveal yOffset={30}>
              <div className="relative aspect-[16/10] overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury group">
                <img
                  src={saffronRestaurantData.images[0]}
                  alt="Saffron Restaurant Fine Dining Ambience"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory text-[10px] font-sans tracking-luxury uppercase">
                  Saffron Restaurant • Seating for 120
                </div>
              </div>
            </ScrollReveal>

            {/* Thumbnail preview strip */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              {saffronRestaurantData.images.slice(1, 4).map((img, i) => (
                <div key={i} className="aspect-[16/10] overflow-hidden border border-border-light/60">
                  <img src={img} alt={`Saffron interior ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal delay={0.2} yOffset={30}>
              <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block">
                {saffronRestaurantData.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-charcoal font-normal">
                {saffronRestaurantData.tagline}
              </h2>
              
              <div className="w-12 h-[2px] bg-amil-red" />

              <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed">
                {saffronRestaurantData.description}
              </p>

              {/* Service Timings Box */}
              <div className="p-5 bg-warm-white border border-border-light/80 space-y-3 text-xs font-sans">
                <h4 className="text-[11px] font-semibold uppercase tracking-luxury text-charcoal flex items-center">
                  <Clock className="w-4 h-4 text-amil-red mr-2" />
                  Meal Services & Timings
                </h4>
                {saffronRestaurantData.timings.map((t, idx) => (
                  <div key={idx} className="border-t border-border-light/50 pt-2 first:border-0 first:pt-0">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-charcoal">{t.meal}</strong>
                      <span className="text-amil-red font-medium">{t.time}</span>
                    </div>
                    <p className="text-[11px] text-text-muted mt-0.5">{t.notes}</p>
                  </div>
                ))}
              </div>

              {/* Direct Reservation & Contact CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a href={`tel:${saffronRestaurantData.contact.directPhone.replace(/\s+/g, '')}`} className="w-full sm:w-auto flex-1">
                  <Button variant="primary" size="md" className="w-full">
                    <Phone className="w-3.5 h-3.5 mr-2 inline" />
                    Reserve a Table
                  </Button>
                </a>
                <Link to="/contact" className="w-full sm:w-auto flex-1">
                  <Button variant="secondary" size="md" className="w-full">
                    Banquet Dining Query
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Signature Dishes & Menu Highlights */}
      <section className="py-20 bg-warm-white border-y border-border-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal yOffset={25}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-2">
                CURATED SELECTIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-charcoal font-normal">
                Signature Dishes at Saffron Restaurant
              </h2>
              <div className="w-12 h-[2px] bg-amil-red mx-auto my-4" />
              <p className="text-xs sm:text-sm font-sans text-text-muted">
                Each specialty is slow-cooked to order using traditional brass vessels, cold-pressed oils, and farm-fresh spices.
              </p>
            </div>
          </ScrollReveal>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-sans uppercase tracking-luxury px-4 py-2 border transition-all ${
                  selectedCategory === cat
                    ? 'bg-amil-red border-amil-red text-ivory font-semibold'
                    : 'bg-white border-border-light text-charcoal-text hover:border-amil-red'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05} yOffset={20}>
                <div className="p-6 bg-white border border-border-light/70 hover:border-amil-red/40 transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase px-2 py-0.5 bg-amil-red/10 text-amil-red">
                        {dish.tag}
                      </span>
                      <span className="text-base font-serif font-semibold text-charcoal">
                        {dish.price}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif text-charcoal group-hover:text-amil-red transition-colors mb-2">
                      {dish.name}
                    </h3>

                    <p className="text-xs font-sans text-text-muted leading-relaxed mb-4">
                      {dish.description}
                    </p>
                  </div>

                  <div className="text-[11px] font-sans text-text-muted/70 uppercase tracking-luxury pt-3 border-t border-border-light/40">
                    Category: {dish.category}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The 24-Hour Amil Cafe Spotlight */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-5">
            <ScrollReveal yOffset={30}>
              <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block">
                {cafeData.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-charcoal font-normal">
                {cafeData.name}
              </h2>
              <p className="text-sm font-cormorant italic text-muted-gold">
                {cafeData.tagline}
              </p>

              <div className="w-12 h-[2px] bg-amil-red" />

              <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed">
                {cafeData.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
                {cafeData.features.map((f, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-charcoal-text font-sans">
                    <Check className="w-3.5 h-3.5 text-amil-red flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <a href={`tel:${saffronRestaurantData.contact.directPhone.replace(/\s+/g, '')}`}>
                  <Button variant="secondary" size="md">
                    Inquire at Cafe Desk
                  </Button>
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <ScrollReveal delay={0.2} yOffset={30}>
              <div className="relative aspect-[16/10] overflow-hidden bg-charcoal/10 border border-border-light shadow-soft-luxury group">
                <img
                  src={cafeData.image}
                  alt="24-Hour Amil Cafe Lounge"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1.5 border border-ivory/15 text-ivory text-[10px] font-sans tracking-luxury uppercase">
                  Open 24/7 Continuous Service
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. In-Room Dining & CP Breakfast Banner */}
      <section className="bg-charcoal text-ivory py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-[10px] font-sans font-semibold tracking-luxury uppercase text-muted-gold block">
              HOTEL AMIL RESIDENTS EXCLUSIVE
            </span>
            <h3 className="text-2xl font-serif">CP Complimentary Breakfast & In-Room Dining</h3>
            <p className="text-xs font-sans text-ivory/70 max-w-xl leading-relaxed">
              All resident bookings include our complimentary breakfast buffet at Saffron Restaurant from 7:00 AM to 10:30 AM. In-room dining service is accessible 24 hours by dialing <strong>Ext. 201</strong>.
            </p>
          </div>
          <Link to="/booking" className="flex-shrink-0">
            <Button variant="primary" size="md">
              Book a Room with Breakfast
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dining;
