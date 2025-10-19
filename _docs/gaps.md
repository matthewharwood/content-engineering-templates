# Design System Gaps Analysis

This document tracks missing components, utilities, and patterns needed to build production-quality e-commerce pages efficiently.

---

## Critical Gaps (Blocking Productivity)

### 1. Typography Utility Classes
**Status:** MISSING
**Impact:** HIGH - Forces inline styles for all typography
**Current State:** Typography tokens exist (`--step-0` through `--step-8`) but no utility classes to apply them
**What's Needed:**
```css
.type-body { font-size: var(--step-0); line-height: 1.6; }
.type-heading-1 { font-size: var(--step-4); font-weight: 700; line-height: 1.2; }
.type-heading-2 { font-size: var(--step-3); font-weight: 700; line-height: 1.2; }
.type-heading-3 { font-size: var(--step-2); font-weight: 600; line-height: 1.3; }
.type-label { font-size: var(--step--1); font-weight: 500; text-transform: uppercase; }
.type-price { font-size: var(--step-2); font-weight: 600; color: var(--color-primary); }
```

**Example Use Case:** Product titles, descriptions, prices all currently use inline styles
```html
<!-- Current (bad) -->
<h2 style="font-family: var(--font-sans); font-size: var(--step-3); font-weight: 700;">me</h2>

<!-- Desired (good) -->
<h2 class="type-heading-2">me</h2>
```

---

### 2. Mobile-First Grid System
**Status:** PARTIALLY MISSING
**Impact:** CRITICAL - Mobile is currently broken
**Current State:**
- Utopia grid exists (`.u-container`, `.u-grid`, `.col-span-*`)
- Layout utilities exist (`.l-split-half`, etc.) but documentation unclear on mobile behavior
- Current index.html uses manual grid code with no responsive breakpoints

**What's Needed:**
- Clear mobile-first grid documentation
- Responsive column classes (`.col-span-12 .col-span-md-6`)
- Or better documentation on using `.l-split-*` utilities for responsive layouts
- Mobile stacking behavior for all layout utilities

**Example Use Case:** Product detail pages need 1-column mobile, 2-column desktop
```html
<!-- Current (broken on mobile) -->
<div style="display: grid; grid-template-columns: repeat(12, 1fr);">
  <div style="grid-column: span 6;">Image</div>
  <div style="grid-column: span 6;">Details</div>
</div>

<!-- Desired (responsive) -->
<div class="u-container l-split-half">
  <div>Image</div>
  <div>Details</div>
</div>
```

---

### 3. Responsive Image Container Pattern
**Status:** PARTIALLY MISSING
**Impact:** MEDIUM - Forces manual styling for responsive images
**Current State:**
- `.img--cover` exists for image object-fit
- AspectRatio component exists
- No pattern for "responsive image container that fills column"

**What's Needed:**
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

**Example Use Case:** Product images in grid layouts
```html
<!-- Current -->
<img src="..." class="img--cover" style="width: 100%; height: auto;">

<!-- Desired -->
<div class="img-container">
  <img src="..." class="img--cover">
</div>
```

---

## High Priority Gaps (Missing E-Commerce Components)

### 4. ProductCard Component
**Status:** MISSING
**Impact:** HIGH - Needed for product grids/collections
**What's Needed:**
- Card container with consistent sizing
- Product image with aspect ratio lock
- Product name, category, price layout
- Hover states and effects
- Quick add-to-cart button

**Use Cases:**
- Collection pages showing multiple products
- Related products sections
- Search results
- Category landing pages

---

### 5. PriceDisplay Component
**Status:** MISSING
**Impact:** MEDIUM - Price formatting inconsistent
**What's Needed:**
- Consistent price typography and color
- Sale price vs. regular price display
- Price range display (from $X to $Y)
- Subscription savings indicators

**Current Workaround:** Inline styles with manual formatting
```html
<!-- Current -->
<p style="font-size: var(--step-2); font-weight: 600; color: var(--color-primary);">$55</p>

<!-- Desired -->
<span class="price">$55</span>
<span class="price price--sale">
  <span class="price__original">$65</span>
  <span class="price__current">$55</span>
</span>
```

---

### 6. QuantitySelector Component
**Status:** MISSING
**Impact:** MEDIUM - Core e-commerce functionality
**What's Needed:**
- Increment/decrement buttons
- Number input with validation
- Min/max quantity constraints
- Disabled states for out-of-stock

---

### 7. ReviewStars Component
**Status:** MISSING
**Impact:** LOW - Social proof element
**What's Needed:**
- Star rating display (filled/half/empty stars)
- Review count display
- Interactive vs. display-only variants
- Accessible rating information

---

### 8. Breadcrumbs Component
**Status:** MISSING
**Impact:** MEDIUM - Navigation and SEO
**What's Needed:**
- Hierarchical navigation trail
- Active/inactive states
- Separator styling
- Schema.org markup for SEO

---

### 9. Product Image Gallery
**Status:** MISSING
**Impact:** HIGH - Standard product page feature
**What's Needed:**
- Multiple product images in grid
- Thumbnail navigation
- Zoom on click/hover
- Mobile swipe support
- Main image display area

---

### 10. Variant Selector Component
**Status:** MISSING
**Impact:** HIGH - Product configuration
**What's Needed:**
- Color swatch selector (visual circles/squares)
- Scent selector variant
- Out-of-stock indicators
- Selected state styling
- Accessibility for color selection

**Current Workaround:** ButtonGroup used for size selection (works okay)

---

### 11. Cart Drawer/Sidebar
**Status:** MISSING
**Impact:** MEDIUM - Shopping experience
**What's Needed:**
- Slide-in drawer component
- Cart item list with quantities
- Subtotal calculation display
- Empty cart state
- Checkout button

---

### 12. Size Guide Modal/Drawer
**Status:** MISSING
**Impact:** LOW - Reduces returns
**What's Needed:**
- Modal or drawer component for size information
- Size chart table display
- Measurement guide content area
- Close/dismiss interactions

---

## Medium Priority Gaps (Layout Utilities)

### 13. Product Layout Component
**Status:** MISSING (Pattern Exists but Not Abstracted)
**Impact:** MEDIUM - Repeated pattern in index.html
**Current State:** Same 6/6 grid layout repeated 3 times with inline styles

**What's Needed:**
A reusable component for the common "image left/right, content right/left" pattern.

**Pattern Analysis:**
```html
<!-- This pattern appears 3 times with slight variations: -->
<div class="u-container">
  <div class="u-grid">
    <div class="col-span-6">IMAGE</div>
    <div class="col-span-6">CONTENT</div>
  </div>
</div>
```

**Proposed Solution:** Either:
1. Document that `.l-split-half` handles this (if it does)
2. Create a `.product-layout` component
3. Extend MediaLockup component for product use cases

---

### 14. Sticky Product Details Pattern
**Status:** MISSING
**Impact:** LOW - UX enhancement
**What's Needed:**
- Sticky positioning for product details while scrolling images
- Mobile behavior (non-sticky on mobile, sticky on desktop)
- Z-index management

---

### 15. Product Comparison Table
**Status:** MISSING
**Impact:** LOW - Advanced feature
**What's Needed:**
- Multi-column comparison layout
- Feature rows with yes/no or text values
- Highlight differences
- Mobile horizontal scroll

---

## Font Token Gaps

### 16. Font Weight Utilities
**Status:** PARTIALLY MISSING
**Impact:** LOW - Forces manual font-weight declarations
**Current State:** Font tokens exist but no weight utilities

**What's Needed:**
```css
.font-light { font-weight: 300; }
.font-regular { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

---

## Grid System Documentation Gaps

### 17. Layout Utility Mobile Behavior
**Status:** UNCLEAR DOCUMENTATION
**Impact:** MEDIUM - Causes incorrect usage
**Current State:**
- `.l-split-half`, `.l-split-60-40`, etc. exist
- Unclear if these automatically stack on mobile
- Unclear breakpoint behavior

**What's Needed:**
- Clear documentation of mobile-first behavior
- Examples showing mobile stacking → desktop split
- Breakpoint reference table

---

## Summary Statistics

**Total Gaps Identified:** 17

**By Priority:**
- CRITICAL: 1 (Mobile responsiveness)
- HIGH: 5 (Typography utilities, ProductCard, Image Gallery, Variant Selector, Product Layout)
- MEDIUM: 7 (Image containers, Price Display, Quantity Selector, Breadcrumbs, Cart Drawer, Documentation, Sticky Details)
- LOW: 4 (Review Stars, Size Guide, Comparison Table, Font Weights)

**By Category:**
- Missing Utilities: 3
- Missing Components: 11
- Missing Documentation: 2
- Missing Patterns: 1

**Blocking Refactor:** 3 gaps
- Typography utility classes
- Mobile-first grid system clarity
- Responsive image container pattern

**Next Component to Build:** Typography utility classes (highest ROI, unblocks refactor)
