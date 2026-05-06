/**
 * Marquee — infinite kinetic-type horizontal ticker
 * Inspired by Robin Noguier's motion-as-content philosophy.
 */
export default function Marquee({ items, reverse = false, speed = 38 }) {
  const text = items.join('  ·  ') + '  ·  ';
  // Duplicate to create seamless loop
  const repeated = [text, text, text, text];

  return (
    <div
      className="marquee-wrapper"
      role="marquee"
      aria-label="Running text banner"
      style={{ '--marquee-speed': `${speed}s` }}
    >
      <div className={`marquee-track${reverse ? ' reverse' : ''}`}>
        {repeated.map((chunk, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              whiteSpace: 'nowrap',
              paddingRight: '4ch',
            }}
          >
            {chunk}
          </span>
        ))}
      </div>
    </div>
  );
}
