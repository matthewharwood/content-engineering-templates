import './Media.css';
import MediaShowcaseHTML from './MediaShowcase.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Components/Media',
  tags: ['autodocs'],
};

export const Showcase = {
  render: () => createHTMLElement(MediaShowcaseHTML),
};
