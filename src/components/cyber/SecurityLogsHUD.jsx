import React, { useState, useEffect } from 'react';

export default function SecurityLogsHUD() {
  const [logs, setLogs] = useState([
    { time: '01:25:04', level: 'INFO', msg: 'TLS 1.3 Handshake completed (AES-256-GCM)', color: '#00FFA3' },
    { time: '01:25:12', level: 'ALERT', msg: 'Port scan from 192.168.1.45 blocked by firewall', color: '#FFB020' },
    { time: '01:25:28', level: 'ROUTE', msg: 'Vyom Shah proxy node shifted ➔ Zurich CH Node 04', color: '#00E5FF' },
  ]);

  useEffect(() => {
    const logTemplates = [
      { level: 'INFO', msg: 'IDS Firewall Ruleset refreshed (0 false positives)', color: '#00FFA3' },
      { level: 'WARN', msg: 'SQL Injection payload sanitized on endpoint /api/query', color: '#FFB020' },
      { level: 'ROUTE', msg: 'Vyom Shah untraceable proxy routed ➔ Tokyo Node 01', color: '#00E5FF' },
      { level: 'SUCCESS', msg: 'CTF Challenge session handshake verified', color: '#00FFA3' },
      { level: 'ROUTE', msg: 'Vyom Shah untraceable proxy routed ➔ Reykjavik Node 03', color: '#00E5FF' }
    ];

    const interval = setInterval(() => {
      const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      const time = new Date().toLocaleTimeString();
      setLogs(prev => [...prev.slice(-3), { ...template, time }]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 90,
        width: '320px',
        background: 'rgba(5, 10, 24, 0.92)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(0, 255, 163, 0.35)',
        borderRadius: '8px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 255, 163, 0.2)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.74rem',
        padding: '12px',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00FFA3', boxShadow: '0 0 10px #00FFA3' }}></span>
          <span style={{ color: '#00FFA3', fontWeight: 'bold' }}>SOC_AUDIT_LOGS</span>
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>REAL-TIME</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {logs.map((log, i) => (
          <div key={i} style={{ fontSize: '0.72rem', color: log.color || '#FFF', lineHeight: 1.3 }}>
            <span style={{ color: 'var(--text-muted)' }}>[{log.time}]</span>{' '}
            <strong style={{ color: log.color }}>[{log.level}]</strong> {log.msg}
          </div>
        ))}
      </div>
    </div>
  );
}
