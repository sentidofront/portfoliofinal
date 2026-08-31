import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { contrast, grade } from '../lib/contrast.js';
import { asset } from '../lib/asset.js';

/* Full-length case-study reader. Portaled to <body> for the same reason the
   card modal is: an .act carries will-change:opacity,transform and would trap
   any z-index declared inside it. */

/* ── figures ── */

function TokenLayers() {
  const rows = [
    { k: 'Primitive', v: 'red-50 · grey-900 · space-4' },
    { k: 'Semantic', v: 'accent · surface-raised · text-secondary' },
    { k: 'Component', v: 'button-bg · button-radius · field-border' },
  ];
  return (
    <svg viewBox="0 0 640 210" className="cs-svg" role="img"
         aria-label="Three token layers: primitive feeds semantic, semantic feeds component">
      {rows.map((r, i) => {
        const y = 14 + i * 64;
        return (
          <g key={r.k}>
            <rect x="8" y={y} width="624" height="46" rx="3" className="cs-fig-box" />
            <text x="26" y={y + 20} className="cs-fig-k">{r.k.toUpperCase()}</text>
            <text x="26" y={y + 36} className="cs-fig-v">{r.v}</text>
            {i < rows.length - 1 && (
              <path d={`M320,${y + 46} L320,${y + 62}`} className="cs-fig-arrow" markerEnd="url(#cs-arrow)" />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="cs-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" className="cs-fig-head" />
        </marker>
      </defs>
    </svg>
  );
}

function ColourRule() {
  const meanings = ['Under live control', 'Active navigation', 'Needs a decision'];
  return (
    <svg viewBox="0 0 640 180" className="cs-svg" role="img"
         aria-label="Neutral grey surfaces with a single cyan reserved for three meanings">
      <rect x="8" y="12" width="624" height="52" rx="3" className="cs-fig-box" />
      <text x="26" y="34" className="cs-fig-k">SURFACES · NEUTRAL GREY</text>
      <text x="26" y="52" className="cs-fig-v">Structure only. Never emphasis.</text>
      {[0, 1, 2].map((i) => {
        const x = 8 + i * 212;
        return (
          <g key={i}>
            <rect x={x} y="84" width="196" height="82" rx="3" className="cs-fig-box cs-fig-box-accent" />
            <rect x={x + 16} y="102" width="24" height="8" rx="4" className="cs-fig-accent" />
            <text x={x + 16} y="132" className="cs-fig-k">0{i + 1}</text>
            <text x={x + 16} y="150" className="cs-fig-v">{meanings[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

const LINE = [
  ['Quarry', ''], ['Crusher', '2-CR-010'], ['Stacker', '2-ST-020'],
  ['Raw mill', '2-MI-100'], ['Blender', ''], ['Pyro line', ''],
  ['Clinker', ''], ['Cement mill', ''], ['Dispatch', ''],
];

function ProcessLine() {
  return (
    <svg viewBox="0 0 640 132" className="cs-svg" role="img"
         aria-label="Nine process sections in physical order from quarry to dispatch">
      <line x1="8" y1="52" x2="632" y2="52" className="cs-fig-rail" />
      {LINE.map(([name, tag], i) => {
        const x = 20 + i * 69.5;
        const on = i === 3; // the raw mill is the section under control in the reference screen
        return (
          <g key={name}>
            <circle cx={x} cy="52" r={on ? 7 : 4.5} className={on ? 'cs-fig-node cs-fig-node-on' : 'cs-fig-node'} />
            <text x={x} y="30" className="cs-fig-num">{String(i + 1).padStart(2, '0')}</text>
            <text x={x} y="78" className="cs-fig-lbl">{name}</text>
            {tag && <text x={x} y="94" className="cs-fig-tag">{tag}</text>}
          </g>
        );
      })}
    </svg>
  );
}


/* Six places an order can come from, one panel it lands in. The accent marks
   the queue itself, since that is the claim the section is making. */
function OneQueue() {
  const sources = [
    ['iFood', 'delivery'], ['99Food', 'delivery'], ['aiqfome', 'delivery'],
    ['Goomer', 'menu · QR'], ['Wabiz', 'menu · app'], ['Salão', 'in house'],
  ];
  const W = 96, GAP = 8, X0 = 14;
  return (
    <svg viewBox="0 0 640 196" className="cs-svg" role="img"
         aria-label="Five sales channels and the in-house order all arriving in a single queue">
      {sources.map(([name, kind], i) => {
        const x = X0 + i * (W + GAP);
        const cx = x + W / 2;
        return (
          <g key={name}>
            <rect x={x} y="10" width={W} height="42" rx="3" className="cs-fig-box" />
            <text x={cx} y="30" className="cs-fig-lbl">{name}</text>
            <text x={cx} y="44" className="cs-fig-tag">{kind}</text>
            <path d={`M${cx},52 L${cx},76 L320,96 L320,116`} className="cs-fig-arrow" fill="none" />
          </g>
        );
      })}
      <rect x={X0} y="128" width={640 - X0 * 2} height="50" rx="3"
            className="cs-fig-box cs-fig-queue" />
      <rect x={X0} y="128" width="4" height="50" className="cs-fig-accent" />
      <text x="320" y="150" className="cs-fig-lbl">ONE QUEUE</text>
      <text x="320" y="166" className="cs-fig-tag">every order tagged with where it came from</text>
    </svg>
  );
}

const FIGURES = { 'token-layers': TokenLayers, 'colour-rule': ColourRule,
                  'process-line': ProcessLine, 'one-queue': OneQueue };


/* Single-series horizontal bars. Length encodes the value, so nothing is
   carried by colour; `mark` only raises a bar to the page accent to point at
   the row the surrounding text is about. Every bar is directly labelled, which
   is also the relief the accent needs at 2.4:1 against this surface. */
function BarChart({ unit, bars }) {
  const max = Math.max(...bars.map((b) => b.value)) || 1;
  const fmt = (n) => n.toLocaleString('en-GB');
  return (
    <div className="cs-chart">
      <div className="cs-chart-unit">{unit}</div>
      {bars.map((b) => (
        <div className={`cs-bar${b.mark ? ' is-mark' : ''}`} key={b.label}>
          <span className="cs-bar-k">{b.label}</span>
          <span className="cs-bar-track">
            <i style={{ width: `${Math.max(1.5, (b.value / max) * 100)}%` }} />
          </span>
          <span className="cs-bar-v">{fmt(b.value)}</span>
          <span className="cs-bar-note">{b.note}</span>
        </div>
      ))}
    </div>
  );
}

/* ── blocks ── */

function Head({ title, num }) {
  return (
    <h3 className="cs-head"><span>{title}</span><span>{num}</span></h3>
  );
}

function Block({ b }) {
  const head = <Head title={b.title} num={b.num} />;

  if (b.kind === 'text') {
    return <section className="cs-sec">{head}{b.body.map((p, i) => <p className="cs-p" key={i}>{p}</p>)}</section>;
  }

  if (b.kind === 'stats') {
    return (
      <section className="cs-sec">{head}
        <div className="cs-stats">
          {b.items.map((s) => (
            <div className="cs-stat" key={s.k}>
              <span className="cs-stat-k">{s.k}</span>
              <span className="cs-stat-v">{s.v}</span>
              {s.sub && <span className="cs-stat-sub">{s.sub}</span>}
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (b.kind === 'index') {
    return (
      <section className="cs-sec">{head}
        {b.lead && <p className="cs-lead">{b.lead}</p>}
        <div className="cs-index">
          {b.groups.map((g) => (
            <div className="cs-index-col" key={g.label}>
              <h4>{g.label}<i>{String(g.items.length).padStart(2, '0')}</i></h4>
              <ol>{g.items.map((it) => <li key={it}>{it}</li>)}</ol>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (b.kind === 'list') {
    const paired = typeof b.items[0] === 'object';
    return (
      <section className="cs-sec">{head}
        {b.lead && <p className="cs-lead">{b.lead}</p>}
        {paired ? (
          <dl className="cs-dl">
            {b.items.map((it) => (
              <div key={it.k}><dt>{it.k}</dt><dd>{it.v}</dd></div>
            ))}
          </dl>
        ) : (
          <ul className={`cs-ul${b.columns ? ' cs-ul-cols' : ''}`}>
            {b.items.map((it) => <li key={it}>{it}</li>)}
          </ul>
        )}
      </section>
    );
  }

  if (b.kind === 'table') {
    return (
      <section className="cs-sec">{head}
        {b.lead && <p className="cs-lead">{b.lead}</p>}
        <div className="cs-table-wrap">
          <table className="cs-table">
            <thead><tr>{b.cols.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>{r.map((c, j) => (j === 0 ? <th scope="row" key={j}>{c}</th> : <td key={j}>{c}</td>))}</tr>
              ))}
            </tbody>
          </table>
        </div>
        {b.note && <p className="cs-note">{b.note}</p>}
      </section>
    );
  }

  if (b.kind === 'swatches') {
    return (
      <section className="cs-sec">{head}
        {b.lead && <p className="cs-lead">{b.lead}</p>}
        <div className="cs-swatches">
          {b.items.map((s) => (
            <div className="cs-swatch" key={s.name}>
              <span className="cs-chip" style={{ background: s.hex }} aria-hidden="true" />
              <span className="cs-swatch-n">{s.name}</span>
              <span className="cs-swatch-h">{s.hex}</span>
              {s.note && <span className="cs-swatch-note">{s.note}</span>}
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (b.kind === 'contrast') {
    return (
      <section className="cs-sec">{head}
        {b.lead && <p className="cs-lead">{b.lead}</p>}
        <div className="cs-table-wrap">
          <table className="cs-table cs-table-contrast">
            <thead>
              <tr><th>Pair</th><th>Ratio</th><th>Body</th><th>Large</th></tr>
            </thead>
            <tbody>
              {b.pairs.map((p) => {
                const r = contrast(p.fg, p.bg);
                const body = grade(r);
                const large = grade(r, { large: true });
                return (
                  <tr key={p.label}>
                    <th scope="row">
                      <span className="cs-pair" aria-hidden="true">
                        <i style={{ background: p.bg }}><b style={{ background: p.fg }} /></i>
                      </span>
                      {p.label}
                    </th>
                    <td className="cs-num">{r ? `${r.toFixed(2)}:1` : '—'}</td>
                    <td className={body.pass ? 'cs-pass' : 'cs-fail'}>{body.label}</td>
                    <td className={large.pass ? 'cs-pass' : 'cs-fail'}>{large.label}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {b.note && <p className="cs-note">{b.note}</p>}
      </section>
    );
  }

  if (b.kind === 'chart') {
    return (
      <section className="cs-sec">{head}
        {b.lead && <p className="cs-lead">{b.lead}</p>}
        <BarChart unit={b.unit} bars={b.bars} />
        {b.source && <p className="cs-source">Source: {b.source}</p>}
        {b.caption && <p className="cs-note">{b.caption}</p>}
      </section>
    );
  }

  if (b.kind === 'figure') {
    const Fig = FIGURES[b.name];
    return (
      <section className="cs-sec">{head}
        {b.lead && <p className="cs-lead">{b.lead}</p>}
        {Fig && <div className="cs-figure"><Fig /></div>}
        {b.caption && <p className="cs-note">{b.caption}</p>}
      </section>
    );
  }

  if (b.kind === 'quote') {
    return (
      <section className="cs-sec cs-quote-sec">
        <blockquote className="cs-quote">
          <p>{b.text}</p>
          {b.cite && <cite>{b.cite}</cite>}
        </blockquote>
      </section>
    );
  }

  if (b.kind === 'todo') {
    return (
      <section className="cs-sec cs-todo">{head}
        <ul>{b.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
      </section>
    );
  }

  return null;
}

/* ── reader ── */

const REDUCED = typeof window !== 'undefined' && window.matchMedia
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function CaseStudy({ study, onClose }) {
  const closeRef = useRef(null);
  const bodyRef = useRef(null);
  const railRef = useRef(null);
  const [active, setActive] = useState(0);
  const total = study.blocks.length;

  /* Reading position: a rail that fills as you go, and the section you are
     currently in. Written straight to the DOM for the rail so a long scroll
     does not re-render the whole study. */
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    body.scrollTop = 0;
    const secs = Array.from(body.querySelectorAll('.cs-sec'));

    const update = () => {
      const max = body.scrollHeight - body.clientHeight;
      const p = max > 8 ? Math.min(1, body.scrollTop / max) : 0;
      if (railRef.current) railRef.current.style.transform = `scaleX(${p})`;

      const top = body.getBoundingClientRect().top;
      const mark = body.clientHeight * 0.32;
      let i = 0;
      for (let k = 0; k < secs.length; k++) {
        if (secs[k].getBoundingClientRect().top - top <= mark) i = k;
      }
      // the closing CTA sits below the last section, so at the very bottom the
      // mark line still sits on the second-to-last one — snap it
      if (max > 8 && body.scrollTop >= max - 4) i = secs.length - 1;
      setActive(i);
    };

    update();
    body.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      body.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [study]);

  /* Sections rise in as they arrive. The hiding rule is scoped to a class this
     effect adds, so if the observer never runs the study is simply all visible
     rather than blank. */
  useEffect(() => {
    const body = bodyRef.current;
    if (!body || REDUCED || typeof IntersectionObserver === 'undefined') return;
    body.classList.add('cs-reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-in'); }),
      { root: body, rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    body.querySelectorAll('.cs-sec').forEach((el) => io.observe(el));

    /* Last resort: invisible content is a far worse failure than no animation,
       so if nothing has been revealed shortly after mount, drop the hiding
       rule entirely. */
    const bail = setTimeout(() => {
      if (!body.querySelector('.cs-sec.is-in')) body.classList.remove('cs-reveal');
    }, 1500);

    return () => { clearTimeout(bail); io.disconnect(); };
  }, [study]);

  useEffect(() => {
    document.body.classList.add('modal-open');
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  return createPortal(
    <div className="cs" role="dialog" aria-modal="true" aria-label={`${study.title} case study`}>
      <div className="cs-scrim" onClick={onClose} />

      <article className="cs-panel">
        <div className="cs-marks" aria-hidden="true"><i /><i /><i /><i /></div>

        <header className="cs-top">
          <div className="cs-top-text">
            <span className="cs-kicker">{study.kicker}</span>
            <h2 className="cs-title">{study.title}</h2>
            <p className="cs-tagline">{study.tagline}</p>
            {study.link?.url && (
              <a className="cs-cta" href={study.link.url} target="_blank" rel="noreferrer">
                {study.link.label}<span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
          <button className="cs-close" onClick={onClose} ref={closeRef} aria-label="Close case study">✕</button>

          <div className="cs-marker" aria-hidden="true">
            <span className="cs-marker-n">{String(active + 1).padStart(2, '0')}<i>/{String(total).padStart(2, '0')}</i></span>
            <span className="cs-marker-t">{study.blocks[active]?.title}</span>
          </div>
        </header>

        <div className="cs-rail" aria-hidden="true"><i ref={railRef} /></div>

        <div className="cs-body" ref={bodyRef}>
          {study.hero && (
            <figure className="cs-hero">
              {/* eager: the reader only mounts when opened, so the hero is always
                  above the fold and lazy would just delay the first thing seen */}
              <img src={asset(study.hero)} alt={study.heroAlt || ''} decoding="async" />
            </figure>
          )}
          <p className="cs-intro">{study.intro}</p>
          {study.blocks.map((b) => <Block b={b} key={b.num} />)}

          {study.link?.url && (
            <div className="cs-foot">
              <a className="cs-cta" href={study.link.url} target="_blank" rel="noreferrer">
                {study.link.label}<span aria-hidden="true">↗</span>
              </a>
            </div>
          )}
        </div>
      </article>
    </div>,
    document.body
  );
}
