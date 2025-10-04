import { Button } from './Button.js';
import './Button.css';

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  render: (args) => {
    return Button(args);
  },
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' }
  },
};

export const Primary = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'medium',
    disabled: false
  }
};

export const Secondary = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'medium',
    disabled: false
  }
};

export const Outline = {
  args: {
    label: 'Outline Button',
    variant: 'outline',
    size: 'medium',
    disabled: false
  }
};

export const Small = {
  args: {
    label: 'Small Button',
    variant: 'primary',
    size: 'small',
    disabled: false
  }
};

export const Large = {
  args: {
    label: 'Large Button',
    variant: 'primary',
    size: 'large',
    disabled: false
  }
};

export const Disabled = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    size: 'medium',
    disabled: true
  }
};
