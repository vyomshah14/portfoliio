import React, { useMemo } from 'react';
import * as THREE from 'three';
import { JourneyNode } from './JourneyNode';

export function JourneyNetwork({ journeyData, selectedJourneyId, onSelectJourney }) {
  // Map journey data to a diagonal path layout
  const nodes = useMemo(() => {
    return journeyData.map((data, index) => {
      // Create a staggered linear path from bottom-left to top-right
      const x = (index - 2) * 2.5;
      const y = (index - 2) * 1.5;
      const z = (Math.sin(index) * 1) - 2; // subtle depth variation

      return {
        data,
        position: new THREE.Vector3(x, y, z)
      };
    });
  }, [journeyData]);

  const lineGeometry = useMemo(() => {
    const points = nodes.map(n => n.position);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [nodes]);

  return (
    <group position={[0, -2, -8]}> {/* Shift it into view slightly differently than Projects */}
      <line>
        <bufferGeometry attach="geometry" {...lineGeometry} />
        <lineBasicMaterial attach="material" color="#00E5FF" transparent opacity={0.3} linewidth={2} />
      </line>
      
      {nodes.map((node) => (
        <JourneyNode
          key={node.data.id}
          data={node.data}
          position={node.position}
          isSelected={selectedJourneyId === node.data.id}
          onClick={onSelectJourney}
        />
      ))}
    </group>
  );
}
