import { useEffect, useRef, useState } from 'react';
import { asset } from '../lib/asset.js';

/* Background music + UI pop.
   The track begins the moment the phrase clears (`start` flips true).
   Nothing about the file is hardcoded: we decode it once, find where the
   audio actually begins (leading silence varies per master) and start there,
   looping back to that same point so the intro silence is never replayed. */
const SRC = asset('audio/track.mp3');
const CLICK_SRC = asset('audio/click.mp3');
const TARGET_VOLUME = 0.03;
const CLICK_VOLUME = 0.09;
const FADE_MS = 2500;
const SILENCE_THRESHOLD = 0.008; // amplitude below this counts as silence

/* Phones never autoplay anyway, so downloading the track on arrival spends the
   visitor's data on something they did not ask for. On a coarse pointer nothing
   is fetched until the toggle is pressed. */
const COARSE = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(hover: none), (max-width: 760px)').matches : false;

export default function Ambience({ start = false }) {
  const audioRef = useRef(null);
  const offsetRef = useRef(0);
  const mutedRef = useRef(false);
  const startedRef = useRef(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  // load + analyse the file up front so playback can begin instantly on cue
  useEffect(() => {
    const audio = new Audio(SRC);
    audio.loop = false;         // handled manually so we can loop past the silence
    audio.volume = 0;
    audio.preload = COARSE ? 'none' : 'auto';
    audioRef.current = audio;

    let cancelled = false;
    // the silence scan needs the whole file, which is the second download; on a
    // phone it is not worth 1.3 MB to trim a moment of quiet
    if (!COARSE) (async () => {
      try {
        const buf = await (await fetch(SRC)).arrayBuffer();
        const Ctx = window.AudioContext || window.webkitAudioContext;
        const decoded = await new Ctx().decodeAudioData(buf);
        const data = decoded.getChannelData(0);
        let i = 0;
        while (i < data.length && Math.abs(data[i]) < SILENCE_THRESHOLD) i++;
        if (!cancelled && i < data.length) {
          // back off a hair so the first transient isn't clipped
          offsetRef.current = Math.max(0, i / decoded.sampleRate - 0.02);
        }
      } catch { /* offset stays 0 — the track just plays from the top */ }
    })();

    const onEnded = () => { audio.currentTime = offsetRef.current; audio.play().catch(() => {}); };
    audio.addEventListener('ended', onEnded);

    return () => {
      cancelled = true;
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // cue: the phrase has finished
  useEffect(() => {
    if (!start || startedRef.current) return;
    if (COARSE) return;         // on a phone, sound starts only when asked for
    const audio = audioRef.current;
    if (!audio) return;

    let raf, t0 = null;
    const fadeIn = () => {
      const step = (t) => {
        if (t0 === null) t0 = t;
        const k = Math.min(1, (t - t0) / FADE_MS);
        audio.volume = TARGET_VOLUME * k * k;
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const begin = () => {
      if (startedRef.current) return;
      try { audio.currentTime = offsetRef.current; } catch {}
      audio.play()
        .then(() => { startedRef.current = true; setPlaying(true); fadeIn(); })
        .catch(() => {});
    };

    begin(); // if the browser already trusts us, it starts on cue
    const onGesture = () => begin();
    ['pointerdown', 'wheel', 'keydown', 'touchstart'].forEach((e) =>
      window.addEventListener(e, onGesture, { passive: true })
    );
    return () => {
      cancelAnimationFrame(raf);
      ['pointerdown', 'wheel', 'keydown', 'touchstart'].forEach((e) =>
        window.removeEventListener(e, onGesture)
      );
    };
  }, [start]);

  /* UI pop on interactive elements. A small pool so rapid clicks overlap
     instead of cutting each other off. Muting the music mutes these too. */
  useEffect(() => {
    if (COARSE) return;         // three more files a phone does not need
    const pool = Array.from({ length: 3 }, () => {
      const a = new Audio(CLICK_SRC);
      a.volume = CLICK_VOLUME;
      a.preload = 'auto';
      return a;
    });
    let i = 0;
    const onClick = (e) => {
      if (mutedRef.current) return;
      if (!e.target.closest('button, a, [data-hot], .dot, .wt-item')) return;
      const a = pool[i++ % pool.length];
      try { a.currentTime = 0; a.play().catch(() => {}); } catch {}
    };
    document.addEventListener('pointerdown', onClick, true);
    return () => document.removeEventListener('pointerdown', onClick, true);
  }, []);

  // "off" covers both muted and never-started — a browser that blocked autoplay
  // should read as off, not as a lying "on" label
  const off = muted || !playing;

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    /* Key off what the button currently says rather than off `muted`. After a
       blocked autoplay the button reads "off" while `muted` is still false, so
       keying off `muted` would mute an already-silent track and the visitor
       would need two clicks to hear anything. */
    const turnOn = off;
    setMuted(!turnOn);
    mutedRef.current = !turnOn;
    a.muted = !turnOn;
    if (turnOn) {
      // the 2.5s ramp only covers the automatic start; an explicit click should
      // land at full level straight away
      if (a.volume < TARGET_VOLUME) a.volume = TARGET_VOLUME;
      if (a.paused) {
        try { a.currentTime = offsetRef.current; } catch {}
        a.play().then(() => { startedRef.current = true; setPlaying(true); }).catch(() => {});
      }
    }
  };

  return (
    <button
      className={`sound-toggle${off ? ' is-off' : ''}`}
      onClick={toggle}
      aria-pressed={!off}
      aria-label={off ? 'Turn sound on' : 'Turn sound off'}
      title={off ? 'Sound off' : 'Sound on'}
    >
      <span className="st-bars" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="st-label">{off ? 'Sound off' : 'Sound on'}</span>
    </button>
  );
}
