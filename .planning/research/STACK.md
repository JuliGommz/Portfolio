# Technology Stack: Cognitio Featured Project Addition

**Project:** Portfolio update -- adding Cognitio as featured project with anchor-pill navigation
**Researched:** 2026-02-20
**Scope:** CSS/JS patterns for anchor pills, expandable sections, gallery structure
**Constraint:** Must stay within existing vanilla HTML/CSS/JS stack (no frameworks, no build tools)

---

## Existing Stack (Reference, Not Re-Researched)

| Technology | Version | Role |
|------------|---------|------|
| HTML5 | -- | Semantic markup, bilingual (DE/EN separate files) |
| CSS3 | -- | Custom properties, media queries, grid, flexbox |
| Vanilla JS | ES6+ | Collapsibles, lightbox, smooth scroll, mobile menu |
| Google Fonts | -- | Poppins (headings), Inter (body) |
| Vimeo embeds | -- | Video content via iframe |
| WebP | -- | Image format for all assets |

---

## Recommended Additions (New Patterns Only)

### 1. Anchor-Pill Navigation

**Purpose:** Horizontal row of pill-shaped links inside the "Featured Work" section header, allowing users to jump between featured projects (mind.set.play, Cognitio, Creative Production Portfolio).

#### CSS Pattern: Pill Container with Flexbox

| Pattern | Specification | Confidence |
|---------|---------------|------------|
| `display: flex; gap` for pill row | Flexbox -- Baseline since 2015 | HIGH |
| `border-radius: var(--radius-full)` for pill shape | Already defined as `9999px` in `:root` | HIGH |
| `scroll-margin-top` on targets | Baseline Widely Available since April 2021 (MDN verified) | HIGH |
| `scroll-behavior: smooth` on `html` | Already present in styles.css line 1034 | HIGH |

**Why Flexbox, not CSS Grid for pills:** The pill row is a single horizontal line of items with natural sizing. Flexbox's `flex-wrap: wrap` handles overflow on mobile gracefully. Grid would over-constrain item widths.

**Why NOT `overflow-x: auto` horizontal scroll:** With only 2-3 pills, horizontal scrolling creates a hidden-content problem. Wrapping is better for discoverability. Only consider horizontal scroll if the pill count exceeds 5.

```css
/* Pill navigation container */
.project-pills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: center;
  margin-bottom: var(--space-8);
}

/* Individual pill */
.project-pill {
  display: inline-flex;
  align-items: center;
  padding: var(--space-2) var(--space-6);
  border-radius: var(--radius-full);
  border: 2px solid var(--accent-primary);
  color: var(--accent-primary);
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 0.9375rem;
  text-decoration: none;
  transition: all var(--transition-base);
  min-height: 44px; /* Touch target -- matches existing .btn */
  white-space: nowrap;
}

.project-pill:hover {
  background-color: var(--accent-primary);
  color: var(--text-inverse);
  text-decoration: none;
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

/* Active pill state (set by IntersectionObserver) */
.project-pill.active {
  background-color: var(--accent-primary);
  color: var(--text-inverse);
}
```

#### CSS Pattern: `scroll-margin-top` on Target Sections

**What it solves:** The site has a fixed header (`.header` is `position: fixed`, roughly 60px tall). When clicking an anchor link, the browser scrolls so the target element's top aligns with the viewport top -- hidden behind the header.

**Current workaround (in JS):** `initSmoothScroll()` on line 157-183 of main.js manually calculates `headerHeight` and uses `window.scrollTo()`. This works but only for JS-initiated scrolls.

**Better approach:** Use `scroll-margin-top` on each featured project `<article>`, keeping the JS smooth scroll as a progressive enhancement for older browsers.

```css
/* Scroll offset for fixed header -- apply to all anchor targets */
.featured-project[id] {
  scroll-margin-top: 80px; /* header height + breathing room */
}
```

**Confidence:** HIGH -- `scroll-margin-top` is Baseline Widely Available since April 2021 per MDN. Every modern browser supports it. The existing `html { scroll-behavior: smooth }` in the CSS already handles smooth scrolling for native anchor clicks.

**Important:** Keep the existing JS `initSmoothScroll()` function. It provides the manual `scrollTo` fallback and handles edge cases. The `scroll-margin-top` CSS simply ensures that even native anchor navigation (e.g., URL hash on page load) respects the header offset.

---

### 2. Scroll-Spy with IntersectionObserver (Active Pill Highlighting)

**Purpose:** As the user scrolls through featured projects, the corresponding pill in the navigation highlights automatically.

| Pattern | Specification | Confidence |
|---------|---------------|------------|
| `IntersectionObserver` API | Baseline Widely Available since March 2019 (MDN verified) | HIGH |
| `rootMargin` for header offset | Part of IntersectionObserver spec | HIGH |
| `threshold: 0` for enter detection | Default behavior | HIGH |

**Why IntersectionObserver, not scroll event + `getBoundingClientRect()`:** The existing codebase already uses a throttled scroll handler for header shadow (`initHeaderScroll`). Adding another scroll listener for pill highlighting would compound scroll-jank risk. IntersectionObserver is asynchronous, off-main-thread in most browsers, and purpose-built for visibility detection.

**Why NOT `scroll-snap-type`:** Scroll snap forces the viewport to lock onto sections, which is hostile UX on a long-form portfolio page. Users must be free to scroll anywhere without the page "snapping" away from their intended position.

```javascript
/**
 * Initialize scroll-spy for project pill navigation.
 * Highlights the pill corresponding to the currently visible project.
 */
function initProjectPillSpy() {
    const pills = document.querySelectorAll('.project-pill');
    const projects = document.querySelectorAll('.featured-project[id]');

    if (!pills.length || !projects.length) return;

    const headerHeight = document.querySelector('.header')?.offsetHeight || 60;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.id;

                pills.forEach(pill => {
                    const isMatch = pill.getAttribute('href') === `#${activeId}`;
                    pill.classList.toggle('active', isMatch);
                });
            }
        });
    }, {
        root: null, // viewport
        rootMargin: `-${headerHeight + 20}px 0px -60% 0px`,
        threshold: 0
    });

    projects.forEach(project => observer.observe(project));
}
```

**`rootMargin` explanation:**
- Top: `-${headerHeight + 20}px` -- ignore the area behind the fixed header plus 20px breathing room
- Bottom: `-60%` -- only trigger when the project is in the top 40% of the viewport (prevents false triggers when just peeking at the bottom)
- This means a project is "active" when its top edge is between the header bottom and the 40% viewport line

**Confidence:** HIGH -- IntersectionObserver has been Baseline since March 2019 per MDN. The pattern is well-established for scroll-spy implementations.

---

### 3. Expandable/Collapsible Project Detail Sections

**Purpose:** Cognitio project details (Problem, Solution, Result) use the same collapsible pattern as mind.set.play.

**Decision: Reuse existing pattern exactly.** The current system works well:

| Existing Pattern | Implementation | Location |
|-----------------|----------------|----------|
| `.collapsible` wrapper class | CSS `max-height: 0` to `max-height: 500px` | styles.css line 768-824 |
| `.collapsible-header` click handler | JS toggles `.active` class on parent | main.js line 489-498 |
| `.toggle-icon` rotation | CSS `transform: rotate(180deg)` on `.active` | styles.css line 809-813 |

**What NOT to change:**
- Do NOT switch to `<details>/<summary>` HTML elements. Reason: The existing `max-height` transition provides a smooth animation that `<details>` does not natively support. While `<details>` has the advantage of working without JS, the existing animation is a deliberate UX choice, and mixing two collapsible patterns in the same page creates inconsistency.
- Do NOT add `aria-expanded` yet unless accessibility audit is a separate milestone. The current pattern lacks it, and adding it only to Cognitio creates inconsistency.

**For Cognitio, just replicate the HTML structure:**

```html
<div class="project-section collapsible">
    <h4 class="collapsible-header">Section Title <span class="toggle-icon">&#9660;</span></h4>
    <div class="collapsible-content">
        <p>Content here</p>
    </div>
</div>
```

**Confidence:** HIGH -- this is reusing a proven, existing pattern.

**Future improvement (not for this milestone):** The `max-height: 500px` is a magic number. Content taller than 500px gets clipped. The gallery collapsible uses `max-height: 3000px` as a workaround. A cleaner approach (for a future refactor) would be to measure actual content height with JS and set `max-height` dynamically. But this is not a blocker for adding Cognitio.

---

### 4. Future-Ready Gallery Structure

**Purpose:** Cognitio project gets a gallery section that starts empty (placeholder) and receives images later.

#### CSS Pattern: Empty-State Gallery Grid

The existing `.gallery-grid` and `.mini-gallery` patterns work. For an empty gallery, use a CSS-only empty state.

| Pattern | Specification | Confidence |
|---------|---------------|------------|
| `:empty` pseudo-class | Baseline since CSS3, universal support | HIGH |
| `aspect-ratio` for placeholder | Baseline Widely Available since Sept 2021 (MDN verified) | HIGH |
| `:has()` pseudo-class | Baseline Newly Available since Dec 2023 (MDN verified) | MEDIUM |

**Why `:has()` confidence is MEDIUM:** While `:has()` is Baseline since Dec 2023, it may not work on older Android WebView or enterprise browsers. For a portfolio site targeting modern browsers this is fine, but the fallback approach is to use a `.gallery--empty` class instead.

```css
/* Gallery that degrades gracefully when empty */
.mini-gallery:empty {
  display: none; /* Hide completely when no children */
}

/* Alternative: visible placeholder for empty gallery */
.mini-gallery--placeholder:empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  border: 2px dashed var(--bg-secondary);
  border-radius: var(--radius-md);
  color: var(--text-tertiary);
  font-style: italic;
}

.mini-gallery--placeholder:empty::after {
  content: 'Gallery coming soon';
}
```

**Recommended approach for Cognitio:** Use the `.mini-gallery` grid class. If no images exist yet, either:
1. **Option A (simpler):** Don't include the gallery markup at all. Add it when images are ready.
2. **Option B (if gallery header should be visible):** Include the gallery title but use `.mini-gallery:empty` to hide the empty grid.

**Recommendation: Option A.** There is no benefit to rendering an empty gallery container. Add the gallery HTML when images arrive. This avoids placeholder UX that says "coming soon" on a professional portfolio.

**Confidence:** HIGH for the overall approach. The grid pattern is already proven in the codebase.

---

### 5. Responsive Behavior for New Content

**No new responsive patterns needed.** The existing breakpoint system handles all new components:

| Breakpoint | Existing Pattern | Applies To New Content |
|------------|-----------------|----------------------|
| `max-width: 480px` | Single column, smaller fonts | Pill wrap, gallery stack |
| `max-width: 767px` | Mobile menu, collapsible galleries | Pill wrap, mobile collapsibles |
| `min-width: 768px` | Grid layouts, desktop nav | Pill row, gallery grid |

**Pill navigation responsive behavior:**
- Desktop (768px+): Pills sit in a centered flex row
- Mobile (<768px): Pills wrap naturally via `flex-wrap: wrap`
- No special mobile treatment needed because 2-3 pills easily fit on any screen width

**Sticky pill nav consideration:** Do NOT make the pills sticky. The site already has a fixed header taking up ~60px. Adding another sticky element reduces content area and creates a "double toolbar" pattern that frustrates users on mobile. The pills should scroll with the section header.

---

## What NOT to Add (Anti-Stack)

| Technology | Why NOT |
|------------|---------|
| **Any CSS framework** (Tailwind, Bootstrap) | Existing custom CSS is well-structured with variables. Adding a framework creates two styling paradigms. |
| **Any JS library** (GSAP, Swiper, Alpine.js) | The features needed are achievable with vanilla JS. Adding a library for one component creates a dependency for future maintenance. |
| **CSS `scroll-snap-type`** | Hostile UX on long-form pages. Locks viewport to snap points, preventing free scrolling. |
| **`<details>/<summary>` elements** | Would create two different collapsible patterns on the same page. Inconsistent. |
| **Sticky sub-navigation** | Double-toolbar anti-pattern with existing fixed header. |
| **CSS container queries** | Overkill for this use case. Media queries are sufficient. Container queries solve component-in-different-contexts problems, not page-layout problems. |
| **View Transitions API** | Experimental, inconsistent browser support, and the existing `transition` properties already handle all needed animations. |

---

## HTML Structure Recommendation

The Cognitio project article should follow the exact same structure as mind.set.play, with `id` attributes for pill targeting:

```html
<!-- Inside #featured-work section, pill nav goes in section header -->
<div class="section__header">
    <h2 class="section__title">Featured Work</h2>
    <nav class="project-pills" aria-label="Featured projects">
        <a href="#project-mindsetplay" class="project-pill active">mind.set.play</a>
        <a href="#project-cognitio" class="project-pill">Cognitio</a>
        <a href="#project-creative" class="project-pill">Creative Portfolio</a>
    </nav>
</div>

<!-- Each article gets an id for pill targeting -->
<article id="project-mindsetplay" class="featured-project">
    <!-- existing mind.set.play content -->
</article>

<article id="project-cognitio" class="featured-project">
    <!-- new Cognitio content, same structure as mind.set.play -->
    <div class="featured-project__content">
        <div class="featured-project__text">
            <h3 class="featured-project__title">...</h3>
            <!-- collapsible sections reusing existing pattern -->
        </div>
        <div class="featured-project__image">
            <img src="..." alt="..." class="featured-thumbnail">
        </div>
    </div>
    <!-- Gallery omitted until images are ready -->
</article>
```

**Note:** The section title changes from "Featured Project" (singular) to "Featured Work" to accommodate multiple featured projects.

---

## Accessibility Notes (Scope-Limited)

These are minimal accessibility improvements for the new pill component only. A full accessibility audit is a separate concern.

| Addition | Purpose | Pattern |
|----------|---------|---------|
| `aria-label="Featured projects"` on pill `<nav>` | Screen readers announce navigation purpose | Standard `<nav>` labeling |
| `aria-current="true"` on active pill | Screen readers announce which project is current | Updated by IntersectionObserver JS |
| `min-height: 44px` on pills | Touch target size (WCAG 2.5.8) | Already used on `.btn` class |

---

## Installation

No packages, no build tools, no dependencies to install. All changes are additions to existing CSS and JS files:

1. Add pill CSS to `css/styles.css` (after the Button Components section)
2. Add `scroll-margin-top` to featured project CSS in `css/styles.css`
3. Add `initProjectPillSpy()` function to `js/main.js`
4. Call `initProjectPillSpy()` in the DOMContentLoaded handler
5. Add pill HTML to both `index.html` and `index-en.html`
6. Add `id` attributes to each featured project `<article>`

---

## Confidence Assessment

| Pattern | Confidence | Reason |
|---------|------------|--------|
| Pill navigation (flexbox + border-radius) | HIGH | Uses only CSS properties already in the codebase |
| `scroll-margin-top` | HIGH | Baseline Widely Available since April 2021, verified via MDN |
| `IntersectionObserver` scroll-spy | HIGH | Baseline Widely Available since March 2019, verified via MDN |
| `scroll-behavior: smooth` | HIGH | Already implemented in existing CSS (line 1034) |
| Reuse collapsible pattern | HIGH | Exact copy of proven existing pattern |
| Gallery `:empty` pseudo-class | HIGH | CSS3, universal support |
| `:has()` pseudo-class (if used) | MEDIUM | Baseline since Dec 2023, may miss older browsers |

---

## Sources

- MDN Web Docs: `scroll-margin-top` -- Baseline Widely Available since April 2021
  https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-top
- MDN Web Docs: Intersection Observer API -- Baseline Widely Available since March 2019
  https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- MDN Web Docs: `scroll-behavior` -- Baseline Widely Available since March 2022
  https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior
- MDN Web Docs: `aspect-ratio` -- Baseline Widely Available since September 2021
  https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
- MDN Web Docs: `:has()` -- Baseline Newly Available since December 2023
  https://developer.mozilla.org/en-US/docs/Web/CSS/:has
- Existing codebase analysis: `index.html`, `css/styles.css`, `js/main.js`
