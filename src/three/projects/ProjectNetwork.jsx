import React, { useMemo } from 'react';
import * as THREE from 'three';
import { ProjectNode } from './ProjectNode';
import { ProjectConnections } from './ProjectConnections';

export function ProjectNetwork({ projects, onSelectProject, selectedProjectId }) {
  const nodes = useMemo(() => {
    return projects.map((project, index) => {
      // Distribute nodes in a circle or sphere
      const angle = (index / projects.length) * Math.PI * 2;
      const radius = 6;
      
      return {
        project,
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 4,
          Math.sin(angle) * radius
        )
      };
    });
  }, [projects]);

  return (
    <group position={[0, -2, -10]}> {/* Position it behind the core and slightly down */}
      <ProjectConnections nodes={nodes} />
      
      {nodes.map((node) => (
        <ProjectNode
          key={node.project.id}
          project={node.project}
          position={node.position}
          isSelected={selectedProjectId === node.project.id}
          isFaded={selectedProjectId && selectedProjectId !== node.project.id}
          onClick={() => onSelectProject(node.project)}
        />
      ))}
    </group>
  );
}
