import React, { useEffect, useState } from 'react';

export default function CyberCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide default cursor on desktop for custom cyber reticle
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, .cyber-card, .project-3d-card, .skill-card-3d, .journey-3d-card, [role="button"]');
      setIsHovered(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.05s ease-out',
      }}
    >
      {/* Outer Reticle Ring */}
      <div
        style={{
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          borderRadius: '50%',
          border: `1.5px dashed ${isHovered ? '#00FFA3' : 'rgba(0, 229, 255, 0.6)'}`,
          boxShadow: `0 0 ${isHovered ? '15px #00FFA3' : '8px rgba(0, 229, 255, 0.4)'}`,
          transition: 'all 0.15s ease-out',
          animation: 'cursorSpin 8s linear infinite',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Inner Crosshair Dot */}
        <div
          style={{
            width: isHovered ? 8 : 4,
            height: isHovered ? 8 : 4,
            borderRadius: '50%',
            background: isHovered ? '#00FFA3' : '#00E5FF',
            boxShadow: `0 0 10px ${isHovered ? '#00FFA3' : '#00E5FF'}`,
            transition: 'all 0.15s ease-out',
          }}
        />
      </div>

      {/* Coordinate HUD Readout */}
      <div
        style={{
          position: 'absolute',
          left: '26px',
          top: '20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: isHovered ? '#00FFA3' : 'rgba(0, 229, 255, 0.8)',
          background: 'rgba(2, 6, 16, 0.85)',
          border: `1px solid ${isHovered ? 'rgba(0, 255, 163, 0.4)' : 'rgba(0, 229, 255, 0.25)'}`,
          padding: '2px 6px',
          borderRadius: '3px',
          whiteSpace: 'nowrap',
          letterSpacing: '0.08em',
          backdropFilter: 'blur(4px)',
          opacity: 0.85,
        }}
      >
        X:{pos.x} Y:{pos.y}
      </div>

      <style>{`
        @keyframes cursorSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
