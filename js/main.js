/**
 * Portfolio JavaScript - Production Version
 * Julian Gomez - Learning Experience Designer & Creative Producer
 *
 * Features:
 * - Responsive Navigation with Mobile Menu
 * - Image & Vimeo Video Lightbox Gallery
 * - Smooth Scroll Navigation
 * - Language Toggle (Placeholder)
 * - Collapsible Sections
 *
 * @version 3.0.0
 * @author Julian Gomez
 */

'use strict';

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
    DEBUG_MODE: false, // Set to false for production
    SCROLL_THROTTLE: 100, // ms
    NOTIFICATION_DURATION: 2100 // ms
};

/**
 * Safe console logging that respects DEBUG_MODE
 * @param {...any} args - Arguments to log
 */
function debugLog(...args) {
    if (CONFIG.DEBUG_MODE && console && console.log) {
        console.log('[Portfolio]', ...args);
    }
}

/**
 * Safe error logging
 * @param {string} context - Context where error occurred
 * @param {Error} error - Error object
 */
function logError(context, error) {
    if (console && console.error) {
        console.error(`[Portfolio Error - ${context}]`, error);
    }
}

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
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Sanitize string to prevent XSS attacks
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

/**
 * Throttle function execution for performance
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, args);
        }
    };
}

// ============================================================================
// NAVIGATION & HEADER
// ============================================================================

/**
 * Initialize header scroll effect with throttling for performance
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) {
        debugLog('Header element not found');
        return;
    }

    const handleScroll = throttle(() => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, CONFIG.SCROLL_THROTTLE);

    window.addEventListener('scroll', handleScroll, { passive: true });
    debugLog('Header scroll initialized');
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
        // Get all gallery items within this container (images and Vimeo embeds)
        const galleryItems = Array.from(container.querySelectorAll('[data-lightbox]'));

        // Create media array for this gallery (images and Vimeo videos)
        const galleryMedia = galleryItems
            .map(item => {
                const img = item.querySelector('img');
                const vimeoIframe = item.querySelector('iframe[src*="vimeo.com"]');

                if (img) {
                    return {
                        type: 'image',
                        src: img.src,
                        alt: img.alt || ''
                    };
                } else if (vimeoIframe) {
                    return {
                        type: 'vimeo',
                        src: vimeoIframe.src,
                        alt: vimeoIframe.title || 'Video'
                    };
                }
                return null;
            })
            .filter(item => item !== null);

        // Add click handlers for this gallery's items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                // Don't open lightbox if clicking on play overlay (it stops propagation)
                // All other clicks should open the lightbox
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
 * Create Vimeo iframe element for lightbox
 * @param {Object} media - Media object with src (Vimeo iframe URL)
 * @returns {HTMLElement} Vimeo container element
 */
function createLightboxVimeo(media) {
    // Create responsive container for Vimeo in lightbox
    const container = document.createElement('div');

    // Calculate dimensions: 16:9 aspect ratio, max 90% of viewport
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.9;

    // Calculate actual dimensions maintaining 16:9 aspect ratio
    let width = maxWidth;
    let height = width / (16/9);

    if (height > maxHeight) {
        height = maxHeight;
        width = height * (16/9);
    }

    container.style.cssText = `position:relative;width:${width}px;height:${height}px;`;

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = media.src;
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
    iframe.title = media.alt || 'Video';

    container.appendChild(iframe);
    return container;
}

/**
 * Create image element for lightbox
 * @param {Object} media - Media object with src and alt
 * @returns {HTMLElement} Image element
 */
function createLightboxImage(media) {
    const img = document.createElement('img');
    img.src = media.src;
    img.alt = sanitizeHTML(media.alt || 'Gallery image');
    return img;
}

/**
 * Open lightbox with specific media (image or Vimeo video)
 */
function openLightbox(index) {
    state.currentImageIndex = index;
    state.isLightboxOpen = true;

    const lightbox = document.getElementById('lightbox');
    const content = document.getElementById('lightbox-content');

    if (!lightbox || !content) return;

    // Clear existing content
    content.innerHTML = '';

    const media = state.lightboxImages[index];

    // Create and append appropriate media element
    let mediaElement;
    if (media.type === 'vimeo') {
        mediaElement = createLightboxVimeo(media);
    } else {
        mediaElement = createLightboxImage(media);
    }

    content.appendChild(mediaElement);

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    // Clear content (this will remove any Vimeo iframes)
    const content = document.getElementById('lightbox-content');
    if (content) {
        content.innerHTML = '';
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
 * Update lightbox image or Vimeo video
 */
function updateLightboxImage() {
    const content = document.getElementById('lightbox-content');
    if (!content) return;

    // Clear existing content
    content.innerHTML = '';

    const media = state.lightboxImages[state.currentImageIndex];

    // Create and append appropriate media element
    let mediaElement;
    if (media.type === 'vimeo') {
        mediaElement = createLightboxVimeo(media);
    } else {
        mediaElement = createLightboxImage(media);
    }

    content.appendChild(mediaElement);
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
        ? 'English version active'
        : 'Deutsche Version aktiv';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
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
// VIMEO VIDEO INTEGRATION
// ============================================================================

// Vimeo videos are embedded as iframes with autoplay/muted settings.
// No custom player controls needed - Vimeo provides built-in controls.
// Videos load on-demand through Vimeo's CDN for optimal performance.

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function () {
    debugLog('Initializing portfolio website...');

    try {
        // Initialize all features
        initHeaderScroll();
        initMobileMenu();
        initSmoothScroll();
        initLightbox();
        initLanguageToggle();
        initCollapsible();

        debugLog('✓ Portfolio website initialized successfully');
        debugLog('Features: Navigation, Mobile Menu, Lightbox, Language Toggle, Collapsible, Vimeo Videos');
    } catch (error) {
        logError('Initialization', error);
        console.error('Failed to initialize portfolio. Please refresh the page.');
    }
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
