import React, { useState } from 'react';
import VirtualAssistanceChat from './VirtualAssistanceChat';

export const VirtualAssistanceButton = ({
  className = '',
  isVisible = true,
  isLandscapeMobile = false,
}) => {
  const [chatState, setChatState] = useState('closed'); // 'closed' | 'open' | 'minimized'

  const handleToggle = () => {
    setChatState((prev) => (prev === 'open' ? 'minimized' : 'open'));
  };

  return (
    <>
      <button
        id="floating-va-btn"
        type="button"
        onClick={handleToggle}
        aria-label="AMIL Virtual Assistance"
        title="AMIL Virtual Assistance"
        aria-expanded={chatState === 'open'}
        aria-haspopup="dialog"
        aria-hidden={!isVisible}
        style={{
          bottom: isLandscapeMobile
            ? 'calc(0.75rem + env(safe-area-inset-bottom, 0px))'
            : undefined,
          right: isLandscapeMobile
            ? 'calc(5rem + env(safe-area-inset-right, 0px))'
            : 'calc(1.25rem + env(safe-area-inset-right, 0px))',
        }}
        className={`fixed z-40 rounded-full bg-white border border-amber-500/35 shadow-elevated flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-105 hover:border-amber-500/60 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 active:scale-95 ${
          isLandscapeMobile
            ? 'w-12 h-12 p-1.5'
            : 'bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))] min-[375px]:bottom-[calc(6.375rem+env(safe-area-inset-bottom,0px))] w-[60px] h-[60px] min-[375px]:w-[70px] min-[375px]:h-[70px] p-2'
        } sm:!bottom-[calc(6.625rem+env(safe-area-inset-bottom,0px))] sm:!right-[calc(1.5rem+env(safe-area-inset-right,0px))] sm:w-20 sm:h-20 sm:p-2.5 ${
          isVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
            : 'opacity-0 translate-x-28 pointer-events-none invisible'
        } ${className}`}
      >
        <img
          src="/images/Virtual%20Assistance/virtualAssistance.png"
          alt="AMIL Virtual Assistance"
          className="w-full h-full object-contain pointer-events-none select-none"
          loading="eager"
        />
      </button>

      <VirtualAssistanceChat
        chatState={chatState}
        setChatState={setChatState}
      />
    </>
  );
};

export default VirtualAssistanceButton;
