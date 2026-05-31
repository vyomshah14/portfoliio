import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float, PresentationControls, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import Loader from './Loader.jsx';

function LoadedAvatar({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.8} position={[0, -1.35, 0]} />;
}

function FallbackAvatar() {
  const group = useRef();

  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    group.current.rotation.y += (pointer.x * 0.25 - group.current.rotation.y) * 0.045;
    group.current.rotation.x += (-pointer.y * 0.12 - group.current.rotation.x) * 0.045;
    group.current.position.y = Math.sin(clock.elapsedTime * 1.6) * 0.035;
  });

  return (
    <group ref={group} position={[0, -0.55, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.72, 64, 64]} />
        <meshPhysicalMaterial color="#dce7f8" roughness={0.38} metalness={0.05} clearcoat={0.7} />
      </mesh>
      <mesh castShadow position={[0, -0.48, 0]}>
        <capsuleGeometry args={[0.52, 1.18, 18, 42]} />
        <meshPhysicalMaterial color="#111827" roughness={0.42} metalness={0.2} clearcoat={0.35} />
      </mesh>
      <mesh castShadow position={[-0.26, 0.6, 0.63]}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshStandardMaterial color="#050510" />
      </mesh>
      <mesh castShadow position={[0.26, 0.6, 0.63]}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshStandardMaterial color="#050510" />
      </mesh>
      <mesh castShadow position={[0, 0.33, 0.7]} rotation={[0.1, 0, 0]}>
        <torusGeometry args={[0.19, 0.018, 12, 48, Math.PI]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0, -0.1, 0.58]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.76, 0.018, 12, 96]} />
        <meshBasicMaterial color="#00f2fe" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, -0.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.98, 0.015, 12, 96]} />
        <meshBasicMaterial color="#f43f5e" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export default function AvatarScene({ modelUrl }) {
  return (
    <div className="avatar-scene" aria-label="Interactive 3D avatar">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.35, 5.4], fov: 34 }}>
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.55} />
        <spotLight position={[3, 4, 4]} angle={0.35} penumbra={0.65} intensity={3.2} castShadow />
        <pointLight position={[-3, 2, 2]} intensity={1.4} color="#00f2fe" />
        <pointLight position={[2, -1, 1]} intensity={1.2} color="#f43f5e" />
        <Suspense fallback={null}>
          <PresentationControls global cursor={false} snap speed={1.2} rotation={[0, 0, 0]} polar={[-0.18, 0.18]} azimuth={[-0.28, 0.28]}>
            <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.35}>
              {modelUrl ? <LoadedAvatar url={modelUrl} /> : <FallbackAvatar />}
            </Float>
          </PresentationControls>
          <ContactShadows position={[0, -1.25, 0]} opacity={0.45} blur={2.6} scale={5} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <div className="avatar-loader"><Loader /></div>
    </div>
  );
}
