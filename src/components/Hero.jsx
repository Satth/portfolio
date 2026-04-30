import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal from './TextReveal';
import Lightbox from './Lightbox';

export default function Hero() {
  const containerRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <>
      <section
        ref={containerRef}
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 48px 80px',
          overflow: 'hidden',
        }}
      >
        {/* Background label — top right — z-index above image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          style={{
            position: 'absolute',
            top: '120px',
            right: '48px',
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
            zIndex: 10,           // ← above the image (z-index: 2)
            pointerEvents: 'none',
          }}
        >
          <span>Portfolio</span>
          <span>2026 — Present</span>
        </motion.div>

        {/* Scroll indicator — left side vertical — z-index above image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{
            position: 'absolute',
            left: '48px',
            bottom: '140px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            zIndex: 10,           // ← above the image
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
              animate={{ height: ['0%', '100%'], top: ['0%', '0%'] }}
              transition={{ duration: 1.5, delay: 2.2, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* ─── Hero Image — off-center, clickable ─── */}
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
            cursor: 'none',
          }}
          className="img-hover-zoom"
        >
          <motion.img
            src="src\assets\me.jpg"
            alt="Abstract architectural space"
            style={{
              width: '100%',
              height: '115%',
              objectFit: 'cover',
              objectPosition: 'center',
              y: imageY,
              scale: imageScale,
            }}
          />
          {/* Subtle overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 60%, rgba(244,244,240,0.15) 100%)',
          }} />
        </motion.div>

        {/* ─── Typography ─── */}
        <motion.div style={{ position: 'relative', zIndex: 3, y: textY }}>

          {/* Line 1: "Creative" — left aligned */}
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

          {/* Line 2: "Developer" — indented right */}
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

          {/* Subtitle bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: '36px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '20px',
              maxWidth: '680px',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}>
              Bridging the gap between design and solution
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              flexShrink: 0,
            }}>
              Based in Caruaru, Pernambuco — BR
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Lightbox ─── */}
      <Lightbox
        src="src/assets/me.jpg"
        alt="Abstract architectural space"
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
