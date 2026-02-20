# Portfolio Update: Cognitio Featured Project

## What This Is

An update to Julian's existing web portfolio (juliangomez.de) to integrate Cognitio — a trait-based decision framework for personality-driven game characters — as a new featured project. The update adds Cognitio alongside mind.set.play at equal prominence, with anchor-pill navigation for quick-jumping between featured projects, while preserving the existing layout, narrative flow, and design language.

## Core Value

Seamlessly integrate Cognitio into the portfolio without breaking the existing layout or narrative — the new content must feel like it was always part of the site.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. -->

- [ ] Cognitio featured project section (full depth, matching mind.set.play format)
- [ ] Design-focused collapsible sections: The Design Challenge / My Approach / What's Built So Far
- [ ] Anchor-pill navigation at top of Featured Work section for quick-jumping between projects
- [ ] mind.set.play remains first on scroll, Cognitio second — both at equal visual weight
- [ ] Both German (index.html) and English (index-en.html) versions updated simultaneously
- [ ] Text-only for Cognitio gallery (no images yet — gallery structure added when assets are ready)
- [ ] Narrative angles: systems design thinking + psychology meets game design (interdisciplinary edge)
- [ ] No visual breakage to existing sections (hero, about, competencies, training portfolio, background, contact)

### Out of Scope

- Gallery images for Cognitio — not yet captured, will be added later
- Video embed for Cognitio — no demo recording exists yet
- Testimonial for Cognitio — no testimonial available yet
- Tab-switcher or carousel navigation — decided against, anchor pills chosen
- Restructuring mini-project cards (Journey, Gourmet Invader, Chest Quest, Showroom TANGO)
- Changes to header/nav, hero, about, competencies, background, or contact sections

## Context

**Existing portfolio structure:**
- Bilingual single-page app (DE/EN), ~475 lines per HTML file
- CSS: 1625 lines in css/styles.css (CSS variables, warm palette, responsive)
- JS: 560 lines in js/main.js (lightbox, collapsibles, mobile menu, smooth scroll)
- Current featured project: mind.set.play (corporate culture game, 2019) — full section with Problem/Solution/Result collapsibles, 4-image gallery, testimonial
- Training portfolio: 4 mini-project cards (Journey, Gourmet Invader, Chest Quest, Showroom TANGO)

**Cognitio project details (from internship proposal):**
- Trait-based decision framework for personality-driven game characters
- Built in Unity 6 / C# / ScriptableObjects / Git
- Phase 1 + 1.1 complete (trait system, custom Inspector, design system)
- Phase 2 in planning (decision engine — internship scope)
- 4 trait categories: Emotional, Social, Cognitive, Moral
- Key differentiator: Julian's psychology/education background applied to game AI systems design

**Design language to match:**
- Warm palette: #F8F6F0 background, #2B2621 text, #8B6F47 accent
- Pillar colors: #D4998D (creative), #9B9B6B (learning/psychology), #D4B974 (AI/tech)
- Poppins headings, Inter body text
- Card-based layout with shadows, hover effects
- Collapsible sections with smooth max-height animation

## Constraints

- **Tech stack**: Pure HTML/CSS/JS only — no build tools, no frameworks, no dependencies
- **Layout consistency**: Must use existing CSS patterns and variables — no new design system
- **Bilingual**: Every text addition goes into both index.html and index-en.html
- **No assets yet**: Cognitio section must work text-only; gallery added later without structural changes
- **Performance**: No additional JS libraries — extend existing main.js patterns

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Anchor pills over tabs/carousel | Nothing hidden, consistent with scroll-based design, simplest to implement | — Pending |
| mind.set.play first on scroll | Professional track record leads — proven results establish credibility before showing current work | — Pending |
| Design-focused section structure | "Design Challenge / Approach / Built So Far" better communicates systems thinking + psychology angle than generic Problem/Solution/Result | — Pending |
| Text-only gallery for now | No visual assets exist yet — structure should accommodate future gallery without code changes | — Pending |
| Equal visual weight for both projects | Both are significant — Cognitio shows current direction, mind.set.play shows proven results | — Pending |

---
*Last updated: 2026-02-20 after initialization*
