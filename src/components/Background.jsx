import { Suspense, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment, Lightformer, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { scrollState, pointerState } from '../lib/scroll.js';
import { asset } from '../lib/asset.js';

const MODEL = asset('models/moths_fluttering_around_a_light_source/scene.gltf');
useGLTF.preload(MODEL);

const mix = (a, b, e) => a + (b - a) * e;
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const smooth = (t) => t * t * (3 - 2 * t);

// The moths live only at the ends: front-right on the intro, a touch more
// central on the finale. Their own "Animation" makes them flutter; the cursor
// gently turns the whole swarm.
const INTRO = { x: 1.35, y: 0.05, scale: 2.5 };
const FINALE = { x: 1.5, y: 0.15, scale: 2.4 }; // clears "LET'S BUILD"
const BASE_RY = 0.0;

function Moths({ groupRef, layer }) {
  const { scene, animations } = useGLTF(MODEL);
  const grp = groupRef;
  const shaders = useRef([]); // patched material shaders, for the grain uniform

  /* Each layer gets its OWN clone: the smallest moths render in the canvas that
     sits BEHIND the hero lockup, the larger ones in the canvas in front — so the
     swarm reads as real depth around the type rather than a flat overlay. */
  const { root, s, offset } = useMemo(() => {
    const c = skeletonClone(scene);
    c.updateWorldMatrix(true, true);

    // rank the moth meshes by size so we can split small vs large
    const moths = [];
    c.traverse((o) => {
      if (o.isMesh && o.material && o.material.name === 'Moth__Texture') moths.push(o);
    });
    const ranked = moths.map((m) => {
      const b = new THREE.Box3().setFromObject(m);
      const v = new THREE.Vector3();
      b.getSize(v);
      return { m, size: Math.max(v.x, v.y, v.z) };
    }).sort((a, b) => a.size - b.size);
    const smallCount = Math.max(2, Math.round(ranked.length * 0.6)); // extras that fly behind
    const small = new Set(ranked.slice(0, smallCount).map((r) => r.m));

    c.traverse((o) => {
      if (!o.isMesh) return;
      const n = o.material && o.material.name;
      // drop the light-source mesh and the sparkle/powder trail
      if (n === 'Material.001' || n === 'flutters') { o.visible = false; return; }
      if (n === 'Moth__Texture') {
        // FRONT keeps the full swarm exactly as it was. BACK is a separate,
        // additional set of small moths — nothing is taken away from the front.
        o.visible = layer === 'back' ? small.has(o) : true;
      }
      if (!o.visible) return;

      o.castShadow = o.receiveShadow = true;
      o.material = o.material.clone();
      o.material.side = THREE.DoubleSide;
      o.material.envMapIntensity = 1.9;
      if (o.material.roughness !== undefined) o.material.roughness = 0.62;
      // inject screen-space MONOCHROMATIC grain into the material's shader
      o.material.onBeforeCompile = (shader) => {
        shader.uniforms.uGrainTime = { value: 0 };
        shader.uniforms.uGrainAmt = { value: 0.16 };
        shader.fragmentShader =
          'uniform float uGrainTime;\nuniform float uGrainAmt;\n' +
          shader.fragmentShader.replace(
            '#include <dithering_fragment>',
            `#include <dithering_fragment>
             float _g = fract(sin(dot(gl_FragCoord.xy + uGrainTime,
                                      vec2(12.9898, 78.233))) * 43758.5453);
             gl_FragColor.rgb += (_g - 0.5) * uGrainAmt;`
          );
        shaders.current.push(shader);
      };
      o.material.needsUpdate = true;
    });

    const box = new THREE.Box3().setFromObject(c);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const scl = 2.6 / Math.max(size.x, size.y, size.z);
    return { root: c, s: scl, offset: center.clone().multiplyScalar(-scl).toArray() };
  }, [scene, layer]);

  const mixer = useMemo(() => new THREE.AnimationMixer(root), [root]);
  useEffect(() => {
    if (animations[0]) {
      // ease the flutter in, as drei's useAnimations did before the refactor
      mixer.clipAction(animations[0]).reset().fadeIn(0.3).play();
      // offset the back swarm's flutter so the extras never mirror the front ones
      if (layer === 'back') mixer.setTime(3.7);
    }
    return () => mixer.stopAllAction();
  }, [mixer, animations, layer]);

  useFrame((state, dt) => {
    mixer.update(dt);

    // step the grain seed ~12x a second so it flickers like film, not slides
    const seed = Math.floor(state.clock.elapsedTime * 12) * 37.0;
    for (let i = 0; i < shaders.current.length; i++) {
      shaders.current[i].uniforms.uGrainTime.value = seed;
    }

    if (!grp.current) return;
    const g = grp.current;
    const p = scrollState.progress;
    const e = smooth(clamp01(p));
    const sc = mix(INTRO.scale, FINALE.scale, e);

    // the swarm's centre gently follows the cursor across the frame.
    // the back layer drifts a little wider/slower for parallax depth.
    const depth = layer === 'back' ? 1.25 : 1.0;
    const tx = pointerState.x * 3.0 * depth;
    const ty = pointerState.y * 1.9 * depth;
    const ry = BASE_RY + pointerState.x * 0.3;

    const kFollow = 1 - Math.pow(layer === 'back' ? 0.12 : 0.05, dt);
    const kSlow = 1 - Math.pow(0.02, dt);
    g.position.x = mix(g.position.x, tx, kFollow);
    g.position.y = mix(g.position.y, ty, kFollow);
    g.position.z = layer === 'back' ? -1.6 : 0;
    g.scale.setScalar(mix(g.scale.x, sc * (layer === 'back' ? 0.62 : 1), kFollow));
    g.rotation.y = mix(g.rotation.y, ry, kSlow);
    g.rotation.x = mix(g.rotation.x, -pointerState.y * 0.15, kSlow);
  });

  const depthScale = layer === 'back' ? 0.62 : 1;   // the ones behind read smaller
  const depthZ = layer === 'back' ? -1.6 : 0;
  return (
    <group ref={grp} position={[INTRO.x, INTRO.y, depthZ]} scale={INTRO.scale * depthScale}>
      <group scale={s} position={offset}>
        <primitive object={root} />
      </group>
    </group>
  );
}

/* Hover light: raycast the cursor against the sax; a warm point light glides to
   the hovered point and brightens. */
function CursorLight({ target }) {
  const light = useRef();
  const inten = useRef(0);
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const want = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);

  useFrame(({ camera }, dt) => {
    if (!light.current) return;
    ndc.set(pointerState.x, pointerState.y);
    let hit = null;
    if (target.current) {
      ray.setFromCamera(ndc, camera);
      const hits = ray.intersectObject(target.current, true);
      if (hits.length) hit = hits[0];
    }
    const targetI = hit ? 9 : 0;
    inten.current += (targetI - inten.current) * (1 - Math.pow(0.02, dt));
    light.current.intensity = inten.current;
    if (hit) {
      dir.copy(camera.position).sub(hit.point).normalize();
      want.copy(hit.point).addScaledVector(dir, 1.1);
      light.current.position.lerp(want, 0.3);
    }
  });

  return <pointLight ref={light} color="#fff0cc" distance={9} decay={1.5} intensity={0} />;
}

export default function Background({ layer = 'front' }) {
  const wrap = useRef(null);
  const saxRef = useRef();

  // sax is only visible on the first and last acts — fade the whole canvas.
  useEffect(() => {
    let raf;
    let cur = 1;
    const loop = () => {
      const p = scrollState.progress;
      // moths on the intro, then again on the contact finale
      const fadeIn = clamp01(1 - p / 0.16);
      const fadeOut = clamp01((p - 0.82) / 0.14);
      const op = Math.max(fadeIn, fadeOut);
      cur += (op - cur) * 0.15;
      if (wrap.current) {
        wrap.current.style.opacity = cur.toFixed(3);
        wrap.current.style.visibility = cur < 0.01 ? 'hidden' : 'visible';
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div id={layer === 'back' ? 'webgl-back' : 'webgl'} ref={wrap}>
      <Canvas
        /* phones pay for every pixel twice over on a scene this heavy */
        dpr={typeof window !== 'undefined' && window.innerWidth < 760 ? [1, 1.5] : [1, 2]}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6.4], fov: 32 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.18;
          gl.setClearColor(0x000000, 0); // keep the canvas transparent through the composer
        }}
      >
        <Suspense fallback={null}>
          {/* lower ambient so the wings actually shade instead of reading flat */}
          <ambientLight intensity={0.32} />
          <directionalLight position={[5, 8, 6]} intensity={3.6} color="#fff4dc" castShadow shadow-mapSize={[1024, 1024]} />
          <directionalLight position={[-6, 3, -4]} intensity={1.5} color="#ffc070" />
          <spotLight position={[-2, 5, 5]} angle={0.7} penumbra={1} intensity={2.4} color="#ffffff" />
          {/* rim light from behind to separate the wings from the page */}
          <directionalLight position={[-1, 2, -6]} intensity={2.6} color="#ffe6bd" />
          <pointLight position={[3, -2, 4]} intensity={1.2} color="#ff8a3d" />
          <Moths groupRef={saxRef} layer={layer} />
          {layer !== 'back' && <CursorLight target={saxRef} />}
          {/* very subtle grounding shadow beneath the flying moths */}
          <ContactShadows position={[0, -2.6, 0]} opacity={0.16} scale={22} blur={4.5} far={9} color="#2e2214" />
          <Environment resolution={512}>
            <Lightformer form="rect" intensity={5} position={[0, 3, 5]} scale={[12, 12, 1]} color="#fff6e0" />
            <Lightformer form="rect" intensity={4} position={[-6, 2, 3]} scale={[1.6, 14, 1]} color="#ffd591" />
            <Lightformer form="rect" intensity={4} position={[6, 0, 3]} scale={[1.6, 14, 1]} color="#ffffff" />
            <Lightformer form="ring" intensity={3} position={[0, 1, 7]} scale={[7, 7, 1]} color="#ffe6b0" />
            <Lightformer form="rect" intensity={2.4} position={[0, -4, 3]} scale={[14, 4, 1]} color="#d99738" />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
