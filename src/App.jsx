import { useState } from 'react';
import { useScrollEngine } from './hooks/useScrollEngine.js';
import { ACTS } from './lib/acts.js';
import Background from './components/Background.jsx';
import Boundary from './components/Boundary.jsx';
import Backdrop from './components/Backdrop.jsx';
import Cursor from './components/Cursor.jsx';
import Ambience from './components/Ambience.jsx';
import Loader from './components/Loader.jsx';
import { Hud } from './components/Overlays.jsx';
import Stage from './components/Stage.jsx';

export default function App() {
  const [ready, setReady] = useState(false);
  // virtual scroll engine — no native scrollbar; starts once the loader clears
  useScrollEngine(ACTS.length, ready);

  return (
    <>
      <Backdrop />
      {/* small moths render behind the hero lockup for depth.
          Both canvases are wrapped: if WebGL is unavailable the 3D drops out
          and the rest of the page carries on, rather than the whole tree
          unmounting into a blank screen. */}
      <Boundary><Background layer="back" /></Boundary>
      <Stage />
      <Boundary><Background /></Boundary>
      <div className="grain-noise" />
      <div className="grain" />
      <div className="vignette" />
      <Cursor />
      <Hud />
      <Ambience start={ready} />
      {!ready && <Loader onDone={() => setReady(true)} />}
    </>
  );
}
