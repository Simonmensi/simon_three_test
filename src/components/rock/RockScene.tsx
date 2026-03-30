"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const TEXTURE_PATHS = {
  color: "/textures/rock/color.png",
  roughness: "/textures/rock/roughness.png",
  normal: "/textures/rock/normal.png",
  height: "/textures/rock/height.png",
  ambientOcclusion: "/textures/rock/ambient-occlusion.png",
};

export function RockScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#e7e0d6");

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(1.2, 0.8, 2.4);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    const colorTexture = textureLoader.load(TEXTURE_PATHS.color);
    colorTexture.colorSpace = THREE.SRGBColorSpace;

    const roughnessTexture = textureLoader.load(TEXTURE_PATHS.roughness);
    const normalTexture = textureLoader.load(TEXTURE_PATHS.normal);
    const heightTexture = textureLoader.load(TEXTURE_PATHS.height);
    const ambientOcclusionTexture = textureLoader.load(
      TEXTURE_PATHS.ambientOcclusion,
    );

    const textures = [
      colorTexture,
      roughnessTexture,
      normalTexture,
      heightTexture,
      ambientOcclusionTexture,
    ];

    textures.forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1.5, 1.5);
    });

    const geometry = new THREE.SphereGeometry(0.85, 128, 128);
    const uvAttribute = geometry.attributes.uv;
    geometry.setAttribute(
      "uv2",
      new THREE.BufferAttribute(uvAttribute.array.slice(0), 2),
    );

    const material = new THREE.MeshStandardMaterial({
      map: colorTexture,
      aoMap: ambientOcclusionTexture,
      aoMapIntensity: 1,
      displacementMap: heightTexture,
      displacementScale: 0.12,
      normalMap: normalTexture,
      roughnessMap: roughnessTexture,
      roughness: 1,
      metalness: 0,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.8);
    directionalLight.position.set(2.5, 2, 3);
    scene.add(directionalLight);

    const fillLight = new THREE.PointLight(0xffffff, 45, 0, 2);
    fillLight.position.set(-2, -1.5, 2);
    scene.add(fillLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 1.8;
    controls.maxDistance = 4;

    let frameId = 0;

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      sphere.rotation.y += 0.003;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(frameId);
      controls.dispose();
      textures.forEach((texture) => texture.dispose());
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
