import './Typography.css';
import AllLevelsHTML from './AllLevels.html?raw';
import HeadingsHTML from './Headings.html?raw';
import BodyTextHTML from './BodyText.html?raw';
import TypographyLockupsHTML from './TypographyLockups.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Components/Typography',
  tags: ['autodocs'],
};

export const AllLevels = {
  render: () => createHTMLElement(AllLevelsHTML)
};

export const Headings = {
  render: () => createHTMLElement(HeadingsHTML)
};

export const BodyText = {
  render: () => createHTMLElement(BodyTextHTML)
};

export const TypeLockups = {
  render: () => createHTMLElement(TypographyLockupsHTML)
};
