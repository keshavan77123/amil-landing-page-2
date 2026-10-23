import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={`bg-warm-white border border-border-light/60 transition-all duration-300 ${
        hoverEffect ? 'hover:border-amil-red/40 hover:shadow-soft-luxury' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
