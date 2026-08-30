/* WCAG 2.x relative luminance and contrast ratio.

   The accessibility table in a case study computes its numbers from the hex
   pairs at render time rather than carrying typed-in ratios. Swap a token and
   the table stays correct — and nothing in it can drift away from the palette
   it claims to describe. */

const srgb = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

export function parseHex(hex) {
  if (typeof hex !== 'string') return null;
  let h = hex.trim().replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}

export function luminance(hex) {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const [r, g, b] = rgb.map(srgb);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast ratio between two hex colours, 1–21, or null if either is invalid. */
export function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  if (la == null || lb == null) return null;
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

/* WCAG thresholds: 4.5 for body text, 3.0 for large text (≥24px, or ≥18.66px
   bold) and for UI component boundaries, 7.0 for AAA body. */
export function grade(ratio, { large = false } = {}) {
  if (ratio == null) return { label: '—', pass: null };
  if (large) {
    if (ratio >= 4.5) return { label: 'AAA', pass: true };
    if (ratio >= 3) return { label: 'AA', pass: true };
    return { label: 'Fail', pass: false };
  }
  if (ratio >= 7) return { label: 'AAA', pass: true };
  if (ratio >= 4.5) return { label: 'AA', pass: true };
  if (ratio >= 3) return { label: 'Large only', pass: false };
  return { label: 'Fail', pass: false };
}
