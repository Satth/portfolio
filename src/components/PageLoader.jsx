import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageLoader — inspired by Aristide Benoist's numeric counter reveal.
 * Counts 00 → 100, then wipes off revealing the site.
 */
export default function PageLoader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState('counting'); // 'counting' | 'wipe'
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const DURATION = 1800; // ms for count to go 0→100

  useEffect(() => {
    startRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      // Ease: fast at start, slows near 100
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * 100);
      setCount(value);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(() => {
          setPhase('wipe');
          setTimeout(onComplete, 800);
        }, 200);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === 'counting' && (
        <motion.div
          key="loader"
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'var(--color-text)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: 'clamp(24px, 5vw, 56px)',
            transformOrigin: 'bottom',
          }}
        >
          {/* Counter */}
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(80px, 18vw, 200px)',
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: 'var(--color-bg)',
            fontVariantNumeric: 'tabular-nums',
            userSelect: 'none',
          }}>
            {String(count).padStart(3, '0')}
          </span>

          {/* Label */}
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(244,244,240,0.4)',
            alignSelf: 'flex-end',
            paddingBottom: '12px',
            userSelect: 'none',
          }}>
            Loading
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
