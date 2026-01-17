/**
 * Portfolio JavaScript - Production Version
 * Julian Gomez - Learning Experience Designer & Creative Producer
 *
 * Features:
 * - Responsive Navigation with Mobile Menu
 * - Image & Video Lightbox Gallery
 * - Smooth Scroll Navigation
 * - Language Toggle (Placeholder)
 * - Custom Video Player Controls
 * - Volume Normalization
 * - Collapsible Sections
 *
 * @version 2.0.0
 * @author Julian Gomez
 */

'use strict';

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
    DEBUG_MODE: false, // Set to false for production
    SCROLL_THROTTLE: 100, // ms
    NOTIFICATION_DURATION: 2100, // ms
    VIDEO_VOLUME_LEVELS: {
        'Tango': 0.3,
        'Chest': 0.75,
        'gourmet-gameplay': 1.0
    }
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
 * Create video element for lightbox
 * @param {Object} media - Media object with src and type
 * @returns {HTMLElement} Video container element
 */
function createLightboxVideo(media) {
    // Create container
    const container = document.createElement('div');
    container.className = 'video-container playing';

    // Create video element
    const video = document.createElement('video');
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.style.cssText = 'max-width: 90vw; max-height: 90vh;';

    // Create source element
    const source = document.createElement('source');
    source.src = media.src;
    source.type = 'video/mp4';

    // Add fallback text
    const fallback = document.createTextNode('Your browser does not support video playback.');
    video.appendChild(source);
    video.appendChild(fallback);

    // Create notification (hidden initially)
    const notification = document.createElement('div');
    notification.className = 'video-muted-notification';
    notification.textContent = 'Audio is muted';

    // Assemble container
    container.appendChild(video);
    container.appendChild(notification);

    // Apply volume normalization
    for (const [name, volume] of Object.entries(CONFIG.VIDEO_VOLUME_LEVELS)) {
        if (media.src.includes(name)) {
            video.volume = volume;
            debugLog(`Set video volume for ${name} to ${volume}`);
            break;
        }
    }

    // Show notification only after video starts playing
    video.addEventListener('playing', () => {
        if (video.muted) {
            // Add small delay to ensure video has rendered
            setTimeout(() => {
                notification.classList.add('show');

                // Hide notification after configured duration
                setTimeout(() => {
                    notification.classList.remove('show');
                }, CONFIG.NOTIFICATION_DURATION);
            }, 150); // 150ms delay for smooth appearance
        }
    }, { once: true }); // Only trigger once

    // Hide notification when unmuted
    video.addEventListener('volumechange', () => {
        if (!video.muted) {
            notification.classList.remove('show');
        }
    });

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
 * Open lightbox with specific media (image or video)
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
    const mediaElement = media.type === 'video'
        ? createLightboxVideo(media)
        : createLightboxImage(media);

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

    // Clear existing content
    content.innerHTML = '';

    const media = state.lightboxImages[state.currentImageIndex];

    // Create and append appropriate media element
    const mediaElement = media.type === 'video'
        ? createLightboxVideo(media)
        : createLightboxImage(media);

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
        ? 'English version coming soon!'
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
// VIDEO VOLUME NORMALIZATION
// ============================================================================

/**
 * Normalize video volumes to compensate for different recording levels
 */
function initVideoVolumeNormalization() {
    try {
        const videos = document.querySelectorAll('.mini-gallery video');
        debugLog(`Normalizing volume for ${videos.length} gallery videos`);

        videos.forEach((video, index) => {
            const source = video.querySelector('source');
            if (!source) {
                debugLog(`Video ${index} has no source element`);
                return;
            }

            const src = source.src;

            // Find matching video and set volume
            for (const [name, volume] of Object.entries(CONFIG.VIDEO_VOLUME_LEVELS)) {
                if (src.includes(name)) {
                    video.volume = volume;
                    debugLog(`Set volume for ${name} to ${volume}`);
                    break;
                }
            }
        });
    } catch (error) {
        logError('Video Volume Normalization', error);
    }
}

/**
 * Initialize custom video player controls
 */
function initCustomVideoPlayer() {
    // Handle all video containers in GALLERIES ONLY (not lightbox)
    document.querySelectorAll('.mini-gallery .video-container, .gallery-grid .video-container').forEach(container => {
        const video = container.querySelector('video');
        const playOverlay = container.querySelector('.video-play-overlay');
        const mutedNotification = container.querySelector('.video-muted-notification');

        if (!video || !playOverlay) return;

        let mutedNotificationTimeout;

        // Show muted notification
        const showMutedNotification = () => {
            if (!mutedNotification || !video.muted) return;

            mutedNotification.classList.add('show');

            // Hide after configured duration
            clearTimeout(mutedNotificationTimeout);
            mutedNotificationTimeout = setTimeout(() => {
                mutedNotification.classList.remove('show');
            }, CONFIG.NOTIFICATION_DURATION);
        };

        // Click on play overlay to play/pause (prevent lightbox)
        playOverlay.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent lightbox from opening
            e.preventDefault();

            if (video.paused) {
                video.play();
                container.classList.add('playing');
            } else {
                video.pause();
                container.classList.remove('playing');
            }
        });

        // Ensure video element clicks also bubble up (unless controls are clicked)
        video.addEventListener('click', (e) => {
            // Let the click bubble up to open lightbox
            // The native controls will still work
        });

        // Update play button visibility when video state changes
        video.addEventListener('play', () => {
            container.classList.add('playing');
        });

        // Show notification only after video actually starts playing
        video.addEventListener('playing', () => {
            showMutedNotification();
        }, { once: true });

        video.addEventListener('pause', () => {
            container.classList.remove('playing');
        });

        video.addEventListener('ended', () => {
            container.classList.remove('playing');
        });

        // Hide notification when video is unmuted
        video.addEventListener('volumechange', () => {
            if (!video.muted && mutedNotification) {
                mutedNotification.classList.remove('show');
            }
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
    debugLog('Initializing portfolio website...');

    try {
        // Initialize all features
        initHeaderScroll();
        initMobileMenu();
        initSmoothScroll();
        initLightbox();
        initLanguageToggle();
        initCollapsible();
        initVideoVolumeNormalization();
        initCustomVideoPlayer();

        debugLog('✓ Portfolio website initialized successfully');
        debugLog('Features: Navigation, Mobile Menu, Lightbox, Language Toggle, Collapsible, Video Normalization, Custom Player');
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
