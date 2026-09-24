import React, { useState, useEffect, useRef } from 'react';
import CyberGridBackground from './CyberGridBackground.jsx';
import MatrixRainBackground from './MatrixRainBackground.jsx';
import LetterGlitch from './LetterGlitch.jsx';

export default function DynamicCyberBackground({ mode, onModeChange }) {
  const [currentMode, setCurrentMode] = useState(() => {
    return mode || localStorage.getItem('cyber-bg-mode') || 'aurora';
  });

  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (mode && mode !== currentMode) {
      setCurrentMode(mode);
    }
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('cyber-bg-mode', currentMode);
    if (onModeChange) onModeChange(currentMode);
  }, [currentMode, onModeChange]);

  // Expose global window method to trigger mode change
  useEffect(() => {
    window.__setBgMode = (newMode) => {
      if (['aurora', 'particles', 'matrix', 'grid3d'].includes(newMode)) {
        setCurrentMode(newMode);
      }
    };
  }, []);

  // Track mouse for interactive particle wave
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ── Particle Wave Canvas Animation (For 'particles' mode) ──
  useEffect(() => {
    if (currentMode !== 'particles') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create 80 interactive particle nodes
    const particleCount = 80;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: Math.random() * 2.5 + 1.5,
      color: ['#00FFA3', '#00E5FF', '#BD00FF', '#ffffff'][Math.floor(Math.random() * 4)],
    }));

    const render = () => {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p1.color;
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.5 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        const mdx = p1.x - mouseRef.current.x;
        const mdy = p1.y - mouseRef.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 220) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(0, 255, 163, ${0.75 * (1 - mdist / 220)})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [currentMode]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      
      {/* ── MODE 1: AURORA (Vivid Glowing Aurora Orbs & SVG Cyber Circuit Streams) ── */}
      {currentMode === 'aurora' && (
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 20%, #0b2447 0%, #041026 50%, #020612 100%)' }}>
          
          {/* Animated Vivid Glowing Orbs */}
          <div style={{
            position: 'absolute', top: '5%', left: '10%', width: '50vw', height: '50vw',
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 229, 255, 0.35) 0%, transparent 70%)',
            filter: 'blur(70px)', animation: 'auroraPulse1 12s ease-in-out infinite alternate',
          }} />
          <div style={{
            position: 'absolute', top: '40%', right: '5%', width: '55vw', height: '55vw',
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(189, 0, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)', animation: 'auroraPulse2 15s ease-in-out infinite alternate-reverse',
          }} />
          <div style={{
            position: 'absolute', bottom: '0%', left: '25%', width: '45vw', height: '45vw',
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 255, 163, 0.28) 0%, transparent 70%)',
            filter: 'blur(75px)', animation: 'auroraPulse3 10s ease-in-out infinite alternate',
          }} />

          {/* SVG Cyber Circuit Traces with Pulsing Electricity */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.55 }}>
            <pattern id="circuitGrid" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 0 60 L 40 60 L 60 40 L 120 40" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="8,8" />
              <path d="M 60 0 L 60 40 L 80 60 L 80 120" fill="none" stroke="#00FFA3" strokeWidth="1.2" strokeDasharray="5,5" />
              <circle cx="60" cy="40" r="4" fill="#00FFA3" />
              <circle cx="80" cy="60" r="4" fill="#00E5FF" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuitGrid)" />
          </svg>

          {/* LetterGlitch Overlay */}
          <LetterGlitch glitchSpeed={60} centerVignette={false} outerVignette={true} glitchColors={['#00FFA3', '#00E5FF', '#BD00FF', '#092340']} />
        </div>
      )}

      {/* ── MODE 2: PARTICLES (React Bits Fluid Wave & Interactive Node Constellation) ── */}
      {currentMode === 'particles' && (
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, #0c274c 0%, #04122d 60%, #020612 100%)' }}>
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
          <LetterGlitch glitchSpeed={65} centerVignette={false} outerVignette={true} glitchColors={['#00FFA3', '#00E5FF', '#61b3dc']} />
        </div>
      )}

      {/* ── MODE 3: MATRIX (Boosted Matrix Rain & LetterGlitch Canvas) ── */}
      {currentMode === 'matrix' && (
        <div style={{ position: 'absolute', inset: 0, background: '#030a1c' }}>
          <MatrixRainBackground />
          <LetterGlitch glitchSpeed={40} centerVignette={false} outerVignette={true} glitchColors={['#00FFA3', '#00FFA3', '#00E5FF', '#BD00FF', '#030a1c']} />
        </div>
      )}

      {/* ── MODE 4: GRID3D (Cyber Grid Floor & 3D Wireframe Perspective) ── */}
      {currentMode === 'grid3d' && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <CyberGridBackground />
          <LetterGlitch glitchSpeed={55} centerVignette={false} outerVignette={true} glitchColors={['#00E5FF', '#00FFA3', '#BD00FF']} />
        </div>
      )}

      {/* CSS Keyframes for Aurora Pulse */}
      <style>{`
        @keyframes auroraPulse1 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          100% { transform: translate(70px, 50px) scale(1.3); opacity: 1; }
        }
        @keyframes auroraPulse2 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.7; }
          100% { transform: translate(-60px, 60px) scale(1.35); opacity: 1; }
        }
        @keyframes auroraPulse3 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.75; }
          100% { transform: translate(50px, -50px) scale(1.25); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Floating Live Cyber BG Mode Switcher Widget ─────────────────────────────
export function CyberBgSwitcherWidget({ currentMode, onSelectMode }) {
  const [open, setOpen] = useState(false);

  const modes = [
    { id: 'aurora', label: '🌌 AURORA ORBS', desc: 'Glowing Lights & Cyber Circuit Streams' },
    { id: 'particles', label: '✨ PARTICLES WAVE', desc: 'Interactive Node Constellation' },
    { id: 'matrix', label: '💚 MATRIX RAIN', desc: 'Dense Digital Matrix Code Stream' },
    { id: 'grid3d', label: '📐 3D PERSPECTIVE', desc: 'Wireframe Cyber Grid Floor' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9998,
        fontFamily: 'var(--font-mono, monospace)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Expanded Mode Selector Panel */}
        {open && (
          <div
            style={{
              background: 'rgba(3, 10, 24, 0.92)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0, 229, 255, 0.35)',
              borderRadius: '12px',
              padding: '12px 14px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 25px rgba(0, 229, 255, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              minWidth: '240px',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <div style={{ fontSize: '0.72rem', color: '#00FFA3', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>◈ SELECT BACKGROUND ENGINE</span>
              <button
                onClick={() => setOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '1rem' }}
              >
                ×
              </button>
            </div>

            {modes.map((m) => {
              const isActive = currentMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    onSelectMode(m.id);
                    if (window.__setBgMode) window.__setBgMode(m.id);
                  }}
                  style={{
                    background: isActive ? 'linear-gradient(135deg, rgba(0, 255, 163, 0.25), rgba(0, 229, 255, 0.25))' : 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${isActive ? '#00FFA3' : 'rgba(0, 229, 255, 0.2)'}`,
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: isActive ? '#00FFA3' : '#F5F7FA',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 0 14px rgba(0, 255, 163, 0.3)' : 'none',
                  }}
                >
                  <div style={{ fontSize: '0.78rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{m.label}</span>
                    {isActive && <span style={{ fontSize: '0.65rem', background: '#00FFA3', color: '#000', padding: '1px 5px', borderRadius: '3px' }}>ACTIVE</span>}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '2px' }}>
                    {m.desc}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Floating Toggle Button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          style={{
            background: 'rgba(3, 10, 24, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 229, 255, 0.4)',
            color: '#00E5FF',
            padding: '8px 16px',
            borderRadius: '24px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            letterSpacing: '0.06em',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 15px rgba(0, 229, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#00FFA3';
            e.currentTarget.style.color = '#00FFA3';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 163, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.4)';
            e.currentTarget.style.color = '#00E5FF';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5), 0 0 15px rgba(0, 229, 255, 0.25)';
          }}
        >
          <span>🎨</span>
          <span>BG ENGINE: <strong style={{ color: '#00FFA3' }}>{currentMode.toUpperCase()}</strong></span>
          <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>[ SWITCH ]</span>
        </button>
      </div>
    </div>
  );
}
