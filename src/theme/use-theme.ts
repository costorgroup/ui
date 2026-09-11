import { useContext } from 'react';
import { useTheme as useEmotionTheme } from '@emotion/react';
import { ThemeControllerContext, type TThemeController } from './context';
import type { TTheme } from './types';

export type TUseThemeReturn = TTheme & TThemeController;

const useTheme = (): TUseThemeReturn => {
  const theme = useEmotionTheme();
  const controller = useContext(ThemeControllerContext);

  if (!controller) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return { ...theme, ...controller };
};

export { useTheme };
export default useTheme;
