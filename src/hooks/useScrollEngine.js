import { useEffect } from 'react';
import { scrollState } from '../lib/scroll.js';

/* Virtual scroll. There is no native scrollbar — wheel, drag and keys move
   a target (0..1); we ease the current toward it every frame and softly snap
   to the nearest act when input stops. Everything else reads scrollState. */
export function useScrollEngine(actCount, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const maxI = Math.max(1, actCount - 1);
    const step = 1 / maxI;
    const clamp = (v) => Math.max(0, Math.min(1, v));

    let target = 0, current = 0, prev = 0, vel = 0, lastInput = -9999, lastT = 0, raf;

    // How far the target may run ahead of where we actually are. Without this a
    // fast flick pins the target a whole page away and the camera has to whip
    // across every act to catch up.
    const LEAD = step * 1.15;

    // a project modal captures input — the acts must not advance behind it
    const blocked = () => document.body.classList.contains('modal-open');

    /* True while the act under the finger still has somewhere to scroll in the
       direction being swiped. `d > 0` means the finger moved up, i.e. the reader
       is heading down the page. */
    const actCanScroll = (el, d) => {
      const act = el && el.closest ? el.closest('.act') : null;
      if (!act) return false;
      const max = act.scrollHeight - act.clientHeight;
      if (max <= 2) return false;
      return d > 0 ? act.scrollTop < max - 1 : act.scrollTop > 1;
    };

    const nudge = (d) => {
      if (blocked()) return;
      target = clamp(target + d);
      target = Math.max(current - LEAD, Math.min(current + LEAD, target));
      lastInput = performance.now();
    };

    // deltaY units differ per device/browser (px, lines, pages) — normalize to px
    // and cap the spikes a single event can carry.
    const onWheel = (e) => {
      // Bail BEFORE preventDefault. An open modal owns the wheel, and cancelling
      // the event here would kill native scrolling inside it.
      if (blocked()) return;
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      const dy = Math.max(-120, Math.min(120, e.deltaY * unit));
      nudge(dy * 0.00028);
    };

    /* Touch has to share the screen. The acts want vertical swipes, but the card
       decks and the mobile nav strip scroll sideways, and this handler used to
       preventDefault on every move and kill them. So the gesture picks an axis
       once and keeps it: sideways belongs to whatever is underneath. */
    let touchX = null, touchY = null, axis = null;
    const onTouchStart = (e) => {
      if (blocked()) { touchY = null; return; }
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
      axis = null;
      lastInput = performance.now();
    };
    const onTouchMove = (e) => {
      if (blocked() || touchY == null) return;   // same reason as the wheel
      const t = e.touches[0];
      if (axis === null) {
        const ax = Math.abs(touchX - t.clientX);
        const ay = Math.abs(touchY - t.clientY);
        if (ax < 6 && ay < 6) return;            // too small to read yet
        axis = ax > ay ? 'x' : 'y';
      }
      if (axis === 'x') return;                  // let the sideways scroller have it

      /* On a phone an act can be taller than the screen. A vertical swipe
         scrolls the act itself first, and only starts moving between acts once
         that act has reached its own end. */
      if (actCanScroll(e.target, touchY - t.clientY)) {
        touchX = t.clientX;
        touchY = t.clientY;
        return;
      }

      const dy = Math.max(-90, Math.min(90, touchY - t.clientY));
      touchX = t.clientX;
      touchY = t.clientY;
      nudge(dy * 0.0014);
      e.preventDefault();
    };
    const onTouchEnd = () => { touchY = null; axis = null; };

    const onKey = (e) => {
      if (blocked()) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { nudge(step); e.preventDefault(); }
      else if (['ArrowUp', 'PageUp'].includes(e.key)) { nudge(-step); e.preventDefault(); }
      else if (e.key === 'Home') { target = 0; lastInput = performance.now(); }
      else if (e.key === 'End') { target = 1; lastInput = performance.now(); }
    };

    // let nav jump to a specific act
    window.__goAct = (i) => { target = clamp(i / maxI); lastInput = performance.now(); };

    /* All easing is `1 - base^dt` so the feel is identical at 60Hz and 144Hz —
       a plain per-frame factor converges 2.4x faster on a 144Hz display. */
    const ease = (base, dt) => 1 - Math.pow(base, dt);

    const loop = (now) => {
      const dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 1 / 60;
      lastT = now;

      // soft snap to nearest act shortly after input stops
      if (performance.now() - lastInput > 520) {
        const snap = Math.round(target * maxI) / maxI;
        target += (snap - target) * ease(0.03, dt);
      }
      current += (target - current) * ease(0.09, dt);
      if (Math.abs(target - current) < 1e-5) current = target;

      // Low-pass the velocity. Consumers (camera roll, azimuth whip, FOV, sax
      // lean) read this every frame, so raw per-frame deltas show up as jitter.
      const inst = Math.max(-1.2, Math.min(1.2, (current - prev) / dt));
      vel += (inst - vel) * ease(0.02, dt);

      scrollState.progress = current;
      scrollState.velocity = vel;
      prev = current;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKey);
      delete window.__goAct;
    };
  }, [actCount, enabled]);
}
