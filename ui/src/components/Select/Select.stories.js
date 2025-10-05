import './Select.css';
import SelectDefaultHTML from './SelectDefault.html?raw';
import SelectRequiredHTML from './SelectRequired.html?raw';
import SelectErrorHTML from './SelectError.html?raw';
import SelectDisabledHTML from './SelectDisabled.html?raw';
import SelectSizesHTML from './SelectSizes.html?raw';
import SelectGroupsHTML from './SelectGroups.html?raw';
import SelectMultipleHTML from './SelectMultiple.html?raw';
import SelectShowcaseHTML from './SelectShowcase.html?raw';

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
  title: 'Forms/Select',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accessible select dropdown component following WCAG 2.1 AA guidelines. Supports single and multiple selection, option groups, validation states, and multiple sizes. Uses semantic design tokens for full theme compatibility.',
      },
    },
  },
};

export const Default = {
  render: () => createHTMLElement(SelectDefaultHTML),
  parameters: {
    docs: {
      description: {
        story: 'Basic select dropdown with label and helper text. Uses aria-describedby to associate helper text with the select element.',
      },
    },
  },
};

export const Required = {
  render: () => createHTMLElement(SelectRequiredHTML),
  parameters: {
    docs: {
      description: {
        story: 'Required field with visual asterisk indicator and aria-required attribute for screen readers. The required HTML5 attribute enables browser validation.',
      },
    },
  },
};

export const Error = {
  render: () => createHTMLElement(SelectErrorHTML),
  parameters: {
    docs: {
      description: {
        story: 'Error state with validation message using aria-invalid and role="alert" for immediate screen reader announcement. Error message is associated via aria-describedby.',
      },
    },
  },
};

export const Disabled = {
  render: () => createHTMLElement(SelectDisabledHTML),
  parameters: {
    docs: {
      description: {
        story: 'Disabled select with reduced opacity and aria-disabled attribute. The disabled attribute prevents user interaction and form submission.',
      },
    },
  },
};

export const Sizes = {
  render: () => createHTMLElement(SelectSizesHTML),
  parameters: {
    docs: {
      description: {
        story: 'Three size variants using semantic spacing and typography tokens: small (--step--1), medium/default (--step-0), and large (--step-1). Padding adjusts proportionally using --space-* tokens.',
      },
    },
  },
};

export const OptionGroups = {
  render: () => createHTMLElement(SelectGroupsHTML),
  parameters: {
    docs: {
      description: {
        story: 'Organized options using semantic <optgroup> elements. Groups are visually distinguished and announced by screen readers for better navigation and understanding.',
      },
    },
  },
};

export const Multiple = {
  render: () => createHTMLElement(SelectMultipleHTML),
  parameters: {
    docs: {
      description: {
        story: 'Multiple selection using the native multiple attribute with size specified. Helper text instructs users on keyboard interaction (Ctrl/Cmd for multiple selection). Selected options are highlighted using primary container colors.',
      },
    },
  },
};

export const Showcase = {
  render: () => createHTMLElement(SelectShowcaseHTML),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete showcase featuring a registration form example, all component states, and comprehensive accessibility documentation. Demonstrates option groups, multiple selection, and proper form labeling.',
      },
    },
  },
};
