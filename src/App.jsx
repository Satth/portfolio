import { useEffect } from 'react';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Works from './components/Works';
import About from './components/About';
import Philosophy from './components/Philosophy';
import Interests from './components/Interests';
import Expertise from './components/Expertise';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import AudioPlayer from './components/AudioPlayer';
import './index.css';

const MARQUEE_ITEMS_A = [
  'Creative Developer',
  'Systems Analysis',
  'Caruaru, PE',
  'UI / UX Design',
  'Art Direction',
  'Porto Digital',
  'Open to Work',
];

const MARQUEE_ITEMS_B = [
  'React & Next.js',
  'Framer Motion',
  'Design Systems',
  'Interactive Experiences',
  'SENAC Certified',
  'i.d.e.i.a.S.',
  'Northeastern Brazil',
];

export default function App() {
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

      {/* Fixed UI elements */}
      <CustomCursor />
      <ThemeToggle />
      <AudioPlayer />

      <Navbar />

      <main>
        <Hero />

        {/* Kinetic marquee — between Hero and Works */}
        <Marquee items={MARQUEE_ITEMS_A} speed={40} />

        <Works />
        <About />

        {/* Reverse marquee — between About and Philosophy */}
        <Marquee items={MARQUEE_ITEMS_B} speed={50} reverse />

        <Philosophy />
        <Interests />
        <Expertise />
        <Footer />
      </main>
    </div>
  );
}
