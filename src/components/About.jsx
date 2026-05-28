import { useState } from 'react';
import { motion } from 'framer-motion';

import TextReveal from './TextReveal';
import Lightbox from './Lightbox';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function About() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const { isMobile, isTablet, isTouch } = useBreakpoint();
  const sectionPx = isMobile ? '20px' : isTablet ? '32px' : '48px';
  const sectionPy = isMobile ? '80px' : isTablet ? '100px' : '140px';
  const isSingleCol = isMobile || isTablet;

  return (
    <>
      <section
        id="about"
        style={{
          padding: `${sectionPy} ${sectionPx}`,
          borderTop: '1px solid var(--color-border)',
        }}
      >
        {/* Section Label */}
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          display: 'block',
          marginBottom: isMobile ? '48px' : '80px',
        }}>
          02 / About Me
        </span>

        {/* Magazine Spread Layout — 2 cols em desktop, 1 col em tablet/mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isSingleCol ? '1fr' : '1fr 1fr',
          gap: isMobile ? '48px' : isTablet ? '56px' : '80px',
          alignItems: 'start',
        }}>
          {/* Left — Bold Statement */}
          <div>
            <TextReveal duration={1.1} delay={0.05}>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: isMobile
                  ? 'clamp(28px, 8vw, 48px)'
                  : 'clamp(36px, 5.5vw, 84px)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: 'var(--color-text)',
              }}>
                "Design is the silent ambassador of your brand."
              </p>
            </TextReveal>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '1px',
                background: 'var(--color-text)',
                marginTop: '40px',
                transformOrigin: 'left',
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                marginTop: '20px',
              }}
            >
              — Paul Rand, adapted
            </motion.p>

            {/* Portrait image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="View"
              onClick={() => setLightboxSrc('./IMG-20251215-WA0023~2.jpg')}
              style={{
                marginTop: isMobile ? '40px' : '64px',
                overflow: 'hidden',
                borderRadius: '2px',
                aspectRatio: '4/3',
                cursor: isTouch ? 'pointer' : 'none',
                maxWidth: isMobile ? '100%' : undefined,
              }}
              className="img-hover-zoom"
            >
              <img
                src="./IMG-20251215-WA0023~2.jpg"
                alt="Abstract workspace"
                style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
              />
            </motion.div>
          </div>

          {/* Right — Bio columns */}
          <div style={{ paddingTop: isSingleCol ? '0' : '12px' }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: isMobile ? '14px' : '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: 'var(--color-text)',
                marginBottom: '40px',
              }}
            >
              I am a creative developer and art lover, residing in Caruaru, specializing in the intersection between high-quality design and innovative technical solutions. I believe that the best digital experiences reside at the frontier where aesthetic precision meets functional excellence.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: isMobile ? '12px' : '13px',
                fontWeight: 300,
                lineHeight: 1.9,
                color: 'var(--color-text-muted)',
                marginBottom: '48px',
              }}
            >
              I am graduating in systems analysis and development, and I am certified in a full-stack development course at SENAC. I approach each project as a multidisciplinary challenge—creating systems that are both technically specific and visually appealing. My work has already been recognized by the evaluation panel in the presentation of my integrative project at Porto Digital, and it was also highlighted after passing the pre-incubation program of i.d.e.i.a.S.
            </motion.p>

            {/* Key stats */}
            {[
              { label: 'Years of practice', value: '6+' },
              { label: 'Projects delivered', value: '15' },
              { label: 'Awards received', value: '1' },
              { label: 'Open to opportunities', value: 'Yes' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i + 0.4 }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: isMobile ? '14px 0' : '18px 0',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                }}>
                  {stat.label}
                </span>
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: isMobile ? '24px' : '28px',
                  fontWeight: 300,
                  color: 'var(--color-text)',
                }}>
                  {stat.value}
                </span>
              </motion.div>
            ))}


          </div>
        </div>
      </section>

      <Lightbox
        src={lightboxSrc}
        alt="Abstract workspace"
        isOpen={!!lightboxSrc}
        onClose={() => setLightboxSrc(null)}
      />
    </>
  );
}
