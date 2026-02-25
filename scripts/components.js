class GlobalNavbar extends HTMLElement {
    connectedCallback() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        this.innerHTML = `
        <nav class="navbar" id="navbar">
            <div class="nav-container">
                <a href="index.html" class="logo">
                    <span class="logo-bracket">&lt;</span>
                    <span class="logo-text">VS</span>
                    <span class="logo-bracket">/&gt;</span>
                </a>
                <div class="nav-links" id="navLinks">
                    <a href="index.html" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">Home</a>
                    <a href="about.html" class="nav-link ${currentPage === 'about.html' ? 'active' : ''}">About</a>
                    <a href="skills.html" class="nav-link ${currentPage === 'skills.html' ? 'active' : ''}">Skills</a>
                    <a href="projects.html" class="nav-link ${currentPage === 'projects.html' ? 'active' : ''}">Projects</a>
                    <a href="experience.html" class="nav-link ${currentPage === 'experience.html' ? 'active' : ''}">Experience</a>
                    <a href="education.html" class="nav-link ${currentPage === 'education.html' ? 'active' : ''}">Education</a>
                    <a href="contact.html" class="nav-link ${currentPage === 'contact.html' ? 'active' : ''}">Contact</a>
                </div>
                <button class="theme-toggle" id="themeToggle" aria-label="Toggle Theme">
                    <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </button>
                <button class="nav-toggle" id="navToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
        `;
    }
}

class GlobalFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <p>&copy; ${new Date().getFullYear()} Vyom Shah. Crafted with passion and code.</p>
                    <div class="footer-links">
                        <a href="https://github.com/vyomshah14" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://www.linkedin.com/in/vyom-shah-007632290/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://www.instagram.com/_vyom_shah" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
        `;
    }
}

// Register the components
customElements.define('global-navbar', GlobalNavbar);
customElements.define('global-footer', GlobalFooter);
