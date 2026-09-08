import { useState, useMemo, useEffect, useRef } from 'react';
import { SKILLS, SKILL_LEVELS } from '../lib/data.js';

const ROWS = [
  { key: 'product', label: 'Product' },
  { key: 'ux',      label: 'UX' },
  { key: 'ui',      label: 'UI' },
  { key: 'ai',      label: 'AI & Agents' },
  { key: 'tooling', label: 'Tooling' },
  { key: 'code',    label: 'Code' },
  { key: 'mind',    label: 'Cognition' },
];

const N = ROWS.length;
/* top of the scale, read off the level table rather than hard-coded, so
   rescoring the sheet only means editing data.js */
const MAX = Math.max(...Object.keys(SKILL_LEVELS).map(Number));
const TIERS = Array.from({ length: MAX }, (_, i) => MAX - i);
const CX = 150, CY = 146, R = 112;

/* polar helper — axis 0 points north, then clockwise */
const pt = (i, k) => {
  const a = -Math.PI / 2 + i * ((Math.PI * 2) / N);
  return [CX + Math.cos(a) * R * k, CY + Math.sin(a) * R * k];
};
const poly = (ks) => ks.map((k, i) => pt(i, k).map((v) => v.toFixed(1)).join(',')).join(' ');

/* counts up whenever `to` changes. rAF is throttled to nothing in a hidden or
   background tab, so a timeout and the cleanup both snap to the final value —
   the number is never left stranded on a stale one. */
function useCountUp(to, ms = 620) {
  const [n, setN] = useState(to);
  const from = useRef(to);

  useEffect(() => {
    const a = from.current;
    from.current = to;
    if (a === to) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(to); return; }

    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / ms);
      setN(Math.round(a + (to - a) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const snap = setTimeout(() => setN(to), ms + 60);

    return () => { cancelAnimationFrame(raf); clearTimeout(snap); setN(to); };
  }, [to, ms]);

  return n;
}

export default function Capabilities() {
  const [sel, setSel] = useState('product');   // which axis is open
  const [hot, setHot] = useState(null);        // skill under the pointer

  const stats = useMemo(() => ROWS.map((r) => {
    const list = SKILLS[r.key];
    const avg = list.reduce((s, e) => s + e[1], 0) / list.length;
    return { ...r, list, avg, k: avg / MAX };
  }), []);

  const spread = useMemo(() => {
    const c = Object.fromEntries(TIERS.map((l) => [l, 0]));
    for (const r of Object.values(SKILLS)) for (const e of r) c[e[1]]++;
    return c;
  }, []);

  const total = useMemo(() => Object.values(SKILLS).reduce((n, r) => n + r.length, 0), []);
  const top = useMemo(
    () => [...stats].sort((a, b) => b.avg - a.avg).slice(0, 3).map((s) => s.label), [stats]);

  const cur = stats.find((s) => s.key === sel);
  const bars = useMemo(() => [...cur.list].sort((a, b) => b[1] - a[1]), [cur]);
  const shown = useCountUp(cur.list.length);

  return (
    <div className="act-col skills">
      <div className="cap" data-par>

        <div className="cap-head">
          <h2>Capabilities</h2>
          <span className="cap-count">
            <b>{total}</b> tracked · <b>{N}</b> disciplines · scored 1&ndash;{MAX}
          </span>
        </div>

        <p className="cap-lead">
          Strongest in <b>{top[0]}</b>, <b>{top[1]}</b> and <b>{top[2]}</b>.
          {' '}<b>{spread[MAX]}</b> of {total} sit at lead level, where I set the standard
          rather than work to someone else's. Every score below is self-assessed against
          shipped work.
        </p>

        <div className="cap-body">

          {/* ── the profile, as a shape ── */}
          <figure className="cap-radar">
            <svg viewBox="0 0 300 292" role="img"
                 aria-label={`Capability profile across ${N} disciplines`}>
              <g className="rad-grid">
                {[0.25, 0.5, 0.75, 1].map((k, i) => (
                  <polygon key={k} points={poly(Array(N).fill(k))} style={{ '--i': i }} />
                ))}
                {ROWS.map((_, i) => {
                  const [x, y] = pt(i, 1);
                  return <line key={i} x1={CX} y1={CY} x2={x} y2={y} style={{ '--i': i }} />;
                })}
              </g>

              <polygon className="rad-shape" points={poly(stats.map((s) => s.k))} />

              {stats.map((s, i) => {
                const [x, y] = pt(i, s.k);
                const [lx, ly] = pt(i, 1.19);
                const on = s.key === sel;
                return (
                  <g key={s.key} className={`rad-axis${on ? ' on' : ''}`} style={{ '--i': i }}
                     onMouseEnter={() => setSel(s.key)} onClick={() => setSel(s.key)}>
                    <circle className="rad-dot" cx={x} cy={y} r={on ? 4.6 : 3} />
                    <circle className="rad-hit" cx={lx} cy={ly} r={26} />
                    <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle">{s.label}</text>
                    <text x={lx} y={ly + 11} textAnchor="middle" dominantBaseline="middle"
                          className="rad-val">{s.avg.toFixed(1)}</text>
                  </g>
                );
              })}
            </svg>
          </figure>

          {/* ── the open discipline, as bars ── */}
          <div className="cap-bars" key={sel}>
            <div className="cap-bars-head">
              <span className="cap-disc">{cur.label}</span>
              <span className="cap-disc-n"><b>{shown}</b> capabilities · avg {cur.avg.toFixed(1)}</span>
            </div>

            <ul>
              {bars.map((e, i) => (
                <li key={e[0]} style={{ '--i': i }}
                    className={hot === e[0] ? 'on' : ''}
                    onMouseEnter={() => setHot(e[0])} onMouseLeave={() => setHot(null)}>
                  <span className="bar-name">{e[0]}</span>
                  <span className="bar-track" aria-hidden="true">
                    <span className={`bar-fill v${e[1]}`} style={{ '--w': `${(e[1] / MAX) * 100}%` }} />
                  </span>
                  <span className="bar-lv">{SKILL_LEVELS[e[1]].name}</span>
                </li>
              ))}
            </ul>

            <p className="cap-note">
              {hot
                ? (cur.list.find((e) => e[0] === hot)?.[2]
                   || SKILL_LEVELS[cur.list.find((e) => e[0] === hot)[1]].gloss)
                : 'Hover an axis to open a discipline. Hover a bar for the reason behind the score.'}
            </p>
          </div>
        </div>

        {/* ── how the 84 fall across the scale ── */}
        <div className="cap-spread" aria-label="Distribution across the scale">
          {TIERS.map((l) => (
            <div key={l} className={`sp sp${l}`} style={{ '--w': `${(spread[l] / total) * 100}%` }}>
              <span className="sp-bar" />
              <span className="sp-lab"><b>{spread[l]}</b>{SKILL_LEVELS[l].name}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
