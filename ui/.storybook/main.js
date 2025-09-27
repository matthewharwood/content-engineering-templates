/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [],
  framework: {
    name: "@storybook/html-vite",
    options: {}
  }
};

export default config;