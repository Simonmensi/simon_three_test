"use client";

import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function DuckModel() {
  const gltf = useGLTF("/models/Duck.glb");
  const duck = useMemo(() => gltf.scene.clone(), [gltf.scene]);
  const wrapperRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(duck);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 1.8;

    duck.position.set(-center.x, -center.y + size.y * 0.1, -center.z);
    wrapperRef.current?.scale.setScalar(targetSize / maxAxis);
  }, [duck]);

  return (
    <group ref={wrapperRef} rotation={[0, Math.PI / 2, 0]}>
      <primitive object={duck} />
    </group>
  );
}

export function LoaderScene() {
  return (
    <Canvas camera={{ position: [1.2, 0.8, 2.4], fov: 75 }}>
      <color attach="background" args={["#e7e0d6"]} />
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />

      <Suspense fallback={<Text position={[0, 0, 0]}>Loading...</Text>}>
        <DuckModel />
      </Suspense>

      <OrbitControls
        enablePan={false}
        minDistance={1.8}
        maxDistance={4}
        target={[0, 0.35, 0]}
      />
    </Canvas>
  );
}

useGLTF.preload("/models/Duck.glb");
