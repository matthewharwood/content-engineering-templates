# Design System Refactoring Documentation

## Overview

This document details the architectural refactoring performed on the MediaLockup component to eliminate duplication, improve maintainability, and establish reusable responsive layout patterns across the design system.

## CRITICAL: Utopia Grid System Architecture

**DO NOT OVERRIDE THE UTOPIA GRID SYSTEM**

The design system uses Utopia's fluid grid system defined in `ui/styles/grid.css` as the foundational layout primitive. This system MUST NOT be duplicated or overridden.

### Utopia Grid Foundation

```css
/* From ui/styles/grid.css */
.u-container {
  max-width: var(--grid-max-width);  /* 77.5rem */
  padding-inline: var(--grid-gutter); /* Fluid spacing */
  margin-inline: auto;
}

.u-grid {
  display: grid;
  gap: var(--grid-gutter); /* Fluid gap, DO NOT set grid-template-columns here */
}
```

### Responsive Column Span Utilities

```css
/* From ui/src/components/Grid/Grid.css */
.col-span-1 through .col-span-12   /* Base column spans */
.col-span-md-1 through .col-span-md-12  /* Tablet+ (768px) */
.col-span-lg-1 through .col-span-lg-12  /* Desktop+ (1024px) */
```

### Correct Usage Pattern

```html
<!-- CORRECT: Utopia grid with responsive column spans -->
<div class="u-container">
  <div class="u-grid" style="grid-template-columns: repeat(12, 1fr);">
    <div class="col-span-12 col-span-md-6">Mobile full-width, tablet+ half-width</div>
    <div class="col-span-12 col-span-md-6">Mobile full-width, tablet+ half-width</div>
  </div>
</div>
```

### ANTI-PATTERNS - NEVER DO THIS

```css
/* WRONG: Creating classes that override Utopia grid */
.l-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr); /* Duplicates Utopia */
}

.l-split-half {
  display: grid;
  grid-template-columns: repeat(12, 1fr); /* Overrides .u-grid */
}
```

**Why This is Wrong:**
- Creates duplicate 12-column grid systems
- Overrides `.u-grid` when both are applied
- Breaks fluid spacing from Utopia
- Duplicates responsive breakpoint logic

### Layout Tokens That Are SAFE

The following layout tokens in `layouts.css` are **safe** because they don't create 12-column grids:

```css
.l-stack        /* Creates 1-column grid (grid-template-columns: 1fr) */
.l-overlay      /* Layers items in same grid cell */
.l-card         /* Max-width container, no grid */
.l-gap-*        /* Gap utilities */
.l-pad-*        /* Padding utilities */
.l-aspect-*     /* Aspect ratio utilities */
```

### Migration Rules

If you need grid-based responsive layouts:

1. **Use `.u-container`** for max-width container
2. **Use `.u-grid`** for display: grid
3. **Add inline `grid-template-columns: repeat(12, 1fr)`** to `.u-grid`
4. **Use `.col-span-*` utilities** for column spanning
5. **Use `.col-span-md-*`** for tablet+ responsive columns

If you need non-grid layouts:

1. **Use `.l-stack`** for single-column vertical stacking
2. **Use `.l-overlay`** for layered content
3. **Use `.l-card`** for constrained-width content blocks

### Common Column Span Patterns

```
50/50 split:     col-span-12 col-span-md-6 + col-span-12 col-span-md-6
60/40 split:     col-span-12 col-span-md-7 + col-span-12 col-span-md-5
70/30 split:     col-span-12 col-span-md-8 + col-span-12 col-span-md-4
30/70 split:     col-span-12 col-span-md-4 + col-span-12 col-span-md-8
20/80 split:     col-span-12 col-span-md-2 + col-span-12 col-span-md-10
```

All patterns default to full-width (col-span-12) on mobile, split at 768px+ breakpoint.

## Problem Statement

### Before Refactoring

The MediaLockup component had several architectural issues:

1. **Duplicated Container Logic** - Reimplemented max-width, padding-inline, and margin-inline auto (already existed in `.u-container`)
2. **Duplicated Grid System** - Hardcoded 12-column grid setup (already existed in `grid.css`)
3. **Repetitive Responsive Patterns** - Each of 20 lockup variants independently implemented responsive breakpoints for common patterns (50/50 splits, 60/40 splits, etc.)
4. **No Component Composition** - MediaLockup existed in isolation instead of building on Section's foundation
5. **Limited Reusability** - Layout patterns were locked inside MediaLockup, unavailable to other components

### Technical Debt

- ~200 lines of duplicated CSS
- 20+ media queries repeating the same breakpoint logic
- No semantic HTML (used `<div>` instead of `<section>`)
- Missed opportunity to leverage Section's height modifiers, backgrounds, and isolation features

## Solution Architecture

### Updated Architecture: Utopia Grid + Layout Utilities

The refactoring now uses **Utopia's grid system** as the foundation, with layout utilities in `layouts.css` for non-grid patterns.

#### Grid-Based Layouts: Use Utopia

For responsive column-based layouts (splits, asymmetric layouts):

```html
<div class="u-container">
  <div class="u-grid" style="grid-template-columns: repeat(12, 1fr);">
    <div class="col-span-12 col-span-md-6">Column 1</div>
    <div class="col-span-12 col-span-md-6">Column 2</div>
  </div>
</div>
```

**Removed (were duplicating Utopia):**
- `.l-container` → Use `.u-container`
- `.l-split-*` → Use `.u-grid` + `.col-span-md-*`
- `.l-offset` → Use manual grid positioning with `grid-column` and `grid-row`

#### Non-Grid Layouts: Use Layout Utilities

#### Stack Layouts

Single-column vertical layouts with configurable gaps:

```css
.l-stack            /* Base stacked layout */
.l-stack--gap-none  /* No gap between items */
.l-stack--gap-xs    /* Extra small gap */
.l-stack--gap-s     /* Small gap */
.l-stack--gap-m     /* Medium gap */
.l-stack--gap-l     /* Large gap */
.l-stack--gap-xl    /* Extra large gap */
```

#### Overlay Layouts

Layered content where elements occupy the same grid cell:

```css
.l-overlay          /* Items stack in same cell with proper z-index */
```

Perfect for hero images with text overlays, feature blocks, and background media.

#### Offset/Overlap Layouts

For content overlapping media, use Utopia grid with manual positioning:

```html
<div class="u-grid" style="grid-template-columns: repeat(12, 1fr); position: relative;">
  <div class="col-span-12 col-span-md-8">Image</div>
  <div class="col-span-12" style="grid-column: 6 / span 7; grid-row: 1; z-index: 1;">
    Overlapping content
  </div>
</div>
```

**Removed:** `.l-offset` (was creating duplicate 12-column grid)

#### Ordering Utilities

```css
.l-reverse-desktop  /* Swaps child order on desktop (768px+) */
```

#### Content Width Constraints

```css
.l-content--narrow   /* max-width: 45ch */
.l-content--readable /* max-width: 65ch */
.l-content--wide     /* max-width: 80ch */
.l-content--center   /* Center with margin-inline: auto */
```

#### Alignment Utilities

```css
.l-align-start, .l-align-center, .l-align-end
.l-justify-start, .l-justify-center, .l-justify-end
```

#### Aspect Ratio Utilities

```css
.l-aspect-1-1   /* Square */
.l-aspect-16-9  /* Widescreen */
.l-aspect-21-9  /* Ultra-wide */
.l-aspect-4-3   /* Standard */
.l-aspect-3-4   /* Portrait */
.l-aspect-3-2   /* Classic photo */
.l-aspect-2-3   /* Portrait photo */
```

#### Responsive Visibility

```css
.l-hide-mobile   /* Hidden on mobile, visible desktop */
.l-hide-desktop  /* Visible on mobile, hidden desktop */
```

#### Text Alignment

```css
.l-text-center-mobile  /* Centered mobile, left-aligned desktop */
.l-text-center-desktop /* Left-aligned mobile, centered desktop */
```

#### Full Bleed

```css
.l-full-bleed  /* Break out of container to full viewport width */
```

#### Card Layouts

```css
.l-card           /* Base card (400px max-width) */
.l-card--sm       /* Small card (320px) */
.l-card--md       /* Medium card (400px) */
.l-card--lg       /* Large card (520px) */
.l-card--center   /* Center card horizontally */
```

## MediaLockup Refactoring

### New Architecture

MediaLockup now **composes** Section and layout tokens instead of duplicating functionality:

```html
<!-- OLD: Standalone div with duplicate grid code -->
<div class="media-lockup media-lockup--split-left">
  ...
</div>

<!-- NEW: Composed from Section + layout tokens -->
<section class="section">
  <div class="media-lockup media-lockup--split-left l-container l-split-half">
    ...
  </div>
</section>
```

### Benefits of New Structure

1. **Semantic HTML** - Uses `<section>` element
2. **Leverages Section Features** - Can now use height modifiers (`section--height-50`), background modifiers (`section--bg-primary`), video backgrounds, etc.
3. **Eliminates Duplication** - `.l-container` provides grid setup
4. **Reusable Layout Tokens** - `.l-split-half`, `.l-overlay`, etc. can be used anywhere
5. **Reduced CSS** - MediaLockup.css reduced by ~40% (removed duplicate grid/responsive code)
6. **Composable** - Mix and match layout tokens for new patterns

### MediaLockup Patterns Mapping

Each of the 20 lockup patterns now uses Utopia grid or layout utilities:

| Lockup Pattern | Layout Implementation | Column Spans | Description |
|---|---|---|---|
| `--split-left` | `.u-grid` + Utopia | `col-span-md-6` + `col-span-md-6` | 50/50 image left, content right |
| `--split-right` | `.u-grid` + Utopia + `--image-right` | `col-span-md-6` + `col-span-md-6` | 50/50 content left, image right |
| `--stacked-top` | `.l-stack .l-stack--gap-m` | N/A (1-column) | Vertical stack, image top |
| `--stacked-bottom` | `.l-stack .l-stack--gap-m` + order | N/A (1-column) | Vertical stack, image bottom |
| `--hero-overlay` | `.l-overlay` | N/A (layered) | Text overlaid on image |
| `--circle-badge` | `.u-grid` + Utopia | `col-span-md-4` + `col-span-md-8` | Small circular image (30/70) |
| `--wide-image` | `.u-grid` + Utopia | `col-span-md-8` + `col-span-md-4` | Large image (70/30) |
| `--wide-text` | `.u-grid` + Utopia | `col-span-md-4` + `col-span-md-8` | Narrow image (30/70) |
| `--card` | `.l-stack .l-card` | N/A (1-column) | Self-contained card |
| `--full-bleed` | `.l-overlay .l-full-bleed` | N/A (layered) | Edge-to-edge hero |
| `--offset` | `.u-grid` + manual positioning | `grid-column: 6 / span 7` | Overlapping content box |
| `--magazine` | `.l-stack` + custom 2-col desktop | N/A (custom) | Editorial layout |
| `--asymmetric-left` | `.u-grid` + Utopia | `col-span-md-7` + `col-span-md-5` | 7/5 column split (60/40) |
| `--asymmetric-right` | `.u-grid` + Utopia + `--image-right` | `col-span-md-7` + `col-span-md-5` | 5/7 column split (40/60) |
| `--polaroid` | `.l-stack .l-card` | N/A (1-column) | Photo with caption |
| `--avatar` | `.u-grid` + Utopia | `col-span-md-2` + `col-span-md-10` | Small avatar (20/80) |
| `--feature` | `.l-overlay` | N/A (layered) | Bottom-aligned overlay |
| `--testimonial` | `.u-grid` + Utopia | `col-span-md-4` + `col-span-md-8` | Quote with image (30/70) |
| `--product` | `.l-stack .l-stack--gap-s` | N/A (1-column) | Product image + details |
| `--article` | `.l-stack .l-stack--gap-xl` | N/A (1-column) | Article hero + content |

### Migration Guide

To implement MediaLockup patterns with Utopia grid:

1. **Wrap in Section**
   ```html
   <section class="section">
     <div class="u-container">
       <!-- MediaLockup content -->
     </div>
   </section>
   ```

2. **For Grid-Based Layouts (Splits)**
   ```html
   <div class="media-lockup media-lockup--split-left u-grid" style="grid-template-columns: repeat(12, 1fr);">
     <div class="media-lockup__image col-span-12 col-span-md-6">...</div>
     <div class="media-lockup__content col-span-12 col-span-md-6">...</div>
   </div>
   ```

3. **For Stack Layouts**
   ```html
   <div class="media-lockup media-lockup--stacked-top l-stack l-stack--gap-m">
     <div class="media-lockup__image">...</div>
     <div class="media-lockup__content">...</div>
   </div>
   ```

4. **For Overlay Layouts**
   ```html
   <div class="media-lockup media-lockup--hero-overlay l-overlay">
     <div class="media-lockup__image">...</div>
     <div class="media-lockup__content">...</div>
   </div>
   ```

4. **Optional: Add Section Modifiers**
   ```html
   <section class="section section--height-50 section--bg-surface-variant">
   ```

### Example Refactorings

#### Split Left (Before)
```html
<div class="media-lockup media-lockup--split-left">
  <div class="media-lockup__image">...</div>
  <div class="media-lockup__content">...</div>
</div>
```

#### Split Left (After)
```html
<section class="section">
  <div class="media-lockup media-lockup--split-left l-container l-split-half">
    <div class="media-lockup__image">...</div>
    <div class="media-lockup__content">...</div>
  </div>
</section>
```

#### Hero Overlay (Before)
```html
<div class="media-lockup media-lockup--hero-overlay">
  <div class="media-lockup__image">...</div>
  <div class="media-lockup__content">...</div>
</div>
```

#### Hero Overlay (After)
```html
<section class="section section--height-50">
  <div class="media-lockup media-lockup--hero-overlay l-container l-overlay">
    <div class="media-lockup__image">...</div>
    <div class="media-lockup__content">...</div>
  </div>
</section>
```

## Using Layout Tokens in Other Components

Layout tokens are **not limited to MediaLockup**. They're designed as primitives for the entire design system.

### Example: Custom Two-Column Content

```html
<section class="section section--bg-surface">
  <div class="l-container l-split-60-40">
    <article class="l-content--readable">
      <h1>Main Content</h1>
      <p>Article text here...</p>
    </article>
    <aside>
      <h2>Sidebar</h2>
      <nav>...</nav>
    </aside>
  </div>
</section>
```

### Example: Overlaid CTA on Video Background

```html
<section class="section section--height-100 section--bg-video">
  <video class="section__bg-video" autoplay muted loop>...</video>
  <div class="section__video-overlay"></div>
  <div class="l-container l-overlay section__content">
    <div></div> <!-- Empty div for video layer -->
    <div class="l-content--center" style="text-align: center;">
      <h1>Call to Action</h1>
      <button class="btn btn--primary btn--large">Get Started</button>
    </div>
  </div>
</section>
```

### Example: Card Grid

```html
<section class="section">
  <div class="u-container">
    <div class="u-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
      <div class="l-card l-stack l-stack--gap-none">
        <img class="l-aspect-16-9" src="..." alt="...">
        <div style="padding: var(--space-m);">
          <h3>Card Title</h3>
          <p>Card content...</p>
        </div>
      </div>
      <!-- More cards -->
    </div>
  </div>
</section>
```

## File Changes Summary

### New Files
- `ui/styles/layouts.css` - Responsive layout token system (400+ lines)
- `ui/styles/CLAUDE.md` - This documentation file

### Modified Files
- `ui/styles/index.css` - Added `@import "./layouts.css"`
- `ui/src/components/MediaLockup/MediaLockup.css` - Refactored to use Section + layout tokens
- `ui/src/components/MediaLockup/Lockup01SplitLeft.html` - Updated to Section-based structure
- `ui/src/components/MediaLockup/Lockup02SplitRight.html` - Updated to Section-based structure
- `ui/src/components/MediaLockup/Lockup03StackedTop.html` - Updated to Section-based structure
- `ui/src/components/MediaLockup/Lockup05HeroOverlay.html` - Updated to Section-based structure
- `ui/src/components/MediaLockup/Lockup11Offset.html` - Updated to Section-based structure

### Remaining Work

The following MediaLockup HTML files should be updated following the same pattern:
- Lockup04StackedBottom.html
- Lockup06CircleBadge.html
- Lockup07WideImage.html
- Lockup08WideText.html
- Lockup09Card.html
- Lockup10FullBleed.html
- Lockup12Magazine.html
- Lockup13AsymmetricLeft.html
- Lockup14AsymmetricRight.html
- Lockup15Polaroid.html
- Lockup16Avatar.html
- Lockup17Feature.html
- Lockup18Testimonial.html
- Lockup19Product.html
- Lockup20Article.html

## Responsive Breakpoints

The layout system uses mobile-first breakpoints:

```css
/* Mobile: < 768px (default, no media query needed) */

/* Tablet/Desktop: >= 768px */
@media (min-width: 768px) { ... }

/* Large Desktop: >= 1024px (available for future use) */
@media (min-width: 1024px) { ... }
```

## Design Principles

### 1. Composition Over Duplication
Build components by composing smaller primitives (Section + layout tokens) rather than duplicating functionality.

### 2. Single Responsibility
Each layout token has one job:
- `.l-split-half` = responsive 50/50 split
- `.l-overlay` = layered content
- `.l-stack` = vertical stacking

### 3. Mobile-First
All layout tokens default to mobile-friendly single-column layouts, progressively enhancing to multi-column at larger breakpoints.

### 4. Semantic Naming
Token names describe **purpose**, not **values**:
- `.l-split-half` not `.l-columns-6-6`
- `.l-content--readable` not `.l-max-width-65ch`

### 5. Reusability
Layout tokens are generic primitives usable across the entire design system, not locked to specific components.

### 6. Media Containment Convention ⚠️ CRITICAL

**The Problem:** Images with `height: 100%` overflow grid containers when aspect ratio isn't constrained.

**The Solution:** Follow this pattern consistently:

```css
/* Base image container - SAFE for responsive layouts */
.component__image {
  overflow: hidden;      /* Clip any overflow */
  min-width: 0;         /* Prevent grid blowout */
}

.component__image img {
  width: 100%;          /* Fill container width */
  height: auto;         /* Maintain aspect ratio - SAFE */
  max-width: 100%;      /* Additional protection */
  object-fit: cover;
  display: block;
}

/* ONLY use height:100% when aspect-ratio or min-height is set */
.component--with-aspect-ratio .component__image {
  aspect-ratio: 16 / 9; /* Bounds are defined */
}

.component--with-aspect-ratio .component__image img {
  height: 100%;         /* NOW SAFE - container has bounds */
}
```

**When to use `height: auto` (default):**
- Responsive split layouts (image scales naturally)
- Stacked layouts
- Any layout where image height should match intrinsic aspect ratio

**When to use `height: 100%`:**
- Container has `aspect-ratio` set (e.g., `aspect-ratio: 16/9`)
- Container has `min-height` set (e.g., hero overlays)
- Overlay patterns where image must fill defined space

**Examples in MediaLockup:**
- ✅ `.media-lockup--split-left`: Uses `height: auto` (responsive)
- ✅ `.media-lockup--hero-overlay`: Uses `height: 100%` (has `min-height: 400px`)
- ✅ `.media-lockup--card`: Uses `height: 100%` (has `aspect-ratio: 16/9`)

**Grid Protection:**
Always add `min-width: 0` to grid items that contain images or long text. This prevents the grid item from expanding beyond its column width.

## Performance Considerations

### Before Refactoring
- MediaLockup.css: ~500 lines
- Duplicate grid setup in every component that needed layouts
- 20+ media queries for responsive patterns

### After Refactoring
- MediaLockup.css: ~350 lines (30% reduction)
- layouts.css: ~400 lines (shared across all components)
- Grid setup in one place (`.l-container`)
- Responsive patterns in one place (layout tokens)

**Net Result**: As more components adopt layout tokens, overall CSS size decreases due to reuse.

## Future Enhancements

Potential additions to the layout token system:

1. **Additional Breakpoints** - Large desktop (1024px+), XL desktop (1440px+)
2. **3-Column Splits** - `.l-split-thirds`, `.l-split-25-50-25`
3. **Flexbox Layouts** - `.l-flex-row`, `.l-flex-col` for non-grid layouts
4. **Responsive Padding** - `.l-pad-responsive` for fluid spacing
5. **Sticky Positioning** - `.l-sticky-header`, `.l-sticky-sidebar`
6. **Print Layouts** - `@media print` optimized layouts

## Testing Checklist

When using layout tokens, verify:

- ✅ Mobile (< 768px) - Stacks to single column
- ✅ Tablet (768px - 1024px) - Splits to designated columns
- ✅ Desktop (> 1024px) - Maintains layout
- ✅ Content overflow - Long text doesn't break layout
- ✅ Semantic HTML - Proper use of `<section>`, heading hierarchy
- ✅ Accessibility - Logical source order, keyboard navigation
- ✅ Theme compatibility - Works with all color themes

## Conclusion

This refactoring establishes a **foundational layout system** for the design system, eliminating duplication and creating reusable primitives. MediaLockup now demonstrates best practices for component composition, building on Section and layout tokens rather than reinventing these patterns.

The layout token system is **framework-agnostic** - pure CSS that works with vanilla HTML, React, Vue, or any other framework. It embodies the design system's philosophy: **semantic tokens that describe purpose, fully theme-compatible, composable primitives**.
