/**
 * WatercolorBlob — Soft blurred color orb that creates a watercolor warmth feel.
 * Purely decorative, pointer-events: none, positioned absolutely within a
 * container that has position: relative; overflow: hidden.
 *
 * Props:
 *   color    — CSS color string (default: warm amber)
 *   size     — pixel size (default: 400)
 *   top, left, right, bottom — positioning
 *   opacity  — 0–1 (default: 0.12)
 *   blur     — blur radius in px (default: 80)
 *   animate  — boolean, whether to drift slowly (default: true)
 */
export default function WatercolorBlob({
  color = 'rgba(196, 68, 28, 0.18)',
  size = 400,
  top,
  left,
  right,
  bottom,
  opacity = 0.12,
  blur = 90,
  drift = true,
}) {
  // Hidden on mobile for performance
  const style = {
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: '50%',
    background: color,
    filter: `blur(${blur}px)`,
    opacity,
    pointerEvents: 'none',
    zIndex: 0,
    userSelect: 'none',
    ...(top !== undefined && { top }),
    ...(left !== undefined && { left }),
    ...(right !== undefined && { right }),
    ...(bottom !== undefined && { bottom }),
    ...(drift && { animation: 'blob-drift 14s ease-in-out infinite alternate' }),
  };

  return (
    <>
      <div aria-hidden="true" style={style} />
      {drift && (
        <style>{`
          @keyframes blob-drift {
            0%   { transform: translate(0, 0) scale(1); }
            33%  { transform: translate(18px, -12px) scale(1.04); }
            66%  { transform: translate(-10px, 16px) scale(0.97); }
            100% { transform: translate(12px, 8px) scale(1.02); }
          }
          /* Hide blobs on mobile/tablet for performance */
          @media (max-width: 1024px) {
            .watercolor-blob { display: none !important; }
          }
        `}</style>
      )}
    </>
  );
}
