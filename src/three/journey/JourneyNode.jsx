import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export function JourneyNode({ data, position, isSelected, onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const isCurrent = data.status === 'CURRENT DIRECTION';
  const isFuture = data.status === 'FUTURE DIRECTION' || data.status === 'EXPLORING';
  
  const color = isCurrent ? '#00FFA3' : isFuture ? '#667085' : '#00E5FF';

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (!isSelected) {
        meshRef.current.rotation.y += delta * 0.3;
        meshRef.current.rotation.z += delta * 0.1;
      }
      
      const targetScale = isSelected ? 1.5 : (hovered || isCurrent) ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const handlePointerEnter = (e) => {
    e.stopPropagation();
    if (!isSelected) setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerLeave = (e) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group position={position}>
      <group 
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(data); }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <mesh>
          {/* Diamond shape for nodes */}
          <octahedronGeometry args={[0.4, 0]} />
          <meshBasicMaterial 
            color={color} 
            wireframe 
            transparent 
            opacity={hovered || isSelected ? 0.9 : 0.5} 
          />
        </mesh>
        
        <mesh>
          <icosahedronGeometry args={[0.2, 1]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={hovered || isSelected || isCurrent ? 0.6 : 0.2} 
          />
        </mesh>
      </group>
      
      {/* Node Label */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.2}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwI.woff"
        fillOpacity={hovered || isSelected || isCurrent ? 1 : 0.4}
      >
        {data.title}
      </Text>
    </group>
  );
}
