"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const location = { pathname };
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'fadeIn' | 'fadeOut'>('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  // Determine animation class based on route
  const getAnimationClass = () => {
    const settingsPath = '/settings';
    const currentPath = location.pathname;
    const previousPath = displayLocation.pathname;

    // Navigating to Settings from Profile
    if (currentPath === settingsPath && previousPath === '/profile') {
      return 'animate-slide-in-right';
    }

    // Navigating back from Settings
    if (previousPath === settingsPath && currentPath === '/profile') {
      return 'animate-slide-out-right';
    }

    return '';
  };

  return (
    <div
      className={getAnimationClass()}
      onAnimationEnd={() => {
        if (transitionStage === 'fadeOut') {
          setTransitionStage('fadeIn');
          setDisplayLocation(location);
        }
      }}
    >
      {children}
    </div>
  );
}
