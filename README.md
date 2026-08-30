# CARVALHO — DOSSIER

A state-of-the-art WebGL portfolio for **Guilherme Carvalho** — Product Designer & UX/UI Designer.

Visual language: **industrial graphic-realism** (Marathon-style signal palette, bold
condensed type, halftone, registration marks, scanlines) over a real-time shader field.
The page doesn't "scroll" — it **rolls** on Lenis smooth scroll, and a signal-line
draws itself down the work-history timeline, revealing each role as you go.

## Stack

| Concern | Library |
|---|---|
| Framework | React 18 + Vite |
| WebGL / shaders | three.js · @react-three/fiber · drei · postprocessing |
| Smooth "rolling" scroll | Lenis |
| Scroll-driven animation | GSAP + ScrollTrigger |

## Run

```bash
cd portfolio
npm install      # already done
npm run dev      # dev server (currently configured on :5180)
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Where things live

```
src/
  main.jsx                 entry
  App.jsx                  composition + Lenis init
  lib/data.js              ← ALL your CV content (edit here to update copy)
  lib/scroll.js            shared scroll state piped to the shader
  hooks/useLenis.js        smooth scroll + GSAP/ScrollTrigger sync
  components/
    Background.jsx         full-screen industrial "blueprint" shader
    Hero.jsx               name reveal
    Timeline.jsx           self-drawing work-history line  ← the centerpiece
    Skills.jsx             capability spec sheet + reactive marquee
    About.jsx              credentials + pursuits
    Contact.jsx            transmission / footer
    Loader.jsx  Cursor.jsx  Overlays.jsx
  styles/global.css        the whole design system (palette = :root vars)
```

## Tuning

- **Colors / type** → CSS variables at the top of `src/styles/global.css`.
- **Content** → `src/lib/data.js` (experience, skills, credentials, links).
- **Shader intensity** → uniforms & mix amounts in `src/components/Background.jsx`.
- **Scroll feel** → `duration` / `lerp` in `src/hooks/useLenis.js`.

## Note on the headless preview

Browsers pause `requestAnimationFrame` in hidden/background tabs, which freezes the
loader, hero reveal, shader motion and custom cursor in automated/headless previews.
Open it in a normal visible browser window and everything animates. Reduced-motion
users get an instant, animation-free version.
