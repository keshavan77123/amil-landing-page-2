import React, { useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  X,
  Bed,
  Calendar,
  Users,
  Plus,
  Minus,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer = () => {
  const {
    cartItems,
    totalRooms,
    totalNights,
    subtotal,
    updateQuantity,
    removeItem,
    isCartOpen,
    closeCart,
  } = useCart();

  const navigate = useNavigate();

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    },
    [isCartOpen, closeCart]
  );

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, handleKeyDown]);

  const handleExploreRooms = () => {
    closeCart();
    navigate('/rooms');
  };

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-heading"
    >
      {/* Backdrop */}
      <div
        data-testid="cart-drawer-backdrop"
        className="fixed inset-0 bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 ease-out cursor-pointer"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Container: Full-screen on Mobile, 480px slide-in on Desktop */}
      <div className="fixed inset-y-0 right-0 flex max-w-full">
        <aside className="w-screen max-w-full sm:max-w-[480px] bg-white text-[#292929] shadow-2xl flex flex-col border-l border-[#E8E3DC] rounded-t-2xl sm:rounded-none overflow-hidden transform transition-transform duration-300 ease-out">

          {/* ── HEADER ── */}
          <header className="px-5 py-4 sm:px-6 sm:py-5 bg-white border-b border-[#E8E3DC] flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-center text-[#7B1113] shrink-0">
                <Bed className="w-5 h-5 stroke-[1.6]" />
              </div>
              <div>
                <h2
                  id="cart-drawer-heading"
                  className="text-xs sm:text-sm font-sans font-semibold tracking-luxury uppercase text-[#292929]"
                >
                  YOUR RESERVATION
                </h2>
                {/* Subtle gold separator */}
                <div className="w-8 h-[2px] bg-[#C9A34A] mt-1" aria-hidden="true" />
              </div>
            </div>

            <button
              type="button"
              onClick={closeCart}
              aria-label="Close reservation drawer"
              className="p-2 text-[#6B6560] hover:text-[#292929] hover:bg-[#FAF7F2] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1113]/30"
            >
              <X className="w-5 h-5 stroke-[1.8]" />
            </button>
          </header>

          {/* ── BODY (Scrollable Room List or Empty State) ── */}
          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 space-y-4">
            {cartItems.length === 0 ? (
              /* Empty Cart State */
              <div className="h-full flex flex-col items-center justify-center text-center py-12 sm:py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-center text-[#C9A34A] mb-4 shadow-sm">
                  <Bed className="w-7 h-7 stroke-[1.4]" />
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-medium text-[#292929] mb-1.5">
                  Your reservation list is empty.
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#6B6560] font-light max-w-xs mb-6 leading-relaxed">
                  Discover a comfortable stay at Hotel Amil.
                </p>
                <button
                  type="button"
                  onClick={handleExploreRooms}
                  className="inline-flex items-center space-x-2 bg-[#7B1113] hover:bg-[#660C0E] text-white font-sans font-semibold tracking-luxury uppercase text-xs px-6 py-3.5 rounded-[2px] shadow-sm hover:shadow transition-all duration-300 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#7B1113]"
                >
                  <span>Explore Our Rooms</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            ) : (
              /* Selected Room Cards */
              cartItems.map((item) => (
                <article
                  key={item.id}
                  className="bg-white border border-[#E8E3DC] rounded-[2px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3"
                >
                  <div className="flex gap-3.5">
                    {/* Actual Room Photograph */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#FAF7F2] rounded-[2px] overflow-hidden shrink-0 border border-[#E8DEC8]">
                      <img
                        src={item.image || '/images/rooms/executive/ExecutiveRoom_8K.png'}
                        alt={item.roomName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Room Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase font-sans font-semibold tracking-luxury text-[#C9A34A] block truncate">
                            {item.category || 'Luxury Room'}
                          </span>
                          <h4 className="text-sm sm:text-base font-serif font-medium text-[#292929] truncate">
                            {item.roomName}
                          </h4>
                        </div>
                        {/* Remove Option */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.roomName} from reservation`}
                          title="Remove room"
                          className="text-[#6B6560] hover:text-[#A92127] p-1 rounded transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4 stroke-[1.6]" />
                        </button>
                      </div>

                      {/* Room Price per night */}
                      <div className="mt-1 flex items-baseline space-x-1.5">
                        <span className="font-serif font-semibold text-[#A92127] text-sm sm:text-base">
                          ₹{item.ratePerNight?.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] font-sans text-[#6B6560]">/ night</span>
                      </div>

                      {/* Stay Dates */}
                      <div className="mt-1.5 flex items-center space-x-1.5 text-[11px] font-sans text-[#6B6560]">
                        <Calendar className="w-3.5 h-3.5 text-[#C9A34A] shrink-0" />
                        <span className="truncate">
                          {item.checkIn} → {item.checkOut} ({item.nights} {item.nights === 1 ? 'night' : 'nights'})
                        </span>
                      </div>

                      {/* Guests */}
                      <div className="mt-0.5 flex items-center space-x-1.5 text-[11px] font-sans text-[#6B6560]">
                        <Users className="w-3.5 h-3.5 text-[#C9A34A] shrink-0" />
                        <span>
                          {item.adults} {item.adults === 1 ? 'Adult' : 'Adults'}
                          {item.children > 0 && ` · ${item.children} ${item.children === 1 ? 'Child' : 'Children'}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls & Line Subtotal */}
                  <div className="pt-2.5 border-t border-[#E8E3DC]/70 flex items-center justify-between text-xs font-sans">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] text-[#6B6560]">Rooms:</span>
                      <div className="inline-flex items-center border border-[#E8DEC8] rounded-[2px] bg-[#FAF7F2]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.rooms - 1)}
                          aria-label={`Decrease ${item.roomName} quantity`}
                          className="w-7 h-7 flex items-center justify-center text-[#292929] hover:bg-[#7B1113] hover:text-white transition-colors focus:outline-none"
                        >
                          <Minus className="w-3 h-3 stroke-[2.2]" />
                        </button>
                        <span className="w-7 text-center font-semibold text-[#292929] text-xs select-none">
                          {item.rooms}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.rooms + 1)}
                          aria-label={`Increase ${item.roomName} quantity`}
                          className="w-7 h-7 flex items-center justify-center text-[#292929] hover:bg-[#7B1113] hover:text-white transition-colors focus:outline-none"
                        >
                          <Plus className="w-3 h-3 stroke-[2.2]" />
                        </button>
                      </div>
                    </div>

                    {/* Room Subtotal */}
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-luxury text-[#6B6560] block font-sans">
                        Subtotal
                      </span>
                      <span className="font-serif font-semibold text-[#292929] text-sm sm:text-base">
                        ₹{item.subtotal?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* ── PRICE SUMMARY & BOTTOM ACTION AREA (Fixed at bottom) ── */}
          {cartItems.length > 0 && (
            <footer className="px-5 py-4 sm:px-6 sm:py-5 bg-white border-t border-[#E8E3DC] shadow-[0_-4px_16px_rgba(0,0,0,0.03)] shrink-0 space-y-3.5">

              {/* Price Summary */}
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex justify-between text-[#6B6560]">
                  <span>Total Rooms</span>
                  <span className="font-medium text-[#292929]">
                    {totalRooms} {totalRooms === 1 ? 'Room' : 'Rooms'}
                  </span>
                </div>
                <div className="flex justify-between text-[#6B6560]">
                  <span>Total Nights</span>
                  <span className="font-medium text-[#292929]">
                    {totalNights} {totalNights === 1 ? 'Night' : 'Nights'}
                  </span>
                </div>
                <div className="border-t border-[#E8E3DC] pt-2 flex justify-between items-baseline">
                  <span className="font-sans font-semibold tracking-luxury text-xs uppercase text-[#292929]">
                    SUBTOTAL
                  </span>
                  <span className="font-serif font-semibold text-lg sm:text-xl text-[#A92127]">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Prominent Action Button: CONTINUE TO BOOKING → (Visual only for Phase 3.1.2) */}
              <div>
                <button
                  type="button"
                  className="w-full bg-[#7B1113] hover:bg-[#660C0E] text-white font-sans font-semibold tracking-luxury uppercase text-xs py-3.5 px-6 rounded-[2px] shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#7B1113]"
                  aria-label="Continue to booking"
                >
                  <span>CONTINUE TO BOOKING</span>
                  <ArrowRight className="w-4 h-4 ml-1 stroke-[2]" />
                </button>
                <p className="text-[11px] font-sans font-light italic text-[#6B6560] text-center mt-2">
                  &ldquo;Your stay at Hotel Amil awaits&rdquo;
                </p>
              </div>

            </footer>
          )}

        </aside>
      </div>
    </div>
  );
};

export default CartDrawer;
