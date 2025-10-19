# Storefront Components - Architecture

This document explains the architectural decisions behind the Storefront components and how they align with browser-native web component best practices.

## Core Architectural Principles

### 1. Light DOM Only (No Shadow DOM)

**Decision:** Use Light DOM exclusively, never call `attachShadow()`.

**Rationale:**
- Shadow DOM creates a style encapsulation boundary
- Design system tokens live in global scope (`:root`)
- Shadow DOM would require complex CSS injection to access tokens
- Light DOM allows seamless integration with global styles

**Implementation:**
```javascript
class StorefrontComponent extends HTMLElement {
  connectedCallback() {
    // No this.attachShadow() - use Light DOM
    this.classList.add('storefront');
  }
}
```

**Trade-offs:**
- ✅ Design tokens work immediately
- ✅ Theme switching works without component updates
- ✅ CSS can be customized globally
- ✅ Server-side rendering compatible
- ❌ No automatic style encapsulation (mitigated by scoped class names)

### 2. No innerHTML or DOM Manipulation

**Decision:** Never use `innerHTML`, `outerHTML`, or create internal structure.

**Rationale:**
- `innerHTML` is a primary XSS attack vector
- DOM manipulation creates unpredictable component state
- Declarative HTML is easier to debug and reason about
- Server-side rendering requires HTML structure in markup

**Implementation:**
```javascript
// ❌ NEVER do this
connectedCallback() {
  this.innerHTML = `<div class="grid">...</div>`;
}

// ✅ ALWAYS do this
connectedCallback() {
  this.classList.add('storefront');
  this.updateLayout(); // Only update classes based on attributes
}
```

**Security Benefits:**
- Zero XSS attack surface from innerHTML
- No untrusted content injection
- Predictable component behavior

### 3. Attribute-Based State Management

**Decision:** All component state is controlled via HTML attributes.

**Rationale:**
- Attributes are serializable (work with SSR)
- Attributes are declarative (visible in HTML)
- Attributes integrate with CSS (`:has()`, `[data-*]`)
- Attributes provide clear public API

**Implementation:**
```javascript
class StorefrontComponent extends HTMLElement {
  static observedAttributes = ['layout', 'gap', 'constrain'];

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateLayout();
    }
  }

  get layout() {
    return this.getAttribute('layout') || 'half';
  }

  set layout(value) {
    this.setAttribute('layout', value);
  }
}
```

**Benefits:**
- Clear public API (documented attributes)
- CSS can target state (`.storefront[layout="half"]`)
- JavaScript can read/write via properties
- Works with frameworks and SSR

### 4. Composition Over Manipulation

**Decision:** Components don't create child structure, they only manage their own classes.

**Rationale:**
- Follows principle: "HTML declares structure, JavaScript declares behavior"
- Prevents component from reaching into child DOM
- Makes components predictable and testable
- Compatible with server-side rendering

**Implementation:**
```html
<!-- ❌ BAD: Component creates this internally via JavaScript -->
<storefront-component>
  <!-- JavaScript injects this -->
</storefront-component>

<!-- ✅ GOOD: Structure is declared in HTML -->
<storefront-component layout="half" gap="l">
  <storefront-assets variant="primary">
    <img src="product.jpg" alt="Product">
  </storefront-assets>
  <storefront-form variant="surface-variant">
    <h2>Title</h2>
  </storefront-form>
</storefront-component>
```

**Benefits:**
- Component behavior is isolated to self
- Children are independent components
- Clear parent-child relationships
- Easy to debug (view HTML in DevTools)

### 5. Design System Integration

**Decision:** Leverage existing layout utilities instead of duplicating CSS.

**Rationale:**
- Design system provides `.l-split-*`, `.l-container`, `.l-gap-*`
- These utilities are already responsive and tested
- Reduces CSS bundle size
- Ensures consistency across components

**Implementation:**
```javascript
// Component applies utility classes based on attributes
updateLayout() {
  const layout = this.getAttribute('layout') || 'half';
  const layoutMap = {
    'half': 'l-split-half',
    '60-40': 'l-split-60-40',
    // ...
  };
  this.classList.add(layoutMap[layout]);
}
```

**Benefits:**
- Zero duplication of layout CSS
- Consistent with other components
- Automatic responsive behavior
- Smaller CSS bundles

### 6. Modern CSS Features

**Decision:** Use `@layer`, `:has()`, and data attributes for styling.

**Rationale:**
- `@layer` provides cascade control without specificity wars
- `:has()` enables parent-child state awareness
- Data attributes separate state from classes
- Progressive enhancement (graceful degradation)

**Implementation:**
```css
/* @layer for cascade control */
@layer storefront.base {
  .storefront { display: block; }
}

@layer storefront.state {
  .storefront-assets[data-align="center"] {
    justify-content: center;
  }
}

/* :has() for content-aware styling */
@supports selector(:has(*)) {
  .storefront-assets:has(> img:only-child) {
    padding: 0; /* Full-bleed for single image */
  }
}
```

**Benefits:**
- Low specificity (easy to override)
- Content-aware styling
- Clear separation of concerns
- Future-proof CSS

## Component Architecture

### Parent: `<storefront-component>`

**Responsibilities:**
- Apply layout utility classes based on `layout` attribute
- Apply gap utility classes based on `gap` attribute
- Apply container class based on `constrain` attribute
- Provide semantic wrapper for child components

**NOT Responsible For:**
- Creating grid structure (uses `.l-split-*` utilities)
- Managing child component state
- Styling child components

### Children: `<storefront-assets>` and `<storefront-form>`

**Responsibilities:**
- Apply variant classes based on `variant` attribute
- Set data attributes for state-based CSS targeting
- Provide semantic containers for content

**NOT Responsible For:**
- Creating internal HTML structure
- Managing layout (handled by parent)
- Querying or manipulating child content

## Data Flow

```
HTML Attributes
    ↓
observedAttributes → attributeChangedCallback()
    ↓
Update CSS classes / data attributes
    ↓
CSS selectors target classes/attributes
    ↓
Visual presentation
```

**Example:**
```html
<storefront-component layout="60-40" gap="m">
  <!-- layout="60-40" triggers attributeChangedCallback -->
  <!-- Component adds class: .l-split-60-40 -->
  <!-- gap="m" triggers attributeChangedCallback -->
  <!-- Component adds class: .l-gap-m -->
  <!-- CSS applies grid layout and gap spacing -->
</storefront-component>
```

## CSS Architecture

### Layer Organization

```
@layer storefront.base      { /* Structural defaults */ }
@layer storefront.components { /* Variant styles */ }
@layer storefront.state      { /* Data-attribute states */ }
@layer storefront.utilities  { /* Helper styles */ }
```

**Priority:** utilities > state > components > base

### Specificity Strategy

- Use single-class selectors (`.storefront-assets--primary`)
- Use data-attribute selectors (`[data-align="center"]`)
- Avoid nested selectors
- Keep specificity flat and low

**Example:**
```css
/* ✅ GOOD: Low specificity */
.storefront-assets--primary { }

/* ✅ GOOD: Data attribute targeting */
.storefront-assets[data-align="center"] { }

/* ❌ BAD: High specificity */
.storefront .storefront-assets.primary { }
```

## Browser Compatibility

**Required:**
- Custom Elements API (Chrome 67+, Firefox 63+, Safari 12.1+)
- ES Modules (Chrome 61+, Firefox 60+, Safari 11+)
- CSS Custom Properties (all modern browsers)
- CSS Grid (all modern browsers)

**Optional (Progressive Enhancement):**
- `@layer` (Chrome 99+, Firefox 97+, Safari 15.4+)
- `:has()` (Chrome 105+, Firefox 103+, Safari 15.4+)

Components work without `@layer` and `:has()`, but with reduced cascade control and content-aware styling.

## Security Considerations

**XSS Prevention:**
- Never use `innerHTML`, `outerHTML`, or HTML string insertion
- All content is declared in HTML by developer
- No dynamic HTML generation from user input

**CSP Compatibility:**
- No inline styles (except in CSS files)
- No inline scripts
- Works with strict Content Security Policy

## Performance Characteristics

**Bundle Size:**
- JavaScript: ~5KB total (3 files, uncompressed)
- CSS: ~3KB (uncompressed)
- No dependencies

**Runtime Performance:**
- No Shadow DOM overhead
- Uses hardware-accelerated CSS Grid
- Minimal JavaScript execution (only class management)
- No re-renders on attribute changes (CSS handles visual updates)

**Loading Performance:**
- CSS is render-blocking (intentional, prevents FOUC)
- JavaScript is async (ES modules are deferred by default)
- Progressive enhancement (works without JavaScript for basic layout)

## Testing Strategy

**Manual Testing:**
1. Visual regression testing in Storybook
2. Responsive behavior testing (resize browser)
3. Attribute changes via DevTools
4. Theme switching
5. Browser compatibility testing

**Automated Testing (Future):**
- Web Test Runner for unit tests
- Playwright for visual regression
- Accessibility testing with axe-core

## Comparison with Other Approaches

### vs Shadow DOM Components

| Aspect | Light DOM (Ours) | Shadow DOM |
|--------|------------------|------------|
| Token Access | Direct (`:root` variables) | Requires CSS injection |
| Theme Switching | Automatic | Requires JavaScript |
| CSS Override | Easy | Requires `::part()` |
| SSR Compatible | Yes | Limited |
| Bundle Size | Smaller | Larger (polyfills) |

### vs Framework Components (React, Vue, Svelte)

| Aspect | Web Components (Ours) | Framework Components |
|--------|----------------------|----------------------|
| Dependencies | Zero | Framework runtime |
| Build Step | Optional | Required |
| Browser Support | Native | Via build tools |
| Portability | Copy folder | Complex |
| Bundle Size | ~5KB | 40KB+ (framework) |

### vs Utility-First (Tailwind)

| Aspect | Components (Ours) | Tailwind |
|--------|------------------|----------|
| Semantics | High (custom elements) | Low (div soup) |
| Reusability | Component-based | Class-based |
| JavaScript API | Yes (attributes) | No |
| Type Safety | Via TypeScript | No |
| HTML Readability | High | Low (many classes) |

## Design Decisions Q&A

**Q: Why not use slots for child content?**
A: Slots are a Shadow DOM feature. In Light DOM, children are already in the light tree, so slots are unnecessary. We rely on direct child composition.

**Q: Why not emit custom events?**
A: These are presentational components with no interactive behavior. Events should be added by consumers on the actual interactive elements (buttons, forms).

**Q: Why not use a build tool?**
A: Native ES modules work in all modern browsers. Build tools are optional for production optimization, but not required for development or basic usage.

**Q: Why BEM naming instead of utility classes?**
A: BEM provides semantic class names that describe component purpose. This complements the design system's utility classes (`.l-*`) and creates a clear separation between layout utilities and component styles.

**Q: Why not use CSS-in-JS?**
A: CSS files are cacheable, parseable by browsers, and work without JavaScript. CSS-in-JS adds runtime overhead and requires JavaScript execution before styles apply.

## Future Enhancements

**Potential Improvements:**
1. TypeScript definitions (`.d.ts` files)
2. Unit tests (Web Test Runner)
3. Visual regression tests (Playwright)
4. Accessibility tests (axe-core)
5. Storybook controls for all attributes
6. Performance monitoring (Web Vitals)

**Non-Goals:**
- Adding Shadow DOM (breaks design system integration)
- Adding build step requirement (breaks copy-paste portability)
- Adding dependencies (breaks vanilla JS promise)
- Creating internal structure (breaks composition principle)

## Conclusion

This architecture prioritizes:
- **Security** - No innerHTML, no XSS surface
- **Portability** - Copy folder, add to project
- **Integration** - Works with design system tokens
- **Simplicity** - Minimal JavaScript, browser-native features
- **Maintainability** - Clear separation of concerns, documented patterns
- **Performance** - Small bundles, efficient rendering

The key insight: **Light DOM + attribute-based state + composition** provides all the benefits of web components without the complexity and limitations of Shadow DOM.
