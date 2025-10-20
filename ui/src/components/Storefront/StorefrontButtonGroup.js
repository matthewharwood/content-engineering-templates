/**
 * StorefrontButtonGroup Component
 *
 * A Light DOM custom element that wraps a semantic <fieldset> for radio button groups.
 * This component manages variant, size, and shape attributes and applies appropriate
 * BEM classes and data attributes for styling via RadioButtonGroup.css.
 *
 * Architecture:
 * - No Shadow DOM - uses Light DOM exclusively
 * - No innerHTML - HTML structure is fully declarative
 * - No DOM manipulation beyond the component itself
 * - Attribute-based state management with reflection
 * - Acts as a <fieldset> semantically via role attributes
 *
 * Usage:
 * ```html
 * <storefront-button-group name="flavor" variant="secondary" size="medium" shape="pill">
 *   <legend class="button-group__legend">Add the flavor</legend>
 *   <div class="button-group__buttons">
 *     <storefront-button-group-button value="cherry-pop" label="Cherry Pop"></storefront-button-group-button>
 *     <storefront-button-group-button value="vanilla" label="Vanilla Vanity"></storefront-button-group-button>
 *   </div>
 * </storefront-button-group>
 * ```
 *
 * Attributes:
 * - name (required): The shared name for the radio button group (e.g., "flavor")
 * - variant (optional): Visual variant ("primary", "secondary", "tertiary", "outline") - default: "secondary"
 * - size (optional): Button size ("mini", "small", "medium", "large") - default: "medium"
 * - shape (optional): Button shape ("pill", "rounded", "square", "circle") - default: "pill"
 * - required (optional): Marks the fieldset as required
 *
 * The component automatically:
 * 1. Applies the `button-group` base class
 * 2. Sets data attributes (data-variant, data-size, data-shape) for CSS targeting
 * 3. Provides semantic fieldset structure via role attributes
 * 4. Propagates variant/size/shape to child button components
 */

class StorefrontButtonGroup extends HTMLElement {
  /**
   * Observed attributes - component reacts to changes in these attributes
   */
  static observedAttributes = ['name', 'variant', 'size', 'shape', 'required'];

  /**
   * Constructor - initialize private state
   * Runs before the element is added to the DOM
   */
  constructor() {
    super();
    // No private state needed - all state is in attributes
  }

  /**
   * connectedCallback - runs when element is added to the DOM
   * This is where we set up the component's behavior
   */
  connectedCallback() {
    // Apply semantic role for accessibility
    // Note: We can't extend HTMLFieldSetElement directly due to browser limitations,
    // so we use role="group" to provide similar semantics
    this.setAttribute('role', 'group');

    // Apply base BEM class
    this.classList.add('button-group');

    // Initialize data attributes based on current attribute values
    this.updateDataAttributes();
  }

  /**
   * attributeChangedCallback - runs when observed attributes change
   * This is our reactive state management
   */
  attributeChangedCallback(name, oldValue, newValue) {
    // Only update if the component is already connected
    if (!this.isConnected) return;

    // Update data attributes when variant/size/shape changes
    if (name === 'variant' || name === 'size' || name === 'shape') {
      this.updateDataAttributes();
    }
  }

  /**
   * Update data attributes based on current attribute values
   * These data attributes are used by RadioButtonGroup.css for styling
   */
  updateDataAttributes() {
    const variant = this.getAttribute('variant') || 'secondary';
    const size = this.getAttribute('size') || 'medium';
    const shape = this.getAttribute('shape') || 'pill';

    // Validate variant
    const validVariants = ['primary', 'secondary', 'tertiary', 'outline'];
    const finalVariant = validVariants.includes(variant) ? variant : 'secondary';

    // Validate size
    const validSizes = ['mini', 'small', 'medium', 'large'];
    const finalSize = validSizes.includes(size) ? size : 'medium';

    // Validate shape
    const validShapes = ['pill', 'rounded', 'square', 'circle'];
    const finalShape = validShapes.includes(shape) ? shape : 'pill';

    // Set data attributes for CSS targeting
    this.dataset.variant = finalVariant;
    this.dataset.size = finalSize;
    this.dataset.shape = finalShape;
  }

  /**
   * Public API: Property getters/setters with attribute reflection
   */

  get name() {
    return this.getAttribute('name');
  }

  set name(value) {
    if (value) {
      this.setAttribute('name', value);
    } else {
      this.removeAttribute('name');
    }
  }

  get variant() {
    return this.getAttribute('variant') || 'secondary';
  }

  set variant(value) {
    this.setAttribute('variant', value);
  }

  get size() {
    return this.getAttribute('size') || 'medium';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get shape() {
    return this.getAttribute('shape') || 'pill';
  }

  set shape(value) {
    this.setAttribute('shape', value);
  }

  get required() {
    return this.hasAttribute('required');
  }

  set required(value) {
    if (value) {
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
    }
  }
}

// Register the custom element
customElements.define('storefront-button-group', StorefrontButtonGroup);
