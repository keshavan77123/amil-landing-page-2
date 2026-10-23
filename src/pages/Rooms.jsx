import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Bed, Eye, ArrowRight, Check } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import ScrollReveal from '../components/ScrollReveal';
import { roomsData } from '../data/rooms';

export const Rooms = () => {
  return (
    <div className="bg-ivory pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <ScrollReveal yOffset={25}>
          <SectionHeading
            eyebrow="ACCOMMODATIONS & RESIDENCES"
            title="Spacious Suites Tailored for Supreme Rest"
            subtitle="Four distinct room categories designed with bespoke wooden finishes, acoustic tranquility, and comprehensive modern residential amenities."
          />
        </ScrollReveal>

        {/* Room Categories List (Alternating Pattern B Style with 360 preview links) */}
        <div className="space-y-16 sm:space-y-24 mt-12">
          {roomsData.map((room, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <ScrollReveal key={room.id} yOffset={30}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center p-6 sm:p-10 bg-warm-white border border-border-light/70 shadow-soft-luxury ${
                    isEven ? '' : ''
                  }`}
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative aspect-[16/10] overflow-hidden bg-charcoal/10 border border-border-light/60 group">
                      <img
                        src={room.images[0]}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      
                      <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-sm text-ivory text-[10px] font-sans font-medium tracking-luxury uppercase px-3 py-1">
                        {room.category}
                      </div>

                      <Link
                        to={`/rooms/${room.id}`}
                        className="absolute bottom-3 right-3 bg-amil-red text-ivory text-xs font-sans font-medium px-3 py-1.5 flex items-center space-x-1.5 shadow-md hover:bg-amil-red-dark transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Launch 360° Tour</span>
                      </Link>
                    </div>

                    {/* Mini thumbnail strip */}
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {room.images.slice(1, 4).map((img, i) => (
                        <div key={i} className="aspect-[16/10] overflow-hidden border border-border-light/60">
                          <img src={img} alt={`${room.name} detail ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Information Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'} space-y-5`}>
                    <div>
                      <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block mb-1">
                        From ₹{room.startingPrice.toLocaleString('en-IN')} / night
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif text-charcoal font-normal">
                        {room.name}
                      </h2>
                      <p className="text-xs sm:text-sm font-sans text-text-muted mt-2 leading-relaxed">
                        {room.description}
                      </p>
                    </div>

                    {/* Key Specs */}
                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-border-light/60 text-xs font-sans text-charcoal-text">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-amil-red flex-shrink-0" />
                        <span>Max {room.maxOccupancy} Guests</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Bed className="w-4 h-4 text-amil-red flex-shrink-0" />
                        <span>{room.bedType}</span>
                      </div>
                    </div>

                    {/* Amenities Highlights */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-text-muted">
                      {room.amenities.slice(0, 4).map((item, i) => (
                        <div key={i} className="flex items-center space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-amil-red flex-shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <Link to={`/rooms/${room.id}`} className="w-full sm:w-auto flex-1">
                        <Button variant="secondary" size="md" className="w-full">
                          View Details & 360°
                        </Button>
                      </Link>
                      <Link to={`/booking?room=${room.id}`} className="w-full sm:w-auto flex-1">
                        <Button variant="primary" size="md" className="w-full">
                          Book This Room
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
