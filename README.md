# Vyom Shah - Portfolio Website

A modern, professional portfolio website showcasing my work as a Software Developer. Built with clean HTML, CSS, and JavaScript featuring a stunning dark mode design with smooth animations and interactive elements.

## 🌟 Features

- **Responsive Design** - Fully responsive across all devices (mobile, tablet, desktop)
- **Dark Professional Theme** - Modern dark mode with vibrant accent colors
- **Smooth Animations** - Engaging animations and transitions throughout
- **Interactive Elements** - Hover effects, scroll animations, and dynamic content
- **Multi-page Structure** - Organized content across dedicated pages
- **Contact Form** - Functional contact form for inquiries
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Performance Optimized** - Fast loading with optimized assets

## 📁 Project Structure

```
Portfolio website/
├── index.html          # Home page with hero section
├── about.html          # About me page
├── skills.html         # Technical skills showcase
├── projects.html       # Portfolio projects
├── experience.html     # Professional experience
├── education.html      # Education & certifications
├── contact.html        # Contact form and info
├── styles/
│   └── main.css       # Main stylesheet
└── scripts/
    └── main.js        # JavaScript functionality
```

## 🎨 Design Features

### Color Scheme
- Primary Background: `#0a0e27`
- Accent Colors: `#6366f1` (Indigo) & `#8b5cf6` (Purple)
- Text: Various shades of gray for hierarchy

### Typography
- Primary Font: Inter (Google Fonts)
- Monospace Font: JetBrains Mono (for code snippets)

### Key Sections
1. **Home** - Animated hero section with code window
2. **About** - Personal introduction and highlights
3. **Skills** - Categorized technical skills with progress bars
4. **Projects** - Filterable project showcase
5. **Experience** - Timeline of professional experience
6. **Education** - Academic qualifications and certifications
7. **Contact** - Contact form and social links

## 🚀 Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. No build process required - pure HTML/CSS/JS!

### Customization

#### Update Personal Information
- Edit the HTML files to update your name, bio, and content
- Modify social media links in the navigation and footer
- Update email address in `contact.html`

#### Customize Colors
Edit the CSS variables in `styles/main.css`:
```css
:root {
    --accent-primary: #6366f1;
    --accent-secondary: #8b5cf6;
    /* ... other variables */
}
```

#### Add Your Projects
In `projects.html`, duplicate the `.project-card` structure and update:
- Project title and description
- Technology tags
- Project links (live demo and GitHub)

#### Update Experience
In `experience.html`, modify the timeline items with your work history

## 🔧 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Google Fonts** - Inter & JetBrains Mono
- **SVG Icons** - Inline SVG for crisp icons

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ✨ Interactive Features

- Animated statistics counter
- Typing effect on hero section
- Smooth scroll animations
- Project filtering system
- Mobile-responsive navigation
- Form validation and submission
- Parallax background effects
- Hover animations on cards and buttons

## 📝 Customization Guide

### Adding New Projects

```html
<div class="project-card" data-category="web">
    <div class="project-image">
        <!-- Add your project image or placeholder -->
    </div>
    <div class="project-content">
        <h3 class="project-title">Your Project Name</h3>
        <p class="project-description">Project description...</p>
        <div class="project-tech">
            <span class="tech-tag">Technology 1</span>
            <span class="tech-tag">Technology 2</span>
        </div>
    </div>
</div>
```

### Updating Skills

Edit the skill categories and percentages in `skills.html`:
```html
<div class="skill-item">
    <div class="skill-info">
        <span class="skill-name">Your Skill</span>
        <span class="skill-percentage">90%</span>
    </div>
    <div class="skill-bar">
        <div class="skill-progress" style="width: 90%"></div>
    </div>
</div>
```

## 🌐 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select your branch and root folder
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify
1. Drag and drop the folder to Netlify
2. Your site will be deployed instantly

### Vercel
1. Import your GitHub repository
2. Deploy with one click

## 📧 Contact Form Setup

The contact form currently uses a simulated submission. To make it functional:

1. **Using Formspree:**
   - Sign up at [formspree.io](https://formspree.io)
   - Update the form action in `contact.html`

2. **Using EmailJS:**
   - Sign up at [emailjs.com](https://www.emailjs.com)
   - Add the EmailJS SDK and configure in `scripts/main.js`

3. **Backend API:**
   - Create your own backend endpoint
   - Update the fetch URL in `scripts/main.js`

## 🎯 Performance Tips

- Images are optimized for web
- CSS and JS are minified for production
- Lazy loading implemented for images
- Smooth scroll behavior for better UX

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 💡 Future Enhancements

- [ ] Add blog section
- [ ] Implement light/dark mode toggle
- [ ] Add more project case studies
- [ ] Integrate with CMS for easy content updates
- [ ] Add testimonials section
- [ ] Implement analytics

## 👨‍💻 Author

**Vyom Shah**
- GitHub: [@vyomshah](https://github.com/vyomshah)
- LinkedIn: [vyomshah](https://linkedin.com/in/vyomshah)

---

**Crafted with passion and code** ✨
