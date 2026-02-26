// scripts/auth.js

// Replace this with your actual Clerk Publishable Key from the Clerk API Dashboard
const CLERK_PUBLISHABLE_KEY = 'pk_test_ZXRlcm5hbC1za3lsYXJrLTE0LmNsZXJrLmFjY291bnRzLmRldiQ';

async function initClerk() {
    const script = document.createElement('script');
    script.setAttribute('data-clerk-publishable-key', CLERK_PUBLISHABLE_KEY);
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = 'https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js';

    document.head.appendChild(script);

    script.addEventListener('load', async () => {
        try {
            await window.Clerk.load();

            window.Clerk.addListener(({ user }) => {
                updateAuthUI(user);
                protectRoutes(user);
            });

            updateAuthUI(window.Clerk.user);
            protectRoutes(window.Clerk.user);

            // Hide the Clerk Development Mode Badge
            const hideClerkBadge = () => {
                const elements = document.querySelectorAll('div, a');
                for (const el of elements) {
                    if (el.innerText && el.innerText.includes('Development mode') && el.innerText.toLowerCase().includes('secured by clerk')) {
                        el.style.display = 'none';
                    }
                }

                // Also try common classes
                const clBadge = document.querySelector('.cl-internal-b3algg, .cl-internal-1dauvpw');
                if (clBadge) clBadge.style.display = 'none';
            };

            // Run immediately and also observe for dynamic injection
            hideClerkBadge();
            const observer = new MutationObserver(hideClerkBadge);
            observer.observe(document.body, { childList: true, subtree: true });

        } catch (error) {
            console.error('Clerk loading failed:', error);
        }
    });
}

function updateAuthUI(user) {
    const authContainer = document.getElementById('auth-container');
    if (!authContainer) return;

    authContainer.innerHTML = '';

    if (user) {
        // User is signed in
        const userButtonDiv = document.createElement('div');
        userButtonDiv.id = 'user-button';
        authContainer.appendChild(userButtonDiv);
        window.Clerk.mountUserButton(userButtonDiv);
    } else {
        // User is signed out
        const signInBtn = document.createElement('button');
        signInBtn.className = 'btn btn-primary';
        signInBtn.style.padding = '0.5rem 1rem';
        signInBtn.style.fontSize = '0.9rem';
        signInBtn.textContent = 'Sign In';
        signInBtn.onclick = () => {
            window.Clerk.openSignIn();
        };
        authContainer.appendChild(signInBtn);
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
            if (nameInput && user.fullName) nameInput.value = user.fullName;
            if (emailInput && user.primaryEmailAddress) emailInput.value = user.primaryEmailAddress.emailAddress;
        }
    }
}

// Ensure initClerk runs after custom components are rendered
window.addEventListener('DOMContentLoaded', () => {
    // Wait a brief moment to ensure global-navbar has injected its innerHTML
    setTimeout(initClerk, 100);
});
