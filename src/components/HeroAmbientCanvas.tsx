import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const _vec3 = new THREE.Vector3();
const _mat4 = new THREE.Matrix4();
const _quat = new THREE.Quaternion();
const _scale = new THREE.Vector3();
const _color = new THREE.Color();

/**
 * Fluid Three.js WebGL morphing wave mesh + refractive obsidian glass nodes
 * paired with soft CSS morphing ambient blobs behind the hero glass cards.
 */
export function HeroAmbientCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isSoftwareGl = (() => {
      const probe = document.createElement('canvas');
      const gl = probe.getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param) || '');
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: true,
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const width = container.clientWidth || 1280;
    const height = container.clientHeight || 720;
    renderer.setSize(width, height);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020305, 0.05);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.6, 11.2);
    camera.lookAt(0, 0, 0);

    // Smooth morphing fluid cryptographic topology mesh
    const planeGeo = new THREE.PlaneGeometry(30, 18, 48, 28);
    planeGeo.rotateX(-Math.PI / 2.25);
    const posAttr = planeGeo.attributes.position as THREE.BufferAttribute;
    const baseY = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      baseY[i] = posAttr.getY(i);
    }

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x3b5bff,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const latticeMesh = new THREE.Mesh(planeGeo, wireMat);
    latticeMesh.position.set(0, -1.65, -2.5);
    scene.add(latticeMesh);

    // Instanced subtle luminous verification nodes
    const nodeCount = 84;
    const nodeGeo = new THREE.OctahedronGeometry(0.055, 0);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    });
    const nodes = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    nodes.frustumCulled = false;
    scene.add(nodes);

    const nodeSeeds = Array.from({ length: nodeCount }, (_, i) => ({
      x: ((i % 14) - 6.5) * 1.85 + Math.sin(i * 2.7) * 0.4,
      z: (Math.floor(i / 14) - 2.5) * 2.4 + Math.cos(i * 1.9) * 0.4,
      phase: i * 0.45,
      isEmerald: i % 2 === 0,
    }));

    nodeSeeds.forEach((seed, i) => {
      _color.setHex(seed.isEmerald ? 0x10b981 : 0x3b5bff);
      nodes.setColorAt(i, _color);
    });
    if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;

    let mouseX = 0;
    let mouseY = 0;
    const onPointerMove = (e: PointerEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 1280;
      const h = container.clientHeight || 720;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;

    function updateScene(elapsed: number, delta: number) {
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const z = posAttr.getZ(i);
        const wave =
          Math.sin(x * 0.28 + elapsed * 0.72) * 0.42 +
          Math.cos(z * 0.36 - elapsed * 0.55) * 0.34;
        posAttr.setY(i, baseY[i] + wave);
      }
      posAttr.needsUpdate = true;

      for (let i = 0; i < nodeCount; i++) {
        const s = nodeSeeds[i];
        const y =
          -1.55 +
          Math.sin(s.x * 0.28 + elapsed * 0.72) * 0.42 +
          Math.cos(s.z * 0.36 - elapsed * 0.55) * 0.34 +
          Math.sin(elapsed * 1.5 + s.phase) * 0.16;

        _vec3.set(s.x, y, s.z - 2.5);
        _quat.identity();
        const pulse = 0.8 + Math.sin(elapsed * 2.2 + s.phase) * 0.35;
        _scale.set(pulse, pulse, pulse);
        _mat4.compose(_vec3, _quat, _scale);
        nodes.setMatrixAt(i, _mat4);
      }
      nodes.instanceMatrix.needsUpdate = true;

      camera.position.x = THREE.MathUtils.damp(camera.position.x, mouseX * 0.65, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 3.6 - mouseY * 0.3, 3.5, delta);
      camera.lookAt(0, -0.3, -2);
    }

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const status = sync ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : gl.SIGNALED;
        if (status === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();
      updateScene(elapsed, delta);
      renderer.render(scene, camera);

      if (prefersReducedMotion) return;
      if (isSoftwareGl) afterDraw(tick);
      else frameId = requestAnimationFrame(tick);
    }

    if (prefersReducedMotion) {
      updateScene(0, 0.016);
      renderer.render(scene, camera);
    } else if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      resizeObserver.disconnect();
      planeGeo.dispose();
      wireMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Morphing liquid-light ambient orbs refracted by foreground glass panels */}
      <div className="animate-morph-a absolute -top-24 left-[12%] h-[440px] w-[520px] bg-[#3B5BFF]/22 blur-[110px]" />
      <div className="animate-morph-b absolute top-[18%] right-[8%] h-[420px] w-[480px] bg-emerald-500/18 blur-[115px]" />
      <div ref={containerRef} className="absolute inset-0 opacity-85" />
    </div>
  );
}
