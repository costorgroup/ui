import type { Preview } from '@storybook/react-vite';
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import React from 'react';
import { GlobalStyles, ThemeProvider, useTheme } from '../src';
import type { TThemeAppearance } from '../src/theme';

const StoryCanvas = ({
  children,
  fill = false,
}: {
  children: React.ReactNode;
  fill?: boolean;
}) => {
  const theme = useTheme();

  return (
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
        backgroundColor: theme.surfaces.background,
        color: theme.palette.default.main,
      }}
    >
      {children}
    </div>
  );
};

const AutodocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Primary />
    <Controls />
    <Stories includePrimary={false} />
  </>
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
    docs: {
      page: AutodocsPage,
    },
    options: {
      storySort: {
        order: [
          'V3',
          'V2',
          'V2/Theme',
          'V2/Surfaces',
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
      const appearance = (globals.theme ?? 'dark') as TThemeAppearance;

      return (
        <ThemeProvider
          appearance={appearance}
          allowedModes={['light', 'dark']}
        >
          <GlobalStyles />
          <StoryCanvas fill={parameters.fill === true}>
            <Story />
          </StoryCanvas>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
