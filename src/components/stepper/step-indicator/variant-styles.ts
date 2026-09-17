import type { TTheme } from '../../../theme/types';
import type { TThemeColorScale } from '../../../theme/theming/color/types';
import { colorMix } from '../../../helpers/variant-styles/surface';
import type { TStepperVariant, TStepStatus } from '../context';

export type TStepIndicatorAppearance = {
  backgroundColor: string;
  borderColor: string;
  color: string;
  boxShadow?: string;
};

const focusRing = (main: string) => `0 0 0 3px ${colorMix(main, 16)}`;

/** Idle look for a step that hasn't been reached yet — muted, doesn't
 * compete with the active/complete indicators. */
const incompleteAppearance = (
  variant: TStepperVariant,
  palette: TThemeColorScale,
): TStepIndicatorAppearance => {
  switch (variant) {
    case 'subtle':
      return {
        backgroundColor: colorMix(palette.main, 8),
        borderColor: 'transparent',
        color: colorMix(palette.darker, 64),
      };
    case 'surface':
      return {
        backgroundColor: colorMix(palette.main, 8),
        borderColor: colorMix(palette.main, 24),
        color: colorMix(palette.darker, 64),
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderColor: colorMix(palette.main, 36),
        color: colorMix(palette.darker, 64),
      };
    case 'plain':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: colorMix(palette.darker, 56),
      };
    case 'solid':
    default:
      return {
        backgroundColor: 'transparent',
        borderColor: colorMix(palette.main, 22),
        color: colorMix(palette.darker, 64),
      };
  }
};

/** Active and complete steps share the same filled look — active just adds
 * a focus ring on the variants that read well with one. */
const emphasizedAppearance = (
  variant: TStepperVariant,
  palette: TThemeColorScale,
  active: boolean,
): TStepIndicatorAppearance => {
  switch (variant) {
    case 'subtle':
      return {
        backgroundColor: colorMix(palette.main, 16),
        borderColor: 'transparent',
        color: palette.darker,
        boxShadow: active ? focusRing(palette.main) : undefined,
      };
    case 'surface':
      return {
        backgroundColor: colorMix(palette.main, 14),
        borderColor: palette.main,
        color: palette.darker,
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderColor: palette.main,
        color: palette.main,
        boxShadow: active ? focusRing(palette.main) : undefined,
      };
    case 'plain':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: palette.main,
      };
    case 'solid':
    default:
      return {
        backgroundColor: palette.main,
        borderColor: palette.main,
        color: palette.contrastText,
      };
  }
};

export const stepIndicatorAppearance = (
  status: TStepStatus,
  variant: TStepperVariant,
  palette: TThemeColorScale,
  theme: TTheme,
  error: boolean,
): TStepIndicatorAppearance => {
  if (error) {
    const errorPalette = theme.palette.error;

    return {
      backgroundColor: errorPalette.main,
      borderColor: errorPalette.main,
      color: errorPalette.contrastText,
    };
  }

  if (status === 'incomplete') {
    return incompleteAppearance(variant, palette);
  }

  return emphasizedAppearance(variant, palette, status === 'active');
};
