# Architecture Decisions

This document records significant design and architecture decisions made during development.

---

## ADR-001: Index.html Refactor Strategy

**Date:** 2025-10-18
**Status:** Proposed
**Decision Makers:** CSS Performance Engineer, Viral Commerce Architect

### Context
The current index.html (316 lines) demonstrates a viral product landing page but has significant code quality issues:
- 17 inline style anti-patterns preventing theme consistency
- 3 duplicate grid implementations ignoring existing Utopia grid system
- Broken mobile responsiveness (no mobile-first design)
- Inline `<style>` block should be external CSS
- Components loaded but severely underutilized

The page works as a proof-of-concept but isn't production-ready or maintainable.

### Decision
Refactor index.html using a **systematic, phased approach** that prioritizes fixing critical issues first while building missing design system pieces:

**Phase 1: Foundation (Critical)**
1. Create `/index.css` to eliminate ALL inline styles
2. Fix mobile responsiveness with mobile-first grid approach
3. Replace manual grid code with Utopia grid system (`.u-container`, `.u-grid`, `.col-span-*`)
4. Extract inline `<style>` block to `/index.css`

**Phase 2: Design System Gaps (High Priority)**
5. Build Typography utility classes (`.type-heading-*`, `.type-body`, etc.)
6. Create responsive image container pattern
7. Clarify/document mobile behavior of `.l-split-*` layout utilities
8. Build ProductCard component

**Phase 3: Component Abstraction (Medium Priority)**
9. Extract repeated product layout pattern into reusable component
10. Build missing e-commerce components (PriceDisplay, QuantitySelector, etc.)
11. Create MediaLockup variant for product pages
12. Implement Section component for semantic structure

### Rationale

**Why Not "Big Bang" Refactor:**
- Risk of breaking working page
- Need to build missing design system pieces first
- Iterative approach allows validation at each step

**Why Phase Typography Utilities First:**
- Highest ROI - unlocks entire refactor
- Simple to implement (just CSS utility classes)
- No component dependencies
- Immediately eliminates most inline styles

**Why Use Existing Grid System:**
- Utopia grid already exists and is well-designed
- Manual grid code duplicates functionality
- Creates technical debt and inconsistency
- Existing system is responsive and theme-aware

**Why Prioritize Mobile Responsiveness:**
- Currently completely broken on mobile
- Critical user experience issue
- Affects SEO and accessibility
- Required for production deployment

### Consequences

**Positive:**
- ~40% reduction in HTML line count
- Elimination of ALL inline styles
- Theme-consistent styling
- Mobile-responsive design
- Reusable component patterns
- Maintainable codebase
- Demonstrates design system value

**Negative:**
- Requires building missing design system pieces first
- Phased approach takes longer than quick fix
- Need to update documentation as we go
- Team learning curve on new utilities

**Risks:**
- May discover more gaps during refactor
- Mobile breakpoints may need adjustment
- Component abstractions may need iteration

### Implementation Plan

**Week 1: Critical Fixes**
- Create Typography utility classes
- Build `/index.css` file
- Fix mobile responsiveness
- Replace manual grid code with Utopia grid

**Week 2: Component Development**
- Build ProductCard component
- Create responsive image container pattern
- Develop PriceDisplay component
- Document layout utility mobile behavior

**Week 3: Abstraction & Polish**
- Extract product layout pattern
- Build remaining e-commerce components
- Refactor all sections to use components
- Update Storybook documentation

### Success Metrics

**Code Quality:**
- Zero inline styles in index.html
- Zero manual grid implementations
- All styles use semantic tokens
- All layouts use design system utilities

**Line Count:**
- Reduce index.html from 316 lines to ~190 lines (40% reduction)
- Extract ~75 lines to `/index.css`
- Net reduction through component reuse

**Responsiveness:**
- All layouts stack properly on mobile (< 768px)
- All content readable on 320px viewport
- No horizontal scroll on any viewport size
- All interactive elements accessible on touch

**Component Reuse:**
- Product layout pattern used 3x (currently duplicated)
- Typography utilities used throughout (replace 17+ inline styles)
- Grid system used consistently (replace 3 manual implementations)

**Performance:**
- Lighthouse accessibility score: 100
- Lighthouse mobile usability: 100
- No layout shift issues
- Fast paint times with external CSS

---

## ADR-002: Design System Component Strategy

**Date:** 2025-10-18
**Status:** Proposed

### Context
Analysis revealed 11+ missing e-commerce components needed for production pages. Current design system focuses on primitive components (Button, Icon, Typography) but lacks composed e-commerce patterns.

### Decision
Build e-commerce components in **three tiers**:

**Tier 1: Primitive Utilities** (Build First)
- Typography utility classes
- Responsive image containers
- Layout utilities clarification

**Tier 2: E-Commerce Atoms** (Build Second)
- PriceDisplay
- QuantitySelector
- ReviewStars
- Breadcrumbs

**Tier 3: E-Commerce Molecules** (Build Third)
- ProductCard (combines image, price, title)
- Product Layout Pattern (combines MediaLockup concepts)
- Cart Drawer (combines multiple atoms)
- Variant Selector (combines ButtonGroup patterns)

### Rationale

**Tier 1 Focus:**
- Utilities unblock everything else
- Highest reuse potential
- Smallest implementation effort
- No dependencies

**Tier 2 Focus:**
- Reusable across all e-commerce pages
- Clear single responsibility
- Can be built independently
- Well-understood patterns

**Tier 3 Focus:**
- Compose Tier 1 + Tier 2 components
- Product-specific patterns
- More complex state management
- May need iteration based on usage

**Why Not Build Everything at Once:**
- Unknown requirements for Tier 3
- Tier 1 unblocks current refactor
- Tier 2 can be built as needed
- Allows validation of patterns before composition

### Consequences

**Positive:**
- Clear dependency hierarchy
- Incremental value delivery
- Lower risk of over-engineering
- Allows learning from Tier 1/2 before building Tier 3

**Negative:**
- Some e-commerce patterns won't exist initially
- May need to iterate on Tier 3 designs
- Temporary workarounds for missing components

### Next Steps
1. Build Typography utilities (Tier 1)
2. Document responsive image pattern (Tier 1)
3. Build PriceDisplay component (Tier 2)
4. Validate component patterns in refactored index.html

---

## ADR-003: Typography Utility Approach

**Date:** 2025-10-18
**Status:** Proposed

### Context
Typography tokens exist (`--step-0` through `--step-8`) but no utility classes to apply them. Current code uses inline styles for all typography, preventing consistency and theme adherence.

### Decision
Create **semantic typography utility classes** that map to design tokens:

```css
/* Type Scale */
.type-body { font-size: var(--step-0); line-height: 1.6; }
.type-body-large { font-size: var(--step-1); line-height: 1.6; }
.type-body-small { font-size: var(--step--1); line-height: 1.5; }

/* Headings */
.type-heading-1 { font-size: var(--step-4); font-weight: 700; line-height: 1.2; }
.type-heading-2 { font-size: var(--step-3); font-weight: 700; line-height: 1.2; }
.type-heading-3 { font-size: var(--step-2); font-weight: 600; line-height: 1.3; }
.type-heading-4 { font-size: var(--step-1); font-weight: 600; line-height: 1.4; }

/* Specialized */
.type-label { font-size: var(--step--1); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
.type-price { font-size: var(--step-2); font-weight: 600; color: var(--color-primary); }
.type-caption { font-size: var(--step--2); line-height: 1.4; color: var(--color-on-surface-variant); }
```

### Rationale

**Why Semantic Names:**
- `.type-heading-2` is clearer than `.type-step-3`
- Describes purpose, not implementation
- Easier for non-technical users
- Matches component naming convention

**Why Include Line Height:**
- Typography scale should define complete text styling
- Prevents inconsistent line-height declarations
- Matches Material Design 3 approach
- Single class application

**Why Specialized Classes:**
- Common patterns deserve dedicated utilities
- `.type-price` bundles size + weight + color
- `.type-label` includes uppercase transformation
- Reduces need for multiple class combinations

**Why Not Component Approach:**
- Typography is presentation, not structure
- Utilities more flexible than components
- Follows existing design system pattern (`.img--cover`, etc.)
- Lower barrier to adoption

### Alternatives Considered

**Alternative 1: Step-Based Classes**
```css
.type-step-0 { font-size: var(--step-0); }
.type-step-1 { font-size: var(--step-1); }
```
- Rejected: Not semantic, exposes implementation details

**Alternative 2: Typography Components**
```html
<Typography variant="heading-2">Title</Typography>
```
- Rejected: Overkill for simple text styling, requires JS/templating

**Alternative 3: Direct Token Usage**
```html
<h2 style="font-size: var(--step-3);">Title</h2>
```
- Rejected: Current approach, causes inline style anti-patterns

### Consequences

**Positive:**
- Eliminates need for inline font-size styles
- Consistent line-height across design
- Clear semantic meaning
- Easy to learn and use
- Works with any HTML element

**Negative:**
- Adds ~15 new utility classes
- Need to document when to use each
- May need to expand for edge cases
- Requires updating existing components

### Implementation Location
Create `ui/styles/typography-utilities.css` and import in `ui/styles/index.css` after typography tokens.

---

## ADR-004: Mobile-First Grid Strategy

**Date:** 2025-10-18
**Status:** Proposed

### Context
Current index.html has broken mobile layout because grid code uses fixed `grid-column: span 6` without responsive breakpoints. Design system has `.l-split-*` utilities but their mobile behavior is unclear.

### Decision
**Clarify and document** that all `.l-split-*` utilities are **mobile-first by default**:

- Mobile (default): Stack vertically (single column)
- Tablet+ (768px+): Apply column split

Update documentation to make this explicit, and create examples showing mobile → desktop transformation.

### Rationale

**Why Mobile-First:**
- Matches CSS best practices
- Progressive enhancement approach
- Easier to understand (stack then split)
- Better performance (less CSS override)

**Why Document vs. Build:**
- Layout utilities already exist
- Behavior may already be mobile-first (needs verification)
- Documentation gap, not code gap
- Faster solution than building new system

**Why 768px Breakpoint:**
- Industry standard for tablet/desktop split
- Matches most design system conventions
- Aligns with common device sizes
- Good balance for most content

### Verification Needed
Before finalizing:
1. Test `.l-split-half` on mobile viewport (< 768px)
2. Verify stacking behavior exists
3. Check all `.l-split-*` variants
4. Document actual breakpoints used

### Consequences

**Positive:**
- Clear mobile behavior for developers
- Consistent responsive patterns
- No need to build new grid system
- Leverages existing utilities

**Negative:**
- If utilities don't stack on mobile, requires code changes
- May need to add responsive classes if behavior missing
- Documentation debt needs clearing

### Success Criteria
- All `.l-split-*` utilities documented with mobile/desktop examples
- Index.html refactor uses layout utilities exclusively
- Zero manual `grid-template-columns` declarations
- All layouts tested on 320px viewport

---

## ADR-005: Web Components File Organization

**Date:** 2025-10-19
**Status:** Accepted

### Context

The project needed to add web component functionality to support interactive, reusable UI patterns like the Storefront component. Key requirements:
- Copy-paste portability: entire component folder should be portable across workspaces
- Consistency with existing CSS import patterns
- Work without build tools or bundlers
- Integration with the global design system token architecture
- Static file serving by Deno API workspace

### Decision

Web components and their JavaScript live in **`/ui/src/components/[ComponentName]/`** alongside HTML and CSS files, using the same directory structure as existing CSS-based components.

**File Organization Pattern:**
```
/ui/src/components/ComponentName/
  ComponentName.js           # Parent web component
  ComponentNameChild.js      # Child components (if applicable)
  ComponentName.css          # Shared component styles
  ComponentNameDefault.html  # Usage examples
  ComponentName.stories.js   # Storybook integration
  README.md                  # Component documentation
  ARCHITECTURE.md            # Technical decisions (optional)
```

**Import Pattern:**
```html
<!-- CSS imports (in <head>) -->
<link rel="stylesheet" href="./ui/styles/index.css">
<link rel="stylesheet" href="./ui/src/components/ComponentName/ComponentName.css">

<!-- JS imports (at end of <body>) -->
<script type="module" src="./ui/src/components/ComponentName/ComponentName.js"></script>
```

### Rationale

**Why `/ui/src/components/` Location:**
- Consistent with existing component architecture (Button, Navigation, etc.)
- Same relative path pattern for CSS and JavaScript imports
- Users can copy entire component folder as a unit
- Storybook already configured to load from this location
- Deno API serves static files from project root, making all `/ui` paths accessible

**Why Co-located Files:**
- One folder contains everything: JS, CSS, HTML, docs
- Copy-paste friendly: move folder, update import paths, done
- Easier to maintain: all related files in one place
- Matches existing CSS component pattern (Button.css, Button.stories.js, ButtonPrimary.html)

**Why No Build Step:**
- Native ES modules work in all modern browsers (Chrome 67+, Firefox 63+, Safari 12.1+)
- Deno server already serves static JavaScript files with correct MIME types
- Reduces complexity and deployment steps
- Maintains copy-paste portability promise

**Why Same Pattern as CSS Imports:**
- Developers already understand `./ui/src/components/Button/Button.css`
- JavaScript follows identical pattern: `./ui/src/components/Storefront/Storefront.js`
- Mental model consistency across file types
- Works with existing Deno static file serving

### Alternatives Considered

**Alternative 1: Separate `/ui/src/web-components/` Directory**
```
/ui/src/web-components/Storefront/
  Storefront.js
  StorefrontAssets.js
```
- Rejected: Creates two component systems (CSS vs JS)
- Would require separate Storybook configuration
- Breaks conceptual unity (components should be together)
- Confusing for users: "Is Button a component or web component?"

**Alternative 2: Root-level `/components/` Directory**
```
/components/Storefront/
  Storefront.js
```
- Rejected: Breaks existing `/ui` workspace structure
- Would require different import paths for JS vs CSS
- Inconsistent with project monorepo organization
- Deno would serve from different base path

**Alternative 3: Bundled JavaScript in `/ui/dist/`**
```
/ui/dist/components.bundle.js
```
- Rejected: Requires build step (breaks portability)
- Single bundle is less modular
- No tree-shaking for users who want single component
- Adds deployment complexity

**Alternative 4: `/api/static/components/`**
```
/api/static/components/Storefront.js
```
- Rejected: Components are UI concerns, not API concerns
- Would separate JS from CSS (CSS stays in `/ui`)
- Confusing mental model (why are UI files in API folder?)
- Breaks Storybook integration

### Consequences

**Positive:**
- Consistent import pattern across CSS and JavaScript
- Copy entire folder for portability (single source of truth)
- Storybook integration works without configuration changes
- Deno static file serving works without special routing
- Clear mental model: "components live in `/ui/src/components/`"
- Future web components follow same pattern

**Negative:**
- `/ui/src/components/` now contains multiple types of files (.html, .css, .js)
- File count per component increases (3+ JS files for parent/children)
- Users must understand ES module imports (`type="module"`)

**Risks:**
- If Deno changes static file serving, import paths may break
- ES module support required (no fallback for old browsers)
- Large component folders may become unwieldy (mitigated by documentation)

### Implementation Guidelines

**For New Web Components:**
1. Create folder in `/ui/src/components/[ComponentName]/`
2. Add JavaScript files: `ComponentName.js` (and children if needed)
3. Add CSS file if shared styles exist: `ComponentName.css`
4. Add HTML example: `ComponentNameDefault.html`
5. Add Storybook integration: `ComponentName.stories.js`
6. Document in `README.md` with usage examples
7. If complex, add `ARCHITECTURE.md` with technical decisions

**Import Order in index.html:**
1. Design system tokens: `<link rel="stylesheet" href="./ui/styles/index.css">`
2. Component CSS: `<link rel="stylesheet" href="./ui/src/components/ComponentName/ComponentName.css">`
3. Component JS (at end of body): `<script type="module" src="./ui/src/components/ComponentName/ComponentName.js">`

**Custom Element Naming:**
- Use kebab-case: `<storefront-component>`, not `<StorefrontComponent>`
- Include project prefix if planning to share: `<snif-storefront>` (prevents naming collisions)
- Register with `customElements.define('element-name', ClassName)`

### Related Decisions
- ADR-006: Web Component Shadow DOM Strategy (Light DOM for token integration)
- See `web-components.md` for development guide
- See `components.md` for component catalog

---

## ADR-006: Web Component Shadow DOM Strategy

**Date:** 2025-10-19
**Status:** Accepted
**Complemented by:** ADR-007 (Declarative HTML Architecture)

### Context

Web Components support two rendering modes:
1. **Shadow DOM:** Encapsulated styles that don't interact with global CSS
2. **Light DOM:** Standard DOM that uses global CSS

The project uses a semantic token design system where all colors, spacing, and typography are defined as global CSS custom properties (`--color-primary`, `--space-l`, etc.). Components need access to these tokens to maintain theme consistency.

### Decision

Use **Light DOM (no Shadow DOM)** for all web components in this project.

Components achieve style scoping through **BEM naming conventions** instead of Shadow DOM encapsulation.

**Implementation Pattern:**
```javascript
class StorefrontComponent extends HTMLElement {
  constructor() {
    super();
    // NO this.attachShadow() - use Light DOM
  }

  connectedCallback() {
    // Add CSS class for styling hook
    // HTML structure defined in markup, not JavaScript (see ADR-007)
    if (!this.classList.contains('storefront-component')) {
      this.classList.add('storefront-component');
    }
  }
}

// Styles in external CSS file, not inline
// Storefront.css:
// .storefront-component {
//   background: var(--color-primary);  /* Access global token */
// }
```

### Rationale

**Why Light DOM:**
- Shadow DOM creates style encapsulation boundary that blocks access to global CSS custom properties
- Design system tokens live in `:root` scope and must be accessible to all components
- With Light DOM, components can directly reference `var(--color-primary)` without CSS injection
- Utopia grid utilities (`.u-container`, `.u-grid`, `.col-span-*`) work automatically
- Theme switching works instantly (change token values, all components update)

**Why BEM Naming for Scoping:**
- Block-Element-Modifier naming prevents style collisions: `.storefront-component__title`
- Scopes styles to component without Shadow DOM overhead
- Familiar pattern already used in CSS-only components
- Easy to debug (inspect element shows class names clearly)

**Why Not Shadow DOM:**
- Would require complex CSS injection to provide tokens inside shadow root
- Theme switching would require JavaScript to update shadow root styles
- Grid utilities wouldn't work (shadow boundary blocks external classes)
- Increases complexity without significant benefits for this use case

### Alternatives Considered

**Alternative 1: Shadow DOM + CSS Injection**
```javascript
constructor() {
  super();
  this.attachShadow({ mode: 'open' });
}

render() {
  // Must inject ALL design tokens into shadow root
  this.shadowRoot.innerHTML = `
    <style>
      :host {
        --color-primary: var(--color-primary);  /* Pass through every token */
        --space-l: var(--space-l);
        /* ... hundreds of tokens ... */
      }
    </style>
    <div>Content</div>
  `;
}
```
- Rejected: Brittle (must manually list every token)
- Breaks when new tokens added to design system
- Theme switching requires JavaScript updates
- Complex to maintain

**Alternative 2: Constructable Stylesheets**
```javascript
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  :host { display: block; }
`);
this.shadowRoot.adoptedStyleSheets = [globalTokenSheet, sheet];
```
- Rejected: Global token sheet would need constant synchronization
- Browser support less mature (Chrome 73+, Firefox 101+)
- Still requires manual token management
- Adds complexity for minimal benefit

**Alternative 3: CSS @import in Shadow DOM**
```javascript
this.shadowRoot.innerHTML = `
  <style>
    @import url('/ui/styles/index.css');
  </style>
`;
```
- Rejected: Performance issues (multiple HTTP requests)
- Flash of unstyled content (FOUC)
- Not guaranteed to work in all browsers
- Breaks encapsulation promise of Shadow DOM

### Consequences

**Positive:**
- Design tokens work immediately without configuration
- Theme switching works without component updates
- Simpler component code (no shadow root management)
- Better performance (no extra paint layers from shadow roots)
- Easier debugging (standard DOM inspection)
- Grid utilities work without special handling
- Compatible with existing CSS-only components

**Negative:**
- No true style encapsulation (rely on naming conventions)
- Component styles can theoretically be overridden by page styles
- Must maintain BEM naming discipline
- Multiple component instances inject duplicate `<style>` tags (mitigated by browser optimization)

**Risks:**
- Developers might create class name collisions if not following BEM
- Page styles using `!important` can override component styles
- Components can't prevent external styling (both feature and risk)

### Mitigation Strategies

**For Class Name Collisions:**
- Enforce strict BEM naming: `.[component-name]__[element]--[modifier]`
- Use component-specific prefixes: `.storefront-assets__title`
- Document naming conventions in component README

**For Style Overrides:**
- Rely on specificity (class selectors win over element selectors)
- Avoid `!important` in component styles (allow intentional overrides)
- Document that Light DOM allows customization (feature, not bug)

**For Duplicate Styles:**
- Browser optimizes duplicate `<style>` tags automatically
- If performance issue emerges, extract to separate CSS file
- Each component's styles are scoped to component classes

### When to Reconsider

Revisit this decision if:
1. Need for true style encapsulation (third-party embedding)
2. Browser support for CSS Shadow Parts improves significantly
3. Design system moves away from global tokens
4. Building a public web component library (not internal tool)

For now, Light DOM + BEM naming is the simplest solution that maintains full design token integration.

### Implementation Requirements

**All web components in this project MUST:**
- Use Light DOM (no `attachShadow()` call)
- Follow BEM naming for all classes: `.[component-name]__[element]--[modifier]`
- Use design system tokens via `var(--token-name)`
- Use external CSS files for all styles (no inline `<style>` injection - see ADR-007)
- Define HTML structure in markup, not JavaScript (see ADR-007)
- Document token dependencies in component README

**Example Template:**
```javascript
class MyComponent extends HTMLElement {
  constructor() {
    super();
    // No Shadow DOM
  }

  connectedCallback() {
    // Add CSS class for styling (see ADR-007)
    if (!this.classList.contains('my-component')) {
      this.classList.add('my-component');
    }
  }
}

customElements.define('my-component', MyComponent);

// HTML structure in markup:
// <my-component class="my-component">
//   <h2 class="my-component__title">Title</h2>
// </my-component>

// Styles in external CSS:
// .my-component {
//   background: var(--color-surface);
//   padding: var(--space-l);
// }
// .my-component__title {
//   font-size: var(--step-2);
//   color: var(--color-on-surface);
// }
```

---

## ADR-007: Web Component Declarative HTML Architecture

**Date:** 2025-10-19
**Status:** Accepted
**Supersedes:** Original Storefront implementation (innerHTML-based)

### Context

The initial Storefront web component implementation (ADR-005, ADR-006) used a hybrid approach:
- Light DOM (no Shadow DOM) for design token integration
- JavaScript `innerHTML` manipulation in `render()` methods
- Inline `<style>` tags injected by JavaScript
- Component structure created programmatically

This approach had several issues:
1. **Mixing concerns:** JavaScript responsible for both behavior AND structure
2. **Harder to customize:** Users must edit JavaScript to change HTML
3. **Not truly declarative:** Component structure hidden in JavaScript strings
4. **Runtime overhead:** DOM creation happens in JavaScript, not parser
5. **Developer experience:** Syntax highlighting breaks inside template strings

### Decision

Adopt a **fully declarative, browser-native architecture** for all web components:

**New Pattern:**
```javascript
// Component JavaScript - ONLY adds behavior, NOT structure
class StorefrontComponent extends HTMLElement {
  connectedCallback() {
    // Only add CSS class for styling hook
    if (!this.classList.contains('storefront')) {
      this.classList.add('storefront');
    }
  }
}

customElements.define('storefront-component', StorefrontComponent);
```

**HTML Structure (declarative in markup):**
```html
<storefront-component class="storefront">
  <div class="storefront-container">
    <div class="storefront-grid">
      <div class="storefront-grid__left">
        <storefront-assets class="storefront-assets">
          <div class="storefront-assets__content">
            <!-- User's content here -->
          </div>
        </storefront-assets>
      </div>
      <div class="storefront-grid__right">
        <storefront-form class="storefront-form">
          <div class="storefront-form__content">
            <!-- User's content here -->
          </div>
        </storefront-form>
      </div>
    </div>
  </div>
</storefront-component>
```

**Styles (external CSS only):**
```css
/* Storefront.css */
.storefront-assets {
  background: var(--color-primary);
  padding: var(--space-l);
}

.storefront-form {
  background: var(--color-surface-variant);
  padding: var(--space-l);
}
```

### Rationale

**Why Fully Declarative:**
- HTML structure visible in markup (easier to understand)
- Better developer experience (proper syntax highlighting, linting)
- Users can customize by editing HTML, not JavaScript
- Follows browser-native patterns (custom elements as semantic wrappers)
- Faster initial render (browser parser creates DOM, not JavaScript)

**Why Minimal JavaScript:**
- Web components are **semantic wrappers**, not DOM factories
- JavaScript adds **behavior**, CSS adds **presentation**, HTML adds **structure**
- Clear separation of concerns
- Components can be styled without JavaScript running
- Progressive enhancement (HTML works, JavaScript enhances)

**Why External CSS Only:**
- No runtime style injection overhead
- Styles load in parallel with HTML parsing
- Users can override styles easily
- No duplicate `<style>` tags per component instance
- Better caching (external CSS file cached separately)

**Why No Slots:**
- Slots require Shadow DOM OR complex Light DOM slot polyfilling
- Declarative structure is simpler (just nest elements)
- Users have full control over DOM structure
- No slot assignment complexity
- Better compatibility with tools (React, Vue can wrap elements directly)

### Alternatives Considered

**Alternative 1: Keep innerHTML Pattern (Original)**
```javascript
render() {
  this.innerHTML = `
    <div class="storefront">...</div>
    <style>.storefront { ... }</style>
  `;
}
```
- Rejected: Mixes structure with behavior, harder to customize

**Alternative 2: Template Elements**
```javascript
const template = document.querySelector('#storefront-template');
this.appendChild(template.content.cloneNode(true));
```
- Rejected: Still requires JavaScript for structure creation, adds template management complexity

**Alternative 3: Shadow DOM with Slots**
```javascript
constructor() {
  super();
  this.attachShadow({ mode: 'open' });
  this.shadowRoot.innerHTML = `<slot></slot>`;
}
```
- Rejected: Breaks design token integration (ADR-006), requires CSS injection

**Alternative 4: Lit Element or Web Component Library**
```javascript
render() {
  return html`<div class="storefront">...</div>`;
}
```
- Rejected: Adds dependency, requires build step, breaks copy-paste portability

### Consequences

**Positive:**
- HTML structure is explicit and visible in markup
- Users can customize by editing HTML files
- Better syntax highlighting and editor support
- Faster initial render (parser-created DOM)
- Clearer separation of concerns (HTML = structure, CSS = presentation, JS = behavior)
- No runtime style injection
- Smaller JavaScript bundles
- Components work as semantic wrappers (browser-native pattern)
- Progressive enhancement (HTML/CSS work without JavaScript)

**Negative:**
- More HTML boilerplate in markup (structure not auto-generated)
- Users must write correct HTML structure manually
- No automatic DOM creation or validation
- Component examples are longer (show full HTML structure)
- Cannot programmatically generate variants (must create separate HTML files)

**Trade-offs:**
- **Before:** Less HTML, more JavaScript (structure in JS)
- **After:** More HTML, less JavaScript (structure in HTML)
- **Result:** Better aligns with web platform, easier to customize

### Migration Impact

**Breaking Changes:**
- Components NO LONGER auto-generate structure via `innerHTML`
- Users MUST provide HTML structure in markup
- Inline `<style>` tags removed (all styles now external)
- `slot` attributes no longer needed (direct nesting instead)

**Migration Path:**
```html
<!-- Before (Old Pattern) -->
<storefront-component>
  <storefront-assets slot="left"></storefront-assets>
  <storefront-form slot="right"></storefront-form>
</storefront-component>

<!-- After (New Pattern) -->
<storefront-component class="storefront">
  <div class="storefront-container">
    <div class="storefront-grid">
      <div class="storefront-grid__left">
        <storefront-assets class="storefront-assets">
          <div class="storefront-assets__content">
            <!-- Content -->
          </div>
        </storefront-assets>
      </div>
      <div class="storefront-grid__right">
        <storefront-form class="storefront-form">
          <div class="storefront-form__content">
            <!-- Content -->
          </div>
        </storefront-form>
      </div>
    </div>
  </div>
</storefront-component>
```

### Implementation Requirements

**All web components in this project MUST:**
1. **No `innerHTML` manipulation** - Components do NOT create structure
2. **No inline `<style>` injection** - All styles in external CSS files
3. **Minimal JavaScript** - Only add CSS classes or event listeners in `connectedCallback()`
4. **Declarative HTML** - Structure defined in markup, not JavaScript
5. **Semantic wrapper pattern** - Custom elements wrap and enhance existing HTML
6. **External CSS only** - All styles in component CSS file
7. **Progressive enhancement** - HTML/CSS work without JavaScript

**Component Template:**
```javascript
/**
 * MyComponent Web Component
 *
 * Semantic wrapper - provides styling hook via CSS class.
 * Structure defined in HTML markup, not JavaScript.
 */

class MyComponent extends HTMLElement {
  connectedCallback() {
    // Only add CSS class for styling
    if (!this.classList.contains('my-component')) {
      this.classList.add('my-component');
    }
  }
}

customElements.define('my-component', MyComponent);
```

### When to Reconsider

Revisit this decision if:
1. Need for programmatic DOM generation (forms, dynamic lists)
2. Building reusable library components (not page-specific layouts)
3. Need for true encapsulation (third-party integration)
4. Performance issues with large HTML files (unlikely)

For page-specific layout components (like Storefront), declarative HTML is the correct pattern.

---

## Related Decisions

**See Also:**
- `gaps.md` for complete list of missing design system pieces
- `progress.md` for implementation timeline
- `refactor-plan.md` for detailed refactor steps
- `web-components.md` for complete web component development guide
- `components.md` for component catalog
