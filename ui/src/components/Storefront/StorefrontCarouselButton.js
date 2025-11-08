/**
 * StorefrontCarouselButton - Carousel navigation button
 *
 * Light DOM composition pattern:
 * - No innerHTML or DOM manipulation
 * - Attributes control presentation
 * - Native button element as child
 */
class StorefrontCarouselButton extends HTMLElement {
  static observedAttributes = ['direction'];

  connectedCallback() {
    this.updateClasses();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateClasses();
    }
  }

  updateClasses() {
    const direction = this.getAttribute('direction') || 'next';

    // Find the button element (should be a child in Light DOM)
    const button = this.querySelector('button');
    if (!button) return;

    // Apply button classes based on direction
    button.className = 'btn btn--primary btn--circle btn--mini carousel-button';
    button.classList.add(`carousel-button--${direction}`);

    // Set aria-label for accessibility
    button.setAttribute('aria-label', direction === 'prev' ? 'Previous image' : 'Next image');
  }
}

customElements.define('storefront-carousel-button', StorefrontCarouselButton);
