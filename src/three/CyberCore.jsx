import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { heroSceneConfig } from './sceneConfig';

export function CyberCore({ isCalm = false }) {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const shellRef = useRef();
  const dataNodesRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      const s = isCalm ? 0.1 : 1;
      groupRef.current.rotation.y += delta * 0.15 * s;
      groupRef.current.rotation.x += delta * 0.05 * s;
    }
    if (innerCoreRef.current) {
      const s = isCalm ? 0.2 : 1;
      innerCoreRef.current.rotation.y -= delta * 0.25 * s;
      innerCoreRef.current.rotation.z += delta * 0.1 * s;
    }
    if (shellRef.current) shellRef.current.rotation.y += delta * 0.08;
    if (dataNodesRef.current) dataNodesRef.current.rotation.y -= delta * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Layer 1: Solid Emissive Center */}
      <mesh>
        <octahedronGeometry args={[heroSceneConfig.coreRadius * 0.35, 0]} />
        <meshStandardMaterial 
          color="#050811" 
          emissive={heroSceneConfig.accentColor} 
          emissiveIntensity={2} 
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Layer 2: Inner Rotating Wireframe (Energy Matrix) */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[heroSceneConfig.coreRadius * 0.6, 1]} />
        <meshBasicMaterial 
          color={heroSceneConfig.accentColor} 
          wireframe={true} 
          transparent={true} 
          opacity={0.4} 
        />
      </mesh>
      
      {/* Layer 3: Glass / Translucent Outer Shell */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[heroSceneConfig.coreRadius, 2]} />
        <meshPhysicalMaterial 
          color={heroSceneConfig.baseColor} 
          transparent={true} 
          opacity={0.15} 
          roughness={0.1}
          metalness={0.5}
          transmission={0.9}
          thickness={0.5}
          wireframe={true}
        />
      </mesh>

      {/* Layer 4: Structural Data Nodes Floating Around Core */}
      <group ref={dataNodesRef}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = heroSceneConfig.coreRadius * 1.2;
          return (
            <mesh key={i} position={[Math.cos(angle) * radius, (Math.random() - 0.5) * 2, Math.sin(angle) * radius]}>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshBasicMaterial color={heroSceneConfig.baseColor} transparent opacity={0.8} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
