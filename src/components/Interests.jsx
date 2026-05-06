import { motion } from 'framer-motion';
import {
  Music, Camera, BookOpen, Palette, Gamepad2, Building2,
} from 'lucide-react';
import TextReveal from './TextReveal';
import { hobbies, events } from '../data/projects';
import { useBreakpoint } from '../hooks/useBreakpoint';

const iconMap = { Music, Camera, BookOpen, Palette, Gamepad2, Building2 };

export default function Interests() {
  const { isMobile, isTablet } = useBreakpoint();
  const sectionPx = isMobile ? '20px' : isTablet ? '32px' : '48px';
  const sectionPy = isMobile ? '80px' : isTablet ? '100px' : '140px';

  return (
    <section
      id="interests"
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
        05 / Interests & Life
      </span>

      {/* Heading */}
      <div style={{ marginBottom: isMobile ? '56px' : '80px' }}>
        <TextReveal duration={1.1}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isMobile ? 'clamp(40px, 12vw, 72px)' : 'clamp(48px, 7vw, 110px)',
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
          }}>
            Beyond the
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
            Screen.
          </h2>
        </TextReveal>
      </div>

      {/* Hobbies Grid */}
      <div className="interests-grid" style={{ marginBottom: isMobile ? '72px' : '120px' }}>
        {hobbies.map((hobby, i) => {
          const Icon = iconMap[hobby.icon];
          return (
            <motion.div
              key={hobby.title}
              className="interest-tile"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              {Icon && <Icon size={20} strokeWidth={1.5} className="interest-icon" />}
              <p className="interest-title">{hobby.title}</p>
              <p className="interest-desc">{hobby.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Events Timeline */}
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
        display: 'block',
        marginBottom: '32px',
      }}>
        Events & Milestones
      </span>

      {events.map((ev, i) => (
        <motion.div
          key={ev.name}
          className="event-item"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Year */}
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: 'var(--color-text-muted)',
          }}>
            {ev.year}
          </span>

          {/* Name + description */}
          <div>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: isMobile ? 'clamp(16px, 4vw, 22px)' : 'clamp(18px, 2vw, 28px)',
              fontWeight: 400,
              lineHeight: 1.2,
              color: 'var(--color-text)',
              marginBottom: '6px',
            }}>
              {ev.name}
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 300,
              lineHeight: 1.65,
              color: 'var(--color-text-muted)',
            }}>
              {ev.description}
            </p>
          </div>

          {/* Role badge */}
          <span className="event-role" style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '8px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            border: '1px solid var(--color-border)',
            padding: '4px 10px',
            borderRadius: '20px',
            whiteSpace: 'nowrap',
          }}>
            {ev.role}
          </span>
        </motion.div>
      ))}
    </section>
  );
}
