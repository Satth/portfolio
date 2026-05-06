import { useState, useEffect } from 'react';

/**
 * useBreakpoint — reative media query hook
 * Returns booleans for current viewport state.
 */
export function useBreakpoint() {
  const getState = () => ({
    isMobile:    window.matchMedia('(max-width: 767px)').matches,
    isTablet:    window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches,
    isDesktop:   window.matchMedia('(min-width: 1024px)').matches,
    isTouch:     window.matchMedia('(hover: none) and (pointer: coarse)').matches,
  });

  const [bp, setBp] = useState(getState);

  useEffect(() => {
    const handler = () => setBp(getState());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return bp;
}
