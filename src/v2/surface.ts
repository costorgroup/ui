import { TTheme } from "../theme/types";

export const SURFACE_PANEL_FILL_ALPHA = 90;
export const SURFACE_PANEL_BORDER_ALPHA = 5;
export const SURFACE_PANEL_BACKDROP_BLUR_PX = 5;

export const colorMix = (color: string, alpha: number) =>
  `color-mix(in srgb, ${color} ${alpha}%, transparent)`;

export const colorMixBase = (color: string, alpha: number, base: string) =>
  `color-mix(in srgb, ${color} ${alpha}%, ${base})`;

/** Floating panel fill — matches Window transparent appearance. */
export const surfacePanelBackground = (theme: TTheme) =>
  colorMix(theme.colors.base.main, SURFACE_PANEL_FILL_ALPHA);

export const surfacePanelBorder = (theme: TTheme) =>
  surfaceBorder(theme, SURFACE_PANEL_BORDER_ALPHA);

export const surfacePanelShadow = (theme: TTheme) => `
  0 1px 2px color-mix(in srgb, ${theme.colors.base.darker} 6%, transparent),
  0 4px 16px color-mix(in srgb, ${theme.colors.base.darker} 4%, transparent)
`;

export const surfacePanelBackdrop = () => `
  backdrop-filter: blur(${SURFACE_PANEL_BACKDROP_BLUR_PX}px);
  -webkit-backdrop-filter: blur(${SURFACE_PANEL_BACKDROP_BLUR_PX}px);
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

/** Soft chrome border from the theme canvas contrast color. */
export const surfaceBorder = (theme: TTheme, alpha = 10) =>
  `1px solid ${colorMix(theme.colors.base.contrastText, alpha)}`;

/** Soft chrome fill from the theme canvas contrast color. */
export const surfaceMutedBackground = (theme: TTheme, alpha = 5) =>
  colorMix(theme.colors.base.contrastText, alpha);
