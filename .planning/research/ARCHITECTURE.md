# Architecture Patterns

**Domain:** Portfolio website update -- adding Cognitio featured project + anchor-pill navigation
**Researched:** 2026-02-20
**Confidence:** HIGH (based on direct codebase analysis)

## Current Architecture Overview

The portfolio is a static bilingual site with three files sharing all logic:

```
index.html (DE, ~475 lines)     -- Structurally identical to EN
index-en.html (EN, ~475 lines)  -- Only text content differs
css/styles.css (1624 lines)     -- CSS variables, component styles, responsive
js/main.js (559 lines)          -- State object, init-function modules
media/images/                   -- WebP files per project
```

**Key architectural facts verified from code:**
- CSS uses `:root` variables for colors, spacing, shadows, typography
- JS uses a single `state` object and per-feature `init*()` functions called from `DOMContentLoaded`
- HTML sections follow pattern: `<section id="X" class="section"> > .container > .section__header > content`
- Two HTML files must stay in structural sync (only text differs)

---

## Recommended Architecture for Cognitio Integration

### Principle: Extend, Don't Restructure

The existing architecture is clean and consistent. Cognitio should follow the same patterns exactly, adding only the minimal new CSS/JS needed for the anchor-pill navigation. No refactoring of existing code.

### Component Map

```
SECTION #featured-work
  |
  +-- .section__header
  |     +-- h2 "Featured Projects" (pluralize from "Featured Project")
  |
  +-- .project-pills  [NEW COMPONENT]
  |     +-- a.project-pill[href="#project-mindsetplay"]  "mind.set.play"
  |     +-- a.project-pill[href="#project-cognitio"]     "Cognitio"
  |     +-- a.project-pill[href="#project-training"]     "Training Portfolio"
  |
  +-- article#project-mindsetplay.featured-project  [ADD ID]
  |     (existing mind.set.play -- unchanged)
  |
  +-- article#project-cognitio.featured-project  [NEW]
  |     +-- .featured-project__content
  |     |     +-- .featured-project__text
  |     |     |     +-- h3.featured-project__title
  |     |     |     +-- p.featured-project__subtitle
  |     |     |     +-- p.featured-project__description
  |     |     |     +-- .project-section.collapsible (Problem)
  |     |     |     +-- .project-section.collapsible (Solution)
  |     |     |     +-- .project-section.collapsible (Result)
  |     |     +-- .featured-project__image
  |     |           +-- img.featured-thumbnail
  |     +-- .project-gallery.collapsible
  |     |     +-- h4.gallery-title.collapsible-header
  |     |     +-- .gallery-grid.collapsible-content
  |     +-- .testimonial-wrapper.collapsible (if testimonial exists)
  |
  +-- article#project-training.featured-project  [ADD ID]
        (existing Creative Production Portfolio -- unchanged)
```

---

## Component Boundaries

### 1. Anchor-Pill Navigation (NEW)

**HTML class:** `.project-pills`
**CSS touches:** New styles only (`.project-pills`, `.project-pill`, `.project-pill--active`)
**JS touches:** New `initProjectPills()` function added to init chain
**Existing code impact:** NONE -- new component, new classes

```html
<!-- Placement: inside .container, after .section__header, before first article -->
<nav class="project-pills" aria-label="Project navigation">
    <a href="#project-mindsetplay" class="project-pill project-pill--active">mind.set.play</a>
    <a href="#project-cognitio" class="project-pill">Cognitio</a>
    <a href="#project-training" class="project-pill">Training Portfolio</a>
</nav>
```

**Why `<nav>` with `<a>` tags:**
- Semantic HTML for navigation
- Works with existing `initSmoothScroll()` which already targets `a[href^="#"]`
- Accessible by default (keyboard navigation, screen readers)
- No JS required for basic functionality (scroll to anchor)

**CSS (new, ~40 lines):**
```css
.project-pills {
    display: flex;
    gap: var(--space-3);
    margin-bottom: var(--space-8);
    flex-wrap: wrap;
}

.project-pill {
    padding: var(--space-2) var(--space-4);
    background: var(--bg-secondary);
    border: 2px solid var(--bg-secondary);
    border-radius: var(--radius-full);  /* pill shape */
    color: var(--text-secondary);
    font-weight: 500;
    font-size: 0.875rem;
    text-decoration: none;
    transition: all var(--transition-base);
    white-space: nowrap;
}

.project-pill:hover {
    background: var(--bg-tinted);
    border-color: var(--accent-primary);
    color: var(--accent-primary);
}

.project-pill--active {
    background: var(--accent-primary);
    border-color: var(--accent-primary);
    color: var(--text-inverse);
}
```

**JS (new `initProjectPills()`, ~30 lines):**
```javascript
function initProjectPills() {
    const pills = document.querySelectorAll('.project-pill');
    if (pills.length === 0) return;

    // Track which project section is in view
    const projectSections = document.querySelectorAll('#featured-work .featured-project[id]');
    if (projectSections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                pills.forEach(pill => {
                    pill.classList.toggle('project-pill--active',
                        pill.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -60% 0px',  // trigger in upper portion of viewport
        threshold: 0
    });

    projectSections.forEach(section => observer.observe(section));
}
```

### 2. Cognitio Article (NEW)

**HTML class:** `.featured-project` (reuses existing class)
**CSS touches:** ZERO new CSS required -- inherits all existing styles
**JS touches:** ZERO new JS required -- collapsibles and lightbox auto-initialize
**Existing code impact:** NONE

The Cognitio article is an exact structural clone of the mind.set.play article. It reuses:
- `.featured-project` card styling
- `.featured-project__content` / `__text` / `__image` layout
- `.featured-project__title` / `__subtitle` / `__description` typography
- `.project-section.collapsible` for expandable details
- `.collapsible-header` / `.collapsible-content` for interaction
- `.project-gallery.collapsible` for media gallery
- `.gallery-grid` for image layout
- `[data-lightbox]` for lightbox integration

**Why this works with zero new CSS/JS:**
- `initCollapsible()` targets ALL `.collapsible-header` elements on the page -- new ones are included automatically
- `initLightbox()` targets ALL `.gallery-grid` containers -- new ones are included automatically
- `initSmoothScroll()` targets ALL `a[href^="#"]` -- new anchor pills are included automatically

### 3. Article ID Attributes (MODIFICATION)

**What changes:** Add `id` attributes to existing `<article>` elements
**Impact:** Purely additive. No CSS or JS changes needed.

```html
<!-- Before -->
<article class="featured-project">

<!-- After -->
<article id="project-mindsetplay" class="featured-project">
<article id="project-cognitio" class="featured-project">
<article id="project-training" class="featured-project">
```

### 4. Section Header Text (MODIFICATION)

**What changes:** "Featured Project" (singular) becomes "Featured Projects" (plural)
**Impact:** Text-only change in both HTML files.

---

## Data Flow

### Anchor Pill Interaction Flow

```
User clicks pill
    |
    v
Browser follows href="#project-cognitio"
    |
    v
initSmoothScroll() intercepts (already exists)
    |
    +-- Calculates target position minus header height (already exists)
    +-- window.scrollTo({ behavior: 'smooth' }) (already exists)
    |
    v
IntersectionObserver in initProjectPills() detects section in view
    |
    v
Updates .project-pill--active class on correct pill
```

**Key insight:** The smooth scroll is already handled by existing code. The only new JS is the IntersectionObserver for tracking the active pill state. This means 80% of the interaction works with zero JS additions.

### Scroll-Spy Active State Flow

```
User scrolls page
    |
    v
IntersectionObserver fires for each .featured-project[id]
    |
    +-- rootMargin: '-20% 0px -60% 0px'
    |   (triggers when section enters upper 20-40% of viewport)
    |
    v
Callback toggles .project-pill--active on matching pill
    |
    v
CSS transition animates pill color/background change
```

### Lightbox Integration (No Changes)

```
New Cognitio gallery uses .gallery-grid + [data-lightbox]
    |
    v
initLightbox() already queries ALL .gallery-grid containers
    |
    v
Lightbox works automatically for new gallery items
```

### Collapsible Integration (No Changes)

```
New Cognitio collapsibles use .collapsible-header
    |
    v
initCollapsible() already queries ALL .collapsible-header elements
    |
    v
Toggle works automatically for new collapsible sections
```

---

## Patterns to Follow

### Pattern 1: Mirror Existing Article Structure Exactly

**What:** Copy mind.set.play's HTML structure verbatim, replace only content.
**When:** Building the Cognitio article.
**Why:** Every CSS class and JS behavior already exists and is tested. Deviation introduces risk.

```html
<article id="project-cognitio" class="featured-project">
    <div class="featured-project__content">
        <div class="featured-project__text">
            <h3 class="featured-project__title">
                <span class="game-name">Cognitio</span>
                <span class="project-meta-inline">| [Type] | [Year]</span>
            </h3>
            <p class="featured-project__subtitle">[Subtitle]</p>
            <p class="featured-project__description">[Description]</p>
            <!-- Collapsible sections -->
        </div>
        <div class="featured-project__image">
            <img src="media/images/cognitio-thumbnail.webp"
                 alt="[Alt text]" class="featured-thumbnail">
        </div>
    </div>
    <!-- Gallery -->
    <!-- Testimonial (if applicable) -->
</article>
```

### Pattern 2: Add to Init Chain

**What:** New `initProjectPills()` follows the same pattern as other init functions.
**When:** Adding the scroll-spy behavior.
**Why:** Consistent with existing architecture.

```javascript
// In DOMContentLoaded handler, add after existing inits:
initProjectPills();
```

### Pattern 3: Use Existing CSS Variables

**What:** All new CSS uses existing `:root` variables.
**When:** Styling the pill navigation.
**Why:** Ensures visual consistency, respects the design system.

Variables to use:
- `--bg-secondary`, `--bg-tinted` for pill backgrounds
- `--accent-primary`, `--accent-primary-hover` for active/hover states
- `--text-secondary`, `--text-inverse` for text colors
- `--space-*` for all spacing
- `--radius-full` for pill shape
- `--transition-base` for animations

### Pattern 4: Dual-File HTML Sync

**What:** Every structural change to index.html must be mirrored in index-en.html.
**When:** Every HTML edit.
**Why:** The two files are structurally identical; only text content differs.

**Practical approach:**
1. Make structural change in index.html first
2. Copy the structure to index-en.html
3. Replace German text with English text
4. Verify both files have identical tag structure (diff ignoring text)

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Adding New CSS Classes Where Existing Ones Work

**What:** Creating `.cognitio-project` or `.featured-project-v2` classes.
**Why bad:** Duplicates existing styles, creates maintenance burden, breaks the pattern.
**Instead:** Use the exact same classes as mind.set.play. The CSS is already generic.

### Anti-Pattern 2: JavaScript Re-initialization

**What:** Adding separate event listeners for Cognitio collapsibles or gallery.
**Why bad:** `initCollapsible()` and `initLightbox()` already target all matching elements. Adding more listeners creates double-firing bugs.
**Instead:** Use the same HTML attributes (`data-lightbox`, `.collapsible-header`) and let existing JS handle it.

### Anti-Pattern 3: Inline Styles for Pill Navigation

**What:** Using `style=""` attributes on pills instead of CSS classes.
**Why bad:** Violates the codebase convention. All current styling uses CSS classes.
**Instead:** Define `.project-pill` styles in styles.css following existing patterns.

### Anti-Pattern 4: Modifying initSmoothScroll for Pills

**What:** Adding special pill-handling logic inside `initSmoothScroll()`.
**Why bad:** Smooth scroll already handles all `a[href^="#"]` elements generically.
**Instead:** Let the existing function work. Only add the IntersectionObserver for active state.

### Anti-Pattern 5: Structural Divergence Between Language Files

**What:** Adding Cognitio to index.html but with different HTML structure in index-en.html.
**Why bad:** CSS targets classes, not IDs. Different structures = different rendering.
**Instead:** Identical HTML structure, different text content only.

---

## Build Order (Dependency-Driven)

The build order matters because some changes are prerequisites for others.

### Phase 1: HTML Structure (No visual changes yet)

**Step 1a: Add IDs to existing articles** (both HTML files)
- Add `id="project-mindsetplay"` to first article
- Add `id="project-training"` to second article
- Change "Featured Project" to "Featured Projects" in h2
- **Risk:** Zero -- additive only, no CSS/JS depends on these IDs yet
- **Test:** Page renders identically

**Step 1b: Add Cognitio article HTML** (both HTML files)
- Clone mind.set.play article structure
- Insert between mind.set.play and Creative Production articles
- Add `id="project-cognitio"`
- Use placeholder text/images initially
- **Depends on:** Nothing. Existing CSS handles all classes.
- **Test:** New section appears, collapsibles work, layout matches mind.set.play

**Step 1c: Add pill navigation HTML** (both HTML files)
- Insert `<nav class="project-pills">` after `.section__header`
- Three anchor links targeting article IDs from Step 1a
- **Depends on:** Step 1a (IDs exist for href targets)
- **Test:** Links appear as unstyled text, clicking scrolls to correct section

### Phase 2: CSS Additions (~40 lines)

**Step 2: Add pill styles to styles.css**
- `.project-pills` flexbox container
- `.project-pill` base styles (pill shape, colors, transitions)
- `.project-pill--active` active state
- `.project-pill:hover` hover state
- Responsive adjustment for mobile (smaller pills, wrap behavior)
- **Depends on:** Step 1c (HTML elements exist)
- **Test:** Pills render correctly, hover works, active pill is visually distinct

### Phase 3: JavaScript Addition (~30 lines)

**Step 3: Add initProjectPills() to main.js**
- IntersectionObserver for scroll-spy active state
- Add to DOMContentLoaded init chain
- **Depends on:** Step 1a (IDs for observation targets), Step 2 (active class for visual feedback)
- **Test:** Scrolling updates active pill, clicking a pill scrolls and activates it

### Phase 4: Content & Media

**Step 4: Replace placeholder content**
- Cognitio project text (DE + EN)
- Cognitio images (WebP, placed in `media/images/`)
- Gallery items with `data-lightbox` attributes
- **Depends on:** Phase 1-3 complete
- **Test:** Full integration -- all interactions work, content is correct, both languages match

### Why This Order

1. **HTML first** because CSS and JS have no effect without elements to target
2. **IDs before pills** because pills need href targets
3. **Cognitio article before pills** because three pills with only two targets is confusing during dev
4. **CSS before JS** because the active state class needs styles before the observer applies them
5. **Content last** because structure and behavior are the architectural risks; content is just fill

---

## File Change Summary

| File | Changes | Lines Added (est.) | Risk |
|------|---------|-------------------|------|
| `index.html` | Add article IDs, pill nav, Cognitio article, header text | ~120 | LOW -- additive only |
| `index-en.html` | Mirror of index.html changes with English text | ~120 | LOW -- structural mirror |
| `css/styles.css` | `.project-pills`, `.project-pill` styles | ~40 | LOW -- no existing styles touched |
| `js/main.js` | `initProjectPills()` + add to init chain | ~30 | LOW -- no existing functions touched |
| `media/images/` | Cognitio WebP images | N/A | LOW -- new files only |

**Total existing code modified:** ~5 lines (3 ID additions, 1 h2 text change per HTML file, 1 init call in JS)
**Total new code:** ~310 lines across 3 files

---

## Scalability Considerations

| Concern | At 3 projects (now) | At 5 projects | At 10+ projects |
|---------|---------------------|---------------|-----------------|
| Pill navigation | Fits single row | May wrap to second row -- `.flex-wrap: wrap` handles this | Consider dropdown or category tabs |
| Page length | Manageable scroll | Getting long -- consider lazy-loading or pagination | Separate pages per project |
| CSS file size | ~1665 lines -- fine | ~1700 lines -- fine | Still fine for a static site |
| JS init scope | `querySelectorAll` is fast | Still fast | Still fast -- DOM is not the bottleneck |
| HTML duplication | Two files manageable | Two files still manageable | Consider templating (Astro, 11ty) if > 8 projects |
| Image loading | Fine with WebP | Add `loading="lazy"` to below-fold images | Consider CDN or image optimization pipeline |

---

## Sources

- **Direct codebase analysis** of `index.html` (475 lines), `index-en.html` (475 lines), `css/styles.css` (1624 lines), `js/main.js` (559 lines) -- HIGH confidence
- IntersectionObserver API: Standard Web API, supported in all modern browsers -- HIGH confidence
- CSS `border-radius: 9999px` for pill shape: Established CSS pattern -- HIGH confidence
