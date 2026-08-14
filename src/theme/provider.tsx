import React, { ReactNode } from 'react';
import { Theme, ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { DDefaultTheme } from './data';

export type TThemeProviderProps = {
  children?: ReactNode;
  theme?: Partial<Theme> | ((outerTheme: Theme) => Theme);
};

const ThemeProvider = ({ theme, children }: TThemeProviderProps) => {
  return (
    <EmotionThemeProvider theme={theme ?? DDefaultTheme}>
      {children}
    </EmotionThemeProvider>
  );
};

export default ThemeProvider;
export { ThemeProvider };
