import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-ivory px-4 py-24 text-center">
      <div className="max-w-md space-y-6">
        <span className="text-xs font-sans font-semibold tracking-luxury uppercase text-amil-red block">
          404 ERROR • PAGE NOT FOUND
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-charcoal font-normal">
          The requested sanctuary could not be located.
        </h1>
        <div className="w-12 h-[2px] bg-amil-red mx-auto" />
        <p className="text-xs sm:text-sm font-sans text-text-muted font-light leading-relaxed">
          The page or itinerary you are seeking may have moved or is temporarily unavailable. Please return to our main portal.
        </p>
        <div className="pt-4">
          <Link to="/">
            <Button variant="primary" size="md">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
