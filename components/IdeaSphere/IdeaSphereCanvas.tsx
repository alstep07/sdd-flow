"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { CONFIG } from "./config";
import { SceneContent } from "./SceneContent";

interface Props {
  progressRef: React.RefObject<{ raw: number; smooth: number }>;
  isMobile: boolean;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  isVisibleRef: React.RefObject<boolean>;
}

export function IdeaSphereCanvas({
  progressRef,
  isMobile,
  mouseRef,
  isVisibleRef,
}: Props) {
  return (
    <Canvas
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        /* force sRGB output so shader colors display correctly */
        outputColorSpace: THREE.SRGBColorSpace,
        /* NO tone mapping — ACES desaturates magentas toward red */
        toneMapping: THREE.NoToneMapping,
      }}
      dpr={[1, Math.min(2, window.devicePixelRatio)]}
      camera={{
        fov: CONFIG.cameraFov,
        near: 0.1,
        far: 100,
        position: [0, 0, CONFIG.cameraZ0],
      }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => {
        /* belt-and-suspenders: ensure settings stick after R3F init */
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.NoToneMapping;

        gl.getContext().canvas.addEventListener(
          "webglcontextlost",
          (e) => e.preventDefault(),
          false,
        );
      }}
    >
      <SceneContent
        progressRef={progressRef}
        isMobile={isMobile}
        mouseRef={mouseRef}
        isVisibleRef={isVisibleRef}
      />
    </Canvas>
  );
}
