import React, { useState, useEffect } from 'react';

export default function HexStreamWidget() {
  const [hexRows, setHexRows] = useState([]);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const generateRow = () => {
      const addr = '0x' + Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0').toUpperCase();
      const hexBytes = Array.from({ length: 8 }, () => 
        Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()
      ).join(' ');

      const flags = ['TCP_SYN', 'UDP_PACKET', 'TLS_HANDSHAKE', 'ARP_REQUEST', 'DNS_QUERY', 'HTTP_200_OK', 'PAYLOAD_ENCRYPTED'];
      const randomFlag = flags[Math.floor(Math.random() * flags.length)];

      return { addr, hexBytes, flag: randomFlag, time: new Date().toLocaleTimeString() };
    };

    // Initial rows
    setHexRows([generateRow(), generateRow(), generateRow(), generateRow()]);

    const interval = setInterval(() => {
      setHexRows(prev => [...prev.slice(-4), generateRow()]);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 90,
        width: minimized ? '220px' : '360px',
        background: 'rgba(5, 10, 24, 0.92)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(0, 229, 255, 0.35)',
        borderRadius: '8px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 229, 255, 0.2)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.76rem',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
    >
      {/* Widget Header */}
      <div 
        onClick={() => setMinimized(!minimized)}
        style={{
          background: 'rgba(0, 229, 255, 0.1)',
          borderBottom: '1px solid rgba(0, 229, 255, 0.25)',
          padding: '8px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00FFA3', boxShadow: '0 0 10px #00FFA3' }}></span>
          <span style={{ color: '#00E5FF', fontWeight: 'bold', letterSpacing: '0.05em' }}>
            PACKET_INSPECTOR v2.4
          </span>
        </div>

        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {minimized ? '▲ [ EXPAND ]' : '▼ [ MINIMIZE ]'}
        </span>
      </div>

      {/* Live Stream Body */}
      {!minimized && (
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.68rem', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '4px' }}>
            <span>ADDR</span>
            <span>RAW_BYTES_HEX</span>
            <span>PROTOCOL_FLAG</span>
          </div>

          {hexRows.map((row, i) => (
            <div 
              key={i} 
              style={{ 
                display: 'flex', 
                justify: 'space-between', 
                alignItems: 'center',
                color: i === hexRows.length - 1 ? '#00FFA3' : 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                opacity: (i + 1) / hexRows.length
              }}
            >
              <span style={{ color: 'var(--accent-primary)' }}>{row.addr}</span>
              <span style={{ letterSpacing: '0.05em', color: '#FFF' }}>{row.hexBytes}</span>
              <span style={{ 
                fontSize: '0.68rem', 
                padding: '1px 5px', 
                borderRadius: '3px',
                background: i === hexRows.length - 1 ? 'rgba(0, 255, 163, 0.15)' : 'rgba(0, 229, 255, 0.1)',
                border: `1px solid ${i === hexRows.length - 1 ? '#00FFA3' : 'rgba(0, 229, 255, 0.3)'}`
              }}>
                {row.flag}
              </span>
            </div>
          ))}

          <div style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px dashed rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            <span>NET_INTERFACE: eth0</span>
            <span style={{ color: '#00FFA3' }}>100% REASS. PACKETS</span>
          </div>
        </div>
      )}
    </div>
  );
}
