/**
 * Portfolio JavaScript - Production Version
 * Julian Gomez - Game & Multimedia Design
 * 
 * Architecture: Event delegation pattern, mobile-first, CSP-compliant
 * Standards: ES6+, 2025 best practices, zero inline handlers
 */

'use strict';

// ============================================================================
// DATA LAYER
// ============================================================================

const projectData = {
    'mindsetplay': {
        title: 'mind.set.play',
        category: 'Corporate Games',
        tagline: 'Corporate culture transformation game',
        year: '2019',
        duration: '6 months',
        team: 'Solo + 1 assistant',
        pillars: ['human', 'learning'],
        challenge: 'How can clients not only understand but directly experience the transformative power of New Work principles? The challenge: design a simulation game that makes tangible how personal work attitudes, goal orientation, and adaptability influence team processes and overall business success under VUCA conditions.',
        innovation: 'Role-switching mechanics combined with VUCA event simulation create experiential learning. Players directly experience how changes in attitude, role, and external conditions impact individual performance, collaboration, and team effectiveness.',
        deliverables: [
            'Complete board game with physical materials',
            'Facilitator guide with debrief questions',
            '6-month development process documentation',
            'Deployment-ready format for consultants'
        ],
        impact: 'Makes New Work principles experiential through role-switching and VUCA simulation. Scalable to 6-18 participants with measurable team dynamics improvement. Successfully deployed in corporate training contexts.',
        skills: 'Game mechanics design • Behavioral psychology • Facilitation framework • Corporate learning • Stakeholder management • Iterative prototyping • Measurable impact design',
        thumbnail: 'media/images/mindsetplay-thumbnail.jpg',
        gallery: [
            { type: 'image', src: 'media/images/mindsetplay-1.jpg', alt: 'mind.set.play board game overview with role cards and VUCA mechanics' },
            { type: 'image', src: 'media/images/mindsetplay-2.jpg', alt: 'mind.set.play gameplay session with corporate team participants' },
            { type: 'image', src: 'media/images/mindsetplay-3.jpg', alt: 'mind.set.play game materials and facilitator guide closeup' },
            { type: 'image', src: 'media/images/mindsetplay-4.jpg', alt: 'mind.set.play workshop debrief discussion in corporate setting' }
        ]
    },

    'gourmet': {
        title: 'Gourmet Invader',
        category: 'Video-Games Team',
        tagline: 'Agile team game development',
        year: '2025',
        duration: '4 weeks',
        team: '4 persons (cross-functional)',
        pillars: ['learning'],
        challenge: 'Lead first game development team in educational setting resistant to agile practices. Balance creative ambition with realistic scope while ensuring all team members contributed meaningfully under tight 4-week deadline.',
        innovation: 'Gamified agile practices reduce process resistance. Superpower-themed check-ins strengthen team cohesion. Iterative development under time constraints enables rapid prototyping and adaptation.',
        deliverables: [
            'Playable JavaScript game with WASD controls',
            'Multiple scenes with animations and sound',
            'Complete project documentation (GDD, workflow records)',
            'Team-created visual assets'
        ],
        impact: 'Fully playable game delivered within deadline. Positive peer feedback on team dynamics. Demonstrated how gamification techniques strengthen collaboration and maintain focus under project constraints.',
        skills: 'Agile team leadership • JavaScript game development • Cross-functional coordination • Process innovation • Gamified check-ins • Deadline management • First team leadership role',
        thumbnail: 'media/images/gourmet-thumbnail.jpg',
        gallery: [
            { type: 'image', src: 'media/images/gourmet-gameplay-1.jpg', alt: 'Gourmet Invader gameplay showing WASD movement mechanics and food collection' },
            { type: 'image', src: 'media/images/gourmet-gameplay-2.jpg', alt: 'Gourmet Invader second scene with enhanced animations and sound effects' },
            { type: 'image', src: 'media/images/gourmet-gameplay-3.jpg', alt: 'Gourmet Invader team-created visual assets and character design' },
            { type: 'video', src: 'media/videos/gourmet-gameplay.mp4', alt: 'Gourmet Invader full gameplay demonstration video' }
        ]
    },

    'void': {
        title: 'Void Protocol',
        category: 'Video-Games Team',
        tagline: 'Crisis-intervention project management',
        year: '2025',
        duration: '6 weeks',
        team: '7 persons',
        pillars: ['learning'],
        challenge: 'Mid-project crisis intervention. Stabilize derailed project while executing dual-role responsibilities as both PM and Programmer. Implement structured workflow under pressure.',
        innovation: 'Crisis management methodology combining PM stabilization with hands-on technical contribution. Workflow stabilization techniques adapted to team needs. Strategic flexibility in role execution.',
        deliverables: [
            'Stabilized project workflow',
            'Crisis intervention documentation',
            'C# programming contributions',
            'Project management framework'
        ],
        impact: 'Successfully stabilized failing project. Demonstrated dual-role execution capability. Proved crisis management and workflow stabilization expertise under pressure.',
        skills: 'Crisis management • Project stabilization • Dual-role execution • C# programming • PM methodologies • Team coordination • Workflow optimization • Strategic flexibility',
        thumbnail: 'media/images/void-thumbnail.jpg',
        gallery: [
            { type: 'image', src: 'media/images/void-1.jpg', alt: 'Void Protocol project management framework and workflow documentation' },
            { type: 'image', src: 'media/images/void-2.jpg', alt: 'Void Protocol C# code implementation and team collaboration' },
            { type: 'image', src: 'media/images/void-3.jpg', alt: 'Void Protocol C# code implementation and team collaboration' },
            { type: 'image', src: 'media/images/void-4.jpg', alt: 'Void Protocol C# code implementation and team collaboration' },
            { type: 'video', src: 'media/videos/chest.mp4', alt: 'Chest-Quest' }
        ]
    },

    'chest': {
        title: 'Chest-Quest',
        category: 'Video-Games Solo',
        tagline: 'C# game with transparent AI use',
        year: '2025',
        duration: '6 weeks',
        team: 'Solo',
        pillars: ['ai', 'learning'],
        challenge: 'Build 2D game-prototype from scratch with documented AI-assisted workflow. Demonstrate transparent AI collaboration methodology while maintaining code ownership and learning outcomes.',
        innovation: 'Transparent AI workflow documentation sets new standard for academic integrity. Complete process transparency from concept to deployment. Systematic human-AI collaboration framework for game development.',
        deliverables: [
            'Working Unity 2D-Prototype',
            'Complete AI collaboration documentation',
            'Academic integrity framework demonstration',
            'Source code with attribution'
        ],
        impact: 'Demonstrates viable AI-human collaboration model for academic contexts. Establishes transparency standards for AI-assisted development. Proves AI can enhance rather than replace learning.',
        skills: 'Unity C# • AI-assisted development • Academic integrity • Process documentation • Transparent workflow • Version control',
        thumbnail: 'media/images/chest-thumbnail.jpg',
        gallery: [
            { type: 'image', src: 'media/images/chest-1.jpg', alt: 'Chest-Quest' },
            { type: 'image', src: 'media/images/chest-2.jpg', alt: 'Chest-Quest' },
            { type: 'image', src: 'media/images/chest-3.jpg', alt: 'Chest-Quest' },
            { type: 'image', src: 'media/images/chest-4.jpg', alt: 'Chest-Quest' },
            { type: 'video', src: 'media/videos/chest.mp4', alt: 'Chest-Quest' }
        ]
    },

    'journey': {
        title: 'Journey',
        category: 'Video-Games Team',
        tagline: 'UX research & methodology',
        year: '2024',
        duration: '14 weeks',
        team: '6 persons',
        pillars: ['human'],
        challenge: 'Conduct comprehensive UX research for game redesign project. Apply academic research methodology to player experience analysis. Balance analytical rigor with creative design process.',
        innovation: 'Applied structured UX methodology to game design context. Systematic player research informed design decisions. Academic rigor combined with creative game development.',
        deliverables: [
            'UX research documentation',
            'Player journey mapping',
            'Design recommendations',
            'Methodology framework'
        ],
        impact: 'Established UX research foundation for game redesign. Demonstrated academic research skills in creative context. Informed design decisions with player-centered methodology.',
        skills: 'UX research • Player journey mapping • Academic methodology • Qualitative analysis • Design recommendations • Research documentation • Team research coordination',
        thumbnail: 'media/images/journey-thumbnail.jpg',
        gallery: [
            { type: 'image', src: 'media/images/journey-1.jpg', alt: 'Journey' },
            { type: 'image', src: 'media/images/journey-2.jpg', alt: 'Journey' },
            { type: 'image', src: 'media/images/journey-3.jpg', alt: 'Journey' },
            { type: 'image', src: 'media/images/journey-4.jpg', alt: 'Journey' },
            { type: 'video', src: 'media/videos/journey.mp4', alt: 'Journey' }
        ]
    },

    'exo': {
        title: 'Exo Hazard',
        category: 'Video-Games Team',
        tagline: 'Unreal Engine blueprint development',
        year: '2024',
        duration: '8 weeks',
        team: '4 persons',
        pillars: ['learning'],
        challenge: 'First Unreal Engine 5 project with blueprint-based development. Learn new technology while contributing to team game development under academic timeline.',
        innovation: 'Rapid Unreal Engine learning curve. Blueprint-based visual scripting approach. Team collaboration in new technology context.',
        deliverables: [
            'Unreal Engine 5 game prototype',
            'Blueprint systems',
            'Team contribution documentation',
            'Technical learning outcomes'
        ],
        impact: 'Successfully completed first Unreal Engine project. Demonstrated rapid technology adoption. Contributed to team game development with new toolset.',
        skills: 'Unreal Engine 5 • Blueprint visual scripting • Rapid learning • Team game development • Technical adaptation • 3D game development • New technology adoption',
        thumbnail: 'media/images/exo-thumbnail.jpg',
        gallery: [
            { type: 'image', src: 'media/images/exo-1.jpg', alt: 'Exo Hazard' },
            { type: 'image', src: 'media/images/exo-2.jpg', alt: 'Exo Hazard' }
            { type: 'image', src: 'media/images/exo-2.jpg', alt: 'Exo Hazard' }
            { type: 'image', src: 'media/images/exo-2.jpg', alt: 'Exo Hazardn' }
            { type: 'video', src: 'media/videos/journey.mp4', alt: 'Exo Hazard' }
        ]
    },

    'aitools': {
        title: 'Learning Tools',
        category: 'Experimental',
        tagline: 'Prototyping innovative learning systems',
        year: '2019-2024',
        duration: 'Ongoing experimentation',
        team: 'Solo research',
        pillars: ['human', 'learning', 'ai'],
        challenge: 'Explore intersections of game mechanics, learning theory, and AI assistance. Develop experimental prototypes testing new approaches to experience-based learning systems.',
        innovation: 'Experimental approach combining multiple disciplines. Prototype-driven learning methodology. Exploration of emerging AI collaboration patterns in learning design.',
        deliverables: [
            'Multiple experimental prototypes',
            'Methodology documentation',
            'Learning system concepts',
            'AI collaboration experiments'
        ],
        impact: 'Ongoing research informing professional practice. Experimental space for methodology development. Foundation for innovative learning system design.',
        skills: 'Experimental design • Learning systems • Prototype development • Interdisciplinary research • AI experimentation • Conceptual innovation • Reflective practice',
        thumbnail: 'media/images/aitools-thumbnail.jpg',
        gallery: [
            { type: 'image', src: 'media/images/aitools-1.jpg', alt: 'Learning Toolsn' },
            { type: 'image', src: 'media/images/aitools-2.jpg', alt: 'Learning Tools' }
            { type: 'image', src: 'media/images/aitools-3.jpg', alt: 'Learning Tools' }
            { type: 'image', src: 'media/images/aitools-4.jpg', alt: 'Learning Tools' }
            { type: 'image', src: 'media/images/aitools-5.jpg', alt: 'Learning Tools' }
        ]
    },

    'website': {
        title: 'This Website',
        category: 'Portfolio Site',
        tagline: 'Portfolio showcasing methodology',
        year: '2025',
        duration: '2 weeks',
        team: 'Solo + AI collaboration',
        pillars: ['ai'],
        challenge: 'Create portfolio website demonstrating technical skills, design thinking, and AI collaboration methodology. Balance professional presentation with authentic process documentation.',
        innovation: 'Portfolio itself demonstrates AI-human collaboration principles. Clean architecture with transparent development process. Showcases technical implementation alongside conceptual framework.',
        deliverables: [
            'Production-ready portfolio website',
            'Clean code architecture',
            'Responsive design implementation',
            'AI collaboration documentation'
        ],
        impact: 'Portfolio demonstrates complete skill set from concept to deployment. Shows technical capability alongside strategic thinking. Authentic demonstration of working methodology.',
        skills: 'HTML/CSS/JavaScript • Responsive design • Clean architecture • AI-assisted development • Portfolio design • Technical documentation • Web deployment',
        thumbnail: 'media/images/website-thumbnail.jpg',
        gallery: [
            { type: 'image', src: 'media/images/website-1.jpg', alt: 'Portfolio website design showcasing clean architecture and responsive layout' },
            { type: 'image', src: 'media/images/website-2.jpg', alt: 'Portfolio development process and AI collaboration documentation' }
        ]
    }
};

// ============================================================================
// PRESENTATION LAYER
// ============================================================================

/**
 * Filter projects by pillar
 * @param {string} pillar - Pillar to filter by ('all', 'human', 'learning', 'ai')
 * @param {HTMLElement} btn - Button that was clicked
 */
function filterProjects(pillar, btn) {
    const featured = document.querySelector('.featured-project');
    const projects = document.querySelectorAll('.project-grid .card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update active button state
    buttons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    // Filter featured project
    if (pillar === 'all') {
        featured.style.display = 'block';
    } else {
        const featuredPillars = featured.getAttribute('data-pillars');
        featured.style.display = featuredPillars && featuredPillars.includes(pillar) ? 'block' : 'none';
    }

    // Filter project cards
    projects.forEach(project => {
        const pillars = project.getAttribute('data-pillars');
        if (pillar === 'all' || (pillars && pillars.includes(pillar))) {
            project.classList.remove('is-hidden');
        } else {
            project.classList.add('is-hidden');
        }
    });
}

/**
 * Open project modal
 * @param {string} projectId - ID of project to display
 */
function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) {
        console.error(`Project not found: ${projectId}`);
        return;
    }

    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');

    // Generate pillar dots
    const pillarClasses = {
        'human': 'pillar-dot--human',
        'learning': 'pillar-dot--learning',
        'ai': 'pillar-dot--ai'
    };

    const pillarDotsHTML = ['human', 'learning', 'ai']
        .map(pillar => {
            const hasThis = project.pillars.includes(pillar);
            return `<span class="pillar-dot ${hasThis ? pillarClasses[pillar] : ''}"></span>`;
        })
        .join('');

    // Determine thumbnail source with fallback
    const thumbnailSrc = project.thumbnail ||
        (project.gallery && project.gallery[0] ? project.gallery[0].src : '') ||
        'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-size=%2224%22%3ENo Image%3C/text%3E%3C/svg%3E';

    // Render modal content
    modalContent.innerHTML = `
        <div class="modal__header">
            <div class="modal__thumbnail" data-action="scroll-to-gallery">
                <img src="${thumbnailSrc}" alt="${project.title} thumbnail" style="width:100%;height:100%;object-fit:contain;">
                <div class="thumbnail__overlay">View Gallery ↓</div>
            </div>
            <div class="modal__title-group">
                <h2 class="modal__title">${project.title}</h2>
                <p class="modal__tagline">${project.tagline}</p>
                <div class="modal__meta">
                    <span class="modal__category">${project.category}</span>
                    <span class="modal__year">${project.year} • ${project.duration} • ${project.team}</span>
                </div>
            </div>
            <button class="modal__close" data-action="close-modal" aria-label="Close modal">&times;</button>
        </div>

        <div class="modal__body">
            <div class="pillar-dots">${pillarDotsHTML}</div>

            <div class="modal__section">
                <h3>The Challenge</h3>
                <p>${project.challenge}</p>
            </div>

            <div class="modal__section">
                <h3>Core Innovation</h3>
                <p>${project.innovation}</p>
            </div>

            <div class="modal__section">
                <h3>Deliverables</h3>
                <ul>${project.deliverables.map(item => `<li>${item}</li>`).join('')}</ul>
            </div>

            <div class="modal__section">
                <h3>Impact & Results</h3>
                <p>${project.impact}</p>
            </div>

            <div class="modal__section">
                <h3>Skills Demonstrated</h3>
                <p class="modal__skills">${project.skills}</p>
            </div>

            <div class="modal__section modal__gallery" id="modalGallery">
                <h3>Project Gallery</h3>
                <div class="gallery-grid">
                    ${renderGallery(project.gallery, projectId)}
                </div>
            </div>
        </div>
    `;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

/**
 * Render gallery items
 * @param {Array} gallery - Array of gallery items
 * @param {string} projectId - Project identifier
 * @returns {string} HTML string
 */
function renderGallery(gallery, projectId) {
    if (!gallery || gallery.length === 0) {
        return '<div class="gallery-item"><div class="gallery-placeholder">📸 Gallery coming soon</div></div>';
    }

    return gallery.map((item, index) => {
        if (item.type === 'image') {
            return `
                <div class="gallery-item" 
                     data-action="open-lightbox" 
                     data-project-id="${projectId}"
                     data-item-index="${index}">
                    <img 
                        src="${item.src}" 
                        alt="${item.alt}" 
                        loading="lazy"
                        onerror="this.parentElement.innerHTML='<div class=\\'gallery-placeholder\\'>Image unavailable</div>'"
                    >
                </div>`;
        } else if (item.type === 'video') {
            return `
                <div class="gallery-item video" 
                     data-action="open-lightbox" 
                     data-project-id="${projectId}"
                     data-item-index="${index}">
                    <video 
                        controls 
                        preload="metadata" 
                        style="width:100%;height:100%;object-fit:contain;">
                        <source src="${item.src}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>`;
        }
        return '';
    }).join('');
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
}

// ============================================================================
// LIGHTBOX SYSTEM
// ============================================================================

const lightboxState = {
    gallery: [],
    currentIndex: 0,
    isOpen: false
};

/**
 * Open lightbox with specific item
 * @param {string} projectId - Project identifier
 * @param {number} itemIndex - Index of item in gallery
 */
function openLightbox(projectId, itemIndex) {
    const project = projectData[projectId];
    if (!project || !project.gallery || !project.gallery[itemIndex]) {
        console.error('Invalid lightbox data');
        return;
    }

    lightboxState.gallery = project.gallery;
    lightboxState.currentIndex = itemIndex;
    lightboxState.isOpen = true;

    const lightbox = document.getElementById('lightbox');
    renderLightboxItem(itemIndex);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

/**
 * Render lightbox content for current item
 * @param {number} index - Index of item to render
 */
function renderLightboxItem(index) {
    const item = lightboxState.gallery[index];
    const content = document.getElementById('lightbox-content');

    if (item.type === 'image') {
        content.innerHTML = `
            <img 
                src="${item.src}" 
                alt="${item.alt}" 
                style="max-width:100%;max-height:100%;object-fit:contain;">`;
    } else if (item.type === 'video') {
        content.innerHTML = `
            <video 
                controls 
                preload="metadata" 
                style="max-width:100%;max-height:100%;object-fit:contain;">
                <source src="${item.src}" type="video/mp4">
                Your browser does not support the video tag.
            </video>`;
    }
}

/**
 * Navigate to next lightbox item
 */
function lightboxNext() {
    if (!lightboxState.gallery.length) return;
    lightboxState.currentIndex = (lightboxState.currentIndex + 1) % lightboxState.gallery.length;
    renderLightboxItem(lightboxState.currentIndex);
}

/**
 * Navigate to previous lightbox item
 */
function lightboxPrev() {
    if (!lightboxState.gallery.length) return;
    lightboxState.currentIndex = (lightboxState.currentIndex - 1 + lightboxState.gallery.length) % lightboxState.gallery.length;
    renderLightboxItem(lightboxState.currentIndex);
}

/**
 * Close lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    lightboxState.isOpen = false;
}

// ============================================================================
// EVENT DELEGATION & INITIALIZATION
// ============================================================================

/**
 * Initialize application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function () {

    // Event delegation for all interactive elements
    document.addEventListener('click', function (e) {
        const target = e.target;
        const action = target.getAttribute('data-action') ||
            target.closest('[data-action]')?.getAttribute('data-action');

        if (!action) return;

        switch (action) {
            case 'close-modal':
                closeModal();
                break;

            case 'open-modal':
                e.preventDefault();
                const projectId = target.getAttribute('data-project-id') ||
                    target.closest('[data-project-id]')?.getAttribute('data-project-id');
                if (projectId) {
                    openModal(projectId);
                }
                break;

            case 'filter-projects':
                e.preventDefault();
                const filterType = target.getAttribute('data-filter') ||
                    target.closest('[data-filter]')?.getAttribute('data-filter');
                if (filterType) {
                    filterProjects(filterType, target);
                }
                break;

            case 'scroll-to-gallery':
                document.getElementById('modalGallery')?.scrollIntoView({ behavior: 'smooth' });
                break;

            case 'open-lightbox':
                e.preventDefault();
                const galleryItem = target.closest('[data-project-id]');
                if (galleryItem) {
                    const lightboxProjectId = galleryItem.getAttribute('data-project-id');
                    const itemIndex = parseInt(galleryItem.getAttribute('data-item-index'), 10);
                    openLightbox(lightboxProjectId, itemIndex);
                }
                break;
        }
    });

    // Lightbox controls
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxPrev = document.getElementById('lightbox-prev');

    // Close lightbox on backdrop click
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target.id === 'lightbox') {
                closeLightbox();
            }
        });
    }

    // Lightbox close button
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Lightbox navigation
    if (lightboxNext) {
        lightboxNext.addEventListener('click', function (e) {
            e.stopPropagation();
            lightboxNext();
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function (e) {
            e.stopPropagation();
            lightboxPrev();
        });
    }

    // Modal backdrop click
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target.id === 'projectModal') {
                closeModal();
            }
        });
    }

    // Consolidated keyboard handler
    document.addEventListener('keydown', function (e) {
        // ESC key - close modal or lightbox
        if (e.key === 'Escape') {
            if (lightboxState.isOpen) {
                closeLightbox();
            } else if (modal && modal.classList.contains('is-open')) {
                closeModal();
            }
        }

        // Arrow keys - navigate lightbox (only when lightbox is open)
        if (lightboxState.isOpen) {
            if (e.key === 'ArrowRight') {
                lightboxNext();
            } else if (e.key === 'ArrowLeft') {
                lightboxPrev();
            }
        }
    });
});

// ============================================================================
// END OF SCRIPT
// ============================================================================