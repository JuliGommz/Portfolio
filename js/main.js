/**
 * Portfolio JavaScript - Enhanced Version
 * Julian Gomez - Learning Experience Designer & Creative Producer
 *
 * Features: Navigation, Mobile Menu, Lightbox, Language Toggle, Smooth Scroll
 */

'use strict';

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

const state = {
    currentLang: 'de',
    lightboxImages: [],
    currentImageIndex: 0,
    isLightboxOpen: false
};

// ============================================================================
// NAVIGATION & HEADER
// ============================================================================

/**
 * Initialize header scroll effect
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        }
    });
}

// ============================================================================
// SMOOTH SCROLL
// ============================================================================

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#') {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(href);

            if (targetElement) {
                e.preventDefault();

                // Account for fixed header height
                const headerHeight = document.querySelector('.header')?.offsetHeight || 60;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================================================
// LIGHTBOX FUNCTIONALITY
// ============================================================================

/**
 * Initialize lightbox for gallery images and videos
 */
function initLightbox() {
    // Get all gallery containers (main galleries and mini galleries)
    const galleryContainers = document.querySelectorAll('.gallery-grid, .mini-gallery');

    galleryContainers.forEach(container => {
        // Get all gallery items within this container (including videos)
        const galleryItems = Array.from(container.querySelectorAll('[data-lightbox]'));

        // Create media array for this gallery (images and videos)
        const galleryMedia = galleryItems
            .map(item => {
                const img = item.querySelector('img');
                const video = item.querySelector('video source');

                if (img) {
                    return {
                        type: 'image',
                        src: img.src,
                        alt: img.alt || ''
                    };
                } else if (video) {
                    return {
                        type: 'video',
                        src: video.src,
                        alt: 'Video'
                    };
                }
                return null;
            })
            .filter(item => item !== null);

        // Add click handlers for this gallery's items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                // Set current gallery media and open lightbox
                state.lightboxImages = galleryMedia;
                openLightbox(index);
            });
        });
    });

    // Setup lightbox controls
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showPreviousImage();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNextImage();
        });
    }

    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!state.isLightboxOpen) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
}

/**
 * Open lightbox with specific media (image or video)
 */
function openLightbox(index) {
    state.currentImageIndex = index;
    state.isLightboxOpen = true;

    const lightbox = document.getElementById('lightbox');
    const content = document.getElementById('lightbox-content');

    if (!lightbox || !content) return;

    const media = state.lightboxImages[index];

    if (media.type === 'video') {
        content.innerHTML = `
            <video controls autoplay style="max-width: 90vw; max-height: 90vh;">
                <source src="${media.src}" type="video/mp4">
                Your browser does not support video playback.
            </video>
        `;
    } else {
        content.innerHTML = `<img src="${media.src}" alt="${media.alt}">`;
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    // Stop any playing videos
    const content = document.getElementById('lightbox-content');
    if (content) {
        const video = content.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }

    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    state.isLightboxOpen = false;
}

/**
 * Show next image in lightbox
 */
function showNextImage() {
    state.currentImageIndex = (state.currentImageIndex + 1) % state.lightboxImages.length;
    updateLightboxImage();
}

/**
 * Show previous image in lightbox
 */
function showPreviousImage() {
    state.currentImageIndex = (state.currentImageIndex - 1 + state.lightboxImages.length) % state.lightboxImages.length;
    updateLightboxImage();
}

/**
 * Update lightbox image or video
 */
function updateLightboxImage() {
    const content = document.getElementById('lightbox-content');
    if (!content) return;

    const media = state.lightboxImages[state.currentImageIndex];

    if (media.type === 'video') {
        content.innerHTML = `
            <video controls autoplay style="max-width: 90vw; max-height: 90vh;">
                <source src="${media.src}" type="video/mp4">
                Your browser does not support video playback.
            </video>
        `;
    } else {
        content.innerHTML = `<img src="${media.src}" alt="${media.alt}">`;
    }
}

// ============================================================================
// LANGUAGE TOGGLE (Placeholder for future implementation)
// ============================================================================

/**
 * Initialize language toggle
 */
function initLanguageToggle() {
    const toggleBtn = document.querySelector('.lang-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        // Toggle language state
        state.currentLang = state.currentLang === 'de' ? 'en' : 'de';

        // Update button text
        toggleBtn.textContent = state.currentLang === 'de' ? 'EN' : 'DE';
        toggleBtn.setAttribute('data-lang', state.currentLang);

        // Future: Load translated content here
        console.log('Language switched to:', state.currentLang);

        // Show notification (can be replaced with actual translation)
        showLanguageNotification();
    });
}

/**
 * Show language switch notification
 */
function showLanguageNotification() {
    // Simple notification - can be enhanced
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--accent-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = state.currentLang === 'en'
        ? 'English version coming soon!'
        : 'Deutsche Version aktiv';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ============================================================================
// PDF DOWNLOAD TRACKING
// ============================================================================

/**
 * Track PDF downloads for analytics
 */
function initPDFTracking() {
    document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('Portfolio PDF download initiated');
            // Optional: Add analytics tracking here
        });
    });
}

// ============================================================================
// COLLAPSIBLE SECTIONS
// ============================================================================

/**
 * Initialize collapsible sections for project details
 */
function initCollapsible() {
    const collapsibles = document.querySelectorAll('.collapsible-header');

    collapsibles.forEach(header => {
        header.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all features
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initLightbox();
    initLanguageToggle();
    initPDFTracking();
    initCollapsible();

    // Log successful initialization
    console.log('Portfolio website initialized successfully');
    console.log('Features: Navigation, Mobile Menu, Lightbox, Language Toggle, Collapsible');
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
