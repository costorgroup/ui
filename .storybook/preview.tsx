import type { Preview } from '@storybook/react';
import React from 'react';
import { GlobalStyles, ThemeProvider } from '../src';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    options: {
      storySort: {
        order: [
          'Typography',
          'Buttons',
          'Forms & Inputs',
          'Overlays',
          'Feedbacks',
          'Data Display',
          'Layout',
          'Utilities',
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <GlobalStyles />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
