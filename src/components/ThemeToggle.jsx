import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [vivid, setVivid] = useState(false);

  const applyTheme = (toVivid) => {
    const html = document.documentElement;
    html.classList.add('theme-transitioning');
    setVivid(toVivid);
    html.setAttribute('data-theme', toVivid ? 'vivid' : 'default');
    setTimeout(() => html.classList.remove('theme-transitioning'), 700);
  };

  useEffect(() => {
    // Restore saved preference
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'vivid') applyTheme(true);
  }, []);

  const toggle = (toVivid) => {
    localStorage.setItem('portfolio-theme', toVivid ? 'vivid' : 'default');
    applyTheme(toVivid);
  };

  const themes = [
    { id: false, label: '◐ Light' },
    { id: true,  label: '◑ Dark'  },
  ];

  return (
    <motion.div
      className="theme-toggle"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Toggle color theme"
    >
      {themes.map((t) => (
        <button
          key={String(t.id)}
          className={`theme-toggle-btn${vivid === t.id ? ' active' : ''}`}
          onClick={() => toggle(t.id)}
          aria-pressed={vivid === t.id}
        >
          {t.label}
        </button>
      ))}
    </motion.div>
  );
}
