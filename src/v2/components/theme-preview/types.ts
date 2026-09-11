import { HTMLAttributes } from 'react';

export type TThemePreviewColor = string;
export type TThemePreviewColors = [TThemePreviewColor, TThemePreviewColor];

export type TThemePreviewProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'children'
> & {
  /** Canvas and ink. One color uses the theme contrast for ink. */
  colors?: TThemePreviewColor | TThemePreviewColors;
};

export type TSThemePreviewProps = {
  canvas: string;
  ink: string;
};
