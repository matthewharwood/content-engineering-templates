# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Deno-based monorepo containing:
- **API** (`/api`): Simple Deno HTTP server with REST API endpoints
- **UI** (`/ui`): Design system with Storybook documentation

## Commands

### API Development
```bash
# Development with auto-reload
deno task dev

# Production
deno task start
```

The API runs on `http://localhost:8000` (configurable via `PORT` environment variable).

### UI Development
```bash
cd ui

# Development - Storybook server
npm run storybook

# Build static Storybook
npm run build-storybook
```

Storybook runs on `http://localhost:6006`.

## Architecture

### Monorepo Structure
The workspace is configured via `/deno.json` with two members: `./api` and `./ui`. While Deno is the runtime, the UI uses npm for Storybook tooling.

### Design System Architecture

The UI implements a **semantic token system** inspired by Material Design 3, with full separation between design tokens and theme values.

#### Token System
All visual properties use semantic tokens that describe their **purpose**, not their values:

**Color tokens** (`ui/styles/tokens/colors.css`):
- Semantic variables like `--color-primary`, `--color-surface`, `--color-on-primary`
- These map to theme-specific values via `--theme-*` variables
- Switch themes by editing `ui/styles/theme.css` to import different theme files

**Font tokens** (`ui/styles/fonts.css`):
- Semantic variables: `--font-sans`, `--font-serif`, `--font-mono`, `--font-display`
- Map to `--font-theme-*` variables defined in font theme files
- Switch font themes by editing the import in `ui/styles/fonts.css`

**Space tokens** (`ui/styles/space.css`):
- Standardized spacing scale (`--space-xs` through `--space-3xl`)
- Used by the `Space` component and throughout the system

**Typography tokens** (`ui/styles/typography.css`):
- Semantic text levels (`--type-body`, `--type-heading-1`, etc.)
- Include both font-size and line-height in single custom properties

**Icon tokens** (`ui/styles/icons.css`):
- Material Design icon integration via `--icon-*` properties

#### Theme System
Themes are **completely separate** from component styles. All themes define the same set of `--theme-*` variables but with different color values.

**Available themes:**
- `default.css` - Material Design 3 inspired color palette
- `blank.css` - Minimal browser-default colors

To create a custom theme:
1. Copy `ui/styles/themes/default.css` to `ui/styles/themes/my-brand.css`
2. Replace the color values while keeping the same variable names
3. Import your theme in `ui/styles/theme.css`

See `ui/styles/THEMING.md` and `ui/styles/FONTS.md` for detailed guidance.

#### Component Architecture
All components follow this pattern:
- **HTML file** (e.g., `ButtonPrimary.html`) - Pure HTML markup
- **CSS file** (e.g., `Button.css`) - Component styles using semantic tokens only
- **Stories file** (e.g., `Button.stories.js`) - Storybook documentation importing HTML via `?raw` suffix

Components **never use hardcoded colors or fonts**. They only reference semantic tokens (`--color-*`, `--font-*`, etc.), ensuring full theme compatibility.

#### Component Organization
```
ui/src/components/
├── AspectRatio/   - Responsive aspect ratio containers
├── Button/        - Button variations (primary, secondary, outline, etc.)
├── DesignTokens/  - Visual token reference
├── Grid/          - Layout grid system
├── Icon/          - Material Design icon wrapper
├── Image/         - Image components with effects
├── Media/         - Media container component
├── Space/         - Spacing utilities
├── Typography/    - Text hierarchy system
└── Video/         - Video component with controls
```

Each component has multiple HTML variants showcased in Storybook.

### Global Styles Entry Point
All design tokens are imported via `ui/styles/index.css`:
```css
@import "./tokens/colors.css";  /* Semantic color tokens */
@import "./fonts.css";           /* Font theme loader */
@import "./icons.css";           /* Icon system */
@import "./typography.css";      /* Type scale */
@import "./space.css";           /* Spacing scale */
@import "./grid.css";            /* Grid system */
@import "./layouts.css";         /* Layout utilities */
```

This file is imported into `.storybook/preview.js` to make all tokens available globally in Storybook.

### Component CSS Standards

**Global Design System Access:**
All component CSS files have **automatic access** to the complete design system via Storybook's global configuration. Design tokens are loaded globally in `.storybook/preview.js`, so **DO NOT** include `@import` statements in individual component CSS files.

**Available Design System Tokens:**
All components can use these tokens without any imports:
- Semantic color tokens (`--color-primary`, `--color-surface`, etc.)
- Typography scale (`--step--4` through `--step-8`)
- Spacing scale (`--space-3xs` through `--space-3xl`, plus fluid pairs)
- Grid system (`.u-container`, `.u-grid`, `--grid-max-width`, `--grid-gutter`)
- Layout utilities (`.l-container`, `.l-split-*`, `.l-stack`, `.l-overlay`, etc.)
- Font tokens (`--font-sans`, `--font-serif`, `--font-mono`, `--font-display`)
- Icon system (`--icon-size-*`, Material Design icons)

**Why Global Loading?**
- ✅ Single source of truth - design system loaded once in Storybook
- ✅ Zero duplication - no import statements across 50+ component files
- ✅ Faster development - no import paths to remember
- ✅ Cleaner components - only component-specific styles in CSS files
- ✅ Better performance - stylesheet loaded once, cached globally

**Layout Utilities Reference:**

Layout utilities (`ui/styles/layouts.css`) provide reusable responsive patterns:

**Containers:**
- `.l-container` - Container with max-width and padding (NO grid - use with layout utilities below)
- `.l-grid` - Creates 12-column grid (use when you need custom grid layouts)

**IMPORTANT:** Layout utilities like `.l-split-*`, `.l-stack`, `.l-overlay` automatically CREATE the grid. You DON'T need `.l-grid` when using these - just use `.l-container` for max-width constraint.

**Responsive Splits:**
- `.l-split-half` - 50/50 split (mobile: stacked, tablet+: 6/6 columns)
- `.l-split-60-40`, `.l-split-40-60` - 60/40 splits (7/5 columns)
- `.l-split-70-30`, `.l-split-30-70` - 70/30 splits (8/4 columns)
- `.l-split-80-20`, `.l-split-20-80` - 80/20 splits (10/2 columns)

**Stack Layouts:**
- `.l-stack` - Vertical stacking
- `.l-stack--gap-[xs|s|m|l|xl]` - Stacking with configured gaps

**Overlay & Positioning:**
- `.l-overlay` - Layered content (hero images, overlays)
- `.l-offset` - Content overlapping media

**Spacing Utilities:**
- `.l-gap-[3xs|2xs|xs|s|m|l|xl|2xl|3xl]` - Quick gap spacing
- `.l-pad-[3xs|2xs|xs|s|m|l|xl|2xl|3xl]` - Quick padding
- `.l-pad-block-*`, `.l-pad-inline-*` - Directional padding
- `.l-mar-block-*` - Block margins
- `.l-mar-inline-auto` - Center horizontally

**Content Width:**
- `.l-content--narrow` (45ch), `.l-content--readable` (65ch), `.l-content--wide` (80ch)
- `.l-content--center` - Center content

**Responsive Utilities:**
- `.l-hide-mobile`, `.l-hide-desktop` - Responsive visibility
- `.l-text-center-mobile`, `.l-text-center-desktop` - Responsive text alignment
- `.l-reverse-desktop` - Swap child order on desktop

**Aspect Ratios:**
- `.l-aspect-1-1`, `.l-aspect-16-9`, `.l-aspect-21-9`, `.l-aspect-4-3`, `.l-aspect-3-4`, `.l-aspect-3-2`, `.l-aspect-2-3`

**Cards:**
- `.l-card` (400px), `.l-card--sm` (320px), `.l-card--md` (400px), `.l-card--lg` (520px)
- `.l-card--center` - Center card

**Other:**
- `.l-full-bleed` - Break out to full viewport width
- `.l-align-*`, `.l-justify-*` - Alignment utilities

See `ui/styles/layouts.css` for complete reference and responsive breakpoints.

## Working with Components

### Adding a New Component
1. Create directory: `ui/src/components/MyComponent/`
2. Create variant HTML files: `MyComponentDefault.html`, `MyComponentVariant.html`
3. Create CSS file: `MyComponent.css` - **no imports needed**, design tokens are globally available
4. Create stories file: `MyComponent.stories.js` importing HTML with `?raw`

### Styling Guidelines
- **NO CSS imports needed** - Design tokens are globally available via Storybook configuration
- **Never use hardcoded colors** - use `var(--color-*)` tokens
- **Never use hardcoded fonts** - use `var(--font-*)` tokens
- **Use spacing tokens** - `var(--space-*)` for margins, padding, gaps
- **Use typography tokens** - `var(--step-*)` for font sizes
- **Leverage layout utilities** - Use `.l-*` classes for common responsive patterns
- **Configuration over convention** - Reach for any token/utility as needed
- Follow existing component patterns for consistency

### Layout Utility Examples

**Two-column responsive layout:**
```html
<!-- .l-container provides max-width/padding, .l-split-half creates the grid -->
<div class="l-container l-split-half">
  <div>Column 1 (full width mobile, 50% desktop)</div>
  <div>Column 2 (full width mobile, 50% desktop)</div>
</div>
```

**Control column order (MediaLockup pattern):**
```html
<!-- Image LEFT (default) - HTML order: image, content -->
<div class="media-lockup l-container l-split-half">
  <div class="media-lockup__image">...</div>
  <div class="media-lockup__content">...</div>
</div>

<!-- Image RIGHT - Same HTML order + modifier class -->
<div class="media-lockup media-lockup--image-right l-container l-split-half">
  <div class="media-lockup__image">...</div>
  <div class="media-lockup__content">...</div>
</div>
```

**Without container (full-width grid):**
```html
<!-- Just .l-split-half creates grid without max-width constraint -->
<div class="l-split-half">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

**Stacked content with spacing:**
```html
<!-- .l-stack creates single-column grid, .l-stack--gap-m sets gap size -->
<div class="l-container l-stack l-stack--gap-m">
  <h1>Title</h1>
  <p>Content</p>
  <button>Action</button>
</div>
```

**Hero overlay:**
```html
<section class="section section--height-100">
  <!-- .l-overlay creates grid where children overlap in same cell -->
  <div class="l-container l-overlay">
    <img src="hero.jpg" alt="Hero">
    <div class="l-content--center">
      <h1>Hero Title</h1>
      <p>Hero content</p>
    </div>
  </div>
</section>
```

**Common Mistake to Avoid:**
```html
<!-- ❌ WRONG - Don't use .l-grid with layout utilities -->
<div class="l-container l-grid l-split-half">

<!-- ✅ CORRECT - Layout utilities create their own grid -->
<div class="l-container l-split-half">
```

### Testing Theme Changes
After modifying theme files, check components in Storybook to ensure they adapt correctly. All components should work with any theme without modification.

## Deployment

### API (Deno Deploy)
1. Push to GitHub
2. Link repository in Deno Deploy dashboard
3. Set entry point: `api/main.ts`
4. Required permissions: `--allow-net`, `--allow-read`, `--allow-env`

### UI (Static Hosting)
Build Storybook (`npm run build-storybook`) and deploy the `storybook-static` directory to any static host.
