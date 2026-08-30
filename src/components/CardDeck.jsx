import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { STUDIES } from '../lib/studies.js';
import CaseStudy from './CaseStudy.jsx';

/* Shared carousel + detail modal, used by both Portfolio and Writing.
   Items are normalised to: { id, title, meta, sub, summary, detail, tags,
   mockup, image?, url? } so the two sections stay visually identical. */

function Mockup({ kind }) {
  return (
    <div className={`mk mk-${kind}`} aria-hidden="true">
      <span className="mk-bar" />
      <span className="mk-body"><i /><i /><i /><i /></span>
    </div>
  );
}

export default function CardDeck({ label, items, className = '' }) {
  const trackRef = useRef(null);
  const [open, setOpen] = useState(null);

  // a piece with a written study opens the long reader; everything else keeps
  // the short modal, so half-documented work still has somewhere to live
  const study = open && open.study ? STUDIES[open.study] : null;

  useEffect(() => {
    if (study) return;                      // the reader owns the class itself
    document.body.classList.toggle('modal-open', !!open);
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, study]);

  useEffect(() => () => document.body.classList.remove('modal-open'), []);

  const nudge = (dir) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.querySelector('.pf-card');
    const step = card ? card.getBoundingClientRect().width + 22 : 320;
    t.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div className={`act-col portfolio ${className}`}>
      <div className="pf-head" data-par>
        <h3><span>{label}</span><span>{String(items.length).padStart(2, '0')}</span></h3>
        <div className="pf-nav">
          <button onClick={() => nudge(-1)} aria-label="Previous">←</button>
          <button onClick={() => nudge(1)} aria-label="Next">→</button>
        </div>
      </div>

      <div className="pf-track" ref={trackRef} data-par>
        {items.map((it, i) => (
          <button
            className="pf-card"
            key={it.id}
            style={{ '--i': i }}
            onClick={() => setOpen(it)}
            aria-label={it.title ? `Open ${it.title}` : 'Open entry'}
          >
            <span className="pf-thumb">
              {it.image ? <img src={it.image} alt="" /> : <Mockup kind={it.mockup} />}
            </span>
            <span className="pf-meta">
              <span className="pf-title">{it.title}</span>
              <span className="pf-client">{it.meta}</span>
            </span>
          </button>
        ))}
      </div>

      {study && <CaseStudy study={study} onClose={() => setOpen(null)} />}

      {/* Portaled to <body>: an .act carries will-change:opacity,transform, which
          makes it a stacking context, so a modal left inside one paints at the
          act's own z-index (5-6) and ends up under the canvas, HUD and grain. */}
      {open && !study && createPortal(
        <div className="pf-modal" role="dialog" aria-modal="true" aria-label={open.title || 'Detail'}>
          <div className="pf-scrim" onClick={() => setOpen(null)} />
          <div className="pf-panel">
            <button className="pf-close" onClick={() => setOpen(null)} aria-label="Close">✕</button>

            <div className="pf-panel-visual">
              {open.image ? <img src={open.image} alt="" /> : <Mockup kind={open.mockup} />}
            </div>

            <div className="pf-panel-body">
              {open.meta && <div className="pf-panel-kicker">{open.meta}</div>}
              {open.title && <h4 className="pf-panel-title">{open.title}</h4>}
              {open.sub && <div className="pf-panel-role">{open.sub}</div>}
              {open.summary && <p className="pf-panel-summary">{open.summary}</p>}
              {open.detail && <p className="pf-panel-detail">{open.detail}</p>}
              {open.tags?.length > 0 && (
                <div className="pf-panel-tags">
                  {open.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              )}
              {open.url && (
                <a className="pf-panel-link" href={open.url} target="_blank" rel="noreferrer">
                  Read <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
