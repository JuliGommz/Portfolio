# Domain Pitfalls

**Domain:** Bilingual single-page portfolio update (adding Cognitio featured project)
**Researched:** 2026-02-20
**Confidence:** HIGH -- derived from direct codebase analysis of all four source files

---

## Critical Pitfalls

Mistakes that cause regressions, visible breakage, or require significant rework.

### Pitfall 1: DE/EN Content Desync

**What goes wrong:** Changes made to `index.html` are not mirrored exactly in `index-en.html`. The two files share zero templating -- they are fully independent 475-line HTML documents that must stay structurally identical. Adding the Cognitio section to one file and forgetting a structural element in the other (a `data-lightbox` attribute, a CSS class, a `<div>` nesting level) creates subtle divergence that may not be caught visually.

**Why it happens:** Human attention degrades on the second pass. The files look "almost the same" so differences in DOM nesting, attribute order, or missing elements pass visual review. An AI assistant may also optimize or restructure one file without realizing the other needs the exact same structural change.

**Consequences:**
- Lightbox gallery breaks on one language version (wrong `data-lightbox` IDs or missing items)
- Collapsible sections don't toggle on one version (missing `.collapsible` or `.collapsible-header` class)
- CSS layout breaks on one version (missing wrapper `<div>` changes grid behavior)
- Navigation anchor `#cognitio` works on DE but 404-scrolls on EN (or vice versa)

**Prevention:**
1. Write the Cognitio section in DE first as the source of truth
2. Create the EN version by translating text only -- copy the entire HTML block, then replace only text nodes
3. After both files are complete, do a structural diff: strip all text content and compare the HTML skeleton
4. Verify both files have identical `data-lightbox` attribute values, identical CSS classes, identical nesting depth

**Detection:** After implementation, open both versions side-by-side at each breakpoint. Click every collapsible, every gallery item, and every navigation link on both. Any behavioral difference = desync.

**Phase mapping:** Must be enforced during the content implementation phase and verified in the testing/QA phase.

---

### Pitfall 2: Collapsible `max-height` Overflow Clipping

**What goes wrong:** The existing collapsible system uses `max-height: 500px` for expanded content (line 822 of CSS: `.collapsible.active .collapsible-content { max-height: 500px; }`). If Cognitio's collapsible sections contain content taller than 500px, the content gets clipped with no scroll, no visual indicator -- it simply cuts off.

**Why it happens:** The `max-height` transition technique requires a fixed value because CSS cannot transition from `max-height: 0` to `max-height: auto`. The existing 500px was sufficient for mind.set.play's short collapsible paragraphs. Cognitio may have longer content, embedded media, or nested elements that exceed this.

**Consequences:**
- Text or images inside collapsible sections are invisibly truncated
- Users see incomplete content with no indication that more exists
- Particularly dangerous on mobile where content is taller due to narrow viewport

**Prevention:**
1. Measure the rendered height of each Cognitio collapsible section before setting `max-height`
2. Use a generous `max-height` value (e.g., `2000px`) or use JavaScript to dynamically set `max-height` to `scrollHeight` on toggle
3. Note: The gallery collapsible already uses `max-height: 3000px` on mobile (line 452) -- this inconsistency between collapsible types is a pre-existing fragility

**Detection:** Expand every collapsible section on desktop and mobile. If the bottom of the content appears to be cut off or has no bottom padding, the `max-height` is too low.

**Phase mapping:** Must be checked during CSS integration phase when adding Cognitio collapsible styles.

---

### Pitfall 3: Lightbox Gallery Scoping Collision

**What goes wrong:** The lightbox initialization in `main.js` (line 194) scopes galleries by their container: `document.querySelectorAll('.gallery-grid, .mini-gallery')`. Each container builds its own `galleryMedia` array. If Cognitio uses the same gallery class names (`.gallery-grid` or `.mini-gallery`), lightbox navigation works correctly within that gallery. But if Cognitio introduces a new gallery container class or nests galleries differently, the lightbox either skips those images entirely or groups them with the wrong gallery's navigation.

**Why it happens:** The lightbox code relies on exact CSS class conventions. A new project section might use a slightly different gallery structure (e.g., wrapping images in a different container, using a custom grid class).

**Consequences:**
- Clicking a Cognitio gallery image does nothing (no lightbox opens)
- Cognitio images get merged into an adjacent project's lightbox navigation (arrow keys cycle through wrong project's images)
- Video items in Cognitio gallery fail to render in lightbox if their structure differs from the existing Vimeo embed pattern

**Prevention:**
1. Use exactly the same gallery markup pattern as existing projects: `.mini-gallery` container with `.gallery-item-mini[data-lightbox="unique-id"]` children
2. Ensure `data-lightbox` values are unique across the entire page (e.g., `cognitio-1`, `cognitio-2`) to avoid ID collisions with existing values
3. If Cognitio needs a different gallery layout, extend the lightbox `querySelectorAll` selector to include the new class
4. Test lightbox arrow navigation to confirm it stays within the Cognitio gallery and does not bleed into mind.set.play or other project galleries

**Detection:** Click each Cognitio gallery image. Verify lightbox opens. Use arrow keys to navigate. Verify you only see Cognitio images, not images from other projects.

**Phase mapping:** Must be verified during the HTML structure phase and retested after JavaScript integration.

---

### Pitfall 4: Anchor-Pill Navigation Breaking Existing Scroll Behavior

**What goes wrong:** The portfolio uses a custom `initSmoothScroll()` function (line 157-183 of JS) that intercepts all `a[href^="#"]` clicks, calculates scroll position accounting for the fixed header height (60px), and uses `window.scrollTo`. Adding an anchor-pill navigation for Cognitio (intra-project section navigation) creates a conflict: the existing smooth scroll handler catches these clicks too, but the scroll offset calculation assumes section-level targets, not sub-section targets within a project card.

**Why it happens:** The `initSmoothScroll` handler uses `document.querySelectorAll('a[href^="#"]')` -- it binds to ALL anchor links, including any new pill-navigation anchors inside Cognitio. The fixed header offset of 60px may be correct for main sections but wrong for in-project navigation where additional context (the project card's own padding, the pill nav bar itself) needs different offset calculations.

**Consequences:**
- Pill navigation clicks scroll to the wrong vertical position (off by 30-80px)
- The scroll lands behind the fixed header, hiding the target content
- If pills use anchor IDs that conflict with existing section IDs (unlikely but possible), navigation breaks globally
- Mobile behavior differs because header height changes with viewport

**Prevention:**
1. Choose unique anchor IDs for Cognitio sub-sections (e.g., `#cognitio-overview`, `#cognitio-process`) that cannot collide with existing IDs (`#hero`, `#about`, `#competencies`, `#featured-work`, `#background`, `#contact`)
2. Either extend `initSmoothScroll` with context-aware offset calculation for pill-nav targets, or implement pill navigation as scroll-within-section rather than page-level anchor scrolling
3. Consider whether pills should scroll the page at all, or just toggle visibility of sub-sections (similar to the existing collapsible pattern)
4. Test the fixed header offset on mobile (where header height may differ from desktop's 60px)

**Detection:** Click each pill navigation item. Verify the target content is fully visible below the fixed header. Test on mobile.

**Phase mapping:** Must be designed in the architecture/planning phase and verified during JavaScript implementation.

---

### Pitfall 5: CSS Specificity Cascade Damage

**What goes wrong:** The existing CSS is 1625 lines with carefully ordered specificity. Adding new CSS for Cognitio (project card styling, pill navigation, new gallery variants) at the wrong position in the cascade or with higher specificity accidentally overrides existing styles. The CSS has no namespace isolation -- all project sections share `.featured-project`, `.project-mini`, `.collapsible`, etc.

**Why it happens:** The CSS uses a flat class-based architecture (no CSS Modules, no BEM strict isolation, no scoped styles). Adding a rule like `.cognitio-section .featured-project__title { font-size: 2.5rem; }` seems targeted but could affect the selector weight for other rules that rely on a specific specificity level.

**Consequences:**
- mind.set.play or other existing project sections change appearance (font sizes, spacing, colors shift)
- Responsive breakpoints behave differently because new media queries interact with existing ones
- The `!important` usage in line 494 (`.project-gallery.collapsible .collapsible-content { max-height: none !important; }`) suggests prior specificity conflicts -- adding more can escalate this pattern

**Prevention:**
1. Add Cognitio-specific CSS in a clearly marked section at the end of `styles.css`, before only the lightbox and contact sections
2. Prefix Cognitio-specific classes with a namespace (e.g., `.cognitio-` prefix) to avoid cascade collisions
3. Match the specificity level of existing rules -- do not introduce deeper nesting or ID selectors
4. After adding CSS, visually inspect ALL existing sections (hero, about, competencies, mind.set.play, mini-projects, background, contact) for any unintended changes
5. Be especially cautious with rules targeting `.featured-project`, `.project-section`, `.collapsible`, `.gallery-item-mini` -- these are shared across all projects

**Detection:** Before and after screenshots of every section at 3 breakpoints (mobile 375px, tablet 768px, desktop 1280px). Any pixel difference outside the Cognitio section = cascade damage.

**Phase mapping:** Must be enforced throughout CSS implementation and verified in QA.

---

## Moderate Pitfalls

### Pitfall 6: Mobile Responsiveness Regression in Project Grid

**What goes wrong:** The existing `.project-mini` cards use a `grid-template-columns: 200px 1fr` layout (line 834) that collapses to `grid-template-columns: 1fr` below 768px. The `p:first-of-type` and `p:nth-of-type()` selectors use explicit grid-column placements (lines 879-901). If Cognitio's project cards have a different number of `<p>` elements or a different content structure, these nth-child grid placements break the layout.

**Why it happens:** The CSS uses structural pseudo-selectors (`p:first-of-type`, `p:nth-of-type(2)`, `p:nth-of-type(3)`) for grid placement. These are brittle -- they depend on the exact number and order of `<p>` elements in the HTML.

**Consequences:**
- Cognitio project description paragraphs overlap with the thumbnail on desktop
- Text wraps incorrectly on mobile if grid-column assignments don't match the actual content structure
- Inconsistent spacing between paragraphs compared to existing projects

**Prevention:**
1. Match the exact HTML structure of existing `.project-mini` cards: title, thumbnail, 3 paragraphs, gallery title, gallery grid
2. If Cognitio needs more or fewer paragraphs, override the `nth-of-type` grid placements specifically for the Cognitio card
3. Test the grid layout at exactly 769px (breakpoint boundary) where the layout switches

**Detection:** Resize browser slowly from 320px to 1400px. Watch for content overlap, unexpected gaps, or thumbnail misalignment.

**Phase mapping:** HTML structure phase (match existing patterns) and CSS testing phase.

---

### Pitfall 7: Cache-Busting Version String Neglect

**What goes wrong:** Both HTML files reference the CSS with a version query string: `css/styles.css?v=20260118b` (line 33 in both files). If this version string is not updated after CSS changes, returning visitors see the old cached stylesheet -- the new Cognitio section renders with broken or missing styles.

**Why it happens:** The cache-busting is manual (no build system, no hash-based versioning). It is easy to modify `styles.css` and forget to update the `?v=` parameter in BOTH HTML files.

**Consequences:**
- Returning visitors see unstyled Cognitio content (raw HTML with no project card styling)
- Different versions cached in DE vs EN if only one file's query string was updated
- Difficult to debug because the developer's own browser may have been cleared during development

**Prevention:**
1. Update the `?v=` string in BOTH `index.html` AND `index-en.html` as the final step before deployment
2. Use a date-based version (e.g., `?v=20260220`) to make it easy to verify currency
3. After deployment, test in an incognito/private window to simulate a returning visitor with old cache

**Detection:** Open site in incognito window after deployment. If Cognitio section looks unstyled, the cache string was not updated.

**Phase mapping:** Deployment/final QA phase.

---

### Pitfall 8: Vimeo Embed Aspect Ratio Mismatch

**What goes wrong:** Existing Vimeo embeds use inline `padding` values for aspect ratio (e.g., `padding:58.45% 0 0 0` for Journey, `padding:56.25% 0 0 0` for others). If Cognitio videos have a different aspect ratio and the wrong padding value is used, the video either has black bars or gets cropped in the lightbox view.

**Why it happens:** The responsive embed technique (padding-based aspect ratio) requires knowing the exact aspect ratio of each video. 56.25% = 16:9, 58.45% = approximately 1.71:1. Using the wrong value is a silent error -- the container renders but the video doesn't fit correctly.

**Consequences:**
- Black bars above/below or left/right of video in gallery thumbnails
- In lightbox, video is either cropped or shows extra space (the lightbox `createLightboxVimeo` function hardcodes 16:9 ratio at line 303)
- Visual inconsistency between Cognitio and existing project galleries

**Prevention:**
1. Check each Cognitio Vimeo video's actual aspect ratio before embedding
2. For 16:9 videos, use `padding:56.25% 0 0 0`
3. If videos have non-standard ratios, be aware the lightbox will still render them at 16:9 (the lightbox code at line 303 hardcodes `width / (16/9)`)
4. Consider whether the lightbox needs to be updated to detect non-16:9 ratios

**Detection:** Compare video thumbnail appearance in the gallery grid with the same video in lightbox. If proportions differ, there's a mismatch.

**Phase mapping:** Media integration phase.

---

### Pitfall 9: Navigation Menu Overflow on Narrow Tablets

**What goes wrong:** The desktop nav menu (line 50-59 in HTML) currently has 6 items: "Was ich mache", "Kompetenzen", "Projekte", "Hintergrund", "Kontakt", "EN". Adding a new navigation item for Cognitio (e.g., a direct link or renaming "Projekte" with sub-items) pushes the horizontal nav past its container on tablet widths (768px-1024px) where the desktop menu is shown but space is tight.

**Why it happens:** The nav menu switches from mobile hamburger to horizontal flex at 768px (line 1094). At exactly 768px, six items with `gap: var(--space-6)` (1.5rem = 24px) already consume most available width. Adding a seventh item overflows.

**Consequences:**
- Nav items wrap to a second line, breaking the single-row header design
- Text overlaps the language toggle button
- On some tablet widths, the last nav item disappears behind the viewport edge

**Prevention:**
1. Do NOT add a new top-level nav item. The existing "Projekte" / "Projects" anchor already scrolls to `#featured-work` which will contain Cognitio
2. If anchor-pill navigation is added within the Cognitio section, it should be a sub-navigation inside the project section, not in the global header
3. If the nav must change, test at exactly 768px, 800px, 900px, and 1024px widths

**Detection:** Resize browser to 768px width. Check if all nav items fit in a single row without wrapping or overflow.

**Phase mapping:** Architecture/planning phase (decide navigation approach early).

---

### Pitfall 10: `body.style.overflow = 'hidden'` Scroll Position Jump

**What goes wrong:** The lightbox (line 365) sets `document.body.style.overflow = 'hidden'` when opened and removes it when closed (line 382). If Cognitio adds another overlay or modal (e.g., an interactive demo, a larger image viewer, or a detailed process diagram popup), a second `overflow: hidden` toggle can conflict, causing the page to jump to the top when the overlay closes.

**Why it happens:** `overflow: hidden` on body with `position: static` causes some browsers to reset scroll position. The existing lightbox handles this correctly because it's the only overlay. A second overlay that also manipulates `body.overflow` can leave the body in a broken state if one overlay closes before the other.

**Consequences:**
- User scrolls to Cognitio section, opens a lightbox, closes it, and the page jumps to the top
- If two overlays conflict, the scroll is permanently locked (`overflow: hidden` never gets cleared)

**Prevention:**
1. Use the existing lightbox system for ALL media viewing -- do not create a second overlay mechanism
2. If additional overlays are needed, implement a shared overlay manager that tracks open/close state to avoid conflicting `overflow` manipulations
3. The `state.isLightboxOpen` flag (line 57) provides a pattern to follow

**Detection:** Open lightbox from Cognitio gallery, close it, verify scroll position is preserved. Repeat at different scroll positions.

**Phase mapping:** JavaScript implementation phase.

---

## Minor Pitfalls

### Pitfall 11: Image Path Case Sensitivity

**What goes wrong:** Existing image paths mix cases: `mindsetplay-1.webp` (lowercase) vs `Journey-1.webp` (capitalized) vs `Chest-2.webp` (capitalized) vs `Tango-1.webp` (capitalized). On case-sensitive servers (Linux), a mismatch between filename case and HTML `src` attribute causes broken images. The local XAMPP (Windows) environment is case-insensitive, so this bug is invisible during development.

**Why it happens:** Windows filesystem is case-insensitive. The developer saves an image as `Cognitio-1.webp` but references it as `cognitio-1.webp` in HTML. Works locally, breaks on deployment.

**Prevention:**
1. Decide on a naming convention: all lowercase with hyphens (e.g., `cognitio-1.webp`)
2. Verify the actual filename on disk matches the HTML `src` attribute exactly, including case
3. After deployment, check the browser network tab for any 404 image errors

**Detection:** Open browser DevTools Network tab filtered to images. Any red 404 entries = case mismatch.

**Phase mapping:** Media preparation phase and deployment verification.

---

### Pitfall 12: `loading="lazy"` on Above-the-Fold Cognitio Content

**What goes wrong:** All existing gallery images use `loading="lazy"` (e.g., line 231). If Cognitio is positioned as the first featured project (above mind.set.play), its thumbnail and first visible images should NOT use lazy loading because they are visible on initial viewport or near it.

**Why it happens:** Copy-pasting from existing project blocks brings `loading="lazy"` along. It's correct for images below the fold but causes a visible flash or delayed render for above-the-fold images.

**Prevention:**
1. If Cognitio appears high on the page, omit `loading="lazy"` from its primary thumbnail
2. Keep `loading="lazy"` on gallery images that require user interaction (expanding collapsibles) to become visible

**Detection:** Load the page with DevTools Network tab open, throttled to "Fast 3G". Watch if the Cognitio thumbnail appears with a delay compared to the page text.

**Phase mapping:** HTML implementation phase.

---

### Pitfall 13: Forgetting Accessibility Attributes

**What goes wrong:** Existing lightbox buttons have `aria-label` attributes (lines 459-464). Existing nav toggle has `aria-label`. New Cognitio interactive elements (pill navigation buttons, collapsible headers, gallery items) may be added without these accessibility attributes.

**Prevention:**
1. Every `<button>` and interactive `<a>` must have either visible text content or an `aria-label`
2. Collapsible headers should indicate expanded/collapsed state (consider `aria-expanded`)
3. Gallery images must have meaningful `alt` text, not empty strings

**Detection:** Run the page through a basic accessibility checker (browser DevTools Lighthouse) and verify no new accessibility warnings appear after the Cognitio addition.

**Phase mapping:** HTML implementation and QA phases.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Planning/Architecture | Anchor-pill nav conflicting with existing smooth scroll (Pitfall 4) | Design pill nav approach before implementation -- decide scroll vs. toggle |
| Planning/Architecture | Nav menu overflow on tablets (Pitfall 9) | Do not add global nav items; keep Cognitio navigation inside project section |
| HTML Structure | DE/EN desync (Pitfall 1) | Write DE first, copy structure for EN, diff the HTML skeletons |
| HTML Structure | Project-mini nth-child grid breakage (Pitfall 6) | Match existing paragraph count and structure exactly |
| HTML Structure | Missing lazy-load awareness (Pitfall 12) | Check if Cognitio is above-the-fold and adjust accordingly |
| CSS Integration | Specificity cascade damage (Pitfall 5) | Namespace Cognitio styles, test ALL sections after CSS changes |
| CSS Integration | Collapsible max-height clipping (Pitfall 2) | Test expanded content height, increase max-height if needed |
| JavaScript | Lightbox gallery scoping (Pitfall 3) | Reuse exact gallery class patterns and unique data-lightbox IDs |
| JavaScript | Scroll behavior conflicts (Pitfall 4) | Unique anchor IDs, context-aware offset or toggle-based pills |
| JavaScript | Overlay scroll lock conflicts (Pitfall 10) | Use existing lightbox system, do not create second overlay |
| Media Assets | Vimeo aspect ratio mismatch (Pitfall 8) | Check each video's actual ratio, match padding value |
| Media Assets | Image filename case sensitivity (Pitfall 11) | Lowercase naming convention, verify case match |
| Deployment/QA | Cache-busting neglect (Pitfall 7) | Update ?v= in BOTH HTML files before deploy |
| Deployment/QA | Accessibility regression (Pitfall 13) | Lighthouse audit after implementation |

---

## Pre-Implementation Checklist (Summary)

Before writing any code for the Cognitio update, verify:

- [ ] Cognitio section position decided (before or after mind.set.play)
- [ ] Pill navigation approach decided (scroll-based vs. toggle-based)
- [ ] No new global nav items planned (keep within project section)
- [ ] Image naming convention agreed (all lowercase with hyphens)
- [ ] Vimeo video aspect ratios checked
- [ ] Collapsible content length estimated (will it exceed 500px?)

## Sources

- Direct analysis of `C:/xampp/htdocs/webspace/portfolio/index.html` (475 lines)
- Direct analysis of `C:/xampp/htdocs/webspace/portfolio/index-en.html` (475 lines)
- Direct analysis of `C:/xampp/htdocs/webspace/portfolio/css/styles.css` (1625 lines)
- Direct analysis of `C:/xampp/htdocs/webspace/portfolio/js/main.js` (559 lines)
- All pitfalls derived from actual code patterns, not hypothetical scenarios
