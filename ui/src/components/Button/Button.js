export function Button({
  label = 'Click me',
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false
} = {}) {
  const button = document.createElement('button');

  button.innerText = label;
  button.disabled = disabled;

  const classes = ['btn', `btn--${variant}`, `btn--${size}`];
  button.className = classes.join(' ');

  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return button;
}
