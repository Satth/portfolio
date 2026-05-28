/**
 * GrainOverlay — Static film grain texture. Performance-safe.
 *
 * OLD PROBLEM: animated at 0.18s steps(3) infinite with inset: -30%
 * → painting 160% of viewport area ~16 times/second = constant GPU pressure
 *
 * NEW APPROACH:
 * - Static SVG grain (no animation) — the feTurbulence result never changes,
 *   so the browser can cache it as a static texture.
 * - Minimal size, normal inset: 0
 * - No mix-blend-mode (already handled by WatercolorCanvas container)
 * - Slight opacity so it reads as texture without darkening
 * - Desktop only via .grain-layer class
 */
export default function GrainOverlay() {
  return (
    <div
      className="grain-layer"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9990,
        pointerEvents: 'none',
        opacity: 0.048,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        /* No animation — static texture cached by browser */
      }}
    />
  );
}
