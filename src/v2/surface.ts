import { TTheme } from "../theme/types";

export const SURFACE_PANEL_FILL_ALPHA = 90;
export const SURFACE_PANEL_BORDER_ALPHA = 5;

export const colorMix = (color: string, alpha: number) =>
  `color-mix(in lab, ${color} ${alpha}%, transparent)`;

export const colorMixBase = (color: string, alpha: number, base: string) =>
  `color-mix(in lab, ${color} ${alpha}%, ${base})`;

/** Floating panel fill — matches Window transparent appearance. */
export const surfacePanelBackground = (theme: TTheme) =>
  colorMix(theme.colors.base.main, SURFACE_PANEL_FILL_ALPHA);

export const surfacePanelBorder = (theme: TTheme) =>
  surfaceBorder(theme, SURFACE_PANEL_BORDER_ALPHA);

export const surfacePanelShadow = (theme: TTheme) => `
  0 1px 2px color-mix(in lab, ${theme.colors.base.darker} 6%, transparent),
  0 4px 16px color-mix(in lab, ${theme.colors.base.darker} 4%, transparent)
`;

/** Transparent chrome overlay (black tint). */
export const chromeTransparentFill = (theme: TTheme, alpha: number) => {
  const { base: canvas } = theme.colors;
  return colorMix(canvas.contrastText, alpha);
};

export const chromeOpaqueFill = (theme: TTheme, alpha: number) => {
  const { base: canvas } = theme.colors;
  return colorMixBase(canvas.contrastText, alpha, canvas.main);
};

/** Picked-color tint mixed onto the canvas. */
export const paletteTint = (theme: TTheme, color: string, alpha = 15) =>
  colorMixBase(color, alpha, theme.colors.base.main);

/** Soft chrome border from the theme canvas contrast color. Default 5%. */
export const surfaceBorder = (theme: TTheme, alpha = 5) =>
  `1px solid ${chromeOpaqueFill(theme, alpha)}`;

/** Soft chrome fill from the theme canvas contrast color. */
export const surfaceMutedBackground = (theme: TTheme, alpha = 5) =>
  colorMix(theme.colors.base.contrastText, alpha);
