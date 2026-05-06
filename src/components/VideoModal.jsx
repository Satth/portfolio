import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function VideoModal({ isOpen, onClose }) {
  const videoRef = useRef(null);
  const { isMobile } = useBreakpoint();

  // Pause on close, play on open
  useEffect(() => {
    if (!videoRef.current) return;
    if (isOpen) {
      videoRef.current.play().catch(() => { });
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Showreel video"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 8500,
            background: 'rgba(11, 11, 11, 0.96)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '16px' : '48px',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close video"
            style={{
              position: 'absolute',
              top: isMobile ? '20px' : '32px',
              right: isMobile ? '20px' : '40px',
              background: 'none',
              border: '1px solid rgba(240,237,230,0.2)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'rgba(240,237,230,0.7)',
              transition: 'border-color 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(240,237,230,0.7)';
              e.currentTarget.style.color = '#F0EDE6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(240,237,230,0.2)';
              e.currentTarget.style.color = 'rgba(240,237,230,0.7)';
            }}
          >
            <X size={16} strokeWidth={1.5} />
          </button>

          {/* Video container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '960px',
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: '0 60px 160px rgba(0,0,0,0.8)',
              background: '#0B0B0B',
              aspectRatio: '16/9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <video
              ref={videoRef}
              src="src/assets/showreel.mp4"
              controls
              muted
              playsInline
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
              onError={() => { }}
            >
              {/* Fallback for missing file */}
            </video>

            {/* Placeholder shown if video fails to load */}
            <div
              id="video-placeholder"
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                color: 'rgba(240,237,230,0.3)',
                pointerEvents: 'none',
              }}
            >
              <Play size={48} strokeWidth={1} />
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>
                Introduction Video coming soon
              </span>
            </div>
          </motion.div>

          {/* Hint */}
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{
              position: 'absolute',
              bottom: isMobile ? '20px' : '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(240,237,230,0.3)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            Press Esc or click outside to close
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
