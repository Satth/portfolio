import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import { expertise } from '../data/projects';

export default function Expertise() {
  return (
    <section
      id="expertise"
      style={{
        padding: '140px 48px',
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
        marginBottom: '80px',
      }}>
        03 / Expertise & Education
      </span>

      {/* Heading */}
      <div style={{ marginBottom: '100px' }}>
        <TextReveal duration={1.1}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(48px, 7vw, 110px)',
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
            fontSize: 'clamp(48px, 7vw, 110px)',
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
          }}>
            Knowledge
          </h2>
        </TextReveal>
      </div>

      {/* Two-column table layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
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
                    gridTemplateColumns: '52px 1fr',
                    gap: '24px',
                    padding: '20px 0',
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
                      fontSize: 'clamp(16px, 1.8vw, 22px)',
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
