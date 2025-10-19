import './MediaLockup.css';
import Lockup01SplitLeftHTML from './Lockup01SplitLeft.html?raw';
import Lockup02SplitRightHTML from './Lockup02SplitRight.html?raw';
import Lockup03StackedTopHTML from './Lockup03StackedTop.html?raw';
import Lockup04StackedBottomHTML from './Lockup04StackedBottom.html?raw';
import Lockup05HeroOverlayHTML from './Lockup05HeroOverlay.html?raw';
import Lockup06CircleBadgeHTML from './Lockup06CircleBadge.html?raw';
import Lockup07WideImageHTML from './Lockup07WideImage.html?raw';
import Lockup08WideTextHTML from './Lockup08WideText.html?raw';
import Lockup09CardHTML from './Lockup09Card.html?raw';
import Lockup10FullBleedHTML from './Lockup10FullBleed.html?raw';
import Lockup11OffsetHTML from './Lockup11Offset.html?raw';
import Lockup12MagazineHTML from './Lockup12Magazine.html?raw';
import Lockup13AsymmetricLeftHTML from './Lockup13AsymmetricLeft.html?raw';
import Lockup14AsymmetricRightHTML from './Lockup14AsymmetricRight.html?raw';
import Lockup15PolaroidHTML from './Lockup15Polaroid.html?raw';
import Lockup16AvatarHTML from './Lockup16Avatar.html?raw';
import Lockup17FeatureHTML from './Lockup17Feature.html?raw';
import Lockup18TestimonialHTML from './Lockup18Testimonial.html?raw';
import Lockup19ProductHTML from './Lockup19Product.html?raw';
import Lockup20ArticleHTML from './Lockup20Article.html?raw';
import Lockup21FullBleedHeroHTML from './Lockup21FullBleedHero.html?raw';

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
  title: 'Layouts/MediaLockup',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '20 responsive media lockup patterns combining images and typography. Each pattern uses the 12-column grid system and adapts intelligently from mobile to desktop. All lockups use semantic design tokens for colors, spacing, and typography.',
      },
    },
  },
};

// Lockup 01: Split 50/50 - Image Left
export const Lockup01SplitLeft = {
  render: () => createHTMLElement(Lockup01SplitLeftHTML),
  parameters: {
    docs: {
      description: {
        story: '**Split 50/50 - Image Left**: Classic split layout with image on left (6 cols) and content on right (6 cols). Mobile stacks image first. Reference: `media-lockup--split-left`',
      },
    },
  },
};

// Lockup 02: Split 50/50 - Image Right
export const Lockup02SplitRight = {
  render: () => createHTMLElement(Lockup02SplitRightHTML),
  parameters: {
    docs: {
      description: {
        story: '**Split 50/50 - Image Right**: Reverse split with content left (6 cols), image right (6 cols). Mobile stacks content first. Great for alternating sections. Reference: `media-lockup--split-right`',
      },
    },
  },
};

// Lockup 03: Stacked - Image Top
export const Lockup03StackedTop = {
  render: () => createHTMLElement(Lockup03StackedTopHTML),
  parameters: {
    docs: {
      description: {
        story: '**Stacked - Image Top**: Vertical stack with full-width image above content. Works great for blog posts and articles. Reference: `media-lockup--stacked-top`',
      },
    },
  },
};

// Lockup 04: Stacked - Image Bottom
export const Lockup04StackedBottom = {
  render: () => createHTMLElement(Lockup04StackedBottomHTML),
  parameters: {
    docs: {
      description: {
        story: '**Stacked - Image Bottom**: Inverted vertical stack with content first, image second. Emphasizes text before visual. Reference: `media-lockup--stacked-bottom`',
      },
    },
  },
};

// Lockup 05: Hero Overlay
export const Lockup05HeroOverlay = {
  render: () => createHTMLElement(Lockup05HeroOverlayHTML),
  parameters: {
    docs: {
      description: {
        story: '**Hero Overlay**: Full-width hero with text overlaid on image. Gradient background ensures readability. Scales 400px mobile to 600px desktop. Reference: `media-lockup--hero-overlay`',
      },
    },
  },
};

// Lockup 06: Circle Badge
export const Lockup06CircleBadge = {
  render: () => createHTMLElement(Lockup06CircleBadgeHTML),
  parameters: {
    docs: {
      description: {
        story: '**Circle Badge**: Circular image (4 cols desktop) with aligned text (8 cols). Mobile centers both vertically. Reference: `media-lockup--circle-badge`',
      },
    },
  },
};

// Lockup 07: Wide Image (8/4)
export const Lockup07WideImage = {
  render: () => createHTMLElement(Lockup07WideImageHTML),
  parameters: {
    docs: {
      description: {
        story: '**Wide Image 8/4**: Asymmetric layout with image taking 8 columns, text 4 columns. Image is the star. Mobile stacks. Reference: `media-lockup--wide-image`',
      },
    },
  },
};

// Lockup 08: Wide Text (4/8)
export const Lockup08WideText = {
  render: () => createHTMLElement(Lockup08WideTextHTML),
  parameters: {
    docs: {
      description: {
        story: '**Wide Text 4/8**: Inverted asymmetric with image 4 columns, text 8 columns. Text-heavy content with supporting visual. Reference: `media-lockup--wide-text`',
      },
    },
  },
};

// Lockup 09: Card Style
export const Lockup09Card = {
  render: () => createHTMLElement(Lockup09CardHTML),
  parameters: {
    docs: {
      description: {
        story: '**Card Style**: Self-contained card with 16:9 image top, text below. Max-width 400px. Perfect for blog cards or product listings. Reference: `media-lockup--card`',
      },
    },
  },
};

// Lockup 10: Full Bleed Hero
export const Lockup10FullBleed = {
  render: () => createHTMLElement(Lockup10FullBleedHTML),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '**Full Bleed Hero**: Edge-to-edge hero breaking grid constraints. Dark overlay, centered text. Scales 500px mobile to 700px desktop. Reference: `media-lockup--full-bleed`',
      },
    },
  },
};

// Lockup 11: Offset Overlap
export const Lockup11Offset = {
  render: () => createHTMLElement(Lockup11OffsetHTML),
  parameters: {
    docs: {
      description: {
        story: '**Offset Overlap**: Content box overlaps image on desktop creating depth and visual interest. Mobile stacks with spacing. Reference: `media-lockup--offset`',
      },
    },
  },
};

// Lockup 12: Magazine Two Column
export const Lockup12Magazine = {
  render: () => createHTMLElement(Lockup12MagazineHTML),
  parameters: {
    docs: {
      description: {
        story: '**Magazine Layout**: Editorial-style two-column layout. Image maintains 4:3 aspect ratio. Mobile stacks with larger gap. Reference: `media-lockup--magazine`',
      },
    },
  },
};

// Lockup 13: Asymmetric Left Heavy (7/5)
export const Lockup13AsymmetricLeft = {
  render: () => createHTMLElement(Lockup13AsymmetricLeftHTML),
  parameters: {
    docs: {
      description: {
        story: '**Asymmetric Left 7/5**: Left-weighted with image 7 columns, text 5 columns. Creates visual interest through unequal proportions. Reference: `media-lockup--asymmetric-left`',
      },
    },
  },
};

// Lockup 14: Asymmetric Right Heavy (5/7)
export const Lockup14AsymmetricRight = {
  render: () => createHTMLElement(Lockup14AsymmetricRightHTML),
  parameters: {
    docs: {
      description: {
        story: '**Asymmetric Right 5/7**: Right-weighted with text 5 columns, image 7 columns. Ideal for alternating with left-heavy version. Reference: `media-lockup--asymmetric-right`',
      },
    },
  },
};

// Lockup 15: Polaroid Style
export const Lockup15Polaroid = {
  render: () => createHTMLElement(Lockup15PolaroidHTML),
  parameters: {
    docs: {
      description: {
        story: '**Polaroid Style**: Square image with white padding and caption below. Drop shadow adds depth. Max-width 400px, centered. Reference: `media-lockup--polaroid`',
      },
    },
  },
};

// Lockup 16: Small Circle Avatar
export const Lockup16Avatar = {
  render: () => createHTMLElement(Lockup16AvatarHTML),
  parameters: {
    docs: {
      description: {
        story: '**Avatar Badge**: Compact with small circular avatar (80px max, 2 cols) and text (10 cols). Perfect for author bios and team profiles. Reference: `media-lockup--avatar`',
      },
    },
  },
};

// Lockup 17: Feature Block
export const Lockup17Feature = {
  render: () => createHTMLElement(Lockup17FeatureHTML),
  parameters: {
    docs: {
      description: {
        story: '**Feature Block**: 16:9 image with bottom-aligned text overlay. Gradient ensures readability. Ideal for feature sections and CTAs. Reference: `media-lockup--feature`',
      },
    },
  },
};

// Lockup 18: Testimonial Style
export const Lockup18Testimonial = {
  render: () => createHTMLElement(Lockup18TestimonialHTML),
  parameters: {
    docs: {
      description: {
        story: '**Testimonial Quote**: Circular image with primary border (3 cols), quote box with left accent (9 cols). Desktop splits, mobile stacks. Reference: `media-lockup--testimonial`',
      },
    },
  },
};

// Lockup 19: Product Showcase
export const Lockup19Product = {
  render: () => createHTMLElement(Lockup19ProductHTML),
  parameters: {
    docs: {
      description: {
        story: '**Product Showcase**: Vertical 3:4 image with minimal text below. Centered mobile, left-aligned desktop. E-commerce product displays. Reference: `media-lockup--product`',
      },
    },
  },
};

// Lockup 20: Article Header
export const Lockup20Article = {
  render: () => createHTMLElement(Lockup20ArticleHTML),
  parameters: {
    docs: {
      description: {
        story: '**Article Header**: Wide 21:9 hero image with article content below. Content max-width 65ch, centered. Large gap. Blog posts and long-form content. Reference: `media-lockup--article`',
      },
    },
  },
};

// Lockup 21: Full Bleed Hero - Right Aligned
export const Lockup21FullBleedHero = {
  render: () => createHTMLElement(Lockup21FullBleedHeroHTML),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '**Full Bleed Hero - Right Aligned**: Full viewport height hero with edge-to-edge image. Text is right-aligned and vertically centered with gradient overlay from right to left. Perfect for impactful landing pages. Reference: `media-lockup--full-bleed-hero`',
      },
    },
  },
};
