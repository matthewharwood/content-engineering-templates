/**
 * Storefront Asset Frame Component
 *
 * A 1:1 aspect ratio container for media (images or video) within storefront layouts.
 * Wraps child media elements and applies consistent aspect ratio and object-fit constraints.
 *
 * Architecture:
 * - Light DOM only (no Shadow DOM)
 * - No innerHTML or DOM manipulation
 * - Attributes control aspect ratio and object-fit behavior
 * - Children (img/video) are declared in HTML
 * - Programmatic video autoplay for reliable playback
 *
 * Public API:
 *
 * Attributes:
 *   aspect="1-1" | "16-9" | "4-3" | "3-2" | "none"
 *     Controls the aspect ratio of the container
 *     Default: "1-1"
 *
 *   fit="cover" | "contain" | "fill" | "none"
 *     Controls object-fit for child media elements (img, video)
 *     Default: "cover"
 *
 * Video Autoplay:
 *   Add data-autoplay attribute to video elements for programmatic playback
 *   Video must have: autoplay, muted, loop, playsinline, preload="auto"
 *
 * Usage:
 *   <storefront-asset-frame aspect="1-1" fit="cover">
 *     <img src="product.jpg" alt="Product" />
 *   </storefront-asset-frame>
 *
 *   <storefront-asset-frame aspect="16-9" fit="contain">
 *     <video src="demo.mp4" autoplay muted loop playsinline preload="auto" data-autoplay></video>
 *   </storefront-asset-frame>
 *
 * Note: This component applies aspect ratio and fit styling via CSS.
 * Media elements are declared as children in HTML.
 */
class StorefrontAssetFrame extends HTMLElement {
  static observedAttributes = ['aspect', 'fit', 'index'];

  connectedCallback() {
    // Apply base class for styling
    if (!this.classList.contains('storefront-asset-frame')) {
      this.classList.add('storefront-asset-frame');
    }

    // Set data attributes for CSS targeting
    this.updateDataAttributes();

    // Initialize video autoplay if video element exists
    this.initializeVideo();

    // Listen for carousel changes from parent
    this.observeParentCarousel();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'index') {
        this.updateVisibility();
      } else {
        this.updateDataAttributes();
      }
    }
  }

  /**
   * Updates data attributes based on current attribute values
   * CSS uses these data attributes for aspect ratio and object-fit targeting
   */
  updateDataAttributes() {
    const aspect = this.getAttribute('aspect') || '1-1';
    const fit = this.getAttribute('fit') || 'cover';

    this.dataset.aspect = aspect;
    this.dataset.fit = fit;
  }

  /**
   * Initializes video autoplay functionality
   * Browsers may block autoplay - this ensures programmatic play() call
   */
  initializeVideo() {
    // Find video element within this component
    const video = this.querySelector('video[data-autoplay]');

    if (!video) return;

    // Attempt to play video programmatically
    // This handles cases where autoplay attribute alone may be blocked
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Video started playing successfully
          console.log('Video autoplay started successfully');
        })
        .catch((error) => {
          // Autoplay was prevented
          console.warn('Video autoplay prevented by browser:', error);
          // Note: User interaction will be required to play video
          // Consider showing a play button overlay if needed
        });
    }
  }

  /**
   * Observes parent storefront-assets for current-index changes
   * Used for mobile carousel functionality
   */
  observeParentCarousel() {
    // Find parent storefront-assets element
    const parent = this.closest('storefront-assets');
    if (!parent) return;

    // Create mutation observer to watch for current-index changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'current-index') {
          this.updateVisibility();
        }
      });
    });

    // Observe parent for attribute changes
    observer.observe(parent, {
      attributes: true,
      attributeFilter: ['current-index']
    });

    // Store observer for cleanup if needed
    this._carouselObserver = observer;

    // Initial visibility update
    this.updateVisibility();
  }

  /**
   * Updates visibility based on current carousel index
   * Adds/removes 'is-active' class for CSS opacity transitions
   */
  updateVisibility() {
    const parent = this.closest('storefront-assets');
    if (!parent) return;

    const currentIndex = parseInt(parent.getAttribute('current-index') || '0', 10);
    const myIndex = parseInt(this.getAttribute('index') || '0', 10);

    if (currentIndex === myIndex) {
      this.classList.add('is-active');
    } else {
      this.classList.remove('is-active');
    }
  }

  // Public property getters/setters with attribute reflection

  /**
   * Get the current aspect ratio value
   * @returns {string} "1-1" | "16-9" | "4-3" | "3-2" | "none"
   */
  get aspect() {
    return this.getAttribute('aspect') || '1-1';
  }

  /**
   * Set the aspect ratio value
   * @param {string} value - "1-1" | "16-9" | "4-3" | "3-2" | "none"
   */
  set aspect(value) {
    this.setAttribute('aspect', value);
  }

  /**
   * Get the current object-fit value
   * @returns {string} "cover" | "contain" | "fill" | "none"
   */
  get fit() {
    return this.getAttribute('fit') || 'cover';
  }

  /**
   * Set the object-fit value
   * @param {string} value - "cover" | "contain" | "fill" | "none"
   */
  set fit(value) {
    this.setAttribute('fit', value);
  }
}

// Register custom element
customElements.define('storefront-asset-frame', StorefrontAssetFrame);
