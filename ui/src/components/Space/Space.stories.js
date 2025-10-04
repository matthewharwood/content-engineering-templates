import './Space.css';
import AllSpacesHTML from './AllSpaces.html?raw';
import AllFluidSpacesHTML from './AllFluidSpaces.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Design Tokens/Space',
  tags: ['autodocs'],
};

export const AllSpaces = {
  render: () => createHTMLElement(AllSpacesHTML)
};

export const AllFluidSpaces = {
  render: () => createHTMLElement(AllFluidSpacesHTML)
};
