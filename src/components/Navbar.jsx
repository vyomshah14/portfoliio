import { useEffect, useState } from 'react';

const navItems = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/skills', 'Skills'],
  ['/projects', 'Projects'],
  ['/experience', 'Experience'],
  ['/education', 'Education'],
  ['/contact', 'Contact'],
];

function AuthStatus() {
  const [user, setUser] = useState(() => localStorage.getItem('portfolio-user'));

  const signIn = () => {
    const name = window.prompt('Sign in to continue', user || 'Vyom Shah');
    if (!name) return;
    localStorage.setItem('portfolio-user', name);
    setUser(name);
  };

  const signOut = () => {
    localStorage.removeItem('portfolio-user');
    setUser(null);
  };

  useEffect(() => {
    window.openClerkSignIn = signIn;
    return () => {
      delete window.openClerkSignIn;
    };
  }, [user]);

  if (user) {
    return (
      <button className="auth-pill" type="button" onClick={signOut} title="Sign out">
        <span className="auth-avatar">{user.trim().charAt(0).toUpperCase()}</span>
        <span>{user}</span>
      </button>
    );
  }

  return (
    <button className="auth-pill" type="button" onClick={signIn}>
      Sign In
    </button>
  );
}

export default function Navbar({ currentPath, onNavigate, theme, onToggleTheme }) {
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

  const isActive = (href) => {
    if (href === '/') return currentPath === '/';
    return currentPath === href;
  };

  const handleNavigate = (event, href) => {
    event.preventDefault();
    setMenuOpen(false);
    onNavigate(href);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <a href="/" className="logo" onClick={(event) => handleNavigate(event, '/')}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">VS</span>
          <span className="logo-bracket">/&gt;</span>
        </a>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`} id="navLinks">
          {navItems.map(([href, label]) => (
            <a
              href={href}
              key={href}
              className={`nav-link ${isActive(href) ? 'active' : ''}`}
              onClick={(event) => handleNavigate(event, href)}
            >
              {label}
            </a>
          ))}
          <div id="auth-container">
            <AuthStatus />
          </div>
        </div>

        <button className="theme-toggle" id="themeToggle" aria-label="Toggle Theme" type="button" onClick={onToggleTheme}>
          <svg className="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: theme === 'light' ? 'block' : 'none' }}><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
          <svg className="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: theme === 'light' ? 'none' : 'block' }}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
        </button>

        <button className={`nav-toggle ${menuOpen ? 'active' : ''}`} id="navToggle" type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
