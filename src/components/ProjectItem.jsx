import { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectItem({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef(null);
  const springConfig = { stiffness: 180, damping: 24, mass: 0.6 };
  const imgX = useSpring(0, springConfig);
  const imgY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!rowRef.current) return;
    imgX.set(e.clientX);
    imgY.set(e.clientY);
  };

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="line-item"
      style={{ position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Open"
        style={{ textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'none' }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '28px 0',
          gap: '24px',
        }}>
          {/* Index */}
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.1em',
            color: 'var(--color-text-muted)',
            minWidth: '28px',
            flexShrink: 0,
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Project Name */}
          <motion.span
            animate={{ fontStyle: isHovered ? 'italic' : 'normal' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4.5vw, 72px)',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
              flex: 1,
            }}
          >
            {project.name}
          </motion.span>

          {/* Tags */}
          <div style={{
            display: 'flex',
            gap: '8px',
            flexShrink: 0,
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            maxWidth: '280px',
          }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                border: '1px solid var(--color-border)',
                padding: '4px 10px',
                borderRadius: '20px',
                whiteSpace: 'nowrap',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Year + Arrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: 'var(--color-text-muted)',
            }}>
              {project.year}
            </span>
            <motion.div
              animate={{
                rotate: isHovered ? 0 : -45,
                opacity: isHovered ? 1 : 0.3,
              }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            >
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </motion.div>
          </div>
        </div>
      </a>

      {/* Floating Image Preview */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="project-float-img"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              left: imgX,
              top: imgY,
              width: 'clamp(200px, 22vw, 340px)',
              height: 'clamp(140px, 16vw, 240px)',
              transform: 'translate(24px, -50%)',
              pointerEvents: 'none',
              zIndex: 200,
            }}
          >
            <img
              src={project.image}
              alt={project.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
