/**
 * Storefront Assets Component
 *
 * A semantic container for product media (images, videos, galleries).
 * Typically used as the left child of <storefront-component>.
 *
 * Architecture:
 * - Light DOM only (no Shadow DOM)
 * - No innerHTML or DOM manipulation
 * - Attributes control visual presentation
 * - Children are declared in HTML
 * - Observes parent's selected-flavor to control visibility
 *
 * Public API:
 *
 * Attributes:
 *   variant="primary" | "secondary" | "tertiary" | "surface"
 *     Controls background color using design system tokens
 *     Default: "primary"
 *
 *   align="start" | "center" | "end" | "stretch"
 *     Controls vertical alignment of content
 *     Default: "center"
 *
 *   aspect="1-1" | "16-9" | "4-3" | "3-2" | "none"
 *     Applies aspect ratio constraint to container
 *     Default: "none" (uses min-height instead)
 *
 *   flavor="cherry-pop" | "vanilla-vanity" | "money-honey"
 *     Identifies which flavor collection this represents
 *     Used to determine visibility based on parent's selected-flavor
 *
 * Usage:
 *   <storefront-assets variant="primary" align="center" flavor="cherry-pop">
 *     <img src="product.jpg" alt="Product" />
 *   </storefront-assets>
 *
 * Note: This component applies semantic styling via CSS.
 * Content structure is declared in HTML as children of this element.
 * The is-active class is controlled based on parent's selected-flavor.
 */
class StorefrontAssets extends HTMLElement {
  static observedAttributes = ['variant', 'align', 'aspect', 'current-index', 'flavor'];

  constructor() {
    super();
    this._parentObserver = null;
  }

  connectedCallback() {
    // Apply base class for styling
    this.classList.add('storefront-assets');

    // Apply attribute-based classes
    this.updatePresentation();

    // Start observing parent's selected-flavor attribute
    this.observeParentFlavor();

    // Update active state based on current parent attribute
    this.updateActiveState();
  }

  disconnectedCallback() {
    // Cleanup: disconnect observer to prevent memory leaks
    if (this._parentObserver) {
      this._parentObserver.disconnect();
      this._parentObserver = null;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'flavor') {
        // Re-evaluate active state when flavor attribute changes
        this.updateActiveState();
      } else {
        this.updatePresentation();
      }
    }
  }

  /**
   * Updates presentation classes based on current attributes
   */
  updatePresentation() {
    // Remove previous variant classes
    const variantClasses = [
      'storefront-assets--primary',
      'storefront-assets--secondary',
      'storefront-assets--tertiary',
      'storefront-assets--surface'
    ];
    this.classList.remove(...variantClasses);

    // Apply variant class
    const variant = this.getAttribute('variant') || 'primary';
    this.classList.add(`storefront-assets--${variant}`);

    // Set alignment via data attribute (for CSS targeting)
    const align = this.getAttribute('align') || 'center';
    this.dataset.align = align;

    // Set aspect ratio via data attribute (for CSS targeting)
    const aspect = this.getAttribute('aspect') || 'none';
    this.dataset.aspect = aspect;
  }

  /**
   * Observes parent storefront-component's selected-flavor attribute
   * Uses MutationObserver to watch for attribute changes
   */
  observeParentFlavor() {
    const parent = this.closest('storefront-component');
    if (!parent) return;

    // Create observer that watches for attribute changes on parent
    this._parentObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'selected-flavor') {
          this.updateActiveState();
        }
      });
    });

    // Start observing parent's attributes
    this._parentObserver.observe(parent, {
      attributes: true,
      attributeFilter: ['selected-flavor']
    });
  }

  /**
   * Updates the is-active class based on parent's selected-flavor
   * This controls visibility via CSS opacity transitions
   */
  updateActiveState() {
    const parent = this.closest('storefront-component');
    if (!parent) return;

    const selectedFlavor = parent.getAttribute('selected-flavor');
    const thisFlavor = this.getAttribute('flavor');

    if (selectedFlavor === thisFlavor) {
      this.classList.add('is-active');
    } else {
      this.classList.remove('is-active');
    }
  }

  // Public property getters/setters with attribute reflection

  get variant() {
    return this.getAttribute('variant') || 'primary';
  }

  set variant(value) {
    this.setAttribute('variant', value);
  }

  get align() {
    return this.getAttribute('align') || 'center';
  }

  set align(value) {
    this.setAttribute('align', value);
  }

  get aspect() {
    return this.getAttribute('aspect') || 'none';
  }

  set aspect(value) {
    this.setAttribute('aspect', value);
  }

  get flavor() {
    return this.getAttribute('flavor');
  }

  set flavor(value) {
    if (value) {
      this.setAttribute('flavor', value);
    } else {
      this.removeAttribute('flavor');
    }
  }
}

// Register custom element
customElements.define('storefront-assets', StorefrontAssets);
