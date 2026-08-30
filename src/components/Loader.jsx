import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const REDUCED = typeof window !== 'undefined' &&
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const QUOTE = 'Man is the creature who does not know what to desire, and he turns to others in order to make up his mind.';
const ATTR = 'RENÉ GIRARD';

export default function Loader({ onDone }) {
  const root = useRef(null);
  const attrRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    let done = false;
    const finish = () => { if (!done) { done = true; onDone && onDone(); } };
    if (REDUCED) { finish(); return; }

    const words = QUOTE.split(' ');
    const tl = gsap.timeline();
    // words drift up from a soft blur — suave, no clatter
    tl.fromTo(wordsRef.current,
      { opacity: 0, filter: 'blur(12px)', yPercent: 60 },
      { opacity: 1, filter: 'blur(0px)', yPercent: 0, duration: 0.9, ease: 'power2.out', stagger: 0.035 }
    );
    tl.fromTo(attrRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.3');
    // brief hold once the line has landed — the words are already readable as
    // they arrive, so this only needs to let the last few settle
    tl.to({}, { duration: words.length * 0.055 });
    // dissolve away (no hard wipe)
    tl.to(root.current, { opacity: 0, duration: 0.8, ease: 'power2.inOut', onComplete: finish });

    const guard = setTimeout(finish, 8000);
    return () => { clearTimeout(guard); tl.kill(); };
  }, [onDone]);

  if (REDUCED) return null;

  const words = QUOTE.split(' ');

  return (
    <div className="loader" ref={root}>
      <div className="loader-inner">
        <blockquote className="quote">
          <span className="q">“</span>
          {words.map((w, i) => (
            <span className="w" key={i} ref={(el) => (wordsRef.current[i] = el)}>{w} </span>
          ))}
        </blockquote>
        <div className="attr" ref={attrRef}>— {ATTR}</div>
      </div>
    </div>
  );
}
