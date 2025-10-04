import './DesignTokens.css';
import ColorShowcaseHTML from './ColorShowcase.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Design Tokens/Color',
  tags: ['autodocs'],
};

export const ColorShowcase = {
  render: () => createHTMLElement(ColorShowcaseHTML)
};
