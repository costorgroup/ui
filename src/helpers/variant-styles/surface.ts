import { TTheme } from "../../theme/types";

export const SURFACE_PANEL_FILL_ALPHA = 90;
export const SURFACE_PANEL_BORDER_ALPHA = 5;

export const colorMix = (color: string, alpha: number) =>
  `color-mix(in oklab, ${color} ${alpha}%, transparent)`;

export const colorMixBase = (color: string, alpha: number, base: string) =>
  `color-mix(in oklab, ${color} ${alpha}%, ${base})`;

/** Floating panel fill — matches Window transparent appearance. */
export const surfacePanelBackground = (theme: TTheme) =>
  colorMix(theme.palette.base.main, SURFACE_PANEL_FILL_ALPHA);

export const surfacePanelBorder = (theme: TTheme) =>
  surfaceBorder(theme, SURFACE_PANEL_BORDER_ALPHA);

export const surfacePanelShadow = (theme: TTheme) => {
  const ink = theme.palette.common.black;

  return `
    0 1px 2px color-mix(in oklab, ${ink} 10%, transparent),
    0 4px 16px color-mix(in oklab, ${ink} 8%, transparent)
  `;
};

/** Transparent chrome overlay (black tint). */
export const chromeTransparentFill = (theme: TTheme, alpha: number) => {
  const { base: canvas } = theme.palette;
  return colorMix(canvas.contrastText, alpha);
};

export const chromeOpaqueFill = (theme: TTheme, alpha: number) => {
  const { base: canvas } = theme.palette;
  return colorMixBase(canvas.contrastText, alpha, canvas.main);
};

/** Picked-color tint mixed onto the canvas. */
export const paletteTint = (theme: TTheme, color: string, alpha = 15) =>
  colorMixBase(color, alpha, theme.palette.base.main);

export const FIELD_LIGHT_MIX = 7;
export const FIELD_DARK_MIX = 7;
export const FIELD_BORDER_IDLE = 20;
export const FIELD_BORDER_HOVER = 40;

/** Field / menu surface — mixer wash over whatever sits behind. */
export const fieldBackground = (theme: TTheme) =>
  colorMix(
    theme.surfaces.mixer,
    theme.mode === 'light' ? FIELD_LIGHT_MIX : FIELD_DARK_MIX,
  );

/** Surface / outline field border — mixer wash. */
export const fieldBorderColor = (theme: TTheme, hover = false) =>
  colorMix(
    theme.surfaces.mixer,
    hover ? FIELD_BORDER_HOVER : FIELD_BORDER_IDLE,
  );

/** Ink wash mixed onto the field surface. */
export const fieldChromeFill = (theme: TTheme, alpha: number) =>
  colorMixBase(theme.palette.base.contrastText, alpha, fieldBackground(theme));

/** Picked-color tint mixed onto the field surface. */
export const fieldPaletteTint = (theme: TTheme, color: string, alpha = 15) =>
  colorMixBase(color, alpha, fieldBackground(theme));

export const FIELD_FOCUS_RING = 3;
export const FIELD_FOCUS_RING_ALPHA = 50;

/** shadcn-style focus halo — thick wash outside the field, not a solid border. */
export const fieldFocusRing = (color: string, alpha = FIELD_FOCUS_RING_ALPHA) =>
  `0 0 0 ${FIELD_FOCUS_RING}px ${colorMix(color, alpha)}`;

/** Soft chrome border from the theme canvas contrast color. Default 5%. */
export const surfaceBorder = (theme: TTheme, alpha = 5) =>
  `1px solid ${chromeOpaqueFill(theme, alpha)}`;

/** Soft chrome fill from the theme canvas contrast color. */
export const surfaceMutedBackground = (theme: TTheme, alpha = 5) =>
  colorMix(theme.palette.base.contrastText, alpha);

const glassInk = (theme: TTheme) =>
  theme.mode === 'light'
    ? theme.palette.common.black
    : theme.palette.common.white;

/** Contrast hairline — `ring-white/10`, inverted in light. */
export const glassRing = (theme: TTheme) => colorMix(glassInk(theme), 10);

/** Lifted neutral (`neutral-800` / `neutral-900`, inverted in light). */
const glassNeutral = (theme: TTheme, lift: number) => {
  const { white, black } = theme.palette.common;

  return theme.mode === 'light'
    ? colorMixBase(black, lift, white)
    : colorMixBase(white, lift, black);
};

/** Track fill — `bg-neutral-900/80`. */
export const glassBackground = (
  theme: TTheme,
  appearance: 'opaque' | 'transparent' = 'opaque',
) =>
  colorMix(
    glassNeutral(theme, theme.mode === 'light' ? 4 : 9),
    appearance === 'transparent' ? 50 : 80,
  );

export const glassBorder = (theme: TTheme) => `1px solid ${glassRing(theme)}`;

/** `shadow-2xl` */
export const glassShadow = (theme: TTheme) =>
  `0 25px 50px -12px ${colorMix(theme.palette.common.black, 25)}`;

export const PAPER_ELEVATION_MAX = 24;

/** MUI-style overlay % — dark surfaces lighten as they rise. */
export const paperOverlayAlpha = (elevation: number) => {
  const next = Math.min(PAPER_ELEVATION_MAX, Math.max(0, elevation));

  if (next <= 0) {
    return 0;
  }

  if (next < 1) {
    return 5.11916 * next * next;
  }

  return 4.5 * Math.log(next + 1) + 2;
};

export const clampPaperElevation = (elevation: number) =>
  Math.min(PAPER_ELEVATION_MAX, Math.max(0, Math.round(elevation)));

export const paperBackground = (theme: TTheme, elevation: number) => {
  const { background, mixer } = theme.surfaces;

  if (theme.mode !== 'dark') {
    return background;
  }

  const alpha = paperOverlayAlpha(elevation);

  if (alpha <= 0) {
    return background;
  }

  return colorMixBase(mixer, alpha, background);
};

export const paperShadow = (theme: TTheme, elevation: number) => {
  if (elevation <= 0 || theme.mode === 'dark') {
    return 'none';
  }

  const ink = theme.surfaces.mixer;
  const y = Math.min(2 + elevation * 0.35, 12);
  const blur = Math.min(4 + elevation * 0.8, 28);
  const mid = Math.min(8 + elevation * 0.55, 22);
  const far = Math.min(6 + elevation * 0.35, 16);

  return `
    0 ${y * 0.25}px ${blur * 0.35}px color-mix(in oklab, ${ink} ${mid}%, transparent),
    0 ${y}px ${blur}px color-mix(in oklab, ${ink} ${far}%, transparent)
  `;
};
