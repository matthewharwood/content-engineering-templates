# Web Components Development Guide

This guide documents the complete process for creating and using web components in the content-engineering-templates project.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [File Organization](#file-organization)
3. [Creating a New Web Component](#creating-a-new-web-component)
4. [Design System Integration](#design-system-integration)
5. [Import Patterns](#import-patterns)
6. [Naming Conventions](#naming-conventions)
7. [Component Structure](#component-structure)
8. [Storybook Integration](#storybook-integration)
9. [Testing](#testing)
10. [Copy-Paste Portability](#copy-paste-portability)
11. [Best Practices](#best-practices)

---

## Architecture Overview

**Key Principles:**
- Use native Web Components API (Custom Elements)
- No Shadow DOM - use Light DOM for design token integration
- No build tools - native ES modules work in all modern browsers
- Copy-paste friendly - entire component folder is portable
- Design system token integration via global CSS custom properties
- **Declarative HTML** - structure defined in markup, not JavaScript
- **Semantic wrappers** - components enhance HTML, don't create it
- **Minimal JavaScript** - only add behavior, not structure

**Why This Architecture?**
- Consistent with existing CSS-based components
- Works with Deno static file serving out-of-the-box
- Full access to semantic design tokens (`--color-primary`, `--space-l`, etc.)
- Theme switching works automatically without component updates
- Simple deployment (no bundler, no npm install required)
- **Better developer experience** - HTML visible in markup with proper syntax highlighting
- **Faster initial render** - browser parser creates DOM, not JavaScript
- **Easier customization** - edit HTML files, not JavaScript strings

See `decisions.md` ADR-005, ADR-006, and ADR-007 for detailed architectural decisions.

---

## File Organization

All web components live in `/ui/src/components/[ComponentName]/` alongside HTML and CSS files.

**Standard Component Folder:**
```
/ui/src/components/ComponentName/
  ComponentName.js              # Main web component (parent/container)
  ComponentNameChild1.js        # Child component 1 (if needed)
  ComponentNameChild2.js        # Child component 2 (if needed)
  ComponentName.css             # Shared styles (if needed)
  ComponentNameDefault.html     # Usage example/demo
  ComponentName.stories.js      # Storybook integration
  README.md                     # Component documentation
  ARCHITECTURE.md               # Technical decisions (optional, for complex components)
```

**Example: Storefront Component**
```
/ui/src/components/Storefront/
  Storefront.js                 # Parent container (grid layout)
  StorefrontAssets.js           # Left child (product media)
  StorefrontForm.js             # Right child (product form)
  Storefront.css                # Shared grid utilities
  StorefrontDefault.html        # Usage example
  Storefront.stories.js         # Storybook stories
  README.md                     # Usage documentation
  ARCHITECTURE.md               # Design decisions
```

---

## Creating a New Web Component

### Step 1: Create Component Directory

```bash
mkdir -p ui/src/components/MyComponent
cd ui/src/components/MyComponent
```

### Step 2: Create JavaScript File

Create `MyComponent.js`:

```javascript
/**
 * MyComponent Web Component
 *
 * Brief description of what this component does.
 *
 * Architecture:
 * - Uses native Web Components API (Custom Elements)
 * - No Shadow DOM (integrates with global design system tokens)
 * - Declarative HTML (structure defined in markup, not JavaScript)
 * - Semantic wrapper (component enhances HTML, doesn't create it)
 * - Styles in external CSS file (see MyComponent.css)
 *
 * Usage:
 * <my-component class="my-component">
 *   <div class="my-component__header">
 *     <h2 class="my-component__title">Component Title</h2>
 *   </div>
 *   <div class="my-component__content">
 *     Your content here
 *   </div>
 * </my-component>
 */

class MyComponent extends HTMLElement {
  constructor() {
    super();
    // No Shadow DOM - use Light DOM for token integration
  }

  connectedCallback() {
    // Only add CSS class for styling hook
    // HTML structure defined in markup (see usage example above)
    if (!this.classList.contains('my-component')) {
      this.classList.add('my-component');
    }
  }
}

// Register custom element
customElements.define('my-component', MyComponent);
```

### Step 3: Create CSS File

Create `MyComponent.css`:

```css
/**
 * MyComponent Styles
 *
 * All component styles live here (no inline styles in JavaScript).
 * Uses design system tokens for all visual properties.
 */

/* Import all design system tokens */
@import "../../../styles/index.css";

/* Component styles using design tokens */
.my-component {
  background: var(--color-surface);
  padding: var(--space-l);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
}

.my-component__title {
  font-family: var(--font-sans);
  font-size: var(--step-2);
  font-weight: 700;
  margin: 0;
  color: var(--color-on-surface);
}

.my-component__content {
  color: var(--color-on-surface-variant);
}

/* Responsive behavior */
@media (min-width: 768px) {
  .my-component {
    padding: var(--space-xl);
  }
}
```

### Step 4: Create Usage Example

Create `MyComponentDefault.html`:

```html
<link rel="stylesheet" href="./MyComponent.css">

<!-- HTML structure is declarative - defined in markup -->
<my-component class="my-component">
  <div class="my-component__header">
    <h2 class="my-component__title">Component Title</h2>
  </div>
  <div class="my-component__content">
    <p>Example content goes here.</p>
  </div>
</my-component>

<script type="module" src="./MyComponent.js"></script>
```

### Step 5: Create Storybook Integration

Create `MyComponent.stories.js`:

```javascript
import './MyComponent.css';
import './MyComponent.js';
import MyComponentDefaultHTML from './MyComponentDefault.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Components/MyComponent',
  tags: ['autodocs'],
};

export const Default = {
  render: () => createHTMLElement(MyComponentDefaultHTML)
};
```

### Step 6: Create README

Create `README.md`:

```markdown
# MyComponent Web Component

Brief description of the component.

## Usage in index.html

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <!-- 1. Import design system tokens -->
  <link rel="stylesheet" href="./ui/styles/index.css">

  <!-- 2. Import component CSS (if needed) -->
  <link rel="stylesheet" href="./ui/src/components/MyComponent/MyComponent.css">
</head>
<body>

  <!-- 3. Use web component -->
  <my-component>
    <div slot="content">Your content</div>
  </my-component>

  <!-- 4. Import JavaScript -->
  <script type="module" src="./ui/src/components/MyComponent/MyComponent.js"></script>

</body>
</html>
\`\`\`

## Design Tokens Used

**Colors:**
- `--color-surface` - Component background
- `--color-on-surface` - Text color

**Spacing:**
- `--space-l`, `--space-m` - Padding and gaps

**Typography:**
- `--font-sans` - Font family
- `--step-2` - Title size

## Browser Support

Works in all modern browsers: Chrome 67+, Firefox 63+, Safari 12.1+, Edge 79+
```

---

## Design System Integration

Web components access design system tokens via global CSS custom properties.

### Required Design System Import

**In index.html:**
```html
<head>
  <!-- REQUIRED: Load design system tokens before components -->
  <link rel="stylesheet" href="./ui/styles/index.css">
</head>
```

This loads (in order):
1. `colors.css` - Semantic color tokens (`--color-primary`, `--color-surface`, etc.)
2. `fonts.css` - Font tokens (`--font-sans`, `--font-serif`, etc.)
3. `typography.css` - Type scale (`--step-0` through `--step-8`)
4. `space.css` - Spacing scale (`--space-xs` through `--space-3xl`)
5. `grid.css` - Grid utilities (`.u-container`, `.u-grid`, `.col-span-*`)
6. `layouts.css` - Layout utilities (`.l-split-*`, `.l-stack`, `.l-overlay`, etc.)
7. `icons.css` - Material Design icons

### Accessing Tokens in Components

**Inside component styles:**
```javascript
render() {
  this.innerHTML = `
    <div class="my-component">Content</div>
    <style>
      .my-component {
        /* Colors */
        background: var(--color-surface);
        color: var(--color-on-surface);

        /* Spacing */
        padding: var(--space-l);
        gap: var(--space-m);

        /* Typography */
        font-family: var(--font-sans);
        font-size: var(--step-1);

        /* Custom properties with fallbacks */
        border-radius: var(--border-radius, 8px);
      }
    </style>
  `;
}
```

### Using Layout Utilities

Components can use Utopia grid and layout utilities:

```javascript
render() {
  this.innerHTML = `
    <!-- Use .u-container for max-width constraint -->
    <div class="my-component u-container">
      <!-- Use .u-grid for 12-column grid -->
      <div class="u-grid" style="grid-template-columns: repeat(12, 1fr);">
        <div class="col-span-12 col-span-md-6">
          Left column (50% on desktop)
        </div>
        <div class="col-span-12 col-span-md-6">
          Right column (50% on desktop)
        </div>
      </div>
    </div>
  `;
}
```

### Theme Switching

Theme changes work automatically because components reference tokens, not hardcoded values:

1. User switches theme by editing `ui/styles/theme.css`
2. Token values change (e.g., `--color-primary: blue` → `--color-primary: red`)
3. All components update instantly (no JavaScript required)

---

## Import Patterns

### In index.html

**CSS Imports (in `<head>`):**
```html
<head>
  <!-- 1. Design system tokens FIRST -->
  <link rel="stylesheet" href="./ui/styles/index.css">

  <!-- 2. Component CSS (if needed) -->
  <link rel="stylesheet" href="./ui/src/components/MyComponent/MyComponent.css">

  <!-- 3. Material Design icons (if using icons) -->
  <link rel="stylesheet" href="./ui/styles/icons.css">
</head>
```

**JavaScript Imports (at end of `<body>`):**
```html
<body>
  <!-- Your content -->
  <my-component></my-component>

  <!-- Import web components at end -->
  <script type="module" src="./ui/src/components/MyComponent/MyComponent.js"></script>
</body>
```

**Why at end of body?**
- Components register after DOM is ready
- Prevents blocking page render
- Works with `defer` attribute alternatively

### In Storybook

**In `ComponentName.stories.js`:**
```javascript
// Import CSS
import './MyComponent.css';

// Import JavaScript (registers custom element)
import './MyComponent.js';

// Import HTML template
import MyComponentHTML from './MyComponentDefault.html?raw';
```

### Path Consistency

All paths use same pattern:

```
./ui/src/components/ComponentName/ComponentName.{js,css,html}
```

- CSS: `<link rel="stylesheet" href="./ui/src/components/Button/Button.css">`
- JS: `<script type="module" src="./ui/src/components/Storefront/Storefront.js">`

Same relative path pattern, different file extensions.

---

## Naming Conventions

### Custom Element Names

**Rules:**
- Must contain hyphen (kebab-case): `my-component`, not `mycomponent`
- All lowercase
- Cannot start with number
- Cannot be single word (reserved for future HTML elements)

**Pattern:**
```javascript
// Class name: PascalCase
class MyComponent extends HTMLElement { }

// Custom element name: kebab-case
customElements.define('my-component', MyComponent);
```

**Examples:**
```javascript
// Good
customElements.define('storefront-component', StorefrontComponent);
customElements.define('product-card', ProductCard);
customElements.define('media-gallery', MediaGallery);

// Bad
customElements.define('Storefront', StorefrontComponent);  // No uppercase
customElements.define('storefront', StorefrontComponent);  // Missing hyphen
customElements.define('123-component', MyComponent);       // Starts with number
```

**Prefixing for Shared Components:**
If building components for external use, add project prefix:

```javascript
// Internal use (no prefix needed)
customElements.define('storefront-component', StorefrontComponent);

// External library (use prefix)
customElements.define('snif-storefront', StorefrontComponent);
customElements.define('acme-product-card', ProductCard);
```

### Class Names (BEM Convention)

Use BEM naming to scope styles without Shadow DOM:

**Pattern:**
```
.[component-name]__[element]--[modifier]
```

**Example:**
```css
/* Block */
.storefront-component { }

/* Element */
.storefront-component__header { }
.storefront-component__title { }
.storefront-component__content { }

/* Modifier */
.storefront-component--large { }
.storefront-component__title--highlighted { }
```

**Why BEM?**
- Prevents class name collisions without Shadow DOM
- Self-documenting (class name shows relationship)
- Familiar pattern (already used in CSS-only components)
- Easy to debug (inspect element shows clear hierarchy)

### File Names

**JavaScript files:** PascalCase matching class name
```
StorefrontComponent.js → class StorefrontComponent
ProductCard.js → class ProductCard
```

**CSS files:** PascalCase matching component
```
StorefrontComponent.css
ProductCard.css
```

**HTML files:** PascalCase + variant descriptor
```
StorefrontComponentDefault.html
ProductCardWithImage.html
```

---

## Component Structure

### Declarative HTML Pattern

Components use **declarative HTML structure** - all structure is defined in markup, not JavaScript.

**Parent Component (Container/Layout):**
```javascript
/**
 * Parent component provides grid layout.
 * HTML structure defined in markup (see usage example below).
 */
class ParentComponent extends HTMLElement {
  connectedCallback() {
    // Only add CSS class for styling hook
    if (!this.classList.contains('parent-component')) {
      this.classList.add('parent-component');
    }
  }
}

customElements.define('parent-component', ParentComponent);
```

**Parent CSS (ParentComponent.css):**
```css
.parent-component {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-l);
}
```

**Child Component (Content):**
```javascript
/**
 * Child component provides semantic wrapper.
 * HTML structure defined in markup (see usage example below).
 */
class ChildLeft extends HTMLElement {
  connectedCallback() {
    // Only add CSS class for styling hook
    if (!this.classList.contains('child-left')) {
      this.classList.add('child-left');
    }
  }
}

customElements.define('child-left', ChildLeft);
```

**Child CSS (ChildLeft.css):**
```css
.child-left {
  background: var(--color-primary);
  padding: var(--space-m);
}
```

**Usage (HTML structure in markup):**
```html
<parent-component class="parent-component">
  <child-left class="child-left">
    <p>Left child content</p>
  </child-left>
  <child-right class="child-right">
    <p>Right child content</p>
  </child-right>
</parent-component>
```

### Direct Nesting (No Slots)

Components use **direct nesting** instead of slots:

**Component JavaScript:**
```javascript
class MyComponent extends HTMLElement {
  connectedCallback() {
    if (!this.classList.contains('my-component')) {
      this.classList.add('my-component');
    }
  }
}

customElements.define('my-component', MyComponent);
```

**Component CSS:**
```css
.my-component {
  padding: var(--space-l);
}

.my-component__header {
  border-bottom: 1px solid var(--color-outline);
}

.my-component__content {
  margin-top: var(--space-m);
}

.my-component__footer {
  margin-top: var(--space-m);
  border-top: 1px solid var(--color-outline);
}
```

**Usage (HTML structure in markup):**
```html
<my-component class="my-component">
  <div class="my-component__header">
    <h2>Header content</h2>
  </div>
  <div class="my-component__content">
    <p>Main content</p>
  </div>
  <div class="my-component__footer">
    <p>Footer content</p>
  </div>
</my-component>
```

**Why No Slots?**
- Slots require Shadow DOM OR complex polyfilling
- Declarative nesting is simpler and more explicit
- Users have full control over DOM structure
- Better compatibility with frameworks (React, Vue)
- Easier to understand and customize

### Shadow DOM Decision

**All components use Light DOM (no Shadow DOM).**

**DO NOT use:**
```javascript
// ❌ Wrong - Shadow DOM blocks token access
constructor() {
  super();
  this.attachShadow({ mode: 'open' });
}
```

**DO use:**
```javascript
// ✅ Correct - Light DOM allows token access
constructor() {
  super();
  // No attachShadow() call
}

connectedCallback() {
  // Only add CSS class for styling hook
  if (!this.classList.contains('my-component')) {
    this.classList.add('my-component');
  }
}
```

See `decisions.md` ADR-006 and ADR-007 for full rationale.

---

## Storybook Integration

### Basic Storybook Story

Create `ComponentName.stories.js`:

```javascript
// Import component styles
import './ComponentName.css';

// Import component JavaScript (registers custom element)
import './ComponentName.js';

// Import HTML template
import ComponentNameDefaultHTML from './ComponentNameDefault.html?raw';

// Helper function to render HTML
function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

// Story configuration
export default {
  title: 'Components/ComponentName',
  tags: ['autodocs'],
};

// Default story
export const Default = {
  render: () => createHTMLElement(ComponentNameDefaultHTML)
};
```

### Multiple Variants

```javascript
import DefaultHTML from './ComponentNameDefault.html?raw';
import LargeHTML from './ComponentNameLarge.html?raw';
import PrimaryHTML from './ComponentNamePrimary.html?raw';

export default {
  title: 'Components/ComponentName',
  tags: ['autodocs'],
};

export const Default = {
  render: () => createHTMLElement(DefaultHTML)
};

export const Large = {
  render: () => createHTMLElement(LargeHTML)
};

export const Primary = {
  render: () => createHTMLElement(PrimaryHTML)
};
```

### Why `?raw` Suffix?

The `?raw` import suffix tells Vite (Storybook's bundler) to import the HTML file as a string rather than processing it:

```javascript
// With ?raw: returns HTML string
import HTML from './Component.html?raw';

// Without ?raw: Vite might try to process as module
import HTML from './Component.html';  // Error!
```

---

## Testing

### Manual Testing with Deno Server

1. **Start Deno server:**
   ```bash
   cd api
   deno task dev
   ```

2. **Create test page:**
   Create `COMPONENT_TEST.html` in project root:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <title>Component Test</title>
     <link rel="stylesheet" href="./ui/styles/index.css">
     <link rel="stylesheet" href="./ui/src/components/MyComponent/MyComponent.css">
   </head>
   <body>
     <h1>Component Test Page</h1>
     <my-component></my-component>

     <script type="module" src="./ui/src/components/MyComponent/MyComponent.js"></script>
   </body>
   </html>
   ```

3. **Visit test page:**
   ```
   http://localhost:8000/COMPONENT_TEST.html
   ```

4. **Check browser console:**
   ```javascript
   // Verify component registered
   console.log(customElements.get('my-component'));
   ```

### Testing in Storybook

1. **Start Storybook:**
   ```bash
   cd ui
   npm run storybook
   ```

2. **Navigate to component:**
   - Open `http://localhost:6006`
   - Find component in sidebar: `Components > ComponentName`
   - Test all variants

3. **Check console:**
   - Open browser DevTools
   - Check for JavaScript errors
   - Verify custom elements registered

### Browser Compatibility Testing

**Minimum supported browsers:**
- Chrome 67+ (Custom Elements V1)
- Firefox 63+ (Custom Elements V1)
- Safari 12.1+ (Custom Elements V1)
- Edge 79+ (Chromium-based)

**What to test:**
- Component renders correctly
- Slots work (content appears in correct locations)
- Design tokens apply (colors, spacing match design system)
- Responsive behavior works (mobile stacking, desktop layout)
- Theme switching works (change theme.css, verify component updates)

### Responsive Testing

**Test viewports:**
- 320px (small mobile)
- 768px (tablet - primary breakpoint)
- 1024px (desktop)
- 1440px (large desktop)

**Use browser DevTools:**
- Chrome: Toggle device toolbar (Cmd+Shift+M / Ctrl+Shift+M)
- Firefox: Responsive Design Mode (Cmd+Opt+M / Ctrl+Shift+M)
- Safari: Enter Responsive Design Mode (Develop menu)

---

## Copy-Paste Portability

Web components are designed to be copy-paste friendly across projects.

### What to Copy

**Entire component folder:**
```bash
# Copy component folder
cp -r ui/src/components/MyComponent /path/to/new-project/components/

# Result: All files travel together
/new-project/components/MyComponent/
  MyComponent.js
  MyComponent.css
  MyComponentDefault.html
  README.md
```

### What Must Be Provided in New Project

**1. Design System Tokens**

Components require these CSS custom properties:

**Colors:**
```css
:root {
  --color-primary: #6200ea;
  --color-on-primary: white;
  --color-surface: #fafafa;
  --color-on-surface: #1c1c1c;
  --color-surface-variant: #f5f5f5;
  --color-on-surface-variant: #757575;
}
```

**Spacing:**
```css
:root {
  --space-xs: 0.25rem;
  --space-s: 0.5rem;
  --space-m: 1rem;
  --space-l: 1.5rem;
  --space-xl: 2rem;
}
```

**Typography:**
```css
:root {
  --font-sans: system-ui, -apple-system, sans-serif;
  --step-0: 1rem;
  --step-1: 1.25rem;
  --step-2: 1.5rem;
  --step-3: 2rem;
  --step-4: 2.5rem;
}
```

**Grid Utilities (if component uses them):**
```css
.u-container {
  max-width: 77.5rem;
  margin-inline: auto;
  padding-inline: 1rem;
}

.u-grid {
  display: grid;
  gap: 1rem;
}

.col-span-12 {
  grid-column: span 12;
}

@media (min-width: 768px) {
  .col-span-md-6 {
    grid-column: span 6;
  }
}
```

**2. Update Import Paths**

Update paths to match new location:

```html
<!-- Old (in content-engineering-templates) -->
<link rel="stylesheet" href="./ui/src/components/MyComponent/MyComponent.css">
<script type="module" src="./ui/src/components/MyComponent/MyComponent.js"></script>

<!-- New (in external project) -->
<link rel="stylesheet" href="./components/MyComponent/MyComponent.css">
<script type="module" src="./components/MyComponent/MyComponent.js"></script>
```

### Minimal Integration Example

**Option 1: Copy Full Design System**
```bash
# Copy design system
cp -r ui/styles /new-project/styles

# Copy component
cp -r ui/src/components/MyComponent /new-project/components
```

```html
<!-- Use copied design system -->
<link rel="stylesheet" href="./styles/index.css">
<link rel="stylesheet" href="./components/MyComponent/MyComponent.css">
<script type="module" src="./components/MyComponent/MyComponent.js"></script>
```

**Option 2: Define Minimal Tokens**
```html
<head>
  <style>
    /* Define only required tokens */
    :root {
      --color-primary: #6200ea;
      --color-on-primary: white;
      --space-l: 1.5rem;
      --font-sans: system-ui, sans-serif;
      --step-2: 1.5rem;
    }
  </style>

  <link rel="stylesheet" href="./components/MyComponent/MyComponent.css">
</head>
<body>
  <my-component></my-component>
  <script type="module" src="./components/MyComponent/MyComponent.js"></script>
</body>
```

### Portability Checklist

Before copying component to new project:

- [ ] Component uses only Light DOM (no Shadow DOM)
- [ ] All styles reference design tokens via `var(--token-name)`
- [ ] No hardcoded colors or spacing values
- [ ] README.md documents all required tokens
- [ ] HTML example shows complete usage
- [ ] No external dependencies (pure vanilla JS)
- [ ] Works with native ES modules (no bundler required)

---

## Best Practices

### 1. Use Design Tokens Exclusively

**Do:**
```css
.my-component {
  background: var(--color-surface);
  color: var(--color-on-surface);
  padding: var(--space-l);
  font-family: var(--font-sans);
}
```

**Don't:**
```css
.my-component {
  background: #fafafa;        /* Hardcoded color */
  color: #333;                /* Hardcoded color */
  padding: 24px;              /* Hardcoded spacing */
  font-family: "Arial";       /* Hardcoded font */
}
```

### 2. Follow BEM Naming

**Do:**
```css
.storefront-component { }
.storefront-component__header { }
.storefront-component__title { }
.storefront-component--large { }
```

**Don't:**
```css
.storefront { }         /* Too generic */
.header { }             /* Global collision risk */
.storefrontTitle { }    /* camelCase in CSS */
```

### 3. Use Mobile-First Responsive Design

**Do:**
```css
/* Base: Mobile */
.my-component {
  padding: var(--space-m);
}

/* 768px+: Desktop */
@media (min-width: 768px) {
  .my-component {
    padding: var(--space-xl);
  }
}
```

**Don't:**
```css
/* Desktop-first (avoid) */
.my-component {
  padding: var(--space-xl);
}

@media (max-width: 767px) {
  .my-component {
    padding: var(--space-m);
  }
}
```

### 4. Use Declarative HTML Structure

**Do:** Structure in markup, not JavaScript
```html
<!-- HTML is explicit and visible -->
<my-component class="my-component">
  <div class="my-component__header">Header</div>
  <div class="my-component__content">Content</div>
  <div class="my-component__footer">Footer</div>
</my-component>
```

```javascript
// JavaScript only adds CSS class
class MyComponent extends HTMLElement {
  connectedCallback() {
    if (!this.classList.contains('my-component')) {
      this.classList.add('my-component');
    }
  }
}
```

**Don't:** Create structure with innerHTML
```javascript
// ❌ Mixes structure with behavior
render() {
  this.innerHTML = `
    <div class="my-component">
      <slot name="header"></slot>
    </div>
  `;
}
```

### 5. Document Token Dependencies

In component README, list all tokens used:

```markdown
## Design Tokens Used

**Colors:**
- `--color-primary` - Button background
- `--color-on-primary` - Button text

**Spacing:**
- `--space-l` - Component padding
- `--space-m` - Internal gaps

**Typography:**
- `--font-sans` - All text
- `--step-2` - Title size
```

### 6. Keep Components Focused

**Do:** Single-responsibility components
```
ProductCard.js         - Display product info
AddToCartButton.js    - Handle cart action
PriceDisplay.js       - Show formatted price
```

**Don't:** Monolithic components
```
ProductPage.js        - Everything (card, button, price, reviews, gallery)
```

### 7. Separate Structure, Presentation, and Behavior

**Do:** Clear separation of concerns
```html
<!-- HTML: Structure -->
<my-component class="my-component">
  <div class="my-component__content">
    <p>User content</p>
  </div>
</my-component>
```

```css
/* CSS: Presentation */
.my-component {
  padding: var(--space-l);
  background: var(--color-surface);
}
```

```javascript
// JavaScript: Behavior
class MyComponent extends HTMLElement {
  connectedCallback() {
    if (!this.classList.contains('my-component')) {
      this.classList.add('my-component');
    }
    // Add event listeners if needed
  }
}
```

**Don't:** Mix concerns in JavaScript
```javascript
// ❌ JavaScript creating HTML and CSS
render() {
  this.innerHTML = `
    <div class="component">
      <p>Fixed content</p>
    </div>
    <style>.component { padding: 20px; }</style>
  `;
}
```

### 8. Test Across Browsers

Minimum testing:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### 9. Provide Usage Examples

Every component should have:
- README.md with copy-paste HTML example
- ComponentDefault.html showing basic usage
- Storybook stories showing all variants

### 10. Version Control Documentation

When making breaking changes:
- Update README.md with migration guide
- Document in ARCHITECTURE.md if architectural change
- Add ADR to `_docs/decisions.md` if significant
- Update `_docs/components.md` catalog entry

---

## Summary

**Key Takeaways:**
1. Web components live in `/ui/src/components/[ComponentName]/`
2. Use Light DOM (no Shadow DOM) for design token integration
3. **Use declarative HTML** - structure in markup, not JavaScript
4. **Minimal JavaScript** - only add CSS classes and behavior
5. **External CSS only** - no inline styles in JavaScript
6. Follow BEM naming conventions for style scoping
7. Use native ES modules (no build step)
8. Access design tokens via `var(--token-name)`
9. Document all token dependencies
10. Provide usage examples and README
11. Test across browsers and viewports
12. Design for copy-paste portability

**Resources:**
- Architecture decisions: `_docs/decisions.md` (ADR-005, ADR-006, ADR-007)
- Component catalog: `_docs/components.md`
- Existing example: `ui/src/components/Storefront/`
- Design system guide: `CLAUDE.md`
- Theming guide: `ui/styles/THEMING.md`

**Questions?**
Refer to existing Storefront component for reference implementation:
- `/ui/src/components/Storefront/Storefront.js` - Minimal JavaScript (semantic wrapper)
- `/ui/src/components/Storefront/Storefront.css` - External styles only
- `/ui/src/components/Storefront/StorefrontDefault.html` - Declarative HTML example
- `/ui/src/components/Storefront/README.md` - Usage guide
- `/ui/src/components/Storefront/ARCHITECTURE.md` - Design decisions
