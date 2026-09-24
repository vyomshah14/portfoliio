import React, { useState, useRef, useEffect } from 'react';
import { animate, stagger } from 'animejs';
import { education, certifications } from '../data/education.js';
import SectionHeader from '../components/cyber/SectionHeader.jsx';
import CyberButton from '../components/cyber/CyberButton.jsx';
import SystemLabel from '../components/cyber/SystemLabel.jsx';
import TechBadge from '../components/cyber/TechBadge.jsx';

// ─── 3D Academic Card ───────────────────────────────────────────────────────
function Academic3DCard({ item }) {
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
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
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
      className="academic-3d-card-wrapper edu-anim-item"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className={`academic-3d-card ${isSpinning ? 'is-spinning-3d' : ''}`}
        style={{
          position: 'relative',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: isSpinning ? 'none' : `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) ${isHovered ? 'scale(1.03)' : 'scale(1)'}`,
          transition: isSpinning ? 'none' : 'transform 0.2s ease-out, box-shadow 0.3s ease',
          background: 'rgba(10, 15, 30, 0.78)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${isHovered ? '#00FFA3' : 'rgba(0, 229, 255, 0.2)'}`,
          borderRadius: '12px',
          padding: 'var(--space-24)',
          boxShadow: isHovered
            ? '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(0, 255, 163, 0.3)'
            : '0 10px 30px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ transform: 'translateZ(30px)', marginBottom: 'var(--space-12)' }}>
          <SystemLabel text={item.period} icon="[ PERIOD ]" style={{ color: '#00FFA3' }} />
        </div>

        <div style={{ transform: 'translateZ(45px)', flexGrow: 1, marginBottom: 'var(--space-16)' }}>
          <h4 style={{ fontSize: '1.3rem', color: isHovered ? '#FFF' : 'var(--text-primary)', marginBottom: 'var(--space-6)', fontWeight: 600 }}>
            {item.degree}
          </h4>
          <p style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginBottom: 'var(--space-12)' }}>
            📍 {item.institution}
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {item.description}
          </p>
        </div>

        {item.highlights && item.highlights.length > 0 && (
          <div style={{ transform: 'translateZ(35px)', display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap', paddingTop: 'var(--space-12)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {item.highlights.map((h, i) => (
              <TechBadge key={i} tech={h} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 3D Certification Card ─────────────────────────────────────────────────
function Cert3DCard({ cert }) {
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
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const isMastercard = cert.issuer.toLowerCase().includes('mastercard');

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="cert-3d-card-wrapper edu-anim-item"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className={`cert-3d-card ${isSpinning ? 'is-spinning-3d' : ''}`}
        style={{
          position: 'relative',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: isSpinning ? 'none' : `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) ${isHovered ? 'scale(1.03)' : 'scale(1)'}`,
          transition: isSpinning ? 'none' : 'transform 0.2s ease-out, box-shadow 0.3s ease',
          background: 'rgba(10, 15, 30, 0.78)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${isHovered ? (isMastercard ? '#FF5500' : 'var(--accent-primary)') : 'rgba(0, 229, 255, 0.2)'}`,
          borderRadius: '12px',
          padding: 'var(--space-24)',
          boxShadow: isHovered
            ? `0 20px 40px rgba(0,0,0,0.6), 0 0 25px ${isMastercard ? 'rgba(255, 85, 0, 0.4)' : 'rgba(0, 229, 255, 0.3)'}`
            : '0 10px 30px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ transform: 'translateZ(30px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-12)' }}>
            <SystemLabel text={cert.issuer.toUpperCase()} style={{ color: isMastercard ? '#FF5500' : 'var(--accent-primary)' }} />
            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
              {cert.date}
            </span>
          </div>

          <div style={{ transform: 'translateZ(45px)', marginBottom: 'var(--space-16)' }}>
            <h4 style={{ fontSize: '1.2rem', color: isHovered ? '#FFF' : 'var(--text-primary)', marginBottom: 'var(--space-8)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📜</span> {cert.title}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55 }}>
              {cert.description}
            </p>
          </div>
        </div>

        <div style={{ transform: 'translateZ(35px)', marginTop: 'var(--space-16)', paddingTop: 'var(--space-12)', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
          <CyberButton 
            href={`/${cert.link}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            variant="primary" 
            style={{ width: '100%', justifyContent: 'center' }}
          >
            [ VIEW_CREDENTIAL ]
          </CyberButton>
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  const sectionRef = useRef(null);

  useEffect(() => {
    try {
      animate('.edu-anim-item', {
        opacity: [0, 1],
        translateY: [35, 0],
        delay: stagger(100),
        duration: 750,
        easing: 'easeOutQuart'
      });
    } catch (e) {
      console.log('anime.js education animation fallback', e);
    }
  }, []);

  return (
    <section className="education-section" id="education" ref={sectionRef} style={{ padding: 'var(--space-96) 0', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <SectionHeader number="07" title="KNOWLEDGE_BASE" />

        {/* Academic Records */}
        <div style={{ marginBottom: 'var(--space-64)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-32)' }}>
            <div style={{ width: '12px', height: '12px', background: '#00FFA3', borderRadius: '2px', boxShadow: '0 0 10px #00FFA3' }}></div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '0.05em' }}>
              ACADEMIC_RECORDS
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-32)' }}>
            {education.map((item) => (
              <Academic3DCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-32)' }}>
            <div style={{ width: '12px', height: '12px', background: 'var(--accent-primary)', borderRadius: '2px', boxShadow: '0 0 10px var(--accent-glow)' }}></div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '0.05em' }}>
              VERIFIED_CERTIFICATIONS & CREDENTIALS
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-28)' }}>
            {certifications.map((cert, index) => (
              <Cert3DCard key={index} cert={cert} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
