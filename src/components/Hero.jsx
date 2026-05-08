import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import TextReveal from './TextReveal';
import Lightbox from './Lightbox';
import VideoModal from './VideoModal';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function Hero() {
  const containerRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showreel, setShowreel] = useState(false);
  const { isMobile, isTablet, isTouch } = useBreakpoint();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  const isColumnLayout = isMobile || isTablet;
  const sectionPx = isMobile ? '20px' : isTablet ? '36px' : '48px';
  const imgHeight = isMobile ? '55svh' : isTablet ? '60svh' : undefined;
  const titleSize = isMobile
    ? 'clamp(72px, 22vw, 120px)'
    : isTablet
      ? 'clamp(80px, 14vw, 140px)'
      : 'clamp(88px, 14vw, 220px)';
  const textPadT = isMobile ? '28px' : isTablet ? '40px' : undefined;
  const textPadB = isMobile ? '48px' : isTablet ? '64px' : undefined;

  /* ── Shared subtitle bar ─────────────────────────────────── */
  const subtitleBar = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        marginTop: isTablet ? '36px' : isMobile ? '28px' : '36px',
        borderTop: '1px solid var(--color-border)',
        paddingTop: isTablet ? '20px' : isMobile ? '16px' : '20px',
        display: 'flex',
        flexDirection: isTablet || !isColumnLayout ? 'row' : 'column',
        justifyContent: 'space-between',
        alignItems: isTablet || !isColumnLayout ? 'center' : 'flex-start',
        gap: isTablet || !isColumnLayout ? '16px' : '6px',
        flexWrap: 'wrap',
        maxWidth: isColumnLayout ? undefined : '680px',
      }}
    >
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: isMobile ? '9px' : '10px',
        fontWeight: 400,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
      }}>
        Bridging the gap between design and solution
      </p>
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: isMobile ? '9px' : '10px',
        fontWeight: 400,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
        flexShrink: 0,
      }}>
        Based in Caruaru, Pernambuco — BR
      </p>
    </motion.div>
  );

  /* ── Showreel button — circular with SVG rotating text ───── */
  const showreelBtn = (
    <motion.button
      className="showreel-btn"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setShowreel(true)}
      data-cursor="Play"
      aria-label="Watch showreel"
      style={{ cursor: isTouch ? 'pointer' : 'none' }}
    >
      {/* Rotating SVG text ring */}
      <svg
        className="spin-text"
        viewBox="0 0 100 100"
        width="110"
        height="110"
        aria-hidden="true"
      >
        <defs>
          <path
            id="showreel-circle"
            d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          />
        </defs>
        <text
          fontSize="8.5"
          fill="var(--color-bg)"
          fontFamily="var(--font-sans)"
          letterSpacing="4.5"
          fontWeight="500"
        >
          <textPath href="#showreel-circle">SHOWREEL · PLAY · WATCH ·</textPath>
        </text>
      </svg>
      {/* Center play icon */}
      <Play
        size={22}
        strokeWidth={1.5}
        className="play-icon"
        fill="var(--color-bg)"
      />
    </motion.button>
  );

  /* ─── Column layout (mobile + tablet) ─────────────────────── */
  if (isColumnLayout) {
    return (
      <>
        <section
          ref={containerRef}
          id="hero"
          style={{
            position: 'relative',
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            padding: '0',
          }}
        >
          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setLightboxOpen(true)}
            style={{
              width: '100%',
              height: imgHeight,
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              cursor: isTouch ? 'pointer' : 'none',
            }}
            className="img-hover-zoom"
          >
            <motion.img
              src="public/1778186434749~3.png"
              alt="Eduardo Henrique"
              style={{
                width: '100%',
                height: '115%',
                objectFit: 'cover',
                objectPosition: 'center top',
                y: imageY,
                scale: imageScale,
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              style={{
                position: 'absolute',
                top: isTablet ? '20px' : '16px',
                right: isTablet ? '24px' : '20px',
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                fontWeight: 400,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(244,244,240,0.7)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                textAlign: 'right',
                pointerEvents: 'none',
              }}
            >
              <span>Portfolio</span>
              <span>2026 — Present</span>
            </motion.div>
          </motion.div>

          {/* Typography block */}
          <motion.div
            style={{
              position: 'relative',
              zIndex: 3,
              y: textY,
              padding: `${textPadT} ${sectionPx} ${textPadB}`,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: titleSize,
                  fontWeight: 300,
                  lineHeight: 0.88,
                  letterSpacing: '-0.03em',
                  color: 'var(--color-text)',
                  display: 'block',
                }}
              >
                Creative
              </motion.h1>
            </div>

            <div style={{ overflow: 'hidden' }}>
              <motion.span
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: titleSize,
                  fontWeight: 300,
                  lineHeight: 0.88,
                  letterSpacing: '-0.03em',
                  color: 'var(--color-text)',
                  display: 'block',
                  textAlign: 'right',
                }}
              >
                Developer
              </motion.span>
            </div>

            {subtitleBar}

            {/* Showreel button below title on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: '32px' }}
            >
              {showreelBtn}
            </motion.div>
          </motion.div>
        </section>

        <Lightbox
          src="public/1778186434749~3.png"
          alt="Eduardo Henrique"
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
        <VideoModal isOpen={showreel} onClose={() => setShowreel(false)} />
      </>
    );
  }

  /* ─── Desktop layout ───────────────────────────────────────── */
  return (
    <>
      <section
        ref={containerRef}
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: `0 ${sectionPx} 80px`,
          overflow: 'hidden',
        }}
      >
        {/* Background label — top right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          style={{
            position: 'absolute',
            top: '120px',
            right: sectionPx,
            fontFamily: 'var(--font-sans)',
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            textAlign: 'right',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <span>Portfolio</span>
          <span>2026 — Present</span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{
            position: 'absolute',
            left: sectionPx,
            bottom: '140px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}>
            Scroll
          </span>
          <div style={{
            width: '1px',
            height: '60px',
            background: 'var(--color-border)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <motion.div
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: 'var(--color-text)' }}
              animate={{ height: ['0%', '100%'] }}
              transition={{ duration: 1.5, delay: 2.2, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* Hero Image — absolute, desktop only */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          data-cursor="View"
          onClick={() => setLightboxOpen(true)}
          style={{
            position: 'absolute',
            top: '50px',
            right: '80px',
            width: 'clamp(280px, 32vw, 520px)',
            height: 'clamp(360px, 55vh, 680px)',
            overflow: 'hidden',
            borderRadius: '2px',
            zIndex: 2,
            cursor: isTouch ? 'pointer' : 'none',
          }}
          className="img-hover-zoom"
        >
          <motion.img
            src="public/1778186434749~3.png"
            alt="Eduardo Henrique"
            style={{
              width: '100%',
              height: '115%',
              objectFit: 'cover',
              objectPosition: 'center',
              y: imageY,
              scale: imageScale,
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 60%, rgba(17,17,17,0.08) 100%)',
          }} />
        </motion.div>

        {/* Showreel button — floats near image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: 'clamp(340px, 52vh, 580px)',
            right: 'clamp(20px, 10vw, 100px)',
            zIndex: 10,
          }}
        >
          {showreelBtn}
        </motion.div>

        {/* Typography */}
        <motion.div style={{ position: 'relative', zIndex: 3, y: textY }}>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(88px, 14vw, 220px)',
                fontWeight: 300,
                lineHeight: 0.88,
                letterSpacing: '-0.03em',
                color: 'var(--color-text)',
                display: 'block',
              }}
            >
              Creative
            </motion.h1>
          </div>

          <div style={{ overflow: 'hidden', display: 'flex', justifyContent: 'flex-end' }}>
            <motion.span
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(88px, 14vw, 220px)',
                fontWeight: 300,
                lineHeight: 0.88,
                letterSpacing: '-0.03em',
                color: 'var(--color-text)',
                display: 'block',
                paddingRight: 'clamp(80px, 12vw, 180px)',
              }}
            >
              Developer
            </motion.span>
          </div>

          {subtitleBar}
        </motion.div>
      </section>

      <Lightbox
        src="public/1778186434749~3.png"
        alt="Eduardo Henrique"
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
      <VideoModal isOpen={showreel} onClose={() => setShowreel(false)} />
    </>
  );
}
