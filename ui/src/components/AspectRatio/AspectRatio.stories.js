import './AspectRatio.css';
import AspectRatio1_1HTML from './AspectRatio1-1.html?raw';
import AspectRatio16_9HTML from './AspectRatio16-9.html?raw';
import AspectRatio9_16HTML from './AspectRatio9-16.html?raw';
import AspectRatio3_2HTML from './AspectRatio3-2.html?raw';
import AspectRatio2_3HTML from './AspectRatio2-3.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Components/AspectRatio',
  tags: ['autodocs'],
};

export const Square = {
  render: () => createHTMLElement(AspectRatio1_1HTML)
};

export const LandscapeVideo = {
  render: () => createHTMLElement(AspectRatio16_9HTML)
};

export const PortraitVideo = {
  render: () => createHTMLElement(AspectRatio9_16HTML)
};

export const LandscapePhoto = {
  render: () => createHTMLElement(AspectRatio3_2HTML)
};

export const PortraitPhoto = {
  render: () => createHTMLElement(AspectRatio2_3HTML)
};
