// Shared mutable scroll state. The virtual scroll engine writes here every
// frame; the WebGL scene + HUD read from it. Plain object = zero re-renders.
export const scrollState = {
  progress: 0,   // 0..1 through the whole page
  velocity: 0,   // low-passed signed velocity, progress-units/sec, clamped ±1.2
  raw: 0,        // px offset
};

// Shared pointer in normalized device coords (-1..1), y up.
export const pointerState = { x: 0, y: 0 };
