import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Wraps each child (or each line if splitLines=true) in a mask-reveal animation.
 * Text slides up from below the overflow:hidden container.
 */
export default function TextReveal({ children, delay = 0, duration = 0.9, className = '', once = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-5% 0px' });

  return (
    <span className={`text-mask-wrap ${className}`} ref={ref}>
      <motion.span
        style={{ display: 'block' }}
        initial={{ y: '105%', opacity: 0 }}
        animate={isInView ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0 }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
