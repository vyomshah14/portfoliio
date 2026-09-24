import React, { useEffect, useRef } from 'react';
import LetterGlitch from './LetterGlitch.jsx';

export default function Interactive3DCyberMatrix() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Ultra-lightweight 3D Nodes Loop (Capped at 15 nodes for 120 FPS performance)
  useEffect(() => {
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
    window.addEventListener('resize', handleResize, { passive: true });

    const maxZ = 1200;
    const fov = 400;
    const nodeCount = 15;

    const nodes = Array.from({ length: nodeCount }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * maxZ + 10,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: (Math.random() - 0.5) * 0.6,
      color: ['#00FFA3', '#00E5FF', '#BD00FF'][Math.floor(Math.random() * 3)],
    }));

    const render = () => {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < nodeCount; i++) {
        const n1 = nodes[i];

        n1.x += n1.vx;
        n1.y += n1.vy;
        n1.z += n1.vz;

        if (Math.abs(n1.x) > width) n1.vx *= -1;
        if (Math.abs(n1.y) > height) n1.vy *= -1;
        if (n1.z < 10 || n1.z > maxZ) n1.vz *= -1;

        const k = fov / n1.z;
        const px = n1.x * k + cx;
        const py = n1.y * k + cy;
        const radius = Math.max(1.2, (1 - n1.z / maxZ) * 3);
        const alpha = Math.min(0.5, (1 - n1.z / maxZ) * 0.8);

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = n1.color;
          ctx.globalAlpha = alpha;
          ctx.fill();

          for (let j = i + 1; j < nodeCount; j++) {
            const n2 = nodes[j];
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dz = n1.z - n2.z;
            const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist3D < 300) {
              const k2 = fov / n2.z;
              const px2 = n2.x * k2 + cx;
              const py2 = n2.y * k2 + cy;

              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(px2, py2);
              ctx.strokeStyle = n1.color;
              ctx.lineWidth = 0.8;
              ctx.globalAlpha = (1 - dist3D / 300) * alpha * 0.3;
              ctx.stroke();
            }
          }
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      
      {/* Layer 1: GPU Accelerated Cosmic Dark Slate Base with Soft Aurora Orbs */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 25%, #081a33 0%, #030d22 55%, #01050e 100%)' }}>
        
        {/* Hardware Accelerated Glowing Orbs */}
        <div style={{
          position: 'absolute', top: '5%', left: '10%', width: '45vw', height: '45vw',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 229, 255, 0.12) 0%, transparent 65%)',
          filter: 'blur(70px)', willChange: 'transform', animation: 'auroraGlow1 14s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '5%', width: '50vw', height: '50vw',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(189, 0, 255, 0.1) 0%, transparent 65%)',
          filter: 'blur(80px)', willChange: 'transform', animation: 'auroraGlow2 18s ease-in-out infinite alternate-reverse',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', left: '25%', width: '40vw', height: '40vw',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 255, 163, 0.1) 0%, transparent 65%)',
          filter: 'blur(75px)', willChange: 'transform', animation: 'auroraGlow3 12s ease-in-out infinite alternate',
        }} />

        {/* Layer 2: 3D Wireframe Cyber Grid Floor at Bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '-25vh',
            left: '-40vw',
            width: '180vw',
            height: '100vh',
            backgroundImage: `
              linear-gradient(to right, rgba(0, 229, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 255, 163, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            transformOrigin: '50% 100%',
            transform: 'perspective(550px) rotateX(68deg)',
            willChange: 'transform',
            animation: 'cyberGridFloorScroll 8s linear infinite',
            opacity: 0.45,
          }}
        />

        {/* Layer 3: Throttled Low-Opacity LetterGlitch Vignette (glitchSpeed: 120ms for low CPU usage) */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.12 }}>
          <LetterGlitch glitchSpeed={120} centerVignette={false} outerVignette={true} glitchColors={['#00E5FF', '#00FFA3', '#061a33', '#030c1e']} />
        </div>

        {/* Layer 4: Interactive 3D Nodes Canvas */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />

        {/* Layer 5: CRT Scanlines Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 3px)',
            opacity: 0.4,
          }}
        />
      </div>

      <style>{`
        @keyframes auroraGlow1 {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.7; }
          100% { transform: translate3d(50px, 40px, 0) scale(1.15); opacity: 0.9; }
        }
        @keyframes auroraGlow2 {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.6; }
          100% { transform: translate3d(-50px, 50px, 0) scale(1.2); opacity: 0.85; }
        }
        @keyframes auroraGlow3 {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.65; }
          100% { transform: translate3d(40px, -40px, 0) scale(1.1); opacity: 0.85; }
        }
        @keyframes cyberGridFloorScroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 64px; }
        }
      `}</style>
    </div>
  );
}
