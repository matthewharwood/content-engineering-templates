import './Video.css';
import VideoShowcaseHTML from './VideoShowcase.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Components/Video',
  tags: ['autodocs'],
};

export const Showcase = {
  render: () => createHTMLElement(VideoShowcaseHTML),
};
