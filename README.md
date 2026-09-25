# Vyom Shah — Interactive Cyber-Themed 3D Portfolio

[![Live Demo](https://img.shields.io/badge/Live_Demo-vyom--shah.vercel.app-00FFA3?style=for-the-badge&logo=vercel&logoColor=000000&labelColor=0d1117)](https://vyom-shah.vercel.app/)
[![React](https://img.shields.io/badge/React-v19.0-00E5FF?style=for-the-badge&logo=react&logoColor=00E5FF&labelColor=0d1117)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-v8.0-7C4DFF?style=for-the-badge&logo=vite&logoColor=7C4DFF&labelColor=0d1117)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-00FFA3?style=for-the-badge&logo=three.js&logoColor=00FFA3&labelColor=0d1117)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-00E5FF?style=for-the-badge&logo=greensock&logoColor=00E5FF&labelColor=0d1117)](https://greensock.com/gsap/)

A high-performance, interactive, cybersecurity-themed 3D developer portfolio for **Vyom Shah**. Built with **React 19**, **Vite 8**, **Three.js**, **React Three Fiber**, **Drei**, **GSAP**, and **Framer Motion**, this portfolio combines real-time 3D WebGL graphics, futuristic cyber-HUD widgets, interactive security tools, and smooth section transitions.

---

## Key Features

### 1. Interactive Boot Terminal (`BootScreen` & `LetterGlitch`)
- Fullscreen ASCII / matrix letter glitch background effect on initialization.
- Interactive terminal boot sequence allowing visitors to enter their custom handle/alias, personalizing their session across the site.
- Stored session state preventing repetitive boot screens during navigation.

### 2. 3D WebGL Canvas & Interactive Nodes (`HeroScene` & Three.js)
- Built with **React Three Fiber** and **@react-three/drei**.
- Dynamic 3D cyber core, orbital particle rings, ambient lighting, and camera position transitions mapped to scroll sections.
- Clickable 3D project & journey nodes in the WebGL scene that trigger interactive overlay cards.
- Canvas-based 3D Cyber Matrix background grid (`Interactive3DCyberMatrix`).

### 3. Built-In Cybersecurity Tooling Suite
- **Password Hash & Entropy Analyzer (`PasswordHashTool`)**: Real-time hash generation (SHA-256, MD5, SHA-512, bcrypt simulation) with password entropy evaluation, crack time estimation, and breach checks.
- **Network Topology Scanner (`NetworkTopologyScanner`)**: Interactive subnet and port scanner displaying live port vulnerability statuses and topology diagrams.
- **Global Cyber Threat Map (`CyberThreatMap`)**: Node map displaying active simulated security events and node connections.
- **Interactive CTF Hack Challenge (`CyberHackChallenge`)**: Capture-The-Flag challenge modal triggered directly from the terminal or quick action buttons.

### 4. Real-Time Security HUD & Overlay Widgets
- **Hex Stream Inspector (`HexStreamWidget`)**: Fixed bottom-right live network packet stream inspector.
- **SOC Audit Logs HUD (`SecurityLogsHUD`)**: Fixed bottom-left rolling security audit and intrusion log stream.
- **Custom Cyber Reticle Cursor (`CyberCursor`)**: Reticle target tracking cursor with contextual hover animations.

### 5. Live GitHub Contribution Calendar
- Fetches live contribution data for GitHub user `@vyomshah14`.
- Multi-tier fetch pipeline:
  1. Primary: Vercel GraphQL API route (`/api/github-contributions`) with GitHub Personal Access Token authentication.
  2. Secondary: Scraping proxy route (`/api/github-calendar-proxy`).
  3. Fallback handling for seamless UX when offline or rate-limited.

### 6. Futuristic Glassmorphic Design System
- Dark mode glassmorphic UI components with glowing neon accents (`#00FFA3`, `#00E5FF`, `#BD00FF`).
- Smooth GSAP ScrollTrigger animations, section tracking, and Framer Motion reveal effects.
- Fully responsive layout supporting mobile, tablet, and desktop screens.

---

## Tech Stack

- **Core Framework**: [React 19](https://react.dev/), [React DOM 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **3D & WebGL**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations**: [GSAP](https://greensock.com/gsap/) & [ScrollTrigger](https://greensock.com/scrolltrigger/), [@gsap/react](https://github.com/greensock/react), [Framer Motion](https://www.framer.com/motion/), [Anime.js](https://animejs.com/)
- **Iconography**: [@hugeicons/react](https://hugeicons.com/), [@hugeicons/core-free-icons](https://hugeicons.com/)
- **Styles**: CSS3 Custom Properties (`styles/main.css`, `src/styles/react.css`), Glassmorphism, CSS Grid & Flexbox
- **Backend / Micro-APIs**: Node.js Vercel Serverless Functions (`api/github-contributions.js`, `api/github-calendar-proxy.js`)
- **Hosting & Deployment**: [Vercel](https://vercel.com/)

---

## Project Structure

```text
Portfolio website/
├── api/                             # Vercel Serverless API Functions
│   ├── github-calendar-proxy.js     # GitHub HTML scraper fallback proxy
│   └── github-contributions.js      # GitHub GraphQL API handler
├── public/                          # Static public assets & certificates
│   ├── assets/                      # Public media & photos
│   └── Certificate/                 # Certificate documents & images
├── src/
│   ├── components/                  # React UI components & widgets
│   │   ├── boot/                    # Boot screen & terminal components
│   │   │   └── BootScreen.jsx       # Terminal boot sequence & handle prompt
│   │   ├── cyber/                   # Cyber HUD & tool components
│   │   │   ├── CyberCursor.jsx      # Custom reticle cursor
│   │   │   ├── CyberHackChallenge.jsx # Interactive CTF modal
│   │   │   ├── CyberThreatMap.jsx   # Interactive security threat map
│   │   │   ├── HexStreamWidget.jsx  # Network packet stream inspector
│   │   │   ├── Interactive3DCyberMatrix.jsx # 3D matrix particle background
│   │   │   ├── LetterGlitch.jsx     # Matrix ASCII canvas glitch effect
│   │   │   ├── NetworkTopologyScanner.jsx # Subnet & port scanner tool
│   │   │   ├── PasswordHashTool.jsx # Crypto hash & entropy generator
│   │   │   └── SecurityLogsHUD.jsx  # SOC audit log stream widget
│   │   ├── journey/                 # Journey modal overlays
│   │   ├── projects/                # Project overlay cards
│   │   ├── ErrorBoundary.jsx        # React error boundary for 3D canvas
│   │   ├── Footer.jsx               # Site footer
│   │   ├── GooeyNav.jsx             # Cyber gooey navigation menu
│   │   └── Navbar.jsx               # Top navigation bar & controls
│   ├── data/                        # Static application data & content
│   │   ├── education.js             # Degrees, coursework & certs
│   │   ├── experience.js            # Work history & roles
│   │   ├── journey.js               # Career timeline & milestones
│   │   ├── photos.js                # Photography gallery items
│   │   ├── projects.js              # Project portfolio items & metadata
│   │   └── skills.js                # Tech stack & security skill categories
│   ├── hooks/                       # Custom React hooks
│   │   ├── useScrollEffects.js      # Scroll tracking & header states
│   │   ├── useStaticInteractions.js # Interaction handlers
│   │   └── useTheme.js              # Theme state manager
│   ├── sections/                    # Main section components
│   │   ├── About.jsx                # Bio, stats, & GitHub calendar
│   │   ├── Contact.jsx              # Contact console & form
│   │   ├── Education.jsx            # Education & certifications section
│   │   ├── Experience.jsx           # Work experience timeline section
│   │   ├── Hero.jsx                 # Hero landing section & alias display
│   │   ├── JourneySection.jsx       # Interactive journey roadmap
│   │   ├── Projects.jsx             # Filterable project showcase
│   │   └── Skills.jsx               # Interactive skill grid & meters
│   ├── styles/                      # React-specific CSS styles
│   │   └── react.css
│   ├── three/                       # Three.js 3D WebGL scenes & objects
│   │   ├── AmbientParticles.jsx     # 3D floating background particles
│   │   ├── CyberCore.jsx            # Glowing central 3D cyber core
│   │   ├── HeroScene.jsx            # Main R3F Canvas & Camera Controller
│   │   ├── NetworkSystem.jsx        # Dynamic 3D network lines & nodes
│   │   └── OrbitalRings.jsx         # Rotating 3D wireframe rings
│   ├── App.jsx                      # Main App wrapper & layout coordinator
│   └── main.jsx                     # Application entry point
├── styles/                          # Global CSS design system
│   └── main.css
├── index.html                       # HTML entry point
├── package.json                     # Project manifest & dependencies
├── vercel.json                      # Vercel deployment configuration
└── vite.config.js                   # Vite build configuration
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vyomshah14/Portfolio-website.git
   cd "Portfolio website"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with HMR. |
| `npm run build` | Bundles the application for production deployment. |
| `npm run preview` | Runs a local web server to preview the production build. |

---

## Environment Variables

To enable real-time GitHub GraphQL calendar fetching, create a `.env.local` file in the root directory:

```env
# Optional: GitHub Personal Access Token for higher rate-limit GraphQL queries
GITHUB_PAT=your_github_personal_access_token
```

*Note: If `GITHUB_PAT` is omitted, the app automatically fails over to public CORS proxies or HTML scraping handlers.*

---

## Deployment

This project is optimized for deployment on **Vercel**.

1. Connect your repository to **Vercel**.
2. Configure **Environment Variables** in Vercel settings if using `GITHUB_PAT`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. The included `vercel.json` ensures serverless API functions (`/api/*`) and SPA routing rewrites work out of the box.

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Author

**Vyom Shah**  
*Software Engineer & Cybersecurity Enthusiast*

- **Portfolio**: [vyom-shah.vercel.app](https://vyom-shah.vercel.app/)
- **GitHub**: [@vyomshah14](https://github.com/vyomshah14)
- **LinkedIn**: [Vyom Shah](https://www.linkedin.com/in/vyom-shah-007632290/)

---

## License

This project is open source and available under the [ISC License](LICENSE).
