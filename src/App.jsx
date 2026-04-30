import { useEffect } from 'react';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';
import About from './components/About';
import Expertise from './components/Expertise';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div
      style={{
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      {/* Page load overlay */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--color-text)',
          zIndex: 9000,
          transformOrigin: 'top',
          pointerEvents: 'none',
        }}
      />

      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <Works />
        <About />
        <Expertise />
        <Footer />
      </main>
    </div>
  );
}
