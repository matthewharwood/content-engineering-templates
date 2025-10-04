import './Typography.css';

function createTypography({ level = 0, children = 'Hello World', as = 'p' } = {}) {
  const element = document.createElement(as);
  element.textContent = children;
  element.className = `typography typography--step-${level}`;
  return element;
}

export default {
  title: 'Components/Typography',
  tags: ['autodocs'],
  render: (args) => {
    return createTypography(args);
  },
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8]
    },
    as: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div']
    },
    children: { control: 'text' }
  },
};

export const Default = {
  args: {
    level: 0,
    children: 'Hello World',
    as: 'p'
  }
};

export const Heading1 = {
  args: {
    level: 8,
    children: 'Heading 1',
    as: 'h1'
  }
};

export const Heading2 = {
  args: {
    level: 7,
    children: 'Heading 2',
    as: 'h2'
  }
};

export const Heading3 = {
  args: {
    level: 6,
    children: 'Heading 3',
    as: 'h3'
  }
};

export const Heading4 = {
  args: {
    level: 5,
    children: 'Heading 4',
    as: 'h4'
  }
};

export const Heading5 = {
  args: {
    level: 4,
    children: 'Heading 5',
    as: 'h5'
  }
};

export const Heading6 = {
  args: {
    level: 3,
    children: 'Heading 6',
    as: 'h6'
  }
};

export const BodyText = {
  args: {
    level: 0,
    children: 'This is body text at step 0',
    as: 'p'
  }
};

export const SmallText = {
  args: {
    level: -1,
    children: 'This is small text at step -1',
    as: 'span'
  }
};

export const TinyText = {
  args: {
    level: -4,
    children: 'This is tiny text at step -4',
    as: 'span'
  }
};

export const AllLevels = {
  render: () => {
    const container = document.createElement('div');
    const levels = [8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4];

    levels.forEach(level => {
      const typography = createTypography({
        level,
        children: `Step ${level}: The quick brown fox jumps over the lazy dog`,
        as: 'p'
      });
      container.appendChild(typography);
    });

    return container;
  }
};
