# Requirements: Portfolio Cognitio Update

**Defined:** 2026-02-20
**Core Value:** Seamlessly integrate Cognitio into the portfolio without breaking the existing layout or narrative

## v1 Requirements

Requirements for this update. Each maps to roadmap phases.

### Navigation

- [ ] **NAV-01**: Anchor-pill navigation bar appears at top of Featured Work section with pills for each project group
- [ ] **NAV-02**: Clicking a pill smooth-scrolls to the corresponding project
- [ ] **NAV-03**: Active pill highlights based on scroll position (IntersectionObserver)
- [ ] **NAV-04**: Pill bar is responsive — wraps or scrolls horizontally on mobile
- [ ] **NAV-05**: Pill bar styling uses existing CSS variables (accent color, typography, spacing)

### Cognitio Section

- [ ] **COG-01**: Cognitio article uses identical HTML structure and CSS classes as mind.set.play
- [ ] **COG-02**: Two-column layout: text content left, sticky sidebar right (stacks on mobile)
- [ ] **COG-03**: Project title "Cognitio" with metadata line (type, tech, role, year)
- [ ] **COG-04**: Short intro paragraph conveying systems-design + psychology-meets-game-design angle
- [ ] **COG-05**: Collapsible section "The Design Challenge" / "Die Design-Herausforderung"
- [ ] **COG-06**: Collapsible section "My Approach" / "Mein Ansatz"
- [ ] **COG-07**: Collapsible section "What's Built So Far" / "Was bisher entstanden ist"
- [ ] **COG-08**: Collapsible sections work with existing JS (initCollapsible in main.js)
- [ ] **COG-09**: Section works text-only — no gallery, no thumbnail image required
- [ ] **COG-10**: Sidebar area exists but is empty/minimal until visual assets are added

### Content

- [ ] **CONT-01**: All text content exists in both index.html (German) and index-en.html (English)
- [ ] **CONT-02**: HTML structure is identical between DE and EN files (only text differs)
- [ ] **CONT-03**: Section heading updated to reflect multiple featured projects ("Projekte" / "Featured Work")
- [ ] **CONT-04**: mind.set.play remains first on scroll, Cognitio second

### Visual Consistency

- [ ] **VIS-01**: Cognitio section has equal visual weight to mind.set.play (same card style, shadows, spacing)
- [ ] **VIS-02**: Tech tags appear on both mind.set.play and Cognitio for consistency
- [ ] **VIS-03**: All new CSS uses existing CSS variables (no hardcoded colors/fonts/spacing)
- [ ] **VIS-04**: No visual breakage to any existing section (hero, about, competencies, mini-projects, background, contact)

### Responsive

- [ ] **RES-01**: Cognitio section stacks to single column on mobile (< 768px)
- [ ] **RES-02**: Pill navigation is usable on mobile screens
- [ ] **RES-03**: Collapsible sections work on touch devices
- [ ] **RES-04**: No horizontal overflow introduced on any viewport width

## v2 Requirements

Deferred to future update. Tracked but not in current roadmap.

### Visuals

- **VIS-V2-01**: Architecture diagram as Cognitio thumbnail image (SVG or WebP)
- **VIS-V2-02**: Cognitio gallery section with Unity Inspector screenshots
- **VIS-V2-03**: Video demo embed of trait system in action

### Social Proof

- **SP-V2-01**: GitHub repository CTA when repo is public
- **SP-V2-02**: Cross-reference narrative connecting mind.set.play and Cognitio

## Out of Scope

| Feature | Reason |
|---------|--------|
| Interactive Unity embed / code demos | Massive complexity, marginal value for portfolio |
| Separate dedicated project pages | Over-engineering for 2 featured projects; breaks single-page flow |
| Filterable project grid / tag filtering | 6 projects total — nothing to filter at this scale |
| Progress bars / completion percentages | Gimmicky; "What's Built So Far" narrative is stronger |
| Animated page transitions | Adds JS weight, accessibility concerns; calm tone is a strength |
| Testimonial for Cognitio | Solo in-progress project; no external validation exists |
| Empty gallery container for Cognitio | Worse than no gallery; add when real assets exist |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | Phase 2 | Pending |
| NAV-02 | Phase 2 | Pending |
| NAV-03 | Phase 2 | Pending |
| NAV-04 | Phase 2 | Pending |
| NAV-05 | Phase 2 | Pending |
| COG-01 | Phase 1 | Pending |
| COG-02 | Phase 1 | Pending |
| COG-03 | Phase 1 | Pending |
| COG-04 | Phase 1 | Pending |
| COG-05 | Phase 1 | Pending |
| COG-06 | Phase 1 | Pending |
| COG-07 | Phase 1 | Pending |
| COG-08 | Phase 1 | Pending |
| COG-09 | Phase 1 | Pending |
| COG-10 | Phase 1 | Pending |
| CONT-01 | Phase 1 | Pending |
| CONT-02 | Phase 1 | Pending |
| CONT-03 | Phase 1 | Pending |
| CONT-04 | Phase 1 | Pending |
| VIS-01 | Phase 3 | Pending |
| VIS-02 | Phase 3 | Pending |
| VIS-03 | Phase 3 | Pending |
| VIS-04 | Phase 3 | Pending |
| RES-01 | Phase 3 | Pending |
| RES-02 | Phase 3 | Pending |
| RES-03 | Phase 3 | Pending |
| RES-04 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 27 total
- Mapped to phases: 27
- Unmapped: 0

---
*Requirements defined: 2026-02-20*
*Last updated: 2026-02-20 after roadmap creation*
