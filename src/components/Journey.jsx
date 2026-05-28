import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { GitBranch, FileText, ExternalLink, Pen, BookOpen, Wrench, Award, Calendar } from 'lucide-react';
import { semesters, journeyMeta } from '../data/journey.js';
import { useBreakpoint } from '../hooks/useBreakpoint.js';

/* ─── Constants ──────────────────────────────────── */
const ACCENT = '#2929cc';

const TYPE_CONFIG = {
  discipline:    { Icon: BookOpen,    label: 'Discipline',    color: '#2929cc' },
  project:       { Icon: Wrench,      label: 'Project',       color: '#C4441C' },
  event:         { Icon: Calendar,    label: 'Event',         color: '#8A6A2A' },
  certification: { Icon: Award,       label: 'Certification', color: '#2A7A4A' },
};

const ATTACH_ICON = {
  github: { Icon: GitBranch,   label: 'GitHub'  },
  pdf:    { Icon: FileText,    label: 'PDF'     },
  link:   { Icon: ExternalLink,label: 'Link'    },
  figma:  { Icon: Pen,         label: 'Figma'   },
};

const STATUS_CONFIG = {
  completed: { label: 'Completed',   fill: ACCENT,              ring: ACCENT,             textColor: '#fff'  },
  active:    { label: 'In Progress', fill: ACCENT,              ring: ACCENT,             textColor: '#fff'  },
  upcoming:  { label: 'Upcoming',    fill: 'transparent',       ring: 'var(--color-border)', textColor: 'var(--color-text-muted)' },
};

/* ─── AttachmentButton ───────────────────────────── */
function AttachmentButton({ type, label, url }) {
  const { Icon } = ATTACH_ICON[type] || ATTACH_ICON.link;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 14px',
        border: '1px solid var(--color-border)',
        borderRadius: '2px',
        fontFamily: 'var(--font-sans)',
        fontSize: '9px',
        fontWeight: 500,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--color-text)',
        textDecoration: 'none',
        transition: 'background 0.25s ease, color 0.25s ease',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--color-text)';
        e.currentTarget.style.color = 'var(--color-bg)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'var(--color-text)';
      }}
    >
      <Icon size={10} strokeWidth={1.5} />
      {label}
    </a>
  );
}

/* ─── ModuleImageGallery ─────────────────────────── */
function ModuleImageGallery({ images, accentColor }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const close = () => setLightboxIndex(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') setLightboxIndex(i => (i + 1) % images.length);
      if (e.key === 'ArrowLeft')  setLightboxIndex(i => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, images.length]);

  return (
    <>
      {/* Thumbnail strip */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {images.map((img, i) => (
          <motion.button
            key={i}
            onClick={() => setLightboxIndex(i)}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            style={{
              padding: 0,
              border: `1px solid ${accentColor}33`,
              borderRadius: '2px',
              overflow: 'hidden',
              cursor: 'pointer',
              background: 'none',
              width: 'clamp(80px, 18%, 140px)',
              aspectRatio: '4/3',
              flexShrink: 0,
              transition: 'border-color 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = accentColor;
              e.currentTarget.querySelector('img').style.transform = 'scale(1.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = `${accentColor}33`;
              e.currentTarget.querySelector('img').style.transform = 'scale(1)';
            }}
          >
            <img
              src={img.src}
              alt={img.caption || `Image ${i + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.4s ease',
              }}
            />
          </motion.button>
        ))}
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9000,
              background: 'rgba(10,10,10,0.93)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                maxWidth: '90vw',
                maxHeight: '85vh',
              }}
            >
              <img
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].caption || `Image ${lightboxIndex + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  borderRadius: '2px',
                  display: 'block',
                }}
              />
              {images[lightboxIndex].caption && (
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                }}>
                  {images[lightboxIndex].caption}
                </span>
              )}
            </motion.div>

            {/* Prev / Next arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i - 1 + images.length) % images.length); }}
                  style={{ position: 'fixed', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '2px', color: '#fff', width: '40px', height: '40px', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >‹</button>
                <button
                  onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i + 1) % images.length); }}
                  style={{ position: 'fixed', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '2px', color: '#fff', width: '40px', height: '40px', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >›</button>
              </>
            )}

            {/* Close button */}
            <button
              onClick={close}
              style={{ position: 'fixed', top: '20px', right: '20px', background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '2px', color: '#fff', width: '36px', height: '36px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >×</button>

            {/* Counter */}
            {images.length > 1 && (
              <span style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                {lightboxIndex + 1} / {images.length}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── ModuleDetail ───────────────────────────────── */
function ModuleDetail({ module }) {
  const cfg = TYPE_CONFIG[module.type] || TYPE_CONFIG.discipline;
  return (
    <motion.div
      key={module.id}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      style={{
        marginTop: '20px',
        padding: '24px 28px',
        border: `1px solid ${cfg.color}33`,
        borderLeft: `3px solid ${cfg.color}`,
        borderRadius: '2px',
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      {/* Type badge */}
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '9px',
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: cfg.color,
      }}>
        [ {cfg.label} ]
      </span>

      {/* Title */}
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(16px, 2vw, 22px)',
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
        color: 'var(--color-text)',
      }}>
        {module.name}
      </p>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '13px',
        fontWeight: 300,
        lineHeight: 1.8,
        color: 'var(--color-text-muted)',
      }}>
        {module.description}
      </p>

      {/* Images gallery */}
      {module.images?.length > 0 && (
        <ModuleImageGallery images={module.images} accentColor={cfg.color} />
      )}

      {/* Personal note */}
      {module.note && (
        <div style={{
          borderLeft: `2px solid ${ACCENT}`,
          paddingLeft: '16px',
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '13px',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'var(--color-text)',
            opacity: 0.85,
          }}>
            "{module.note}"
          </p>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            display: 'block',
            marginTop: '8px',
          }}>
            — Personal note
          </span>
        </div>
      )}

      {/* Attachments */}
      {module.attachments?.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {module.attachments.map(att => (
            <AttachmentButton key={att.label} {...att} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─── DisciplineChip ─────────────────────────────── */
function DisciplineChip({ module, isSelected, onClick, index }) {
  const cfg = TYPE_CONFIG[module.type] || TYPE_CONFIG.discipline;
  const { Icon } = cfg;

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        padding: '18px 16px',
        border: isSelected ? `1px solid ${cfg.color}` : '1px solid var(--color-border)',
        borderRadius: '4px',
        background: isSelected ? `${cfg.color}0D` : 'var(--color-bg)',
        cursor: 'pointer',
        transition: 'border-color 0.25s ease, background 0.25s ease, transform 0.25s ease',
        transform: isSelected ? 'scale(1.04)' : 'scale(1)',
        minWidth: '100px',
        flex: '1 1 100px',
        maxWidth: '160px',
        textAlign: 'center',
      }}
      onMouseEnter={e => {
        if (!isSelected) e.currentTarget.style.borderColor = `${cfg.color}66`;
      }}
      onMouseLeave={e => {
        if (!isSelected) e.currentTarget.style.borderColor = 'var(--color-border)';
      }}
    >
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: isSelected ? cfg.color : `${cfg.color}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.25s ease',
      }}>
        <Icon
          size={16}
          strokeWidth={1.5}
          color={isSelected ? '#fff' : cfg.color}
        />
      </div>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '9px',
        fontWeight: 500,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: isSelected ? cfg.color : 'var(--color-text-muted)',
        lineHeight: 1.3,
        transition: 'color 0.25s ease',
      }}>
        {module.name.length > 22 ? module.name.slice(0, 20) + '…' : module.name}
      </span>
    </motion.button>
  );
}

/* ─── SemesterPanel ──────────────────────────────── */
function SemesterPanel({ semester }) {
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const selectedModule = semester.modules.find(m => m.id === selectedModuleId);

  const handleChipClick = (moduleId) => {
    setSelectedModuleId(prev => prev === moduleId ? null : moduleId);
  };

  return (
    <motion.div
      key={semester.id + '-panel'}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ overflow: 'hidden' }}
    >
      <div style={{
        padding: '32px 0 40px',
        borderTop: '1px solid var(--color-border)',
      }}>
        {/* Overview */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          fontWeight: 300,
          lineHeight: 1.9,
          color: 'var(--color-text-muted)',
          maxWidth: '640px',
          marginBottom: '28px',
        }}>
          {semester.overview}
        </p>

        {/* Discipline chips */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          {semester.modules.map((module, i) => (
            <DisciplineChip
              key={module.id}
              module={module}
              index={i}
              isSelected={selectedModuleId === module.id}
              onClick={() => handleChipClick(module.id)}
            />
          ))}
        </div>

        {/* Module detail */}
        <AnimatePresence mode="wait">
          {selectedModule && (
            <ModuleDetail key={selectedModule.id} module={selectedModule} />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── TrailNode ──────────────────────────────────── */
function TrailNode({ semester, isSelected, onClick, index, isLast, isMobile }) {
  const cfg = STATUS_CONFIG[semester.status];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' });
  const isDisabled = semester.status === 'upcoming';

  if (isMobile) {
    // Vertical timeline node
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -16 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}
      >
        {/* Left column: dot + vertical line */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
          <button
            onClick={!isDisabled ? onClick : undefined}
            disabled={isDisabled}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: `2px solid ${isSelected ? ACCENT : cfg.ring}`,
              background: isSelected ? ACCENT : cfg.fill,
              cursor: isDisabled ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'border-color 0.3s ease, background 0.3s ease',
              position: 'relative',
            }}
          >
            {semester.status === 'active' && (
              <span style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '50%',
                border: `2px solid ${ACCENT}`,
                animation: 'trail-pulse 2s ease-out infinite',
                opacity: 0.5,
              }} />
            )}
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              fontWeight: 600,
              color: isSelected ? '#fff' : (isDisabled ? 'var(--color-text-muted)' : '#fff'),
            }}>
              {semester.number}
            </span>
          </button>
          {!isLast && (
            <div style={{ width: '2px', flex: 1, minHeight: '40px', background: 'var(--color-border)', marginTop: '4px' }} />
          )}
        </div>

        {/* Right: content */}
        <div style={{ paddingBottom: isLast ? 0 : '32px', flex: 1 }}>
          <button
            onClick={!isDisabled ? onClick : undefined}
            disabled={isDisabled}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: isDisabled ? 'default' : 'pointer',
              textAlign: 'left',
              width: '100%',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(18px, 4vw, 24px)',
              fontWeight: 300,
              color: isSelected ? ACCENT : 'var(--color-text)',
              opacity: isDisabled ? 0.45 : 1,
              marginBottom: '4px',
              transition: 'color 0.3s ease',
            }}>
              {semester.label}
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}>
              {semester.period} · {semester.modules.length} items
            </p>
          </button>

          <AnimatePresence>
            {isSelected && !isDisabled && (
              <SemesterPanel semester={semester} />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  // Desktop: horizontal node
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: isDisabled ? 0.4 : 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        flex: 1,
        cursor: isDisabled ? 'default' : 'pointer',
      }}
      onClick={!isDisabled ? onClick : undefined}
    >
      {/* Node circle */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Active pulse ring */}
        {semester.status === 'active' && (
          <span style={{
            position: 'absolute',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            border: `2px solid ${ACCENT}`,
            animation: 'trail-pulse 2s ease-out infinite',
          }} />
        )}
        <motion.div
          animate={{
            scale: isSelected ? 1.15 : 1,
            boxShadow: isSelected
              ? `0 0 0 4px ${ACCENT}22, 0 8px 24px rgba(41,41,204,0.2)`
              : '0 0 0 0px transparent',
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: `2px solid ${isSelected ? ACCENT : cfg.ring}`,
            background: isSelected ? ACCENT : cfg.fill,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.3s ease, background 0.3s ease',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '10px',
            fontWeight: 600,
            color: (isSelected || semester.status === 'completed') ? '#fff' : 'var(--color-text-muted)',
            transition: 'color 0.3s ease',
          }}>
            {semester.number}
          </span>
        </motion.div>
      </div>

      {/* Label */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(13px, 1.4vw, 16px)',
          fontWeight: 300,
          color: isSelected ? ACCENT : 'var(--color-text)',
          marginBottom: '4px',
          transition: 'color 0.3s ease',
          lineHeight: 1.2,
        }}>
          {semester.label}
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '9px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
        }}>
          {semester.period}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────── */
export default function Journey() {
  const [openId, setOpenId] = useState('s3');
  const headingRef = useRef(null);
  const trailRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-10% 0px' });
  const isTrailInView = useInView(trailRef, { once: true, margin: '-5% 0px' });
  const { isMobile } = useBreakpoint();

  const now = new Date();
  const totalDays = journeyMeta.endDate - journeyMeta.startDate;
  const elapsed = Math.min(Math.max(now - journeyMeta.startDate, 0), totalDays);
  const progress = Math.round((elapsed / totalDays) * 100);

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  return (
    <section
      id="journey"
      style={{
        padding: 'clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Section label */}
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
        05 / The Log
      </span>

      {/* Header */}
      <div ref={headingRef} style={{ marginBottom: '72px' }}>
        <div style={{ overflow: 'hidden' }}>
          <motion.h2
            initial={{ y: '105%' }}
            animate={isHeadingInView ? { y: '0%' } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(52px, 8vw, 130px)',
              fontWeight: 300,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              color: 'var(--color-text)',
              display: 'block',
            }}
          >
            Academic
          </motion.h2>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <motion.h2
            initial={{ y: '105%' }}
            animate={isHeadingInView ? { y: '0%' } : {}}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(52px, 8vw, 130px)',
              fontWeight: 300,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              color: 'var(--color-text)',
              display: 'block',
            }}
          >
            Journey
          </motion.h2>
        </div>

        {/* Meta + progress */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            marginTop: '48px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '32px',
          }}
        >
          <div>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '6px',
            }}>
              {journeyMeta.course}
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}>
              {journeyMeta.institution} · {journeyMeta.location}
            </p>
          </div>

          <div style={{ minWidth: '200px', flex: '0 0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}>
                Course Progress
              </span>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '13px',
                fontWeight: 300,
                color: ACCENT,
              }}>
                {progress}%
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '1px',
              background: 'var(--color-border)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isHeadingInView ? { scaleX: progress / 100 } : {}}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  left: 0, top: 0,
                  height: '100%',
                  width: '100%',
                  background: ACCENT,
                  transformOrigin: 'left',
                }}
              />
            </div>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginTop: '6px',
            }}>
              {journeyMeta.workload} · {journeyMeta.started} → {journeyMeta.ends}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Knowledge Trail ── */}
      {isMobile ? (
        /* MOBILE: Vertical timeline */
        <div ref={trailRef} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {semesters.map((semester, index) => (
            <TrailNode
              key={semester.id}
              semester={semester}
              index={index}
              isSelected={openId === semester.id}
              onClick={() => toggle(semester.id)}
              isLast={index === semesters.length - 1}
              isMobile={true}
            />
          ))}
        </div>
      ) : (
        /* DESKTOP/TABLET: Horizontal trail */
        <div ref={trailRef}>
          {/* Trail nodes row */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 0,
          }}>
            {/* Connecting track line (behind nodes) */}
            <div style={{
              position: 'absolute',
              top: '22px',
              left: '10%',
              right: '10%',
              height: '2px',
              background: 'var(--color-border)',
              zIndex: 0,
            }}>
              {/* Animated progress fill */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isTrailInView ? { scaleX: progress / 100 } : {}}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: ACCENT,
                  transformOrigin: 'left',
                }}
              />
            </div>

            {semesters.map((semester, index) => (
              <TrailNode
                key={semester.id}
                semester={semester}
                index={index}
                isSelected={openId === semester.id}
                onClick={() => toggle(semester.id)}
                isLast={index === semesters.length - 1}
                isMobile={false}
              />
            ))}
          </div>

          {/* Semester panels — expand below trail */}
          <AnimatePresence mode="wait">
            {openId && (() => {
              const sem = semesters.find(s => s.id === openId);
              if (!sem || sem.status === 'upcoming') return null;
              return <SemesterPanel key={openId} semester={sem} />;
            })()}
          </AnimatePresence>
        </div>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes trail-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(1.8); opacity: 0;   }
          100% { transform: scale(1.8); opacity: 0;   }
        }
      `}</style>
    </section>
  );
}
