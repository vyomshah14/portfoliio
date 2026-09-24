import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animate, stagger } from 'animejs';
import { projects } from '../data/projects.js';
import SectionHeader from '../components/cyber/SectionHeader.jsx';
import StatusBadge from '../components/cyber/StatusBadge.jsx';
import TechBadge from '../components/cyber/TechBadge.jsx';
import CyberButton from '../components/cyber/CyberButton.jsx';

// ─── 3D Interactive Project Card Component ──────────────────────────────────
function Project3DCard({ project, idx, onSelect }) {
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
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 22; // rotateY angle
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -22; // rotateX angle
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const isCyber = project.category === 'cybersecurity';

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        if (!isSpinning) onSelect(project);
      }}
      className="project-3d-card-wrapper"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className={`project-3d-card ${isSpinning ? 'is-spinning-3d' : ''}`}
        style={{
          position: 'relative',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: isSpinning ? 'none' : `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) ${isHovered ? 'scale(1.04)' : 'scale(1)'}`,
          transition: isSpinning ? 'none' : (isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'),
          background: 'linear-gradient(145deg, rgba(6, 18, 36, 0.92) 0%, rgba(2, 8, 16, 0.96) 100%)',
          border: `1px solid ${isHovered || isSpinning ? (isCyber ? '#00FFA3' : '#00E5FF') : 'rgba(0, 229, 255, 0.2)'}`,
          borderRadius: 12,
          padding: 26,
          backdropFilter: 'blur(16px)',
          boxShadow: isSpinning
            ? '0 0 60px rgba(0, 229, 255, 0.6), 0 0 100px rgba(0, 255, 163, 0.4)'
            : (isHovered
              ? `0 30px 70px rgba(0, 0, 0, 0.85), 0 0 40px ${isCyber ? 'rgba(0, 255, 163, 0.3)' : 'rgba(0, 229, 255, 0.3)'}, inset 0 1px 0 rgba(0,229,255,0.4)`
              : '0 12px 35px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(0,229,255,0.1)'),
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          cursor: isSpinning ? 'wait' : 'pointer',
          overflow: 'hidden',
        }}
      >
        {/* Top glowing scanline */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: isCyber
            ? 'linear-gradient(90deg, transparent, #00FFA3, transparent)'
            : 'linear-gradient(90deg, transparent, #00E5FF, transparent)',
          transform: 'translateZ(10px)',
        }} />

        {/* 3D Corner Bracket Accents */}
        {[
          { top: 6, left: 6, borderTop: `2px solid ${isCyber ? '#00FFA3' : '#00E5FF'}`, borderLeft: `2px solid ${isCyber ? '#00FFA3' : '#00E5FF'}` },
          { top: 6, right: 6, borderTop: `2px solid ${isCyber ? '#00FFA3' : '#00E5FF'}`, borderRight: `2px solid ${isCyber ? '#00FFA3' : '#00E5FF'}` },
          { bottom: 6, left: 6, borderBottom: `2px solid ${isCyber ? '#00FFA3' : '#00E5FF'}`, borderLeft: `2px solid ${isCyber ? '#00FFA3' : '#00E5FF'}` },
          { bottom: 6, right: 6, borderBottom: `2px solid ${isCyber ? '#00FFA3' : '#00E5FF'}`, borderRight: `2px solid ${isCyber ? '#00FFA3' : '#00E5FF'}` },
        ].map((b, i) => (
          <div key={i} style={{ position: 'absolute', width: 12, height: 12, filter: `drop-shadow(0 0 6px ${isCyber ? '#00FFA3' : '#00E5FF'})`, transform: 'translateZ(25px)', ...b }} />
        ))}

        {/* 3D Floating Layer 1: Category Badge & Status (translateZ 45px) */}
        <div style={{ transform: 'translateZ(45px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.4rem', filter: 'drop-shadow(0 0 8px #00E5FF)' }}>{project.icon || '💻'}</span>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.72rem',
              color: isCyber ? '#00FFA3' : '#00E5FF',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              [{project.category}]
            </span>
          </div>

          <StatusBadge status={project.id === 'netintel' || project.id === 'cyberlab-3d' ? 'IN DEVELOPMENT' : 'ACTIVE'} />
        </div>

        {/* 3D Floating Layer 2: Title & Description (translateZ 40px) */}
        <div style={{ transform: 'translateZ(40px)', flex: 1, marginBottom: 18 }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: '#FFF',
            marginBottom: 8,
            letterSpacing: '0.02em',
            textShadow: isHovered ? '0 0 15px rgba(0,229,255,0.4)' : 'none',
          }}>
            {project.title}
          </h3>

          <p style={{
            fontSize: '0.92rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            margin: 0,
          }}>
            {project.description}
          </p>
        </div>

        {/* 3D Floating Layer 3: Technologies (translateZ 30px) */}
        <div style={{ transform: 'translateZ(30px)', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.7rem',
                  color: isCyber ? '#00FFA3' : '#00E5FF',
                  background: isCyber ? 'rgba(0, 255, 163, 0.08)' : 'rgba(0, 229, 255, 0.08)',
                  padding: '4px 10px',
                  borderRadius: 4,
                  border: `1px solid ${isCyber ? 'rgba(0, 255, 163, 0.2)' : 'rgba(0, 229, 255, 0.2)'}`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 3D Floating Layer 4: Buttons (translateZ 35px) */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            transform: 'translateZ(35px)',
            display: 'flex',
            gap: 12,
            paddingTop: 14,
            borderTop: '1px solid rgba(0, 229, 255, 0.15)',
          }}
        >
          {project.github && (
            <CyberButton href={project.github} target="_blank" rel="noopener noreferrer" variant="technical">
              SOURCE →
            </CyberButton>
          )}
          {project.live && (
            <CyberButton href={project.live} target="_blank" rel="noopener noreferrer" variant="primary">
              LIVE DEMO →
            </CyberButton>
          )}
          {!project.github && !project.live && (
            <CyberButton onClick={() => onSelect(project)} variant="technical">
              INSPECT HUD →
            </CyberButton>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Main Projects Section Component ─────────────────────────────────────────
export default function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = [
    { id: 'all', label: '00 // ALL SYSTEMS' },
    { id: 'cybersecurity', label: '01 // CYBERSECURITY' },
    { id: 'web', label: '02 // WEB APPLICATIONS' },
    { id: 'backend', label: '03 // BACKEND & SYSTEMS' },
  ];

  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  // Anime.js spring entrance animation when filter category changes
  useEffect(() => {
    animate('.project-3d-card', {
      opacity: [0, 1],
      translateY: [45, 0],
      rotateX: [15, 0],
      scale: [0.93, 1],
      delay: stagger(75),
      duration: 800,
      ease: 'outElastic(1, .8)',
    });
  }, [filter]);

  const handleSelectProject = (project) => {
    setActiveModalProject(project);
    if (onSelectProject) onSelectProject(project);
  };

  return (
    <section
      className="projects-section"
      id="projects"
      style={{
        padding: '120px 0',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 2,
        pointerEvents: 'auto',
      }}
    >
      <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>

        {/* Section Header */}
        <SectionHeader number="04" title="PROJECT_MATRIX" />

        {/* Category Filter Tabs */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              style={{
                padding: '12px 22px',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: filter === cat.id ? 'rgba(0, 229, 255, 0.15)' : 'rgba(5, 14, 28, 0.75)',
                border: `1px solid ${filter === cat.id ? '#00E5FF' : 'rgba(0, 229, 255, 0.18)'}`,
                borderRadius: 6,
                color: filter === cat.id ? '#00E5FF' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: filter === cat.id ? '0 0 20px rgba(0,229,255,0.3)' : 'none',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3D Projects Cards Grid (Anime.js + Mouse 3D Depth Layering) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: 28,
            marginBottom: 56,
          }}
        >
          {filteredProjects.map((project, idx) => (
            <Project3DCard
              key={project.id}
              project={project}
              idx={idx}
              onSelect={handleSelectProject}
            />
          ))}
        </div>

        {/* Interactive 3D HUD Project Modal */}
        <AnimatePresence>
          {activeModalProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'rgba(2, 6, 14, 0.88)',
                backdropFilter: 'blur(16px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 24,
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  maxWidth: 620,
                  width: '100%',
                  background: 'linear-gradient(145deg, #061224 0%, #020810 100%)',
                  border: '1px solid #00E5FF',
                  borderRadius: 14,
                  padding: 36,
                  boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 50px rgba(0,229,255,0.3)',
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModalProject(null)}
                  style={{
                    position: 'absolute', top: 16, right: 16,
                    background: 'rgba(255,95,87,0.2)', border: '1px solid #ff5f57',
                    borderRadius: '50%', width: 32, height: 32,
                    color: '#ff5f57', fontSize: 14, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  ✕
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: '2rem' }}>{activeModalProject.icon || '💻'}</span>
                  <div>
                    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.75rem', color: '#00FFA3' }}>
                      HUD INSPECTOR // [{activeModalProject.category.toUpperCase()}]
                    </div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                      {activeModalProject.title}
                    </h2>
                  </div>
                </div>

                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
                  {activeModalProject.description}
                </p>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.75rem', color: 'rgba(0,229,255,0.7)', marginBottom: 8 }}>
                    STACK & TECHNOLOGIES
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {activeModalProject.technologies.map((t, i) => (
                      <TechBadge key={i} tech={t} />
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 16, paddingTop: 20, borderTop: '1px solid rgba(0,229,255,0.2)' }}>
                  {activeModalProject.github && (
                    <CyberButton href={activeModalProject.github} target="_blank" rel="noopener noreferrer" variant="primary">
                      VIEW SOURCE CODE →
                    </CyberButton>
                  )}
                  {activeModalProject.live && (
                    <CyberButton href={activeModalProject.live} target="_blank" rel="noopener noreferrer" variant="secondary">
                      LIVE DEPLOYMENT →
                    </CyberButton>
                  )}
                  <CyberButton onClick={() => setActiveModalProject(null)} variant="technical">
                    CLOSE INSPECTOR
                  </CyberButton>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
