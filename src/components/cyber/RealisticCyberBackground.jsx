import React, { useEffect, useState, useRef } from 'react';

export default function RealisticCyberBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, rawX: 0, rawY: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: `${e.clientX}px`,
        y: `${e.clientY}px`,
        rawX: e.clientX,
        rawY: e.clientY
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const binaryStreams = [
    { left: '6%',  speed: '14s', delay: '0s',  text: '01000011 01011001 01000010 01000101 01010010' },
    { left: '20%', speed: '18s', delay: '3s',  text: '0x7F4A8B9C :: TCP_SYN :: PACKET_VALID' },
    { left: '35%', speed: '12s', delay: '1s',  text: 'ENCRYPTED_AES256_CBC // NODE_VERIFIED' },
    { left: '50%', speed: '20s', delay: '5s',  text: '01010110 01011001 01001111 01001101' },
    { left: '68%', speed: '15s', delay: '2s',  text: '0xDEADBEEF :: SOC_LOG_LEVEL_5' },
    { left: '84%', speed: '19s', delay: '4s',  text: 'SYSTEM_READY :: PORT_443_SECURE' },
  ];

  const hexDumpStreams = [
    '0x00401000  55 89 E5 83 EC 08 8B 45 08',
    '0x00401014  89 04 24 E8 2B 00 00 00 C7',
    '0x00401028  C7 04 24 E8 1A 00 00 00 C9',
    '0x7FFF5FB1  E8 00 00 00 00 58 48 83 C0',
    '0x7FFF5FC5  48 89 C7 E8 BF FE FF FF 48',
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 20%, #092042 0%, #030e24 55%, #01050e 100%)',
      }}
    >
      {/* ── 1. Interactive Mouse Spotlight (Reveals Circuitry on Hover) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(650px circle at ${mousePos.x} ${mousePos.y}, rgba(0, 229, 255, 0.18), transparent 75%)`,
          transition: 'background 0.05s ease-out',
        }}
      />

      {/* ── 2. Glowing Tactical Cyber Orbs ── */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '45vw',
          height: '45vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.18) 0%, transparent 65%)',
          filter: 'blur(70px)',
          willChange: 'transform',
          animation: 'tacticalOrb1 16s ease-in-out infinite alternate',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 255, 163, 0.16) 0%, transparent 65%)',
          filter: 'blur(80px)',
          willChange: 'transform',
          animation: 'tacticalOrb2 20s ease-in-out infinite alternate-reverse',
        }}
      />

      {/* ── 3. Realistic Circuit Board & Hex Node Pattern (SVG) ── */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.5,
        }}
      >
        <pattern id="cyberCircuit" width="160" height="160" patternUnits="userSpaceOnUse">
          {/* Main Circuit Lines */}
          <path d="M 0 80 L 50 80 L 80 50 L 160 50" fill="none" stroke="rgba(0, 229, 255, 0.3)" strokeWidth="1.2" strokeDasharray="8,6" />
          <path d="M 80 0 L 80 50 L 110 80 L 110 160" fill="none" stroke="rgba(0, 255, 163, 0.3)" strokeWidth="1.2" strokeDasharray="6,6" />
          <path d="M 160 120 L 120 120 L 100 140 L 0 140" fill="none" stroke="rgba(189, 0, 255, 0.25)" strokeWidth="1.2" strokeDasharray="4,4" />

          {/* Node Junctions */}
          <circle cx="80" cy="50" r="4.5" fill="#00FFA3" />
          <circle cx="110" cy="80" r="4.5" fill="#00E5FF" />
          <circle cx="50" cy="80" r="3.5" fill="#BD00FF" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#cyberCircuit)" />

        {/* Global Attack Vector Arcs */}
        <path d="M 200 300 Q 500 100 900 350" fill="none" stroke="rgba(0, 229, 255, 0.25)" strokeWidth="1.5" strokeDasharray="10,8" />
        <path d="M 300 700 Q 700 500 1200 650" fill="none" stroke="rgba(0, 255, 163, 0.25)" strokeWidth="1.5" strokeDasharray="8,6" />
      </svg>

      {/* ── 4. Scrolling 3D Wireframe Cyber Grid Floor at Bottom ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '-25vh',
          left: '-40vw',
          width: '180vw',
          height: '100vh',
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 163, 0.18) 1px, transparent 1px)
          `,
          backgroundSize: '55px 55px',
          transformOrigin: '50% 100%',
          transform: 'perspective(550px) rotateX(68deg)',
          animation: 'gridFloorScroll 7s linear infinite',
          opacity: 0.65,
        }}
      />

      {/* ── 5. Tactical Radar Scan Line Beam ── */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.7), rgba(0, 255, 163, 0.9), transparent)',
          boxShadow: '0 0 15px rgba(0, 229, 255, 0.8), 0 0 30px rgba(0, 255, 163, 0.5)',
          willChange: 'transform',
          animation: 'radarBeam 10s linear infinite',
        }}
      />

      {/* ── 6. Ambient Low-Contrast Binary Code Streams ── */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {binaryStreams.map((stream, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: stream.left,
              top: '-10%',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.72rem',
              color: idx % 2 === 0 ? 'rgba(0, 255, 163, 0.25)' : 'rgba(0, 229, 255, 0.25)',
              writingMode: 'vertical-rl',
              letterSpacing: '0.2em',
              textShadow: idx % 2 === 0 ? '0 0 8px rgba(0, 255, 163, 0.4)' : '0 0 8px rgba(0, 229, 255, 0.4)',
              willChange: 'transform',
              animation: `binaryFall ${stream.speed} linear infinite ${stream.delay}`,
            }}
          >
            {stream.text}
          </div>
        ))}
      </div>

      {/* ── 7. Floating Hex Memory Dump Stream ── */}
      <div
        style={{
          position: 'absolute',
          right: '25px',
          top: '140px',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.66rem',
          color: 'rgba(0, 229, 255, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          letterSpacing: '0.08em',
        }}
      >
        {hexDumpStreams.map((hex, i) => (
          <div key={i} style={{ opacity: 0.4 + (i * 0.12) }}>
            {hex}
          </div>
        ))}
      </div>

      {/* ── 8. Tactical HUD Reticle & Coordinates ── */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          right: '40px',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.68rem',
          color: 'rgba(0, 229, 255, 0.45)',
          letterSpacing: '0.1em',
        }}
      >
        + [ SEC_GRID_01 :: 37.7749° N, 122.4194° W ]
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.68rem',
          color: 'rgba(0, 255, 163, 0.45)',
          letterSpacing: '0.1em',
        }}
      >
        + [ THREAT_MONITOR_ACTIVE :: LVL 5 OPERATOR ]
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes tacticalOrb1 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(80px, 50px, 0) scale(1.2); }
        }
        @keyframes tacticalOrb2 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(-70px, -40px, 0) scale(1.15); }
        }
        @keyframes radarBeam {
          0% { top: -5%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 105%; opacity: 0; }
        }
        @keyframes binaryFall {
          0% { transform: translate3d(0, -100%, 0); opacity: 0; }
          15% { opacity: 0.75; }
          85% { opacity: 0.75; }
          100% { transform: translate3d(0, 110vh, 0); opacity: 0; }
        }
        @keyframes gridFloorScroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 55px; }
        }
      `}</style>
    </div>
  );
}
