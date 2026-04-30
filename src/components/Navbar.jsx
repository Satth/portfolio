import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        padding: '28px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        background: scrolled ? 'rgba(244, 244, 240, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      {/* Logo / Name */}
      <a
        href="#"
        data-cursor="Home"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-text)',
          textDecoration: 'none',
        }}
      >
        Eduardo Henrique
      </a>

      {/* Nav Links */}
      <nav style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            data-cursor="Go"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-text)',
              textDecoration: 'none',
              position: 'relative',
              paddingBottom: '2px',
            }}
            className="nav-link"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--color-text);
          transition: width 0.4s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .nav-link:hover::after { width: 100%; }
      `}</style>
    </motion.header>
  );
}
