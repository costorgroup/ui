import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    {
      directory: '../src',
      files: '**/*.stories.@(ts|tsx)',
      ignore: ['**/*-parts.stories.@(ts|tsx)'],
    },
  ],

  addons: ['@storybook/addon-links', '@storybook/addon-docs', '@storybook/addon-mcp'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  }
};

export default config;
