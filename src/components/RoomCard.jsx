import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Bed, Eye } from 'lucide-react';
import { Button } from './ui/Button';

export const RoomCard = ({ room }) => {
  if (!room) return null;

  const previewImage = room.images && room.images.length > 0 ? room.images[0] : '/images/rooms/executive/executive-1.svg';

  return (
    <div className="group flex flex-col bg-warm-white border border-border-light/70 hover:border-amil-red/40 transition-all duration-500 overflow-hidden">
      {/* Pattern A: Large Image with subtle hover zoom */}
      <Link to={`/rooms/${room.id}`} className="relative block aspect-[16/10] overflow-hidden bg-charcoal/5">
        <img
          src={previewImage}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Subtle top category tag */}
        <div className="absolute top-3 left-3 bg-charcoal/70 backdrop-blur-sm text-ivory text-[10px] uppercase font-sans font-semibold tracking-luxury px-2.5 py-1">
          {room.category}
        </div>

        {/* 360 Tour Available Badge */}
        <div className="absolute bottom-3 right-3 bg-amil-red/90 text-ivory text-[10px] font-sans font-medium px-2 py-0.5 flex items-center space-x-1 backdrop-blur-sm opacity-90">
          <Eye className="w-3 h-3" />
          <span>360° Tour</span>
        </div>
      </Link>

      {/* Pattern A: Minimal Text Below */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
        <div>
          {/* Room Name */}
          <Link to={`/rooms/${room.id}`}>
            <h3 className="text-xl font-serif text-charcoal group-hover:text-amil-red transition-colors mb-2">
              {room.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs font-sans text-text-muted leading-relaxed mb-4 line-clamp-2">
            {room.shortDescription}
          </p>

          {/* Meta Specifications */}
          <div className="flex items-center space-x-4 text-[11px] text-text-muted border-t border-border-light/40 pt-3 mb-4">
            <div className="flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-amil-red" />
              <span>Up to {room.maxOccupancy} Guests</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Bed className="w-3.5 h-3.5 text-amil-red" />
              <span>{room.bedType}</span>
            </div>
          </div>
        </div>

        <div>
          {/* Starting Tariff */}
          <div className="flex items-baseline justify-between mb-5">
            <div>
              <span className="text-[10px] uppercase tracking-luxury text-text-muted block">Starting From</span>
              <span className="text-xl font-serif font-normal text-charcoal">₹{room.startingPrice.toLocaleString('en-IN')}</span>
              <span className="text-xs text-text-muted ml-1">/ night</span>
            </div>
            <Link
              to={`/rooms/${room.id}`}
              className="text-xs uppercase font-sans font-semibold tracking-luxury text-amil-red hover:text-amil-red-dark inline-flex items-center group-hover:translate-x-1 transition-all"
            >
              View Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Link to={`/rooms/${room.id}`} className="w-full">
              <Button variant="secondary" size="sm" className="w-full text-[10px] tracking-wider py-2.5">
                Explore Room
              </Button>
            </Link>
            <Link to={`/booking?room=${room.id}`} className="w-full">
              <Button variant="primary" size="sm" className="w-full text-[10px] tracking-wider py-2.5">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
