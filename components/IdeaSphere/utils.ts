/* ------------------------------------------------------------------ */
/*  Geometry helpers — called ONCE at init, not per frame.             */
/* ------------------------------------------------------------------ */

import * as THREE from 'three';

/* ---- Fibonacci sphere (shell particles) -------------------------- */

export function fibonacciSphere(count: number, radius: number): Float32Array {
  const out = new Float32Array(count * 3);
  const gr  = (1 + Math.sqrt(5)) / 2;          // golden ratio
  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / gr;
    const phi   = Math.acos(1 - 2 * (i + 0.5) / count);
    out[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
    out[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    out[i * 3 + 2] = radius * Math.cos(phi);
  }
  return out;
}

/* ---- Random volume fill (interior particles) --------------------- */

export function volumeFill(count: number, maxRadius: number): Float32Array {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r     = maxRadius * Math.cbrt(Math.random());   // uniform volume
    const theta = Math.random() * 2 * Math.PI;
    const phi   = Math.acos(2 * Math.random() - 1);
    out[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    out[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    out[i * 3 + 2] = r * Math.cos(phi);
  }
  return out;
}

/* ---- KNN neighbor pairs (sorted by distance, deduplicated) ------- */

export function computeNeighborPairs(
  positions: Float32Array,
  count: number,
  k: number,
  maxPairs: number,
): Array<[number, number]> {
  const seen = new Set<number>();                 // cantor-pair keys
  const all: Array<[number, number, number]> = [];  // [i, j, distSq]

  for (let i = 0; i < count; i++) {
    const ix = positions[i * 3];
    const iy = positions[i * 3 + 1];
    const iz = positions[i * 3 + 2];

    /* maintain a small sorted list of k nearest for this particle */
    const nearest: Array<{ j: number; d: number }> = [];

    for (let j = 0; j < count; j++) {
      if (i === j) continue;
      const dx = positions[j * 3]     - ix;
      const dy = positions[j * 3 + 1] - iy;
      const dz = positions[j * 3 + 2] - iz;
      const dSq = dx * dx + dy * dy + dz * dz;

      if (nearest.length < k) {
        nearest.push({ j, d: dSq });
        if (nearest.length === k) nearest.sort((a, b) => b.d - a.d);
      } else if (dSq < nearest[0].d) {
        nearest[0] = { j, d: dSq };
        nearest.sort((a, b) => b.d - a.d);
      }
    }

    for (const n of nearest) {
      const lo = Math.min(i, n.j);
      const hi = Math.max(i, n.j);
      const key = ((lo + hi) * (lo + hi + 1)) / 2 + hi;   // Cantor pairing
      if (!seen.has(key)) {
        seen.add(key);
        all.push([lo, hi, n.d]);
      }
    }
  }

  all.sort((a, b) => a[2] - b[2]);
  return all.slice(0, maxPairs).map(([i, j]) => [i, j]);
}

/* ---- Icosahedron target positions (phase 4 condensed form) ------- */

export function generateTargetPositions(
  particleCount: number,
  radius: number,
  subdivision: number,
): Float32Array {
  const geo   = new THREE.IcosahedronGeometry(radius, subdivision);
  const verts = geo.getAttribute('position');
  const nv    = verts.count;
  const out   = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const idx = i % nv;
    /* tiny jitter so clusters don't perfectly overlap */
    out[i * 3]     = verts.getX(idx) + (Math.random() - 0.5) * 0.025;
    out[i * 3 + 1] = verts.getY(idx) + (Math.random() - 0.5) * 0.025;
    out[i * 3 + 2] = verts.getZ(idx) + (Math.random() - 0.5) * 0.025;
  }

  geo.dispose();
  return out;
}
