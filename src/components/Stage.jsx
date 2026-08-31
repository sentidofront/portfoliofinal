import { useEffect, useRef } from 'react';
import { ACTS } from '../lib/acts.js';
import { scrollState } from '../lib/scroll.js';
import { PROFILE, SKILLS, CREDENTIALS, PURSUITS, EXPERIENCE } from '../lib/data.js';
import { asset } from '../lib/asset.js';
import Portfolio from './Portfolio.jsx';
import Articles from './Articles.jsx';

const maxI = ACTS.length - 1;
const smooth = (t) => t * t * (3 - 2 * t);

const SKILL_ROWS = [
  { key: 'product', label: 'Product' },
  { key: 'ux', label: 'UX' },
  { key: 'ui', label: 'UI' },
  { key: 'tooling', label: 'Tooling' },
  { key: 'code', label: 'Code' },
  { key: 'mind', label: 'Cognition' },
];

function ActContent({ act }) {
  if (act.kind === 'intro') {
    return (
      <>
        <div className="intro-accent" aria-hidden="true" />
        <div className="act-col intro">
          <h1 className="hero-lockup" data-par>
            <img src={asset('elements/hero-lockup.png')}
                 alt="Guilherme Ribeiro — product design is a problem of longing." />
          </h1>
        </div>
        <div className="scroll-cue" aria-hidden="true"><i /></div>
      </>
    );
  }
  if (act.kind === 'worktable') {
    // all experiences in one elegant table; each row expands its detail on hover
    return (
      <div className="act-col worktable">
        <div className="wt" data-par>
          <div className="wt-row wt-labels">
            <span>Nº</span><span>Period</span><span>Company</span><span>Role</span>
          </div>
          {EXPERIENCE.map((j, i) => (
            <div className="wt-row wt-item" key={j.id} style={{ '--i': i }}>
              <span className="wt-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="wt-period">{j.period}</span>
              <span className="wt-company">{j.company}</span>
              <span className="wt-role">{j.role}</span>
              <div className="wt-detail">
                <p>{j.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (act.kind === 'portfolio') return <Portfolio />;

  if (act.kind === 'articles') return <Articles />;

  if (act.kind === 'skills') {
    return (
      <div className="act-col skills">
        <div className="skill-rows" data-par>
          {SKILL_ROWS.map((r, ri) => (
            <div className="skill-row" key={r.key} style={{ '--c': ri }}>
              <h3>{r.label}</h3>
              <ul>
                {SKILLS[r.key].map((v, vi) => (
                  <li key={v} style={{ '--i': vi }}>{v}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (act.kind === 'dossier') {
    return (
      <div className="act-col dossier">
        <div className="dossier-grid" data-par>
          <section className="doss-col" style={{ '--c': 0 }}>
            <h3><span>Credentials</span><span>01</span></h3>
            <div className="creds">
              {CREDENTIALS.map((c, i) => (
                <div className="cred" key={i} style={{ '--i': i }}>
                  <span className="t">{c.title}</span>
                  <span className="o">{c.org}{c.date ? ` · ${c.date}` : ''}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="doss-col" style={{ '--c': 1 }}>
            <h3><span>Interests</span><span>02</span></h3>
            <div className="pursuits">
              {PURSUITS.map((p, i) => (
                <div className="pursuit" key={i} style={{ '--i': i }}>
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // contact
  const L = PROFILE.links;
  return (
    <div className="act-col contact">
      <h3 className="ct-head" data-par>
        <span>Contact</span><span>07</span>
      </h3>

      <h2 className="ct-title" data-par>
        <span>LET’S</span>
        <span className="stroke">BUILD.</span>
      </h2>

      <a className="ct-mail" href={`mailto:${PROFILE.email}`} data-par>
        {PROFILE.email}<span className="arrow" aria-hidden="true">↗</span>
      </a>

      <div className="ct-links" data-par>
        <a href={L.figma.url} target="_blank" rel="noreferrer">
          <span className="k">Figma</span><span className="v">{L.figma.handle}</span>
        </a>
        <a href={L.github.url} target="_blank" rel="noreferrer">
          <span className="k">GitHub</span><span className="v">{L.github.handle}</span>
        </a>
        <a href={L.linkedin.url} target="_blank" rel="noreferrer">
          <span className="k">LinkedIn</span><span className="v">{L.linkedin.handle}</span>
        </a>
        <a href={`tel:${PROFILE.phone.replace(/[^+\d]/g, '')}`}>
          <span className="k">Phone</span><span className="v">{PROFILE.phone}</span>
        </a>
      </div>

      <div className="ct-foot" data-par>
        <span>♪ Old Bird Tape</span>
        <span>© {new Date().getFullYear()} Guilherme Ribeiro · “Moths” by Jazz Vincent</span>
      </div>
    </div>
  );
}

export default function Stage() {
  const layers = useRef([]);
  const dots = useRef([]);

  useEffect(() => {
    let raf;
    let lastActive = -1;
    const loop = () => {
      const p = scrollState.progress * maxI;
      for (let i = 0; i < layers.current.length; i++) {
        const el = layers.current[i];
        if (!el) continue;
        const d = p - i;
        const ad = Math.abs(d);
        const op = smooth(Math.max(0, 1 - ad));
        el.style.opacity = op;
        el.style.transform = `translate3d(0, ${(-d * 4.5).toFixed(2)}vh, 0)`;
        el.style.filter = ad > 0.02 ? `blur(${Math.min(7, ad * 6).toFixed(2)}px)` : 'none';
        const active = ad < 0.5;
        el.style.pointerEvents = active ? 'auto' : 'none';
        el.setAttribute('aria-hidden', active ? 'false' : 'true');
        // "over" acts rise above the sax canvas (z20) when on screen
        el.style.zIndex = ACTS[i].over ? (active ? 25 : 4) : (active ? 6 : 5);
        // per-child parallax for depth (clamped so inactive acts don't fling off)
        const cd = Math.max(-1.1, Math.min(1.1, d));
        const par = el.querySelectorAll('[data-par]');
        for (let k = 0; k < par.length; k++) {
          par[k].style.transform = `translate3d(${(cd * (10 + k * 6)).toFixed(2)}px, 0, 0)`;
          par[k].style.opacity = String(Math.max(0, 1 - ad * 1.2));
        }
      }
      const ai = Math.round(p);
      if (ai !== lastActive) {
        lastActive = ai;
        dots.current.forEach((dt, i) => dt && dt.classList.toggle('on', i === ai));
        layers.current.forEach((el, i) => el && el.classList.toggle('is-active', i === ai));
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div className="acts">
        {ACTS.map((act, i) => (
          <section
            key={act.id}
            id={act.id}
            ref={(el) => (layers.current[i] = el)}
            className={`act anchor-${act.anchor} kind-${act.kind}${act.over ? ' act-over' : ''}`}
            aria-hidden="true"
          >
            <ActContent act={act} />
          </section>
        ))}
      </div>

      <nav className="dots" aria-label="Acts">
        {ACTS.map((act, i) => (
          <button
            key={act.id}
            ref={(el) => (dots.current[i] = el)}
            className="dot"
            aria-label={act.id}
            onClick={() => window.__goAct && window.__goAct(i)}
          />
        ))}
      </nav>
    </>
  );
}
