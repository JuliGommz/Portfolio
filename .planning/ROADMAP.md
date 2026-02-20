# Roadmap: Portfolio Cognitio Update

## Overview

This update integrates Cognitio as a second featured project into the existing bilingual portfolio, adds anchor-pill navigation for jumping between featured projects, and verifies visual consistency and responsive behavior across all viewports. The work follows a vertical-slice approach: build the Cognitio section first (the core deliverable), then add the navigation component (depends on section IDs), then verify visual parity and responsiveness (depends on everything being built).

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Cognitio Section** - Full Cognitio featured project in both language files, matching mind.set.play structure
- [ ] **Phase 2: Anchor-Pill Navigation** - Pill navigation component with scroll-spy active state for jumping between featured projects
- [ ] **Phase 3: Visual Consistency and Responsive QA** - Equal visual weight, tech tags, responsive behavior, and zero visual breakage

## Phase Details

### Phase 1: Cognitio Section
**Goal**: Visitors can scroll to the Cognitio section and read about the project with the same depth and structure as mind.set.play
**Depends on**: Nothing (first phase)
**Requirements**: COG-01, COG-02, COG-03, COG-04, COG-05, COG-06, COG-07, COG-08, COG-09, COG-10, CONT-01, CONT-02, CONT-03, CONT-04
**Success Criteria** (what must be TRUE):
  1. Cognitio article appears below mind.set.play in the Featured Work section with title, metadata, intro, and three collapsible sections (Design Challenge / My Approach / What's Built So Far)
  2. All three collapsible sections expand and collapse using the existing JS toggle behavior (no new JS required)
  3. The German version (index.html) and English version (index-en.html) have identical HTML structure with only text content differing
  4. The section heading reads "Projekte" (DE) / "Featured Work" (EN) to reflect multiple featured projects
  5. The section works text-only with no broken image placeholders or empty gallery containers
**Plans:** 1 plan

Plans:
- [ ] 01-01-PLAN.md -- Add Cognitio article to both DE/EN HTML files with collapsible sections, update section heading

### Phase 2: Anchor-Pill Navigation
**Goal**: Visitors can quickly jump to any featured project from a persistent pill bar at the top of the Featured Work section
**Depends on**: Phase 1 (needs article IDs to link to)
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05
**Success Criteria** (what must be TRUE):
  1. A pill-style navigation bar appears at the top of the Featured Work section with one pill per project group (mind.set.play, Cognitio, Training Portfolio)
  2. Clicking a pill smooth-scrolls to the corresponding project section, landing with correct offset below the fixed header
  3. The currently visible project's pill highlights automatically as the user scrolls (IntersectionObserver scroll-spy)
  4. On mobile screens the pill bar remains usable -- pills wrap or scroll horizontally without breaking layout
**Plans**: TBD

Plans:
- [ ] 02-01: TBD

### Phase 3: Visual Consistency and Responsive QA
**Goal**: Both featured projects look equally prominent and the entire portfolio renders correctly across all viewports with zero regressions
**Depends on**: Phase 2 (all structure and behavior must exist before verification)
**Requirements**: VIS-01, VIS-02, VIS-03, VIS-04, RES-01, RES-02, RES-03, RES-04
**Success Criteria** (what must be TRUE):
  1. Cognitio and mind.set.play have equal visual weight -- same card style, shadows, spacing, and typographic treatment
  2. Tech tags appear on both projects (Unity/C#/OOP/Behavioral Psychology for Cognitio; existing tags for mind.set.play)
  3. On mobile (below 768px), the Cognitio section stacks to a single column, collapsibles work on touch, and pill navigation remains usable
  4. No existing section (hero, about, competencies, mini-projects, background, contact) shows any visual breakage at 375px, 768px, and 1280px viewports
  5. No horizontal overflow is introduced on any viewport width
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Cognitio Section | 0/1 | Planning complete | - |
| 2. Anchor-Pill Navigation | 0/TBD | Not started | - |
| 3. Visual Consistency and Responsive QA | 0/TBD | Not started | - |
