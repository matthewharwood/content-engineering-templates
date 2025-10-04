import './Radio.css';
import './RadioButtonGroup.css';
import RadioBasicHTML from './RadioBasic.html?raw';
import RadioWithDescriptionsHTML from './RadioWithDescriptions.html?raw';
import RadioHorizontalHTML from './RadioHorizontal.html?raw';
import RadioSizesHTML from './RadioSizes.html?raw';
import RadioDisabledHTML from './RadioDisabled.html?raw';
import RadioErrorHTML from './RadioError.html?raw';
import RadioCardsHTML from './RadioCards.html?raw';
import RadioShowcaseHTML from './RadioShowcase.html?raw';
import RadioButtonGroupPrimaryHTML from './RadioButtonGroupPrimary.html?raw';
import RadioButtonGroupVariantsHTML from './RadioButtonGroupVariants.html?raw';
import RadioButtonGroupSizesHTML from './RadioButtonGroupSizes.html?raw';
import RadioButtonGroupShapesHTML from './RadioButtonGroupShapes.html?raw';
import RadioButtonGroupSegmentedHTML from './RadioButtonGroupSegmented.html?raw';
import RadioButtonGroupShowcaseHTML from './RadioButtonGroupShowcase.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Forms/Radio',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accessible radio button component following WCAG 2.1 AA guidelines with semantic fieldset/legend grouping and full keyboard support.',
      },
    },
  },
};

export const Basic = {
  render: () => createHTMLElement(RadioBasicHTML),
  parameters: {
    docs: {
      description: {
        story: 'Basic radio button group with fieldset and legend for semantic grouping.',
      },
    },
  },
};

export const WithDescriptions = {
  render: () => createHTMLElement(RadioWithDescriptionsHTML),
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons with descriptive text providing additional context for each option.',
      },
    },
  },
};

export const Horizontal = {
  render: () => createHTMLElement(RadioHorizontalHTML),
  parameters: {
    docs: {
      description: {
        story: 'Horizontal layout for radio buttons, useful for shorter option lists.',
      },
    },
  },
};

export const Sizes = {
  render: () => createHTMLElement(RadioSizesHTML),
  parameters: {
    docs: {
      description: {
        story: 'Three size variants: small, medium (default), and large.',
      },
    },
  },
};

export const Disabled = {
  render: () => createHTMLElement(RadioDisabledHTML),
  parameters: {
    docs: {
      description: {
        story: 'Disabled radio options with reduced opacity and aria-disabled attribute.',
      },
    },
  },
};

export const Error = {
  render: () => createHTMLElement(RadioErrorHTML),
  parameters: {
    docs: {
      description: {
        story: 'Error state with validation message using aria-invalid and role="alert".',
      },
    },
  },
};

export const Cards = {
  render: () => createHTMLElement(RadioCardsHTML),
  parameters: {
    docs: {
      description: {
        story: 'Card-style radio buttons with enhanced visual prominence, ideal for pricing plans or feature selection.',
      },
    },
  },
};

export const Showcase = {
  render: () => createHTMLElement(RadioShowcaseHTML),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete showcase with survey form example, all states, and accessibility documentation.',
      },
    },
  },
};

export const ButtonGroupPrimary = {
  render: () => createHTMLElement(RadioButtonGroupPrimaryHTML),
  parameters: {
    docs: {
      description: {
        story: 'Button group with radio buttons underneath - looks like buttons but only allows single selection.',
      },
    },
  },
};

export const ButtonGroupVariants = {
  render: () => createHTMLElement(RadioButtonGroupVariantsHTML),
  parameters: {
    docs: {
      description: {
        story: 'All button variants (Primary, Secondary, Tertiary, Outline) as radio button groups.',
      },
    },
  },
};

export const ButtonGroupSizes = {
  render: () => createHTMLElement(RadioButtonGroupSizesHTML),
  parameters: {
    docs: {
      description: {
        story: 'Button groups in all size variants: Mini, Small, Medium, and Large.',
      },
    },
  },
};

export const ButtonGroupShapes = {
  render: () => createHTMLElement(RadioButtonGroupShapesHTML),
  parameters: {
    docs: {
      description: {
        story: 'Button groups with different shapes: Default rounded, Pill, Square, and Circle (for icon buttons).',
      },
    },
  },
};

export const ButtonGroupSegmented = {
  render: () => createHTMLElement(RadioButtonGroupSegmentedHTML),
  parameters: {
    docs: {
      description: {
        story: 'Segmented control variant where buttons are joined together for a cohesive appearance.',
      },
    },
  },
};

export const ButtonGroupShowcase = {
  render: () => createHTMLElement(RadioButtonGroupShowcaseHTML),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete showcase demonstrating button groups in real-world scenarios: dashboard filters, text editor toolbars, and all variants.',
      },
    },
  },
};
