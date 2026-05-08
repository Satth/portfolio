import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import { ExternalLink } from 'lucide-react';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function Footer() {
  const year = new Date().getFullYear();
  const { isMobile, isTablet, isTouch } = useBreakpoint();
  const sectionPx = isMobile ? '20px' : isTablet ? '32px' : '48px';
  const paddingTop = isMobile ? '80px' : isTablet ? '100px' : '120px';
  const paddingBottom = isMobile ? '48px' : '56px';

  return (
    <footer
      id="contact"
      style={{
        padding: `${paddingTop} ${sectionPx} ${paddingBottom}`,
        borderTop: '1px solid var(--color-border)',
        position: 'relative',
        overflow: 'hidden',
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
        marginBottom: isMobile ? '40px' : '64px',
      }}>
        07 / Contact
      </span>

      {/* Large CTA heading */}
      <div style={{ marginBottom: isMobile ? '48px' : '80px' }}>
        <TextReveal duration={1.2}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isMobile
              ? 'clamp(48px, 14vw, 80px)'
              : 'clamp(56px, 9vw, 150px)',
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
          }}>
            Let&apos;s Work
          </h2>
        </TextReveal>
        <TextReveal duration={1.2} delay={0.12}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: isMobile
              ? 'clamp(48px, 14vw, 80px)'
              : 'clamp(56px, 9vw, 150px)',
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
          }}>
            Together.
          </h2>
        </TextReveal>
      </div>

      {/* Email CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ marginBottom: isMobile ? '56px' : '100px' }}
      >
        <a
          href="mailto:henriqueeduardo682@hotmail.com"
          data-cursor="Mail"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: isMobile
              ? 'clamp(13px, 4vw, 18px)'
              : 'clamp(14px, 1.8vw, 22px)',
            fontWeight: 300,
            letterSpacing: '0.04em',
            color: 'var(--color-text)',
            textDecoration: 'none',
            display: 'inline-block',
            paddingBottom: '4px',
            borderBottom: '1px solid var(--color-text)',
            transition: 'opacity 0.3s ease',
            cursor: isTouch ? 'pointer' : 'none',
          }}
          onMouseEnter={(e) => !isTouch && (e.currentTarget.style.opacity = '0.5')}
          onMouseLeave={(e) => !isTouch && (e.currentTarget.style.opacity = '1')}
        >
          henriqueeduardo682@hotmail.com
        </a>
      </motion.div>

      {/* SDG Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ marginBottom: isMobile ? '48px' : '72px' }}
      >
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '9px',
          fontWeight: 400,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          display: 'block',
          marginBottom: '16px',
        }}>
          Aligned with the UN Sustainable Development Goals
        </span>
        <div className="sdg-row">
          {[
            { n: '4', label: 'Quality Education', color: '#C5192D', href: 'https://sdgs.un.org/goals/goal4' },
            { n: '8', label: 'Decent Work & Growth', color: '#A21942', href: 'https://sdgs.un.org/goals/goal8' },
            { n: '9', label: 'Industry & Innovation', color: '#FD6925', href: 'https://sdgs.un.org/goals/goal9' },
            { n: '17', label: 'Partnerships for the Goals', color: '#19486A', href: 'https://sdgs.un.org/goals/goal17' },
          ].map((sdg) => (
            <a
              key={sdg.n}
              href={sdg.href}
              target="_blank"
              rel="noopener noreferrer"
              className="sdg-badge"
              aria-label={`SDG ${sdg.n}: ${sdg.label}`}
              style={{ cursor: isTouch ? 'pointer' : 'none' }}
              data-cursor="Go"
            >
              <span className="sdg-circle" style={{ background: sdg.color }}>
                {sdg.n}
              </span>
              <span className="sdg-label">{sdg.label}</span>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          borderTop: '1px solid var(--color-border)',
          paddingTop: '32px',
          flexDirection: isMobile ? 'column' : 'row',
          flexWrap: isMobile ? 'nowrap' : 'wrap',
          gap: isMobile ? '32px' : '24px',
        }}
      >
        {/* Copyright */}
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.1em',
          color: 'var(--color-text-muted)',
        }}>
          © {year} Eduardo Henrique. All rights reserved.
        </span>

        {/* Socials */}
        <div style={{
          display: 'flex',
          gap: isMobile ? '24px' : '40px',
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'GitHub', href: 'https://github.com/Satth' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/eduardo-henrique-a52468254/' },
            { label: 'Twitter / X', href: 'https://x.com' },
            { label: 'Read.cv', href: 'https://read.cv' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Go"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                cursor: isTouch ? 'pointer' : 'none',
              }}
              onMouseEnter={(e) => !isTouch && (e.currentTarget.style.color = 'var(--color-text)')}
              onMouseLeave={(e) => !isTouch && (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Scroll to top */}
        <button
          data-cursor="Top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none',
            border: '1px solid var(--color-border)',
            padding: '10px 20px',
            fontFamily: 'var(--font-sans)',
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-text)',
            cursor: isTouch ? 'pointer' : 'none',
            transition: 'background 0.3s ease, color 0.3s ease',
            borderRadius: '1px',
            alignSelf: isMobile ? 'flex-start' : 'auto',
            // Área de toque mínima de 44px para acessibilidade
            minHeight: '44px',
            minWidth: isMobile ? '140px' : 'auto',
          }}
          onMouseEnter={(e) => {
            if (isTouch) return;
            e.currentTarget.style.background = 'var(--color-text)';
            e.currentTarget.style.color = 'var(--color-bg)';
          }}
          onMouseLeave={(e) => {
            if (isTouch) return;
            e.currentTarget.style.background = 'none';
            e.currentTarget.style.color = 'var(--color-text)';
          }}
        >
          Back to top ↑
        </button>
      </motion.div>
    </footer>
  );
}
