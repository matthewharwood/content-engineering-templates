/**
 * Storefront Component
 *
 * A semantic container for product presentation layouts.
 * Creates a responsive split layout using the design system's layout utilities.
 *
 * Architecture:
 * - Light DOM only (no Shadow DOM)
 * - No innerHTML or DOM manipulation
 * - Uses existing layout utilities (.l-container, .l-split-half)
 * - Attributes control layout behavior
 * - Composes child elements declaratively
 *
 * Public API:
 *
 * Attributes:
 *   layout="half" | "60-40" | "40-60" | "70-30" | "30-70" | "80-20" | "20-80"
 *     Controls the split ratio between left and right sides
 *     Default: "half" (50/50 split)
 *
 *   gap="3xs" | "2xs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl"
 *     Controls spacing between columns
 *     Default: "l" (uses --space-l from design system)
 *
 *   constrain="true" | "false"
 *     Whether to constrain content to max-width container
 *     Default: "true" (applies .l-container)
 *
 * Usage:
 *   <storefront-component layout="half" gap="l">
 *     <storefront-assets>...</storefront-assets>
 *     <storefront-form>...</storefront-form>
 *   </storefront-component>
 *
 * Note: This component does NOT create internal structure via JavaScript.
 * It only applies CSS classes based on attributes. Child elements are
 * declared in HTML, following the composition-over-manipulation principle.
 */
class StorefrontComponent extends HTMLElement {
  static observedAttributes = ['layout', 'gap', 'constrain'];

  constructor() {
    super();
    // Initialize carousel state
    this._currentIndex = 0;
    this._totalFrames = 0;
  }

  connectedCallback() {
    // Apply base class for component identification
    this.classList.add('storefront');

    // Apply layout classes based on attributes
    this.updateLayout();

    // Initialize carousel functionality
    this.initializeCarousel();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateLayout();
    }
  }

  /**
   * Updates layout classes based on current attribute values
   * Uses design system layout utilities from styles/layouts.css
   */
  updateLayout() {
    // Remove previous layout classes
    const layoutClasses = [
      'l-container',
      'l-split-half',
      'l-split-60-40',
      'l-split-40-60',
      'l-split-70-30',
      'l-split-30-70',
      'l-split-80-20',
      'l-split-20-80',
      'l-gap-3xs',
      'l-gap-2xs',
      'l-gap-xs',
      'l-gap-s',
      'l-gap-m',
      'l-gap-l',
      'l-gap-xl',
      'l-gap-2xl',
      'l-gap-3xl'
    ];

    this.classList.remove(...layoutClasses);

    // Apply container class if constrain is not "false"
    const constrain = this.getAttribute('constrain');
    if (constrain !== 'false') {
      this.classList.add('l-container');
    }

    // Apply layout class based on layout attribute
    const layout = this.getAttribute('layout') || 'half';
    const layoutMap = {
      'half': 'l-split-half',
      '60-40': 'l-split-60-40',
      '40-60': 'l-split-40-60',
      '70-30': 'l-split-70-30',
      '30-70': 'l-split-30-70',
      '80-20': 'l-split-80-20',
      '20-80': 'l-split-20-80'
    };

    const layoutClass = layoutMap[layout] || 'l-split-half';
    this.classList.add(layoutClass);

    // Apply gap class based on gap attribute
    const gap = this.getAttribute('gap') || 'l';
    this.classList.add(`l-gap-${gap}`);
  }

  /**
   * Initializes mobile carousel functionality
   * - Counts asset frames
   * - Assigns index attributes
   * - Sets up button event listeners
   * - Syncs current-index to storefront-assets
   */
  initializeCarousel() {
    const assetsContainer = this.querySelector('storefront-assets');
    if (!assetsContainer) return;

    const frames = assetsContainer.querySelectorAll('storefront-asset-frame');
    this._totalFrames = frames.length;

    // Assign index attributes to each frame
    frames.forEach((frame, index) => {
      frame.setAttribute('index', String(index));
    });

    // Set initial current-index on assets container
    this.updateCarouselIndex();

    // Set up event listeners for carousel buttons
    this.setupCarouselButtons();
  }

  /**
   * Sets up event listeners for prev/next carousel buttons
   */
  setupCarouselButtons() {
    const prevButton = this.querySelector('storefront-carousel-button[direction="prev"] button');
    const nextButton = this.querySelector('storefront-carousel-button[direction="next"] button');

    if (prevButton) {
      prevButton.addEventListener('click', () => this.decrementIndex());
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => this.incrementIndex());
    }
  }

  /**
   * Increments carousel index (cyclical using modulo)
   */
  incrementIndex() {
    if (this._totalFrames === 0) return;
    this._currentIndex = (this._currentIndex + 1) % this._totalFrames;
    this.updateCarouselIndex();
  }

  /**
   * Decrements carousel index (cyclical using modulo)
   */
  decrementIndex() {
    if (this._totalFrames === 0) return;
    this._currentIndex = (this._currentIndex - 1 + this._totalFrames) % this._totalFrames;
    this.updateCarouselIndex();
  }

  /**
   * Updates the current-index attribute on storefront-assets
   * This triggers visibility changes in child asset frames
   */
  updateCarouselIndex() {
    const assetsContainer = this.querySelector('storefront-assets');
    if (!assetsContainer) return;

    assetsContainer.setAttribute('current-index', String(this._currentIndex));
  }

  // Public property getters/setters with attribute reflection

  get layout() {
    return this.getAttribute('layout') || 'half';
  }

  set layout(value) {
    this.setAttribute('layout', value);
  }

  get gap() {
    return this.getAttribute('gap') || 'l';
  }

  set gap(value) {
    this.setAttribute('gap', value);
  }

  get constrain() {
    return this.getAttribute('constrain') !== 'false';
  }

  set constrain(value) {
    this.setAttribute('constrain', value ? 'true' : 'false');
  }
}

// Register custom element
customElements.define('storefront-component', StorefrontComponent);
