# Project Documentation

This directory maintains the institutional memory of the content-engineering-templates project through structured markdown files.

---

## Documentation Files

### [`progress.md`](./progress.md) - Project Progress Ledger
**Purpose:** Chronological append-only record of all completed work

**What it contains:**
- Completed tasks with dates and outcomes
- Project milestones
- Current "Next Steps" section (always updated after new work)

**When to update:**
- After completing any significant task
- After major decisions or discoveries
- After fixing bugs
- After building new components
- **Always update "Next Steps" section when adding new entries**

**Format:**
```markdown
### YYYY-MM-DD: Task Description
**Component:** What was worked on
**Outcome:** What was accomplished
**Context:** Why it mattered
```

---

### [`gaps.md`](./gaps.md) - Design System Gaps Analysis
**Purpose:** Track missing components, utilities, and patterns

**What it contains:**
- Missing components (ProductCard, Cart Drawer, etc.)
- Missing utilities (Typography classes, layout helpers, etc.)
- Missing patterns (Sticky product details, image galleries, etc.)
- Impact assessment and priority ranking
- Workarounds currently in use

**When to update:**
- When discovering missing design system pieces
- When building new components (mark gap as FILLED)
- When reprioritizing based on new requirements
- When finding better workarounds

**Priority Levels:**
- **CRITICAL:** Blocking production deployment
- **HIGH:** Significantly impacts productivity or quality
- **MEDIUM:** Nice to have, improves consistency
- **LOW:** Future enhancements, advanced features

---

### [`decisions.md`](./decisions.md) - Architecture Decision Records
**Purpose:** Document significant design and architecture decisions

**What it contains:**
- ADR (Architecture Decision Record) format entries
- Design rationale and alternatives considered
- Trade-offs and consequences
- Related decisions and cross-references

**When to update:**
- After making significant architectural choices
- When choosing between multiple approaches
- When establishing new patterns or conventions
- When superseding previous decisions (mark old decision as superseded)

**ADR Format:**
```markdown
## ADR-XXX: Decision Title
**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Superseded

### Context
What situation led to this decision?

### Decision
What was decided?

### Rationale
Why this approach?

### Alternatives Considered
What else was considered and why rejected?

### Consequences
**Positive:**
**Negative:**
**Risks:**
```

---

### [`bugs.md`](./bugs.md) - Bug Tracker
**Purpose:** Living document of all bugs encountered

**What it contains:**
- Open bugs with severity, status, and reproduction steps
- Resolved bugs (kept for historical reference)
- Bug statistics and trends

**When to update:**
- When discovering new bugs
- When changing bug status (investigating, fixing, resolved)
- When resolving bugs (move to "Resolved" section with fix details)
- Never delete resolved bugs (historical record)

**Bug Format:**
```markdown
### BUG-XXX: Short Description
**Date Discovered:** YYYY-MM-DD
**Severity:** CRITICAL | HIGH | MEDIUM | LOW
**Component:** Affected area
**Status:** OPEN | INVESTIGATING | RESOLVED

**Description:**
Clear description of the issue

**Reproduction Steps:**
1. Step one
2. Step two

**Expected Behavior:**
What should happen

**Root Cause:**
Why it happens (if known)

**Related:** Link to gaps, decisions, etc.
```

---

### [`refactor-plan.md`](./refactor-plan.md) - Index.html Refactor Plan
**Purpose:** Detailed plan for refactoring index.html

**What it contains:**
- Current state analysis
- Phased refactor approach (3 weeks)
- Task breakdown with effort estimates
- Success metrics and validation criteria
- Risk assessment
- Timeline

**When to update:**
- As refactor progresses (mark tasks complete)
- When discovering new requirements
- When metrics change
- When timeline shifts

---

## How to Use This Documentation

### For Engineers Starting Work
1. Read `progress.md` "Next Steps" to see what's planned
2. Check `gaps.md` for missing components you might need
3. Review `decisions.md` for architectural context
4. Check `bugs.md` for known issues in your area

### For Engineers Completing Work
1. Update `progress.md` with what you completed
2. **Update "Next Steps" in `progress.md`** with logical follow-ups
3. Mark gaps as FILLED in `gaps.md` if you built something
4. Update bug status in `bugs.md` if you fixed issues
5. Add ADR to `decisions.md` if you made significant choices

### For Project Managers
1. Review `progress.md` for recent activity
2. Check `gaps.md` priority sections for planning
3. Monitor `bugs.md` statistics for quality trends
4. Use `refactor-plan.md` for timeline tracking

### For New Team Members
1. Start with `decisions.md` to understand architectural philosophy
2. Read `progress.md` from bottom to top for project history
3. Review `gaps.md` to understand what's missing
4. Check `bugs.md` for known issues

---

## Current Project Status

**Last Updated:** 2025-10-19

### Active Work
- Storefront web components revised to declarative HTML architecture (see ADR-007)
- All documentation updated to reflect new web component standards
- Index.html refactor planning complete (see `refactor-plan.md`)
- Design system gap analysis complete (see `gaps.md`)

### Recent Achievements
1. **Web Components Architecture:** Established declarative HTML pattern as project standard
2. **JavaScript Reduction:** 70% reduction in web component code (335 lines → 100 lines)
3. **Documentation:** Added ADR-007, updated web-components.md, components.md, progress.md
4. **Performance:** Eliminated runtime DOM creation and style injection

### Critical Items
1. **BUG-001:** Mobile responsiveness broken (CRITICAL)
2. **GAP-001:** Typography utility classes missing (CRITICAL)
3. **GAP-002:** Mobile-first grid documentation unclear (CRITICAL)

### Next Milestones
- **Week 1:** Test Storefront integration in index.html, Typography utilities + mobile responsive fixes
- **Week 2:** E-commerce component library following declarative HTML pattern
- **Week 3:** Final optimization and validation

---

## Documentation Principles

### Append-Only for Progress
`progress.md` is an append-only ledger. **Never delete entries.** This creates a permanent historical record.

### Living Document for Decisions
`decisions.md` should evolve. Update or supersede old decisions when the project changes. Keep historical record but mark status clearly.

### Lifecycle Tracking for Bugs
`bugs.md` tracks bugs from discovery to resolution. Move to "Resolved" section but never delete.

### Gap Analysis for Planning
`gaps.md` helps prioritize what to build next. Update priorities as project evolves.

---

## File Organization

```
_docs/
├── README.md           (this file - documentation guide)
├── progress.md         (append-only work log)
├── gaps.md            (missing components/utilities)
├── decisions.md       (architecture decision records)
├── bugs.md            (bug tracker)
├── refactor-plan.md   (detailed refactor plan)
├── web-components.md  (web component development guide)
└── components.md      (component catalog)
```

---

## Related Documentation

**Design System:**
- `/ui/styles/THEMING.md` - Theme system guide
- `/ui/styles/FONTS.md` - Font system guide
- `/CLAUDE.md` - Project overview and commands

**Components:**
- `components.md` - Complete component catalog (CSS + web components)
- `web-components.md` - Web component development guide
- `/ui/src/components/` - Component source code
- Storybook - Component documentation (run `npm run storybook` in `/ui`)

**Web Components:**
- `web-components.md` - Complete development guide (file organization, design system integration, naming, testing)
- `decisions.md` ADR-005 - Web Components File Organization
- `decisions.md` ADR-006 - Web Component Shadow DOM Strategy
- `decisions.md` ADR-007 - Web Component Declarative HTML Architecture
- `/ui/src/components/Storefront/` - Reference implementation (declarative HTML pattern)

---

## Maintenance

This documentation system is maintained by:
- **Project Scribe Agent:** Automated documentation updates
- **Engineering Team:** Manual updates as work progresses

**Quality Standards:**
- Clarity: Understandable weeks/months later
- Consistency: Uniform formatting within each file
- Completeness: Self-contained entries with context
- Honesty: Document failures and successes equally
- Interconnection: Cross-reference between files when relevant

**Review Cycle:**
- Weekly: Review "Next Steps" in progress.md
- Bi-weekly: Review gap priorities in gaps.md
- Monthly: Review and consolidate decisions.md
- As-needed: Update bugs.md and refactor plans

---

## Questions?

If you have questions about this documentation system:
1. Read this README
2. Check existing files for examples
3. Ask the Project Scribe agent for clarification
4. Propose changes via pull request

**Philosophy:** This documentation exists to prevent knowledge loss and avoid repeating past mistakes. When in doubt, over-document rather than under-document.
