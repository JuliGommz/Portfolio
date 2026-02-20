# Project Research Summary

**Project:** Portfolio — Cognitio Featured Project Addition with Anchor-Pill Navigation
**Domain:** Static bilingual single-page portfolio (vanilla HTML/CSS/JS)
**Researched:** 2026-02-20
**Confidence:** HIGH

## Executive Summary

This project adds a second featured project (Cognitio, a Unity/C# decision framework) to an existing polished portfolio, alongside anchor-pill navigation linking all featured work. The portfolio is a mature, well-structured vanilla stack with no build tools, no frameworks, and a clean CSS-variable-based design system. The correct approach is strict extension without restructuring: every new component inherits the existing class architecture, and only the IntersectionObserver scroll-spy (~30 lines of JS) and pill navigation styles (~40 lines of CSS) represent genuinely new code. Everything else — collapsibles, lightbox, smooth scroll, responsive grid — already exists and auto-applies to new content by virtue of shared class names.

The recommended implementation order is HTML structure first (IDs on existing articles, Cognitio article clone, pill nav HTML), then CSS additions, then JS addition, then content and media fill-in. This order is dependency-driven: CSS and JS cannot be tested without HTML targets, and content is the lowest-risk layer that can be swapped in last. The bilingual constraint (two structurally-identical HTML files, text-only difference) is the single most demanding discipline requirement of the project — every structural change must be applied identically to both `index.html` and `index-en.html`.

The two primary risks are DE/EN content desync (invisible during local development on Windows, catastrophic on case-sensitive Linux servers) and CSS cascade interference (the 1625-line flat stylesheet has no namespace isolation). Both are preventable with discipline: write DE first as the source of truth, copy structure to EN before filling text, and add all new CSS in a clearly marked namespaced block at the end of `styles.css`. No framework, library, or architectural change is warranted for this update.

---

## Key Findings

### Recommended Stack

The existing stack handles everything this update requires. No new dependencies are needed. The full technology set is: HTML5 (semantic markup, bilingual dual-file), CSS3 with custom properties (already defines `--radius-full`, `--space-*`, `--transition-base`, `--accent-primary`), and Vanilla JS (ES6+, `IntersectionObserver`, `querySelectorAll`). The two patterns being added — anchor-pill navigation and scroll-spy active state — are both achievable in under 80 lines of combined new code using web-standard APIs that have been Baseline Widely Available since 2019 and 2021 respectively.

**Core technologies:**
- HTML5 (dual-file bilingual): Structural markup — reuse existing article pattern exactly
- CSS3 custom properties: Pill styling and scroll offset — all new rules use existing `:root` variables
- `IntersectionObserver` API: Scroll-spy active pill state — Baseline since March 2019, no polyfill needed
- `scroll-margin-top`: Fixed-header scroll offset — Baseline since April 2021, complements existing JS smooth scroll
- Flexbox with `flex-wrap`: Pill row layout — already used throughout the codebase
- WebP images: Cognitio thumbnail — consistent with all existing project images

**What NOT to add:** Any CSS framework, JS library (GSAP, Alpine, Swiper), `scroll-snap-type`, `<details>/<summary>` elements, sticky sub-navigation, or View Transitions API. Each would either create a second conflicting pattern or add dependency weight for a problem already solvable with existing code.

### Expected Features

The research distinguishes clearly between what the section needs to feel complete versus what adds competitive differentiation versus what should be deferred.

**Must have (table stakes):**
- Cognitio article with identical structure to mind.set.play — two-column grid, collapsible detail sections, thumbnail area
- Section title change from "Featured Project" to "Featured Work" — frames multiple projects
- A thumbnail image for Cognitio — even an architecture diagram; an empty image area kills credibility
- Anchor-pill navigation — with two featured projects plus training cluster, users need a jump mechanism

**Should have (high value, low effort):**
- Tech tags on both projects (Unity, C#, OOP, Behavioral Psychology) — low CSS effort, aids recruiter scanning
- GitHub CTA for Cognitio — trivial once repo URL is known; code is the deliverable

**Defer (v2+):**
- Gallery section for Cognitio — only when visual assets exist; empty gallery is worse than no gallery
- Interactive code demos or embedded Unity player — massive complexity for marginal portfolio value
- Cross-reference narrative copy between projects — content refinement, not structural
- Testimonial for Cognitio — solo in-progress project has no external quotes yet

**Deliberate omissions vs. mind.set.play:** No 4-image lightbox gallery (no assets), no testimonial blockquote (no external validation), "What's Built So Far" replaces "Result" collapsible (project is in-progress, not shipped).

### Architecture Approach

The architecture follows a single governing principle: extend, do not restructure. The existing codebase has three JavaScript init functions that auto-apply to all matching elements on `DOMContentLoaded` — `initCollapsible()`, `initLightbox()`, and `initSmoothScroll()`. The Cognitio article requires zero new JS because it uses the same class names, and the init functions pick it up automatically. The only genuinely new component is `initProjectPills()`, a ~30-line IntersectionObserver function that tracks which featured project is in the viewport and applies `.project-pill--active` to the matching pill link.

**Major components:**
1. Anchor-pill nav (`<nav class="project-pills">`) — new HTML/CSS/JS; ~80 lines total; independent component with zero impact on existing code
2. Cognitio article (`<article id="project-cognitio" class="featured-project">`) — new HTML only; inherits all existing CSS/JS; structural clone of mind.set.play
3. Article ID attributes (`id="project-mindsetplay"`, `id="project-cognitio"`, `id="project-training"`) — additive modification; 3 attribute additions across 2 files
4. Section header text update — 1 text node change per file; "Featured Work" instead of "Featured Project"

**File change scope:** ~120 lines new HTML per file, ~40 lines new CSS, ~30 lines new JS. Existing code touched: approximately 5 lines (3 ID additions, 1 heading text, 1 init call).

### Critical Pitfalls

1. **DE/EN content desync** — Write DE as source of truth, copy full HTML block to EN, replace only text nodes. After both files complete, diff the HTML skeletons with text stripped. Any structural difference = desync bug that will silently break on one language version.

2. **CSS cascade interference** — Add all new CSS in a named block at the end of `styles.css`, before only lightbox and contact sections. Namespace Cognitio-specific overrides with a prefix. After any CSS addition, visually inspect ALL existing sections at three breakpoints (375px, 768px, 1280px) for unintended changes.

3. **Collapsible `max-height` clipping** — The existing system uses `max-height: 500px` for expanded content. Cognitio collapsibles with longer text or nested elements get silently truncated. Test expanded height on desktop and mobile; increase to `2000px` or use JS `scrollHeight` measurement if content is tall.

4. **Anchor-pill scroll offset conflict** — The existing `initSmoothScroll()` intercepts all `a[href^="#"]` clicks. Pill links will be caught by this handler. Use `scroll-margin-top` on each article element to ensure native anchor navigation also respects the fixed header. Give all article IDs unique names that cannot collide with existing section IDs (`#hero`, `#about`, `#competencies`, `#featured-work`, `#background`, `#contact`).

5. **Cache-busting version string neglect** — Both HTML files reference `css/styles.css?v=20260118b`. Update this string in BOTH files before deployment. Use date-based versioning (e.g., `?v=20260220`). Test in incognito window after deployment.

---

## Implications for Roadmap

Based on research, the dependency order is unambiguous. HTML must come before CSS (no targets to style), CSS before JS (active class needs styles before observer applies them), and content/media last (lowest risk, can be iterated without structural impact). The bilingual sync discipline is a cross-cutting concern enforced at every HTML phase.

### Phase 1: HTML Foundation

**Rationale:** Every subsequent change depends on HTML targets existing. This phase is purely additive with zero risk to existing functionality.
**Delivers:** Article IDs on all three featured projects, Cognitio article placeholder, pill nav HTML (unstyled), section heading update in both language files.
**Addresses:** Table-stakes requirement for Cognitio article structure; prerequisite for anchor-pill navigation.
**Avoids:** DE/EN desync (Pitfall 1) by enforcing dual-file sync from the first change.

Sub-steps in dependency order:
1. Add `id` attributes to existing mind.set.play and training articles (both files)
2. Change h2 text to "Featured Work" (both files)
3. Add Cognitio article HTML with placeholder content (both files)
4. Add `<nav class="project-pills">` HTML (both files)

### Phase 2: CSS Additions

**Rationale:** Pill navigation needs visual treatment before the JS active state is meaningful. No existing CSS is modified — only new rules appended.
**Delivers:** Styled pill navigation (inactive, hover, active states), `scroll-margin-top` on all featured project articles.
**Uses:** Existing CSS variables exclusively (`--radius-full`, `--space-*`, `--accent-primary`, `--bg-secondary`, `--transition-base`).
**Avoids:** CSS cascade interference (Pitfall 5) by adding all new rules in a named section at the end of `styles.css`.

### Phase 3: JavaScript Addition

**Rationale:** `initProjectPills()` is the only genuinely new behavior. It depends on both article IDs (Phase 1) and active pill CSS (Phase 2) being in place.
**Delivers:** Scroll-spy IntersectionObserver that highlights the correct pill as user scrolls between featured projects; `aria-current` attribute updates for accessibility.
**Implements:** New `initProjectPills()` function following existing init-function pattern; added to `DOMContentLoaded` handler as one-line call.
**Avoids:** Double-init bugs (Pitfall: JS re-initialization anti-pattern) by not touching existing init functions.

### Phase 4: Content and Media

**Rationale:** Structure and behavior are the architectural risks; content is fill-in with no structural impact. This phase can be iterated without touching code.
**Delivers:** Cognitio project copy (DE and EN), thumbnail image (architecture diagram as WebP), optional GitHub CTA, optional tech tags.
**Avoids:** Image case-sensitivity bugs (Pitfall 11) by using all-lowercase filenames; `loading="lazy"` correctly applied only to below-fold images (Pitfall 12).

### Phase 5: QA and Deployment

**Rationale:** The bilingual and multi-breakpoint nature of the site requires explicit verification before deployment.
**Delivers:** Verified cross-browser behavior, both language versions structurally confirmed, cache-busting strings updated.
**Avoids:** Cache-busting neglect (Pitfall 7), accessibility regression (Pitfall 13), lightbox scoping collision (Pitfall 3), DE/EN desync final verification (Pitfall 1).

### Phase Ordering Rationale

- HTML before CSS before JS is a hard technical dependency; the research confirms this is also the lowest-risk order because each phase adds behavior without modifying previous phases.
- Content and media are separated from structure because the Cognitio section should be review-ready structurally before content is finalized — this allows parallel work (code complete, content being written).
- QA is a distinct phase because the bilingual constraint and multi-breakpoint responsive behavior require systematic verification, not just "looks good to me."
- The architecture research specifically identifies a "dual-file sync" as the highest-discipline requirement; it must be enforced at Phase 1 and verified at Phase 5.

### Research Flags

Phases with standard patterns (no additional research needed):
- **Phase 1 (HTML Foundation):** HTML structure is fully documented in the codebase. Clone pattern is explicit.
- **Phase 2 (CSS Additions):** All CSS variables exist. Pill styling is standard flexbox + border-radius. No research needed.
- **Phase 3 (JS Addition):** IntersectionObserver pattern is fully specified in STACK.md. No research needed.
- **Phase 4 (Content/Media):** Thumbnail creation (architecture diagram) is the one open item; SVG or WebP, content is known.
- **Phase 5 (QA):** Checklist-driven. No research needed.

No phase requires a `/gsd:research-phase` call. All patterns are well-documented in the research files with code examples.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All patterns verified against MDN Baseline data. No library decisions needed. Entire stack pre-exists. |
| Features | HIGH | Based on direct codebase analysis + established portfolio UX conventions. Feature set is small and well-scoped. |
| Architecture | HIGH | Based on direct code analysis of all 4 source files (index.html 475 lines, index-en.html 475 lines, styles.css 1625 lines, main.js 559 lines). Exact line numbers cited. |
| Pitfalls | HIGH | All 13 pitfalls derived from actual code patterns found in the codebase, not hypothetical scenarios. |

**Overall confidence:** HIGH

### Gaps to Address

- **Cognitio thumbnail image:** No visual asset exists yet. An architecture diagram is recommended as the thumbnail. This needs to be created before Phase 4 can complete. The section structure works without it (use placeholder `src` during development), but no image = no professional-grade entry.
- **GitHub repo URL for CTA:** The "View Repository" CTA (a differentiator feature) requires the actual Cognitio GitHub URL. If it does not yet exist or is private, the CTA should be omitted rather than linked to nothing.
- **Cognitio collapsible content length:** The `max-height: 500px` clipping risk (Pitfall 2) cannot be fully assessed until actual copy is written. If collapsible content exceeds 500px on mobile, the CSS value must be increased. Flag this for verification during Phase 4.
- **`:has()` CSS pseudo-class usage:** STACK.md rates this MEDIUM confidence (Baseline Dec 2023, may miss older Android WebView). The recommended approach (Option A: omit empty gallery markup entirely) avoids this gap entirely. No action needed unless an empty-state gallery is desired.

---

## Sources

### Primary (HIGH confidence — direct codebase analysis)
- `C:/xampp/htdocs/webspace/portfolio/index.html` (475 lines) — existing featured project structure, nav HTML, anchor IDs
- `C:/xampp/htdocs/webspace/portfolio/index-en.html` (475 lines) — bilingual mirror, structural validation
- `C:/xampp/htdocs/webspace/portfolio/css/styles.css` (1625 lines) — design tokens, collapsible system, responsive breakpoints, specificity patterns
- `C:/xampp/htdocs/webspace/portfolio/js/main.js` (559 lines) — init chain, lightbox scoping, smooth scroll, state object

### Primary (HIGH confidence — official web standards)
- MDN Web Docs: `scroll-margin-top` — Baseline Widely Available since April 2021
- MDN Web Docs: Intersection Observer API — Baseline Widely Available since March 2019
- MDN Web Docs: `scroll-behavior` — Baseline Widely Available since March 2022
- MDN Web Docs: `aspect-ratio` — Baseline Widely Available since September 2021

### Secondary (MEDIUM confidence)
- MDN Web Docs: `:has()` pseudo-class — Baseline Newly Available since December 2023 (newer, broader browser coverage still maturing)

---

*Research completed: 2026-02-20*
*Ready for roadmap: yes*
