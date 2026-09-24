import { useEffect, useState } from 'react';
import GooeyNav from './GooeyNav.jsx';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Education', href: '/education' },
  { label: 'Contact', href: '/contact' },
];

// ─── Cyber Operator Authenticator Badge ─────────────────────────────────────
function AuthStatus() {
  const [user, setUser] = useState(() => localStorage.getItem('portfolio-user'));

  const signIn = () => {
    const name = window.prompt('ENTER OPERATOR ALIAS / VISITOR HANDLE:', user || 'Vyom Shah');
    if (!name) return;
    localStorage.setItem('portfolio-user', name);
    setUser(name);
  };

  const signOut = () => {
    if (window.confirm('TERMINATE OPERATOR SESSION?')) {
      localStorage.removeItem('portfolio-user');
      setUser(null);
    }
  };

  useEffect(() => {
    window.openClerkSignIn = signIn;
    return () => {
      delete window.openClerkSignIn;
    };
  }, [user]);

  if (user) {
    return (
      <button
        onClick={signOut}
        title="Click to sign out operator session"
        type="button"
        style={{
          background: 'rgba(0, 229, 255, 0.12)',
          border: '1px solid var(--accent-primary, #00E5FF)',
          color: '#FFF',
          padding: '5px 12px',
          borderRadius: '20px',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.74rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 0 12px rgba(0, 229, 255, 0.3)',
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 229, 255, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 229, 255, 0.3)';
        }}
      >
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00FFA3', boxShadow: '0 0 8px #00FFA3' }}></span>
        <span>OPERATOR: <strong style={{ color: '#00E5FF' }}>{user.trim().toUpperCase()}</strong></span>
        <span style={{ fontSize: '0.65rem', color: '#00FFA3', padding: '1px 5px', background: 'rgba(0,255,163,0.15)', borderRadius: '3px' }}>LVL 5</span>
      </button>
    );
  }

  return (
    <button
      onClick={signIn}
      type="button"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(0, 229, 255, 0.3)',
        color: '#00E5FF',
        padding: '5px 12px',
        borderRadius: '20px',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.74rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(0, 229, 255, 0.15)';
        e.currentTarget.style.borderColor = '#00E5FF';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.3)';
      }}
    >
      <span>🔑</span>
      <span>[ AUTHENTICATE ]</span>
    </button>
  );
}

export default function Navbar({ currentPath, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const activeIndex = Math.max(0, navItems.findIndex((item) => {
    if (item.href === '/') return currentPath === '/';
    return currentPath === item.href;
  }));

  const handleNavigate = (event, href) => {
    if (event && event.preventDefault) event.preventDefault();
    setMenuOpen(false);
    if (onNavigate && href) onNavigate(href);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      padding: '8px 28px',
      background: scrolled ? 'rgba(2, 6, 16, 0.95)' : 'rgba(2, 6, 16, 0.75)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(0, 229, 255, 0.18)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      transition: 'all 0.3s ease',
    }}>
      <div className="nav-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        maxWidth: '1440px',
        margin: '0 auto',
        height: '46px'
      }}>
        {/* Left: Logo */}
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
          <a href="/" className="logo" onClick={(event) => handleNavigate(event, '/')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 'bold', fontSize: '1.25rem', color: '#00E5FF' }}>
            <span className="logo-bracket" style={{ color: '#00FFA3' }}>&lt;</span>
            <span className="logo-text" style={{ color: '#ffffff', letterSpacing: '2px' }}>VS</span>
            <span className="logo-bracket" style={{ color: '#00FFA3' }}>/&gt;</span>
          </a>
        </div>

        {/* Center: Centered GooeyNav Navigation Menu */}
        <div className={`nav-links ${menuOpen ? 'active' : ''}`} id="navLinks" style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <GooeyNav
            items={navItems}
            initialActiveIndex={activeIndex}
            particleCount={15}
            particleDistances={[75, 12]}
            particleR={85}
            animationTime={450}
            timeVariance={200}
            colors={[1, 2, 3, 1, 2, 3, 4]}
            onItemClick={handleNavigate}
          />
        </div>

        {/* Right: Action Buttons (PLAY CTF & AuthStatus) */}
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* PLAY CTF Action Button */}
          <button
            type="button"
            onClick={() => {
              if (window.__toggleCtfModal) window.__toggleCtfModal(true);
            }}
            style={{
              background: 'rgba(0, 255, 163, 0.15)',
              border: '1px solid #00FFA3',
              color: '#00FFA3',
              padding: '5px 12px',
              borderRadius: '20px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.74rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 0 14px rgba(0, 255, 163, 0.35)',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#00FFA3';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 255, 163, 0.15)';
              e.currentTarget.style.color = '#00FFA3';
            }}
          >
            <span>🔓</span>
            <span>PLAY CTF</span>
          </button>

          {/* Cyber Operator Authenticator Status */}
          <AuthStatus />
        </div>

        {/* Mobile Hamburger Toggle */}
        <button className={`nav-toggle ${menuOpen ? 'active' : ''}`} id="navToggle" type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
