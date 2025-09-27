export interface ButtonProps {
  label?: string;
  onClick?: (event: MouseEvent) => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export function Button({
  label = 'Click me',
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false
}: ButtonProps): HTMLButtonElement {
  const button = document.createElement('button');

  button.innerText = label;
  button.disabled = disabled;

  const baseClasses = ['btn'];
  baseClasses.push(`btn--${variant}`);
  baseClasses.push(`btn--${size}`);

  button.className = baseClasses.join(' ');

  const styles: Partial<CSSStyleDeclaration> = {
    padding: size === 'small' ? '8px 16px' : size === 'large' ? '16px 32px' : '12px 24px',
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    backgroundColor: variant === 'primary' ? '#0066cc' : variant === 'secondary' ? '#6c757d' : 'transparent',
    color: variant === 'primary' || variant === 'secondary' ? 'white' : '#0066cc',
    border: variant === 'outline' ? '2px solid #0066cc' : 'none',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? '0.5' : '1',
    transition: 'all 0.2s ease-in-out',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '500'
  };

  Object.assign(button.style, styles);

  if (!disabled) {
    button.addEventListener('mouseenter', () => {
      if (variant === 'primary') {
        button.style.backgroundColor = '#0052a3';
      } else if (variant === 'secondary') {
        button.style.backgroundColor = '#5a6268';
      } else if (variant === 'outline') {
        button.style.backgroundColor = '#0066cc';
        button.style.color = 'white';
      }
    });

    button.addEventListener('mouseleave', () => {
      button.style.backgroundColor = styles.backgroundColor!;
      button.style.color = styles.color!;
    });
  }

  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return button;
}