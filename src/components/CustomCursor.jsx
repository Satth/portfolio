import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * CustomCursor — renderizado apenas em dispositivos que suportam
 * hover com mouse (hover: hover AND pointer: fine).
 * Em touch/mobile, o componente não monta nada.
 */
export default function CustomCursor() {
  // Detecta se o dispositivo suporta hover real (mouse)
  const [hasHover] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
      : false
  );

  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [label, setLabel] = useState('View');
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { stiffness: 200, damping: 28, mass: 0.5 };
  const ringX = useSpring(-100, springConfig);
  const ringY = useSpring(-100, springConfig);

  useEffect(() => {
    if (!hasHover) return;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });
      ringX.set(x);
      ringY.set(y);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setIsExpanded(true);
        setLabel(target.dataset.cursor || 'View');
      } else {
        setIsExpanded(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [hasHover, isVisible, ringX, ringY]);

  // Não renderiza nada em dispositivos touch
  if (!hasHover) return null;

  return (
    <>
      {/* Dot — hidden when ring is expanded */}
      <div
        className="cursor-dot"
        style={{
          left: position.x,
          top: position.y,
          opacity: isVisible && !isExpanded ? 1 : 0,
        }}
      />
      {/* Ring */}
      <motion.div
        className={`cursor-ring ${isExpanded ? 'expanded' : ''}`}
        style={{ left: ringX, top: ringY, opacity: isVisible ? 1 : 0 }}
      >
        <span className="cursor-label">{label}</span>
      </motion.div>
    </>
  );
}
