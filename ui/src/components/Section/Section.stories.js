import './Section.css';
import SectionFullBleedHTML from './SectionFullBleed.html?raw';
import SectionWithContainerHTML from './SectionWithContainer.html?raw';
import SectionWithGridHTML from './SectionWithGrid.html?raw';
import SectionColorBackgroundHTML from './SectionColorBackground.html?raw';
import SectionImageBackgroundHTML from './SectionImageBackground.html?raw';
import SectionVideoBackgroundHTML from './SectionVideoBackground.html?raw';
import SectionHeight20HTML from './SectionHeight20.html?raw';
import SectionHeight33HTML from './SectionHeight33.html?raw';
import SectionHeight50HTML from './SectionHeight50.html?raw';
import SectionHeight100HTML from './SectionHeight100.html?raw';
import SectionHeightAutoHTML from './SectionHeightAuto.html?raw';
import SectionContainerBackgroundHTML from './SectionContainerBackground.html?raw';
import SectionGridBackgroundHTML from './SectionGridBackground.html?raw';
import SectionComplexLayoutHTML from './SectionComplexLayout.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Layout/Section',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Flexible section component with Utopia container and grid system support. Sections can have various heights, backgrounds (color, image, video), and layout options (full bleed, with container, with grid).',
      },
    },
  },
};

// Layout Variants
export const FullBleed = {
  render: () => createHTMLElement(SectionFullBleedHTML),
  parameters: {
    docs: {
      description: {
        story: 'Full bleed section with no container or grid. Content spans the full viewport width.',
      },
    },
  },
};

export const WithContainer = {
  render: () => createHTMLElement(SectionWithContainerHTML),
  parameters: {
    docs: {
      description: {
        story: 'Section with Utopia container (.u-container) that constrains content width with responsive gutters.',
      },
    },
  },
};

export const WithGrid = {
  render: () => createHTMLElement(SectionWithGridHTML),
  parameters: {
    docs: {
      description: {
        story: 'Section with container and 12-column Utopia grid system for complex layouts.',
      },
    },
  },
};

// Background Color Variants
export const PrimaryBackground = {
  render: () => createHTMLElement(SectionColorBackgroundHTML),
  parameters: {
    docs: {
      description: {
        story: 'Section with primary color background using semantic design tokens.',
      },
    },
  },
};

export const SecondaryBackground = {
  render: () => createHTMLElement(`
    <link rel="stylesheet" href="./Section.css">
    <section class="section section--bg-secondary">
      <div class="u-container">
        <h2>Section with Secondary Background</h2>
        <p>This section uses the secondary semantic color token.</p>
      </div>
    </section>
  `),
  parameters: {
    docs: {
      description: {
        story: 'Section with secondary color background.',
      },
    },
  },
};

export const TertiaryBackground = {
  render: () => createHTMLElement(`
    <link rel="stylesheet" href="./Section.css">
    <section class="section section--bg-tertiary">
      <div class="u-container">
        <h2>Section with Tertiary Background</h2>
        <p>This section uses the tertiary semantic color token.</p>
      </div>
    </section>
  `),
  parameters: {
    docs: {
      description: {
        story: 'Section with tertiary color background.',
      },
    },
  },
};

export const SurfaceBackground = {
  render: () => createHTMLElement(`
    <link rel="stylesheet" href="./Section.css">
    <section class="section section--bg-surface">
      <div class="u-container">
        <h2>Section with Surface Background</h2>
        <p>This section uses the surface semantic color token.</p>
      </div>
    </section>
  `),
  parameters: {
    docs: {
      description: {
        story: 'Section with surface color background.',
      },
    },
  },
};

export const PrimaryContainerBackground = {
  render: () => createHTMLElement(`
    <link rel="stylesheet" href="./Section.css">
    <section class="section section--bg-primary-container">
      <div class="u-container">
        <h2>Section with Primary Container Background</h2>
        <p>This section uses the primary container semantic color token.</p>
      </div>
    </section>
  `),
  parameters: {
    docs: {
      description: {
        story: 'Section with primary container color background.',
      },
    },
  },
};

// Image Background
export const ImageBackground = {
  render: () => createHTMLElement(SectionImageBackgroundHTML),
  parameters: {
    docs: {
      description: {
        story: 'Section with image background and dark overlay for text readability. Uses custom property --section-bg-image for flexibility.',
      },
    },
  },
};

// Video Background
export const VideoBackground = {
  render: () => createHTMLElement(SectionVideoBackgroundHTML),
  parameters: {
    docs: {
      description: {
        story: 'Section with video background, overlay, and layered content for visual impact.',
      },
    },
  },
};

// Height Variants
export const Height20Percent = {
  render: () => createHTMLElement(SectionHeight20HTML),
  parameters: {
    docs: {
      description: {
        story: 'Section with 20vh minimum height (20% of viewport height).',
      },
    },
  },
};

export const Height33Percent = {
  render: () => createHTMLElement(SectionHeight33HTML),
  parameters: {
    docs: {
      description: {
        story: 'Section with 33vh minimum height (33% of viewport height).',
      },
    },
  },
};

export const Height50Percent = {
  render: () => createHTMLElement(SectionHeight50HTML),
  parameters: {
    docs: {
      description: {
        story: 'Section with 50vh minimum height (50% of viewport height).',
      },
    },
  },
};

export const Height100Percent = {
  render: () => createHTMLElement(SectionHeight100HTML),
  parameters: {
    docs: {
      description: {
        story: 'Section with 100vh minimum height (full viewport height) - perfect for hero sections.',
      },
    },
  },
};

export const HeightAuto = {
  render: () => createHTMLElement(SectionHeightAutoHTML),
  parameters: {
    docs: {
      description: {
        story: 'Section with auto height - height is determined by content.',
      },
    },
  },
};

// Layered Backgrounds
export const ContainerWithBackground = {
  render: () => createHTMLElement(SectionContainerBackgroundHTML),
  parameters: {
    docs: {
      description: {
        story: 'Section background + separate container background. Demonstrates background layering.',
      },
    },
  },
};

export const GridWithBackground = {
  render: () => createHTMLElement(SectionGridBackgroundHTML),
  parameters: {
    docs: {
      description: {
        story: 'Section background + grid background. The grid itself has a distinct background color.',
      },
    },
  },
};

// Complex Layout Examples
export const ComplexLayout = {
  render: () => createHTMLElement(SectionComplexLayoutHTML),
  parameters: {
    docs: {
      description: {
        story: 'Complex section combining height, multiple background layers, container, and grid layout.',
      },
    },
  },
};

export const FullBleedImageHero = {
  render: () => createHTMLElement(`
    <link rel="stylesheet" href="./Section.css">
    <section class="section section--height-100 section--bg-image" style="--section-bg-image: url('https://images.unsplash.com/photo-1557683304-673a23048d34?w=1920&h=1080&fit=crop');">
      <div class="u-container">
        <h1 style="font-size: var(--type-heading-1); margin-bottom: var(--space-m);">Full Bleed Hero Section</h1>
        <p style="font-size: var(--type-body-large); max-width: 60ch;">Full viewport height hero section with image background and centered content.</p>
      </div>
    </section>
  `),
  parameters: {
    docs: {
      description: {
        story: 'Full viewport height hero section with image background.',
      },
    },
  },
};

export const GridLayoutWithVideo = {
  render: () => createHTMLElement(`
    <link rel="stylesheet" href="./Section.css">
    <section class="section section--height-50 section--bg-video">
      <video class="section__bg-video" autoplay muted loop playsinline>
        <source src="https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4" type="video/mp4">
      </video>
      <div class="section__video-overlay"></div>
      <div class="u-container section__content">
        <div class="u-grid" style="grid-template-columns: repeat(12, 1fr);">
          <div class="section__grid-item col-span-6">
            <h2>Video Background with Grid</h2>
            <p>Combining video background with a 12-column grid layout.</p>
          </div>
          <div class="section__grid-item col-span-6">
            <h3>Grid Column 2</h3>
            <p>Content in the second column sits on top of the video.</p>
          </div>
        </div>
      </div>
    </section>
  `),
  parameters: {
    docs: {
      description: {
        story: '50vh section with video background and grid layout.',
      },
    },
  },
};

export const MultipleBackgroundLayers = {
  render: () => createHTMLElement(`
    <link rel="stylesheet" href="./Section.css">
    <section class="section section--height-50 section--bg-primary">
      <div class="u-container container--bg-surface">
        <div class="u-grid grid--bg-tertiary" style="grid-template-columns: repeat(3, 1fr);">
          <div class="section__grid-item">
            <h3>Layer 1</h3>
            <p>Section background: Primary</p>
          </div>
          <div class="section__grid-item">
            <h3>Layer 2</h3>
            <p>Container background: Surface</p>
          </div>
          <div class="section__grid-item">
            <h3>Layer 3</h3>
            <p>Grid background: Tertiary</p>
          </div>
        </div>
      </div>
    </section>
  `),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates three layers of backgrounds: section, container, and grid.',
      },
    },
  },
};

export const AsymmetricGrid = {
  render: () => createHTMLElement(`
    <link rel="stylesheet" href="./Section.css">
    <section class="section section--bg-surface-variant">
      <div class="u-container">
        <div class="u-grid" style="grid-template-columns: repeat(12, 1fr);">
          <div class="section__grid-item col-span-8">
            <h2>Main Content Area</h2>
            <p>This takes up 8 columns of the 12-column grid, creating an asymmetric layout perfect for article content with a sidebar.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div class="section__grid-item col-span-4">
            <h3>Sidebar</h3>
            <p>This sidebar takes up 4 columns.</p>
            <ul style="padding-left: var(--space-m); margin-top: var(--space-s);">
              <li>Navigation item</li>
              <li>Quick link</li>
              <li>Related content</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `),
  parameters: {
    docs: {
      description: {
        story: 'Asymmetric 8-4 column layout using the 12-column grid system.',
      },
    },
  },
};

export const StackedSections = {
  render: () => createHTMLElement(`
    <link rel="stylesheet" href="./Section.css">
    <div>
      <section class="section section--height-33 section--bg-primary">
        <div class="u-container">
          <h2>Section 1</h2>
          <p>First section with primary background at 33vh height.</p>
        </div>
      </section>
      <section class="section section--height-33 section--bg-secondary">
        <div class="u-container">
          <h2>Section 2</h2>
          <p>Second section with secondary background at 33vh height.</p>
        </div>
      </section>
      <section class="section section--height-33 section--bg-tertiary">
        <div class="u-container">
          <h2>Section 3</h2>
          <p>Third section with tertiary background at 33vh height.</p>
        </div>
      </section>
    </div>
  `),
  parameters: {
    docs: {
      description: {
        story: 'Multiple sections stacked vertically with different background colors.',
      },
    },
  },
};
