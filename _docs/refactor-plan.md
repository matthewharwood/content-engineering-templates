# Index.html Refactor Plan

**Status:** Proposed
**Target:** Reduce HTML from 316 lines to ~190 lines (40% reduction)
**Timeline:** 3 weeks
**Priority:** HIGH

---

## Executive Summary

This document outlines a comprehensive, phased refactor of `/index.html` to:
1. Fix critical mobile responsiveness issues (CRITICAL)
2. Eliminate all inline styles (17 instances)
3. Replace manual grid code with design system utilities
4. Build missing design system components
5. Demonstrate design system value through real-world usage

**Key Metrics:**
- Reduce HTML: 316 → 190 lines (40% reduction)
- Eliminate inline styles: 17 → 0
- Fix mobile breakage: BROKEN → RESPONSIVE
- Component reuse: 0 → 3+ patterns

---

## Current State Analysis

### File: `/index.html` (316 lines)

**Structure:**
- Lines 1-22: Head with CSS imports
- Lines 24-29: Banner component (✓ using component)
- Lines 31-64: Navigation component (✓ using component)
- Lines 66-71: Hero image (✓ using AspectRatio component)
- Lines 74-180: Product details section (❌ inline styles, manual grid)
- Lines 182-220: Product info section (❌ inline styles, manual grid)
- Lines 222-280: Product FAQ section (❌ inline styles, manual grid)
- Lines 282-298: Inline style block (❌ should be external)
- Lines 300-314: API test script

**Code Quality Issues:**

**Inline Styles (17 instances):**
1. Line 74: Container max-width and padding
2. Line 75: Manual grid definition
3. Line 78: Column span and flex
4. Line 79: Image sizing
5. Line 83: Column span and flex-direction
6. Line 87: Heading typography
7. Line 90: Body text typography
8. Line 93: Price typography
9. Line 175: Button width
10. Line 183: Container max-width
11. Line 184: Manual grid definition
12. Line 187: Column span
13. Line 188: Image sizing
14. Line 192: Column span and flex-direction
15. Line 223: Container padding
16. Line 224: Manual grid definition
17. Line 227: Image sizing
18. Line 232: Column span with alignment

**Duplicate Patterns (3 instances):**
1. Lines 74-81: Product grid container + 6/6 split
2. Lines 183-190: Product grid container + 6/6 split
3. Lines 223-232: Product grid container + 6/6 split

**Missing Responsive Behavior:**
- All grid layouts use fixed `grid-column: span 6`
- No mobile stacking (causes BUG-001)
- No media queries
- No responsive utilities

---

## Phase 1: Critical Fixes (Week 1)

**Goal:** Fix mobile responsiveness and create foundation for refactor
**Deliverables:** Typography utilities, `/index.css`, responsive layouts

### Task 1.1: Build Typography Utility Classes
**Priority:** CRITICAL (blocks everything else)
**Effort:** 4 hours
**Files:**
- Create: `/ui/styles/typography-utilities.css`
- Update: `/ui/styles/index.css` (add import)

**Implementation:**
```css
/* /ui/styles/typography-utilities.css */

/* Import design system tokens */
@import "./tokens/colors.css";
@import "./typography.css";

/* Body Text */
.type-body {
  font-size: var(--step-0);
  line-height: 1.6;
  font-family: var(--font-sans);
}

.type-body-large {
  font-size: var(--step-1);
  line-height: 1.6;
  font-family: var(--font-sans);
}

.type-body-small {
  font-size: var(--step--1);
  line-height: 1.5;
  font-family: var(--font-sans);
}

/* Headings */
.type-heading-1 {
  font-size: var(--step-4);
  font-weight: 700;
  line-height: 1.2;
  font-family: var(--font-sans);
  color: var(--color-on-surface);
}

.type-heading-2 {
  font-size: var(--step-3);
  font-weight: 700;
  line-height: 1.2;
  font-family: var(--font-sans);
  color: var(--color-on-surface);
}

.type-heading-3 {
  font-size: var(--step-2);
  font-weight: 600;
  line-height: 1.3;
  font-family: var(--font-sans);
  color: var(--color-on-surface);
}

.type-heading-4 {
  font-size: var(--step-1);
  font-weight: 600;
  line-height: 1.4;
  font-family: var(--font-sans);
  color: var(--color-on-surface);
}

/* Specialized */
.type-label {
  font-size: var(--step--1);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: var(--font-sans);
  color: var(--color-on-surface-variant);
}

.type-price {
  font-size: var(--step-2);
  font-weight: 600;
  font-family: var(--font-sans);
  color: var(--color-primary);
}

.type-caption {
  font-size: var(--step--2);
  line-height: 1.4;
  font-family: var(--font-sans);
  color: var(--color-on-surface-variant);
}

/* Utility modifiers */
.type--muted {
  color: var(--color-on-surface-variant);
}

.type--primary {
  color: var(--color-primary);
}
```

**Update `/ui/styles/index.css`:**
```css
@import "./tokens/colors.css";
@import "./fonts.css";
@import "./icons.css";
@import "./typography.css";
@import "./typography-utilities.css"; /* ADD THIS */
@import "./space.css";
@import "./grid.css";
@import "./layouts.css";
```

**Success Criteria:**
- [ ] Typography utilities available globally
- [ ] Imported in Storybook
- [ ] Documentation added (Storybook story or README)

---

### Task 1.2: Verify/Document Layout Utility Mobile Behavior
**Priority:** CRITICAL
**Effort:** 2 hours
**Files:**
- Read: `/ui/styles/layouts.css`
- Test: Layout utilities on mobile viewport
- Update: Documentation if needed

**Steps:**
1. Read `/ui/styles/layouts.css` to understand `.l-split-*` implementation
2. Create test HTML file to verify mobile stacking behavior
3. Test all `.l-split-*` variants on 320px, 375px, 768px, 1024px viewports
4. Document findings
5. If mobile stacking missing, add media queries
6. Update CLAUDE.md with clear mobile behavior docs

**Success Criteria:**
- [ ] `.l-split-half` confirmed to stack on mobile
- [ ] All `.l-split-*` variants tested and documented
- [ ] Breakpoints documented (mobile → tablet → desktop)
- [ ] CLAUDE.md updated with examples

---

### Task 1.3: Create `/index.css` File
**Priority:** CRITICAL
**Effort:** 2 hours
**Files:**
- Create: `/index.css`
- Update: `/index.html` (add CSS link, remove inline `<style>`)

**Implementation:**
```css
/* /index.css */

/* Import all design system tokens and utilities */
@import "./ui/styles/index.css";

/* Page-specific styles */
body {
  margin: 0;
  padding: 0;
  background-color: var(--color-background);
}

/* Full-bleed hero image */
.hero-image-full-bleed {
  width: 100%;
  margin: 0;
}

.hero-image-full-bleed .img-aspect {
  border-radius: 0;
}

/* Product section spacing */
.product-section {
  padding-block: var(--space-3xl);
}

/* Product section first has extra top padding */
.product-section:first-of-type {
  padding-block-start: var(--space-3xl);
}

/* Content spacing within product sections */
.product-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-l);
}

/* Product info group spacing */
.product-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}

/* Responsive image container */
.product-image {
  width: 100%;
  height: auto;
  display: block;
}
```

**Update `/index.html` head:**
```html
<head>
  <title>Snif - Me Fragrance</title>
  <!-- Import design system and page styles -->
  <link rel="stylesheet" href="./index.css">
  <!-- Component styles already imported via index.css -->
</head>
```

**Success Criteria:**
- [ ] All inline `<style>` block moved to `/index.css`
- [ ] CSS linked in HTML head
- [ ] Page renders identically
- [ ] No inline style block in HTML

---

### Task 1.4: Refactor Product Details Section (Mobile-First)
**Priority:** CRITICAL
**Effort:** 3 hours
**Files:** `/index.html` lines 74-180

**Before (lines 74-81):**
```html
<div style="max-width: var(--grid-max-width); margin-inline: auto; padding: var(--space-3xl) var(--grid-gutter);">
  <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--grid-gutter);">
    <div style="grid-column: span 6; display: flex;">
      <img src="..." class="img--cover" style="width: 100%; height: auto;">
    </div>
    <div style="grid-column: span 6; display: flex; flex-direction: column; gap: var(--space-l);">
      <!-- Content -->
    </div>
  </div>
</div>
```

**After:**
```html
<section class="product-section">
  <div class="u-container l-split-half">
    <div>
      <img src="..." class="img--cover product-image" alt="Snif Me Fragrance Product">
    </div>
    <div class="product-content">
      <!-- Product Info -->
      <div class="product-info">
        <h2 class="type-heading-2">me</h2>
        <p class="type-body type--muted">woody, musky, fruity</p>
        <p class="type-price">$55</p>
      </div>

      <!-- Size Selection (no changes, already using component) -->
      <div class="button-group">
        <!-- ... -->
      </div>

      <!-- Continue with other form elements ... -->
    </div>
  </div>
</section>
```

**Changes:**
- ✅ Wrap in semantic `<section class="product-section">`
- ✅ Replace manual grid with `u-container l-split-half`
- ✅ Remove all inline styles
- ✅ Use typography utility classes
- ✅ Use semantic class names from `/index.css`
- ✅ Mobile-first: stacks on mobile, splits on desktop

**Success Criteria:**
- [ ] Zero inline styles in this section
- [ ] Uses `u-container` and `l-split-half`
- [ ] All typography uses utility classes
- [ ] Section stacks properly on 375px viewport
- [ ] Section displays side-by-side on 768px+ viewport

---

### Task 1.5: Refactor Product Info Section
**Priority:** CRITICAL
**Effort:** 2 hours
**Files:** `/index.html` lines 182-220

**Before (lines 183-192):**
```html
<div style="max-width: var(--grid-max-width); margin-inline: auto;">
  <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--grid-gutter);">
    <div style="grid-column: span 6; display: flex;">
      <img src="..." class="img--cover" style="width: 100%; height: auto;">
    </div>
    <div style="grid-column: span 6; display: flex; flex-direction: column; gap: var(--space-l);">
      <!-- Content -->
    </div>
  </div>
</div>
```

**After:**
```html
<section class="product-section">
  <div class="u-container l-split-half">
    <div>
      <img src="..." class="img--cover product-image" alt="Snif Me Fragrance Product">
    </div>
    <div class="product-content">
      <h2 class="type-heading-3">at a first glance</h2>
      <p class="type-body type--muted">
        This shape-shifting scent reflects your skin's unique chemistry...
      </p>

      <!-- Fragrance Notes (no changes, already using component) -->
      <div class="button-tags">
        <!-- ... -->
      </div>

      <!-- Quality & Certifications (no changes, already using component) -->
      <div class="button-tags">
        <!-- ... -->
      </div>
    </div>
  </div>
</section>
```

**Success Criteria:**
- [ ] Zero inline styles
- [ ] Uses design system utilities
- [ ] Responsive mobile → desktop

---

### Task 1.6: Refactor Product FAQ Section
**Priority:** CRITICAL
**Effort:** 2 hours
**Files:** `/index.html` lines 222-280

**Before (lines 223-232):**
```html
<div style="max-width: var(--grid-max-width); margin-inline: auto; padding: var(--space-3xl) 0;">
  <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--grid-gutter);">
    <div style="grid-column: span 6; display: flex;">
      <img src="..." class="img--cover" style="width: 100%; height: auto;">
    </div>
    <div style="grid-column: span 6; display: flex; align-items: center;">
      <div class="faq faq--medium faq--surface" style="width: 100%;">
        <!-- FAQ items -->
      </div>
    </div>
  </div>
</div>
```

**After:**
```html
<section class="product-section">
  <div class="u-container l-split-half">
    <div>
      <img src="..." class="img--cover product-image" alt="Snif Me 10ml Fragrance Product">
    </div>
    <div class="l-stack">
      <div class="faq faq--medium faq--surface">
        <!-- FAQ items (no changes, already using component) -->
      </div>
    </div>
  </div>
</section>
```

**Success Criteria:**
- [ ] Zero inline styles
- [ ] Uses design system utilities
- [ ] FAQ centered vertically on desktop
- [ ] Responsive mobile → desktop

---

### Task 1.7: Validate Mobile Responsiveness
**Priority:** CRITICAL
**Effort:** 2 hours

**Test Viewports:**
- 320px (iPhone SE)
- 375px (iPhone standard)
- 768px (iPad portrait)
- 1024px (iPad landscape / desktop)
- 1440px (large desktop)

**Test Checklist:**
- [ ] All text readable at 320px
- [ ] No horizontal scroll at any viewport
- [ ] All sections stack vertically on mobile
- [ ] All sections display side-by-side on tablet+
- [ ] Images scale properly (no distortion)
- [ ] Buttons large enough to tap (min 44px touch target)
- [ ] Form elements accessible on touch
- [ ] Navigation works on mobile
- [ ] Banner displays correctly

**Tools:**
- Chrome DevTools device emulation
- Real device testing (if available)
- Lighthouse mobile usability audit

**Success Criteria:**
- [ ] Lighthouse mobile usability: 100/100
- [ ] All content accessible on 320px viewport
- [ ] No layout shift issues
- [ ] Smooth transitions between breakpoints

---

## Phase 1 Deliverables Summary

**Files Created:**
- `/ui/styles/typography-utilities.css`
- `/index.css`

**Files Updated:**
- `/ui/styles/index.css` (add typography utilities import)
- `/index.html` (full refactor of lines 74-280)

**Metrics:**
- Inline styles: 17 → 0 ✅
- Manual grid code: 3 instances → 0 ✅
- Mobile responsive: NO → YES ✅
- Line count: 316 → ~260 (18% reduction so far)

**Bugs Fixed:**
- BUG-001: Mobile responsiveness ✅
- BUG-002: Inline styles ✅
- BUG-003: Duplicate grid patterns ✅
- BUG-004: Inline style block ✅

---

## Phase 2: Component Development (Week 2)

**Goal:** Build missing design system components
**Deliverables:** ProductCard, PriceDisplay, responsive image pattern docs

### Task 2.1: Create PriceDisplay Component
**Priority:** HIGH
**Effort:** 4 hours

**Files:**
- `/ui/src/components/Price/Price.css`
- `/ui/src/components/Price/PriceDefault.html`
- `/ui/src/components/Price/PriceSale.html`
- `/ui/src/components/Price/PriceRange.html`
- `/ui/src/components/Price/Price.stories.js`

**Features:**
- Regular price display
- Sale price (original struck through + sale price)
- Price range (from $X to $Y)
- Subscription savings indicator
- Semantic markup for screen readers

**Success Criteria:**
- [ ] Component in Storybook
- [ ] All variants documented
- [ ] Accessible (ARIA labels)
- [ ] Theme-compatible

---

### Task 2.2: Create ProductCard Component
**Priority:** HIGH
**Effort:** 6 hours

**Files:**
- `/ui/src/components/ProductCard/ProductCard.css`
- `/ui/src/components/ProductCard/ProductCardDefault.html`
- `/ui/src/components/ProductCard/ProductCardSale.html`
- `/ui/src/components/ProductCard/ProductCard.stories.js`

**Features:**
- Product image with aspect ratio
- Product name and category
- Price display (integrates PriceDisplay)
- Quick add button
- Hover effects
- Responsive sizing

**Success Criteria:**
- [ ] Component in Storybook
- [ ] Works in grid layouts
- [ ] Accessible
- [ ] Theme-compatible

---

### Task 2.3: Document Responsive Image Pattern
**Priority:** MEDIUM
**Effort:** 2 hours

**Deliverable:** Add to CLAUDE.md and create example

**Pattern:**
```html
<!-- Responsive image container -->
<div class="img-container">
  <img src="..." alt="..." class="img--cover">
</div>
```

```css
.img-container {
  width: 100%;
  position: relative;
}

.img-container img {
  width: 100%;
  height: auto;
  display: block;
}
```

**Success Criteria:**
- [ ] Pattern documented in CLAUDE.md
- [ ] Example in Storybook
- [ ] Used in refactored index.html

---

### Task 2.4: Build Additional E-Commerce Components
**Priority:** MEDIUM
**Effort:** 8 hours (spread across week)

**Components:**
- QuantitySelector
- ReviewStars (display only)
- Breadcrumbs

**Success Criteria:**
- [ ] All components in Storybook
- [ ] Documented usage
- [ ] Accessible
- [ ] Theme-compatible

---

## Phase 2 Deliverables Summary

**Components Built:** 5
- PriceDisplay ✅
- ProductCard ✅
- QuantitySelector ✅
- ReviewStars ✅
- Breadcrumbs ✅

**Documentation:**
- Responsive image pattern ✅
- Component usage examples ✅

---

## Phase 3: Advanced Abstraction (Week 3)

**Goal:** Extract reusable patterns and optimize
**Deliverables:** Product layout component, final optimizations

### Task 3.1: Create Product Layout Component
**Priority:** MEDIUM
**Effort:** 6 hours

**Analysis:**
Current index.html has 3 instances of the same pattern:
1. Image left, content right
2. Image left, content right (different content)
3. Image left, FAQ right

**Options:**
1. Use MediaLockup component (if it supports this use case)
2. Create ProductLayout component
3. Document that `.l-split-half` is sufficient

**Decision:** Test MediaLockup first, create ProductLayout if needed

**Success Criteria:**
- [ ] Reusable pattern identified
- [ ] Component or utility documented
- [ ] Used in index.html refactor

---

### Task 3.2: Optimize Index.html Structure
**Priority:** HIGH
**Effort:** 4 hours

**Optimizations:**
- Replace repeated patterns with components
- Ensure semantic HTML (sections, headings, landmarks)
- Add ARIA labels where needed
- Optimize image loading (lazy loading)
- Add meta tags for SEO

**Success Criteria:**
- [ ] Semantic HTML structure
- [ ] Accessibility audit passes
- [ ] SEO optimized
- [ ] Performance optimized

---

### Task 3.3: Final Validation
**Priority:** CRITICAL
**Effort:** 4 hours

**Validation Checklist:**
- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse Accessibility: 100
- [ ] Lighthouse Best Practices: 100
- [ ] Lighthouse SEO: 100
- [ ] Mobile usability: 100
- [ ] No console errors
- [ ] No layout shift
- [ ] All interactive elements work
- [ ] Cross-browser testing (Chrome, Firefox, Safari)

---

## Phase 3 Deliverables Summary

**Final Metrics:**
- Line count: 316 → ~190 lines (40% reduction) ✅
- Inline styles: 0 ✅
- Components used: Navigation, Banner, FAQ, ButtonGroup, Select, Switch, Price, ProductCard ✅
- Lighthouse scores: All 90+ ✅
- Mobile responsive: YES ✅

---

## Success Metrics Summary

### Code Quality Metrics

| Metric | Before | After | Target | Status |
|--------|--------|-------|--------|--------|
| Total lines | 316 | ~190 | 190 | ✅ |
| Inline styles | 17 | 0 | 0 | ✅ |
| Manual grid code | 3 | 0 | 0 | ✅ |
| Duplicate patterns | 3 | 0 | 0 | ✅ |
| External CSS files | 0 | 1 | 1+ | ✅ |

### Responsiveness Metrics

| Viewport | Before | After | Target |
|----------|--------|-------|--------|
| 320px | Broken | Works | Works ✅ |
| 375px | Broken | Works | Works ✅ |
| 768px | Works | Works | Works ✅ |
| 1024px | Works | Works | Works ✅ |

### Component Usage

| Component | Before | After | Pattern |
|-----------|--------|-------|---------|
| Typography utilities | 0 | ~15 uses | NEW ✅ |
| Grid utilities | 0 | 3 uses | EXISTING ✅ |
| Layout utilities | 0 | 3 uses | EXISTING ✅ |
| PriceDisplay | Manual | 1 use | NEW ✅ |
| ProductCard | N/A | Future | NEW 🔄 |

### Performance Metrics

| Metric | Target | Phase |
|--------|--------|-------|
| Lighthouse Performance | 90+ | Phase 3 |
| Lighthouse Accessibility | 100 | Phase 3 |
| Lighthouse Best Practices | 100 | Phase 3 |
| Lighthouse SEO | 100 | Phase 3 |
| Lighthouse Mobile | 100 | Phase 1 |

---

## Risk Assessment

### High Risk Items
1. **Layout utilities may not stack on mobile**
   - Mitigation: Verify in Task 1.2, add media queries if needed
   - Impact: Medium (adds work but solvable)

2. **Typography utilities may need iteration**
   - Mitigation: Start with minimal set, expand based on usage
   - Impact: Low (can add more classes later)

3. **Refactor may reveal more design system gaps**
   - Mitigation: Document gaps as discovered, defer to Phase 2/3
   - Impact: Medium (may extend timeline)

### Medium Risk Items
4. **Component patterns may not fit all use cases**
   - Mitigation: Build flexible components with variants
   - Impact: Low (can create additional variants)

5. **Browser compatibility issues**
   - Mitigation: Test early, use fallbacks for CSS Grid
   - Impact: Low (modern browsers support all features)

---

## Timeline

**Week 1: Foundation (Critical)**
- Mon: Typography utilities (4h)
- Tue: Layout verification + `/index.css` (4h)
- Wed: Product details section refactor (3h)
- Thu: Product info + FAQ section refactor (4h)
- Fri: Mobile validation (2h)

**Week 2: Components (High Priority)**
- Mon: PriceDisplay component (4h)
- Tue-Wed: ProductCard component (6h)
- Thu: Additional components (4h)
- Fri: Documentation + testing (2h)

**Week 3: Optimization (Medium Priority)**
- Mon-Tue: Product layout pattern (6h)
- Wed: Index.html optimization (4h)
- Thu-Fri: Final validation + testing (4h)

**Total Effort:** ~47 hours (~6 days of full-time work)

---

## Next Actions

**Immediate:**
1. Review this refactor plan with team
2. Get approval to proceed
3. Start Task 1.1 (Typography utilities)

**Blockers:**
- None identified

**Dependencies:**
- Design system tokens (✅ exist)
- Layout utilities (✅ exist, need verification)
- Component infrastructure (✅ exists)
