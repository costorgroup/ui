import { createContext } from 'react';
import type { TThemeAppearance } from './appearance';

export type TThemeController = {
  setAppearance: (appearance: TThemeAppearance) => void;
  setAccent: (id: string) => void;
  /** @deprecated use `setAccent` */
  setPalette: (id: string) => void;
};

export const ThemeControllerContext = createContext<TThemeController | null>(
  null,
);
