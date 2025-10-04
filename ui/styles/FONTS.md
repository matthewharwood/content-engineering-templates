# Font System Guide

This design system uses a configurable font system with semantic font tokens, similar to the theming system.

## How It Works

### 1. Font Tokens (Semantic)
Located in `fonts.css`, these define the **purpose** of fonts:
- `--font-sans` - Body text, UI elements, buttons
- `--font-serif` - Longform content, articles, elegant text
- `--font-mono` - Code blocks, technical content
- `--font-display` - Headings, hero text, marketing content

### 2. Font Themes (Actual Fonts)
Located in `font-themes/`, these define the **actual font families**:
- `default.css` - Inter, Source Serif 4, Source Code Pro, Playfair Display (Google Fonts)

### 3. Components
All components use font tokens (never hardcoded fonts):
```css
.btn {
  font-family: var(--font-sans);
}

.code-block {
  font-family: var(--font-mono);
}
```

## Switching Font Themes

Edit `styles/fonts.css` - change one line to switch fonts globally:

```css
/* Active Font Theme - Change this line to switch fonts */
@import "./font-themes/default.css";

/* Available Font Themes */
/* @import "./font-themes/your-custom-fonts.css"; */
```

## Creating a Custom Font Theme

1. **Copy a font theme file:**
   ```bash
   cp ui/styles/font-themes/default.css ui/styles/font-themes/my-brand.css
   ```

2. **Replace font imports and values:**
   ```css
   /* Import your fonts (Google Fonts, Adobe Fonts, or self-hosted) */
   @import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

   :root {
     --font-theme-sans: 'Your Sans Font', sans-serif;
     --font-theme-serif: 'Your Serif Font', serif;
     --font-theme-mono: 'Your Mono Font', monospace;
     --font-theme-display: 'Your Display Font', serif;
   }
   ```

3. **Import your theme:**
   ```css
   /* In styles/fonts.css */
   @import "./font-themes/my-brand.css";
   ```

## Default Font Theme

The default theme uses Google Fonts:

### Sans Serif - Inter
Modern, highly legible sans-serif for body text and UI elements.
- Variable: `--font-sans`
- Usage: Body text, buttons, form inputs, navigation

### Serif - Source Serif 4
Classic, readable serif for longform content.
- Variable: `--font-serif`
- Usage: Articles, blog posts, elegant text

### Monospace - Source Code Pro
Clear monospace font for technical content.
- Variable: `--font-mono`
- Usage: Code blocks, variable names, technical documentation

### Display - Playfair Display
Elegant serif for headings and marketing content.
- Variable: `--font-display`
- Usage: Page titles, hero sections, marketing headlines

## Font Loading

Fonts are loaded via `@import` in the font theme file. For better performance, consider:

1. **Preload critical fonts** in your HTML:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   ```

2. **Use variable fonts** when available for better performance

3. **Self-host fonts** for production for maximum control and privacy

## Usage in Components

Components automatically use the font theme through semantic tokens:

```css
/* Body text */
body {
  font-family: var(--font-sans);
}

/* Headings */
h1, h2, h3 {
  font-family: var(--font-display);
}

/* Code */
code, pre {
  font-family: var(--font-mono);
}

/* Quotes, articles */
blockquote {
  font-family: var(--font-serif);
}
```

## Tips for Custom Fonts

1. **Always include fallbacks**: Ensure your font stack includes system fonts as fallbacks
   ```css
   --font-theme-sans: 'Your Font', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
   ```

2. **Load only needed weights**: Only import the font weights you actually use (400, 600, 700)

3. **Test readability**: Ensure your fonts meet accessibility standards for readability

4. **Consider variable fonts**: Variable fonts can reduce loading time while providing multiple weights

5. **Consistent font usage**: Use semantic tokens consistently across all components
