import type { TTheme } from '../../../theme/types';
import type { TThemeColorScale } from '../../../theme/theming/color/types';
import {
  fieldBackground,
  fieldBorderColor,
  surfaceBorder,
  surfaceMutedBackground,
} from '../../surface';
import type { TInputVariant } from './input-wrapper/types';

const fieldText = (theme: TTheme) => theme.palette.default.main;

const fieldFill = (variant: TInputVariant, theme: TTheme) =>
  variant === 'outline' ? 'transparent' : fieldBackground(theme);

const chromeBorder = (variant: TInputVariant, theme: TTheme, hover = false) => {
  if (variant === 'subtle') {
    return 'transparent';
  }

  return fieldBorderColor(theme, hover);
};

const fieldChrome = (
  backgroundColor: string,
  text: string,
  border: string,
  borderWidth: 1 | 2,
  stabilize = false,
) => `
  background-color: ${backgroundColor};
  color: ${text};
  border-color: ${border};
  border-width: ${borderWidth}px;
  ${stabilize ? `padding: ${borderWidth === 1 ? '1px' : '0'};` : ''}
  box-shadow: none;
  outline: none;
`;

const variantIdleStyles = (
  variant: TInputVariant,
  _palette: TThemeColorScale,
  theme: TTheme,
  text: string,
  stabilize = false,
) =>
  fieldChrome(
    fieldFill(variant, theme),
    text,
    chromeBorder(variant, theme),
    1,
    stabilize,
  );

const variantHoverStyles = (
  variant: TInputVariant,
  _palette: TThemeColorScale,
  theme: TTheme,
  text: string,
  stabilize = false,
) =>
  fieldChrome(
    fieldFill(variant, theme),
    text,
    chromeBorder(variant, theme, true),
    1,
    stabilize,
  );

const variantFocusStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  text: string,
  stabilize = false,
) =>
  fieldChrome(
    fieldFill(variant, theme),
    text,
    palette.main,
    2,
    stabilize,
  );

const variantErrorStyles = (
  variant: TInputVariant,
  error: TThemeColorScale,
  theme: TTheme,
  text: string,
  stabilize = false,
) => fieldChrome(fieldFill(variant, theme), text, error.main, 1, stabilize);

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

/** Field error chrome — red border; focus uses the same color at 2px. */
export const inputFieldErrorStyles = (
  variant: TInputVariant,
  theme: TTheme,
) => variantErrorStyles(variant, theme.palette.error, theme, fieldText(theme));

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
    return `
      ${variantErrorStyles(variant, theme.palette.error, theme, text, true)}

      &:hover:not(:focus-within):not([data-open='true']) {
        ${variantErrorStyles(variant, theme.palette.error, theme, text, true)}
      }

      ${focus} {
        ${variantFocusStyles(variant, theme.palette.error, theme, text, true)}
      }
    `;
  }

  return `
    ${variantIdleStyles(variant, palette, theme, text, true)}

    &:hover:not(:focus-within):not([data-open='true']) {
      ${variantHoverStyles(variant, palette, theme, text, true)}
    }

    ${focus} {
      ${variantFocusStyles(variant, palette, theme, text, true)}
    }
  `;
};

/** Unchecked binary control chrome (checkbox / radio / switch track off). */
export const inputControlIdleStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => variantIdleStyles(variant, palette, theme, theme.palette.default.main);

export const inputControlIdleHoverStyles = (
  variant: TInputVariant,
  palette: TThemeColorScale,
  theme: TTheme,
) => variantHoverStyles(variant, palette, theme, theme.palette.default.main);

export { surfaceBorder, surfaceMutedBackground };
