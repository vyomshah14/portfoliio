import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export function ProjectNode({ project, position, onClick, isSelected, isFaded }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (!isSelected) {
        meshRef.current.rotation.y += delta * 0.2;
        meshRef.current.rotation.x += delta * 0.1;
      }
      
      const targetScale = isSelected ? 1.5 : hovered ? 1.2 : 1;
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

  const color = project.visual?.color || '#00E5FF';

  const renderGeometry = () => {
    switch (project.id) {
      case 'netintel':
        // Networking node (Router/Switch-like)
        return (
          <group>
            <mesh>
              <boxGeometry args={[0.8, 0.2, 0.6]} />
              <meshBasicMaterial color={color} wireframe transparent opacity={isFaded ? 0.1 : (hovered || isSelected ? 0.8 : 0.4)} />
            </mesh>
            <mesh position={[0, 0.2, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshBasicMaterial color={color} transparent opacity={isFaded ? 0.05 : (hovered || isSelected ? 0.6 : 0.2)} />
            </mesh>
          </group>
        );
      case 'cyberlab-3d':
        // Cybersecurity core (Layered security)
        return (
          <group>
            <mesh>
              <icosahedronGeometry args={[0.5, 1]} />
              <meshBasicMaterial color={color} wireframe transparent opacity={isFaded ? 0.1 : (hovered || isSelected ? 0.8 : 0.4)} />
            </mesh>
            <mesh>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshBasicMaterial color="#ff0044" transparent opacity={isFaded ? 0.05 : (hovered || isSelected ? 0.6 : 0.2)} />
            </mesh>
          </group>
        );
      case 'drum-player':
        // Audio visualization (Waveform/radial)
        return (
          <group>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.4, 0.05, 16, 32]} />
              <meshBasicMaterial color={color} wireframe transparent opacity={isFaded ? 0.1 : (hovered || isSelected ? 0.8 : 0.4)} />
            </mesh>
            <mesh>
              <cylinderGeometry args={[0.2, 0.2, 0.6, 16]} />
              <meshBasicMaterial color={color} transparent opacity={isFaded ? 0.05 : (hovered || isSelected ? 0.6 : 0.2)} />
            </mesh>
          </group>
        );
      case 'railconnect':
        // Railway station node
        return (
          <group>
            <mesh>
              <cylinderGeometry args={[0.5, 0.5, 0.1, 6]} />
              <meshBasicMaterial color={color} wireframe transparent opacity={isFaded ? 0.1 : (hovered || isSelected ? 0.8 : 0.4)} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[0.4, 0.2, 0.2]} />
              <meshBasicMaterial color={color} transparent opacity={isFaded ? 0.05 : (hovered || isSelected ? 0.6 : 0.2)} />
            </mesh>
          </group>
        );
      default:
        return (
          <group>
            <mesh>
              <octahedronGeometry args={[0.5, 0]} />
              <meshBasicMaterial color={color} wireframe transparent opacity={isFaded ? 0.1 : (hovered || isSelected ? 0.8 : 0.4)} />
            </mesh>
            <mesh>
              <octahedronGeometry args={[0.3, 0]} />
              <meshBasicMaterial color={color} transparent opacity={isFaded ? 0.05 : (hovered || isSelected ? 0.6 : 0.2)} />
            </mesh>
          </group>
        );
    }
  };

  return (
    <group position={position}>
      <group 
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {renderGeometry()}
      </group>
      
      {(!isFaded || isSelected) && (
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.2}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwI.woff"
          fillOpacity={isFaded && !isSelected ? 0.2 : (hovered || isSelected ? 1 : 0.6)}
        >
          {project.title}
        </Text>
      )}
    </group>
  );
}
