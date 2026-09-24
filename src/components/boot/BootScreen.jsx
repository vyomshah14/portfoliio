import { useState, useEffect, useRef } from 'react';
import CallChip from '../cyber/CallChip.jsx';

const BOOT_LOGS = [
  { text: 'VYOM_OS v2.4.1 booting...', delay: 0 },
  { text: 'Initializing kernel modules...', delay: 500 },
  { text: 'Loading cybersecurity protocols...', delay: 900 },
  { text: 'Network interface: ACTIVE', delay: 1300 },
  { text: 'Memory allocation: OK', delay: 1600 },
  { text: 'Threat detection: STANDBY', delay: 1900 },
  { text: 'All systems: READY', delay: 2300 },
];

export default function BootScreen({ onComplete }) {
  const [phase, setPhase] = useState('init'); // init → identification → welcome
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [chipStatus, setChipStatus] = useState('running');
  const inputRef = useRef(null);

  // Phase: init — show boot logs one by one
  useEffect(() => {
    if (phase !== 'init') return;
    const timers = BOOT_LOGS.map((log, i) =>
      setTimeout(() => {
        setVisibleLogs(prev => [...prev, log.text]);
      }, log.delay + 300)
    );
    // After last log, transition to identification
    const transition = setTimeout(() => {
      setPhase('identification');
    }, 2800);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(transition);
    };
  }, [phase]);

  // Auto-focus input when identification phase starts
  useEffect(() => {
    if (phase === 'identification' && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [phase]);

  const handleSubmit = () => {
    const name = inputValue.trim();
    if (!name) return;
    const displayName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    setSubmittedName(displayName);
    localStorage.setItem('vyom-cyber-visitor-name', displayName);
    setChipStatus('running');
    setPhase('welcome');
    setWelcomeVisible(true);

    setTimeout(() => {
      setChipStatus('done');
    }, 1800);

    setTimeout(() => {
      onComplete(displayName);
    }, 2800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 10,
      background: 'rgba(2, 3, 8, 0.55)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: '"JetBrains Mono", "Courier New", monospace',
      color: '#00E5FF',
      overflow: 'hidden',
    }}>
      {/* Scanline effect */}
      <div style={{
        position: 'absolute', inset: 0, 
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.015) 2px, rgba(0,229,255,0.015) 4px)',
        pointerEvents: 'none', zIndex: 1
      }} />

      {/* Corner decorations */}
      {[
        { top: 20, left: 20, borderTop: '2px solid #00E5FF', borderLeft: '2px solid #00E5FF' },
        { top: 20, right: 20, borderTop: '2px solid #00E5FF', borderRight: '2px solid #00E5FF' },
        { bottom: 20, left: 20, borderBottom: '2px solid #00E5FF', borderLeft: '2px solid #00E5FF' },
        { bottom: 20, right: 20, borderBottom: '2px solid #00E5FF', borderRight: '2px solid #00E5FF' },
      ].map((style, i) => (
        <div key={i} style={{ position: 'absolute', width: 40, height: 40, opacity: 0.5, ...style }} />
      ))}

      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: 640,
        padding: '36px 40px',
        background: 'rgba(2, 8, 18, 0.85)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(0, 229, 255, 0.3)',
        borderRadius: '12px',
        boxShadow: '0 0 50px rgba(0, 229, 255, 0.2)',
      }}>

        {/* INIT PHASE */}
        {(phase === 'init' || phase === 'identification' || phase === 'welcome') && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#00FFA3', fontSize: 13, marginBottom: 20, letterSpacing: '0.2em', opacity: 0.8 }}>
              ◈ SYSTEM BOOT SEQUENCE
            </div>
            {visibleLogs.map((log, i) => (
              <div key={i} style={{
                fontSize: 13,
                lineHeight: 2,
                color: i === visibleLogs.length - 1 && phase === 'init' ? '#00E5FF' : 'rgba(0,229,255,0.55)',
                animation: 'fadeIn 0.3s ease',
              }}>
                <span style={{ color: '#00FFA3', marginRight: 12 }}>{'>'}</span>{log}
                {i === visibleLogs.length - 1 && phase === 'init' && (
                  <span style={{ animation: 'blink 1s step-end infinite', marginLeft: 4 }}>█</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* IDENTIFICATION PHASE */}
        {phase === 'identification' && (
          <div style={{ animation: 'slideUp 0.5s ease' }}>
            <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #00E5FF, transparent)', marginBottom: 32, opacity: 0.4 }} />
            <div style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(0,229,255,0.5)', marginBottom: 12 }}>
              VISITOR IDENTIFICATION
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
              Who are you?
            </div>
            <div style={{ fontSize: 13, color: 'rgba(0,229,255,0.5)', marginBottom: 32 }}>
              Enter your name to access the system
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ color: '#00FFA3', fontSize: 18 }}>{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={30}
                placeholder="your name..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(0,229,255,0.4)',
                  color: '#ffffff',
                  fontFamily: 'inherit',
                  fontSize: 18,
                  outline: 'none',
                  padding: '4px 0',
                  caretColor: '#00E5FF',
                  letterSpacing: '0.05em',
                }}
              />
            </div>
            <div style={{ marginTop: 20, fontSize: 11, color: 'rgba(0,229,255,0.35)', letterSpacing: '0.15em' }}>
              PRESS ENTER TO CONTINUE
            </div>
          </div>
        )}

        {/* WELCOME / ACCESS GRANTED LOADING PHASE */}
        {phase === 'welcome' && (
          <div style={{ animation: 'fadeIn 0.6s ease', textAlign: 'center' }}>
            <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #00FFA3, transparent)', marginBottom: 28, opacity: 0.5 }} />
            <div style={{ fontSize: 12, letterSpacing: '0.4em', color: 'rgba(0,255,163,0.8)', marginBottom: 12 }}>
              ACCESS GRANTED
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#ffffff', marginBottom: 4, letterSpacing: '0.05em' }}>
              WELCOME
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#00E5FF', marginBottom: 24, letterSpacing: '0.08em' }}>
              {submittedName}
            </div>

            {/* React Bits CallChip Loading Component */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <CallChip
                icon="terminal"
                name="auth_init"
                argument={`--user="${submittedName}"`}
                status={chipStatus}
                expectedMs={2000}
                size={38}
                radius={12}
                color="#00E5FF"
                surfaceColor="rgba(0, 229, 255, 0.08)"
                progressColor="#00FFA3"
                progressOpacity={0.25}
                doneColor="#00FFA3"
                errorColor="#ef4444"
                washOpacity={0.2}
                showTimer={true}
              />
            </div>

            <div style={{ fontSize: 12, color: 'rgba(0,229,255,0.5)', letterSpacing: '0.15em' }}>
              INITIALIZING VYOM SHAH CYBER WORLD
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}
