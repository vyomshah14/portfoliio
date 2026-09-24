import React, { useMemo } from 'react';
import * as THREE from 'three';

export function ProjectConnections({ nodes }) {
  const lineGeometry = useMemo(() => {
    const points = [];
    // Create a network structure by connecting sequential nodes
    for (let i = 0; i < nodes.length; i++) {
      const current = nodes[i].position;
      const next = nodes[(i + 1) % nodes.length].position;
      
      points.push(current);
      points.push(next);

      // Connect to origin
      if (i % 2 === 0) {
        points.push(current);
        points.push(new THREE.Vector3(0, 0, 0));
      }
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [nodes]);

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial color="#00E5FF" transparent opacity={0.15} />
    </lineSegments>
  );
}
