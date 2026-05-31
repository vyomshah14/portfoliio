# Vyom Shah -  Portfolio

🌐 **Live:** [vyom-shah.vercel.app](https://vyom-shah.vercel.app/)

A modern React portfolio for Vyom Shah, built with Vite, React, Framer Motion, React Three Fiber, Three.js, and Drei. The project preserves the original approved visual identity while moving the codebase to a maintainable React-only architecture.

## Features

- React-only single page app with clean routes
- Preserved glassmorphism design, typography, colors, spacing, and responsive layout
- Framer Motion hero reveals and subtle UI animation
- Real GitHub contribution calendar using API/proxy fetches
- Animated stats, skill bars, project filters, and photography gallery
- Contact form wired to Web3Forms
- Vercel-ready API routes and SPA rewrites

## Tech Stack

- React
- Vite
- React Hooks
- Framer Motion
- CSS custom properties in `styles/main.css`

## Project Structure

```text
Portfolio website/
├── api/
│   ├── github-calendar-proxy.js
│   └── github-contributions.js
├── assets/
├── public/
│   ├── assets/
│   └── Certificate/
├── src/
│   ├── components/
│   │   ├── AnimatedWrapper.jsx
│   │   ├── AvatarScene.jsx
│   │   ├── Button.jsx
│   │   ├── Footer.jsx
│   │   ├── GlobalBackground.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── SectionTitle.jsx
│   │   └── StaticPage.jsx
│   ├── data/
│   │   ├── pageMarkup.js
│   │   ├── photos.js
│   │   └── renderGithubCalendar.js
│   ├── hooks/
│   │   ├── useScrollEffects.js
│   │   ├── useStaticInteractions.js
│   │   └── useTheme.js
│   ├── sections/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── styles/
│   │   └── react.css
│   ├── App.jsx
│   └── main.jsx
├── styles/
│   └── main.css
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Routes

The app is a React SPA. Vercel rewrites all non-API routes to `index.html`.

- `/`
- `/about`
- `/skills`
- `/projects`
- `/experience`
- `/education`
- `/contact`

## GitHub Contributions

The contribution calendar fetches real data for `vyomshah14`.

Fetch order:

1. `/api/github-contributions` using GitHub GraphQL when `GITHUB_PAT` is configured.
2. `/api/github-calendar-proxy` scraping GitHub contribution HTML.
3. Public CORS HTML proxy fallbacks.

If real data cannot be fetched, the UI shows a load error instead of fake contribution data.

## Styling

The approved visual system is preserved in `styles/main.css`.

React-specific compatibility styles and 3D/avatar additions live in `src/styles/react.css`.

## Deployment

This project is configured for Vercel.

Important deployment notes:

- Keep `vercel.json` rewrites so clean SPA routes work.
- Add `GITHUB_PAT` in Vercel environment variables for the GraphQL contribution endpoint.
- Public assets are served from `public/`.

## Author

**Vyom Shah**

- 🌐 Portfolio: [vyom-shah.vercel.app](https://vyom-shah.vercel.app/)
- GitHub: [@vyomshah14](https://github.com/vyomshah14)
- LinkedIn: [Vyom Shah](https://www.linkedin.com/in/vyom-shah-007632290/)
