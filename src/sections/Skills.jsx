import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animate, stagger } from 'animejs';
import SectionHeader from '../components/cyber/SectionHeader.jsx';
import StatusBadge from '../components/cyber/StatusBadge.jsx';
import TechBadge from '../components/cyber/TechBadge.jsx';

// ─── Interactive 3D Tilt Card Component ──────────────────────────────────────
function SkillCard3D({ skill, idx }) {
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
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24; // tilt Y angle
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -24; // tilt X angle
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
      onClick={triggerSpin}
      className="skill-3d-card-wrapper"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className={`skill-3d-card ${isSpinning ? 'is-spinning-3d' : ''}`}
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: isSpinning ? 'none' : `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) ${isHovered ? 'scale(1.04)' : 'scale(1)'}`,
          transition: isSpinning ? 'none' : (isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'),
          background: 'linear-gradient(145deg, rgba(6, 18, 36, 0.9) 0%, rgba(2, 8, 16, 0.95) 100%)',
          border: `1px solid ${isHovered || isSpinning ? '#00E5FF' : 'rgba(0, 229, 255, 0.2)'}`,
          borderRadius: 12,
          padding: 26,
          backdropFilter: 'blur(16px)',
          boxShadow: isSpinning
            ? '0 0 60px rgba(0, 229, 255, 0.6), 0 0 100px rgba(0, 255, 163, 0.4)'
            : (isHovered
              ? '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 229, 255, 0.3), inset 0 1px 0 rgba(0,229,255,0.4)'
              : '0 12px 35px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(0,229,255,0.1)'),
          overflow: 'hidden',
          cursor: isSpinning ? 'wait' : 'pointer',
        }}
      >
        {/* Layer -1: Deep background shadow layer */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 0%, rgba(0,229,255,0.12) 0%, transparent 70%)',
          transform: 'translateZ(-20px)',
          pointerEvents: 'none',
        }} />

        {/* Top scanline effect */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, #00E5FF, #00FFA3, transparent)',
          transform: 'translateZ(10px)',
        }} />

        {/* 3D Corner Bracket Accents */}
        {[
          { top: 6, left: 6, borderTop: '2px solid #00E5FF', borderLeft: '2px solid #00E5FF' },
          { top: 6, right: 6, borderTop: '2px solid #00E5FF', borderRight: '2px solid #00E5FF' },
          { bottom: 6, left: 6, borderBottom: '2px solid #00E5FF', borderLeft: '2px solid #00E5FF' },
          { bottom: 6, right: 6, borderBottom: '2px solid #00E5FF', borderRight: '2px solid #00E5FF' },
        ].map((b, i) => (
          <div key={i} style={{ position: 'absolute', width: 12, height: 12, filter: 'drop-shadow(0 0 6px #00E5FF)', transform: 'translateZ(25px)', ...b }} />
        ))}

        {/* 3D Floating Layer 1: Icon + Title (translateZ 45px) */}
        <div style={{
          transform: 'translateZ(45px)',
          transformStyle: 'preserve-3d',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              fontSize: '1.8rem',
              filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.5))',
              transform: 'translateZ(15px)',
            }}>
              {skill.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#FFF', margin: 0, letterSpacing: '0.02em' }}>
                {skill.name}
              </h3>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.7rem', color: 'rgba(0,229,255,0.6)' }}>
                CATEGORY: {skill.category}
              </span>
            </div>
          </div>

          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#00FFA3',
            background: 'rgba(0, 255, 163, 0.12)',
            border: '1px solid rgba(0, 255, 163, 0.3)',
            padding: '4px 9px',
            borderRadius: 6,
            boxShadow: '0 0 10px rgba(0,255,163,0.2)',
            transform: 'translateZ(20px)',
          }}>
            {skill.level}
          </span>
        </div>

        {/* Description (translateZ 30px) */}
        <p style={{
          fontSize: '0.92rem',
          color: 'var(--text-muted)',
          lineHeight: 1.65,
          marginBottom: 20,
          transform: 'translateZ(30px)',
        }}>
          {skill.desc}
        </p>

        {/* 3D Floating Layer 2: Progress Meter (translateZ 35px) */}
        <div style={{ transform: 'translateZ(35px)', marginBottom: 20 }}>
          <div style={{
            display: 'flex',
            justify: 'space-between',
            fontSize: '0.78rem',
            fontFamily: '"JetBrains Mono", monospace',
            color: 'rgba(0,229,255,0.75)',
            marginBottom: 8,
          }}>
            <span>SYSTEM PROFICIENCY</span>
            <span style={{ color: '#00E5FF', fontWeight: 700, textShadow: '0 0 8px #00E5FF' }}>{skill.percentage}%</span>
          </div>

          <div style={{
            height: 8,
            width: '100%',
            background: 'rgba(0, 229, 255, 0.12)',
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.8)',
          }}>
            <div
              className="skill-progress-fill"
              data-percentage={skill.percentage}
              style={{
                height: '100%',
                width: `${skill.percentage}%`,
                background: 'linear-gradient(90deg, #00E5FF 0%, #00FFA3 100%)',
                boxShadow: '0 0 12px #00E5FF',
                borderRadius: 4,
                transition: 'width 1s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
            />
          </div>
        </div>

        {/* 3D Floating Layer 3: Tags (translateZ 25px) */}
        <div style={{
          transform: 'translateZ(25px)',
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
        }}>
          {skill.tags.map((t, i) => (
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
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Skills Section ──────────────────────────────────────────────────────
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const sectionRef = useRef(null);

  const categories = [
    { id: 'ALL', label: '00 // ALL CAPABILITIES' },
    { id: 'CYBER', label: '01 // CYBERSECURITY & NETWORK' },
    { id: 'SYSTEMS', label: '02 // SYSTEMS & LOW-LEVEL' },
    { id: 'FULLSTACK', label: '03 // FULL-STACK DEV' },
    { id: 'TOOLS', label: '04 // TOOLS & LINUX' },
  ];

  const skillCards = [
    // CYBERSECURITY
    {
      name: 'Network Architecture & TCP/IP',
      category: 'CYBER',
      percentage: 85,
      icon: '🛡️',
      level: 'ADVANCED',
      desc: 'Deep understanding of TCP/IP stack, socket programming, OSI layers, routing protocols, and Wireshark packet inspection.',
      tags: ['TCP/IP', 'Sockets', 'Wireshark', 'DNS/HTTP', 'Packet Analysis'],
    },
    {
      name: 'Security Fundamentals & Hardening',
      category: 'CYBER',
      percentage: 80,
      icon: '🔐',
      level: 'ADVANCED',
      desc: 'System vulnerability assessment, defensive security architecture, encryption algorithms (AES/RSA), and secure coding practices.',
      tags: ['System Hardening', 'Crypto Primitives', 'PenTesting', 'OWASP Top 10'],
    },
    // SYSTEMS & LOW LEVEL
    {
      name: 'C & C++ Systems Programming',
      category: 'SYSTEMS',
      percentage: 90,
      icon: '⚙️',
      level: 'EXPERT',
      desc: 'Object-oriented C++, manual memory allocation (malloc/free, pointers), POSIX threads, data structures, and STL containers.',
      tags: ['Pointers', 'Memory Management', 'POSIX Threads', 'STL', 'OOP'],
    },
    {
      name: 'Linux Kernel & Shell Automation',
      category: 'SYSTEMS',
      percentage: 85,
      icon: '🐧',
      level: 'ADVANCED',
      desc: 'Linux system calls, process control, file descriptors, Bash shell scripting, systemd, and terminal-based workflows.',
      tags: ['Bash Scripting', 'System Calls', 'IPC', 'Linux CLI', 'Process Mgmt'],
    },
    {
      name: 'Python Systems & Automation',
      category: 'SYSTEMS',
      percentage: 88,
      icon: '🐍',
      level: 'ADVANCED',
      desc: 'Scripting for automation, network analysis tools, data structures, backend integration, and rapid prototyping.',
      tags: ['Scapy', 'Automation Scripting', 'Data Analysis', 'Sockets'],
    },
    // FULL-STACK DEV
    {
      name: 'React 19 & Web Architecture',
      category: 'FULLSTACK',
      percentage: 92,
      icon: '⚛️',
      level: 'EXPERT',
      desc: 'Component architecture, custom React hooks, Framer Motion animations, virtual DOM optimization, state management, and SPA routing.',
      tags: ['React 19', 'Custom Hooks', 'Framer Motion', 'JSX', 'Virtual DOM'],
    },
    {
      name: 'Node.js & REST API Design',
      category: 'FULLSTACK',
      percentage: 84,
      icon: '🟢',
      level: 'ADVANCED',
      desc: 'Asynchronous event loop, Express.js backend services, JWT authentication, middleware pipelines, and RESTful API endpoints.',
      tags: ['Express.js', 'Event Loop', 'JWT Auth', 'Middleware', 'REST APIs'],
    },
    {
      name: 'Modern JavaScript (ES6+) & HTML/CSS',
      category: 'FULLSTACK',
      percentage: 95,
      icon: '⚡',
      level: 'EXPERT',
      desc: 'Async/Await promises, Closures, DOM manipulation, CSS Grid, Flexbox, Glassmorphism, dark mode design systems, and responsive layouts.',
      tags: ['ES6+', 'Async/Await', 'CSS Grid', 'Glassmorphism', 'Flexbox'],
    },
    // TOOLS & ENVIRONMENT
    {
      name: 'Git, GitHub & Version Control',
      category: 'TOOLS',
      percentage: 92,
      icon: '🐙',
      level: 'EXPERT',
      desc: 'Branching strategies (Git Flow), rebasing, merge conflict resolution, GitHub Actions CI/CD pipelines, and open-source collaboration.',
      tags: ['Git CLI', 'GitHub Actions', 'Branching Strategy', 'Rebase'],
    },
    {
      name: 'Dev Environment & Build Tools',
      category: 'TOOLS',
      percentage: 90,
      icon: '🛠️',
      level: 'ADVANCED',
      desc: 'Vite bundler, Neovim/VS Code workflow, Docker basics, GDB debugger, Valgrind memory leak auditing, and npm tooling.',
      tags: ['Vite', 'GDB Debugger', 'Valgrind', 'VS Code', 'npm'],
    },
  ];

  const filteredSkills = activeCategory === 'ALL'
    ? skillCards
    : skillCards.filter(s => s.category === activeCategory);

  // Trigger Anime.js spring staggered entrance whenever activeCategory changes
  useEffect(() => {
    animate('.skill-3d-card', {
      opacity: [0, 1],
      translateY: [40, 0],
      rotateX: [12, 0],
      scale: [0.93, 1],
      delay: stagger(70),
      duration: 750,
      ease: 'outElastic(1, .8)',
    });
  }, [activeCategory]);

  const additionalSkills = [
    'Data Structures & Algorithms',
    'Penetration Testing Mindset',
    'System Memory Auditing',
    'Socket Programming',
    'Reverse Engineering Basics',
    'Threat Vulnerability Assessment',
    'Performance Profiling',
    'Cross-Platform Build Tools',
  ];

  return (
    <section
      ref={sectionRef}
      className="skills-section"
      id="skills"
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
        <SectionHeader number="03" title="TECHNICAL_CAPABILITIES" />

        {/* Category Selector Tabs */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '12px 22px',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: activeCategory === cat.id ? 'rgba(0, 229, 255, 0.15)' : 'rgba(5, 14, 28, 0.75)',
                border: `1px solid ${activeCategory === cat.id ? '#00E5FF' : 'rgba(0, 229, 255, 0.18)'}`,
                borderRadius: 6,
                color: activeCategory === cat.id ? '#00E5FF' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeCategory === cat.id ? '0 0 20px rgba(0,229,255,0.3)' : 'none',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3D Skills Grid (Anime.js + Mouse 3D Depth Layering) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 28,
            marginBottom: 56,
          }}
        >
          {filteredSkills.map((skill, idx) => (
            <SkillCard3D key={skill.name} skill={skill} idx={idx} />
          ))}
        </div>

        {/* Additional Technical Competencies Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'rgba(4, 12, 24, 0.85)',
            border: '1px solid rgba(0, 229, 255, 0.25)',
            borderRadius: 10,
            padding: 32,
            backdropFilter: 'blur(12px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.78rem', color: '#00FFA3', letterSpacing: '0.12em', marginBottom: 12 }}>
            // ADDITIONAL_CORE_COMPETENCIES
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FFF', marginBottom: 20 }}>
            Specialized Engineering & Analytical Skillset
          </h3>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {additionalSkills.map((sk, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, borderColor: '#00E5FF', background: 'rgba(0, 229, 255, 0.12)' }}
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.82rem',
                  color: '#00E5FF',
                  background: 'rgba(0, 229, 255, 0.06)',
                  padding: '8px 16px',
                  borderRadius: 6,
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  transition: 'all 0.2s ease',
                  cursor: 'default',
                }}
              >
                + {sk}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
