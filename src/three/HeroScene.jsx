import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { heroSceneConfig } from './sceneConfig';
import { CyberCore } from './CyberCore';
import { OrbitalRings } from './OrbitalRings';
import { NetworkSystem } from './NetworkSystem';
import { AmbientParticles } from './AmbientParticles';
import { ProjectNetwork } from './projects/ProjectNetwork';
import { ProjectWorld } from './projects/ProjectWorld';
import { JourneyNetwork } from './journey/JourneyNetwork';
import { AboutWorld } from './about/AboutWorld';
import { SkillsWorld } from './skills/SkillsWorld';
import gsap from 'gsap';

// ─── Camera ──────────────────────────────────────────────────────────────────
function HeroCamera({ isMobile, selectedProject, selectedJourney, activeSection }) {
  const { camera, pointer } = useThree();
  const target = new THREE.Vector3(0, 0, 0);

  useEffect(() => {
    const positions = {
      contact:  { x: 0, y: 0,  z: heroSceneConfig.cameraZ * 0.8 },
      projects: { x: 0, y: 0,  z: 7 },
      skills:   { x: -2, y: 1, z: 8 },
      about:    { x: 4, y: 0, z: 8 },
      default:  { x: 0, y: 0, z: isMobile ? heroSceneConfig.cameraZ * 1.5 : heroSceneConfig.cameraZ },
    };

    if (selectedProject) {
      gsap.to(camera.position, { x: 0, y: 0, z: 6, duration: 1.2, ease: 'power3.out' });
    } else if (selectedJourney) {
      gsap.to(camera.position, { x: 0, y: 0, z: 6, duration: 1.2, ease: 'power3.out' });
    } else {
      const pos = positions[activeSection] ?? positions.default;
      gsap.to(camera.position, { ...pos, duration: 1.2, ease: 'power3.out' });
    }
  }, [camera, isMobile, selectedProject, selectedJourney, activeSection]);

  useFrame((_, delta) => {
    if (!isMobile && !selectedProject && !selectedJourney) {
      const mult = activeSection === 'contact' ? 0.5 : 1.5;
      camera.position.x += (pointer.x * mult - camera.position.x) * 1.5 * delta;
      camera.position.y += (pointer.y * mult - camera.position.y) * 1.5 * delta;
      camera.lookAt(target);
    }
  });

  return null;
}

// ─── Main HeroScene ─────────────────────────────────────────────────────────
export default function HeroScene({
  projects = [],
  selectedProject = null,
  onSelectProject = () => {},
  journeyData = [],
  selectedJourney = null,
  onSelectJourney = () => {},
  activeSection = 'hero',
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', e => setPrefersReducedMotion(e.matches));
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!mounted) return null;

  const isContact = activeSection === 'contact';

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto' }}>
      <Canvas
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, heroSceneConfig.cameraZ] }}
      >
        {/* Transparent Canvas - DynamicCyberBackground renders underneath */}

        <ambientLight intensity={0.25} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#00E5FF" />
        <pointLight position={[-8, -8, -4]} intensity={0.6} color="#00FFA3" />

        <Suspense fallback={null}>
          <group
            scale={isMobile ? 0.6 : 1}
            position={isMobile ? [0, 0, 0] : [-2, 0, 0]}
          >
            {/* Core + rings */}
            <group visible={!selectedProject && activeSection !== 'journey'}>
              <group position={[0, 0, -2]}>
                <CyberCore isCalm={isContact} />
                {!prefersReducedMotion && !isContact && (
                  <>
                    <OrbitalRings />
                    <NetworkSystem isMobile={isMobile} />
                  </>
                )}
              </group>
            </group>

            {/* Particles */}
            {!prefersReducedMotion && <AmbientParticles isMobile={isMobile} isCalm={isContact} />}

            {/* Section worlds */}
            <group visible={activeSection === 'about'}><AboutWorld /></group>
            <group visible={activeSection === 'skills'}><SkillsWorld /></group>

            <group visible={activeSection !== 'journey' && !isContact && activeSection !== 'about' && activeSection !== 'skills'}>
              <ProjectNetwork projects={projects} selectedProjectId={selectedProject?.id} onSelectProject={onSelectProject} />
              <ProjectWorld project={selectedProject} />
            </group>

            <group visible={activeSection === 'journey'}>
              <JourneyNetwork journeyData={journeyData} selectedJourneyId={selectedJourney?.id} onSelectJourney={onSelectJourney} />
            </group>
          </group>
        </Suspense>

        {!prefersReducedMotion && (
          <HeroCamera isMobile={isMobile} selectedProject={selectedProject} selectedJourney={selectedJourney} activeSection={activeSection} />
        )}
      </Canvas>
    </div>
  );
}
