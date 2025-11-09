/**
 * Storefront Form Component
 *
 * A semantic container for product information, pricing, and purchase actions.
 * Typically used as the right child of <storefront-component>.
 *
 * Architecture:
 * - Light DOM only (no Shadow DOM)
 * - No innerHTML or DOM manipulation
 * - Attributes control visual presentation
 * - Children are declared in HTML
 *
 * Public API:
 *
 * Attributes:
 *   variant="surface" | "surface-variant" | "primary" | "secondary"
 *     Controls background color using design system tokens
 *     Default: "surface-variant"
 *
 *   align="start" | "center" | "end" | "stretch"
 *     Controls vertical alignment of content
 *     Default: "center"
 *
 *   padding="none" | "s" | "m" | "l" | "xl"
 *     Controls internal padding
 *     Default: "l"
 *
 *   sticky (boolean attribute)
 *     Enables sticky positioning during scroll
 *     When enabled, form stays in viewport until its bottom reaches parent bottom
 *     Default: false
 *
 * Usage:
 *   <storefront-form variant="surface-variant" align="start" padding="l" sticky>
 *     <h2>Product Title</h2>
 *     <p>Description...</p>
 *     <button>Add to Cart</button>
 *   </storefront-form>
 *
 * Note: This component applies semantic styling via CSS.
 * Form structure and interaction logic are declared in HTML as children.
 */
class StorefrontForm extends HTMLElement {
  static observedAttributes = ['variant', 'align', 'padding', 'sticky'];

  connectedCallback() {
    // Apply base class for styling
    this.classList.add('storefront-form');

    // Apply attribute-based classes
    this.updatePresentation();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updatePresentation();
    }
  }

  /**
   * Updates presentation classes based on current attributes
   */
  updatePresentation() {
    // Remove previous variant classes
    const variantClasses = [
      'storefront-form--surface',
      'storefront-form--surface-variant',
      'storefront-form--primary',
      'storefront-form--secondary'
    ];
    this.classList.remove(...variantClasses);

    // Apply variant class
    const variant = this.getAttribute('variant') || 'surface-variant';
    this.classList.add(`storefront-form--${variant}`);

    // Set alignment via data attribute (for CSS targeting)
    const align = this.getAttribute('align') || 'center';
    this.dataset.align = align;

    // Set padding via data attribute (for CSS targeting)
    const padding = this.getAttribute('padding') || 'l';
    this.dataset.padding = padding;

    // Set sticky state via data attribute (for CSS targeting)
    // Boolean attributes: presence = true, absence = false
    const isSticky = this.hasAttribute('sticky');
    this.dataset.sticky = String(isSticky);
  }

  // Public property getters/setters with attribute reflection

  get variant() {
    return this.getAttribute('variant') || 'surface-variant';
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

  get padding() {
    return this.getAttribute('padding') || 'l';
  }

  set padding(value) {
    this.setAttribute('padding', value);
  }

  get sticky() {
    return this.hasAttribute('sticky');
  }

  set sticky(value) {
    // Boolean attribute: set or remove based on truthiness
    if (value) {
      this.setAttribute('sticky', '');
    } else {
      this.removeAttribute('sticky');
    }
  }
}

// Register custom element
customElements.define('storefront-form', StorefrontForm);
