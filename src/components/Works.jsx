import { projects } from '../data/projects';
import ProjectItem from './ProjectItem';
import TextReveal from './TextReveal';

export default function Works() {
  return (
    <section id="work" style={{ padding: '140px 48px' }}>
      {/* Section Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '80px',
      }}>
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
                fontSize: 'clamp(48px, 7vw, 110px)',
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
          maxWidth: '260px',
          textAlign: 'right',
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
