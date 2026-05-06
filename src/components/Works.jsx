import { projects } from '../data/projects';
import ProjectItem from './ProjectItem';
import TextReveal from './TextReveal';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function Works() {
  const { isMobile, isTablet } = useBreakpoint();
  const sectionPx = isMobile ? '20px' : isTablet ? '32px' : '48px';
  const sectionPy = isMobile ? '80px' : isTablet ? '100px' : '140px';

  return (
    <section
      id="work"
      style={{
        padding: `${sectionPy} ${sectionPx}`,
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          marginBottom: isMobile ? '48px' : '80px',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '16px' : '0',
        }}
      >
        <div>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            display: 'block',
            marginBottom: '16px',
          }}>
            01 / Selected Works
          </span>
          <div style={{ overflow: 'hidden' }}>
            <TextReveal duration={1}>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: isMobile
                  ? 'clamp(40px, 14vw, 72px)'
                  : 'clamp(48px, 7vw, 110px)',
                fontWeight: 300,
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                color: 'var(--color-text)',
              }}>
                Projects
              </h2>
            </TextReveal>
          </div>
        </div>

        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '12px',
          fontWeight: 300,
          lineHeight: 1.7,
          color: 'var(--color-text-muted)',
          maxWidth: isMobile ? '100%' : '260px',
          textAlign: isMobile ? 'left' : 'right',
        }}>
          A curated selection of work spanning product design, creative development, and interactive experiences.
        </p>
      </div>

      {/* Project List */}
      <div>
        {projects.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
