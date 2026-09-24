import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function GenericProjectWorld() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <meshBasicMaterial color="#667085" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2, 16]} />
        <meshBasicMaterial color="#667085" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
