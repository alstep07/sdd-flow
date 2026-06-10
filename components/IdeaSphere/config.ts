/* ------------------------------------------------------------------ */
/*  IdeaSphere — tunable constants                                     */
/*  Adjust these to choreograph the scroll-driven animation.           */
/* ------------------------------------------------------------------ */

export const CONFIG = {
  /* ---- particle counts ------------------------------------------- */
  desktop: { shell: 2400, volume: 2000, dust: 12, maxConnections: 2800 },
  mobile:  { shell: 960,  volume: 800,  dust: 6,  maxConnections: 1100 },

  /* ---- sphere geometry ------------------------------------------- */
  sphereRadius: 2.0,

  /* ---- camera ---------------------------------------------------- */
  cameraFov: 60,
  cameraZ0: 6.0,
  cameraZ1: 1.8,            // stop just inside the shell, not deep center

  /* ---- sphere initial offset (right side of viewport) ------------ */
  sphereOffsetX: 2.8,

  /* ---- scroll ---------------------------------------------------- */
  scrollPages: 7,
  /* animation completes at this fraction of total scroll;
     the rest is dwell time on the final magenta screen */
  animEndAt: 0.72,
  lerpFactor: 0.075,

  /* ---- rotation -------------------------------------------------- */
  rotationSpeed: 0.08,

  /* ---- per-particle noise ---------------------------------------- */
  noiseAmplitude: 0.09,

  /* ---- particle size tiers --------------------------------------- */
  /*  ~80% tiny specks, ~15% mid, ~5% accent                         */
  sizeTiny: 0.6,        // 1–2 px at default distance
  sizeMid: 1.3,         // 2–3 px
  sizeAccent: 2.2,      // 3–5 px max
  tierWeights: [0.80, 0.15, 0.05] as [number, number, number],

  /* ---- per-particle opacity range -------------------------------- */
  opacityMin: 0.85,
  opacityMax: 1.0,

  /* ---- twinkle --------------------------------------------------- */
  twinkleAmplitude: 0.18,
  twinkleSpeedMin: 0.3,
  twinkleSpeedMax: 1.2,

  /* ---- hot spark probability ------------------------------------- */
  hotChance: 0.04,

  /* ---- depth fog ------------------------------------------------- */
  fogNear: 2.5,
  fogFar: 9.0,
  fogMinAlpha: 0.3,

  /* ---- bokeh dust (very few, very faint) ------------------------- */
  dustSizeMin: 20,
  dustSizeMax: 45,
  dustOpacityMin: 0.01,
  dustOpacityMax: 0.03,

  /* ---- connections ----------------------------------------------- */
  neighborsK: 5,

  /* ---- condensed form (phase 4) ---------------------------------- */
  condensedRadius: 0.55,
  condensedSubdiv: 2,

  /* ---- mouse parallax -------------------------------------------- */
  parallaxStrength: 0.35,

  /* ---- brand palette (sRGB hex — converted to linear in JS) ------ */
  colors: {
    bg:             '#010001',
    wine:           '#8A1538',
    violetBack:     '#4A1040',   // far-plane violet push
    crimson:        '#E11D5F',
    pink:           '#FF4D8D',
    hot:            '#FFE3EE',   // near-white sparks
    connectionLine: '#FFB8D1',   // pale pink-white threads
  },
} as const;

/* ---- tiny math helpers (no allocations) -------------------------- */

export function clamp(x: number, lo: number, hi: number): number {
  return x < lo ? lo : x > hi ? hi : x;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function smoothstep(x: number, edge0: number, edge1: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}
