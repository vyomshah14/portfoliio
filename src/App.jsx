import { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import JourneySection from './sections/JourneySection.jsx';
import Experience from './sections/Experience.jsx';
import Education from './sections/Education.jsx';
import Contact from './sections/Contact.jsx';

import { useTheme } from './hooks/useTheme.js';
import { useStaticInteractions } from './hooks/useStaticInteractions.js';

import HeroScene from './three/HeroScene.jsx';
import { ProjectOverlay } from './components/projects/ProjectOverlay.jsx';
import { JourneyOverlay } from './components/journey/JourneyOverlay.jsx';
import CyberGridBackground from './components/cyber/CyberGridBackground.jsx';
import MatrixRainBackground from './components/cyber/MatrixRainBackground.jsx';
import TopCyberTicker from './components/cyber/TopCyberTicker.jsx';
import CyberCursor from './components/cyber/CyberCursor.jsx';
import HexStreamWidget from './components/cyber/HexStreamWidget.jsx';
import CyberHackChallenge from './components/cyber/CyberHackChallenge.jsx';
import CyberThreatMap from './components/cyber/CyberThreatMap.jsx';
import PasswordHashTool from './components/cyber/PasswordHashTool.jsx';
import NetworkTopologyScanner from './components/cyber/NetworkTopologyScanner.jsx';
import SecurityLogsHUD from './components/cyber/SecurityLogsHUD.jsx';
import LetterGlitch from './components/cyber/LetterGlitch.jsx';
import BootScreen from './components/boot/BootScreen.jsx';
import Interactive3DCyberMatrix from './components/cyber/Interactive3DCyberMatrix.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';

import { projects } from './data/projects.js';
import { journey } from './data/journey.js';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const mainRef = useRef(null);

  // Boot state
  const [bootDone, setBootDone] = useState(() => sessionStorage.getItem('bootDone') === 'true');
  const [userName, setUserName] = useState(() => localStorage.getItem('vyom-cyber-visitor-name') || '');

  // Background Theme Mode state
  const [bgMode, setBgMode] = useState(() => localStorage.getItem('cyber-bg-mode') || 'aurora');

  // App state
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [isCtfOpen, setIsCtfOpen] = useState(false);

  // Expose global CTF opener for terminal command 'hack' / 'ctf'
  useEffect(() => {
    window.__toggleCtfModal = (val) => setIsCtfOpen(val !== undefined ? val : true);
  }, []);

  // Handle boot complete
  const handleBootComplete = (name) => {
    setUserName(name);
    setBootDone(true);
    sessionStorage.setItem('bootDone', 'true');
  };

  // Lock scroll during boot
  useEffect(() => {
    document.body.style.overflow = bootDone ? 'auto' : 'hidden';
  }, [bootDone]);

  // Scroll tracking + GSAP animations
  useGSAP(() => {
    if (!bootDone) return;

    setTimeout(() => {
      ScrollTrigger.refresh();

      const sections = ['hero', 'about', 'skills', 'projects', 'journey', 'experience', 'education', 'contact'];
      sections.forEach(id => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
      });

      const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (pref) return;

      gsap.fromTo('.timeline-item',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.15, scrollTrigger: { trigger: '.experience-section', start: 'top 80%', scrub: true } }
      );
    }, 150);

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, { scope: mainRef, dependencies: [bootDone] });

  // Clean overlays on section change
  useEffect(() => {
    if (activeSection !== 'projects') setSelectedProject(null);
    if (activeSection !== 'journey')  setSelectedJourney(null);
  }, [activeSection]);

  const navigate = (href) => {
    if (!href || href.startsWith('http') || href.startsWith('mailto:')) return;
    const id = href.replace('/', '').replace('.html', '') || 'hero';
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useStaticInteractions('index', navigate);

  return (
    <div ref={mainRef} style={{ position: 'relative' }}>

      {/* ── Boot Screen with Fullscreen LetterGlitch Background ── */}
      {!bootDone && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden' }}>
          <LetterGlitch
            glitchSpeed={45}
            centerVignette={false}
            outerVignette={true}
            smooth={true}
            glitchColors={['#2b4539', '#00FFA3', '#00E5FF', '#BD00FF', '#61b3dc']}
          />
          <BootScreen onComplete={handleBootComplete} />
        </div>
      )}

      {/* ── Custom Cyber Reticle Cursor ── */}
      {bootDone && <CyberCursor />}

      {/* ── Live Network Packet Stream Inspector Widget (Bottom Right) ── */}
      {bootDone && <HexStreamWidget />}

      {/* ── Real-Time SOC Audit Logs Stream (Bottom Left) ── */}
      {bootDone && <SecurityLogsHUD />}

      {/* ── Interactive CTF Hack Challenge Modal ── */}
      {bootDone && <CyberHackChallenge isOpen={isCtfOpen} onClose={() => setIsCtfOpen(false)} />}

      {/* ── Interactive 3D Cyber Matrix Canvas & 3D Scene ── */}
      {bootDone && (
        <>
          <Interactive3DCyberMatrix />
          <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'auto' }}>
            <ErrorBoundary>
              <HeroScene
                projects={projects}
                selectedProject={selectedProject}
                onSelectProject={setSelectedProject}
                journeyData={journey}
                selectedJourney={selectedJourney}
                onSelectJourney={setSelectedJourney}
                activeSection={activeSection}
              />
            </ErrorBoundary>
          </div>
        </>
      )}

      {/* ── DOM Content ── */}
      {bootDone && (
        <>
          <Navbar currentPath="/" onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} />

          <main
            style={{
              position: 'relative',
              zIndex: 1,
              opacity: 1,
              pointerEvents: 'auto',
            }}
          >
            <div id="hero">  <Hero userName={userName} /></div>
            <div id="about"> <About /></div>

            {/* Dynamic Untraceable Vyom Shah Node Map */}
            <CyberThreatMap />

            <div id="skills"><Skills /></div>

            {/* Interactive Cyber Tools (Password Hash Analyzer & Network Topology Port Scanner) */}
            <section style={{ padding: 'var(--space-48) 0', position: 'relative', zIndex: 1 }}>
              <div className="container">
                <PasswordHashTool />
                <NetworkTopologyScanner />
              </div>
            </section>

            <div id="projects"><Projects onSelectProject={setSelectedProject} /></div>
            <div id="journey"><JourneySection onSelectJourney={setSelectedJourney} /></div>
            <div id="experience"><Experience /></div>
            <div id="education"><Education /></div>
            <div id="contact">  <Contact /></div>
          </main>

          {selectedProject && <ProjectOverlay project={selectedProject} onClose={() => setSelectedProject(null)} />}
          {selectedJourney  && <JourneyOverlay journey={selectedJourney}  onClose={() => setSelectedJourney(null)} />}

          <Footer />
        </>
      )}
    </div>
  );
}
