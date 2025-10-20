/**
 * Global State Store
 *
 * A browser-native state management service following Light DOM principles.
 * Uses CustomEvents for reactive updates and pure functions for state transformations.
 *
 * Architecture:
 * - Single source of truth for application state
 * - Event-driven pub/sub pattern using CustomEvents
 * - No DOM manipulation - components react to state changes
 * - Immutable state updates with structured cloning
 * - Zero dependencies - pure browser APIs
 *
 * State Shape:
 * {
 *   selectedItem: string  // Currently selected product variant (e.g., "cherry-pop")
 * }
 *
 * Event System:
 * The store emits CustomEvents on window for global reactivity:
 * - "store:selectedItemChanged" - Fired when selectedItem changes
 *   detail: { selectedItem: string }
 *
 * Usage:
 * ```javascript
 * import { getState, setSelectedItem, subscribe } from './services/store.js';
 *
 * // Get current state
 * const state = getState();
 * console.log(state.selectedItem); // "cherry-pop"
 *
 * // Update state
 * setSelectedItem("vanilla-vanity");
 *
 * // Listen to changes
 * const unsubscribe = subscribe((newState) => {
 *   console.log('State changed:', newState);
 * });
 *
 * // Cleanup
 * unsubscribe();
 * ```
 */

/**
 * Internal state object - not exported directly to enforce immutability
 * All access must go through getState() which returns a copy
 */
const state = {
  selectedItem: ""
};

/**
 * Get a copy of the current state
 * Returns a shallow clone to prevent direct mutation
 *
 * @returns {Object} Copy of current state
 */
export function getState() {
  // Return a shallow copy to prevent external mutation
  return { ...state };
}

/**
 * Set the selected item and emit change event
 * This is the primary setter for product variant selection
 *
 * @param {string} value - The value of the selected item (e.g., "cherry-pop")
 */
export function setSelectedItem(value) {
  // Validate input
  if (typeof value !== 'string') {
    console.warn('[Store] setSelectedItem expects a string value');
    return;
  }

  // Only update if value actually changed (prevents unnecessary events)
  if (state.selectedItem === value) {
    return;
  }

  // Update state
  state.selectedItem = value;

  // Log state change for debugging
  if (typeof window !== 'undefined' && window.location?.hostname === 'localhost') {
    console.log('[Store] selectedItem changed:', value);
  }

  // Emit custom event for reactive updates
  // Components can listen to this event to react to state changes
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('store:selectedItemChanged', {
      detail: {
        selectedItem: value
      },
      bubbles: false,  // Don't bubble - this is a global event
      cancelable: false  // Cannot be cancelled
    }));
  }
}

/**
 * Subscribe to state changes
 * Returns an unsubscribe function for cleanup
 *
 * This implements the observer pattern using browser-native events.
 * Components should call the returned unsubscribe function in
 * their disconnectedCallback to prevent memory leaks.
 *
 * @param {Function} callback - Called when state changes, receives { selectedItem }
 * @returns {Function} Unsubscribe function
 *
 * @example
 * ```javascript
 * // In a component's connectedCallback
 * this._unsubscribe = subscribe(({ selectedItem }) => {
 *   console.log('New selection:', selectedItem);
 *   this.updateUI();
 * });
 *
 * // In disconnectedCallback
 * if (this._unsubscribe) {
 *   this._unsubscribe();
 * }
 * ```
 */
export function subscribe(callback) {
  // Validate callback
  if (typeof callback !== 'function') {
    console.warn('[Store] subscribe expects a function callback');
    return () => {}; // Return no-op unsubscribe
  }

  // Create event handler that extracts detail and passes to callback
  const handler = (event) => {
    callback(event.detail);
  };

  // Add event listener
  if (typeof window !== 'undefined') {
    window.addEventListener('store:selectedItemChanged', handler);
  }

  // Return unsubscribe function
  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('store:selectedItemChanged', handler);
    }
  };
}

/**
 * Reset state to initial values
 * Useful for testing or clearing application state
 */
export function resetState() {
  setSelectedItem("");
}

/**
 * Get the currently selected item value
 * Convenience getter for accessing just the selectedItem
 *
 * @returns {string} Current selectedItem value
 */
export function getSelectedItem() {
  return state.selectedItem;
}

// Initialize store
if (typeof window !== 'undefined' && window.location?.hostname === 'localhost') {
  console.log('[Store] Global state management initialized');
}
