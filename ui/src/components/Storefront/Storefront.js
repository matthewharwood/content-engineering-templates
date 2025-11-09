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
 * - Manages flavor selection state and independent carousel indexes
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
 *   selected-flavor="cherry-pop" | "vanilla-vanity" | "money-honey"
 *     Controls which flavor assets collection is visible
 *     Default: "cherry-pop"
 *
 * Methods:
 *   setFlavor(flavor) - Switch active flavor collection
 *
 * Usage:
 *   <storefront-component layout="half" gap="l">
 *     <storefront-assets flavor="cherry-pop">...</storefront-assets>
 *     <storefront-assets flavor="vanilla-vanity">...</storefront-assets>
 *     <storefront-assets flavor="money-honey">...</storefront-assets>
 *     <storefront-form>...</storefront-form>
 *   </storefront-component>
 *
 * Note: This component does NOT create internal structure via JavaScript.
 * It only applies CSS classes based on attributes. Child elements are
 * declared in HTML, following the composition-over-manipulation principle.
 */
class StorefrontComponent extends HTMLElement {
  static observedAttributes = ['layout', 'gap', 'constrain', 'selected-flavor'];

  constructor() {
    super();
    // Initialize flavor-specific carousel state
    // Each flavor maintains its own independent carousel index
    this._carouselState = {
      'cherry-pop': { currentIndex: 0, totalFrames: 0 },
      'vanilla-vanity': { currentIndex: 0, totalFrames: 0 },
      'money-honey': { currentIndex: 0, totalFrames: 0 }
    };
  }

  connectedCallback() {
    // Apply base class for component identification
    this.classList.add('storefront');

    // Set default selected flavor if not specified
    if (!this.hasAttribute('selected-flavor')) {
      this.setAttribute('selected-flavor', 'cherry-pop');
    }

    // Apply layout classes based on attributes
    this.updateLayout();

    // Initialize carousel functionality for all flavor collections
    this.initializeCarousels();

    // Update active flavor collection
    this.updateActiveFlavor();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'selected-flavor') {
        this.updateActiveFlavor();
      } else {
        this.updateLayout();
      }
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
   * Initializes carousel functionality for all flavor asset collections
   * Each flavor collection gets its own independent carousel state
   */
  initializeCarousels() {
    const allAssetsContainers = this.querySelectorAll('storefront-assets[flavor]');

    allAssetsContainers.forEach(container => {
      const flavor = container.getAttribute('flavor');
      if (!flavor || !this._carouselState[flavor]) return;

      const frames = container.querySelectorAll('storefront-asset-frame');
      this._carouselState[flavor].totalFrames = frames.length;

      // Assign index attributes to each frame
      frames.forEach((frame, index) => {
        frame.setAttribute('index', String(index));
      });

      // Set initial current-index on this assets container
      this.updateCarouselIndex(flavor);

      // Set up event listeners for carousel buttons within this container
      this.setupCarouselButtons(container, flavor);
    });
  }

  /**
   * Sets up event listeners for prev/next carousel buttons for a specific flavor
   * @param {HTMLElement} container - The storefront-assets container
   * @param {string} flavor - The flavor identifier
   */
  setupCarouselButtons(container, flavor) {
    const prevButton = container.querySelector('storefront-carousel-button[direction="prev"] button');
    const nextButton = container.querySelector('storefront-carousel-button[direction="next"] button');

    if (prevButton) {
      prevButton.addEventListener('click', () => this.decrementIndex(flavor));
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => this.incrementIndex(flavor));
    }
  }

  /**
   * Increments carousel index for a specific flavor (cyclical using modulo)
   * @param {string} flavor - The flavor identifier
   */
  incrementIndex(flavor) {
    const state = this._carouselState[flavor];
    if (!state || state.totalFrames === 0) return;

    state.currentIndex = (state.currentIndex + 1) % state.totalFrames;
    this.updateCarouselIndex(flavor);
  }

  /**
   * Decrements carousel index for a specific flavor (cyclical using modulo)
   * @param {string} flavor - The flavor identifier
   */
  decrementIndex(flavor) {
    const state = this._carouselState[flavor];
    if (!state || state.totalFrames === 0) return;

    state.currentIndex = (state.currentIndex - 1 + state.totalFrames) % state.totalFrames;
    this.updateCarouselIndex(flavor);
  }

  /**
   * Updates the current-index attribute on a specific flavor's storefront-assets
   * This triggers visibility changes in child asset frames
   * @param {string} flavor - The flavor identifier
   */
  updateCarouselIndex(flavor) {
    const assetsContainer = this.querySelector(`storefront-assets[flavor="${flavor}"]`);
    if (!assetsContainer) return;

    const state = this._carouselState[flavor];
    if (!state) return;

    assetsContainer.setAttribute('current-index', String(state.currentIndex));
  }

  /**
   * Updates which flavor collection is visible
   * Sets selected-flavor attribute which child components observe
   */
  updateActiveFlavor() {
    const selectedFlavor = this.getAttribute('selected-flavor') || 'cherry-pop';

    // Update all storefront-assets containers
    const allAssetsContainers = this.querySelectorAll('storefront-assets[flavor]');
    allAssetsContainers.forEach(container => {
      const flavor = container.getAttribute('flavor');
      // StorefrontAssets component will observe this attribute change
      // and update its own is-active class
    });
  }

  /**
   * Public method to set the active flavor
   * Called by StorefrontButtonGroupButton when flavor selection changes
   * @param {string} flavor - The flavor to activate
   */
  setFlavor(flavor) {
    // Validate flavor
    const validFlavors = ['cherry-pop', 'vanilla-vanity', 'money-honey'];
    if (!validFlavors.includes(flavor)) {
      console.warn(`[Storefront] Invalid flavor: ${flavor}`);
      return;
    }

    this.setAttribute('selected-flavor', flavor);
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

  get selectedFlavor() {
    return this.getAttribute('selected-flavor') || 'cherry-pop';
  }

  set selectedFlavor(value) {
    this.setFlavor(value);
  }
}

// Register custom element
customElements.define('storefront-component', StorefrontComponent);
