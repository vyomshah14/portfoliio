import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { heroSceneConfig } from './sceneConfig';

export function AmbientParticles({ isMobile, isCalm = false }) {
  const pointsRef = useRef();
  
  const count = isMobile ? heroSceneConfig.responsive.mobile.particleCount : heroSceneConfig.particleCount;

  const [positions, phases] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      
      phases[i] = Math.random() * Math.PI * 2;
    }
    return [positions, phases];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      const speedMultiplier = isCalm ? 0.2 : 1;
      pointsRef.current.rotation.y = time * 0.02 * speedMultiplier;
      
      // Update sizes/opacities via shader if we were using ShaderMaterial, 
      // but to keep it performant and simple we just rotate the group
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color={heroSceneConfig.baseColor} 
        transparent 
        opacity={0.3} 
        sizeAttenuation={true}
      />
    </points>
  );
}
