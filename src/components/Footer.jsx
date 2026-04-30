import { motion } from 'framer-motion';
import TextReveal from './TextReveal';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      style={{
        padding: '120px 48px 56px',
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
        marginBottom: '64px',
      }}>
        04 / Contact
      </span>

      {/* Large CTA heading */}
      <div style={{ marginBottom: '80px' }}>
        <TextReveal duration={1.2}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(56px, 9vw, 150px)',
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
          }}>
            Let's Work
          </h2>
        </TextReveal>
        <TextReveal duration={1.2} delay={0.12}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(56px, 9vw, 150px)',
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
        style={{ marginBottom: '100px' }}
      >
        <a
          href="mailto:hello@alexmercer.dev"
          data-cursor="Mail"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(14px, 1.8vw, 22px)',
            fontWeight: 300,
            letterSpacing: '0.04em',
            color: 'var(--color-text)',
            textDecoration: 'none',
            display: 'inline-block',
            paddingBottom: '4px',
            borderBottom: '1px solid var(--color-text)',
            transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.5'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          hello@eduardo.dev
        </a>
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
          alignItems: 'flex-end',
          borderTop: '1px solid var(--color-border)',
          paddingTop: '32px',
          flexWrap: 'wrap',
          gap: '24px',
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
        <div style={{ display: 'flex', gap: '40px' }}>
          {[
            { label: 'GitHub', href: 'https://github.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com' },
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
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
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
            cursor: 'none',
            transition: 'background 0.3s ease, color 0.3s ease',
            borderRadius: '1px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-text)';
            e.currentTarget.style.color = 'var(--color-bg)';
          }}
          onMouseLeave={(e) => {
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
