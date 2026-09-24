import React, { useState } from 'react';

const networkNodes = [
  { id: 'firewall', label: 'PRIMARY FIREWALL', ip: '192.168.1.1', status: 'HARDENED EDGE', ports: ['80/HTTP', '443/HTTPS'], score: 'A+ (PFS & IPS Rule Enforcement)' },
  { id: 'web', label: 'DMZ WEB SERVER', ip: '192.168.1.10', status: 'WAF PROTECTED', ports: ['80/HTTP', '443/HTTPS', '22/SSH'], score: 'A (Nginx/1.24.0 / WAF Active)' },
  { id: 'db', label: 'ENCRYPTED DATABASE', ip: '192.168.1.50', status: 'INTERNAL ONLY', ports: ['3306/MYSQL (LOCAL ONLY)', '5432/PGSQL'], score: 'A+ (AES-256 Storage Encryption)' },
  { id: 'honeypot', label: 'HONEYPOT TRAP', ip: '192.168.1.99', status: 'DECOY TRAP', ports: ['21/FTP (DECOY)', '23/TELNET (DECOY)', '8080/PROXY'], score: '⚠️ INTENTIONAL DECOY TRAP (3 ATTACKS LOGGED)' }
];

export default function NetworkTopologyScanner() {
  const [selectedNode, setSelectedNode] = useState(networkNodes[1]);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const runPortScan = (node) => {
    setSelectedNode(node);
    setScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setScanning(false);
      setScanResult({
        node: node.label,
        ip: node.ip,
        openPorts: node.ports,
        latency: Math.floor(Math.random() * 12 + 2) + 'ms',
        securityScore: node.score
      });
    }, 1200);
  };

  return (
    <div
      style={{
        background: 'rgba(5, 12, 26, 0.92)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(0, 229, 255, 0.3)',
        borderRadius: '12px',
        padding: 'var(--space-24)',
        boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
        fontFamily: 'var(--font-mono)',
        marginBottom: 'var(--space-32)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-16)' }}>
        <span style={{ fontSize: '1.3rem' }}>🌐</span>
        <h4 style={{ fontSize: '1.2rem', color: '#FFF', margin: 0, fontWeight: 'bold' }}>
          REALISTIC NETWORK TOPOLOGY & NMAP PORT SCANNER SIMULATOR
        </h4>
      </div>

      {/* Node Graph Selector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: 'var(--space-20)' }}>
        {networkNodes.map((n) => (
          <div
            key={n.id}
            onClick={() => runPortScan(n)}
            style={{
              background: selectedNode.id === n.id ? 'rgba(0, 229, 255, 0.15)' : 'rgba(0,0,0,0.4)',
              border: `1px solid ${selectedNode.id === n.id ? '#00E5FF' : 'rgba(255,255,255,0.1)'}`,
              padding: '12px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ color: selectedNode.id === n.id ? '#00FFA3' : '#FFF', fontWeight: 'bold', fontSize: '0.85rem' }}>
              {n.label}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>
              IP: {n.ip}
            </div>
          </div>
        ))}
      </div>

      {/* Scan Results Display */}
      {scanning ? (
        <div style={{ padding: '16px', background: 'rgba(0,0,0,0.5)', borderRadius: '6px', textAlign: 'center', color: '#00FFA3', fontSize: '0.9rem' }}>
          ⚡ EXECUTING NMAP SYN PORT SCAN ON {selectedNode.ip}...
        </div>
      ) : scanResult ? (
        <div style={{ background: 'rgba(0,0,0,0.6)', padding: '16px', borderRadius: '8px', border: `1px solid ${selectedNode.id === 'honeypot' ? '#FFB020' : 'rgba(0, 255, 163, 0.3)'}` }}>
          <div style={{ color: selectedNode.id === 'honeypot' ? '#FFB020' : '#00FFA3', fontWeight: 'bold', fontSize: '0.92rem', marginBottom: '8px' }}>
            ✓ PORT SCAN COMPLETED FOR {scanResult.node} ({scanResult.ip})
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div>OPEN PORTS DETECTED: <span style={{ color: '#FFF' }}>{scanResult.openPorts.join(' | ')}</span></div>
            <div>NETWORK LATENCY: <span style={{ color: '#00E5FF' }}>{scanResult.latency}</span></div>
            <div>SECURITY ARCHITECTURE: <span style={{ color: selectedNode.id === 'honeypot' ? '#FFB020' : '#00FFA3' }}>{scanResult.securityScore}</span></div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
