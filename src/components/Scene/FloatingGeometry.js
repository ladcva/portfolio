import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function FloatingGeometry() {
  const mountRef = useRef(null);
  const targetLightPos = useRef(new THREE.Vector3(0, 0, 5));
  const targetLightIntensity = useRef(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // --- Geometries ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. The Glass Core
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.12,
      roughness: 0.18,
      transmission: 0.92,
      ior: 1.45,
      thickness: 0.5,
      specularIntensity: 0.8,
      specularColor: 0xffffff,
      opacity: 1,
      transparent: true,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(core);

    // 2. The Orbiting Particles
    const orbitGroup = new THREE.Group();
    mainGroup.add(orbitGroup);

    const particles = [
      { color: 0xf97316, pos: [2.2, 0.8, -0.5], scale: 0.18 },
      { color: 0x34d399, pos: [-1.8, -1.2, 0.4], scale: 0.14 },
      { color: 0x9333ea, pos: [0.5, -2.1, -0.8], scale: 0.22 },
    ];

    particles.forEach((p) => {
      const pGeo = new THREE.OctahedronGeometry(p.scale, 0);
      const pMat = new THREE.MeshStandardMaterial({
        color: p.color,
        emissive: p.color,
        emissiveIntensity: 1.2,
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.position.set(...p.pos);
      orbitGroup.add(pMesh);
    });

    // 3. Subtle Ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.4, 0.01, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 })
    );
    ring.rotation.x = Math.PI / 2.2;
    mainGroup.add(ring);

    // --- Lighting ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const backLight = new THREE.PointLight(0x38bdf8, 1.2);
    backLight.position.set(-5, 3, -2);
    scene.add(backLight);

    // Interactive Mouse Light
    const cursorLight = new THREE.PointLight(0xffffff, 0);
    cursorLight.distance = 12;
    cursorLight.decay = 2;
    scene.add(cursorLight);

    // --- Interaction Logic ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -camera.position.z + 4);

    const onPointerMove = (event) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / mount.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / mount.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersectPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersectPoint);
      
      targetLightPos.current.copy(intersectPoint);
      targetLightIntensity.current = 2.8;
    };

    const onPointerLeave = () => {
      targetLightIntensity.current = 0;
    };

    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerleave", onPointerLeave);

    // --- Animation ---
    let frameId;
    const animate = (time) => {
      const t = time * 0.001;

      // Smooth light movement and intensity fade
      cursorLight.position.lerp(targetLightPos.current, 0.12);
      cursorLight.intensity = THREE.MathUtils.lerp(cursorLight.intensity, targetLightIntensity.current, 0.08);

      // Core idle animation
      core.rotation.y = t * 0.12;
      core.rotation.x = Math.sin(t * 0.4) * 0.15;
      core.scale.setScalar(1 + Math.sin(t * 1.2) * 0.02);

      // Orbit animation
      orbitGroup.rotation.y = -t * 0.25;
      orbitGroup.rotation.z = Math.cos(t * 0.2) * 0.1;
      orbitGroup.children.forEach((p, i) => {
        p.rotation.y += 0.02;
        p.position.y += Math.sin(t + i) * 0.002;
      });

      ring.rotation.z = t * 0.05;

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(frameId);
      
      mainGroup.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
          else child.material.dispose();
        }
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="floating-geometry" ref={mountRef} aria-hidden="true" />;
}

export default FloatingGeometry;
