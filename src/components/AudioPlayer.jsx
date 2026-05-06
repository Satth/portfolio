import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, ChevronUp } from 'lucide-react';

const TRACK_TITLE = 'Ambient Study Mix';
const AUDIO_SRC   = 'src/assets/audio.mp3';

function fmt(s) {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying]     = useState(false);
  const [progress, setProgress]   = useState(0);
  const [duration, setDuration]   = useState(0);
  const [current, setCurrent]     = useState(0);
  const [expanded, setExpanded]   = useState(true);
  const [hasFile, setHasFile]     = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrent(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onLoaded = () => setDuration(audio.duration);
    const onEnded  = () => setPlaying(false);
    const onError  = () => setHasFile(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio || !hasFile) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setHasFile(false));
    }
  };

  const seek = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio || !hasFile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  if (!hasFile) return null; // Hide player if no file

  return (
    <motion.div
      className="audio-player"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Audio player"
    >
      <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />

      {/* Header row — click to collapse/expand on mobile */}
      <div
        className="audio-header"
        onClick={() => setExpanded((v) => !v)}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onKeyDown={(e) => e.key === 'Enter' && setExpanded((v) => !v)}
        style={{ userSelect: 'none' }}
      >
        {/* Play/Pause */}
        <button
          className="audio-play-btn"
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing
            ? <Pause size={11} strokeWidth={2} />
            : <Play  size={11} strokeWidth={2} style={{ marginLeft: '1px' }} />
          }
        </button>

        {/* Track info */}
        <div className="audio-info">
          <p className="audio-title">{TRACK_TITLE}</p>
          <p className="audio-time">{fmt(current)} / {fmt(duration)}</p>
        </div>

        {/* Collapse chevron */}
        <motion.div
          animate={{ rotate: expanded ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          style={{ color: 'var(--color-text-muted)', display: 'flex' }}
        >
          <ChevronUp size={14} strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Progress bar */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="audio-progress-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="audio-progress-track"
              onClick={seek}
              role="slider"
              aria-label="Seek"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="audio-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
