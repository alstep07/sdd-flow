/* ------------------------------------------------------------------ */
/*  GLSL shaders for the IdeaSphere particle cloud & connection web    */
/*                                                                      */
/*  All colour uniforms are supplied in LINEAR space (converted in JS). */
/*  The renderer outputs sRGB with NoToneMapping, so what we write to  */
/*  gl_FragColor is the final linear value that the GPU gamma-encodes.  */
/* ------------------------------------------------------------------ */

/* ====================== MAIN PARTICLES ============================ */

export const particleVertex = /* glsl */ `
  attribute float aSize;
  attribute float aRadius;
  attribute float aOpacity;
  attribute float aColorMix;
  attribute float aIsHot;
  attribute float aTwinkleSpeed;
  attribute float aTwinklePhase;

  uniform float uPixelRatio;
  uniform float uProgress;
  uniform float uTime;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uFogMinAlpha;
  uniform float uTwinkleAmp;

  varying float vAlpha;
  varying float vColorMix;
  varying float vIsHot;
  varying float vDepthFog;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float dist = -mv.z;

    /* --- crisp starfield sizing ----------------------------------- */
    /*     factor 55 → visible specks, clear depth spread             */
    float baseSize = aSize * uPixelRatio * (55.0 / max(dist, 0.25));

    /* hot sparks slightly larger */
    baseSize *= mix(1.0, 1.35, aIsHot);

    /* immersion near-boost — faster approach */
    float immersion = smoothstep(0.1, 0.3, uProgress);
    float nearBoost = immersion * max(0.0, 1.5 - dist) * 0.5;
    gl_PointSize = baseSize + nearBoost * uPixelRatio;

    /* hard cap: stays a distinct dot even at z ≈ 0 */
    gl_PointSize = min(gl_PointSize, 10.0);

    gl_Position = projectionMatrix * mv;

    /* --- depth fog ------------------------------------------------ */
    float fogT = clamp((dist - uFogNear) / (uFogFar - uFogNear), 0.0, 1.0);
    vDepthFog = fogT;
    float fogAlpha = mix(1.0, uFogMinAlpha, fogT);

    /* --- twinkle -------------------------------------------------- */
    float twinkle = 1.0 + uTwinkleAmp * sin(uTime * aTwinkleSpeed + aTwinklePhase);

    /* --- combined alpha ------------------------------------------- */
    float closeFade = smoothstep(0.05, 0.6, dist);
    vAlpha = closeFade * fogAlpha * aOpacity * twinkle;

    vColorMix = aColorMix;
    vIsHot    = aIsHot;
  }
`;

export const particleFragment = /* glsl */ `
  uniform vec3  uColorWine;
  uniform vec3  uColorViolet;
  uniform vec3  uColorCrimson;
  uniform vec3  uColorPink;
  uniform vec3  uColorHot;
  uniform float uProgress;

  varying float vAlpha;
  varying float vColorMix;
  varying float vIsHot;
  varying float vDepthFog;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;

    /* --- crisp star: bright core, short tight falloff ------------- */
    /*     core = full brightness 0→0.4, thin rim 0.4→1.0            */
    /*     exp(-8 d²) is a sharp spike — much tighter than -3 d²     */
    float shape = exp(-8.0 * d * d);

    /* hot sparks: slightly softer halo for subtle bokeh */
    float hotShape = exp(-5.0 * d * d);
    shape = mix(shape, hotShape, vIsHot);

    float alpha = shape * vAlpha;

    /* --- 3-stop colour gradient: wine → crimson → pink ------------ */
    vec3 col;
    if (vColorMix < 0.5) {
      col = mix(uColorWine, uColorCrimson, vColorMix * 2.0);
    } else {
      col = mix(uColorCrimson, uColorPink, (vColorMix - 0.5) * 2.0);
    }

    /* hot sparks: override toward near-white pink */
    col = mix(col, uColorHot, vIsHot);

    /* far-plane: push toward violet (not just dim — colour shift) */
    col = mix(col, uColorViolet, vDepthFog * 0.45);

    /* phase 3-4: connected nodes brighten slightly toward pink */
    float brighten = smoothstep(0.5, 0.85, uProgress);
    col = mix(col, uColorPink, brighten * 0.15);

    gl_FragColor = vec4(col, alpha);
  }
`;

/* ====================== BOKEH DUST ================================ */
/* Very few (10-12), very faint — atmospheric depth, not haze         */

export const dustVertex = /* glsl */ `
  attribute float aSize;
  attribute float aOpacity;

  uniform float uPixelRatio;
  uniform float uTime;

  varying float vAlpha;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float dist = -mv.z;

    gl_PointSize = aSize * uPixelRatio * (30.0 / max(dist, 0.5));
    gl_PointSize = min(gl_PointSize, 60.0);

    gl_Position = projectionMatrix * mv;

    float distFade = smoothstep(0.3, 1.5, dist) * smoothstep(10.0, 4.0, dist);
    float pulse = 1.0 + 0.25 * sin(uTime * 0.35 + position.x * 1.5);
    vAlpha = aOpacity * distFade * pulse;
  }
`;

export const dustFragment = /* glsl */ `
  uniform vec3 uDustColor;

  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;

    float shape = exp(-5.0 * d * d);
    gl_FragColor = vec4(uDustColor, shape * vAlpha);
  }
`;

/* ====================== CONNECTIONS =============================== */
/* Pale pink-white threads — quieter than particles                   */

export const connectionVertex = /* glsl */ `
  attribute float aOrder;

  uniform float uProgress;

  varying float vAlpha;
  varying float vDist;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDist = -mv.z;

    /* connections: compact window, dense fill before magenta takeover */
    float reveal = smoothstep(0.45, 0.85, uProgress);
    vAlpha = smoothstep(aOrder - 0.05, aOrder + 0.05, reveal);

    gl_Position = projectionMatrix * mv;
  }
`;

export const connectionFragment = /* glsl */ `
  uniform vec3  uColor;
  uniform float uFogNear;
  uniform float uFogFar;

  varying float vAlpha;
  varying float vDist;

  void main() {
    if (vAlpha < 0.008) discard;

    /* depth fade: far links dimmer */
    float depthFade = 1.0 - clamp((vDist - uFogNear) / (uFogFar - uFogNear), 0.0, 0.85);

    /* pale threads — visible but quieter than particles */
    float alpha = vAlpha * depthFade * 0.38;

    gl_FragColor = vec4(uColor, alpha);
  }
`;
