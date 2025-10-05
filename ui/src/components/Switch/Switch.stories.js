import './Switch.css';
import './SwitchButtonGroup.css';
import SwitchBasicHTML from './SwitchBasic.html?raw';
import SwitchWithDescriptionHTML from './SwitchWithDescription.html?raw';
import SwitchSizesHTML from './SwitchSizes.html?raw';
import SwitchStatesHTML from './SwitchStates.html?raw';
import SwitchLabelPositionHTML from './SwitchLabelPosition.html?raw';
import SwitchGroupHTML from './SwitchGroup.html?raw';
import SwitchShowcaseHTML from './SwitchShowcase.html?raw';
import SwitchButtonGroupPrimaryHTML from './SwitchButtonGroupPrimary.html?raw';
import SwitchButtonGroupVariantsHTML from './SwitchButtonGroupVariants.html?raw';
import SwitchButtonGroupSizesHTML from './SwitchButtonGroupSizes.html?raw';
import SwitchButtonGroupShapesHTML from './SwitchButtonGroupShapes.html?raw';
import SwitchButtonGroupSegmentedHTML from './SwitchButtonGroupSegmented.html?raw';
import SwitchButtonGroupShowcaseHTML from './SwitchButtonGroupShowcase.html?raw';

function createHTMLElement(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

export default {
  title: 'Forms/Switch',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accessible toggle switch component following WCAG 2.1 AA guidelines with role="switch", semantic HTML, and full keyboard support.',
      },
    },
  },
};

export const Basic = {
  render: () => createHTMLElement(SwitchBasicHTML),
  parameters: {
    docs: {
      description: {
        story: 'Basic switch controls with labels. Includes unchecked, checked, and required states.',
      },
    },
  },
};

export const WithDescription = {
  render: () => createHTMLElement(SwitchWithDescriptionHTML),
  parameters: {
    docs: {
      description: {
        story: 'Switches with descriptive text providing additional context about what the switch controls.',
      },
    },
  },
};

export const Sizes = {
  render: () => createHTMLElement(SwitchSizesHTML),
  parameters: {
    docs: {
      description: {
        story: 'Three size variants: small, medium (default), and large.',
      },
    },
  },
};

export const States = {
  render: () => createHTMLElement(SwitchStatesHTML),
  parameters: {
    docs: {
      description: {
        story: 'All switch states: default unchecked, checked, disabled (both states), and error with validation message.',
      },
    },
  },
};

export const LabelPosition = {
  render: () => createHTMLElement(SwitchLabelPositionHTML),
  parameters: {
    docs: {
      description: {
        story: 'Switches with labels positioned on the right (default) or left side. Left positioning is common in mobile settings panels.',
      },
    },
  },
};

export const Group = {
  render: () => createHTMLElement(SwitchGroupHTML),
  parameters: {
    docs: {
      description: {
        story: 'Multiple switches grouped together using fieldset and legend for semantic organization.',
      },
    },
  },
};

export const Showcase = {
  render: () => createHTMLElement(SwitchShowcaseHTML),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete showcase with real-world examples: account settings panel, mobile-style system settings, all states and sizes, and accessibility documentation.',
      },
    },
  },
};

export const ButtonGroupPrimary = {
  render: () => createHTMLElement(SwitchButtonGroupPrimaryHTML),
  parameters: {
    docs: {
      description: {
        story: 'Segmented control-style toggle with sliding thumb - looks like two connected buttons with a thumb that slides between them. Uses checkbox underneath for binary on/off states.',
      },
    },
  },
};

export const ButtonGroupVariants = {
  render: () => createHTMLElement(SwitchButtonGroupVariantsHTML),
  parameters: {
    docs: {
      description: {
        story: 'All button variants (Primary, Secondary, Tertiary, Outline) as toggle switches.',
      },
    },
  },
};

export const ButtonGroupSizes = {
  render: () => createHTMLElement(SwitchButtonGroupSizesHTML),
  parameters: {
    docs: {
      description: {
        story: 'Button group switches in all size variants: Mini, Small, Medium, and Large.',
      },
    },
  },
};

export const ButtonGroupShapes = {
  render: () => createHTMLElement(SwitchButtonGroupShapesHTML),
  parameters: {
    docs: {
      description: {
        story: 'Button group switches with different shapes: Default rounded, Pill, Square, and Circle (for icon buttons).',
      },
    },
  },
};

export const ButtonGroupSegmented = {
  render: () => createHTMLElement(SwitchButtonGroupSegmentedHTML),
  parameters: {
    docs: {
      description: {
        story: 'Examples of segmented toggle controls in various real-world use cases: privacy settings, publication status, lock status, and activity status.',
      },
    },
  },
};

export const ButtonGroupShowcase = {
  render: () => createHTMLElement(SwitchButtonGroupShowcaseHTML),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete showcase demonstrating toggle button groups in real-world scenarios: settings panels, content editor controls, and all variants.',
      },
    },
  },
};
