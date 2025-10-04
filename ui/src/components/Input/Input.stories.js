import './Input.css';
import InputTextHTML from './InputText.html?raw';
import InputRequiredHTML from './InputRequired.html?raw';
import InputErrorHTML from './InputError.html?raw';
import InputDisabledHTML from './InputDisabled.html?raw';
import InputTypesHTML from './InputTypes.html?raw';
import InputSizesHTML from './InputSizes.html?raw';
import InputTextareaHTML from './InputTextarea.html?raw';
import InputShowcaseHTML from './InputShowcase.html?raw';

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
  title: 'Forms/Input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accessible input component following WCAG 2.1 AA guidelines with support for multiple input types, sizes, and states.',
      },
    },
  },
};

export const Text = {
  render: () => createHTMLElement(InputTextHTML),
  parameters: {
    docs: {
      description: {
        story: 'Basic text input with label and helper text.',
      },
    },
  },
};

export const Required = {
  render: () => createHTMLElement(InputRequiredHTML),
  parameters: {
    docs: {
      description: {
        story: 'Required field with asterisk indicator and aria-required attribute.',
      },
    },
  },
};

export const Error = {
  render: () => createHTMLElement(InputErrorHTML),
  parameters: {
    docs: {
      description: {
        story: 'Error state with validation message using aria-invalid and role="alert".',
      },
    },
  },
};

export const Disabled = {
  render: () => createHTMLElement(InputDisabledHTML),
  parameters: {
    docs: {
      description: {
        story: 'Disabled input field with reduced opacity and aria-disabled attribute.',
      },
    },
  },
};

export const AllTypes = {
  render: () => createHTMLElement(InputTypesHTML),
  parameters: {
    docs: {
      description: {
        story: 'All HTML5 input types: text, email, password, number, tel, url, search, date, time, and color.',
      },
    },
  },
};

export const Sizes = {
  render: () => createHTMLElement(InputSizesHTML),
  parameters: {
    docs: {
      description: {
        story: 'Three size variants: small, medium (default), and large.',
      },
    },
  },
};

export const Textarea = {
  render: () => createHTMLElement(InputTextareaHTML),
  parameters: {
    docs: {
      description: {
        story: 'Textarea with character count and maxlength validation.',
      },
    },
  },
};

export const Showcase = {
  render: () => createHTMLElement(InputShowcaseHTML),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete showcase with contact form example, all states, and accessibility documentation.',
      },
    },
  },
};
