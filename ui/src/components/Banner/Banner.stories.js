import './Banner.css';
import BannerDefaultHTML from './BannerDefault.html?raw';
import BannerMiniHTML from './BannerMini.html?raw';
import BannerSecondaryHTML from './BannerSecondary.html?raw';
import BannerWithLinkHTML from './BannerWithLink.html?raw';
import BannerDismissibleHTML from './BannerDismissible.html?raw';
import BannerVariantsHTML from './BannerVariants.html?raw';
import BannerSizesHTML from './BannerSizes.html?raw';
import BannerShowcaseHTML from './BannerShowcase.html?raw';

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
  title: 'Components/Banner',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Full-bleed banner component for announcements, promotions, and notifications. Uses semantic theme colors and supports multiple sizes and variants.',
      },
    },
    layout: 'fullscreen',
  },
};

export const Default = {
  render: () => createHTMLElement(BannerDefaultHTML),
  parameters: {
    docs: {
      description: {
        story: 'Default banner with primary accent color (vibrant orange). Full-bleed design stretches edge-to-edge.',
      },
    },
  },
};

export const Mini = {
  render: () => createHTMLElement(BannerMiniHTML),
  parameters: {
    docs: {
      description: {
        story: 'Mini banner (~48px height) using theme spacing tokens. Perfect for compact announcements and promotional messages.',
      },
    },
  },
};

export const Secondary = {
  render: () => createHTMLElement(BannerSecondaryHTML),
  parameters: {
    docs: {
      description: {
        story: 'Secondary variant with coral pink background. Perfect for secondary announcements.',
      },
    },
  },
};

export const WithLink = {
  render: () => createHTMLElement(BannerWithLinkHTML),
  parameters: {
    docs: {
      description: {
        story: 'Banner with inline link using primary container background. Links are underlined with hover states.',
      },
    },
  },
};

export const Dismissible = {
  render: () => createHTMLElement(BannerDismissibleHTML),
  parameters: {
    docs: {
      description: {
        story: 'Dismissible banner with close button. Includes aria-label for accessibility and click handler to hide banner.',
      },
    },
  },
};

export const AllVariants = {
  render: () => createHTMLElement(BannerVariantsHTML),
  parameters: {
    docs: {
      description: {
        story: 'All color variants: primary, secondary, tertiary, and container variants. Each uses semantic theme tokens for automatic theme switching.',
      },
    },
  },
};

export const Sizes = {
  render: () => createHTMLElement(BannerSizesHTML),
  parameters: {
    docs: {
      description: {
        story: 'Four size variants: mini (~48px), small, medium (default), and large. Uses fluid spacing tokens from the Snif theme for consistent vertical rhythm.',
      },
    },
  },
};

export const Showcase = {
  render: () => createHTMLElement(BannerShowcaseHTML),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete showcase featuring all variants, sizes, interactive features, and accessibility documentation.',
      },
    },
  },
};
