import './Link.css';
import LinkPrimaryHTML from './LinkPrimary.html?raw';
import LinkSecondaryHTML from './LinkSecondary.html?raw';
import LinkOnSurfaceHTML from './LinkOnSurface.html?raw';
import LinkInlineHTML from './LinkInline.html?raw';
import LinkNoUnderlineHTML from './LinkNoUnderline.html?raw';
import LinkSizesHTML from './LinkSizes.html?raw';
import LinkWithIconsHTML from './LinkWithIcons.html?raw';
import LinkExternalHTML from './LinkExternal.html?raw';
import LinkPseudoStatesHTML from './LinkPseudoStates.html?raw';
import LinkShowcaseHTML from './LinkShowcase.html?raw';
import LinkImageSvgHTML from './LinkImageSvg.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Components/Link',
  tags: ['autodocs'],
};

export const Primary = {
  render: () => createHTMLElement(LinkPrimaryHTML)
};

export const Secondary = {
  render: () => createHTMLElement(LinkSecondaryHTML)
};

export const OnSurface = {
  render: () => createHTMLElement(LinkOnSurfaceHTML)
};

export const Inline = {
  render: () => createHTMLElement(LinkInlineHTML)
};

export const NoUnderline = {
  render: () => createHTMLElement(LinkNoUnderlineHTML)
};

export const Sizes = {
  render: () => createHTMLElement(LinkSizesHTML)
};

export const WithIcons = {
  render: () => createHTMLElement(LinkWithIconsHTML)
};

export const External = {
  render: () => createHTMLElement(LinkExternalHTML)
};

export const PseudoStates = {
  render: () => createHTMLElement(LinkPseudoStatesHTML)
};

export const Showcase = {
  render: () => createHTMLElement(LinkShowcaseHTML)
};

export const ImageSvgLinks = {
  render: () => createHTMLElement(LinkImageSvgHTML),
  parameters: {
    docs: {
      description: {
        story: 'Examples of links wrapping images, SVG logos, and icons - commonly used for brand logos and navigation.',
      },
    },
  },
};
