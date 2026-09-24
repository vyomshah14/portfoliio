import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/cyber/SectionHeader.jsx';
import StatusBadge from '../components/cyber/StatusBadge.jsx';
import TechBadge from '../components/cyber/TechBadge.jsx';
import CyberButton from '../components/cyber/CyberButton.jsx';

export default function About() {
  const [activeTab, setActiveTab] = useState('cyber');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spinningIndex, setSpinningIndex] = useState(null);

  const triggerCardSpin = (idx) => {
    if (spinningIndex !== null) return;
    setSpinningIndex(idx);
    setTimeout(() => {
      setSpinningIndex(null);
    }, 5500);
  };

  const stats = [
    { label: 'EXPERIENCE', val: '2+ YRS', sub: 'Hands-on Engineering' },
    { label: 'TOTAL PROJECTS', val: '20+', sub: 'Built & Architected' },
    { label: 'LIVE DEPLOYED', val: '7+ PUBLIC', sub: 'Active Web & Systems' },
    { label: 'PRIMARY FOCUS', val: 'CYBERSECURITY', sub: 'Systems & Network Sec' },
  ];

  const specializations = [
    {
      code: 'SEC_01',
      title: 'Cybersecurity & Defensive Engineering',
      icon: '🛡️',
      desc: 'Deep interest in network vulnerability assessment, packet analysis (Wireshark/TCPDump), system hardening, and secure coding architectures.',
      tags: ['Network Security', 'TCP/IP Analysis', 'Penetration Testing', 'System Hardening', 'Crypto'],
    },
    {
      code: 'SEC_02',
      title: 'Systems & Low-Level Programming',
      icon: '⚙️',
      desc: 'High-performance memory management, low-level system calls, concurrency patterns, and system optimization in C, C++, and Linux kernel environments.',
      tags: ['C / C++', 'Linux Kernel', 'Memory Mgmt', 'POSIX / Threads', 'Assembly'],
    },
    {
      code: 'SEC_03',
      title: 'Modern Full-Stack & 3D Web Apps',
      icon: '⚡',
      desc: 'Crafting ultra-responsive web applications, rich interactive user interfaces, WebGL 3D graphics (Three.js), and resilient REST/GraphQL backend services.',
      tags: ['React 19', 'Node.js', 'Three.js / WebGL', 'Tailwind / CSS3', 'PostgreSQL / Mongo'],
    },
  ];

  // Mouse tilt handlers for 3D card perspective
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      className="about-section"
      id="about"
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
        <SectionHeader number="02" title="ABOUT_THE_BUILDER" />

        {/* Stats Grid Bar — 4 Interactive Zoom-In 3D Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
            marginBottom: 48,
          }}
        >
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{
                scale: 1.06,
                y: -6,
                borderColor: '#00E5FF',
                boxShadow: '0 20px 45px rgba(0, 229, 255, 0.28), inset 0 1px 0 rgba(0,229,255,0.5)',
              }}
              style={{
                background: 'linear-gradient(145deg, rgba(6, 18, 36, 0.9) 0%, rgba(2, 8, 16, 0.95) 100%)',
                border: '1px solid rgba(0, 229, 255, 0.22)',
                borderRadius: 10,
                padding: '22px 26px',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 10px 32px rgba(0, 0, 0, 0.6)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease, background 0.3s ease',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #00E5FF, #00FFA3, transparent)' }} />
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.72rem', color: 'rgba(0, 229, 255, 0.7)', letterSpacing: '0.12em', marginBottom: 6 }}>
                // {s.label}
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#F5F7FA', letterSpacing: '0.04em', fontFamily: '"JetBrains Mono", monospace', marginBottom: 2, textShadow: '0 0 15px rgba(0,229,255,0.3)' }}>
                {s.val}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {s.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Layout — 2 Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 40, alignItems: 'start' }}>

          {/* LEFT COLUMN: 3D Zoom Profile Avatar Card + Dossier Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* 3D Cyber Profile HUD Card with Scale Zoom & Parallax */}
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ rotateY: tilt.x, rotateX: tilt.y }}
              whileHover={{
                scale: 1.04,
                y: -6,
                borderColor: '#00E5FF',
                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.8), 0 0 45px rgba(0, 229, 255, 0.35)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                perspective: 1000,
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(145deg, rgba(6, 18, 36, 0.92) 0%, rgba(2, 8, 16, 0.96) 100%)',
                border: '1px solid rgba(0, 229, 255, 0.35)',
                borderRadius: 12,
                padding: 26,
                backdropFilter: 'blur(16px)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 229, 255, 0.15)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              {/* Corner Bracket Accents */}
              {[
                { top: 6, left: 6, borderTop: '2px solid #00E5FF', borderLeft: '2px solid #00E5FF' },
                { top: 6, right: 6, borderTop: '2px solid #00E5FF', borderRight: '2px solid #00E5FF' },
                { bottom: 6, left: 6, borderBottom: '2px solid #00E5FF', borderLeft: '2px solid #00E5FF' },
                { bottom: 6, right: 6, borderBottom: '2px solid #00E5FF', borderRight: '2px solid #00E5FF' },
              ].map((b, i) => (
                <div key={i} style={{ position: 'absolute', width: 14, height: 14, filter: 'drop-shadow(0 0 6px #00E5FF)', transform: 'translateZ(20px)', ...b }} />
              ))}

              <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', transform: 'translateZ(30px)' }}>
                
                {/* Profile Photo Wrapper */}
                <div style={{ position: 'relative', width: 130, height: 130, flexShrink: 0 }}>
                  {/* Outer glowing border ring */}
                  <div style={{
                    position: 'absolute', inset: -4, borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, #00E5FF, #00FFA3, transparent 60%, #00E5FF)',
                    animation: 'spinRing 8s linear infinite',
                    filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.7))',
                  }} />

                  <img
                    src="/assets/images/profile.jpg"
                    alt="Vyom Shah"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      position: 'relative',
                      zIndex: 2,
                      border: '2px solid #020810',
                      filter: 'contrast(1.05) brightness(0.98)',
                    }}
                  />

                  {/* Online Badge */}
                  <div style={{
                    position: 'absolute', bottom: 4, right: 4, zIndex: 3,
                    width: 14, height: 14, borderRadius: '50%',
                    background: '#00FFA3', boxShadow: '0 0 12px #00FFA3',
                    border: '2px solid #020810',
                  }} />
                </div>

                {/* Profile Details */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <StatusBadge status="ACTIVE" />
                    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.72rem', color: '#00FFA3', letterSpacing: '0.08em' }}>
                      CLEARANCE: CYBER_OPERATOR
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#FFF', margin: '0 0 4px 0', letterSpacing: '0.02em', textShadow: '0 0 15px rgba(0,229,255,0.3)' }}>
                    VYOM SHAH
                  </h3>

                  <div style={{ fontSize: '0.9rem', color: '#00E5FF', fontFamily: '"JetBrains Mono", monospace', marginBottom: 12 }}>
                    ASPIRING CYBERSECURITY ENGINEER // SYSTEMS
                  </div>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <TechBadge tech="Cybersecurity" />
                    <TechBadge tech="Networking" />
                    <TechBadge tech="C++" />
                    <TechBadge tech="React" />
                  </div>
                </div>

              </div>

              <style>{`
                @keyframes spinRing {
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </motion.div>

            {/* Dossier Tabs Box with Zoom Effect */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Tab Selector Buttons */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  { id: 'cyber', label: '01 // CYBER VISION & GOAL' },
                  { id: 'bio', label: '02 // BIOGRAPHY' },
                  { id: 'philosophy', label: '03 // PHILOSOPHY' },
                  { id: 'config', label: '04 // CONFIG' },
                ].map(tab => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.05, borderColor: '#00E5FF', boxShadow: '0 0 20px rgba(0,229,255,0.3)' }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: '9px 14px',
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.75rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      background: activeTab === tab.id ? 'rgba(0, 229, 255, 0.18)' : 'rgba(5, 14, 28, 0.75)',
                      border: `1px solid ${activeTab === tab.id ? '#00E5FF' : 'rgba(0, 229, 255, 0.18)'}`,
                      borderRadius: 6,
                      color: activeTab === tab.id ? '#00E5FF' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: activeTab === tab.id ? '0 0 16px rgba(0,229,255,0.25)' : 'none',
                    }}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </div>

              {/* Tab Display Panel with Zoom Hover */}
              <motion.div
                whileHover={{
                  scale: 1.02,
                  borderColor: '#00E5FF',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 229, 255, 0.2)',
                }}
                style={{
                  background: 'linear-gradient(145deg, rgba(6, 18, 36, 0.9) 0%, rgba(2, 8, 16, 0.95) 100%)',
                  border: '1px solid rgba(0, 229, 255, 0.25)',
                  borderRadius: 10,
                  padding: 28,
                  backdropFilter: 'blur(14px)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
                  minHeight: 260,
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <AnimatePresence mode="wait">
                  {activeTab === 'cyber' && (
                    <motion.div
                      key="cyber"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                        <span style={{ fontSize: '1.4rem' }}>🛡️</span>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#00E5FF', margin: 0 }}>
                          Ultimate Career Vision: Cybersecurity Specialist
                        </h4>
                      </div>

                      <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: 16 }}>
                        My primary passion and long-term trajectory is centered on <strong style={{ color: '#00FFA3' }}>Cybersecurity & System Defense</strong>. While I enjoy building full-stack software, my core mission is to transition deeply into <strong style={{ color: '#00E5FF' }}>Cybersecurity Engineering, Threat Intelligence, and Network Security Architecture</strong>.
                      </p>

                      <div style={{
                        background: 'rgba(0, 229, 255, 0.06)',
                        borderLeft: '3px solid #00E5FF',
                        padding: '14px 18px',
                        borderRadius: '0 6px 6px 0',
                        marginBottom: 16,
                      }}>
                        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.78rem', color: '#00FFA3', marginBottom: 4 }}>
                          // MISSION STATEMENT
                        </div>
                        <div style={{ fontSize: '0.94rem', color: '#FFF', fontStyle: 'italic', lineHeight: 1.6 }}>
                          "Building applications is essential — but securing the infrastructure, networks, and protocols that power our digital world is my ultimate objective."
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 6, border: '1px solid rgba(0,229,255,0.15)' }}>
                          <div style={{ color: '#00E5FF', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.75rem' }}>FOCUS AREA 01</div>
                          <div style={{ color: '#FFF', fontWeight: 600, fontSize: '0.88rem', marginTop: 2 }}>Network Security & Packet Inspection</div>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 6, border: '1px solid rgba(0,255,163,0.15)' }}>
                          <div style={{ color: '#00FFA3', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.75rem' }}>FOCUS AREA 02</div>
                          <div style={{ color: '#FFF', fontWeight: 600, fontSize: '0.88rem', marginTop: 2 }}>Penetration Testing & System Hardening</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'bio' && (
                    <motion.div
                      key="bio"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFF', marginBottom: 14 }}>
                        Passionate Systems & Cyber Builder
                      </h4>
                      <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: 16 }}>
                        I'm <strong style={{ color: '#00E5FF' }}>Vyom Shah</strong> — a Software Developer driven by a curiosity for how computers execute instructions at every layer. With <strong style={{ color: '#00FFA3' }}>2+ years of experience</strong>, I've built over <strong style={{ color: '#00E5FF' }}>20+ projects</strong> including <strong style={{ color: '#00FFA3' }}>7+ live public applications</strong>.
                      </p>
                      <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                        From building reactive web applications to analyzing network packet structures and memory buffers in C/C++, I turn complex technical specifications into performant, secure software.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === 'philosophy' && (
                    <motion.div
                      key="philosophy"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFF', marginBottom: 16 }}>
                        Core Engineering Principles
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <span style={{ color: '#00FFA3', fontFamily: '"JetBrains Mono", monospace' }}>[01]</span>
                          <div>
                            <strong style={{ color: '#FFF' }}>Security by Design:</strong>
                            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.92rem', marginTop: 2 }}>
                              Security isn't an afterthought — it must be built into system architecture from line one.
                            </span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <span style={{ color: '#00E5FF', fontFamily: '"JetBrains Mono", monospace' }}>[02]</span>
                          <div>
                            <strong style={{ color: '#FFF' }}>Deep Fundamentals:</strong>
                            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.92rem', marginTop: 2 }}>
                              Understand low-level memory, Linux systems, and CPU execution for bulletproof code.
                            </span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <span style={{ color: '#00FFA3', fontFamily: '"JetBrains Mono", monospace' }}>[03]</span>
                          <div>
                            <strong style={{ color: '#FFF' }}>Resilient Execution:</strong>
                            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.92rem', marginTop: 2 }}>
                              Combine solid backend security with captivating, modern web interfaces.
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'config' && (
                    <motion.div
                      key="config"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '0.82rem',
                        lineHeight: 1.6,
                        color: 'rgba(255,255,255,0.85)',
                        background: '#020712',
                        padding: 16,
                        borderRadius: 6,
                        border: '1px solid rgba(0,229,255,0.2)',
                      }}>
                        <div style={{ color: 'rgba(0,229,255,0.5)', marginBottom: 6 }}>// vyom_developer_config.json</div>
                        <div>{'{'}</div>
                        <div style={{ paddingLeft: 16 }}>
                          <span style={{ color: '#00FFA3' }}>"name"</span>: <span style={{ color: '#00E5FF' }}>"Vyom Shah"</span>,
                        </div>
                        <div style={{ paddingLeft: 16 }}>
                          <span style={{ color: '#00FFA3' }}>"email"</span>: <span style={{ color: '#00E5FF' }}>"vyomshah2021@gmail.com"</span>,
                        </div>
                        <div style={{ paddingLeft: 16 }}>
                          <span style={{ color: '#00FFA3' }}>"target_specialization"</span>: <span style={{ color: '#00FFA3' }}>"CYBERSECURITY & NETWORK DEFENSE"</span>,
                        </div>
                        <div style={{ paddingLeft: 16 }}>
                          <span style={{ color: '#00FFA3' }}>"experience_years"</span>: <span style={{ color: '#febc2e' }}>2</span>,
                        </div>
                        <div style={{ paddingLeft: 16 }}>
                          <span style={{ color: '#00FFA3' }}>"total_projects"</span>: <span style={{ color: '#febc2e' }}>20</span>,
                        </div>
                        <div style={{ paddingLeft: 16 }}>
                          <span style={{ color: '#00FFA3' }}>"live_public_projects"</span>: <span style={{ color: '#febc2e' }}>7</span>,
                        </div>
                        <div style={{ paddingLeft: 16 }}>
                          <span style={{ color: '#00FFA3' }}>"core_languages"</span>: [<span style={{ color: '#00E5FF' }}>"C++"</span>, <span style={{ color: '#00E5FF' }}>"Python"</span>, <span style={{ color: '#00E5FF' }}>"JavaScript"</span>, <span style={{ color: '#00E5FF' }}>"C"</span>],
                        </div>
                        <div style={{ paddingLeft: 16 }}>
                          <span style={{ color: '#00FFA3' }}>"status"</span>: <span style={{ color: '#00FFA3' }}>"OPEN_FOR_CYBER_ROLES"</span>
                        </div>
                        <div>{'}'}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

          </div>

          {/* RIGHT COLUMN: Specializations Cyber Dossier Cards with Zoom-In & 3D Spin */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {specializations.map((spec, idx) => (
              <motion.div
                key={spec.code}
                onClick={() => triggerCardSpin(idx)}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={spinningIndex === idx ? {} : {
                  scale: 1.05,
                  y: -8,
                  borderColor: '#00E5FF',
                  boxShadow: '0 25px 65px rgba(0, 0, 0, 0.8), 0 0 45px rgba(0, 229, 255, 0.3), inset 0 1px 0 rgba(0,229,255,0.4)',
                }}
                className={spinningIndex === idx ? 'is-spinning-3d' : ''}
                style={{
                  background: 'linear-gradient(145deg, rgba(6, 18, 36, 0.9) 0%, rgba(2, 8, 16, 0.95) 100%)',
                  border: `1px solid ${spinningIndex === idx ? '#00E5FF' : 'rgba(0, 229, 255, 0.22)'}`,
                  borderRadius: 10,
                  padding: 26,
                  backdropFilter: 'blur(14px)',
                  boxShadow: spinningIndex === idx ? '0 0 60px rgba(0,229,255,0.6)' : '0 10px 35px rgba(0, 0, 0, 0.6)',
                  transition: 'border-color 0.3s ease, background 0.3s ease',
                  position: 'relative',
                  cursor: spinningIndex === idx ? 'wait' : 'pointer',
                  overflow: 'hidden',
                }}
              >
                {/* Glowing top line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)' }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <motion.span
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    style={{ fontSize: '1.6rem', filter: 'drop-shadow(0 0 8px #00E5FF)' }}
                  >
                    {spec.icon}
                  </motion.span>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.72rem', color: 'rgba(0, 229, 255, 0.7)', letterSpacing: '0.12em' }}>
                    [{spec.code}]
                  </span>
                </div>

                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF', marginBottom: 10, textShadow: '0 0 10px rgba(0,229,255,0.2)' }}>
                  {spec.title}
                </h4>

                <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 18 }}>
                  {spec.desc}
                </p>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {spec.tags.map((t, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '0.72rem',
                        color: '#00E5FF',
                        background: 'rgba(0, 229, 255, 0.08)',
                        padding: '4px 10px',
                        borderRadius: 4,
                        border: '1px solid rgba(0, 229, 255, 0.2)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Action Banner at Bottom with Zoom Hover */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{
            scale: 1.03,
            y: -5,
            borderColor: '#00E5FF',
            boxShadow: '0 25px 65px rgba(0, 0, 0, 0.8), 0 0 45px rgba(0, 229, 255, 0.35)',
          }}
          style={{
            marginTop: 64,
            padding: '28px 36px',
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(4, 12, 24, 0.95) 100%)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
            boxShadow: '0 16px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.15)',
            cursor: 'pointer',
            transition: 'border-color 0.3s ease',
          }}
        >
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.78rem', color: '#00FFA3', letterSpacing: '0.12em', marginBottom: 4 }}>
              // CYBERSECURITY & SYSTEMS MISSION
            </div>
            <div style={{ fontSize: '1.28rem', fontWeight: 800, color: '#FFF', textShadow: '0 0 15px rgba(0,229,255,0.2)' }}>
              Interested in cybersecurity engineering, network defense, or custom systems?
            </div>
          </div>

          <div style={{ display: 'flex', gap: 14 }}>
            <CyberButton href="#skills" variant="primary">
              [ EXPLORE SKILLS ]
            </CyberButton>
            <CyberButton href="#contact" variant="secondary">
              [ CONTACT VYOM ]
            </CyberButton>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
