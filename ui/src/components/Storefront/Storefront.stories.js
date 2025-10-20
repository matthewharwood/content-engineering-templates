import './Storefront.css';

// Import web components (will auto-register custom elements)
import './Storefront.js';
import './StorefrontAssets.js';
import './StorefrontForm.js';
import './StorefrontAssetFrame.js';
import './StorefrontButtonGroup.js';
import './StorefrontButtonGroupButton.js';

import StorefrontDefaultHTML from './StorefrontDefault.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Components/Storefront',
  tags: ['autodocs'],
};

export const Default = {
  render: () => createHTMLElement(StorefrontDefaultHTML)
};
