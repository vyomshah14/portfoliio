import React, { useState } from 'react';
import { toggleSound, isSoundEnabled, playCyberClick } from '../../utils/cyberSound.js';

export default function TopCyberTicker() {
  const [sfxOn, setSfxOn] = useState(true);
  const [cyberdeckOn, setCyberdeckOn] = useState(false);

  const handleToggleSfx = () => {
    const newState = toggleSound();
    setSfxOn(newState);
    if (newState) playCyberClick();
  };

  const handleToggleCyberdeck = () => {
    const nextState = !cyberdeckOn;
    setCyberdeckOn(nextState);
    if (sfxOn) playCyberClick();

    if (nextState) {
      document.body.classList.add('cyberdeck-overclock');
    } else {
      document.body.classList.remove('cyberdeck-overclock');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '32px',
        background: 'rgba(2, 6, 16, 0.92)',
        borderBottom: '1px solid rgba(0, 229, 255, 0.25)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-24)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.74rem',
        backdropFilter: 'blur(12px)',
        color: 'var(--text-secondary)',
      }}
    >
      {/* Left: Status Ticker Marquee */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00FFA3', boxShadow: '0 0 8px #00FFA3' }}></span>
          <span style={{ color: '#00FFA3', fontWeight: 'bold' }}>SYSTEM: ONLINE</span>
        </div>

        <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>

        <div style={{ color: 'var(--accent-primary)', whiteSpace: 'nowrap' }}>
          OPERATOR: <span style={{ color: '#FFF' }}>VYOM SHAH</span>
        </div>

        <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>

        <div style={{ color: '#00FFA3', whiteSpace: 'nowrap' }}>
          LOCATION: UNTRACEABLE MULTI-HOP PROXY
        </div>

        <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>

        <div style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
          DOMAIN: CYBERSECURITY & LOW-LEVEL SYSTEMS
        </div>
      </div>

      {/* Right: CYBERDECK Overclock & Audio SFX Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={handleToggleCyberdeck}
          title="Toggle Overclocked CYBERDECK Matrix Theme"
          style={{
            background: cyberdeckOn ? 'rgba(189, 0, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${cyberdeckOn ? '#BD00FF' : 'rgba(255, 255, 255, 0.2)'}`,
            color: cyberdeckOn ? '#BD00FF' : 'var(--text-muted)',
            padding: '2px 10px',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: cyberdeckOn ? '0 0 12px #BD00FF' : 'none'
          }}
        >
          <span>⚡</span>
          <span>CYBERDECK: {cyberdeckOn ? 'OVERCLOCKED' : 'NORMAL'}</span>
        </button>

        <button
          onClick={handleToggleSfx}
          title="Toggle Cyber SFX Audio"
          style={{
            background: sfxOn ? 'rgba(0, 255, 163, 0.12)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${sfxOn ? '#00FFA3' : 'rgba(255, 255, 255, 0.2)'}`,
            color: sfxOn ? '#00FFA3' : 'var(--text-muted)',
            padding: '2px 10px',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>{sfxOn ? '🔊' : '🔇'}</span>
          <span>SFX: {sfxOn ? 'ENABLED' : 'MUTED'}</span>
        </button>
      </div>
    </div>
  );
}
