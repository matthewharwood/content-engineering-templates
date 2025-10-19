# Bug Tracker

This document tracks all bugs encountered during development.

---

## Open Bugs

### BUG-001: Mobile Responsiveness Completely Broken
**Date Discovered:** 2025-10-18
**Severity:** CRITICAL
**Component:** index.html layout
**Discovered By:** CSS Performance Engineer

**Description:**
All product sections in index.html use fixed 6-column grid layouts without responsive breakpoints. On mobile viewports (< 768px), content remains in two-column layout causing:
- Text too small to read
- Images too small to see
- Buttons too small to tap
- Horizontal overflow in some cases

**Reproduction Steps:**
1. Open `/index.html` in browser
2. Resize viewport to 375px width (mobile)
3. Observe product sections (lines 74-280)
4. Content remains in two-column layout

**Affected Code:**
```html
<!-- Lines 74-81, 183-190, 223-232 -->
<div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--grid-gutter);">
  <div style="grid-column: span 6;"><!-- Image --></div>
  <div style="grid-column: span 6;"><!-- Content --></div>
</div>
```

**Expected Behavior:**
- Mobile (< 768px): Single column, stacked vertically
- Desktop (768px+): Two columns, side-by-side

**Root Cause:**
Manual grid implementation with no media queries or responsive utilities.

**Impact:**
- Page unusable on mobile devices
- Poor SEO (mobile-first indexing)
- Fails accessibility standards
- Negative user experience

**Status:** OPEN
**Priority:** P0 - Must fix before any production deployment
**Assigned To:** TBD
**Blocked By:** None
**Related:** GAP-002 (Mobile-First Grid System), ADR-004 (Mobile-First Grid Strategy)

---

### BUG-002: Inline Styles Prevent Theme Switching
**Date Discovered:** 2025-10-18
**Severity:** HIGH
**Component:** index.html typography and layout
**Discovered By:** CSS Performance Engineer

**Description:**
17 inline style declarations in index.html use design tokens directly in `style=""` attributes. While this uses tokens, it prevents:
- Runtime theme switching
- Component-level style overrides
- Consistent cascade management
- Maintainability

**Reproduction Steps:**
1. Open `/index.html`
2. Search for `style="` attribute
3. Observe 17 instances across product sections

**Examples:**
```html
<!-- Line 87 -->
<h2 style="font-family: var(--font-sans); font-size: var(--step-3); font-weight: 700;">me</h2>

<!-- Line 90 -->
<p style="font-family: var(--font-sans); font-size: var(--step-0); line-height: 1.6;">description</p>

<!-- Line 93 -->
<p style="font-family: var(--font-sans); font-size: var(--step-2); font-weight: 600; color: var(--color-primary);">$55</p>
```

**Expected Behavior:**
Typography styling should use CSS classes:
```html
<h2 class="type-heading-2">me</h2>
<p class="type-body">description</p>
<p class="type-price">$55</p>
```

**Root Cause:**
Typography utility classes don't exist in design system.

**Impact:**
- Harder to maintain consistent typography
- Inline styles increase HTML file size
- Can't override styles with CSS cascade
- Theme switching may not work properly
- Violates component architecture principles

**Status:** OPEN
**Priority:** P1 - Should fix before production
**Blocked By:** GAP-001 (Typography Utility Classes)
**Related:** ADR-003 (Typography Utility Approach)

---

### BUG-003: Duplicate Grid Pattern Implementation
**Date Discovered:** 2025-10-18
**Severity:** MEDIUM
**Component:** index.html layout architecture
**Discovered By:** CSS Performance Engineer, Viral Commerce Architect

**Description:**
The same grid layout pattern is manually implemented 3 times with identical code:
1. Product details section (lines 74-81)
2. Product info section (lines 183-190)
3. Product FAQ section (lines 223-232)

This creates:
- Code duplication (WET vs DRY principle)
- Maintenance burden (must update 3 places)
- Inconsistency risk (patterns drift over time)
- Missed abstraction opportunity

**Reproduction Steps:**
1. Open `/index.html`
2. Compare grid code at lines 74-81, 183-190, 223-232
3. Notice identical structure and styling

**Pattern:**
```html
<div style="max-width: var(--grid-max-width); margin-inline: auto; padding: var(--space-3xl) var(--grid-gutter);">
  <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--grid-gutter);">
    <div style="grid-column: span 6;">LEFT CONTENT</div>
    <div style="grid-column: span 6;">RIGHT CONTENT</div>
  </div>
</div>
```

**Expected Behavior:**
Should use existing design system utilities:
```html
<div class="u-container l-split-half">
  <div>LEFT CONTENT</div>
  <div>RIGHT CONTENT</div>
</div>
```

Or create a product layout component if pattern is specific to product pages.

**Root Cause:**
- Unawareness of existing layout utilities
- Unclear documentation on `.l-split-*` usage
- Missing product-specific layout component

**Impact:**
- Harder to maintain (3 places to update)
- Larger HTML file size
- Inconsistent spacing if manually updated
- Doesn't leverage design system

**Status:** OPEN
**Priority:** P2 - Should fix for maintainability
**Blocked By:** None (utilities exist)
**Related:** GAP-013 (Product Layout Component), ADR-001 (Refactor Strategy)

---

### BUG-004: Inline Style Block Should Be External CSS
**Date Discovered:** 2025-10-18
**Severity:** LOW
**Component:** index.html lines 282-298
**Discovered By:** CSS Performance Engineer

**Description:**
Small inline `<style>` block (16 lines) contains page-specific styles that should be in external CSS file for:
- Browser caching
- Code organization
- Separation of concerns
- Maintainability

**Current Code (lines 282-298):**
```html
<style>
  body {
    margin: 0;
    padding: 0;
    background-color: var(--color-background);
  }

  .hero-image-full-bleed {
    width: 100%;
    margin: 0;
  }

  .hero-image-full-bleed .img-aspect {
    border-radius: 0;
  }
</style>
```

**Expected Behavior:**
Create `/index.css` and move all page-specific styles there.

**Root Cause:**
Quick prototyping without proper CSS architecture.

**Impact:**
- Minor performance impact (no caching)
- Violates separation of concerns
- Harder to maintain as page grows
- Sets bad example for other pages

**Status:** OPEN
**Priority:** P3 - Nice to fix
**Blocked By:** None
**Related:** ADR-001 (Refactor Strategy - Phase 1)

---

## Resolved Bugs

_No resolved bugs yet._

---

## Bug Statistics

**Total Open Bugs:** 4
**By Severity:**
- CRITICAL: 1
- HIGH: 1
- MEDIUM: 1
- LOW: 1

**By Component:**
- index.html layout: 4
- Design system: 0

**Average Age:** < 1 day (all discovered 2025-10-18)
