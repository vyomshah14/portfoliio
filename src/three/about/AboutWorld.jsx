import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AboutWorld() {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const knotRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const particlesGroupRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = Math.sin(t * 0.9) * 0.2;
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    }

    if (knotRef.current) {
      knotRef.current.rotation.x += delta * 0.4;
      knotRef.current.rotation.y += delta * 0.6;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y -= delta * 0.8;
      const scale = 1 + Math.sin(t * 2.5) * 0.08;
      innerCoreRef.current.scale.set(scale, scale, scale);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.5;
      ring1Ref.current.rotation.x = Math.sin(t * 0.5) * 0.3;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.7;
      ring2Ref.current.rotation.y = Math.cos(t * 0.5) * 0.3;
    }

    if (particlesGroupRef.current) {
      particlesGroupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group position={[4.2, 0, -1]} ref={groupRef}>
      {/* ── 3D TorusKnot Cyber Lattice ── */}
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[1.2, 0.25, 128, 32, 2, 3]} />
        <meshStandardMaterial
          color="#00E5FF"
          wireframe
          transparent
          opacity={0.3}
          emissive="#00E5FF"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* ── Pulsing Core Sphere ── */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[0.55, 3]} />
        <meshBasicMaterial color="#00FFA3" transparent opacity={0.85} wireframe={false} />
      </mesh>

      {/* ── Ring 1: Outer Hex HUD Ring ── */}
      <mesh ref={ring1Ref}>
        <ringGeometry args={[2.0, 2.06, 6]} />
        <meshBasicMaterial color="#00E5FF" side={THREE.DoubleSide} transparent opacity={0.4} />
      </mesh>

      {/* ── Ring 2: Concentric Circular HUD ── */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00FFA3" transparent opacity={0.3} />
      </mesh>

      {/* ── Orbiting 3D Nodes ── */}
      <group ref={particlesGroupRef}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI * 2) / 6;
          const radius = 2.8;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = Math.sin(i * 1.5) * 0.6;
          return (
            <group key={i} position={[x, y, z]}>
              <mesh>
                <octahedronGeometry args={[0.18, 0]} />
                <meshBasicMaterial color={i % 2 === 0 ? '#00E5FF' : '#00FFA3'} transparent opacity={0.8} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
