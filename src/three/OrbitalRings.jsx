import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { heroSceneConfig } from './sceneConfig';

export function OrbitalRings() {
  const ringsRef = useRef();

  const ringsData = useMemo(() => {
    return Array.from({ length: heroSceneConfig.ringCount }).map((_, i) => ({
      radius: heroSceneConfig.coreRadius * 1.5 + i * 0.8,
      speed: (Math.random() > 0.5 ? 1 : -1) * (0.05 + Math.random() * 0.1),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      )
    }));
  }, []);

  useFrame((state, delta) => {
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        ring.rotation.z += ringsData[i].speed * delta;
      });
    }
  });

  return (
    <group ref={ringsRef}>
      {ringsData.map((data, i) => (
        <mesh key={i} rotation={data.rotation}>
          <torusGeometry args={[data.radius, 0.02, 16, 100]} />
          <meshBasicMaterial 
            color={heroSceneConfig.baseColor} 
            transparent={true} 
            opacity={0.15 - (i * 0.03)} 
          />
        </mesh>
      ))}
    </group>
  );
}
