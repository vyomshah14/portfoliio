import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import CyberButton from '../components/cyber/CyberButton.jsx';
import TechBadge from '../components/cyber/TechBadge.jsx';
import { TypewriterText } from '../components/boot/TypewriterText.jsx';

// ─── 3D Interactive CTF Challenge HUD Card Component ──────────────────────
function CTF3DCard() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const holdTimerRef = useRef(null);

  const triggerSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 5500);
  };

  const handleMouseDown = () => {
    holdTimerRef.current = setTimeout(triggerSpin, 180);
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
      onClick={(e) => {
        if (!isSpinning && window.__toggleCtfModal) {
          window.__toggleCtfModal(true);
        }
      }}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        width: '100%',
        marginTop: '14px',
        cursor: 'pointer',
      }}
    >
      <div
        className={`ctf-3d-card ${isSpinning ? 'is-spinning-3d' : ''}`}
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: isSpinning
            ? 'none'
            : `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
          transition: isSpinning ? 'none' : 'transform 0.2s ease-out, box-shadow 0.3s ease',
          background: 'rgba(5, 14, 28, 0.92)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${isHovered ? '#00FFA3' : 'rgba(0, 255, 163, 0.4)'}`,
          borderRadius: '10px',
          padding: '12px 18px',
          boxShadow: isHovered
            ? '0 15px 35px rgba(0,0,0,0.7), 0 0 30px rgba(0, 255, 163, 0.4)'
            : '0 8px 20px rgba(0,0,0,0.4), 0 0 12px rgba(0, 255, 163, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ transform: 'translateZ(30px)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(0, 255, 163, 0.15)',
              border: '1px solid #00FFA3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              boxShadow: '0 0 12px rgba(0, 255, 163, 0.3)',
            }}
          >
            🎮
          </div>
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.84rem', color: '#00FFA3', fontWeight: 'bold', letterSpacing: '0.05em' }}>
              INTERACTIVE CYBER CTF HACK CHALLENGE
            </div>
            <div style={{ fontFamily: 'var(--font-primary)', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Test your hacker skills! Decode Base64 ciphers to unlock Level 5 Access.
            </div>
          </div>
        </div>

        <div style={{ transform: 'translateZ(40px)' }}>
          <div
            style={{
              background: isHovered ? '#00FFA3' : 'rgba(0, 255, 163, 0.15)',
              color: isHovered ? '#000' : '#00FFA3',
              border: '1px solid #00FFA3',
              padding: '6px 14px',
              borderRadius: '6px',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              transition: 'all 0.2s ease',
              boxShadow: '0 0 12px rgba(0, 255, 163, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>🔓</span>
            <span>[ LAUNCH GAME ]</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Real Fully Interactive Bash Terminal Input ─────────────────────────────
function CyberTerminal({ userName }) {
  const [lines, setLines] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const initialLines = [
    { type: 'prompt', cmd: 'whoami' },
    { type: 'output', text: 'vyom_shah' },
    { type: 'blank' },
    { type: 'prompt', cmd: `greet ${userName || 'visitor'}` },
    { type: 'output', text: `> hello, ${(userName || 'visitor').toLowerCase()}`, color: '#00FFA3' },
    { type: 'output', text: '> welcome to vyom cyber world', color: '#00FFA3' },
    { type: 'blank' },
    { type: 'prompt', cmd: 'cat identity.conf' },
    { type: 'output', text: 'role     : Software Developer' },
    { type: 'output', text: 'contact  : vyomshah2021@gmail.com', color: '#00FFA3' },
    { type: 'output', text: 'target   : Cybersecurity & Network Systems' },
    { type: 'blank' },
    { type: 'prompt', cmd: 'status --live' },
    { type: 'output', text: '● SYSTEM ONLINE  ■ CLEARANCE LVL 5  ▲ TYPE "help"', color: '#00FFA3' },
  ];

  // Initial typewriter boot sequence
  useEffect(() => {
    let i = 0;
    const show = () => {
      if (i >= initialLines.length) return;
      const currentLine = initialLines[i];
      setLines(prev => [...prev, currentLine]);
      i++;
      if (i >= initialLines.length) return;
      const delay = currentLine.type === 'prompt' ? 350 : 120;
      setTimeout(show, delay);
    };
    const start = setTimeout(show, 200);
    return () => clearTimeout(start);
  }, []);

  // Anime.js pulse effect on terminal load
  useEffect(() => {
    animate('.terminal-chassis', {
      scale: [0.96, 1],
      opacity: [0, 1],
      duration: 800,
      ease: 'outElastic(1, .8)',
    });
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, inputVal]);

  const processCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    let outputLines = [];
    if (cmd === 'help') {
      outputLines = [
        { type: 'output', text: 'Commands: whoami, email, skills, projects, tools, scan, hack, clear', color: '#00E5FF' },
      ];
    } else if (cmd === 'whoami') {
      outputLines = [{ type: 'output', text: 'vyom_shah // Cybersecurity Specialist & Systems Architect' }];
    } else if (cmd === 'hack' || cmd === 'ctf') {
      outputLines = [{ type: 'output', text: '🔓 LAUNCHING INTERACTIVE CYBER CTF HACK CHALLENGE...', color: '#00FFA3' }];
      if (window.__toggleCtfModal) window.__toggleCtfModal(true);
    } else if (cmd === 'tools') {
      outputLines = [
        { type: 'output', text: '🛠️ TOOLSTACK: Nmap, Wireshark, Metasploit, GDB, Burp Suite, C/C++, Python', color: '#00FFA3' },
      ];
    } else if (cmd === 'scan') {
      outputLines = [
        { type: 'output', text: 'PORT SCAN (127.0.0.1): [22/SSH: OPEN] [80/HTTP: OPEN] [443/HTTPS: SECURE]', color: '#00E5FF' },
      ];
    } else if (cmd === 'email' || cmd === 'contact' || cmd === 'mail') {
      outputLines = [
        { type: 'output', text: '📧 Email: vyomshah2021@gmail.com', color: '#00FFA3' },
      ];
    } else if (cmd === 'skills' || cmd === 'ls skills') {
      outputLines = [
        { type: 'output', text: 'Core Skills: C++, Python, JavaScript, React, Node.js, Linux, TCP/IP, Wireshark', color: '#00E5FF' },
      ];
    } else if (cmd === 'projects' || cmd === 'ls projects') {
      outputLines = [
        { type: 'output', text: 'Projects: 20+ Total Architected | 7+ Live Public Applications' },
      ];
    } else {
      outputLines = [
        { type: 'output', text: `bash: command not found: ${rawCmd}. Type "help" for commands.`, color: 'rgba(255,255,255,0.6)' },
      ];
    }

    setLines(prev => [
      ...prev,
      { type: 'prompt', cmd: rawCmd },
      ...outputLines,
      { type: 'blank' }
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      processCommand(inputVal);
      setInputVal('');
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.78rem',
        color: '#F5F7FA',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'text',
      }}
    >
      <div ref={scrollRef} style={{ overflowY: 'auto', flexGrow: 1, paddingRight: 4 }}>
        {lines.map((line, index) => {
          if (line.type === 'blank') return <div key={index} style={{ height: 4 }} />;
          if (line.type === 'prompt') {
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '2px 0' }}>
                <span style={{ color: '#00FFA3', fontWeight: 'bold' }}>vyom@cyber:~$</span>
                <span style={{ color: '#FFF' }}>{line.cmd}</span>
              </div>
            );
          }
          return (
            <div key={index} style={{ color: line.color || '#A8B0BE', margin: '2px 0', lineHeight: 1.35, wordBreak: 'break-word' }}>
              {line.text}
            </div>
          );
        })}

        {/* Live typing prompt input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '3px 0' }}>
          <span style={{ color: '#00FFA3', fontWeight: 'bold' }}>vyom@cyber:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#00E5FF',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.78rem',
              flexGrow: 1,
              padding: 0,
              margin: 0,
            }}
            placeholder=""
          />
        </div>
      </div>

      {/* Terminal Footer Info & Quick Chips */}
      <div style={{ borderTop: '1px solid rgba(0,229,255,0.15)', paddingTop: 6, marginTop: 6 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
          {['help', 'skills', 'projects', 'tools', 'scan', 'hack'].map(c => (
            <button
              key={c}
              onClick={(e) => { e.stopPropagation(); processCommand(c); }}
              style={{
                background: c === 'hack' ? 'rgba(0, 255, 163, 0.15)' : 'rgba(0,229,255,0.08)',
                border: `1px solid ${c === 'hack' ? '#00FFA3' : 'rgba(0,229,255,0.25)'}`,
                color: c === 'hack' ? '#00FFA3' : 'var(--accent-primary)',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.68rem',
                padding: '2px 7px',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              {c === 'hack' ? '🔓 hack' : `$ ${c}`}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>
          <span>PORT: 443 // TLS 1.3</span>
          <span style={{ color: '#00FFA3' }}>TYPE COMMAND & PRESS ENTER</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ userName }) {
  const [seq, setSeq] = useState(0);
  const [isTermOpen, setIsTermOpen] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => setSeq(1), 300);
    const timer2 = setTimeout(() => setSeq(2), 1200);
    const timer3 = setTimeout(() => setSeq(3), 2000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  return (
    <section className="hero-section" id="hero" style={{ minHeight: '100vh', padding: 'calc(var(--space-96) + 32px) 0 var(--space-64) 0', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'var(--space-48)', alignItems: 'center' }}>
          
          {/* Left Column: Developer Info (Prominent & Balanced) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Status Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 14px', background: 'rgba(0, 255, 163, 0.1)', border: '1px solid #00FFA3', borderRadius: '20px', width: 'fit-content' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00FFA3', boxShadow: '0 0 10px #00FFA3' }}></div>
              <span style={{ color: '#00FFA3', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                STATUS: AVAILABLE FOR CYBER ROLES
              </span>
            </div>

            {/* Prominent Title: Vyom Shah & Subtitle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h1 style={{
                fontSize: 'clamp(2.8rem, 4.8vw, 4.2rem)',
                fontWeight: 800,
                color: '#FFF',
                margin: 0,
                lineHeight: 1.18,
                letterSpacing: '-0.02em',
                textShadow: '0 0 30px rgba(0, 229, 255, 0.35)'
              }}>
                Vyom Shah
              </h1>
              <div style={{
                fontSize: '1.18rem',
                color: 'var(--accent-primary)',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1.5,
                minHeight: '2.4rem',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <TypewriterText text="Cybersecurity Specialist | Systems & Full-Stack Engineer" />
              </div>
            </div>

            {/* Bio Description */}
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, maxWidth: '580px' }}>
              Specializing in low-level systems programming, network security protocols, defensive system hardening, and resilient full-stack applications.
            </p>

            {/* Quick Tech Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Cybersecurity', 'C / C++', 'Python', 'TCP/IP', 'Linux Systems', 'React / Node.js'].map((t, idx) => (
                <TechBadge key={idx} tech={t} />
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '4px' }}>
              <CyberButton href="#projects" variant="primary">
                [ EXPLORE DEPLOYMENTS ]
              </CyberButton>
              <CyberButton href="#contact" variant="secondary">
                [ SECURE CONTACT ]
              </CyberButton>
            </div>

            {/* Left HUD System Metadata Strip for 1:1 Height Leveling */}
            <div style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              padding: '12px 18px',
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px dashed rgba(0, 229, 255, 0.3)',
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              marginTop: '8px'
            }}>
              <span>LOCATION: <strong style={{ color: '#FFF' }}>MUMBAI, IN</strong></span>
              <span>•</span>
              <span>SYSTEM: <strong style={{ color: '#00FFA3' }}>OPERATIONAL</strong></span>
              <span>•</span>
              <span>CLEARANCE: <strong style={{ color: '#00E5FF' }}>LEVEL 5 OPERATOR</strong></span>
            </div>

          </div>

          {/* Right Column: Balanced Compact Draggable 3D Terminal + CTF Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '420px', margin: '0 auto' }}>
            
            <div style={{ position: 'relative', width: '100%', minHeight: '395px', display: 'flex', justifyContent: 'center' }}>
              <AnimatePresence mode="wait">
                {isTermOpen ? (
                  <motion.div
                    key="terminal"
                    drag
                    dragSnapToOrigin={false}
                    dragElastic={0.1}
                    dragMomentum={false}
                    initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
                    animate={{ opacity: seq >= 1 ? 1 : 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.4 }}
                    style={{ position: 'relative', zIndex: 10, width: '100%' }}
                  >
                    {/* Compact Terminal Chassis (Height: 390px) */}
                    <div
                      className="terminal-chassis"
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 390,
                        transform: 'perspective(900px) rotateY(-6deg) rotateX(2deg)',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.4s ease',
                        cursor: 'default',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'perspective(900px) rotateY(-2deg) rotateX(0.5deg) scale(1.02)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'perspective(900px) rotateY(-6deg) rotateX(2deg)';
                      }}
                    >
                      {/* Layer 1: Physical chassis back */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: '#020912',
                        border: '1px solid rgba(0,229,255,0.12)',
                        transform: 'translateZ(-16px)',
                        boxShadow: '0 32px 80px rgba(0,0,0,0.9), 0 0 120px rgba(0,229,255,0.08)',
                      }} />

                      {/* Layer 2: Middle depth frame */}
                      <div style={{
                        position: 'absolute', inset: 3,
                        background: '#030d1e',
                        transform: 'translateZ(-8px)',
                        border: '1px solid rgba(0,229,255,0.15)',
                      }} />

                      {/* Layer 3: Main terminal screen */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: '#040c18',
                        border: '1px solid rgba(0,229,255,0.4)',
                        boxShadow: [
                          '0 0 0 1px rgba(0,229,255,0.08)',
                          '0 0 40px rgba(0,229,255,0.15)',
                          'inset 0 0 30px rgba(0,0,0,0.7)',
                          'inset 0 1px 0 rgba(0,229,255,0.12)',
                        ].join(', '),
                        overflow: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                      }}>

                        {/* Title bar — DRAG HANDLE */}
                        <div style={{
                          height: 32,
                          background: 'rgba(0,20,40,0.95)',
                          borderBottom: '1px solid rgba(0,229,255,0.2)',
                          display: 'flex', alignItems: 'center',
                          padding: '0 14px', gap: 8, flexShrink: 0,
                          cursor: 'grab',
                          userSelect: 'none',
                        }}>
                          {/* Traffic light buttons */}
                          <div
                            title="Close Terminal"
                            onClick={(e) => { e.stopPropagation(); setIsTermOpen(false); }}
                            style={{
                              width: 12, height: 12, borderRadius: '50%',
                              background: '#ff5f56', cursor: 'pointer',
                              boxShadow: '0 0 6px rgba(255,95,86,0.5)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 9, color: '#000', fontWeight: 'bold'
                            }}
                          >
                            ×
                          </div>
                          <div
                            title="Minimize"
                            onClick={(e) => { e.stopPropagation(); setIsTermOpen(false); }}
                            style={{
                              width: 12, height: 12, borderRadius: '50%',
                              background: '#febc2e', cursor: 'pointer',
                              boxShadow: '0 0 6px rgba(254,188,46,0.5)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 9, color: '#000', fontWeight: 'bold'
                            }}
                          >
                            −
                          </div>
                          <div
                            title="Maximize"
                            onClick={(e) => { e.stopPropagation(); }}
                            style={{
                              width: 12, height: 12, borderRadius: '50%',
                              background: '#28c840', cursor: 'pointer',
                              boxShadow: '0 0 6px rgba(40,200,64,0.5)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 8, color: '#000', fontWeight: 'bold'
                            }}
                          >
                            +
                          </div>

                          <span style={{
                            marginLeft: 8, fontFamily: '"JetBrains Mono", monospace',
                            fontSize: 11, color: 'rgba(0,229,255,0.6)', letterSpacing: '0.06em',
                          }}>
                            vyom@cyberworld — bash
                          </span>

                          <span style={{
                            marginLeft: 'auto', fontSize: 10, color: 'rgba(0,229,255,0.4)',
                            fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.05em'
                          }}>
                            ⋮⋮ DRAG
                          </span>
                        </div>

                        {/* Terminal content */}
                        <div style={{ padding: '10px 14px', height: 'calc(100% - 32px)', boxSizing: 'border-box' }}>
                          <CyberTerminal userName={userName} />
                        </div>
                      </div>

                      {/* Edge glow bars */}
                      <div style={{
                        position: 'absolute', top: 50, bottom: 50, right: -4, width: 2,
                        background: 'linear-gradient(to bottom, transparent, rgba(0,229,255,0.5) 30%, rgba(0,229,255,0.5) 70%, transparent)',
                        filter: 'blur(1px)', transform: 'translateZ(2px)',
                      }} />
                    </div>
                  </motion.div>
                ) : (
                  /* Re-open Terminal Button when closed */
                  <motion.div
                    key="reopen"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setIsTermOpen(true)}
                    style={{
                      padding: '16px 32px',
                      background: 'rgba(4, 12, 24, 0.95)',
                      border: '1px solid #00E5FF',
                      borderRadius: 8,
                      boxShadow: '0 0 25px rgba(0,229,255,0.3)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.9rem',
                      color: '#00E5FF',
                      letterSpacing: '0.08em',
                      margin: '20px auto 10px auto'
                    }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(0,229,255,0.5)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>💻</span>
                    <span>[ RE-OPEN CYBER TERMINAL ]</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3D CTF Challenge HUD Card stacked cleanly below */}
            <CTF3DCard />

          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', zIndex: 2,
      }}>
        <span>SCROLL</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.5 }}>
          <path d="M10 5V15M10 15L5 10M10 15L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
