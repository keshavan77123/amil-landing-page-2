import React from 'react';

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'left', // 'left' | 'center'
  theme = 'light', // 'light' (on ivory) | 'dark' (on charcoal)
  className = '',
}) => {
  const isCenter = align === 'center';
  const isDark = theme === 'dark';

  return (
    <div className={`mb-10 md:mb-14 ${isCenter ? 'text-center mx-auto' : 'text-left'} ${className}`}>
      {eyebrow && (
        <span className={`inline-block text-[11px] md:text-xs font-sans font-semibold tracking-luxury uppercase mb-3 ${
          isDark ? 'text-muted-gold' : 'text-amil-red'
        }`}>
          {eyebrow}
        </span>
      )}
      
      <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal tracking-tight leading-[1.2] ${
        isDark ? 'text-ivory' : 'text-charcoal'
      }`}>
        {title}
      </h2>

      {/* Signature Amil Red fine divider */}
      <div className={`w-12 h-[2px] bg-amil-red my-4 md:my-5 ${isCenter ? 'mx-auto' : ''}`} />

      {subtitle && (
        <p className={`text-sm md:text-base font-sans font-light leading-relaxed max-w-2xl ${
          isCenter ? 'mx-auto' : ''
        } ${isDark ? 'text-ivory/70' : 'text-text-muted'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
