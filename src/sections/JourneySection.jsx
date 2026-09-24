import React, { useState, useRef, useEffect } from 'react';
import { animate, stagger } from 'animejs';
import SectionHeader from '../components/cyber/SectionHeader.jsx';
import TechBadge from '../components/cyber/TechBadge.jsx';
import CyberButton from '../components/cyber/CyberButton.jsx';
import { journey } from '../data/journey.js';

// ─── 3D Interactive Journey Card Component ─────────────────────────────────
function Journey3DCard({ item, index, onSelect }) {
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
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // rotateY angle
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20; // rotateX angle
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Status visual badge styling
  const isCurrent = item.status.includes('CURRENT');
  const isFuture = item.status.includes('FUTURE') || item.status.includes('EXPLORING');
  
  const statusColor = isCurrent 
    ? '#00FFA3' 
    : isFuture 
    ? '#BD00FF' 
    : '#00E5FF';

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        if (!isSpinning && onSelect) {
          onSelect(item);
        }
      }}
      className="journey-3d-card-wrapper journey-anim-item"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
      }}
    >
      <div
        className={`journey-3d-card ${isSpinning ? 'is-spinning-3d' : ''}`}
        style={{
          position: 'relative',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: isSpinning ? 'none' : `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) ${isHovered ? 'scale(1.03)' : 'scale(1)'}`,
          transition: isSpinning ? 'none' : 'transform 0.2s ease-out, box-shadow 0.3s ease',
          background: 'rgba(10, 15, 30, 0.75)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${isHovered ? statusColor : 'rgba(0, 229, 255, 0.2)'}`,
          borderRadius: '12px',
          padding: 'var(--space-24)',
          boxShadow: isHovered
            ? `0 20px 40px rgba(0,0,0,0.6), 0 0 25px ${statusColor}44`
            : '0 10px 30px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Top Header Row */}
        <div style={{ transform: 'translateZ(35px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-16)' }}>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.85rem', 
            color: 'var(--text-muted)',
            letterSpacing: '0.1em'
          }}>
            [ MILESTONE 0{index + 1} ]
          </span>

          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            padding: '4px 10px',
            borderRadius: '20px',
            background: `${statusColor}15`,
            color: statusColor,
            border: `1px solid ${statusColor}44`,
            letterSpacing: '0.05em',
            boxShadow: isHovered ? `0 0 10px ${statusColor}66` : 'none'
          }}>
            {item.status}
          </span>
        </div>

        {/* Milestone Title & Description */}
        <div style={{ transform: 'translateZ(45px)', flexGrow: 1, marginBottom: 'var(--space-20)' }}>
          <h3 style={{ 
            fontSize: '1.4rem', 
            color: isHovered ? '#FFF' : 'var(--text-primary)', 
            marginBottom: 'var(--space-12)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusColor, boxShadow: `0 0 10px ${statusColor}` }}></span>
            {item.title}
          </h3>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '0.92rem', 
            lineHeight: 1.6,
          }}>
            {item.description}
          </p>
        </div>

        {/* Tech Badges */}
        <div style={{ transform: 'translateZ(30px)', marginBottom: 'var(--space-20)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-8)' }}>
          {item.technologies.map((tech, i) => (
            <TechBadge key={i} tech={tech} />
          ))}
        </div>

        {/* Action Button Footer */}
        <div style={{ transform: 'translateZ(40px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--space-12)', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            CLICK TO EXPAND HUD
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onSelect) onSelect(item);
            }}
            style={{
              background: `${statusColor}18`,
              border: `1px solid ${statusColor}`,
              color: statusColor,
              padding: '6px 14px',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            [ INSPECT_NODE ]
          </button>
        </div>

      </div>
    </div>
  );
}

export default function JourneySection({ onSelectJourney, hideDomCards = false }) {
  const sectionRef = useRef(null);

  // anime.js spring entrance animation
  useEffect(() => {
    if (hideDomCards) return;
    try {
      animate('.journey-anim-item', {
        opacity: [0, 1],
        translateY: [40, 0],
        scale: [0.95, 1],
        delay: stagger(120),
        duration: 800,
        easing: 'easeOutElastic(1, 0.6)'
      });
    } catch (e) {
      console.log('anime.js journey animation fallback', e);
    }
  }, [hideDomCards]);

  if (hideDomCards) {
    return (
      <section className="journey-section" id="journey" style={{ padding: 'var(--space-96) 0', minHeight: '100vh', display: 'flex', alignItems: 'flex-start', pointerEvents: 'none' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, pointerEvents: 'none', paddingTop: 'var(--space-32)' }}>
          <SectionHeader number="05" title="TECHNICAL_JOURNEY" align="right" />
        </div>
      </section>
    );
  }

  return (
    <section className="journey-section" id="journey" ref={sectionRef} style={{ padding: 'var(--space-96) 0', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <SectionHeader number="05" title="TECHNICAL_JOURNEY" />
        
        <p style={{ 
          maxWidth: '680px', 
          margin: '-var(--space-24) 0 var(--space-48) 0', 
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          lineHeight: 1.6
        }}>
          Evolutionary trajectory from core web application development to low-level systems, network protocols, and cybersecurity engineering.
        </p>

        {/* Grid layout for 3D cards */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: 'var(--space-32)',
            position: 'relative',
            zIndex: 2
          }}
        >
          {journey.map((item, index) => (
            <Journey3DCard 
              key={item.id} 
              item={item} 
              index={index} 
              onSelect={onSelectJourney} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
