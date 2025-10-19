# Architecture Decisions

This document records significant design and architecture decisions made during development.

---

## ADR-001: Index.html Refactor Strategy

**Date:** 2025-10-18
**Status:** Proposed
**Decision Makers:** CSS Performance Engineer, Viral Commerce Architect

### Context
The current index.html (316 lines) demonstrates a viral product landing page but has significant code quality issues:
- 17 inline style anti-patterns preventing theme consistency
- 3 duplicate grid implementations ignoring existing Utopia grid system
- Broken mobile responsiveness (no mobile-first design)
- Inline `<style>` block should be external CSS
- Components loaded but severely underutilized

The page works as a proof-of-concept but isn't production-ready or maintainable.

### Decision
Refactor index.html using a **systematic, phased approach** that prioritizes fixing critical issues first while building missing design system pieces:

**Phase 1: Foundation (Critical)**
1. Create `/index.css` to eliminate ALL inline styles
2. Fix mobile responsiveness with mobile-first grid approach
3. Replace manual grid code with Utopia grid system (`.u-container`, `.u-grid`, `.col-span-*`)
4. Extract inline `<style>` block to `/index.css`

**Phase 2: Design System Gaps (High Priority)**
5. Build Typography utility classes (`.type-heading-*`, `.type-body`, etc.)
6. Create responsive image container pattern
7. Clarify/document mobile behavior of `.l-split-*` layout utilities
8. Build ProductCard component

**Phase 3: Component Abstraction (Medium Priority)**
9. Extract repeated product layout pattern into reusable component
10. Build missing e-commerce components (PriceDisplay, QuantitySelector, etc.)
11. Create MediaLockup variant for product pages
12. Implement Section component for semantic structure

### Rationale

**Why Not "Big Bang" Refactor:**
- Risk of breaking working page
- Need to build missing design system pieces first
- Iterative approach allows validation at each step

**Why Phase Typography Utilities First:**
- Highest ROI - unlocks entire refactor
- Simple to implement (just CSS utility classes)
- No component dependencies
- Immediately eliminates most inline styles

**Why Use Existing Grid System:**
- Utopia grid already exists and is well-designed
- Manual grid code duplicates functionality
- Creates technical debt and inconsistency
- Existing system is responsive and theme-aware

**Why Prioritize Mobile Responsiveness:**
- Currently completely broken on mobile
- Critical user experience issue
- Affects SEO and accessibility
- Required for production deployment

### Consequences

**Positive:**
- ~40% reduction in HTML line count
- Elimination of ALL inline styles
- Theme-consistent styling
- Mobile-responsive design
- Reusable component patterns
- Maintainable codebase
- Demonstrates design system value

**Negative:**
- Requires building missing design system pieces first
- Phased approach takes longer than quick fix
- Need to update documentation as we go
- Team learning curve on new utilities

**Risks:**
- May discover more gaps during refactor
- Mobile breakpoints may need adjustment
- Component abstractions may need iteration

### Implementation Plan

**Week 1: Critical Fixes**
- Create Typography utility classes
- Build `/index.css` file
- Fix mobile responsiveness
- Replace manual grid code with Utopia grid

**Week 2: Component Development**
- Build ProductCard component
- Create responsive image container pattern
- Develop PriceDisplay component
- Document layout utility mobile behavior

**Week 3: Abstraction & Polish**
- Extract product layout pattern
- Build remaining e-commerce components
- Refactor all sections to use components
- Update Storybook documentation

### Success Metrics

**Code Quality:**
- Zero inline styles in index.html
- Zero manual grid implementations
- All styles use semantic tokens
- All layouts use design system utilities

**Line Count:**
- Reduce index.html from 316 lines to ~190 lines (40% reduction)
- Extract ~75 lines to `/index.css`
- Net reduction through component reuse

**Responsiveness:**
- All layouts stack properly on mobile (< 768px)
- All content readable on 320px viewport
- No horizontal scroll on any viewport size
- All interactive elements accessible on touch

**Component Reuse:**
- Product layout pattern used 3x (currently duplicated)
- Typography utilities used throughout (replace 17+ inline styles)
- Grid system used consistently (replace 3 manual implementations)

**Performance:**
- Lighthouse accessibility score: 100
- Lighthouse mobile usability: 100
- No layout shift issues
- Fast paint times with external CSS

---

## ADR-002: Design System Component Strategy

**Date:** 2025-10-18
**Status:** Proposed

### Context
Analysis revealed 11+ missing e-commerce components needed for production pages. Current design system focuses on primitive components (Button, Icon, Typography) but lacks composed e-commerce patterns.

### Decision
Build e-commerce components in **three tiers**:

**Tier 1: Primitive Utilities** (Build First)
- Typography utility classes
- Responsive image containers
- Layout utilities clarification

**Tier 2: E-Commerce Atoms** (Build Second)
- PriceDisplay
- QuantitySelector
- ReviewStars
- Breadcrumbs

**Tier 3: E-Commerce Molecules** (Build Third)
- ProductCard (combines image, price, title)
- Product Layout Pattern (combines MediaLockup concepts)
- Cart Drawer (combines multiple atoms)
- Variant Selector (combines ButtonGroup patterns)

### Rationale

**Tier 1 Focus:**
- Utilities unblock everything else
- Highest reuse potential
- Smallest implementation effort
- No dependencies

**Tier 2 Focus:**
- Reusable across all e-commerce pages
- Clear single responsibility
- Can be built independently
- Well-understood patterns

**Tier 3 Focus:**
- Compose Tier 1 + Tier 2 components
- Product-specific patterns
- More complex state management
- May need iteration based on usage

**Why Not Build Everything at Once:**
- Unknown requirements for Tier 3
- Tier 1 unblocks current refactor
- Tier 2 can be built as needed
- Allows validation of patterns before composition

### Consequences

**Positive:**
- Clear dependency hierarchy
- Incremental value delivery
- Lower risk of over-engineering
- Allows learning from Tier 1/2 before building Tier 3

**Negative:**
- Some e-commerce patterns won't exist initially
- May need to iterate on Tier 3 designs
- Temporary workarounds for missing components

### Next Steps
1. Build Typography utilities (Tier 1)
2. Document responsive image pattern (Tier 1)
3. Build PriceDisplay component (Tier 2)
4. Validate component patterns in refactored index.html

---

## ADR-003: Typography Utility Approach

**Date:** 2025-10-18
**Status:** Proposed

### Context
Typography tokens exist (`--step-0` through `--step-8`) but no utility classes to apply them. Current code uses inline styles for all typography, preventing consistency and theme adherence.

### Decision
Create **semantic typography utility classes** that map to design tokens:

```css
/* Type Scale */
.type-body { font-size: var(--step-0); line-height: 1.6; }
.type-body-large { font-size: var(--step-1); line-height: 1.6; }
.type-body-small { font-size: var(--step--1); line-height: 1.5; }

/* Headings */
.type-heading-1 { font-size: var(--step-4); font-weight: 700; line-height: 1.2; }
.type-heading-2 { font-size: var(--step-3); font-weight: 700; line-height: 1.2; }
.type-heading-3 { font-size: var(--step-2); font-weight: 600; line-height: 1.3; }
.type-heading-4 { font-size: var(--step-1); font-weight: 600; line-height: 1.4; }

/* Specialized */
.type-label { font-size: var(--step--1); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
.type-price { font-size: var(--step-2); font-weight: 600; color: var(--color-primary); }
.type-caption { font-size: var(--step--2); line-height: 1.4; color: var(--color-on-surface-variant); }
```

### Rationale

**Why Semantic Names:**
- `.type-heading-2` is clearer than `.type-step-3`
- Describes purpose, not implementation
- Easier for non-technical users
- Matches component naming convention

**Why Include Line Height:**
- Typography scale should define complete text styling
- Prevents inconsistent line-height declarations
- Matches Material Design 3 approach
- Single class application

**Why Specialized Classes:**
- Common patterns deserve dedicated utilities
- `.type-price` bundles size + weight + color
- `.type-label` includes uppercase transformation
- Reduces need for multiple class combinations

**Why Not Component Approach:**
- Typography is presentation, not structure
- Utilities more flexible than components
- Follows existing design system pattern (`.img--cover`, etc.)
- Lower barrier to adoption

### Alternatives Considered

**Alternative 1: Step-Based Classes**
```css
.type-step-0 { font-size: var(--step-0); }
.type-step-1 { font-size: var(--step-1); }
```
- Rejected: Not semantic, exposes implementation details

**Alternative 2: Typography Components**
```html
<Typography variant="heading-2">Title</Typography>
```
- Rejected: Overkill for simple text styling, requires JS/templating

**Alternative 3: Direct Token Usage**
```html
<h2 style="font-size: var(--step-3);">Title</h2>
```
- Rejected: Current approach, causes inline style anti-patterns

### Consequences

**Positive:**
- Eliminates need for inline font-size styles
- Consistent line-height across design
- Clear semantic meaning
- Easy to learn and use
- Works with any HTML element

**Negative:**
- Adds ~15 new utility classes
- Need to document when to use each
- May need to expand for edge cases
- Requires updating existing components

### Implementation Location
Create `ui/styles/typography-utilities.css` and import in `ui/styles/index.css` after typography tokens.

---

## ADR-004: Mobile-First Grid Strategy

**Date:** 2025-10-18
**Status:** Proposed

### Context
Current index.html has broken mobile layout because grid code uses fixed `grid-column: span 6` without responsive breakpoints. Design system has `.l-split-*` utilities but their mobile behavior is unclear.

### Decision
**Clarify and document** that all `.l-split-*` utilities are **mobile-first by default**:

- Mobile (default): Stack vertically (single column)
- Tablet+ (768px+): Apply column split

Update documentation to make this explicit, and create examples showing mobile → desktop transformation.

### Rationale

**Why Mobile-First:**
- Matches CSS best practices
- Progressive enhancement approach
- Easier to understand (stack then split)
- Better performance (less CSS override)

**Why Document vs. Build:**
- Layout utilities already exist
- Behavior may already be mobile-first (needs verification)
- Documentation gap, not code gap
- Faster solution than building new system

**Why 768px Breakpoint:**
- Industry standard for tablet/desktop split
- Matches most design system conventions
- Aligns with common device sizes
- Good balance for most content

### Verification Needed
Before finalizing:
1. Test `.l-split-half` on mobile viewport (< 768px)
2. Verify stacking behavior exists
3. Check all `.l-split-*` variants
4. Document actual breakpoints used

### Consequences

**Positive:**
- Clear mobile behavior for developers
- Consistent responsive patterns
- No need to build new grid system
- Leverages existing utilities

**Negative:**
- If utilities don't stack on mobile, requires code changes
- May need to add responsive classes if behavior missing
- Documentation debt needs clearing

### Success Criteria
- All `.l-split-*` utilities documented with mobile/desktop examples
- Index.html refactor uses layout utilities exclusively
- Zero manual `grid-template-columns` declarations
- All layouts tested on 320px viewport

---

## Related Decisions

**See Also:**
- `gaps.md` for complete list of missing design system pieces
- `progress.md` for implementation timeline
- `refactor-plan.md` for detailed refactor steps
