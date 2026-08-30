import { useEffect, useRef } from 'react';
import { pointerState } from '../lib/scroll.js';

export default function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let raf;

    const root = document.documentElement;
    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
      // publish cursor position for the page-wide hover glow
      root.style.setProperty('--mx', e.clientX + 'px');
      root.style.setProperty('--my', e.clientY + 'px');
      // and as NDC for the WebGL camera orbit parallax
      pointerState.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerState.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onOver = (e) => {
      const hot = e.target.closest('a, button, [data-hot]');
      if (ring.current) ring.current.classList.toggle('is-hot', !!hot);
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      <div className="cursor-glow" />
      <div className="cursor" ref={ring} />
      <div className="cursor-dot" ref={dot} />
    </>
  );
}
