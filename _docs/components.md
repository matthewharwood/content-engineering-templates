# Component Catalog

This document provides a comprehensive catalog of all components in the content-engineering-templates project, including both CSS-based components and web components.

---

## Table of Contents

- [Web Components](#web-components)
- [CSS-Based Components](#css-based-components)
- [Layout Utilities](#layout-utilities)
- [Component Status Legend](#component-status-legend)

---

## Component Status Legend

- **Stable** - Production-ready, fully documented
- **Beta** - Functional but may have minor API changes
- **Alpha** - Experimental, API unstable
- **Deprecated** - No longer recommended, will be removed

---

## Web Components

Web components use the native Custom Elements API and integrate with the design system via Light DOM.

### Storefront

**Type:** Web Component (Custom Element)
**Status:** Stable
**Location:** `/ui/src/components/Storefront/`
**Custom Elements:** `<storefront-component>`, `<storefront-assets>`, `<storefront-form>`

**Purpose:**
Creates a responsive 50/50 lockup layout for product pages. Components act as semantic wrappers for declarative HTML structure.

**Architecture:**
- **Declarative HTML** - Structure defined in markup, not JavaScript
- **Semantic wrappers** - Components add CSS classes only, no DOM manipulation
- **External CSS only** - All styles in Storefront.css, no inline injection
- Parent container (`<storefront-component>`) provides grid layout wrapper
- Left child (`<storefront-assets>`) for product media/images
- Right child (`<storefront-form>`) for product details/purchase form
- No Shadow DOM - integrates with global design tokens
- Minimal JavaScript - only `connectedCallback()` to add CSS classes

**Usage Example:**
```html
<head>
  <link rel="stylesheet" href="./ui/styles/index.css">
  <link rel="stylesheet" href="./ui/src/components/Storefront/Storefront.css">
</head>
<body>
  <!-- HTML structure is declarative - defined in markup -->
  <storefront-component class="storefront">
    <div class="storefront-container">
      <div class="storefront-grid">
        <div class="storefront-grid__left">
          <storefront-assets class="storefront-assets">
            <div class="storefront-assets__content">
              <!-- Product media content -->
              <h2 class="storefront-assets__title">Product Images</h2>
              <p>Image gallery goes here</p>
            </div>
          </storefront-assets>
        </div>
        <div class="storefront-grid__right">
          <storefront-form class="storefront-form">
            <div class="storefront-form__content">
              <!-- Product form content -->
              <h2 class="storefront-form__title">Product Details</h2>
              <p>Product information and purchase form here</p>
              <button class="storefront-form__button">Add to Cart</button>
            </div>
          </storefront-form>
        </div>
      </div>
    </div>
  </storefront-component>

  <script type="module" src="./ui/src/components/Storefront/Storefront.js"></script>
  <script type="module" src="./ui/src/components/Storefront/StorefrontAssets.js"></script>
  <script type="module" src="./ui/src/components/Storefront/StorefrontForm.js"></script>
</body>
```

**Design Tokens Used:**

*Colors:*
- `--color-primary`, `--color-on-primary` (StorefrontAssets background)
- `--color-surface-variant`, `--color-on-surface-variant` (StorefrontForm background)
- `--color-on-surface` (text)

*Spacing:*
- `--space-s`, `--space-m`, `--space-l` (padding, gaps)

*Typography:*
- `--font-sans` (all text)
- `--step-0`, `--step-2`, `--step-4` (font sizes)

**Responsive Behavior:**
- **Mobile (< 768px):** Stacks vertically (full width)
- **Desktop (768px+):** 50/50 horizontal split
- **Heights:** Configured via CSS (`min-height` properties)

**Files:**
```
/ui/src/components/Storefront/
  Storefront.js              # Parent component (semantic wrapper, ~33 lines)
  StorefrontAssets.js        # Left child (semantic wrapper, ~33 lines)
  StorefrontForm.js          # Right child (semantic wrapper, ~34 lines)
  Storefront.css             # All component styles (external CSS)
  StorefrontDefault.html     # Declarative HTML usage example
  Storefront.stories.js      # Storybook integration
  README.md                  # Component documentation
  ARCHITECTURE.md            # Technical decisions
  QUICK_START.md             # 5-minute integration guide
  ARCHITECTURE_DIAGRAM.md    # Visual diagrams
  CHECKLIST.md               # Validation checklist
```

**Browser Support:**
Chrome 67+, Firefox 63+, Safari 12.1+, Edge 79+

**Key Principles:**
- **Declarative HTML** - Structure in markup, not JavaScript
- **Minimal JavaScript** - Components only add CSS classes (no DOM manipulation)
- **External CSS only** - All styles in Storefront.css (no inline injection)
- **Semantic wrappers** - Custom elements enhance HTML, don't create it
- **Progressive enhancement** - HTML/CSS work without JavaScript

**Documentation:**
- Component README: `/ui/src/components/Storefront/README.md`
- Architecture decisions: `/ui/src/components/Storefront/ARCHITECTURE.md`
- Quick Start: `/ui/src/components/Storefront/QUICK_START.md`
- ADR-005: Web Components File Organization (`_docs/decisions.md`)
- ADR-006: Web Component Shadow DOM Strategy (`_docs/decisions.md`)
- ADR-007: Web Component Declarative HTML Architecture (`_docs/decisions.md`)
- Web Components Dev Guide: `_docs/web-components.md`

**Related Components:**
- MediaLockup (CSS-based alternative for simpler layouts)
- Section (semantic container)

---

## CSS-Based Components

Traditional components using HTML + CSS (no JavaScript).

### Button

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/Button/`

**Purpose:**
Button variations for primary, secondary, tertiary, and outline styles with multiple sizes.

**Variants:**
- Primary, Secondary, Tertiary, Outline
- Sizes: Small, Medium, Large
- Shapes: Rectangle, Pill, Circle
- States: Default, Hover, Active, Disabled

**Design Tokens Used:**
- Colors: `--color-primary`, `--color-secondary`, `--color-surface`
- Spacing: `--space-s`, `--space-m`, `--space-l`
- Typography: `--font-sans`, `--step-0`

**Usage:**
```html
<button class="btn btn--primary btn--large btn--pill">
  Add to Cart
</button>
```

---

### Navigation

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/Navigation/`

**Purpose:**
Sticky navigation bar with left, center, and right sections for logo and actions.

**Design Tokens Used:**
- Colors: `--color-surface`, `--color-on-surface`
- Spacing: `--space-m`, `--space-l`
- Typography: `--font-sans`

**Usage:**
```html
<nav class="navigation">
  <div class="navigation__container">
    <div class="navigation__left"><!-- Links --></div>
    <div class="navigation__center"><!-- Logo --></div>
    <div class="navigation__right"><!-- Actions --></div>
  </div>
</nav>
```

---

### MediaLockup

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/MediaLockup/`

**Purpose:**
50/50 media and content split layout with responsive behavior. CSS-based alternative to Storefront web component.

**Variants:**
- Image Left (default)
- Image Right (`.media-lockup--image-right`)

**Design Tokens Used:**
- Layout: `.l-container`, `.l-split-half`
- Spacing: `--space-l`, `--space-m`
- Typography: design system type scale

**Usage:**
```html
<div class="media-lockup l-container l-split-half">
  <div class="media-lockup__image">
    <img src="product.jpg" alt="Product">
  </div>
  <div class="media-lockup__content">
    <h2>Product Title</h2>
    <p>Description</p>
  </div>
</div>
```

**Responsive Behavior:**
- Mobile: Stacks vertically
- Desktop (768px+): 50/50 split
- Use `.media-lockup--image-right` to swap order on desktop

**Related Components:**
- Storefront (web component version with JavaScript)
- Section (semantic container)

---

### Section

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/Section/`

**Purpose:**
Semantic section container with configurable height and background variants.

**Variants:**
- Heights: Auto (default), 100vh, 50vh
- Backgrounds: Surface, Primary, Secondary

**Design Tokens Used:**
- Colors: `--color-surface`, `--color-primary`, `--color-secondary`
- Spacing: `--space-l`, `--space-xl`

**Usage:**
```html
<section class="section section--height-100 section--bg-primary">
  <div class="l-container">
    <!-- Content -->
  </div>
</section>
```

---

### FAQ

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/FAQ/`

**Purpose:**
Accordion-style FAQ component using native `<details>` and `<summary>` elements.

**Variants:**
- Sizes: Small, Medium, Large
- Backgrounds: Surface, Primary, Secondary

**Design Tokens Used:**
- Colors: `--color-surface`, `--color-outline-variant`
- Spacing: `--space-m`, `--space-s`
- Typography: `--font-sans`, `--step-0`, `--step-1`
- Icons: Material Design `expand_more`

**Usage:**
```html
<div class="faq faq--medium faq--surface">
  <details class="faq__item">
    <summary class="faq__question">
      <span class="faq__question-text">Question?</span>
      <span class="icon faq__icon">expand_more</span>
    </summary>
    <div class="faq__answer">
      <p>Answer content</p>
    </div>
  </details>
</div>
```

---

### Banner

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/Banner/`

**Purpose:**
Promotional banner for announcements, typically placed above navigation.

**Variants:**
- Styles: Primary, Secondary, Tertiary
- Sizes: Mini, Default

**Design Tokens Used:**
- Colors: `--color-primary`, `--color-on-primary`
- Spacing: `--space-s`, `--space-m`
- Typography: `--step--1`, `--step-0`

**Usage:**
```html
<div class="banner banner--primary banner--mini">
  <p class="banner__text">
    Free shipping on orders $65+ · Limited time offer
  </p>
</div>
```

---

### ButtonTags

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/ButtonTags/`

**Purpose:**
Tag/chip components for displaying attributes, categories, or metadata.

**Variants:**
- Styles: Primary, Secondary, Tertiary, Outline
- Sizes: Mini, Small, Medium

**Design Tokens Used:**
- Colors: `--color-primary`, `--color-secondary`, `--color-tertiary-container`
- Spacing: `--space-xs`, `--space-s`
- Typography: `--step--2`, `--step--1`

**Usage:**
```html
<div class="button-tags">
  <span class="button-tag button-tag--secondary button-tag--mini">vegan</span>
  <span class="button-tag button-tag--secondary button-tag--mini">cruelty-free</span>
</div>
```

---

### Radio Button Group

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/Radio/`

**Purpose:**
Radio button group styled as button toggles for flavor/variant selection.

**Variants:**
- Styles: Primary, Secondary, Outline
- Sizes: Small, Medium, Large
- Shapes: Rectangle, Pill

**Design Tokens Used:**
- Colors: `--color-primary`, `--color-secondary`, `--color-outline`
- Spacing: `--space-s`, `--space-m`
- Typography: `--font-sans`, `--step-0`

**Usage:**
```html
<div class="button-group">
  <fieldset class="button-group__fieldset">
    <legend class="button-group__legend">Select Flavor</legend>
    <div class="button-group__buttons">
      <div class="button-group__button">
        <input type="radio" name="flavor" id="cherry" class="button-group__input" />
        <label for="cherry" class="button-group__label button-group__label--secondary button-group__label--pill">
          Cherry Pop
        </label>
      </div>
    </div>
  </fieldset>
</div>
```

---

### Image

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/Image/`

**Purpose:**
Image component with object-fit utilities (cover, contain).

**Variants:**
- `.img--cover` - Cover container (crop to fill)
- `.img--contain` - Contain within bounds (letterbox/pillarbox)

**Usage:**
```html
<img src="product.jpg" alt="Product" class="img--cover">
```

---

### Video

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/Video/`

**Purpose:**
Video component with responsive aspect ratio container.

**Usage:**
```html
<video class="video" autoplay muted loop playsinline>
  <source src="video.mp4" type="video/mp4">
</video>
```

---

### Media

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/Media/`

**Purpose:**
Generic media container for images and videos with object-fit utilities.

**Usage:**
```html
<img src="image.jpg" class="media media--cover">
<video src="video.mp4" class="media media--contain"></video>
```

---

### Grid

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/Grid/`

**Purpose:**
12-column responsive grid system based on Utopia Grid.

**Classes:**
- `.u-container` - Max-width container with padding
- `.u-grid` - Display grid with gutters
- `.col-span-{1-12}` - Column span (mobile)
- `.col-span-md-{1-12}` - Column span (desktop 768px+)

**Design Tokens Used:**
- `--grid-max-width` (77.5rem)
- `--grid-gutter` (fluid clamp)
- `--space-*` tokens

**Usage:**
```html
<div class="u-container">
  <div class="u-grid" style="grid-template-columns: repeat(12, 1fr);">
    <div class="col-span-12 col-span-md-6">
      Left column (50% on desktop)
    </div>
    <div class="col-span-12 col-span-md-6">
      Right column (50% on desktop)
    </div>
  </div>
</div>
```

---

### Typography

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/Typography/`

**Purpose:**
Typography component showcasing type scale and text hierarchy.

**Design Tokens Used:**
- Typography scale: `--step--4` through `--step-8`
- Line heights, font weights
- Font families: `--font-sans`, `--font-serif`, `--font-mono`

**Type Scale:**
- `--step--4` (0.563rem) - Smallest text
- `--step--3` (0.625rem)
- `--step--2` (0.75rem)
- `--step--1` (0.875rem)
- `--step-0` (1rem) - Base size
- `--step-1` (1.125rem)
- `--step-2` (1.333rem)
- `--step-3` (1.777rem)
- `--step-4` (2.369rem)
- `--step-5` (3.157rem)
- `--step-6` (4.209rem)
- `--step-7` (5.61rem)
- `--step-8` (7.478rem) - Largest text

---

### Icon

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/Icon/`

**Purpose:**
Material Design icon integration using ligatures.

**Icon Sizes:**
- `--icon-size-xs` (1rem)
- `--icon-size-s` (1.5rem)
- `--icon-size-m` (2rem)
- `--icon-size-l` (3rem)
- `--icon-size-xl` (4rem)

**Usage:**
```html
<span class="icon">shopping_cart</span>
<span class="icon" style="font-size: var(--icon-size-l);">favorite</span>
```

**Required Import:**
```html
<link rel="stylesheet" href="./ui/styles/icons.css">
```

---

### AspectRatio

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/AspectRatio/`

**Purpose:**
Responsive aspect ratio containers for images and videos.

**Ratios:**
- `.aspect-16-9`, `.aspect-21-9`, `.aspect-4-3`, `.aspect-1-1`

**Usage:**
```html
<div class="aspect-16-9">
  <img src="image.jpg" alt="Image">
</div>
```

---

### Space

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/Space/`

**Purpose:**
Spacing utilities and scale visualization.

**Space Scale:**
- `--space-3xs` through `--space-3xl`
- Fluid pairs: `--space-xs-s`, `--space-s-m`, `--space-m-l`, etc.

---

### Input

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/Input/`

**Purpose:**
Text input field component with label and helper text.

**Design Tokens Used:**
- Colors: `--color-outline`, `--color-primary`
- Spacing: `--space-s`, `--space-m`
- Typography: `--font-sans`, `--step-0`

**Usage:**
```html
<div class="input-group">
  <label for="email" class="input-label">Email</label>
  <input type="email" id="email" class="input" placeholder="you@example.com">
</div>
```

---

### Select

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/Select/`

**Purpose:**
Styled select dropdown component.

**Usage:**
```html
<select class="select">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

---

### Switch

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/Switch/`

**Purpose:**
Toggle switch component for binary choices.

**Usage:**
```html
<label class="switch">
  <input type="checkbox" class="switch__input">
  <span class="switch__slider"></span>
</label>
```

---

### Link

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/Link/`

**Purpose:**
Styled link component with hover states.

**Usage:**
```html
<a href="#" class="link">Learn more</a>
```

---

### DesignTokens

**Type:** CSS Component
**Status:** Stable
**Location:** `/ui/src/components/DesignTokens/`

**Purpose:**
Visual reference guide showing all design system tokens (colors, spacing, typography).

**Sections:**
- Color palette
- Spacing scale
- Typography scale
- Grid system

---

## Layout Utilities

CSS utility classes for common responsive layout patterns.

### Container & Grid

**Classes:**
- `.l-container` - Max-width container with padding
- `.l-grid` - Creates 12-column grid

**Usage:**
```html
<div class="l-container">
  <div class="l-grid">
    <!-- Grid children -->
  </div>
</div>
```

---

### Split Layouts

Responsive two-column layouts that stack on mobile.

**Classes:**
- `.l-split-half` - 50/50 split (6/6 columns)
- `.l-split-60-40`, `.l-split-40-60` - 60/40 splits (7/5 columns)
- `.l-split-70-30`, `.l-split-30-70` - 70/30 splits (8/4 columns)
- `.l-split-80-20`, `.l-split-20-80` - 80/20 splits (10/2 columns)

**Responsive:**
- Mobile (< 768px): Stacks vertically (full width)
- Desktop (768px+): Horizontal split at specified ratio

**Usage:**
```html
<div class="l-container l-split-half">
  <div>Left column (50%)</div>
  <div>Right column (50%)</div>
</div>
```

---

### Stack Layout

Vertical stacking with configurable gaps.

**Classes:**
- `.l-stack` - Basic vertical stack
- `.l-stack--gap-{xs|s|m|l|xl}` - Stack with specific gap size

**Usage:**
```html
<div class="l-container l-stack l-stack--gap-m">
  <h1>Title</h1>
  <p>Content</p>
  <button>Action</button>
</div>
```

---

### Overlay & Positioning

**Classes:**
- `.l-overlay` - Layered content (hero overlays)
- `.l-offset` - Content overlapping media

**Usage:**
```html
<div class="l-container l-overlay">
  <img src="hero.jpg" alt="Hero">
  <div class="l-content--center">
    <h1>Overlaid Title</h1>
  </div>
</div>
```

---

### Spacing Utilities

Quick gap and padding utilities.

**Classes:**
- `.l-gap-{3xs|2xs|xs|s|m|l|xl|2xl|3xl}` - Gap spacing
- `.l-pad-{3xs|2xs|xs|s|m|l|xl|2xl|3xl}` - Padding
- `.l-pad-block-*`, `.l-pad-inline-*` - Directional padding
- `.l-mar-block-*` - Block margins
- `.l-mar-inline-auto` - Center horizontally

---

### Content Width

**Classes:**
- `.l-content--narrow` (45ch)
- `.l-content--readable` (65ch)
- `.l-content--wide` (80ch)
- `.l-content--center` - Center content

**Usage:**
```html
<div class="l-content--readable l-content--center">
  <p>Readable line length centered on page</p>
</div>
```

---

### Responsive Utilities

**Classes:**
- `.l-hide-mobile`, `.l-hide-desktop` - Visibility
- `.l-text-center-mobile`, `.l-text-center-desktop` - Text alignment
- `.l-reverse-desktop` - Swap child order on desktop

---

### Aspect Ratios

**Classes:**
- `.l-aspect-1-1`, `.l-aspect-16-9`, `.l-aspect-21-9`
- `.l-aspect-4-3`, `.l-aspect-3-4`, `.l-aspect-3-2`, `.l-aspect-2-3`

---

### Cards

**Classes:**
- `.l-card` (400px), `.l-card--sm` (320px)
- `.l-card--md` (400px), `.l-card--lg` (520px)
- `.l-card--center` - Center card

---

### Other Utilities

**Classes:**
- `.l-full-bleed` - Break out to full viewport width
- `.l-align-*`, `.l-justify-*` - Alignment utilities

---

## Component Development Resources

**Documentation:**
- Web Components Guide: `_docs/web-components.md`
- Architecture Decisions: `_docs/decisions.md` (ADR-005, ADR-006)
- Design System Guide: `CLAUDE.md`
- Theming Guide: `ui/styles/THEMING.md`
- Font System Guide: `ui/styles/FONTS.md`

**Example Implementations:**
- Storefront: `/ui/src/components/Storefront/` (web component reference)
- MediaLockup: `/ui/src/components/MediaLockup/` (CSS component reference)

**Design System:**
- Tokens: `/ui/styles/tokens/`
- Themes: `/ui/styles/themes/`
- Layout utilities: `/ui/styles/layouts.css`
- Grid system: `/ui/styles/grid.css`

---

## Contributing

When adding new components:

1. Follow established patterns (web component or CSS-based)
2. Use design system tokens exclusively (no hardcoded values)
3. Document all token dependencies
4. Create Storybook stories
5. Add entry to this catalog
6. Update `_docs/progress.md`
7. If significant, add ADR to `_docs/decisions.md`

**Component Checklist:**
- [ ] Follows naming conventions (BEM for CSS, kebab-case for custom elements)
- [ ] Uses design tokens for all visual properties
- [ ] Mobile-first responsive design
- [ ] README.md with usage examples
- [ ] Storybook integration
- [ ] Browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Catalog entry added
- [ ] Documentation updated
