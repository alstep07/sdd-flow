"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CONFIG, smoothstep, lerp } from "./config";
import {
  fibonacciSphere,
  volumeFill,
  computeNeighborPairs,
  generateTargetPositions,
} from "./utils";
import {
  particleVertex,
  particleFragment,
  dustVertex,
  dustFragment,
  connectionVertex,
  connectionFragment,
} from "./shaders";

/* ------------------------------------------------------------------ */
/*  Helper: create a THREE.Color from sRGB hex, converted to linear    */
/*  so the shader math is correct when the renderer gamma-encodes.     */
/* ------------------------------------------------------------------ */
function linearColor(hex: string): THREE.Color {
  return new THREE.Color(hex).convertSRGBToLinear();
}

/* ------------------------------------------------------------------ */

interface Props {
  progressRef: React.RefObject<{ raw: number; smooth: number }>;
  isMobile: boolean;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  isVisibleRef: React.RefObject<boolean>;
}

/* ------------------------------------------------------------------ */

export function SceneContent({
  progressRef,
  isMobile,
  mouseRef,
  isVisibleRef,
}: Props) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const autoRotY = useRef(0);
  const mouseRotY = useRef(0);
  const mouseRotX = useRef(0);

  const tier = isMobile ? CONFIG.mobile : CONFIG.desktop;
  const totalParticles = tier.shell + tier.volume;

  /* ================================================================ */
  /*  One-time data init                                               */
  /* ================================================================ */
  const data = useMemo(() => {
    const shellPos = fibonacciSphere(tier.shell, CONFIG.sphereRadius);
    const volPos = volumeFill(tier.volume, CONFIG.sphereRadius * 0.88);

    const basePositions = new Float32Array(totalParticles * 3);
    basePositions.set(shellPos, 0);
    basePositions.set(volPos, tier.shell * 3);

    const targetPositions = generateTargetPositions(
      totalParticles,
      CONFIG.condensedRadius,
      CONFIG.condensedSubdiv,
    );

    /* --- per-particle attributes ---------------------------------- */
    const sizes = new Float32Array(totalParticles);
    const phases = new Float32Array(totalParticles);
    const radii = new Float32Array(totalParticles);
    const opacities = new Float32Array(totalParticles);
    const colorMixes = new Float32Array(totalParticles);
    const isHot = new Float32Array(totalParticles);
    const twinkleSpeeds = new Float32Array(totalParticles);
    const twinklePhases = new Float32Array(totalParticles);

    const [wTiny, wMid] = CONFIG.tierWeights;

    for (let i = 0; i < totalParticles; i++) {
      const x = basePositions[i * 3];
      const y = basePositions[i * 3 + 1];
      const z = basePositions[i * 3 + 2];
      radii[i] = Math.sqrt(x * x + y * y + z * z);

      /* tiered sizing: 80% tiny specks, 15% mid, 5% accent */
      const roll = Math.random();
      let base: number;
      if (roll < wTiny) {
        base = CONFIG.sizeTiny * (0.8 + Math.random() * 0.4);   // 0.48–0.84
      } else if (roll < wTiny + wMid) {
        base = CONFIG.sizeMid * (0.8 + Math.random() * 0.4);    // 1.04–1.82
      } else {
        base = CONFIG.sizeAccent * (0.8 + Math.random() * 0.4); // 1.76–3.08
      }
      sizes[i] = base;

      phases[i] = Math.random();

      opacities[i] =
        CONFIG.opacityMin +
        Math.random() * (CONFIG.opacityMax - CONFIG.opacityMin);

      colorMixes[i] = Math.random();

      isHot[i] = Math.random() < CONFIG.hotChance ? 1.0 : 0.0;

      twinkleSpeeds[i] =
        CONFIG.twinkleSpeedMin +
        Math.random() * (CONFIG.twinkleSpeedMax - CONFIG.twinkleSpeedMin);
      twinklePhases[i] = Math.random() * Math.PI * 2;
    }

    /* --- connections ---------------------------------------------- */
    const neighborPairs = computeNeighborPairs(
      basePositions,
      totalParticles,
      CONFIG.neighborsK,
      tier.maxConnections,
    );

    const currentPositions = new Float32Array(totalParticles * 3);
    const connectionPositions = new Float32Array(neighborPairs.length * 6);
    const connectionOrders = new Float32Array(neighborPairs.length * 2);

    for (let c = 0; c < neighborPairs.length; c++) {
      const order = c / neighborPairs.length;
      connectionOrders[c * 2] = order;
      connectionOrders[c * 2 + 1] = order;
    }

    /* --- bokeh dust (very few, very faint) ------------------------ */
    const dustCount = tier.dust;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustSizes = new Float32Array(dustCount);
    const dustOpacities = new Float32Array(dustCount);

    for (let i = 0; i < dustCount; i++) {
      const r = CONFIG.sphereRadius * 1.2 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      dustPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dustPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dustPositions[i * 3 + 2] = r * Math.cos(phi);
      dustSizes[i] =
        CONFIG.dustSizeMin +
        Math.random() * (CONFIG.dustSizeMax - CONFIG.dustSizeMin);
      dustOpacities[i] =
        CONFIG.dustOpacityMin +
        Math.random() * (CONFIG.dustOpacityMax - CONFIG.dustOpacityMin);
    }

    return {
      basePositions,
      targetPositions,
      currentPositions,
      sizes,
      phases,
      radii,
      opacities,
      colorMixes,
      isHot,
      twinkleSpeeds,
      twinklePhases,
      neighborPairs,
      connectionPositions,
      connectionOrders,
      dustPositions,
      dustSizes,
      dustOpacities,
      dustCount,
    };
  }, [tier, totalParticles]);

  /* ================================================================ */
  /*  Geometries                                                       */
  /* ================================================================ */
  const pointsGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.currentPositions, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(data.sizes, 1));
    g.setAttribute("aRadius", new THREE.BufferAttribute(data.radii, 1));
    g.setAttribute("aOpacity", new THREE.BufferAttribute(data.opacities, 1));
    g.setAttribute("aColorMix", new THREE.BufferAttribute(data.colorMixes, 1));
    g.setAttribute("aIsHot", new THREE.BufferAttribute(data.isHot, 1));
    g.setAttribute("aTwinkleSpeed", new THREE.BufferAttribute(data.twinkleSpeeds, 1));
    g.setAttribute("aTwinklePhase", new THREE.BufferAttribute(data.twinklePhases, 1));
    return g;
  }, [data]);

  const dustGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.dustPositions, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(data.dustSizes, 1));
    g.setAttribute("aOpacity", new THREE.BufferAttribute(data.dustOpacities, 1));
    return g;
  }, [data]);

  const linesGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.connectionPositions, 3));
    g.setAttribute("aOrder", new THREE.BufferAttribute(data.connectionOrders, 1));
    return g;
  }, [data]);

  /* ================================================================ */
  /*  Materials — all colors converted sRGB → linear                   */
  /* ================================================================ */
  const particleMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: particleVertex,
        fragmentShader: particleFragment,
        uniforms: {
          uPixelRatio: {
            value: Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1),
          },
          uProgress:    { value: 0 },
          uTime:        { value: 0 },
          uFogNear:     { value: CONFIG.fogNear },
          uFogFar:      { value: CONFIG.fogFar },
          uFogMinAlpha: { value: CONFIG.fogMinAlpha },
          uTwinkleAmp:  { value: CONFIG.twinkleAmplitude },
          uColorWine:    { value: linearColor(CONFIG.colors.wine) },
          uColorViolet:  { value: linearColor(CONFIG.colors.violetBack) },
          uColorCrimson: { value: linearColor(CONFIG.colors.crimson) },
          uColorPink:    { value: linearColor(CONFIG.colors.pink) },
          uColorHot:     { value: linearColor(CONFIG.colors.hot) },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    [],
  );

  const dustMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: dustVertex,
        fragmentShader: dustFragment,
        uniforms: {
          uPixelRatio: {
            value: Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1),
          },
          uTime:      { value: 0 },
          uDustColor: { value: linearColor(CONFIG.colors.crimson) },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  const connectionMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: connectionVertex,
        fragmentShader: connectionFragment,
        uniforms: {
          uProgress: { value: 0 },
          uColor:    { value: linearColor(CONFIG.colors.connectionLine) },
          uFogNear:  { value: CONFIG.fogNear },
          uFogFar:   { value: CONFIG.fogFar },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    [],
  );

  /* ---- cleanup --------------------------------------------------- */
  useEffect(() => {
    return () => {
      pointsGeo.dispose();
      dustGeo.dispose();
      linesGeo.dispose();
      particleMat.dispose();
      dustMat.dispose();
      connectionMat.dispose();
    };
  }, [pointsGeo, dustGeo, linesGeo, particleMat, dustMat, connectionMat]);

  /* ================================================================ */
  /*  Per-frame update                                                 */
  /* ================================================================ */
  useFrame((_, delta) => {
    if (!isVisibleRef.current) return;

    /* remap: animation fills 0→1 within the first animEndAt of scroll,
       the rest is dwell on the final state */
    const rawP = progressRef.current.smooth;
    const p = Math.min(rawP / CONFIG.animEndAt, 1.0);
    timeRef.current += delta;
    const t = timeRef.current;

    /* --- camera z (approach + immersion compressed into 0→0.35) ---- */
    const camZ = lerp(CONFIG.cameraZ0, CONFIG.cameraZ1, smoothstep(p, 0, 0.35));
    camera.position.z = camZ;
    camera.updateProjectionMatrix();

    /* --- group transform ------------------------------------------ */
    const grp = groupRef.current;
    if (grp) {
      const offX = lerp(CONFIG.sphereOffsetX, 0, smoothstep(p, 0, 0.15));
      grp.position.x = offX;
      grp.position.y = 0;

      /* slow auto-rotation on Y, easing out in phase 4 */
      const rFade = 1 - smoothstep(p, 0.75, 1.0);
      autoRotY.current += delta * CONFIG.rotationSpeed * rFade;

      /* mouse → tilt rotation around axes (center stays fixed) */
      if (!isMobile) {
        const pFade = 1 - smoothstep(p, 0, 0.15);
        const mx = mouseRef.current.x * CONFIG.parallaxStrength * pFade;
        const my = -mouseRef.current.y * CONFIG.parallaxStrength * 0.5 * pFade;
        mouseRotY.current += (mx - mouseRotY.current) * 0.04;
        mouseRotX.current += (my - mouseRotX.current) * 0.04;
      } else {
        mouseRotY.current *= 0.95;
        mouseRotX.current *= 0.95;
      }

      grp.rotation.y = autoRotY.current + mouseRotY.current;
      grp.rotation.x = mouseRotX.current;
    }

    /* --- update particle positions -------------------------------- */
    const {
      basePositions: bp,
      targetPositions: tp,
      currentPositions: cp,
      phases,
      neighborPairs,
      connectionPositions: lp,
    } = data;

    const noiseScale = 1 - smoothstep(p, 0.4, 0.65);
    const condense = smoothstep(p, 0.7, 0.92);
    const amp = CONFIG.noiseAmplitude;

    for (let i = 0; i < totalParticles; i++) {
      const i3 = i * 3;
      const ph = phases[i];

      const nx = Math.sin(t * 0.5 + ph * 6.2832) * amp * noiseScale;
      const ny = Math.cos(t * 0.3 + ph * 3.1416) * amp * noiseScale;
      const nz = Math.sin(t * 0.4 + ph * 1.5708) * amp * noiseScale;

      cp[i3] = lerp(bp[i3] + nx, tp[i3], condense);
      cp[i3 + 1] = lerp(bp[i3 + 1] + ny, tp[i3 + 1], condense);
      cp[i3 + 2] = lerp(bp[i3 + 2] + nz, tp[i3 + 2], condense);
    }

    const posAttr = pointsGeo.getAttribute("position") as THREE.BufferAttribute;
    posAttr.needsUpdate = true;

    /* --- update connection endpoints ------------------------------ */
    for (let c = 0; c < neighborPairs.length; c++) {
      const [a, b] = neighborPairs[c];
      const c6 = c * 6;
      const a3 = a * 3;
      const b3 = b * 3;
      lp[c6] = cp[a3];
      lp[c6 + 1] = cp[a3 + 1];
      lp[c6 + 2] = cp[a3 + 2];
      lp[c6 + 3] = cp[b3];
      lp[c6 + 4] = cp[b3 + 1];
      lp[c6 + 5] = cp[b3 + 2];
    }

    const lPosAttr = linesGeo.getAttribute("position") as THREE.BufferAttribute;
    lPosAttr.needsUpdate = true;

    /* --- update uniforms ------------------------------------------ */
    particleMat.uniforms.uProgress.value = p;
    particleMat.uniforms.uTime.value = t;
    dustMat.uniforms.uTime.value = t;
    connectionMat.uniforms.uProgress.value = p;
  });

  /* ================================================================ */
  /*  JSX                                                              */
  /* ================================================================ */
  return (
    <group ref={groupRef}>
      <points geometry={dustGeo} material={dustMat} renderOrder={0} />
      <points geometry={pointsGeo} material={particleMat} renderOrder={1} />
      <lineSegments geometry={linesGeo} material={connectionMat} renderOrder={2} />
    </group>
  );
}
