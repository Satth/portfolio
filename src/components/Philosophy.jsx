import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import { philosophySteps } from '../data/projects';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function Philosophy() {
  const { isMobile, isTablet } = useBreakpoint();
  const sectionPx = isMobile ? '20px' : isTablet ? '32px' : '48px';
  const sectionPy = isMobile ? '80px' : isTablet ? '100px' : '140px';

  return (
    <section
      id="philosophy"
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
        04 / Process
      </span>

      {/* Section Heading */}
      <div style={{ marginBottom: isMobile ? '56px' : '100px' }}>
        <TextReveal duration={1.1}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isMobile ? 'clamp(40px, 12vw, 72px)' : 'clamp(48px, 7vw, 110px)',
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
          }}>
            How I
          </h2>
        </TextReveal>
        <TextReveal duration={1.1} delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: isMobile ? 'clamp(40px, 12vw, 72px)' : 'clamp(48px, 7vw, 110px)',
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
          }}>
            Work.
          </h2>
        </TextReveal>
      </div>

      {/* Steps */}
      {philosophySteps.map((step, i) => (
        <motion.div
          key={step.number}
          className="philosophy-step"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Large number */}
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isMobile ? '28px' : '40px',
            fontWeight: 300,
            color: 'var(--color-text-muted)',
            lineHeight: 1,
            display: 'block',
          }}>
            {step.number}
          </span>

          {/* Title + subtitle */}
          <div>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: isMobile ? 'clamp(28px, 7vw, 48px)' : 'clamp(32px, 4vw, 64px)',
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
              marginBottom: '12px',
            }}>
              {step.title}
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}>
              {step.subtitle}
            </p>
          </div>

          {/* Description */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: isMobile ? '13px' : '14px',
            fontWeight: 300,
            lineHeight: 1.85,
            color: 'var(--color-text-muted)',
            paddingTop: isMobile ? '0' : '8px',
          }}>
            {step.description}
          </p>
        </motion.div>
      ))}
    </section>
  );
}
