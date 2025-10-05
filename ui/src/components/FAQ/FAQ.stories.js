import './FAQ.css';
import FAQDefaultHTML from './FAQDefault.html?raw';
import FAQSizesHTML from './FAQSizes.html?raw';
import FAQVariantsHTML from './FAQVariants.html?raw';
import FAQShapesHTML from './FAQShapes.html?raw';
import FAQProductHTML from './FAQProduct.html?raw';
import FAQShowcaseHTML from './FAQShowcase.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;

  // Execute any inline scripts
  const scripts = container.querySelectorAll('script');
  scripts.forEach(script => {
    const newScript = document.createElement('script');
    newScript.textContent = script.textContent;
    script.parentNode.replaceChild(newScript, script);
  });

  return container;
}

export default {
  title: 'Components/FAQ',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accessible accordion FAQ component using native HTML `<details>` and `<summary>` elements. Features built-in keyboard navigation, screen reader support, and follows WCAG 2.1 AA guidelines. Supports multiple sizes, colors, shapes, and interactive states with smooth animations.',
      },
    },
  },
};

export const Default = {
  render: () => createHTMLElement(FAQDefaultHTML),
  parameters: {
    docs: {
      description: {
        story: 'Default FAQ with medium size and surface variant. Uses native HTML details/summary elements for automatic accessibility. Click questions or use Enter/Space to expand answers. Icons rotate on open/close with smooth transitions.',
      },
    },
  },
};

export const Sizes = {
  render: () => createHTMLElement(FAQSizesHTML),
  parameters: {
    docs: {
      description: {
        story: 'Three size variants using semantic spacing and typography tokens: small (compact for sidebars), medium (default for main content), and large (prominent for hero sections). All sizes maintain consistent proportions and accessibility.',
      },
    },
  },
};

export const Variants = {
  render: () => createHTMLElement(FAQVariantsHTML),
  parameters: {
    docs: {
      description: {
        story: 'All color variants using semantic theme tokens: surface (default/neutral), primary (brand emphasis), secondary (supporting sections), and tertiary (accent sections). Each variant includes hover states and maintains WCAG AA contrast ratios.',
      },
    },
  },
};

export const Shapes = {
  render: () => createHTMLElement(FAQShapesHTML),
  parameters: {
    docs: {
      description: {
        story: 'Shape and style variants: default rounded (8px), pill shape (fully rounded), borderless (minimal with bottom borders only), and bordered (2px borders). Use borderless with compact spacing for simple list-style FAQs.',
      },
    },
  },
};

export const Product = {
  render: () => createHTMLElement(FAQProductHTML),
  parameters: {
    docs: {
      description: {
        story: 'Product-specific FAQ example for fragrance e-commerce. Demonstrates rich content support including lists, bold text, links, and inline code. Shows relaxed spacing for better readability with detailed answers.',
      },
    },
  },
};

export const Showcase = {
  render: () => createHTMLElement(FAQShowcaseHTML),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete showcase featuring all variants, sizes, shapes, accessibility features, and usage examples. Includes comprehensive documentation on keyboard navigation, screen reader support, and rich content formatting.',
      },
    },
  },
};
