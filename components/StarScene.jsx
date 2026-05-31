"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars, Trail } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function StarShape() {
  const meshRef = useRef();
  const lightRef = useRef();

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const outer = 1;
    const inner = 0.43;
    for (let i = 0; i < 10; i += 1) {
      const radius = i % 2 === 0 ? outer : inner;
      const angle = Math.PI / 2 + (i * Math.PI) / 5;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.28,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.055,
      bevelThickness: 0.06,
    });
    geo.center();
    return geo;
  }, []);

  useFrame(({ pointer, clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.008;
    meshRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.55) * 0.08 + pointer.x * 0.18;
    meshRef.current.rotation.x = pointer.y * -0.14;
    meshRef.current.position.x = pointer.x * 0.22;
    meshRef.current.position.y = pointer.y * 0.16;
    if (lightRef.current) {
      lightRef.current.intensity = 2.2 + Math.sin(clock.elapsedTime * 1.4) * 0.25;
      lightRef.current.position.x = pointer.x * 2;
      lightRef.current.position.y = pointer.y * 1.5;
    }
  });

  return (
    <Float speed={1.35} rotationIntensity={0.35} floatIntensity={0.6}>
      <pointLight ref={lightRef} color="#f7d77b" intensity={2.4} distance={8} />
      <Trail width={1.25} length={6} color="#f7d77b" attenuation={(t) => t * t}>
        <mesh ref={meshRef} geometry={geometry} scale={[1.35, 1.35, 1.35]}>
          <meshStandardMaterial
            color="#f7d77b"
            emissive="#d6a84f"
            emissiveIntensity={1.15}
            metalness={0.65}
            roughness={0.18}
          />
        </mesh>
      </Trail>
    </Float>
  );
}

export default function StarScene({ final = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0, final ? 4.1 : 4.7], fov: 42 }}
      dpr={[1, 1.7]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-label="A glowing golden star floating in space"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 4]} intensity={1.4} color="#fff5cc" />
      <Stars radius={42} depth={18} count={final ? 1600 : 950} factor={3.4} saturation={0.2} fade speed={0.65} />
      <StarShape />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.26} autoRotate autoRotateSpeed={0.28} />
    </Canvas>
  );
}
