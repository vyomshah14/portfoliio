import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { heroSceneConfig } from './sceneConfig';

export function NetworkSystem({ isMobile }) {
  const nodesRef = useRef();
  const linesRef = useRef();
  
  const count = isMobile ? heroSceneConfig.responsive.mobile.nodeCount : heroSceneConfig.nodeCount;
  const lineCount = isMobile ? heroSceneConfig.responsive.mobile.connectionCount : heroSceneConfig.connectionCount;

  // Generate nodes
  const nodesData = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      // Create positions in a spherical shell
      const r = heroSceneConfig.coreRadius * 2.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      return {
        position: new THREE.Vector3(x, y, z),
        baseScale: 0.5 + Math.random() * 0.5,
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2
      };
    });
  }, [count]);

  // Generate connections
  const lineGeometry = useMemo(() => {
    const points = [];
    for (let i = 0; i < lineCount; i++) {
      // Connect random nodes
      const n1 = nodesData[Math.floor(Math.random() * nodesData.length)];
      let n2 = nodesData[Math.floor(Math.random() * nodesData.length)];
      
      // Sometimes connect to core (0,0,0)
      if (Math.random() > 0.7) {
        points.push(n1.position);
        points.push(new THREE.Vector3(0, 0, 0));
      } else {
        points.push(n1.position);
        points.push(n2.position);
      }
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [nodesData, lineCount]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (nodesRef.current) {
      nodesRef.current.children.forEach((node, i) => {
        // Subtle pulsing
        const scale = nodesData[i].baseScale + Math.sin(time * nodesData[i].speed + nodesData[i].offset) * 0.2;
        node.scale.setScalar(scale);
      });
    }
  });

  return (
    <group>
      {/* Connections */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial 
          color={heroSceneConfig.baseColor} 
          transparent 
          opacity={0.15} 
        />
      </lineSegments>

      {/* Nodes */}
      <group ref={nodesRef}>
        {nodesData.map((data, i) => (
          <Node key={i} position={data.position} />
        ))}
      </group>
    </group>
  );
}

function Node({ position }) {
  const [hovered, setHover] = useState(false);
  
  return (
    <mesh 
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshBasicMaterial 
        color={hovered ? heroSceneConfig.accentColor : heroSceneConfig.baseColor} 
        transparent
        opacity={hovered ? 0.9 : 0.6}
      />
    </mesh>
  );
}
