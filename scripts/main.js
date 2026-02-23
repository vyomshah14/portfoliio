// ===================================
// Navigation Functionality
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // ===================================
    // Stats Counter Animation
    // ===================================
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCounter();
    };

    // Intersection Observer for stats
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => statsObserver.observe(stat));
    }

    // ===================================
    // Project Filtering
    // ===================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // Trigger reflow for animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ===================================
    // Photography Page Logic (Horizontal Masonry & Correct Sorting)
    // ===================================
    const photoGrid = document.getElementById('photoGrid');
    const photoFilters = document.querySelectorAll('#photography-filters .filter-btn');

    // Toggle Button Logic for Skills Page
    const togglePhotoBtn = document.getElementById('toggle-photography-btn');
    const photoGalleryWrapper = document.getElementById('photography-gallery-wrapper');

    if (togglePhotoBtn && photoGalleryWrapper) {
        togglePhotoBtn.addEventListener('click', () => {
            if (photoGalleryWrapper.style.display === 'none') {
                photoGalleryWrapper.style.display = 'block';
                togglePhotoBtn.textContent = 'Hide my photography skills';

                // Scroll down smoothly to show the gallery
                setTimeout(() => {
                    photoGalleryWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            } else {
                photoGalleryWrapper.style.display = 'none';
                togglePhotoBtn.textContent = 'See my photography skills here!!!';
            }
        });
    }

    if (photoGrid) {
        const photoData = [
            // Portraits (From POrtrait folder)
            { src: "POrtrait/IMG_1999.JPG", category: "portrait" },
            { src: "POrtrait/IMG_20250910_162619946.jpg", category: "portrait" },
            { src: "POrtrait/IMG_20251211_001621821 (1).jpg", category: "portrait" },
            { src: "POrtrait/IMG_20251211_001623219.jpg", category: "portrait" },
            { src: "POrtrait/IMG_20251211_072412702.jpg", category: "portrait" },
            { src: "POrtrait/IMG_20251211_072415446.jpg", category: "portrait" },
            { src: "POrtrait/IMG_20251211_072423149.jpg", category: "portrait" },
            { src: "POrtrait/IMG_20260221_203927442.jpg", category: "portrait" },
            { src: "POrtrait/IMG_20260221_203935293.jpg", category: "portrait" },
            { src: "POrtrait/IMG_2040.JPG", category: "portrait" },
            { src: "POrtrait/IMG_2161.JPG", category: "portrait" },
            { src: "POrtrait/IMG_2209.JPG", category: "portrait" },
            { src: "POrtrait/IMG_4429.JPG", category: "portrait" },
            { src: "POrtrait/IMG_4430.JPG", category: "portrait" },
            { src: "POrtrait/IMG_4441.JPG", category: "portrait" },
            { src: "POrtrait/Snapchat-215964189.jpg", category: "portrait" },
            { src: "POrtrait/WhatsApp Image 2026-02-23 at 19.02.43.jpeg", category: "portrait" },
            { src: "POrtrait/WhatsApp Image 2026-02-23 at 19.02.44 (1).jpeg", category: "portrait" },
            { src: "POrtrait/WhatsApp Image 2026-02-23 at 19.02.44.jpeg", category: "portrait" },
            { src: "POrtrait/WhatsApp Image 2026-02-23 at 19.02.45.jpeg", category: "portrait" },
            { src: "POrtrait/WhatsApp Image 2026-02-23 at 19.02.46 (1).jpeg", category: "portrait" },
            { src: "POrtrait/WhatsApp Image 2026-02-23 at 19.02.46 (2).jpeg", category: "portrait" },
            { src: "POrtrait/WhatsApp Image 2026-02-23 at 19.02.47 (1).jpeg", category: "portrait" },
            { src: "POrtrait/WhatsApp Image 2026-02-23 at 19.02.47 (2).jpeg", category: "portrait" },
            { src: "POrtrait/WhatsApp Image 2026-02-23 at 19.02.47.jpeg", category: "portrait" },
            { src: "POrtrait/WhatsApp Image 2026-02-23 at 19.02.48 (1).jpeg", category: "portrait" },
            { src: "POrtrait/WhatsApp Image 2026-02-23 at 19.02.49 (1).jpeg", category: "portrait" },
            { src: "POrtrait/WhatsApp Image 2026-02-23 at 19.02.50.jpeg", category: "portrait" },
            { src: "POrtrait/WhatsApp Image 2026-02-23 at 19.02.55.jpeg", category: "portrait" },
            { src: "POrtrait/WhatsApp Image 2026-02-23 at 19.03.04 (1).jpeg", category: "portrait" },
            { src: "POrtrait/WhatsApp Image 2026-02-23 at 19.03.04.jpeg", category: "portrait" },
            { src: "POrtrait/WhatsApp Image 2026-02-23 at 19.03.07.jpeg", category: "portrait" },

            // Sky
            { src: "WhatsApp Image 2026-02-23 at 19.02.46.jpeg", category: "sky" },
            { src: "WhatsApp Image 2026-02-23 at 19.03.05.jpeg", category: "sky" },
            { src: "IMG_20250911_123530810.jpg", category: "sky" },
            { src: "IMG_20251024_063348289.jpg", category: "sky" },
            { src: "IMG_20251024_063403047.jpg", category: "sky" },
            { src: "IMG_20251024_085157766.jpg", category: "sky" },
            { src: "IMG_20251024_085355476.jpg", category: "sky" },
            { src: "IMG_3720.JPG", category: "sky" },
            { src: "IMG_3732.JPG", category: "sky" },
            { src: "IMG_3747.JPG", category: "sky" },
            { src: "IMG_3787.JPG", category: "sky" },

            // Nature
            { src: "WhatsApp Image 2026-02-23 at 19.02.48.jpeg", category: "nature" },
            { src: "WhatsApp Image 2026-02-23 at 19.02.49.jpeg", category: "nature" },
            { src: "WhatsApp Image 2026-02-23 at 19.03.06.jpeg", category: "nature" },
            { src: "FullSizeRender_26.jpg", category: "nature" },
            { src: "FullSizeRender_34.jpg", category: "nature" },
            { src: "FullSizeRender_6.jpg", category: "nature" },
            { src: "IMG_2333.JPG", category: "nature" },
            { src: "IMG_2335.JPG", category: "nature" },
            { src: "IMG_2662.JPG", category: "nature" },
            { src: "IMG_2664.JPG", category: "nature" },
            { src: "IMG_2726.JPG", category: "nature" },
            { src: "IMG_2737.JPG", category: "nature" },
            { src: "IMG_2771.JPG", category: "nature" },
            { src: "IMG_2776.JPG", category: "nature" },
            { src: "IMG_2820.JPG", category: "nature" },
            { src: "IMG_2822.JPG", category: "nature" },
            { src: "IMG_3734.JPG", category: "nature" },
            { src: "IMG_3735.JPG", category: "nature" },
            { src: "IMG_3796.JPG", category: "nature" },
            { src: "IMG_3797.JPG", category: "nature" },

            // Urban / Others
            { src: "IMG_1432.JPG", category: "urban" },
            { src: "IMG_1437.JPG", category: "urban" },
            { src: "IMG_1438.JPG", category: "urban" },
            { src: "IMG_1536.JPG", category: "urban" },
            { src: "IMG_1538.JPG", category: "urban" },
            { src: "IMG_1557.JPG", category: "urban" },
            { src: "IMG_1559.JPG", category: "urban" },
            { src: "IMG_1577.JPG", category: "urban" },
            { src: "IMG_2841.JPG", category: "urban" },
            { src: "IMG_2850.JPG", category: "urban" },
            { src: "IMG_2854.JPG", category: "urban" },
            { src: "IMG_2880.JPG", category: "urban" },
            { src: "IMG_2887.JPG", category: "urban" },
            { src: "IMG_2889.JPG", category: "urban" },
            { src: "IMG_3041.JPG", category: "urban" },
            { src: "IMG_3042.JPG", category: "urban" },
            { src: "IMG_3044.JPG", category: "urban" },
            { src: "IMG_3616.JPG", category: "urban" },
            { src: "IMG_3804.JPG", category: "urban" },
            { src: "IMG_3808.JPG", category: "urban" }
        ];


        // Create the track elements for scrolling
        const track = document.createElement('div');
        track.className = 'photography-track';

        // Helper to append a set of items (we will append twice for infinite scroll)
        const appendItems = () => {
            const fragment = document.createDocumentFragment();
            photoData.forEach((photo) => {
                const item = document.createElement('div');
                item.className = 'photography-item';
                item.setAttribute('data-category', photo.category);

                item.innerHTML = `
                    <img src="assets/photography/${photo.src}" alt="Photography - ${photo.category}" loading="lazy">
                    <div class="photography-overlay">
                        <span class="photography-category">${photo.category}</span>
                    </div>
                `;
                fragment.appendChild(item);
            });
            return fragment;
        };

        // Append two sets of images for a seamless loop effect
        track.appendChild(appendItems());
        track.appendChild(appendItems()); // Duplicate for continuous illusion

        photoGrid.appendChild(track);
        photoGrid.classList.add('continuous-scroll');

        // Filtering Logic
        const photoItems = document.querySelectorAll('.photography-item');

        photoFilters.forEach(button => {
            button.addEventListener('click', () => {
                photoFilters.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                if (filter === 'all') {
                    // Turn animation back on
                    photoGrid.classList.add('continuous-scroll');

                    photoItems.forEach(item => {
                        item.classList.remove('hide');
                        item.style.display = ''; // Reset to default Flex behavior
                    });
                } else {
                    // Turn off animation when filtering so they can see results
                    photoGrid.classList.remove('continuous-scroll');

                    // Note: Since we duplicated items for scroll, filtering will show duplicates.
                    // Only show the first set of matches to avoiding showing the duplicates 
                    // when the animation is off.

                    let matchCount = 0;
                    const maxMatches = photoData.filter(p => p.category === filter).length;

                    photoItems.forEach(item => {
                        if (item.getAttribute('data-category') === filter && matchCount < maxMatches) {
                            item.classList.remove('hide');
                            item.style.display = '';
                            matchCount++;
                        } else {
                            item.classList.add('hide');
                            // Ensure display is block or none immediately since it's now flex
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    }

    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===================================
    // Scroll Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .timeline-item, .education-card, .certification-card'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });

    // ===================================
    // Typing Effect for Hero Section
    // ===================================
    const typingText = document.querySelector('.typing-text');

    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let charIndex = 0;

        const typeWriter = () => {
            if (charIndex < text.length) {
                typingText.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        };

        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // ===================================
    // Skill Progress Bar Animation
    // ===================================
    const skillBars = document.querySelectorAll('.skill-progress');

    if (skillBars.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                    skillObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => skillObserver.observe(bar));
    }

    // ===================================
    // Parallax Effect for Hero Background
    // ===================================
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // ===================================
    // Active Page Highlight in Navigation
    // ===================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinkItems.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // ===================================
    // Lazy Loading for Images (if added later)
    // ===================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===================================
    // Prevent Flash of Unstyled Content
    // ===================================
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    });

    // ===================================
    // Console Easter Egg
    // ===================================
    console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
    console.log('%cLooking for something? Check out the source code on GitHub!', 'font-size: 14px; color: #8b5cf6;');
    console.log('%c🚀 Built with passion by Vyom Shah', 'font-size: 12px; color: #9ca3af;');

    // ===================================
    // Performance Monitoring (Development)
    // ===================================
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        });
    }

    // ===================================
    // Handle External Links
    // ===================================
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // ===================================
    // Keyboard Navigation Enhancement
    // ===================================
    document.addEventListener('keydown', (e) => {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // ===================================
    // Copy Email on Click (if needed)
    // ===================================
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const email = link.textContent;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    // Optional: Show tooltip or notification
                    console.log('Email copied to clipboard!');
                });
            }
        });
    });

    // ===================================
    // Theme Toggle (Optional - for future enhancement)
    // ===================================
    // Uncomment if you want to add a light/dark mode toggle
    /*
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    */
});

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// ===================================
// Export for module usage (if needed)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        isInViewport,
        formatDate
    };
}
