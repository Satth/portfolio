import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Works from './components/Works';
import About from './components/About';
import Philosophy from './components/Philosophy';
import Interests from './components/Interests';
import Expertise from './components/Expertise';
import Journey from './components/Journey';
import Footer from './components/Footer';

import AudioPlayer from './components/AudioPlayer';

import GrainOverlay from './components/GrainOverlay';
import WatercolorCanvas from './components/WatercolorCanvas';
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

// Detect touch/mobile device
const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 1024);

export default function App() {
  const [loaded] = useState(true);
  const [isMobileDevice] = useState(isTouchDevice);

  // On mobile: force light theme and prevent dark mode
  useEffect(() => {
    if (isMobileDevice) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('portfolio-theme');
    }
  }, [isMobileDevice]);

  // Smooth scroll — disabled on mobile for native scroll performance
  useEffect(() => {
    if (isMobileDevice) return; // native scroll on mobile

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
  }, [isMobileDevice]);

  return (
    <>

      {/* Grain texture overlay — desktop only */}
      <GrainOverlay />

      {/* Watercolor blobs — full site, desktop only */}
      <WatercolorCanvas />

      <div
        style={{
          background: 'transparent',   /* blobs show through from fixed layer */
          color: 'var(--color-text)',
          minHeight: '100vh',
          overflowX: 'hidden',
          position: 'relative',
          zIndex: 1,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        {/* Fixed UI — hidden on mobile */}
        {!isMobileDevice && <CustomCursor />}
        <AudioPlayer />

        <Navbar />

        <main>
          <Hero />

          <Marquee items={MARQUEE_ITEMS_A} speed={isMobileDevice ? 25 : 40} />

          <Works />
          <About />

          <Marquee items={MARQUEE_ITEMS_B} speed={isMobileDevice ? 30 : 50} reverse />

          <Philosophy />
          <Interests />
          <Expertise />
          <Journey />
          <Footer />
        </main>
      </div>
    </>
  );
}
