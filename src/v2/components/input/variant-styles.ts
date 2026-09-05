import type { TTheme } from '../../../theme/types';
import type { TThemeColorScale } from '../../../theme/theming/color/types';
import { SURFACE_BORDER_IDLE } from '../../idle-variant-styles';
import {
  chromeTransparentFill,
  colorMix,
  surfaceBorder,
  surfaceMutedBackground,
} from '../../surface';
import type { TInputVariant } from './input-wrapper/types';

/** Canvas border (surface/outline hover). */
const CANVAS_BORDER_HOVER = 38;

/** Palette border on surface/outline focus. */
const PALETTE_BORDER_FOCUS = 92;

/** Canvas inset glow (subtle hover, surface hover). */
const CANVAS_GLOW_SOFT = 6;
const CANVAS_GLOW_CORE = 10;

/** Palette inset glow (subtle/surface focus). */
const PALETTE_GLOW_SOFT = 26;
const PALETTE_GLOW_CORE = 36;

const borderColor = (theme: TTheme, alpha: number) =>
  colorMix(theme.colors.base.contrastText, alpha);

const fieldText = (theme: TTheme) => theme.colors.base.contrastText;

const inputIdleBackground = (
  variant: TInputVariant,
  palette: TThemeColorScale,
) => {
  switch (variant) {
    case 'subtle':
    case 'surface':
      return palette.subtle;
    case 'outline':
      return 'transparent';
  }
};

const inputHoverBackground = (
  variant: TInputVariant,
  palette: TThemeColorScale,
) => {
  switch (variant) {
    case 'subtle':
    case 'surface':
      return palette.muted;
    case 'outline':
      return 'transparent';
  }
};

const inputIdleBorderColor = (variant: TInputVariant, theme: TTheme) => {
  switch (variant) {
    case 'subtle':
      return 'transparent';
    case 'surface':
    case 'outline':
      return chromeTransparentFill(theme, SURFACE_BORDER_IDLE);
  }
};

const paletteAccent = (palette: TThemeColorScale, alpha: number) =>
  colorMix(palette.main, alpha);

const canvasAccent = (theme: TTheme, alpha: number) =>
  colorMix(theme.colors.base.contrastText, alpha);

const insetGlowOnly = (
  glow: string,
  glowCore: string,
  blur = 8,
  spread = 1,
  coreBlur = 3,
) => `
  box-shadow:
    inset 0 0 ${blur}px ${spread}px ${glow},
    inset 0 0 ${coreBlur}px 0 ${glowCore};
`;

const canvasInsetGlow = (theme: TTheme) =>
  insetGlowOnly(
    canvasAccent(theme, CANVAS_GLOW_SOFT),
    canvasAccent(theme, CANVAS_GLOW_CORE),
  );

const paletteInsetGlow = (palette: TThemeColorScale) =>
  insetGlowOnly(
    paletteAccent(palette, PALETTE_GLOW_SOFT),
    paletteAccent(palette, PALETTE_GLOW_CORE),
  );

const subtleIdleStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  text: string,
) => `
  background-color: ${inputIdleBackground(variant, palette)};
  color: ${text};
  border-color: ${inputIdleBorderColor(variant, theme)};
  box-shadow: none;
`;

const subtleHoverStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  text: string,
) => `
  background-color: ${inputHoverBackground(variant, palette)};
  color: ${text};
  border-color: ${canvasAccent(theme, CANVAS_GLOW_SOFT)};
  ${canvasInsetGlow(theme)}
`;

const subtleFocusStyles = (
  palette: TThemeColorScale,
  theme: TTheme,
  text: string,
  variant: TInputVariant,
) => `
  background-color: ${inputIdleBackground(variant, palette)};
  color: ${text};
  border-color: ${paletteAccent(palette, PALETTE_GLOW_SOFT)};
  ${paletteInsetGlow(palette)}
`;

const surfaceIdleStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  text: string,
) => `
  background-color: ${inputIdleBackground(variant, palette)};
  color: ${text};
  border-color: ${inputIdleBorderColor(variant, theme)};
  box-shadow: none;
`;

const surfaceHoverStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  text: string,
) => `
  background-color: ${inputHoverBackground(variant, palette)};
  color: ${text};
  border-color: ${borderColor(theme, CANVAS_BORDER_HOVER)};
  ${canvasInsetGlow(theme)}
`;

const surfaceFocusStyles = (
  palette: TThemeColorScale,
  theme: TTheme,
  text: string,
  variant: TInputVariant,
) => `
  background-color: ${inputIdleBackground(variant, palette)};
  color: ${text};
  border-color: ${paletteAccent(palette, PALETTE_BORDER_FOCUS)};
  ${paletteInsetGlow(palette)}
`;

const outlineIdleStyles = (theme: TTheme, text: string) => `
  background-color: transparent;
  color: ${text};
  border-color: ${inputIdleBorderColor('outline', theme)};
  box-shadow: none;
`;

const outlineHoverStyles = (theme: TTheme, text: string) => `
  background-color: transparent;
  color: ${text};
  border-color: ${borderColor(theme, CANVAS_BORDER_HOVER)};
  box-shadow: none;
`;

const outlineFocusStyles = (
  palette: TThemeColorScale,
  theme: TTheme,
  text: string,
) => `
  background-color: transparent;
  color: ${text};
  border-color: ${paletteAccent(palette, PALETTE_BORDER_FOCUS)};
  box-shadow: none;
`;

const subtleErrorStyles = (
  error: TThemeColorScale,
  theme: TTheme,
  text: string,
  variant: TInputVariant,
) => `
  background-color: ${inputIdleBackground(variant, error)};
  color: ${text};
  border-color: ${paletteAccent(error, PALETTE_GLOW_SOFT)};
  ${paletteInsetGlow(error)}
`;

const surfaceErrorStyles = (
  error: TThemeColorScale,
  theme: TTheme,
  text: string,
  variant: TInputVariant,
) => `
  background-color: ${inputIdleBackground(variant, error)};
  color: ${text};
  border-color: ${paletteAccent(error, PALETTE_BORDER_FOCUS)};
  ${paletteInsetGlow(error)}
`;

const outlineErrorStyles = (
  error: TThemeColorScale,
  theme: TTheme,
  text: string,
) => `
  background-color: transparent;
  color: ${text};
  border-color: ${paletteAccent(error, PALETTE_BORDER_FOCUS)};
  box-shadow: none;
`;

const variantIdleStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  text: string,
) => {
  switch (variant) {
    case 'surface':
      return surfaceIdleStyles(variant, palette, theme, text);
    case 'outline':
      return outlineIdleStyles(theme, text);
    case 'subtle':
    default:
      return subtleIdleStyles(variant, palette, theme, text);
  }
};

const variantHoverStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  text: string,
) => {
  switch (variant) {
    case 'surface':
      return surfaceHoverStyles(variant, palette, theme, text);
    case 'outline':
      return outlineHoverStyles(theme, text);
    case 'subtle':
    default:
      return subtleHoverStyles(variant, palette, theme, text);
  }
};

const variantFocusStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  text: string,
) => {
  switch (variant) {
    case 'surface':
      return surfaceFocusStyles(palette, theme, text, variant);
    case 'outline':
      return outlineFocusStyles(palette, theme, text);
    case 'subtle':
    default:
      return subtleFocusStyles(palette, theme, text, variant);
  }
};

const variantErrorStyles = (
  variant: TInputVariant,
  error: TThemeColorScale,
  theme: TTheme,
  text: string,
) => {
  switch (variant) {
    case 'surface':
      return surfaceErrorStyles(error, theme, text, variant);
    case 'outline':
      return outlineErrorStyles(error, theme, text);
    case 'subtle':
    default:
      return subtleErrorStyles(error, theme, text, variant);
  }
};

/** Strip border/fill/shadow from controls inside InputWrapper. */
export const inputInnerResetStyles = `
  border: none;
  background: transparent;
  box-shadow: none;
  border-radius: inherit;
  outline: none;
`;

/** Field idle chrome — matches InputWrapper base state. */
export const inputFieldIdleStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => variantIdleStyles(variant, palette, theme, fieldText(theme));

/** Field hover chrome — matches InputWrapper hover. */
export const inputFieldHoverStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => variantHoverStyles(variant, palette, theme, fieldText(theme));

/** Field focus/open chrome — matches InputWrapper focus. */
export const inputFieldFocusStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => variantFocusStyles(variant, palette, theme, fieldText(theme));

/** Field error chrome — locked border/shadow; hover/focus do not override. */
export const inputFieldErrorStyles = (
  variant: TInputVariant,
  theme: TTheme,
) => variantErrorStyles(variant, theme.colors.error, theme, fieldText(theme));

/** Soft field chrome for inputs, selects, pin cells, rich-text shell, etc. */
export const inputVariantStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  options?: { focusSelector?: string; error?: boolean },
) => {
  const focus =
    options?.focusSelector ?? "&:focus-within, &[data-open='true']";
  const text = fieldText(theme);

  if (options?.error) {
    return variantErrorStyles(variant, theme.colors.error, theme, text);
  }

  return `
    ${variantIdleStyles(variant, palette, theme, text)}

    &:hover:not(:focus-within):not([data-open='true']) {
      ${variantHoverStyles(variant, palette, theme, text)}
    }

    ${focus} {
      ${variantFocusStyles(variant, palette, theme, text)}
    }
  `;
};

/** Unchecked binary control chrome (checkbox / radio / switch track off). */
export const inputControlIdleStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => variantIdleStyles(variant, palette, theme, palette.fg);

export const inputControlIdleHoverStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => variantHoverStyles(variant, palette, theme, palette.fg);

export { surfaceBorder, surfaceMutedBackground, borderColor };
