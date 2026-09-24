import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export function CyberTerminal({ position = [3, 0, 0], rotation = [0, -0.2, 0], bootState, userName, onNameSubmit }) {
  const terminalRef = useRef();
  const [inputValue, setInputValue] = useState('');
  
  // Fake boot logs for initializing state
  const [bootLogs, setBootLogs] = useState([]);
  
  useEffect(() => {
    if (bootState === 'initializing') {
      const logs = [
        "INITIALIZING VYOM CYBER WORLD...",
        "CORE SYSTEM ........ READY",
        "NETWORK LAYER ...... READY",
        "INTERFACE .......... READY",
        "ENVIRONMENT ........ READY"
      ];
      let currentLog = 0;
      const interval = setInterval(() => {
        setBootLogs(prev => [...prev, logs[currentLog]]);
        currentLog++;
        if (currentLog >= logs.length) clearInterval(interval);
      }, 600);
      return () => clearInterval(interval);
    }
  }, [bootState]);

  useFrame((state) => {
    if (terminalRef.current) {
      // Subtle hovering effect
      terminalRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Mouse parallax
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;
      
      terminalRef.current.rotation.y = THREE.MathUtils.lerp(
        terminalRef.current.rotation.y,
        rotation[1] + mouseX * 0.2,
        0.05
      );
      terminalRef.current.rotation.x = THREE.MathUtils.lerp(
        terminalRef.current.rotation.x,
        rotation[0] - mouseY * 0.2,
        0.05
      );
    }
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim().length > 0) {
      onNameSubmit(inputValue.trim().toUpperCase().slice(0, 24));
    }
  };

  const renderScreen = () => {
    if (bootState === 'initializing') {
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {bootLogs.map((log, i) => (
            <div key={i} style={{ marginBottom: '10px', opacity: 0.8 }}>{log}</div>
          ))}
          <div className="blink" style={{ marginTop: '10px' }}>_</div>
        </div>
      );
    }

    if (bootState === 'identification') {
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ marginBottom: '30px', color: 'var(--text-primary)' }}>VYOM CYBER WORLD</div>
          <div style={{ width: '80%', height: '1px', background: 'var(--accent-primary)', marginBottom: '30px', opacity: 0.5 }}></div>
          <div style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>IDENTIFICATION REQUIRED</div>
          <div style={{ marginBottom: '20px', color: 'var(--accent-primary)' }}>ENTER YOUR NAME</div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>&gt;</span>
            <input 
              autoFocus
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={24}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--accent-primary)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '1.2em',
                outline: 'none',
                width: '200px',
                textAlign: 'center',
                textTransform: 'uppercase'
              }}
            />
          </div>
          
          <button 
            onClick={() => inputValue.trim().length > 0 && onNameSubmit(inputValue.trim().toUpperCase().slice(0, 24))}
            style={{
              marginTop: '40px',
              background: 'rgba(0, 229, 255, 0.1)',
              border: '1px solid var(--accent-primary)',
              color: 'var(--accent-primary)',
              padding: '10px 20px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)'
            }}
          >
            [ ENTER ]
          </button>
        </div>
      );
    }

    if (bootState === 'welcome') {
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5em', color: 'var(--text-primary)', marginBottom: '15px' }}>
            WELCOME {userName}
          </div>
          <div style={{ fontSize: '1.2em', color: 'var(--text-secondary)', marginBottom: '40px' }}>
            TO VYOM CYBER WORLD
          </div>
          <div style={{ color: 'var(--accent-primary)', fontSize: '1.5em' }}>◇</div>
        </div>
      );
    }

    // Hero state
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ borderBottom: '1px solid var(--accent-primary)', paddingBottom: '10px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ color: 'var(--text-primary)' }}>VYOM_OS</div>
          <div style={{ color: '#00FFA3' }}>● ON</div>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>IDENTITY</div>
          <div>Vyom Shah</div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>ROLE</div>
          <div>Software Developer</div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>CURRENT FOCUS</div>
          <div>Systems</div>
          <div>Networking</div>
          <div>Cybersecurity</div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>STACK</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
            <span>React</span>
            <span>Node.js</span>
            <span>C++</span>
            <span>Python</span>
            <span>Three.js</span>
            <span>SQL</span>
            <span>Git</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '15px', borderTop: '1px dashed rgba(0, 229, 255, 0.3)' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>DIRECTION</div>
          <div>Security Engineering</div>
        </div>
        
        <div style={{ marginTop: '15px', color: '#00E5FF' }}>
          STATUS: EXPLORING
        </div>
      </div>
    );
  };

  return (
    <group ref={terminalRef} position={position} rotation={rotation}>
      {/* Terminal Frame with physical depth */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[4.4, 5.4, 0.2]} />
        <meshStandardMaterial 
          color="#050811" 
          metalness={0.8}
          roughness={0.2}
          emissive="#00E5FF"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Screen Glass */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[4, 5]} />
        <meshPhysicalMaterial 
          color="#002233" 
          transparent={true} 
          opacity={0.8}
          roughness={0.1}
          metalness={0.8}
          transmission={0.5}
        />
      </mesh>

      {/* Edge Highlights */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.2, 5.2, 0.1]} />
        <meshBasicMaterial 
          color="#00E5FF" 
          wireframe={true} 
          transparent={true} 
          opacity={0.3} 
        />
      </mesh>

      {/* Terminal Content (HTML overlay perfectly synced to the 3D plane) */}
      <Html 
        transform 
        position={[0, 0, 0.02]} 
        style={{ 
          width: '380px', 
          height: '480px', 
          background: 'transparent',
          color: 'var(--accent-primary)',
          fontFamily: 'var(--font-mono)',
          padding: '20px',
          boxSizing: 'border-box',
          fontSize: '14px',
          textShadow: '0 0 10px rgba(0, 229, 255, 0.5)'
        }}
      >
        {renderScreen()}
        <style>{`
          .blink { animation: blink 1s step-end infinite; }
          @keyframes blink { 50% { opacity: 0; } }
        `}</style>
      </Html>
    </group>
  );
}
