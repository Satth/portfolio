import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import { expertise } from '../data/projects';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function Expertise() {
  const { isMobile, isTablet } = useBreakpoint();
  const sectionPx = isMobile ? '20px' : isTablet ? '32px' : '48px';
  const sectionPy = isMobile ? '80px' : isTablet ? '100px' : '140px';
  const isSingleCol = isMobile || isTablet;

  return (
    <section
      id="expertise"
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
        06 / Expertise &amp; Education
      </span>

      {/* Heading */}
      <div style={{ marginBottom: isMobile ? '56px' : '100px' }}>
        <TextReveal duration={1.1}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isMobile
              ? 'clamp(40px, 12vw, 72px)'
              : 'clamp(48px, 7vw, 110px)',
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
          }}>
            Craft &amp;
          </h2>
        </TextReveal>
        <TextReveal duration={1.1} delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: isMobile
              ? 'clamp(40px, 12vw, 72px)'
              : 'clamp(48px, 7vw, 110px)',
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
          }}>
            Knowledge
          </h2>
        </TextReveal>
      </div>

      {/* Two-column table layout — 1 col em mobile/tablet */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isSingleCol ? '1fr' : '1fr 1fr',
        gap: isMobile ? '48px' : isTablet ? '40px' : '80px',
        alignItems: 'start',
      }}>
        {expertise.map((group, gi) => (
          <div key={group.category}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              display: 'block',
              marginBottom: '32px',
            }}>
              {group.category}
            </span>

            <div>
              {group.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-5% 0px' }}
                  transition={{ duration: 0.6, delay: i * 0.07 + gi * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="line-item expertise-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '40px 1fr' : '52px 1fr',
                    gap: isMobile ? '16px' : '24px',
                    padding: isMobile ? '16px 0' : '20px 0',
                    alignItems: 'baseline',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '10px',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    color: 'var(--color-text-muted)',
                  }}>
                    {item.year}
                  </span>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: isMobile
                        ? 'clamp(15px, 4vw, 20px)'
                        : 'clamp(16px, 1.8vw, 22px)',
                      fontWeight: 400,
                      lineHeight: 1.3,
                      color: 'var(--color-text)',
                      marginBottom: '4px',
                    }}>
                      {item.name}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '10px',
                      fontWeight: 400,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                    }}>
                      {item.institution}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
