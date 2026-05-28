import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageLoader — Life is Strange inspired intro.
 *
 * Visual language:
 *   - Warm dark sepia background (#1A1208) — feels like aged photo paper, not empty void
 *   - Polaroid frame drops in with a gentle spring + subtle rotation
 *   - Hero photo inside, color-graded to warm sepia tones
 *   - Name caption below the photo, styled like a polaroid handwritten label
 *   - Animated film grain overlay throughout
 *   - Smooth scaleY wipe UP to reveal site
 *
 * Bug fix:
 *   - pointer-events: none immediately on wipe phase (prevents flash-back on scroll)
 *   - body overflow: hidden during intro, restored on complete
 *   - will-change: transform + backface-visibility: hidden to avoid GPU repaint flicker
 */
export default function PageLoader({ onComplete }) {
  const [phase, setPhase] = useState('intro'); // 'intro' | 'wipe' | 'done'
  const timerRef = useRef(null);

  useEffect(() => {
    // Lock scroll during intro
    document.body.style.overflow = 'hidden';

    // After polaroid sequence (~2.2s), start wipe
    timerRef.current = setTimeout(() => {
      setPhase('wipe');
      setTimeout(() => {
        setPhase('done');
        document.body.style.overflow = '';
        onComplete?.();
      }, 1000);
    }, 2200);

    return () => {
      clearTimeout(timerRef.current);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="page-loader"
        animate={phase === 'wipe' ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          transformOrigin: 'top',
          pointerEvents: phase === 'wipe' ? 'none' : 'auto',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          overflow: 'hidden',
        }}
      >
        {/* ── Warm sepia background ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(145deg, #1E1108 0%, #140D06 50%, #1A1208 100%)',
        }} />

        {/* ── Animated film grain overlay ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.08'/%3E%3C/svg%3E")`,
          opacity: 0.65,
          animation: 'loader-grain 0.08s steps(1) infinite',
          pointerEvents: 'none',
          zIndex: 2,
        }} />

        {/* ── Vignette edges ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
          zIndex: 3,
        }} />

        {/* ── Polaroid ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 4,
        }}>
          <motion.div
            initial={{ y: -60, rotate: -3, opacity: 0 }}
            animate={{ y: 0, rotate: -1.5, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: '#F5F0E8',
              padding: '14px 14px 52px 14px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35)',
              width: 'clamp(200px, 28vw, 340px)',
              position: 'relative',
            }}
          >
            {/* Photo inside polaroid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              style={{
                width: '100%',
                aspectRatio: '3/4',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src="./1778186434749~3.png"
                alt="Eduardo Henrique"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  filter: 'sepia(0.5) saturate(0.8) brightness(0.9) contrast(1.05)',
                }}
              />
              {/* Warm light leak effect */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom right, rgba(255,200,100,0.10) 0%, transparent 60%)',
                mixBlendMode: 'screen',
              }} />
            </motion.div>

            {/* Polaroid caption area */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '52px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
            }}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.05 }}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(11px, 1.5vw, 14px)',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  color: '#3D2B1A',
                  lineHeight: 1,
                }}
              >
                Eduardo Henrique
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.35 }}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(7px, 0.8vw, 9px)',
                  fontWeight: 400,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#8A6A4A',
                  lineHeight: 1,
                }}
              >
                Creative Developer · 2026
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* ── Corner label — bottom left ── */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          style={{
            position: 'absolute',
            bottom: 'clamp(24px, 4vw, 40px)',
            left: 'clamp(24px, 4vw, 48px)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '9px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(240,220,180,0.25)',
            zIndex: 5,
          }}
        >
          Portfolio 2026
        </motion.span>

        {/* ── Bottom line ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            bottom: 'clamp(24px, 4vw, 40px)',
            left: 'clamp(24px, 4vw, 48px)',
            right: 'clamp(24px, 4vw, 48px)',
            height: '1px',
            background: 'rgba(240,220,180,0.08)',
            transformOrigin: 'left',
            zIndex: 5,
          }}
        />

        {/* ── Keyframes ── */}
        <style>{`
          @keyframes loader-grain {
            0%   { transform: translate(0, 0); }
            25%  { transform: translate(-2px, 1px); }
            50%  { transform: translate(1px, -2px); }
            75%  { transform: translate(2px, 2px); }
            100% { transform: translate(-1px, -1px); }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
