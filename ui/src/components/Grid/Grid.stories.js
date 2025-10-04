import './Grid.css';
import TwelveColumnsHTML from './TwelveColumns.html?raw';
import ColumnSpansHTML from './ColumnSpans.html?raw';
import ResponsiveLayoutHTML from './ResponsiveLayout.html?raw';
import HolyGrailLayoutHTML from './HolyGrailLayout.html?raw';
import HolyGrailResponsiveHTML from './HolyGrailResponsive.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Layout/Grid',
  tags: ['autodocs'],
};

export const TwelveColumns = {
  render: () => createHTMLElement(TwelveColumnsHTML)
};

export const ColumnSpans = {
  render: () => createHTMLElement(ColumnSpansHTML)
};

export const ResponsiveLayout = {
  render: () => createHTMLElement(ResponsiveLayoutHTML)
};

export const HolyGrailLayout = {
  render: () => createHTMLElement(HolyGrailLayoutHTML)
};

export const HolyGrailResponsive = {
  render: () => createHTMLElement(HolyGrailResponsiveHTML)
};
