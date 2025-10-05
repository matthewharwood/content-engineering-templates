import './ButtonTags.css';
import '../Button/Button.css';
import ButtonTagsDefaultHTML from './ButtonTagsDefault.html?raw';
import ButtonTagsInteractiveHTML from './ButtonTagsInteractive.html?raw';
import ButtonTagsCertificationsHTML from './ButtonTagsCertifications.html?raw';
import ButtonTagsMixedHTML from './ButtonTagsMixed.html?raw';
import ButtonTagsSizesHTML from './ButtonTagsSizes.html?raw';
import ButtonTagsVariantsHTML from './ButtonTagsVariants.html?raw';
import ButtonTagsShowcaseHTML from './ButtonTagsShowcase.html?raw';

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
  title: 'Components/ButtonTags',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A flexible component for displaying collections of tags, badges, or labels with inline flex layout. Supports both interactive (button/anchor) and non-interactive (span) tags with multiple sizes, color variants, and gap options.',
      },
    },
  },
};

export const Default = {
  render: () => createHTMLElement(ButtonTagsDefaultHTML),
  parameters: {
    docs: {
      description: {
        story: 'Default non-interactive tags using secondary variant. Perfect for displaying fragrance notes, ingredients, or features.',
      },
    },
  },
};

export const Interactive = {
  render: () => createHTMLElement(ButtonTagsInteractiveHTML),
  parameters: {
    docs: {
      description: {
        story: 'Interactive tags using button elements with hover states. Add `.button-tag--interactive` class to enable hover and active states.',
      },
    },
  },
};

export const Certifications = {
  render: () => createHTMLElement(ButtonTagsCertificationsHTML),
  parameters: {
    docs: {
      description: {
        story: 'Product page example showing fragrance notes, quality features, and certifications. Demonstrates multiple tag groups stacked vertically.',
      },
    },
  },
};

export const Mixed = {
  render: () => createHTMLElement(ButtonTagsMixedHTML),
  parameters: {
    docs: {
      description: {
        story: 'Mix of interactive buttons and non-interactive spans in the same tag group. Interactive tags have hover effects while static tags remain fixed.',
      },
    },
  },
};

export const Sizes = {
  render: () => createHTMLElement(ButtonTagsSizesHTML),
  parameters: {
    docs: {
      description: {
        story: 'Four size variants: mini (~28px), small (~32px), medium (~40px), and large (~48px). Uses fluid spacing tokens for consistent sizing.',
      },
    },
  },
};

export const Variants = {
  render: () => createHTMLElement(ButtonTagsVariantsHTML),
  parameters: {
    docs: {
      description: {
        story: 'All color variants: primary, secondary, tertiary, and their container variants, plus surface and outline. Each uses semantic theme tokens.',
      },
    },
  },
};

export const Showcase = {
  render: () => createHTMLElement(ButtonTagsShowcaseHTML),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete showcase featuring all variants, sizes, gap options, and usage examples.',
      },
    },
  },
};
