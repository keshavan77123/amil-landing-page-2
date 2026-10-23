import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const AvailabilityBadge = ({ isAvailable = true, count = null }) => {
  if (isAvailable) {
    return (
      <div className="inline-flex items-center space-x-2 bg-emerald-950/20 border border-emerald-800/30 text-emerald-800 px-3 py-1 text-xs font-sans font-medium tracking-wide">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>Available for Selected Dates</span>
        {count && <span className="text-[11px] text-emerald-700/80">({count} rooms left)</span>}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center space-x-2 bg-rose-950/20 border border-rose-800/30 text-rose-800 px-3 py-1 text-xs font-sans font-medium tracking-wide">
      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
      <span>Currently Fully Committed</span>
    </div>
  );
};

export default AvailabilityBadge;
