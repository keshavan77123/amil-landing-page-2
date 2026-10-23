import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'dark-secondary' | 'round-arrow' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  direction = 'right', // for 'round-arrow': 'left' | 'right'
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  if (variant === 'round-arrow') {
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
        className={`w-11 h-11 rounded-full border border-charcoal-text/25 dark:border-ivory/30 bg-ivory/80 backdrop-blur-sm text-charcoal-text flex items-center justify-center transition-all duration-300 hover:border-amil-red hover:text-amil-red hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed shadow-sm ${className}`}
        {...props}
      >
        {direction === 'left' ? (
          <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
        ) : (
          <ChevronRight className="w-5 h-5 stroke-[1.5]" />
        )}
      </button>
    );
  }

  const baseStyles = "inline-flex items-center justify-center font-sans font-medium tracking-luxury transition-all duration-300 rounded-[2px] disabled:opacity-50 disabled:cursor-not-allowed text-center uppercase";

  const sizeStyles = {
    sm: "text-[11px] px-4 py-2",
    md: "text-xs px-6 py-3.5",
    lg: "text-xs md:text-sm px-8 py-4",
  };

  const variantStyles = {
    primary: "bg-amil-red text-ivory hover:bg-amil-red-dark shadow-sm hover:shadow active:translate-y-[1px]",
    secondary: "bg-transparent border border-amil-red text-amil-red hover:bg-amil-red/5 active:translate-y-[1px]",
    'dark-secondary': "bg-transparent border border-ivory text-ivory hover:bg-ivory/10 active:translate-y-[1px]",
    ghost: "bg-transparent text-charcoal-text hover:text-amil-red hover:bg-black/5",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
