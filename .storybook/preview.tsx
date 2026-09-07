import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { GlobalStyles, ThemeProvider } from '../src';
import { DDarkTheme, DLightTheme } from '../src/theme';

const schemeThemes = {
  dark: DDarkTheme,
  light: DLightTheme,
} as const;

const StoryCanvas = ({
  children,
  background,
  color,
  fill = false,
}: {
  children: React.ReactNode;
  background: string;
  color: string;
  fill?: boolean;
}) => (
  <div
    style={{
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: fill ? 'stretch' : 'center',
      justifyContent: fill ? 'stretch' : 'center',
      width: '100%',
      height: fill ? '100vh' : undefined,
      minHeight: fill ? '100vh' : 200,
      padding: fill ? 0 : 32,
      backgroundColor: background,
      color,
    }}
  >
    {children}
  </div>
);

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
    layout: 'fullscreen',
    backgrounds: { disable: true },
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
    (Story, { globals, parameters }) => {
      const scheme = (globals.theme ?? 'dark') as keyof typeof schemeThemes;
      const theme = schemeThemes[scheme] ?? DDarkTheme;

      return (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <StoryCanvas
            fill={parameters.fill === true}
            background={theme.colors.base.main}
            color={theme.colors.default.main}
          >
            <Story />
          </StoryCanvas>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
