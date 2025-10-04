import './Navigation.css';
import '../Button/Button.css';
import '../Icon/Icon.css';
import NavigationDefaultHTML from './NavigationDefault.html?raw';
import NavigationWithImageHTML from './NavigationWithImage.html?raw';
import NavigationVariantsHTML from './NavigationVariants.html?raw';
import NavigationShowcaseHTML from './NavigationShowcase.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Components/Navigation',
  tags: ['autodocs'],
};

export const Default = {
  render: () => createHTMLElement(NavigationDefaultHTML),
  parameters: {
    docs: {
      description: {
        story: 'Default navigation with SVG logo, tertiary mini buttons on left, and icon buttons on right.',
      },
    },
  },
};

export const WithImage = {
  render: () => createHTMLElement(NavigationWithImageHTML),
  parameters: {
    docs: {
      description: {
        story: 'Navigation with an image logo in 16:9 aspect ratio container.',
      },
    },
  },
};

export const Variants = {
  render: () => createHTMLElement(NavigationVariantsHTML),
  parameters: {
    docs: {
      description: {
        story: 'Multiple navigation variants showing different combinations of buttons and icons.',
      },
    },
  },
};

export const Showcase = {
  render: () => createHTMLElement(NavigationShowcaseHTML),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Full showcase demonstrating the navigation component with detailed breakdown of each section and design tokens used.',
      },
    },
  },
};
