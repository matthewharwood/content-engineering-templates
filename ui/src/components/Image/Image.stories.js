import './Image.css';
import ImageObjectFitHTML from './ImageObjectFit.html?raw';
import ImageGridHTML from './ImageGrid.html?raw';
import ImageShowcaseHTML from './ImageShowcase.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Components/Image',
  tags: ['autodocs'],
};

export const ObjectFit = {
  render: () => createHTMLElement(ImageObjectFitHTML),
};

export const Grid = {
  render: () => createHTMLElement(ImageGridHTML),
};

export const Showcase = {
  render: () => createHTMLElement(ImageShowcaseHTML),
};
