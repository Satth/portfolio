import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBreakpoint } from '../hooks/useBreakpoint';

const navLinks = [
  { label: 'Work',    href: '#work'       },
  { label: 'About',   href: '#about'      },
  { label: 'Journey', href: '#journey'    },
  { label: 'Process', href: '#philosophy' },
  { label: 'Contact', href: '#contact'    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();
  const showHamburger = isMobile || isTablet;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Impede scroll do body quando menu está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navPx = isMobile ? '20px' : isTablet ? '32px' : '48px';
  const navPy = isMobile ? '20px' : '28px';

  return (
    <>
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
          padding: `${navPy} ${navPx}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'background 0.5s ease, backdrop-filter 0.4s ease',
          background: (scrolled || menuOpen) ? 'var(--color-nav-bg)' : 'transparent',
          backdropFilter: (scrolled || menuOpen) ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: (scrolled || menuOpen) ? 'blur(12px)' : 'none',
        }}
      >
        {/* Logo / Name */}
        <a
          href="#"
          onClick={closeMenu}
          data-cursor="Home"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-text)',
            textDecoration: 'none',
            zIndex: 510,
            position: 'relative',
          }}
        >
          Eduardo Henrique
        </a>

        {/* Desktop Nav Links */}
        {!showHamburger && (
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
        )}

        {/* Hambúrguer Button */}
        {showHamburger && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              zIndex: 510,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              width: '32px',
              alignItems: 'flex-end',
            }}
          >
            <motion.span
              animate={menuOpen
                ? { rotate: 45, y: 7, width: '100%' }
                : { rotate: 0, y: 0, width: '100%' }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              style={{
                display: 'block',
                height: '1px',
                background: 'var(--color-text)',
                transformOrigin: 'center',
                width: '100%',
              }}
            />
            <motion.span
              animate={menuOpen
                ? { opacity: 0, x: -8 }
                : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'block',
                height: '1px',
                background: 'var(--color-text)',
                width: '70%',
              }}
            />
            <motion.span
              animate={menuOpen
                ? { rotate: -45, y: -7, width: '100%' }
                : { rotate: 0, y: 0, width: '50%' }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              style={{
                display: 'block',
                height: '1px',
                background: 'var(--color-text)',
                transformOrigin: 'center',
                width: '50%',
              }}
            />
          </button>
        )}

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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Label */}
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '32px',
            }}>
              Navigation
            </span>

            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="mobile-menu-link"
                onClick={closeMenu}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                {link.label}
              </motion.a>
            ))}

            {/* Divisor + label location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              style={{
                marginTop: 'auto',
                paddingBottom: '40px',
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                letterSpacing: '0.15em',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
              }}
            >
              Caruaru, Pernambuco — BR
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
