import React, { useState, useRef, useEffect } from 'react';
import { animate, stagger } from 'animejs';
import { experience } from '../data/experience.js';
import SectionHeader from '../components/cyber/SectionHeader.jsx';
import TechBadge from '../components/cyber/TechBadge.jsx';
import SystemLabel from '../components/cyber/SystemLabel.jsx';

// ─── 3D Interactive Experience Card Component ──────────────────────────────
function Experience3DCard({ item, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const holdTimerRef = useRef(null);

  const triggerSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 5500);
  };

  const handleMouseDown = () => {
    holdTimerRef.current = setTimeout(() => {
      triggerSpin();
    }, 180);
  };

  const handleMouseUp = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current || isSpinning) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18; // rotateY angle
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18; // rotateX angle
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="experience-3d-card-wrapper exp-anim-item"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        position: 'relative',
        marginBottom: 'var(--space-48)',
      }}
    >
      {/* 3D Timeline Pulse Marker */}
      <div 
        style={{ 
          position: 'absolute', 
          left: 'calc(var(--space-32) * -1 - 8px)', 
          top: '24px', 
          width: '16px', 
          height: '16px', 
          borderRadius: '50%', 
          background: isHovered ? '#00FFA3' : 'var(--accent-primary)', 
          border: '3px solid var(--bg-primary)', 
          boxShadow: isHovered ? '0 0 20px #00FFA3' : '0 0 12px var(--accent-glow)',
          transition: 'all 0.3s ease',
          zIndex: 3
        }} 
      />

      <div
        className={`experience-3d-card ${isSpinning ? 'is-spinning-3d' : ''}`}
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: isSpinning ? 'none' : `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
          transition: isSpinning ? 'none' : 'transform 0.2s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
          background: 'rgba(10, 15, 30, 0.78)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${isHovered ? 'var(--accent-primary)' : 'rgba(0, 229, 255, 0.2)'}`,
          borderRadius: '12px',
          padding: 'var(--space-32)',
          boxShadow: isHovered
            ? '0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(0, 229, 255, 0.3)'
            : '0 10px 30px rgba(0,0,0,0.4)',
        }}
      >
        {/* Header Row: Role & Period */}
        <div style={{ transform: 'translateZ(35px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-16)', marginBottom: 'var(--space-16)' }}>
          <div>
            <h3 style={{ 
              fontSize: '1.6rem', 
              color: isHovered ? '#FFF' : 'var(--text-primary)', 
              marginBottom: 'var(--space-4)',
              fontWeight: 600,
              letterSpacing: '-0.01em'
            }}>
              {item.role}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>@</span>
              <SystemLabel text={item.company} style={{ color: 'var(--accent-primary)', fontSize: '0.95rem' }} />
            </div>
          </div>

          <div style={{
            background: 'rgba(0, 229, 255, 0.1)',
            border: '1px solid var(--accent-primary)',
            padding: '6px 14px',
            borderRadius: '20px',
            boxShadow: isHovered ? '0 0 15px rgba(0, 229, 255, 0.4)' : 'none',
            transition: 'box-shadow 0.3s ease'
          }}>
            <SystemLabel text={item.period} icon="[ PERIOD ]" style={{ color: 'var(--accent-primary)', fontSize: '0.82rem' }} />
          </div>
        </div>

        {/* Description */}
        <p style={{ transform: 'translateZ(40px)', color: 'var(--text-secondary)', marginBottom: 'var(--space-20)', lineHeight: 1.65, fontSize: '0.98rem' }}>
          {item.description}
        </p>

        {/* Highlight Bullets */}
        <div style={{ transform: 'translateZ(45px)', marginBottom: 'var(--space-24)' }}>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 'var(--space-12)', letterSpacing: '0.08em' }}>
            // KEY_RESPONSIBILITIES & DELIVERABLES
          </h4>
          <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {item.highlights.map((highlight, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--text-primary)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', lineHeight: 1 }}>⚡</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Footer Badges */}
        <div style={{ transform: 'translateZ(30px)', display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap', paddingTop: 'var(--space-16)', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {item.technologies.map((tech, idx) => (
            <TechBadge key={idx} tech={tech} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    try {
      animate('.exp-anim-item', {
        opacity: [0, 1],
        translateX: [-30, 0],
        delay: stagger(150),
        duration: 800,
        easing: 'easeOutQuart'
      });
    } catch (e) {
      console.log('anime.js experience animation fallback', e);
    }
  }, []);

  return (
    <section className="experience-section" id="experience" ref={sectionRef} style={{ padding: 'var(--space-96) 0', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <SectionHeader number="06" title="SYSTEM_EXPERIENCE" />

        <p style={{ 
          maxWidth: '680px', 
          margin: '-var(--space-24) 0 var(--space-48) 0', 
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          lineHeight: 1.6
        }}>
          Industry experience and practical roles in operational workflows, team coordination, and system process optimizations.
        </p>

        {/* Timeline Container */}
        <div 
          className="timeline" 
          style={{ 
            position: 'relative', 
            paddingLeft: 'var(--space-32)', 
            borderLeft: '2px solid rgba(0, 229, 255, 0.25)',
            boxShadow: '-4px 0 20px rgba(0, 229, 255, 0.1)',
            marginLeft: 'var(--space-16)'
          }}
        >
          {experience.map((item, index) => (
            <Experience3DCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
