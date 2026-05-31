import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import GlobalBackground from './components/GlobalBackground.jsx';
import Home from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Experience from './sections/Experience.jsx';
import Education from './sections/Education.jsx';
import Contact from './sections/Contact.jsx';
import { useTheme } from './hooks/useTheme.js';
import { useScrollEffects } from './hooks/useScrollEffects.js';
import { useStaticInteractions } from './hooks/useStaticInteractions.js';

const pageTitles = {
  '/': 'Vyom Shah - Software Developer',
  '/about': 'About - Vyom Shah',
  '/skills': 'Skills - Vyom Shah',
  '/projects': 'Projects - Vyom Shah',
  '/experience': 'Experience - Vyom Shah',
  '/education': 'Education - Vyom Shah',
  '/contact': 'Contact - Vyom Shah',
};

const pages = {
  about: About,
  skills: Skills,
  projects: Projects,
  experience: Experience,
  education: Education,
  contact: Contact,
};

function getPath() {
  const path = window.location.pathname;
  if (path === '/index.html') return '/';
  if (path.endsWith('.html')) return path.replace('.html', '');
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}

export default function App() {
  const [path, setPath] = useState(getPath);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handlePop = () => setPath(getPath());
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  useEffect(() => {
    document.title = pageTitles[path] || pageTitles['/'];
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [path]);

  const pageKey = useMemo(() => path.replace('/', '') || 'index', [path]);

  const navigate = (href) => {
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return;
    const target = href.endsWith('.html') ? href.replace('.html', '') : href;
    window.history.pushState({}, '', target);
    setPath(getPath());
  };

  useScrollEffects(pageKey);
  useStaticInteractions(pageKey, navigate);

  const Page = pages[pageKey] || About;

  return (
    <>
      <Navbar currentPath={path} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} />
      <GlobalBackground />
      <main>
        {pageKey === 'index' ? <Home /> : <Page />}
      </main>
      <Footer />
    </>
  );
}
