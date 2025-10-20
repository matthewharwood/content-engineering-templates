# Services

Browser-native utilities and state management services following Light DOM principles.

## Store Service

Global state management using browser-native patterns with zero dependencies.

### Architecture

- **Single source of truth**: Centralized application state
- **Event-driven reactivity**: CustomEvents for pub/sub pattern
- **Pure functions**: State transformations are immutable
- **No DOM manipulation**: Components react to state, store doesn't touch DOM
- **Zero dependencies**: Pure browser APIs only

### State Shape

```javascript
{
  selectedItem: string  // Currently selected product variant (e.g., "cherry-pop")
}
```

### API

#### `getState()`

Returns a copy of the current state.

```javascript
import { getState } from './services/store.js';

const state = getState();
console.log(state.selectedItem); // "cherry-pop"
```

#### `setSelectedItem(value)`

Updates the selected item and emits a change event.

```javascript
import { setSelectedItem } from './services/store.js';

setSelectedItem("vanilla-vanity");
```

#### `getSelectedItem()`

Convenience getter for the selected item value.

```javascript
import { getSelectedItem } from './services/store.js';

const selected = getSelectedItem(); // "vanilla-vanity"
```

#### `subscribe(callback)`

Subscribe to state changes. Returns an unsubscribe function.

```javascript
import { subscribe } from './services/store.js';

const unsubscribe = subscribe(({ selectedItem }) => {
  console.log('Selection changed:', selectedItem);
});

// Later, cleanup
unsubscribe();
```

#### `resetState()`

Reset state to initial values.

```javascript
import { resetState } from './services/store.js';

resetState(); // Sets selectedItem to ""
```

### Events

The store emits CustomEvents on the `window` object:

#### `store:selectedItemChanged`

Fired when `selectedItem` changes.

```javascript
window.addEventListener('store:selectedItemChanged', (event) => {
  console.log('New selection:', event.detail.selectedItem);
});
```

**Event Detail:**
```javascript
{
  selectedItem: string
}
```

### Usage in Components

#### Reading State

```javascript
import { getState, getSelectedItem } from '../../services/store.js';

// Get full state
const state = getState();
console.log(state.selectedItem);

// Get just selected item
const selected = getSelectedItem();
```

#### Updating State

```javascript
import { setSelectedItem } from '../../services/store.js';

// In a component's event handler
this._input.addEventListener('change', () => {
  if (this._input.checked) {
    setSelectedItem(this._input.value);
  }
});
```

#### Subscribing to Changes

```javascript
import { subscribe } from '../../services/store.js';

class MyComponent extends HTMLElement {
  connectedCallback() {
    // Subscribe to state changes
    this._unsubscribe = subscribe(({ selectedItem }) => {
      this.updateUI(selectedItem);
    });
  }

  disconnectedCallback() {
    // Cleanup subscription
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }

  updateUI(selectedItem) {
    // React to state changes
    console.log('State updated:', selectedItem);
  }
}
```

### Integration Example

See `/ui/src/components/Storefront/StorefrontStoreDemo.html` for a complete working example.

The `StorefrontButtonGroupButton` component demonstrates the integration pattern:

1. Import the setter function
2. Listen for user interactions (radio button change)
3. Update global state when selection changes

```javascript
import { setSelectedItem } from '../../services/store.js';

class StorefrontButtonGroupButton extends HTMLElement {
  createStructure() {
    // ... create input element

    // Update store when selection changes
    this._input.addEventListener('change', () => {
      if (this._input.checked) {
        setSelectedItem(this._input.value);
      }
    });
  }
}
```

### Testing

A standalone test page is available at `/ui/src/services/store-test.html`.

Open this file in a browser to:
- View current state
- Manually trigger state updates
- Watch events in real-time

### Browser Compatibility

Uses only standard browser APIs:
- ES6 Modules
- CustomEvents
- Spread operator

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

### Debugging

In development (localhost), the store logs all state changes to the console:

```
[Store] Global state management initialized
[Store] selectedItem changed: cherry-pop
```

Disable by checking `window.location.hostname !== 'localhost'` in the store code.

### Best Practices

**DO:**
- Use `getState()` to read state (returns a copy)
- Use `setSelectedItem()` to update state (triggers events)
- Use `subscribe()` for reactive updates
- Clean up subscriptions in `disconnectedCallback()`
- Keep state transformations pure

**DON'T:**
- Mutate the state object directly
- Store DOM references in state
- Use for large datasets (keep state minimal)
- Forget to unsubscribe (memory leaks)
- Mix business logic with store code

### Future Enhancements

Potential additions to the store:

- **Multiple state properties**: Add quantity, variant, etc.
- **Persistence**: Save state to IndexedDB
- **History**: Undo/redo functionality
- **Computed values**: Derived state (e.g., total price)
- **Middleware**: Logging, validation, async actions

All extensions should maintain:
- Browser-native patterns
- Zero dependencies
- Event-driven architecture
- Light DOM principles
