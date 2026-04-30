import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [label, setLabel] = useState('View');
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { stiffness: 200, damping: 28, mass: 0.5 };
  const ringX = useSpring(-100, springConfig);
  const ringY = useSpring(-100, springConfig);

  useEffect(() => {
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
  }, [isVisible, ringX, ringY]);

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
