import type { TThemeColorScale } from '../../theme/theming/color/types';

type TRgb = { r: number; g: number; b: number };

const clamp = (value: number) => Math.min(255, Math.max(0, Math.round(value)));

const parseHex = (hex: string): TRgb => {
  const normalized = hex.replace('#', '');
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((channel) => channel + channel)
          .join('')
      : normalized;
  const int = Number.parseInt(value, 16);

  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
};

const toHex = ({ r, g, b }: TRgb) =>
  `#${[r, g, b]
    .map((channel) => channel.toString(16).padStart(2, '0'))
    .join('')}`;

const mixRgb = (base: TRgb, target: TRgb, amount: number): TRgb => ({
  r: clamp(base.r + (target.r - base.r) * amount),
  g: clamp(base.g + (target.g - base.g) * amount),
  b: clamp(base.b + (target.b - base.b) * amount),
});

const WHITE = parseHex('#ffffff');
const BLACK = parseHex('#000000');

export const CUI_CANVAS_VAR = '--cui-canvas';

export type TCreateColorScaleSteps = {
  lighter?: number;
  light?: number;
  dark?: number;
  darker?: number;
};

export type TCreateColorScaleOptions = TCreateColorScaleSteps;

const DEFAULT_STEPS: Required<TCreateColorScaleSteps> = {
  lighter: 0.2,
  light: 0.1,
  dark: 0.1,
  darker: 0.2,
};

export const createColorScale = (
  main: string,
  contrastText: string,
  options: TCreateColorScaleOptions = {},
): TThemeColorScale => {
  const mix = { ...DEFAULT_STEPS, ...options };
  const base = parseHex(main);

  return {
    lighter: toHex(mixRgb(base, WHITE, mix.lighter)),
    light: toHex(mixRgb(base, WHITE, mix.light)),
    main,
    dark: toHex(mixRgb(base, BLACK, mix.dark)),
    darker: toHex(mixRgb(base, BLACK, mix.darker)),
    contrastText,
  };
};
