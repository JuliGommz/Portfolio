# Feature Landscape: Portfolio Featured Project Showcase

**Domain:** Portfolio project section for Learning Experience Designer & Creative Producer
**Researched:** 2026-02-20
**Overall Confidence:** HIGH (based on analysis of existing codebase + established portfolio UX patterns)

---

## Table Stakes

Features users (recruiters, hiring managers, collaborators) expect. Missing = project section feels incomplete or amateur.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Project title + metadata line** | Instant context: what, when, role, tech | Low | Already exists (`.featured-project__title` + `.project-meta-inline`). Cognitio needs: "Cognitio \| Unity/C# Decision Framework \| Solo \| 2025-2026" |
| **Short intro paragraph** | Visitors skim; need a 2-3 sentence hook before details | Low | Already exists (`.featured-project__description`). For Cognitio: systems-design-meets-psychology angle |
| **Collapsible detail sections** | Respects scanning behavior; details on demand, not forced | Low | Already built (`.project-section.collapsible`). Cognitio uses: Design Challenge / My Approach / What's Built So Far |
| **Visual thumbnail** | Portfolio without visuals feels hollow, even for code projects | Medium | Cognitio has no visual assets yet. Needs a placeholder strategy -- see "Architecture diagram as hero image" in Differentiators |
| **Two-column layout (text + sticky image)** | Established pattern from mind.set.play; consistency across featured projects | Low | CSS already exists (`.featured-project__content` grid). Reuse directly |
| **Responsive behavior** | Non-negotiable. Must work on mobile | Low | Already handled by existing grid breakpoints. Just reuse the `.featured-project` class |
| **Consistent visual hierarchy** | Second featured project must feel like a sibling of the first, not an afterthought | Low | Use identical HTML structure as mind.set.play. Same class names, same patterns |
| **Descriptive text in collapsibles** | The "case study" content: what problem, what approach, what result/status | Medium | Content writing effort. Structure exists; copy needs crafting for systems-design narrative |

---

## Differentiators

Features that set this portfolio apart. Not expected, but create competitive advantage for Julian's specific positioning.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Anchor-pill navigation** | Quick-jump between featured projects within the section. Recruiter with 30 seconds can jump directly to what interests them | Medium | Needs new HTML + CSS. Horizontal pill bar at top of `#featured-work` section. Pills: "mind.set.play" / "Cognitio" / "Training Projects". Sticky or fixed within section |
| **Architecture/systems diagram as thumbnail** | Turns a "no visual assets" weakness into a strength. A clean trait-system architecture diagram signals systems thinking -- exactly the skill being showcased | Medium | Create a simple SVG or designed diagram showing Cognitio's trait architecture. This IS the visual. It doubles as proof of the design thinking claim |
| **"What's Built So Far" as living-project indicator** | Most portfolios show finished work. Showing active development signals growth mindset and ongoing capability | Low | Just content framing in the third collapsible. No special tech needed. But the framing choice itself differentiates |
| **Tech tags / skill badges on projects** | Inline tags (Unity, C#, OOP, Behavioral Psychology) connect project to skills section, reinforce keyword matching for ATS/recruiter scanning | Low | Small pill/badge elements within or below the project title. Pure CSS, no JS needed |
| **GitHub repo link as CTA** | For Cognitio specifically, the code IS the deliverable. "View Repository" CTA shows the actual work, not just a marketing page | Low | Same pattern as mind.set.play's VORSPRUNGatwork CTA (`.project-cta-group`). Different label, same structure |
| **Cross-reference between projects** | Subtle narrative thread: "mind.set.play showed game design for culture change; Cognitio shows the underlying systems thinking." Connects portfolio pieces into a coherent professional story | Low | One sentence in Cognitio's intro or approach section. No special component needed -- just intentional copy |
| **Narrative arc across the section** | Section title evolution: from "Featured Project" (singular) to "Featured Work" (already the section ID) with sub-navigation implies breadth and depth | Low | Change `<h2>` text from "Featured Project" to "Featured Work". Already the section ID |

---

## Anti-Features

Features to explicitly NOT build for this update. Scope discipline.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Interactive code demos / embedded Unity player** | Massive complexity for marginal portfolio value. Cognitio is a framework, not a visual game. An embedded player adds nothing a GitHub link doesn't | Link to GitHub repo. If a demo video is created later, add it to gallery |
| **Separate dedicated project pages** | Over-engineering for a 2-featured-project portfolio. Forces navigation away from the single-page flow that works | Keep everything on the single page. Collapsible sections already handle depth |
| **Filterable project grid / tag-based filtering** | Premature. With 2 featured projects and 4 minis, there's nothing to filter. Adds JS complexity for zero UX value at this scale | Anchor-pill navigation solves the "find what you want" problem at this scale |
| **Progress bars / completion percentages** | Gimmicky. "70% complete" means nothing to a recruiter and cheapens the presentation | Use the "What's Built So Far" narrative collapsible instead. Words > percentages |
| **Animated page transitions between projects** | Adds JS weight, accessibility concerns, and distraction. The portfolio's calm, professional tone is a strength | Keep smooth scroll behavior. CSS transitions on hover are sufficient |
| **Comment system / feedback forms per project** | Portfolio is a showcase, not a forum. Contact section already exists | Keep the existing contact CTA at bottom |
| **Video walkthrough / screen recordings** | No visual assets exist yet. Don't delay the launch waiting for content that may never come | Design the section to work without media gallery. Add gallery later as an enhancement if assets become available |
| **Complex lightbox gallery for Cognitio** | No images to show. Building an empty gallery container is worse than having no gallery | Omit gallery section entirely for Cognitio. The architecture diagram thumbnail is sufficient visual content. Gallery can be added later |
| **Testimonial section for Cognitio** | No testimonial exists for a solo in-progress project | Omit testimonial wrapper. Unlike mind.set.play, this project doesn't have external validation yet |

---

## Feature Dependencies

```
Anchor-pill navigation  -->  Section ID anchors on each featured project (already exist for mind.set.play)
                        -->  New section ID anchor for Cognitio article element
                        -->  Section title change ("Featured Project" -> "Featured Work")

Cognitio article        -->  Follows identical HTML structure as mind.set.play article
                        -->  Reuses all existing CSS classes
                        -->  Needs thumbnail asset (architecture diagram)

Architecture diagram    -->  Content understanding of Cognitio's trait system
thumbnail               -->  Created as image asset (SVG preferred, WebP acceptable)
                        -->  Referenced in .featured-project__image

Tech tags               -->  New CSS class (.tech-tag or .skill-badge)
                        -->  Can be added to both projects for consistency
                        -->  No JS dependency

GitHub CTA              -->  Reuses existing .project-cta-group + .btn--secondary
                        -->  Needs actual GitHub repo URL

Collapsible content     -->  Reuses existing collapsible JS (already in main.js)
                        -->  Just needs correct HTML class names
```

### Dependency order (implementation sequence):

1. Section title text change (trivial, enables framing)
2. Cognitio HTML article (core deliverable, uses existing CSS/JS)
3. Architecture diagram thumbnail (can use placeholder initially)
4. Tech tags CSS + HTML additions (small enhancement, both projects)
5. Anchor-pill navigation (new component, references both projects)
6. GitHub CTA (needs repo URL, otherwise trivial)

---

## MVP Recommendation

### Must ship (the update feels incomplete without these):

1. **Cognitio article with identical structure to mind.set.play** -- collapsible sections, two-column layout, thumbnail area. This is the entire point of the update.
2. **Section title change to "Featured Work"** -- one word change that frames two projects instead of one.
3. **A thumbnail image for Cognitio** -- even a placeholder diagram. An empty image area kills credibility.
4. **Anchor-pill navigation** -- with two featured projects plus a training projects cluster, users need a way to jump. This is the navigation feature that ties the section together.

### Ship if time allows (high value, low effort):

5. **Tech tags on both projects** -- reinforces skills, aids scanning, low effort.
6. **GitHub CTA for Cognitio** -- trivial if repo exists.

### Defer (nice but not blocking):

7. **Gallery for Cognitio** -- only when visual assets exist. Do not build an empty gallery.
8. **Cross-reference copy between projects** -- content refinement, not structural.

---

## Existing Patterns to Preserve

The current portfolio has strong established patterns. Cognitio must respect them:

| Pattern | Where It Exists | How Cognitio Uses It |
|---------|----------------|---------------------|
| `.featured-project` card with elevated bg + hover lift | mind.set.play | Identical `<article class="featured-project">` wrapper |
| Two-column grid (2fr text / 1fr sticky image) | mind.set.play | Same `.featured-project__content` grid |
| `.collapsible-header` + `.collapsible-content` toggle | mind.set.play + galleries | Same pattern, different section titles |
| `.project-meta-inline` for type/year metadata | All projects | Same span pattern after title |
| `.game-name` span for project name styling | mind.set.play | Reuse for "Cognitio" |
| `.project-cta-group` with `.btn--secondary` | mind.set.play (VORSPRUNGatwork link) | Same structure for GitHub link |
| Lazy loading on images (`loading="lazy"`) | All gallery images | Apply to Cognitio thumbnail |
| WebP image format | All current images | Cognitio thumbnail should be WebP |

---

## What Cognitio's Section Should NOT Have (compared to mind.set.play)

These are deliberate omissions, not missing features:

| mind.set.play Has | Cognitio Omits | Reason |
|-------------------|----------------|--------|
| 4-image gallery with lightbox | No gallery | No visual assets. Add later when available |
| Testimonial blockquote | No testimonial | Solo project, no external quotes |
| External product CTA (VORSPRUNGatwork) | GitHub repo CTA instead | Code IS the product |
| "Result" collapsible | "What's Built So Far" instead | Project is in-progress, not shipped |

These omissions actually strengthen the narrative: Cognitio is a different kind of project (systems/code vs. physical game), and the section structure should reflect that honestly.

---

## Sources

- **PRIMARY:** Direct analysis of existing portfolio codebase (`index-en.html`, `css/styles.css`, `js/main.js`)
- **DOMAIN KNOWLEDGE:** Portfolio UX patterns from established design/development community practices (HIGH confidence -- these are well-established conventions, not trending opinions)
- **Note:** WebSearch was unavailable. All recommendations are based on codebase analysis + established UX knowledge. Confidence remains HIGH because portfolio showcase patterns are mature and well-documented in the field.
