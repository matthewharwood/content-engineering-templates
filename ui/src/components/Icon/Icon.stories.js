import './Icon.css';
import IconHTML from './Icon.html?raw';
import IconShowcaseHTML from './IconShowcase.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Components/Icon',
  tags: ['autodocs'],
};

export const Overview = {
  render: () => createHTMLElement(IconHTML)
};

export const IconShowcase = {
  render: () => createHTMLElement(IconShowcaseHTML)
};
