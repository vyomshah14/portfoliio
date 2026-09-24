import React from 'react';

export default function UltraFastCyberBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'linear-gradient(140deg, #030816 0%, #071936 45%, #020612 100%)',
      }}
    >
      {/* ── 1. Hardware Accelerated Glowing Aurora Mesh Orbs ── */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '15%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.18) 0%, transparent 65%)',
          filter: 'blur(60px)',
          willChange: 'transform',
          animation: 'gpuOrbFloat1 18s ease-in-out infinite alternate',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '35%',
          right: '-5%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(189, 0, 255, 0.15) 0%, transparent 65%)',
          filter: 'blur(70px)',
          willChange: 'transform',
          animation: 'gpuOrbFloat2 22s ease-in-out infinite alternate-reverse',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '-5%',
          left: '20%',
          width: '45vw',
          height: '45vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 255, 163, 0.14) 0%, transparent 65%)',
          filter: 'blur(65px)',
          willChange: 'transform',
          animation: 'gpuOrbFloat3 16s ease-in-out infinite alternate',
        }}
      />

      {/* ── 2. Lightweight Crisp Cyber Grid Overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          opacity: 0.8,
        }}
      />

      {/* ── 3. Subtle Technology Scanlines ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)',
          opacity: 0.6,
        }}
      />

      {/* GPU Accelerated Keyframes */}
      <style>{`
        @keyframes gpuOrbFloat1 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(60px, 45px, 0) scale(1.15); }
        }
        @keyframes gpuOrbFloat2 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(-50px, 60px, 0) scale(1.2); }
        }
        @keyframes gpuOrbFloat3 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(40px, -50px, 0) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
