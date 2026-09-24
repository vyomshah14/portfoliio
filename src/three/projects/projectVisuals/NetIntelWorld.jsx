import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function NetIntelWorld() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Router metaphor */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.5} />
      </mesh>
      
      {/* Network Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 50]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[3, 0.02, 16, 50]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}
