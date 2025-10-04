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
```

This file is imported into `.storybook/preview.js` to make all tokens available globally in Storybook.

## Working with Components

### Adding a New Component
1. Create directory: `ui/src/components/MyComponent/`
2. Create variant HTML files: `MyComponentDefault.html`, `MyComponentVariant.html`
3. Create CSS file: `MyComponent.css` (use semantic tokens only)
4. Create stories file: `MyComponent.stories.js` importing HTML with `?raw`

### Styling Guidelines
- **Never use hardcoded colors** - use `var(--color-*)` tokens
- **Never use hardcoded fonts** - use `var(--font-*)` tokens
- **Use spacing tokens** - `var(--space-*)` for margins, padding, gaps
- **Use typography tokens** - `var(--type-*)` for text styling
- Follow existing component patterns for consistency

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
