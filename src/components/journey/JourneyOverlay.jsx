import React from 'react';
import SystemLabel from '../cyber/SystemLabel.jsx';
import TechBadge from '../cyber/TechBadge.jsx';

export function JourneyOverlay({ journey, onClose }) {
  if (!journey) return null;

  return (
    <div className="journey-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 'var(--space-64)'
    }}>
      <div style={{
        pointerEvents: 'auto',
        background: 'var(--surface-strong)',
        border: '1px solid var(--border-strong)',
        padding: 'var(--space-32)',
        borderRadius: '8px',
        maxWidth: '500px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        animation: 'overlayReveal 0.3s ease-out forwards'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-12)' }}>
          <SystemLabel text={`STAGE / ${journey.title.toUpperCase()}`} />
          <SystemLabel 
            text={journey.status} 
            style={{ color: journey.status.includes('CURRENT') ? 'var(--accent-primary)' : 'var(--text-muted)' }} 
          />
        </div>
        
        <h2 style={{ fontSize: '2rem', marginBottom: 'var(--space-16)', color: 'var(--text-primary)' }}>{journey.title}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-24)', lineHeight: 1.6 }}>{journey.description}</p>
        
        <div style={{ marginBottom: 'var(--space-32)' }}>
          <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: 'var(--space-8)' }}>
            TECHNOLOGIES / CONCEPTS
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-8)' }}>
            {journey.technologies.map((tech, i) => <TechBadge key={i} tech={tech} />)}
          </div>
        </div>

        <button onClick={onClose} style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-8)'
        }}>
          <span style={{ fontSize: '1.2rem' }}>←</span> RETURN TO JOURNEY
        </button>
      </div>

      <style>{`
        @keyframes overlayReveal {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
