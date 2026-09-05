import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { GlobalStyles, ThemeProvider } from '../src';
import { DDarkTheme, DLightTheme } from '../src/theme/data';
import type { TColorScheme } from '../src/theme/theming/color';

const schemeThemes = {
  dark: DDarkTheme,
  light: DLightTheme,
} as const;

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Default / neutral color scheme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'light', title: 'Light', icon: 'sun' },
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
      const scheme = (globals.theme ?? 'dark') as TColorScheme;
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
