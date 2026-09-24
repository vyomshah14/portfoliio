import React, { useState, useEffect, useRef } from 'react';

// Real-world proxy nodes for Vyom Shah
const proxyNodes = [
  { city: 'TOKYO, JP', ip: '106.187.42.19', lat: 35.6762, lng: 139.6503, region: 'ASIA-PACIFIC' },
  { city: 'ZURICH, CH', ip: '185.220.101.4', lat: 47.3769, lng: 8.5417, region: 'EUROPE CENTRAL' },
  { city: 'REYKJAVIK, IS', ip: '193.28.179.88', lat: 64.1466, lng: -21.9426, region: 'NORTH ATLANTIC' },
  { city: 'SINGAPORE, SG', ip: '139.99.12.54', lat: 1.3521, lng: 103.8198, region: 'SOUTH ASIA' },
  { city: 'AMSTERDAM, NL', ip: '185.107.56.201', lat: 52.3676, lng: 4.9041, region: 'EUROPE WEST' },
  { city: 'HELSINKI, FI', ip: '95.216.14.88', lat: 60.1699, lng: 24.9384, region: 'NORDIC NODE' },
  { city: 'SYDNEY, AU', ip: '139.99.144.12', lat: -33.8688, lng: 151.2093, region: 'OCEANIA' },
  { city: 'NEW YORK, US', ip: '198.51.100.42', lat: 40.7128, lng: -74.0060, region: 'US EAST' },
  { city: 'LONDON, UK', ip: '185.220.101.5', lat: 51.5074, lng: -0.1278, region: 'EUROPE WEST' },
  { city: 'MUMBAI, IN', ip: '103.21.244.0', lat: 19.0760, lng: 72.8777, region: 'SOUTH ASIA' },
  { city: 'SAN FRANCISCO, US', ip: '104.16.12.3', lat: 37.7749, lng: -122.4194, region: 'US WEST' }
];

export default function CyberThreatMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const activePolylineRef = useRef(null);

  const [currentNodeIdx, setCurrentNodeIdx] = useState(0);
  const [hopCount, setHopCount] = useState(14);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [circuitRoute, setCircuitRoute] = useState([]);
  const [latency, setLatency] = useState('38ms');

  // Load Leaflet CSS and JS dynamically
  useEffect(() => {
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setLeafletLoaded(true);
    document.head.appendChild(script);

    return () => {};
  }, []);

  // Initialize Real-World Dark Cartography Leaflet Map
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current || mapInstanceRef.current) return;

    const L = window.L;

    const map = L.map(mapContainerRef.current, {
      center: [25, 10],
      zoom: 2.2,
      minZoom: 1.5,
      maxZoom: 8,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Esri World Dark Gray Base Tile Layer (100% Free, NO API Key Required)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16,
      attribution: 'Tiles &copy; Esri',
    }).addTo(map);

    // Create markers for each city node
    proxyNodes.forEach((node, idx) => {
      const isVyomNode = idx === 0;

      const customIcon = L.divIcon({
        className: 'cyber-leaflet-marker',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center;">
            <div style="
              width: ${isVyomNode ? '16px' : '10px'}; 
              height: ${isVyomNode ? '16px' : '10px'}; 
              border-radius: 50%; 
              background: ${isVyomNode ? '#00FFA3' : '#00E5FF'}; 
              box-shadow: 0 0 ${isVyomNode ? '25px #00FFA3' : '10px #00E5FF'};
              border: 2px solid #000;
            "></div>
            ${isVyomNode ? '<div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; border: 2px solid #00FFA3; animation: pulseRing 1.8s infinite;"></div>' : ''}
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([node.lat, node.lng], { icon: customIcon }).addTo(map);

      marker.bindTooltip(`
        <div style="font-family: var(--font-mono); font-size: 0.78rem; padding: 4px 8px; background: #020712; color: #FFF; border: 1px solid #00E5FF; border-radius: 4px;">
          <strong style="color: ${isVyomNode ? '#00FFA3' : '#00E5FF'}">${node.city}</strong><br/>
          <span>IP: ${node.ip}</span><br/>
          <span style="font-size: 0.7rem; color: #A8B0BE;">${node.region}</span>
        </div>
      `, { permanent: false, direction: 'top', className: 'cyber-tooltip' });

      markersRef.current[node.city] = marker;
    });

    // Create initial active circuit trajectory polyline
    const initialRoute = [
      [proxyNodes[9].lat, proxyNodes[9].lng], // Mumbai origin
      [proxyNodes[0].lat, proxyNodes[0].lng]  // Active node
    ];

    activePolylineRef.current = L.polyline(initialRoute, {
      color: '#00FFA3',
      weight: 3,
      dashArray: '8, 8',
      opacity: 0.9
    }).addTo(map);

  }, [leafletLoaded]);

  // Handle Untraceable Proxy Node Hopping & Real-Time Trajectory Updates
  useEffect(() => {
    const hopInterval = setInterval(() => {
      setCurrentNodeIdx(prev => {
        const nextIdx = (prev + 1) % proxyNodes.length;
        setHopCount(h => h + 1);

        const activeNode = proxyNodes[nextIdx];
        const originNode = proxyNodes[9]; // Mumbai, IN
        const relayNode = proxyNodes[(nextIdx + 3) % proxyNodes.length];

        // Randomize RTT latency realistically (24ms to 68ms)
        setLatency(Math.floor(Math.random() * 44 + 24) + 'ms');
        setCircuitRoute([originNode.city.split(',')[0], relayNode.city.split(',')[0], activeNode.city.split(',')[0]]);

        if (mapInstanceRef.current && window.L) {
          const L = window.L;
          const map = mapInstanceRef.current;

          // Update marker icons
          proxyNodes.forEach((node, idx) => {
            const marker = markersRef.current[node.city];
            if (marker) {
              const isVyomNode = idx === nextIdx;
              const newIcon = L.divIcon({
                className: 'cyber-leaflet-marker',
                html: `
                  <div style="position: relative; display: flex; align-items: center; justify-content: center;">
                    <div style="
                      width: ${isVyomNode ? '16px' : '10px'}; 
                      height: ${isVyomNode ? '16px' : '10px'}; 
                      border-radius: 50%; 
                      background: ${isVyomNode ? '#00FFA3' : '#00E5FF'}; 
                      box-shadow: 0 0 ${isVyomNode ? '25px #00FFA3' : '10px #00E5FF'};
                      border: 2px solid #000;
                    "></div>
                    ${isVyomNode ? '<div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; border: 2px solid #00FFA3; animation: pulseRing 1.8s infinite;"></div>' : ''}
                  </div>
                `,
                iconSize: [24, 24],
                iconAnchor: [12, 12],
              });
              marker.setIcon(newIcon);
            }
          });

          // Dynamically update active laser trajectory line on the map
          if (activePolylineRef.current) {
            activePolylineRef.current.setLatLngs([
              [originNode.lat, originNode.lng],
              [relayNode.lat, relayNode.lng],
              [activeNode.lat, activeNode.lng]
            ]);
          }

          // Smoothly pan map to active Vyom Shah node
          map.panTo([activeNode.lat, activeNode.lng], { animate: true, duration: 1.2 });
        }

        return nextIdx;
      });
    }, 3500);

    return () => clearInterval(hopInterval);
  }, []);

  const activeNode = proxyNodes[currentNodeIdx];

  return (
    <section id="threat-map" style={{ padding: 'var(--space-64) 0', position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* HUD Box Wrapper */}
        <div
          style={{
            background: 'rgba(5, 12, 26, 0.94)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 255, 163, 0.45)',
            borderRadius: '12px',
            padding: 'var(--space-24)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(0, 255, 163, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: 'var(--space-16)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 'var(--space-12)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00FFA3', boxShadow: '0 0 12px #00FFA3' }}></span>
                <h3 style={{ fontSize: '1.4rem', color: '#FFF', margin: 0, fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>
                  REAL-WORLD CARTOGRAPHY CYBER THREAT MAP // VYOM SHAH PROXY ROUTER
                </h3>
              </div>
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
                Accurate multi-hop VPN circuit trajectory & laser route. Node shifts every 3.5s.
              </p>
            </div>

            {/* Live Untraceable Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0, 255, 163, 0.12)', border: '1px solid #00FFA3', padding: '6px 16px', borderRadius: '20px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#00FFA3', fontWeight: 'bold' }}>
                STATUS: UNTRACEABLE (HOPS: {hopCount})
              </span>
            </div>
          </div>

          {/* Real Leaflet Dark Cartography Map Container */}
          <div
            ref={mapContainerRef}
            style={{
              position: 'relative',
              width: '100%',
              height: '460px',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#01050e',
              border: '1px solid rgba(0, 229, 255, 0.35)',
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
            }}
          />

          {/* Active Node Info Readout Footer */}
          <div style={{ marginTop: 'var(--space-16)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
              <span style={{ color: 'var(--text-muted)' }}>ACTIVE OPERATOR NODE:</span>
              <p style={{ color: '#00FFA3', fontWeight: 'bold', margin: '4px 0 0 0' }}>{activeNode.city}</p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
              <span style={{ color: 'var(--text-muted)' }}>ROUTED IP ADDRESS:</span>
              <p style={{ color: '#00E5FF', fontWeight: 'bold', margin: '4px 0 0 0' }}>{activeNode.ip}</p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
              <span style={{ color: 'var(--text-muted)' }}>MULTI-HOP PROXY CIRCUIT:</span>
              <p style={{ color: '#FFF', fontWeight: 'bold', margin: '4px 0 0 0', fontSize: '0.75rem' }}>
                {circuitRoute.length > 0 ? circuitRoute.join(' ➔ ') : 'MUMBAI ➔ TOKYO'}
              </p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
              <span style={{ color: 'var(--text-muted)' }}>RTT NETWORK LATENCY:</span>
              <p style={{ color: '#BD00FF', fontWeight: 'bold', margin: '4px 0 0 0' }}>{latency}</p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .leaflet-container {
          background: #090e18 !important;
        }
        .leaflet-tooltip.cyber-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </section>
  );
}
