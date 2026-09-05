import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { GlobalStyles, ThemeProvider } from '../src';
import { DDarkTheme, DLightTheme } from '../src/theme';

const schemeThemes = {
  dark: DDarkTheme,
  light: DLightTheme,
} as const;

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Color scheme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },
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
          'V2',
          'V2/Animated',
          'V2/Buttons',
          'V2/Data Display',
          'Typography',
          'Buttons',
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
    (Story, { globals }) => {
      const scheme = (globals.theme ?? 'dark') as keyof typeof schemeThemes;
      const theme = schemeThemes[scheme] ?? DDarkTheme;

      return (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
