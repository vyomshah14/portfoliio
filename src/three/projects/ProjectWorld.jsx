import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

function NetIntelWorld({ color }) {
  return (
    <group>
      <Box args={[2, 0.5, 1.5]} position={[0, -1, 0]}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
      </Box>
      <Sphere args={[0.3, 16, 16]} position={[0, 0.5, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </Sphere>
      {/* Network nodes and paths */}
      {[[-2, 0, -2], [2, 0, -2], [0, 0, 2]].map((pos, i) => (
        <group key={i} position={pos}>
          <Box args={[0.5, 0.5, 0.5]}>
            <meshBasicMaterial color="#ffffff" wireframe />
          </Box>
          <mesh position={[0, -1.5, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 3]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function CyberLabWorld({ color }) {
  const ringsRef = useRef();
  useFrame(({ clock }) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      ringsRef.current.rotation.x = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
      </mesh>
      <group ref={ringsRef}>
        {[1.8, 2.0, 2.2].map((radius, i) => (
          <Torus key={i} args={[radius, 0.02, 16, 64]} rotation={[Math.PI / 2 + i * 0.5, i * 0.2, 0]}>
            <meshBasicMaterial color={color} transparent opacity={0.6} />
          </Torus>
        ))}
      </group>
      <Box args={[0.8, 0.8, 0.8]}>
        <meshBasicMaterial color="#ff0044" transparent opacity={0.8} />
      </Box>
    </group>
  );
}

function DrumPlayerWorld({ color }) {
  const wavesRef = useRef();
  useFrame(({ clock }) => {
    if (wavesRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.2;
      wavesRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={wavesRef}>
      <Torus args={[1.5, 0.1, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.8} />
      </Torus>
      <Cylinder args={[0.5, 0.5, 2, 32]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </Cylinder>
    </group>
  );
}

function RailConnectWorld({ color }) {
  const trainRef = useRef();
  useFrame(({ clock }) => {
    if (trainRef.current) {
      trainRef.current.position.x = Math.sin(clock.getElapsedTime()) * 3;
    }
  });

  return (
    <group>
      {/* Station */}
      <Cylinder args={[1, 1, 0.2, 6]} position={[0, -0.5, 0]}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.8} />
      </Cylinder>
      {/* Rails */}
      <Box args={[8, 0.05, 0.2]} position={[0, -0.4, 0]}>
        <meshBasicMaterial color="#666666" />
      </Box>
      {/* Train */}
      <Box ref={trainRef} args={[1.2, 0.4, 0.4]} position={[0, 0, 0]}>
        <meshBasicMaterial color={color} />
      </Box>
    </group>
  );
}

export function ProjectWorld({ project }) {
  if (!project) return null;

  const color = project.visual?.color || '#00E5FF';

  const renderWorld = () => {
    switch (project.id) {
      case 'netintel':
        return <NetIntelWorld color={color} />;
      case 'cyberlab-3d':
        return <CyberLabWorld color={color} />;
      case 'drum-player':
        return <DrumPlayerWorld color={color} />;
      case 'railconnect':
        return <RailConnectWorld color={color} />;
      default:
        return (
          <group>
            <mesh>
              <icosahedronGeometry args={[4, 1]} />
              <meshBasicMaterial color={color} wireframe transparent opacity={0.05} />
            </mesh>
            <mesh>
              <octahedronGeometry args={[1, 0]} />
              <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
            </mesh>
          </group>
        );
    }
  };

  return (
    <group position={[0, -2, -10]}>
      {renderWorld()}
    </group>
  );
}
