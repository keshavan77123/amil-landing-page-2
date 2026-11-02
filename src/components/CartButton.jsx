import React from 'react';
import { useCart } from '../context/CartContext';

export const CartButton = ({
  className = '',
  onClick,
  isVisible = true,
  isLandscapeMobile = false,
}) => {
  const { openCart, isCartOpen, totalRooms } = useCart();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      openCart();
    }
  };

  const hasRooms = totalRooms > 0;

  return (
    <button
      id="floating-cart-btn"
      type="button"
      onClick={handleClick}
      aria-label={
        hasRooms
          ? `Shopping Cart (${totalRooms} ${totalRooms === 1 ? 'room' : 'rooms'} reserved)`
          : 'Shopping Cart'
      }
      aria-haspopup="dialog"
      aria-expanded={isCartOpen}
      aria-hidden={!isVisible}
      title={
        hasRooms
          ? `Shopping Cart (${totalRooms} ${totalRooms === 1 ? 'room' : 'rooms'})`
          : 'Shopping Cart'
      }
      style={{
        bottom: isLandscapeMobile
          ? 'calc(0.75rem + env(safe-area-inset-bottom, 0px))'
          : undefined,
        right: isLandscapeMobile
          ? 'calc(8.5rem + env(safe-area-inset-right, 0px))'
          : 'calc(1.25rem + env(safe-area-inset-right, 0px))',
      }}
      className={`fixed z-40 rounded-full flex items-center justify-center transition-all duration-300 ease-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-600/40 select-none group cursor-pointer ${
        isLandscapeMobile
          ? 'w-12 h-12'
          : 'bottom-[calc(9.75rem+env(safe-area-inset-bottom,0px))] min-[375px]:bottom-[calc(11.125rem+env(safe-area-inset-bottom,0px))] w-[60px] h-[60px] min-[375px]:w-[70px] min-[375px]:h-[70px]'
      } sm:!bottom-[calc(12rem+env(safe-area-inset-bottom,0px))] sm:!right-[calc(1.5rem+env(safe-area-inset-right,0px))] sm:w-20 sm:h-20 ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto visible'
          : 'opacity-0 translate-y-4 pointer-events-none invisible'
      } ${className}`}
    >
      <img
        src="/images/Carticon/cart%20icon.png"
        alt="Shopping Cart"
        className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_4px_14px_rgba(0,0,0,0.22)] group-hover:drop-shadow-[0_6px_18px_rgba(0,0,0,0.30)] transition-all duration-300 ease-out"
        loading="eager"
      />

      {hasRooms && (
        <span
          className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 min-w-[20px] h-[20px] min-[375px]:min-w-[22px] min-[375px]:h-[22px] sm:min-w-[24px] sm:h-[24px] px-1 rounded-full bg-[#7B1113] text-white border border-[#C9A34A]/80 shadow-[0_2px_8px_rgba(0,0,0,0.35)] flex items-center justify-center text-[10px] min-[375px]:text-[11px] sm:text-xs font-bold leading-none pointer-events-none select-none tracking-tight transition-transform duration-200 ease-out"
          aria-hidden="true"
        >
          {totalRooms > 99 ? '99+' : totalRooms}
        </span>
      )}
    </button>
  );
};

export default CartButton;
