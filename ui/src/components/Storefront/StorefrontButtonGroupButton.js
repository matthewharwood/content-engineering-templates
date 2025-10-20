/**
 * StorefrontButtonGroupButton Component
 *
 * A Light DOM custom element that wraps a radio input + label pair.
 * This component acts as a container and manages the generation of proper
 * HTML structure for a radio button that looks like a button.
 *
 * Architecture:
 * - No Shadow DOM - uses Light DOM exclusively
 * - Creates DOM structure using createElement (no innerHTML)
 * - Attribute-based state management with reflection
 * - Automatically generates unique IDs for input/label association
 * - Inherits variant/size/shape from parent StorefrontButtonGroup
 *
 * Usage:
 * ```html
 * <storefront-button-group-button
 *   name="flavor"
 *   value="cherry-pop"
 *   label="Cherry Pop"
 *   variant="secondary"
 *   size="medium"
 *   shape="pill">
 * </storefront-button-group-button>
 * ```
 *
 * Attributes:
 * - name (required): Radio group name
 * - value (required): The radio button value
 * - label (required): The visible label text
 * - variant (optional): Visual variant ("primary", "secondary", "tertiary", "outline") - inherited from parent
 * - size (optional): Button size ("mini", "small", "medium", "large") - inherited from parent
 * - shape (optional): Button shape ("pill", "rounded", "square", "circle") - inherited from parent
 * - checked (optional): Pre-selected state
 * - disabled (optional): Disabled state
 *
 * The component automatically:
 * 1. Generates a unique ID for input/label association
 * 2. Creates the input and label elements
 * 3. Applies appropriate BEM classes based on variant/size/shape
 * 4. Manages checked and disabled states
 */

class StorefrontButtonGroupButton extends HTMLElement {
  /**
   * Observed attributes - component reacts to changes in these attributes
   */
  static observedAttributes = [
    'name',
    'value',
    'label',
    'variant',
    'size',
    'shape',
    'checked',
    'disabled'
  ];

  /**
   * Counter for generating unique IDs
   */
  static idCounter = 0;

  /**
   * Constructor - initialize private state
   */
  constructor() {
    super();
    // Store references to created elements
    this._input = null;
    this._label = null;
    this._uniqueId = null;
  }

  /**
   * connectedCallback - runs when element is added to the DOM
   */
  connectedCallback() {
    // Apply base BEM class to the container
    this.classList.add('button-group__button');

    // Inherit attributes from parent StorefrontButtonGroup if not explicitly set
    this.inheritFromParent();

    // Only create structure if not already created
    if (!this._input) {
      this.createStructure();
    }

    // Update the structure based on current attributes
    this.updateStructure();
  }

  /**
   * Inherit variant/size/shape/name from parent button group
   * This implements composition pattern - child queries parent, not vice versa
   */
  inheritFromParent() {
    // Find parent button group (if it exists)
    const parent = this.closest('storefront-button-group');
    if (!parent) return;

    // Inherit name attribute if not explicitly set
    if (!this.hasAttribute('name') && parent.hasAttribute('name')) {
      this.setAttribute('name', parent.getAttribute('name'));
    }

    // Inherit variant if not explicitly set
    if (!this.hasAttribute('variant') && parent.hasAttribute('variant')) {
      this.setAttribute('variant', parent.getAttribute('variant'));
    }

    // Inherit size if not explicitly set
    if (!this.hasAttribute('size') && parent.hasAttribute('size')) {
      this.setAttribute('size', parent.getAttribute('size'));
    }

    // Inherit shape if not explicitly set
    if (!this.hasAttribute('shape') && parent.hasAttribute('shape')) {
      this.setAttribute('shape', parent.getAttribute('shape'));
    }
  }

  /**
   * disconnectedCallback - cleanup when element is removed from DOM
   */
  disconnectedCallback() {
    // Clean up event listeners if any were added
    // (None in this simple implementation, but good practice)
  }

  /**
   * attributeChangedCallback - runs when observed attributes change
   */
  attributeChangedCallback(name, oldValue, newValue) {
    // Only update if the component is already connected and structure exists
    if (!this.isConnected || !this._input) return;

    // Update structure when attributes change
    this.updateStructure();
  }

  /**
   * Create the radio input + label structure
   * Uses createElement to avoid innerHTML (security best practice)
   */
  createStructure() {
    // Clear any existing content (in case of re-initialization)
    this.textContent = '';

    // Generate unique ID for input/label association
    this._uniqueId = this.generateUniqueId();

    // Create radio input
    this._input = document.createElement('input');
    this._input.type = 'radio';
    this._input.className = 'button-group__input';
    this._input.id = this._uniqueId;

    // Create label
    this._label = document.createElement('label');
    this._label.className = 'button-group__label';
    this._label.htmlFor = this._uniqueId;

    // Append to component
    this.appendChild(this._input);
    this.appendChild(this._label);
  }

  /**
   * Update the structure based on current attribute values
   */
  updateStructure() {
    if (!this._input || !this._label) return;

    // Update input attributes
    const name = this.getAttribute('name');
    const value = this.getAttribute('value');
    const checked = this.hasAttribute('checked');
    const disabled = this.hasAttribute('disabled');

    if (name) {
      this._input.name = name;
    }

    if (value) {
      this._input.value = value;
    }

    this._input.checked = checked;
    this._input.disabled = disabled;

    // Update label text
    const label = this.getAttribute('label');
    if (label) {
      this._label.textContent = label;
    }

    // Update label classes based on variant/size/shape
    this.updateLabelClasses();
  }

  /**
   * Update label classes based on variant, size, and shape attributes
   */
  updateLabelClasses() {
    if (!this._label) return;

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

    // Build class list
    // Always start with base class
    const classes = ['button-group__label'];

    // Add variant modifier
    classes.push(`button-group__label--${finalVariant}`);

    // Add size modifier
    classes.push(`button-group__label--${finalSize}`);

    // Add shape modifier
    classes.push(`button-group__label--${finalShape}`);

    // Apply classes
    this._label.className = classes.join(' ');
  }

  /**
   * Generate a unique ID for input/label association
   */
  generateUniqueId() {
    const value = this.getAttribute('value') || '';
    const name = this.getAttribute('name') || 'button';
    const counter = StorefrontButtonGroupButton.idCounter++;

    // Create a unique ID based on name, value, and counter
    // Format: {name}-{value}-{counter}
    const sanitizedValue = value.replace(/[^a-zA-Z0-9-_]/g, '-');
    const sanitizedName = name.replace(/[^a-zA-Z0-9-_]/g, '-');

    return `${sanitizedName}-${sanitizedValue}-${counter}`;
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

  get value() {
    return this.getAttribute('value');
  }

  set value(val) {
    if (val) {
      this.setAttribute('value', val);
    } else {
      this.removeAttribute('value');
    }
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(val) {
    if (val) {
      this.setAttribute('label', val);
    } else {
      this.removeAttribute('label');
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

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(value) {
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  /**
   * Expose the native input element for form integration
   */
  get input() {
    return this._input;
  }
}

// Register the custom element
customElements.define('storefront-button-group-button', StorefrontButtonGroupButton);
