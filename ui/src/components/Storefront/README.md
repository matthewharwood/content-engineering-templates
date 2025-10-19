# Storefront Web Components

Browser-native web components for product presentation layouts. Built with Light DOM, semantic HTML, and attribute-based state management.

## Overview

Three composable components that create responsive product storefronts:

- `<storefront-component>` - Layout container with responsive split layouts
- `<storefront-assets>` - Media container for images, videos, galleries
- `<storefront-form>` - Content container for product info, pricing, actions

## Architecture Principles

**Light DOM Only**
- No Shadow DOM - integrates seamlessly with global design system
- No innerHTML - secure by default, no XSS attack surface
- No DOM selection - components manage only their own state

**Attribute-Based API**
- All state is controlled via HTML attributes
- Attributes reflect to properties for JavaScript access
- CSS styles components using attribute selectors and data attributes

**Composition Over Manipulation**
- Components don't create internal structure
- HTML is declared, not generated
- Parent-child relationships are explicit

**Design System Integration**
- Leverages existing layout utilities (`.l-split-*`, `.l-container`)
- Uses semantic color tokens (`--color-primary`, etc.)
- Respects spacing scale (`--space-*`)

## Quick Start

### Basic Usage

```html
<!-- 1. Import styles and components -->
<link rel="stylesheet" href="./ui/src/components/Storefront/Storefront.css">
<script type="module" src="./ui/src/components/Storefront/Storefront.js"></script>
<script type="module" src="./ui/src/components/Storefront/StorefrontAssets.js"></script>
<script type="module" src="./ui/src/components/Storefront/StorefrontForm.js"></script>

<!-- 2. Use components with attributes -->
<storefront-component layout="half" gap="l">
  <storefront-assets variant="primary" align="center">
    <img src="product.jpg" alt="Product">
  </storefront-assets>

  <storefront-form variant="surface-variant" align="start">
    <h2>Product Title</h2>
    <p>Product description...</p>
    <button>Add to Cart</button>
  </storefront-form>
</storefront-component>
```

## Component APIs

### `<storefront-component>`

Parent container that creates responsive split layouts.

**Attributes:**

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `layout` | `half`, `60-40`, `40-60`, `70-30`, `30-70`, `80-20`, `20-80` | `half` | Column split ratio |
| `gap` | `3xs`, `2xs`, `xs`, `s`, `m`, `l`, `xl`, `2xl`, `3xl` | `l` | Space between columns |
| `constrain` | `true`, `false` | `true` | Apply max-width container |

**Properties:**

```javascript
const storefront = document.querySelector('storefront-component');

// Getters/setters mirror attributes
storefront.layout = '60-40';
console.log(storefront.gap); // "l"
```

**Examples:**

```html
<!-- 50/50 split -->
<storefront-component layout="half" gap="l">...</storefront-component>

<!-- 60/40 split with small gap -->
<storefront-component layout="60-40" gap="s">...</storefront-component>

<!-- Full-width (no max-width constraint) -->
<storefront-component layout="half" constrain="false">...</storefront-component>
```

### `<storefront-assets>`

Container for product media (images, videos, galleries).

**Attributes:**

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `variant` | `primary`, `secondary`, `tertiary`, `surface` | `primary` | Background color variant |
| `align` | `start`, `center`, `end`, `stretch` | `center` | Vertical content alignment |
| `aspect` | `1-1`, `16-9`, `4-3`, `3-2`, `none` | `none` | Aspect ratio constraint |

**Properties:**

```javascript
const assets = document.querySelector('storefront-assets');

assets.variant = 'secondary';
assets.align = 'start';
console.log(assets.aspect); // "none"
```

**Examples:**

```html
<!-- Primary background with centered image -->
<storefront-assets variant="primary" align="center">
  <img src="product.jpg" alt="Product">
</storefront-assets>

<!-- 16:9 aspect ratio container -->
<storefront-assets variant="surface" aspect="16-9">
  <video src="demo.mp4" controls></video>
</storefront-assets>

<!-- Top-aligned gallery -->
<storefront-assets variant="tertiary" align="start">
  <img src="1.jpg" alt="View 1">
  <img src="2.jpg" alt="View 2">
</storefront-assets>
```

### `<storefront-form>`

Container for product information, pricing, and actions.

**Attributes:**

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `variant` | `surface`, `surface-variant`, `primary`, `secondary` | `surface-variant` | Background color variant |
| `align` | `start`, `center`, `end`, `stretch` | `center` | Vertical content alignment |
| `padding` | `s`, `m`, `l`, `xl` | `l` | Internal padding |

**Properties:**

```javascript
const form = document.querySelector('storefront-form');

form.variant = 'primary';
form.padding = 'xl';
console.log(form.align); // "center"
```

**Examples:**

```html
<!-- Standard product form -->
<storefront-form variant="surface-variant" align="start" padding="l">
  <h2>Liqit Topcoat</h2>
  <p>Flavored top coat that looks top-shelf.</p>
  <p><strong>$19.00</strong></p>
  <button>Add to Cart</button>
</storefront-form>

<!-- Centered call-to-action -->
<storefront-form variant="primary" align="center" padding="xl">
  <h2>Limited Edition</h2>
  <button>Shop Now</button>
</storefront-form>
```

## Advanced Features

### Modern CSS: `:has()` Selector

The CSS automatically detects content patterns and adjusts styling:

```html
<!-- Single image gets full-bleed (no padding) -->
<storefront-assets variant="primary">
  <img src="hero.jpg" alt="Hero">
</storefront-assets>

<!-- Form with button gets automatic gap spacing -->
<storefront-form variant="surface">
  <h2>Title</h2>
  <p>Description</p>
  <button>Action</button>
</storefront-form>
```

### CSS Layers for Cascade Control

Styles are organized in layers for easy overriding:

```css
/* Override component styles */
@layer storefront.base {
  .storefront-assets {
    min-height: 600px; /* Taller containers */
  }
}

/* Override state styles */
@layer storefront.state {
  .storefront-form[data-align="start"] {
    justify-content: space-between;
  }
}
```

### Data Attributes for Custom Styling

Components set data attributes based on attribute values:

```css
/* Target specific alignment */
storefront-assets[data-align="start"] { }

/* Target specific aspect ratio */
storefront-assets[data-aspect="16-9"] { }

/* Target specific padding */
storefront-form[data-padding="xl"] { }
```

## Design System Integration

### Required Design Tokens

Components use these semantic tokens from `ui/styles/index.css`:

**Colors:**
- `--color-primary`, `--color-on-primary`
- `--color-secondary`, `--color-on-secondary`
- `--color-tertiary`, `--color-on-tertiary`
- `--color-surface`, `--color-on-surface`
- `--color-surface-variant`, `--color-on-surface-variant`

**Spacing:**
- `--space-s`, `--space-m`, `--space-l`, `--space-xl`

**Layout Utilities:**
- `.l-container` (max-width constraint)
- `.l-split-half`, `.l-split-60-40`, etc. (responsive splits)
- `.l-gap-*` (gap spacing)

### Theme Switching

Components automatically respond to theme changes:

```css
/* Change theme in ui/styles/theme.css */
@import "./themes/blank.css"; /* Switch from default to blank */

/* Components update automatically - no JavaScript needed */
```

## Browser Support

- Chrome 67+ (Custom Elements, ES Modules)
- Firefox 63+
- Safari 12.1+
- Edge 79+

**Required features:**
- Custom Elements API
- ES Modules (`<script type="module">`)
- CSS Custom Properties
- CSS Grid
- `@layer` (optional, gracefully degrades)
- `:has()` (optional, gracefully degrades)

## Copy-Paste Portability

### What to Copy

```
ui/src/components/Storefront/
├── Storefront.js
├── StorefrontAssets.js
├── StorefrontForm.js
├── Storefront.css
└── README.md (this file)
```

### Integration Steps

1. Copy the entire folder to your project
2. Ensure design system tokens are available (copy `ui/styles/` or define tokens)
3. Import CSS and JavaScript in your HTML
4. Use components with attributes

### Minimal Token Definition

If you don't want to copy the full design system, define these tokens:

```css
:root {
  /* Colors */
  --color-primary: #6200ea;
  --color-on-primary: white;
  --color-secondary: #03dac6;
  --color-on-secondary: black;
  --color-tertiary: #018786;
  --color-on-tertiary: white;
  --color-surface: #ffffff;
  --color-on-surface: #000000;
  --color-surface-variant: #f5f5f5;
  --color-on-surface-variant: #333333;

  /* Spacing */
  --space-s: 0.5rem;
  --space-m: 1rem;
  --space-l: 1.5rem;
  --space-xl: 2rem;
}

/* Layout utilities */
.l-container { max-width: 77.5rem; margin-inline: auto; padding-inline: 1rem; }
.l-split-half { display: grid; grid-template-columns: 1fr; }
@media (min-width: 768px) {
  .l-split-half { grid-template-columns: 1fr 1fr; }
}
/* Add other .l-split-* variants as needed */
```

## Accessibility

- Semantic HTML structure (native elements)
- Keyboard navigation support (native button/input elements)
- Screen reader friendly (logical content order)
- Color contrast from design system (WCAG compliant)
- Focus management (native browser behavior)

## Performance

- No Shadow DOM overhead
- Minimal JavaScript (~5KB total)
- CSS uses hardware-accelerated grid
- Loads via async ES modules
- Progressive enhancement (works without JavaScript for basic layout)

## Comparison with Original Implementation

### What Changed

**Before:**
- Components did nothing (only added CSS classes)
- Required manual grid wrapper divs
- No attribute-based state
- Hardcoded layout patterns
- Documentation referenced innerHTML

**After:**
- Components manage layout via attributes
- Uses existing design system utilities
- Full attribute-based API with property reflection
- Modern CSS (@layer, :has())
- Secure, no innerHTML anywhere

### Migration Guide

If you're using the old version:

```html
<!-- OLD: Manual grid wrappers -->
<storefront-component class="storefront">
  <div class="storefront-container">
    <div class="storefront-grid">
      <div class="storefront-grid__left">
        <storefront-assets class="storefront-assets">...</storefront-assets>
      </div>
      <div class="storefront-grid__right">
        <storefront-form class="storefront-form">...</storefront-form>
      </div>
    </div>
  </div>
</storefront-component>

<!-- NEW: Attribute-based, no wrappers -->
<storefront-component layout="half" gap="l">
  <storefront-assets variant="primary">...</storefront-assets>
  <storefront-form variant="surface-variant">...</storefront-form>
</storefront-component>
```

## Examples

See `StorefrontDefault.html` for complete usage examples including:
- Default 50/50 layout
- 60/40 split with images
- Full-width layouts
- Different variants and alignments
- Aspect ratio constraints
- Custom padding

## Questions & Answers

**Q: Why Light DOM instead of Shadow DOM?**
A: Shadow DOM creates a style boundary that prevents design tokens from flowing through. Light DOM allows components to integrate with the global design system while using scoped class names for style isolation.

**Q: Why don't components create their own HTML structure?**
A: Following the principle of composition over manipulation. HTML declares structure, components declare behavior. This makes the components more predictable, easier to debug, and compatible with server-side rendering.

**Q: Can I use these components without the design system?**
A: Yes, but you'll need to define the required CSS custom properties and layout utilities (see "Minimal Token Definition" above).

**Q: Are these accessible?**
A: Yes - components use semantic HTML and native elements. Accessibility features (keyboard nav, focus, ARIA) come from standard HTML elements you place inside the components.

**Q: Can I style components with my own CSS?**
A: Yes - Light DOM means all component styles can be overridden. Use @layer to control cascade priority, or add more specific selectors.

**Q: Do I need a build tool?**
A: No - components use native ES modules and work directly in browsers. For production, you may want to bundle/minify, but it's optional.
