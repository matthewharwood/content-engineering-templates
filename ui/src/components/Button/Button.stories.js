import './Button.css';
import ButtonPrimaryHTML from './ButtonPrimary.html?raw';
import ButtonSecondaryHTML from './ButtonSecondary.html?raw';
import ButtonTertiaryHTML from './ButtonTertiary.html?raw';
import ButtonOutlineHTML from './ButtonOutline.html?raw';
import ButtonSizesHTML from './ButtonSizes.html?raw';
import ButtonDisabledHTML from './ButtonDisabled.html?raw';
import ButtonPillHTML from './ButtonPill.html?raw';
import ButtonCircleHTML from './ButtonCircle.html?raw';
import ButtonShapesHTML from './ButtonShapes.html?raw';
import ButtonShowcaseHTML from './ButtonShowcase.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
};

export const Primary = {
  render: () => createHTMLElement(ButtonPrimaryHTML)
};

export const Secondary = {
  render: () => createHTMLElement(ButtonSecondaryHTML)
};

export const Tertiary = {
  render: () => createHTMLElement(ButtonTertiaryHTML)
};

export const Outline = {
  render: () => createHTMLElement(ButtonOutlineHTML)
};

export const Sizes = {
  render: () => createHTMLElement(ButtonSizesHTML)
};

export const Disabled = {
  render: () => createHTMLElement(ButtonDisabledHTML)
};

export const Pill = {
  render: () => createHTMLElement(ButtonPillHTML)
};

export const Circle = {
  render: () => createHTMLElement(ButtonCircleHTML)
};

export const Shapes = {
  render: () => createHTMLElement(ButtonShapesHTML)
};

export const Showcase = {
  render: () => createHTMLElement(ButtonShowcaseHTML)
};
