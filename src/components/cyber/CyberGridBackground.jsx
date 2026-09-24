import React, { useEffect } from 'react';

export default function CyberGridBackground() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 30%, #08162b 0%, #030814 60%, #01040a 100%)',
      }}
    >
      {/* ── 1. Interactive Mouse Spotlight Glow ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(800px circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(0, 229, 255, 0.18), transparent 70%)',
          transition: 'background 0.05s ease-out',
        }}
      />

      {/* ── 2. Vivid Full-Screen Cyber Matrix Grid Background ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* ── 3. Moving 3D Perspective Grid Floor at Bottom ── */}
      <div
        className="cyber-3d-grid-floor"
        style={{
          position: 'absolute',
          bottom: '-20vh',
          left: '-50vw',
          width: '200vw',
          height: '110vh',
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 163, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transformOrigin: '50% 100%',
          transform: 'perspective(500px) rotateX(70deg)',
          animation: 'gridScroll 6s linear infinite',
        }}
      />

      {/* ── 4. Glowing Neon Ambient Orbs ── */}
      <div style={{
        position: 'absolute', top: '15%', left: '10%', width: 350, height: 350,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)',
        filter: 'blur(40px)', animation: 'floatOrb 10s ease-in-out infinite alternate',
      }} />

      <div style={{
        position: 'absolute', top: '60%', right: '8%', width: 400, height: 400,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,163,0.1) 0%, transparent 70%)',
        filter: 'blur(50px)', animation: 'floatOrb 14s ease-in-out infinite alternate-reverse',
      }} />

      {/* ── 5. Drifting Cyber Particles ── */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i * 19) % 100}%`,
              top: `${(i * 23) % 100}%`,
              width: i % 2 === 0 ? 3 : 2,
              height: i % 2 === 0 ? 3 : 2,
              borderRadius: '50%',
              background: i % 2 === 0 ? '#00E5FF' : '#00FFA3',
              boxShadow: `0 0 10px ${i % 2 === 0 ? '#00E5FF' : '#00FFA3'}`,
              animation: `particleFloat ${6 + (i % 5) * 2}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* ── 6. Subtle CRT Scanlines Overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)',
          opacity: 0.7,
        }}
      />

      <style>{`
        @keyframes gridScroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 60px; }
        }
        @keyframes floatOrb {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, 30px) scale(1.15); }
        }
        @keyframes particleFloat {
          0% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { opacity: 0.9; }
          100% { transform: translateY(-40px) scale(1.3); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
