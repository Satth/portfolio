import { AnimatePresence, motion } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

/**
 * Reusable lightbox overlay.
 * Props:
 *   src      — image URL to display
 *   alt      — alt text
 *   isOpen   — boolean
 *   onClose  — function to close
 */
export default function Lightbox({ src, alt, isOpen, onClose }) {
  const { isMobile, isTouch } = useBreakpoint();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={onClose}
          data-cursor="Close"
          role="dialog"
          aria-modal="true"
          aria-label="Visualização ampliada"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 8000,
            background: 'rgba(17, 17, 17, 0.93)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '16px' : '40px',
            cursor: isTouch ? 'pointer' : 'none',
          }}
        >
          {/* Close hint */}
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            style={{
              position: 'absolute',
              top: isMobile ? '20px' : '32px',
              right: isMobile ? '20px' : '48px',
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(244,244,240,0.45)',
              pointerEvents: 'none',
            }}
          >
            {isTouch ? 'Toque para fechar' : 'Click anywhere to close'}
          </motion.span>

          {/* Expanded image */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.93, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              maxWidth: isMobile ? '95vw' : '82vw',
              maxHeight: isMobile ? '80vh' : '86vh',
              overflow: 'hidden',
              borderRadius: '2px',
              boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
              pointerEvents: 'none',
            }}
          >
            <img
              src={src}
              alt={alt}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                maxHeight: isMobile ? '80vh' : '86vh',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
