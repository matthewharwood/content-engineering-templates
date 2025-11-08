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
 * Usage:
 *   <storefront-assets variant="primary" align="center">
 *     <img src="product.jpg" alt="Product" />
 *   </storefront-assets>
 *
 * Note: This component applies semantic styling via CSS.
 * Content structure is declared in HTML as children of this element.
 */
class StorefrontAssets extends HTMLElement {
  static observedAttributes = ['variant', 'align', 'aspect', 'current-index'];

  connectedCallback() {
    // Apply base class for styling
    this.classList.add('storefront-assets');

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
}

// Register custom element
customElements.define('storefront-assets', StorefrontAssets);
