import type { TTheme } from '../../../theme/types';
import type { TThemeColorScale } from '../../../theme/theming/color/types';
import { PALETTE_TINT, SURFACE_BORDER_IDLE, SURFACE_BORDER_HOVER } from '../../idle-variant-styles';
import {
  chromeOpaqueFill,
  paletteTint,
  surfaceBorder,
  surfaceMutedBackground,
} from '../../surface';
import type { TInputVariant } from './input-wrapper/types';

const fieldText = (theme: TTheme) => theme.colors.default.main;

const inputIdleBackground = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  switch (variant) {
    case 'subtle':
    case 'surface':
      return paletteTint(theme, palette.main, PALETTE_TINT);
    case 'outline':
      return 'transparent';
  }
};

const inputHoverBackground = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  switch (variant) {
    case 'subtle':
    case 'surface':
      return paletteTint(theme, palette.dark, PALETTE_TINT);
    case 'outline':
      return 'transparent';
  }
};

const inputFocusBackground = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  switch (variant) {
    case 'subtle':
    case 'surface':
      return paletteTint(theme, palette.darker, PALETTE_TINT);
    case 'outline':
      return 'transparent';
  }
};

const inputIdleBorderColor = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  switch (variant) {
    case 'subtle':
      return 'transparent';
    case 'surface':
      return palette.main;
    case 'outline':
      return chromeOpaqueFill(theme, SURFACE_BORDER_IDLE);
  }
};

const inputHoverBorderColor = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => {
  switch (variant) {
    case 'subtle':
      return 'transparent';
    case 'surface':
      return palette.main;
    case 'outline':
      return chromeOpaqueFill(theme, SURFACE_BORDER_HOVER);
  }
};

const inputFocusBorderColor = (
  variant: TInputVariant,
  palette: TThemeColorScale,
) => {
  switch (variant) {
    case 'subtle':
      return 'transparent';
    case 'surface':
    case 'outline':
      return palette.main;
  }
};

const fieldChrome = (
  backgroundColor: string,
  text: string,
  border: string,
) => `
  background-color: ${backgroundColor};
  color: ${text};
  border-color: ${border};
  box-shadow: none;
`;

const variantIdleStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  text: string,
) =>
  fieldChrome(
    inputIdleBackground(variant, palette, theme),
    text,
    inputIdleBorderColor(variant, palette, theme),
  );

const variantHoverStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  text: string,
) =>
  fieldChrome(
    inputHoverBackground(variant, palette, theme),
    text,
    inputHoverBorderColor(variant, palette, theme),
  );

const variantFocusStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  text: string,
) =>
  fieldChrome(
    inputFocusBackground(variant, palette, theme),
    text,
    inputFocusBorderColor(variant, palette),
  );

const variantErrorStyles = (
  variant: TInputVariant,
  error: TThemeColorScale,
  theme: TTheme,
  text: string,
) =>
  fieldChrome(inputIdleBackground(variant, error, theme), text, error.main);

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

/** Field error chrome — locked border; hover/focus do not override. */
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
) => variantIdleStyles(variant, palette, theme, theme.colors.default.main);

export const inputControlIdleHoverStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => variantHoverStyles(variant, palette, theme, theme.colors.default.main);

export { surfaceBorder, surfaceMutedBackground };
