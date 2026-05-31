// scripts/auth.js

// Replace this with your actual Clerk Publishable Key from the Clerk API Dashboard.
// You can also override it before this script loads with:
// <script>window.CLERK_PUBLISHABLE_KEY = 'pk_test_...';</script>
const CLERK_PUBLISHABLE_KEY =
    window.CLERK_PUBLISHABLE_KEY || pk_test_ZXRlcm5hbC1za3lsYXJrLTE0LmNsZXJrLmFjY291bnRzLmRldiQ;

const CLERK_SCRIPT_URL = 'https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js';

async function initClerk() {
    // 1. Direct fallback for file:// protocol (double-clicking index.html/contact.html)
    if (window.location.protocol === 'file:') {
        console.warn('Real Clerk sign-in requires http://localhost or a deployed domain. Using mock auth for file://.');
>>>>>>> 97e2af7 (Sign-in fix')
        initMockAuth();
        return;
    }

    // 2. Load the actual Clerk script for local server (localhost) or deployed domains
    const script = document.createElement('script');
    script.id = 'clerk-js';
    script.setAttribute('data-clerk-publishable-key', CLERK_PUBLISHABLE_KEY);
    script.type = 'text/javascript';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = CLERK_SCRIPT_URL;

    // Catch script loading error (e.g. adblocker, offline, network block)
    script.onerror = () => {
        console.warn('Clerk script failed to load from CDN. Falling back to Mock Auth...');
        initMockAuth();
    };

    // Catch script loading error (e.g. adblocker, offline, network block)
    script.onerror = () => {
        console.warn('Clerk script failed to load from CDN. Falling back to Mock Auth...');
        initMockAuth();
    };

    document.head.appendChild(script);

    // Timeout fallback if script takes too long to load.
    const loadTimeout = setTimeout(() => {
        if (!window.Clerk || !window.Clerk.loaded) {
            console.warn('Clerk load timeout. Falling back to Mock Auth...');
            initMockAuth();
        }
    }, 10000);

    script.addEventListener('load', async () => {
        try {
            await window.Clerk.load({ publishableKey: CLERK_PUBLISHABLE_KEY });
            clearTimeout(loadTimeout);
            window.Clerk.loaded = true; // Mark as successfully loaded

            window.Clerk.addListener(({ user }) => {
                updateAuthUI(user);
                protectRoutes(user);
            });

            updateAuthUI(window.Clerk.user);
            protectRoutes(window.Clerk.user);

        } catch (error) {
            console.error('Clerk loading failed:', error);
            clearTimeout(loadTimeout);
            initMockAuth();
        }
    });
}


function getCurrentUrl() {
    return `${window.location.origin}${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function ensureClerkModalRoot() {
    let modalRoot = document.getElementById('clerk-modal-root');
    if (!modalRoot) {
        modalRoot = document.createElement('div');
        modalRoot.id = 'clerk-modal-root';
        document.body.appendChild(modalRoot);
    }
    return modalRoot;
}

function openClerkSignIn() {
    if (!window.Clerk || !window.Clerk.loaded) {
        console.warn('Clerk is not available yet. Opening local fallback sign-in.');
        initMockAuth();
        triggerMockSignIn();
        return;
    }

    const redirectUrl = getCurrentUrl();

    try {
        if (typeof window.Clerk.openSignIn === 'function') {
            window.Clerk.openSignIn({
                afterSignInUrl: redirectUrl,
                afterSignUpUrl: redirectUrl,
                redirectUrl,
            });
            return;
        }

        if (typeof window.Clerk.mountSignIn === 'function') {
            window.Clerk.mountSignIn(ensureClerkModalRoot(), {
                afterSignInUrl: redirectUrl,
                afterSignUpUrl: redirectUrl,
                redirectUrl,
            });
        }
    } catch (error) {
        console.error('Unable to open Clerk sign-in:', error);
        alert('Sign in could not open. Please check your Clerk allowed origins and publishable key.');
    }
}

window.openClerkSignIn = openClerkSignIn;

function bindAuthTriggers() {
    document.querySelectorAll('[data-auth-trigger]').forEach((trigger) => {
        trigger.onclick = (event) => {
            event.preventDefault();
            openClerkSignIn();
        };
    });
}


// ==========================================
// Mock Authentication System (Fallback Mode)
// ==========================================
function initMockAuth() {
    console.log("Initializing Mock Auth System for local file/restricted environments...");

    // 1. Inject modern glassmorphic CSS styles for mock modal and dropdown
    if (!document.getElementById('mock-auth-styles')) {
        const style = document.createElement('style');
        style.id = 'mock-auth-styles';
        style.innerHTML = `
            /* Mock Auth CSS Variables mapping to Portfolio tokens */
            .mock-modal-overlay {
                position: fixed;
                inset: 0;
                background: rgba(5, 5, 16, 0.85);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .mock-modal-overlay.active {
                opacity: 1;
            }
            .mock-modal-content {
                background: var(--bg-secondary, #0a0b17);
                border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
                border-radius: var(--radius-lg, 1rem);
                width: 90%;
                max-width: 400px;
                padding: var(--spacing-lg, 2rem);
                box-shadow: var(--shadow-xl), var(--shadow-glow);
                transform: translateY(20px);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                text-align: center;
            }
            .mock-modal-overlay.active .mock-modal-content {
                transform: translateY(0);
            }
            .mock-modal-close {
                position: absolute;
                top: 1.25rem;
                right: 1.25rem;
                background: none;
                border: none;
                color: var(--text-tertiary, #94a3b8);
                cursor: pointer;
                font-size: 1.5rem;
                transition: color var(--transition-fast, 150ms);
                line-height: 1;
            }
            .mock-modal-close:hover {
                color: var(--text-primary, #ffffff);
            }
            .mock-modal-title {
                font-family: var(--font-primary), sans-serif;
                font-weight: 800;
                font-size: 1.75rem;
                margin-bottom: 0.5rem;
                background: var(--accent-gradient, linear-gradient(135deg, #00f2fe 0%, #4facfe 100%));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .mock-modal-desc {
                color: var(--text-tertiary, #94a3b8);
                font-size: 0.95rem;
                margin-bottom: 1.75rem;
            }
            .mock-form-group {
                margin-bottom: 1.25rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                text-align: left;
            }
            .mock-form-group label {
                font-size: 0.85rem;
                font-weight: 600;
                color: var(--text-secondary, #e2e8f0);
            }
            .mock-form-group input {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
                border-radius: var(--radius-md, 0.75rem);
                padding: 0.75rem 1rem;
                color: var(--text-primary, #ffffff);
                font-size: 0.95rem;
                transition: border-color 0.2s ease, box-shadow 0.2s ease;
                width: 100%;
            }
            .mock-form-group input:focus {
                outline: none;
                border-color: var(--accent-primary, #00f2fe);
                box-shadow: 0 0 10px rgba(0, 242, 254, 0.2);
            }
            .mock-avatar {
                width: 36px;
                height: 36px;
                border-radius: var(--radius-full, 9999px);
                background: var(--accent-gradient, linear-gradient(135deg, #00f2fe 0%, #4facfe 100%));
                color: white;
                font-weight: 700;
                font-size: 0.95rem;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                border: 2px solid var(--border-light, rgba(255, 255, 255, 0.12));
                transition: transform 0.2s ease, box-shadow 0.2s ease;
                user-select: none;
            }
            .mock-avatar:hover {
                transform: scale(1.05);
                box-shadow: var(--shadow-glow);
            }
            .mock-dropdown-container {
                position: relative;
                display: inline-block;
            }
            .mock-dropdown-menu {
                position: absolute;
                top: calc(100% + 0.75rem);
                right: 0;
                background: var(--bg-tertiary, #111222);
                border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
                border-radius: var(--radius-md, 0.75rem);
                width: 260px;
                padding: 1rem;
                box-shadow: var(--shadow-xl);
                z-index: 1001;
                display: none;
                flex-direction: column;
                gap: 0.75rem;
                animation: slideDownDropdown 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            .mock-dropdown-menu.active {
                display: flex;
            }
            @keyframes slideDownDropdown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .mock-dropdown-header {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
                padding-bottom: 0.75rem;
                text-align: left;
            }
            .mock-dropdown-info {
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            .mock-dropdown-name {
                font-weight: 600;
                font-size: 0.95rem;
                color: var(--text-primary, #ffffff);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .mock-dropdown-email {
                font-size: 0.8rem;
                color: var(--text-tertiary, #94a3b8);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .mock-dropdown-signout {
                width: 100%;
                padding: 0.6rem;
                font-size: 0.875rem;
                font-weight: 600;
                color: var(--accent-secondary, #f43f5e);
                background: rgba(244, 63, 94, 0.1);
                border: 1px solid rgba(244, 63, 94, 0.2);
                border-radius: var(--radius-sm, 0.5rem);
                cursor: pointer;
                transition: all 0.2s ease;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }
            .mock-dropdown-signout:hover {
                background: var(--accent-secondary, #f43f5e);
                color: white;
            }
        `;
        document.head.appendChild(style);
    }

    // 2. Load mock user from sessionStorage/localStorage
    let storedUser = null;
    try {
        const data = sessionStorage.getItem('mock_user') || localStorage.getItem('mock_user');
        if (data) {
            storedUser = JSON.parse(data);
        }
    } catch (e) {
        console.error("Local storage access blocked:", e);
    }

    // 3. Setup mock window.Clerk object to handle navbar/contact page interactions cleanly
    window.Clerk = {
        user: storedUser,
        loaded: true,
        openSignIn: () => {
            triggerMockSignIn();
        },
        mountUserButton: (container) => {
            renderMockUserButton(container);
        },
        signOut: () => {
            try {
                sessionStorage.removeItem('mock_user');
                localStorage.removeItem('mock_user');
            } catch (e) {}
            window.Clerk.user = null;
            if (window.Clerk._listener) {
                window.Clerk._listener({ user: null });
            }
            updateAuthUI(null);
            protectRoutes(null);
        },
        addListener: (callback) => {
            window.Clerk._listener = callback;
        },
        load: async () => {}
    };

    // 4. Populate UI initially based on loaded mock user state
    updateAuthUI(window.Clerk.user);
    protectRoutes(window.Clerk.user);
}

function triggerMockSignIn() {
    // Prevent duplicate modals
    const existingOverlay = document.getElementById('mock-modal-overlay');
    if (existingOverlay) existingOverlay.remove();

    const overlay = document.createElement('div');
    overlay.id = 'mock-modal-overlay';
    overlay.className = 'mock-modal-overlay';
    
    overlay.innerHTML = `
        <div class="mock-modal-content">
            <button class="mock-modal-close" id="mock-modal-close">&times;</button>
            <h3 class="mock-modal-title">Sign In</h3>
            <p class="mock-modal-desc">Simulated access for offline / local testing of Vyom's Portfolio.</p>
            <form id="mock-signin-form">
                <div class="mock-form-group">
                    <label for="mock-name">Full Name</label>
                    <input type="text" id="mock-name" required placeholder="John Doe" value="Guest Recruiter">
                </div>
                <div class="mock-form-group">
                    <label for="mock-email">Email Address</label>
                    <input type="email" id="mock-email" required placeholder="john@example.com" value="guest@example.com">
                </div>
                <button type="submit" class="btn btn-primary btn-full" style="margin-top: 0.5rem;">
                    Sign In
                </button>
            </form>
        </div>
    `;

    document.body.appendChild(overlay);

    // Apply smooth fade-in
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);

    // Close button handles
    const closeBtn = overlay.querySelector('#mock-modal-close');
    closeBtn.onclick = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    };

    overlay.onclick = (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        }
    };

    // Form submission mock sign-in handler
    const form = overlay.querySelector('#mock-signin-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        const name = overlay.querySelector('#mock-name').value.trim();
        const email = overlay.querySelector('#mock-email').value.trim();

        const mockUser = {
            fullName: name || 'Guest Recruiter',
            primaryEmailAddress: {
                emailAddress: email || 'guest@example.com'
            }
        };

        try {
            sessionStorage.setItem('mock_user', JSON.stringify(mockUser));
            localStorage.setItem('mock_user', JSON.stringify(mockUser));
        } catch (err) {}

        window.Clerk.user = mockUser;

        // Notify session listener
        if (window.Clerk._listener) {
            window.Clerk._listener({ user: mockUser });
        }

        updateAuthUI(mockUser);
        protectRoutes(mockUser);

        // Animate modal out
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    };
}

function renderMockUserButton(container) {
    if (!container) return;
    container.innerHTML = '';

    const user = window.Clerk.user;
    if (!user) return;

    const initial = (user.fullName || 'G').charAt(0).toUpperCase();

    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'mock-dropdown-container';

    dropdownContainer.innerHTML = `
        <div class="mock-avatar" id="mock-avatar-btn">${initial}</div>
        <div class="mock-dropdown-menu" id="mock-dropdown-menu">
            <div class="mock-dropdown-header">
                <div class="mock-avatar" style="cursor: default;">${initial}</div>
                <div class="mock-dropdown-info">
                    <span class="mock-dropdown-name">${user.fullName}</span>
                    <span class="mock-dropdown-email">${user.primaryEmailAddress.emailAddress}</span>
                </div>
            </div>
            <button class="mock-dropdown-signout" id="mock-signout-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Sign Out
            </button>
        </div>
    `;

    container.appendChild(dropdownContainer);

    const avatarBtn = dropdownContainer.querySelector('#mock-avatar-btn');
    const menu = dropdownContainer.querySelector('#mock-dropdown-menu');
    const signoutBtn = dropdownContainer.querySelector('#mock-signout-btn');

    avatarBtn.onclick = (e) => {
        e.stopPropagation();
        menu.classList.toggle('active');
    };

    signoutBtn.onclick = (e) => {
        e.stopPropagation();
        window.Clerk.signOut();
    };

    // Close dropdown menu when clicking anywhere else
    document.addEventListener('click', (e) => {
        if (!dropdownContainer.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
}

// ==========================================
// Core UI Update & Route Protection Functions
// ==========================================
function updateAuthUI(user) {
    const authContainer = document.getElementById('auth-container');
    if (!authContainer) {
        // If navbar hasn't fully rendered the auth-container yet, retry in 50ms (handles custom element race conditions)
        setTimeout(() => updateAuthUI(user), 50);
        return;
    }

    authContainer.innerHTML = '';

    if (user) {
        // User is signed in
        const userButtonDiv = document.createElement('div');
        userButtonDiv.id = 'user-button';
        authContainer.appendChild(userButtonDiv);
        if (window.Clerk && typeof window.Clerk.mountUserButton === 'function') {
            window.Clerk.mountUserButton(userButtonDiv, {
                afterSignOutUrl: getCurrentUrl(),
            });
        }
    } else {
        // User is signed out
        const signInBtn = document.createElement('button');
        signInBtn.className = 'btn btn-primary';
        signInBtn.type = 'button';
        signInBtn.dataset.authTrigger = '';
        signInBtn.style.padding = '0.5rem 1rem';
        signInBtn.style.fontSize = '0.9rem';
        signInBtn.textContent = 'Sign In';
        authContainer.appendChild(signInBtn);
        bindAuthTriggers();
    }
}

function protectRoutes(user) {
    // Contact page protection
    const contactForm = document.getElementById('contactForm');
    const authWall = document.getElementById('auth-wall');

    if (contactForm && authWall) {
        if (!user) {
            contactForm.style.display = 'none';
            authWall.style.display = 'block';
        } else {
            contactForm.style.display = 'block';
            authWall.style.display = 'none';

            // Auto-fill form details if user is signed in
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const fullName = user.fullName || [user.firstName, user.lastName].filter(Boolean).join(' ');
            const emailAddress = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress;

            if (nameInput && fullName) nameInput.value = fullName;
            if (emailInput && emailAddress) emailInput.value = emailAddress;
        }
    }
}

// Ensure initClerk runs after custom components are rendered
window.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        const authTrigger = event.target.closest('[data-auth-trigger]');
        if (!authTrigger) return;

        event.preventDefault();
        openClerkSignIn();
    });
    bindAuthTriggers();

    // Wait a brief moment to ensure global-navbar has injected its innerHTML
    setTimeout(initClerk, 100);
});
