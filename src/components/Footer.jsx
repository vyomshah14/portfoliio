import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
      setTimeStr(utc);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="footer"
      style={{
        position: 'relative',
        zIndex: 2,
        background: 'rgba(5, 8, 18, 0.95)',
        borderTop: '1px solid rgba(0, 229, 255, 0.2)',
        padding: 'var(--space-48) 0 var(--space-32) 0',
        backdropFilter: 'blur(20px)',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <div className="container">
        {/* Top Footer Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-24)', marginBottom: 'var(--space-32)', borderBottom: '1px dashed rgba(255, 255, 255, 0.1)', paddingBottom: 'var(--space-24)' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>VYOM SHAH</span>
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', background: 'rgba(0, 229, 255, 0.1)', border: '1px solid var(--accent-primary)', borderRadius: '4px', color: 'var(--accent-primary)' }}>
                PORTFOLIO v4.5 // 3D CYBER
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Cybersecurity • Systems Programming • Full-Stack Development
            </p>
          </div>

          {/* Live System Digital Clock */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', letterSpacing: '0.08em' }}>
              [ SYSTEM TIMESTAMP ]
            </div>
            <div style={{ fontSize: '0.92rem', color: '#00FFA3', fontWeight: 'bold', letterSpacing: '0.05em' }}>
              {timeStr || 'SYSTEM ONLINE'}
            </div>
          </div>

        </div>

        {/* Bottom Footer Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-20)' }}>
          
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} <span style={{ color: 'var(--text-primary)' }}>Vyom Shah</span>. Crafted with React, Three.js & Anime.js. All systems operational.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-24)' }}>
            <a href="https://github.com/vyomshah14" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
              GITHUB
            </a>
            <a href="https://www.linkedin.com/in/vyom-shah-007632290/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
              LINKEDIN
            </a>
            <a href="https://www.instagram.com/_vyom_shah" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
              INSTAGRAM
            </a>

            <button
              onClick={scrollToTop}
              style={{
                background: 'rgba(0, 229, 255, 0.1)',
                border: '1px solid var(--accent-primary)',
                color: 'var(--accent-primary)',
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--accent-primary)';
                e.target.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(0, 229, 255, 0.1)';
                e.target.style.color = 'var(--accent-primary)';
              }}
            >
              ▲ TOP
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
