    // PROJECT DATA
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
        deliverables: ['Complete board game with physical materials', 'Facilitator guide with debrief questions', '6-month development process documentation', 'Deployment-ready format for consultants'],
        impact: 'Makes New Work principles experiential through role-switching and VUCA simulation. Scalable to 6-18 participants with measurable team dynamics improvement. Successfully deployed in corporate training contexts.',
        skills: 'Game mechanics design • Behavioral psychology • Facilitation framework • Corporate learning • Stakeholder management • Iterative prototyping • Measurable impact design'
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
        deliverables: ['Playable JavaScript game with WASD controls', 'Multiple scenes with animations and sound', 'Complete project documentation (GDD, workflow records)', 'Team-created visual assets'],
        impact: 'Fully playable game delivered within deadline. Positive peer feedback on team dynamics. Demonstrated how gamification techniques strengthen collaboration and maintain focus under project constraints.',
        skills: 'Agile team leadership • JavaScript game development • Cross-functional coordination • Process innovation • Gamified check-ins • Deadline management • First team leadership role'
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
        deliverables: ['Stabilized project workflow', 'Crisis intervention documentation', 'C# programming contributions', 'Project management framework'],
        impact: 'Successfully stabilized failing project. Demonstrated dual-role execution capability. Proved crisis management and workflow stabilization expertise under pressure.',
        skills: 'Crisis management • Project stabilization • Dual-role execution • C# programming • PM methodologies • Team coordination • Workflow optimization • Strategic flexibility'
      },
      'chess': {
        title: 'Chess-Quest',
        category: 'Video-Games Solo',
        tagline: 'C# game with transparent AI use',
        year: '2025',
        duration: '6 weeks',
        team: 'Solo development',
        pillars: ['ai'],
        challenge: 'Solo C# Unity development with transparent AI collaboration. Create complete game while maintaining clear provenance tracking of all contributions (self/tutorial/AI).',
        innovation: 'Transparent AI collaboration with provenance tracking. AI-assisted debugging enabled solo C# development. Complete documentation of human vs. AI contributions demonstrates responsible AI integration.',
        deliverables: ['Complete Unity game', 'Provenance tracking system', 'AI collaboration documentation', 'C# codebase with attribution'],
        impact: 'Demonstrates transparent AI-assisted development methodology. Proves solo C# capability with AI support. Creates replicable workflow for responsible AI collaboration.',
        skills: 'Unity C# development • AI-assisted debugging • Provenance tracking • Solo development • Transparent documentation • Responsible AI integration • Game mechanics implementation'
      },
      'journey': {
        title: 'Journey',
        category: 'Video-Games Solo',
        tagline: 'Narrative UX mapping methodology',
        year: '2025',
        duration: '4-6 weeks',
        team: 'Solo development',
        pillars: ['human'],
        challenge: 'Translate personal challenges into operational UX solutions. Create repeatable methodology for narrative-driven problem-solving with scenario-based testing.',
        innovation: '"UX Quests" methodology frames problems as playable scenarios with decision points and iterative refinement. Narrative-driven approach to UX mapping creates engaged problem-solving.',
        deliverables: ['UX Quests methodology framework', 'Scenario-based testing workflow', 'UX maps and storyboards', 'Repeatable process documentation'],
        impact: 'Created transferable UX methodology. Demonstrated narrative design application to operational challenges. Proved scenario-based testing effectiveness.',
        skills: 'UX methodology creation • Narrative design • Scenario-based testing • Problem framing • Iterative refinement • Story mapping • Process documentation • Repeatable frameworks'
      },
      'website': {
        title: 'This Website',
        category: 'Meta-Documentation',
        tagline: 'Portfolio as process showcase',
        year: '2025',
        duration: 'Ongoing',
        team: 'Solo + AI collaboration',
        pillars: ['ai'],
        challenge: 'Create portfolio that demonstrates both finished work and systematic problem-solving approach. Document complete human-AI collaboration workflow transparently.',
        innovation: 'Portfolio itself becomes methodology proof. Complete transparency of AI collaboration. Strategic design decisions (human) + technical implementation (AI support) fully documented.',
        deliverables: ['Responsive one-pager website', 'Custom animation system', 'Complete workflow documentation', 'Live demonstration of AI methodology'],
        impact: 'Portfolio demonstrates systematic approach, not just finished work. Proves transparent AI integration in professional context. Creates replicable human-AI collaboration framework.',
        skills: 'Responsive web design • CSS animations • JavaScript • Human-AI collaboration • Technical documentation • Project presentation • Strategic communication • Modular architecture'
      },
      'aitools': {
        title: 'Learning Tools (experimental)',
        category: 'AI-Based Learning',
        tagline: 'Corporate training tools with AI',
        year: '2024-2025',
        duration: 'Ongoing',
        team: 'Solo development',
        pillars: ['human', 'learning', 'ai'],
        challenge: 'Create scalable corporate training tools demonstrating all three pillars. Build Custom GPT, C# console app, and RPG Lab simulation engine for diverse learning scenarios.',
        innovation: 'Three-tool suite for comprehensive corporate training: JavaScript Training GPT with personalized instruction, C# Console App for interactive learning, RPG Story Lab for soft-skills simulation.',
        deliverables: ['Code Magic: JavaScript Training GPT', 'Code Magic: C# Beginner Trail console app', 'RPG Story Lab simulation engine', 'Corporate training frameworks'],
        impact: 'Demonstrates comprehensive three-pillars integration. Proves scalability across multiple corporate applications. Creates modular training system with progressive learning pathways.',
        skills: 'Custom GPT development • C# console applications • Corporate training design • Gamified narratives • Soft-skills simulation • Progressive learning paths • Multi-tool integration'
      },
      'exo': {
        title: 'Exo Hazard',
        category: 'Video-Games Team',
        tagline: '7-person team coordination',
        year: '2025',
        duration: '10 days (initial phase)',
        team: '7 persons (multi-specialist)',
        pillars: ['learning'],
        challenge: 'Coordinate 7-person multi-specialist team. Synthesize multiple genres (FPS, puzzle, tower defense) into unified Unity architecture during compressed 10-day initial phase.',
        innovation: 'Multi-genre Unity architecture unifying diverse gameplay modes. Early-stage architecture establishment with leadership transition management across large team.',
        deliverables: ['Multi-genre Unity game architecture', 'Team coordination framework', 'Genre synthesis methodology', 'Initial phase deliverables'],
        impact: 'Successfully coordinated 7-person team across multiple specializations. Proved capability with large team dynamics. Established unified architecture for diverse gameplay elements.',
        skills: 'Large team coordination • Unity architecture • Multi-genre synthesis • Leadership transition • Early-stage planning • Specialist management • Genre integration • Compressed timeline execution'
      }
    };
    
    function filterProjects(pillar) {
      const featured = document.querySelector('.featured-project');
      const projects = document.querySelectorAll('.project-grid .card');
      const buttons = document.querySelectorAll('.filter-btn');
      
      buttons.forEach(btn => btn.classList.remove('is-active'));
      event.target.classList.add('is-active');
      
      if (pillar === 'all') {
        featured.style.display = 'block';
      } else {
        const featuredPillars = featured.getAttribute('data-pillars');
        featured.style.display = featuredPillars && featuredPillars.includes(pillar) ? 'block' : 'none';
      }
      
      projects.forEach(project => {
        if (pillar === 'all') {
          project.classList.remove('is-hidden');
        } else {
          const pillars = project.getAttribute('data-pillars');
          if (pillars && pillars.includes(pillar)) {
            project.classList.remove('is-hidden');
          } else {
            project.classList.add('is-hidden');
          }
        }
      });
    }
    
    // MODAL FUNCTIONS
    function openModal(projectId) {
      const project = projectData[projectId];
      if (!project) return;
      
      const modal = document.getElementById('projectModal');
      const modalContent = document.getElementById('modalContent');
      
      // Build pillar dots HTML
      const pillarClasses = {
        'human': 'pillar-dot--human',
        'learning': 'pillar-dot--learning',
        'ai': 'pillar-dot--ai'
      };
      
      let pillarDotsHTML = '';
      ['human', 'learning', 'ai'].forEach(pillar => {
        const hasThis = project.pillars.includes(pillar);
        pillarDotsHTML += `<span class="pillar-dot ${hasThis ? pillarClasses[pillar] : ''}"></span>`;
      });
      
      // Build modal content
      modalContent.innerHTML = `
        <div class="modal__header">
          <div class="modal__thumbnail" onclick="document.getElementById('modalGallery').scrollIntoView({behavior: 'smooth'})">
            <div class="thumbnail__placeholder">📷</div>
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
          <button class="modal__close" onclick="closeModal()" aria-label="Close modal">&times;</button>
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
            <ul>
              ${project.deliverables.map(item => `<li>${item}</li>`).join('')}
            </ul>
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
				${project.gallery ? project.gallery.map(item => {
				  if (item.type === 'image') {
					return `
					  <div class="gallery-item">
						<img src="${item.src}" alt="${item.alt}" loading="lazy">
					  </div>
					`;
				  } else if (item.type === 'video') {
					return `
					  <div class="gallery-item video">
						<iframe 
						  src="${item.src}" 
						  title="${item.alt}"
						  frameborder="0" 
						  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
						  allowfullscreen>
						</iframe>
					  </div>
					`;
				  }
				}).join('') : '<p>Gallery coming soon</p>'}
			  </div>
			</div>
        </div>
      `;
      
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
      const modal = document.getElementById('projectModal');
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
    
    // Close on backdrop click
    document.addEventListener('click', (e) => {
      if (e.target.id === 'projectModal') closeModal();
    });
