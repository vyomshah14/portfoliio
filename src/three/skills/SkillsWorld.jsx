import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SkillsWorld() {
  const groupRef = useRef();
  const innerRef = useRef();
  const outerRingRef = useRef();
  const matrixGroupRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.5;
      innerRef.current.rotation.z += delta * 0.3;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.4;
      outerRingRef.current.rotation.x = Math.sin(t * 0.4) * 0.4;
    }
    if (matrixGroupRef.current) {
      matrixGroupRef.current.rotation.y -= delta * 0.25;
    }
  });

  return (
    <group position={[-3.8, 0.5, 0]} ref={groupRef}>
      {/* ── 3D Core Cyber Mesh ── */}
      <mesh ref={innerRef}>
        <torusKnotGeometry args={[1.3, 0.3, 128, 32, 2, 3]} />
        <meshStandardMaterial
          color="#00FFA3"
          wireframe
          transparent
          opacity={0.35}
          emissive="#00FFA3"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* ── Inner Glowing Sphere ── */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.8} />
      </mesh>

      {/* ── Outer 3D Hex Ring ── */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.4, 0.04, 16, 6]} />
        <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.45} />
      </mesh>

      {/* ── Orbiting 3D Nodes Matrix ── */}
      <group ref={matrixGroupRef}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
          const angle = (i / 10) * Math.PI * 2;
          const radius = 3.0;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = Math.sin(i * 1.5) * 1.2;

          return (
            <group key={i} position={[x, y, z]}>
              <mesh>
                <octahedronGeometry args={[0.22, 0]} />
                <meshBasicMaterial
                  color={i % 2 === 0 ? '#00E5FF' : '#00FFA3'}
                  transparent
                  opacity={0.85}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
