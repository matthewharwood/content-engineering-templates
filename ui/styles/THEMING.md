# Theming Guide

This design system uses a Material Design 3 inspired theming system with semantic color tokens.

## How It Works

### 1. Color Tokens (Semantic)
Located in `tokens/colors.css`, these define the **purpose** of colors:
- `--color-primary` - Main brand color
- `--color-on-primary` - Text/icons on primary
- `--color-surface` - Component backgrounds
- `--color-outline` - Borders
- etc.

### 2. Themes (Actual Colors)
Located in `themes/`, these define the **actual color values**:
- `default.css` - Material Design 3 inspired colors
- `blank.css` - Minimal browser-default colors

### 3. Components
All components use color tokens (never hardcoded colors):
```css
.btn--primary {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}
```

## Switching Themes

Edit `styles/index.css`:

```css
/* Active theme */
@import "./themes/default.css";

/* Commented out */
/* @import "./themes/blank.css"; */
```

Swap the imports to change themes.

## Creating a Custom Theme

1. **Copy a theme file:**
   ```bash
   cp ui/styles/themes/default.css ui/styles/themes/my-brand.css
   ```

2. **Replace color values:**
   ```css
   :root {
     --theme-primary: #your-color;
     --theme-on-primary: #ffffff;
     /* ... update all values ... */
   }
   ```

3. **Import your theme:**
   ```css
   /* In styles/index.css */
   @import "./themes/my-brand.css";
   ```

## Color Roles Reference

Based on Material Design 3:

### Primary
Main brand color used for primary actions and key components.
- `--theme-primary`
- `--theme-on-primary` (text/icons on primary)
- `--theme-primary-container` (lighter variant)
- `--theme-on-primary-container` (text on container)

### Secondary
Complementary brand color for less prominent components.
- `--theme-secondary`
- `--theme-on-secondary`
- `--theme-secondary-container`
- `--theme-on-secondary-container`

### Tertiary
Additional accent color for special emphasis.
- `--theme-tertiary`
- `--theme-on-tertiary`
- `--theme-tertiary-container`
- `--theme-on-tertiary-container`

### Error
Error states and destructive actions.
- `--theme-error`
- `--theme-on-error`
- `--theme-error-container`
- `--theme-on-error-container`

### Surface
Component and card backgrounds.
- `--theme-surface`
- `--theme-on-surface`
- `--theme-surface-variant`
- `--theme-on-surface-variant`

### Background
Page background.
- `--theme-background`
- `--theme-on-background`

### Outline
Borders and dividers.
- `--theme-outline`
- `--theme-outline-variant`

### Inverse
High contrast scenarios.
- `--theme-inverse-surface`
- `--theme-inverse-on-surface`
- `--theme-inverse-primary`

### Shadow & Scrim
- `--theme-shadow`
- `--theme-scrim`

## Tips for Custom Themes

1. **Start with a generator:** Use [Material Theme Builder](https://m3.material.io/theme-builder) to generate a cohesive palette from your brand color.

2. **Maintain contrast:** Ensure text colors meet WCAG AA standards (4.5:1 for normal text).

3. **Test both themes:** Check your custom theme against both `default.css` and `blank.css` patterns.

4. **Use "on" colors:** Always pair surfaces with their "on" color for proper contrast.

## Component Usage

Components automatically use the theme:

```html
<!-- Button uses --color-primary -->
<button class="btn btn--primary">Click me</button>

<!-- Grid demo uses --color-surface-variant -->
<div class="grid-demo-column">Column</div>

<!-- Space demo uses --color-outline -->
<div class="space-demo-box">Box</div>
```

No hardcoded colors in components!
