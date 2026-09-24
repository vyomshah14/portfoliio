import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function CyberLabWorld() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.15;
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core shield metaphor */}
      <mesh>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#00FFA3" wireframe transparent opacity={0.4} />
      </mesh>
      
      {/* Inner layer */}
      <mesh>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshBasicMaterial color="#00FFA3" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}
