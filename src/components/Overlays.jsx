import { ACTS } from '../lib/acts.js';

const go = (i) => window.__goAct && window.__goAct(i);
const idxOf = (kind) => ACTS.findIndex((a) => a.kind === kind);

export function Hud() {
  return (
    <header className="hud">
      <nav className="hud-nav">
        <button onClick={() => go(1)}>Work</button>
        <button onClick={() => go(idxOf('portfolio'))}>Portfolio</button>
        <button onClick={() => go(idxOf('articles'))}>Writing</button>
        <button onClick={() => go(idxOf('skills'))}>Capabilities</button>
        <button onClick={() => go(idxOf('dossier'))}>Dossier</button>
        <button onClick={() => go(ACTS.length - 1)}>Contact</button>
      </nav>
    </header>
  );
}

export function StaticOverlays() {
  return (
    <>
      <div className="regmarks"><i /><i /><i /><i /></div>
    </>
  );
}
