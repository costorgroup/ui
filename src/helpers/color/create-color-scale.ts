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

export const PALETTE_SUBTLE_ALPHA = 12;
export const PALETTE_MUTED_ALPHA = 20;
export const CANVAS_SUBTLE_ALPHA = 5;
export const CANVAS_MUTED_ALPHA = 10;

const colorMixOnto = (color: string, alpha: number, base: string) =>
  `color-mix(in srgb, ${color} ${alpha}%, ${base})`;

export type TCreateColorScaleSteps = {
  lighter?: number;
  light?: number;
  dark?: number;
  darker?: number;
};

export type TCreateColorScaleOptions = TCreateColorScaleSteps & {
  canvas?: string;
  tint?: 'main' | 'contrastText';
  subtleAlpha?: number;
  mutedAlpha?: number;
};

const DEFAULT_STEPS: Required<TCreateColorScaleSteps> = {
  lighter: 0.1,
  light: 0.05,
  dark: 0.05,
  darker: 0.1,
};

export const createColorScale = (
  main: string,
  contrastText: string,
  options: TCreateColorScaleOptions = {},
): TThemeColorScale => {
  const mix = { ...DEFAULT_STEPS, ...options };
  const base = parseHex(main);
  const darker = toHex(mixRgb(base, BLACK, mix.darker));
  const canvas = options.canvas ?? '#111111';
  const tint = options.tint ?? 'main';
  const tintColor = tint === 'contrastText' ? contrastText : main;
  const subtleAlpha =
    options.subtleAlpha ??
    (tint === 'contrastText' ? CANVAS_SUBTLE_ALPHA : PALETTE_SUBTLE_ALPHA);
  const mutedAlpha =
    options.mutedAlpha ??
    (tint === 'contrastText' ? CANVAS_MUTED_ALPHA : PALETTE_MUTED_ALPHA);
  const canvasRef = `var(${CUI_CANVAS_VAR}, ${canvas})`;

  return {
    lighter: toHex(mixRgb(base, WHITE, mix.lighter)),
    light: toHex(mixRgb(base, WHITE, mix.light)),
    main,
    dark: toHex(mixRgb(base, BLACK, mix.dark)),
    darker,
    contrastText,
    subtle: colorMixOnto(tintColor, subtleAlpha, canvasRef),
    muted: colorMixOnto(tintColor, mutedAlpha, canvasRef),
    fg: tint === 'contrastText' ? contrastText : darker,
  };
};

export const derivePaletteSemantics = (
  scale: Pick<TThemeColorScale, 'main' | 'contrastText' | 'darker'> &
    Partial<Pick<TThemeColorScale, 'subtle' | 'muted' | 'fg'>>,
  canvas: string,
  tint: 'main' | 'contrastText' = 'main',
): Pick<TThemeColorScale, 'subtle' | 'muted' | 'fg'> => {
  const built = createColorScale(scale.main, scale.contrastText, { canvas, tint });

  return {
    subtle: scale.subtle ?? built.subtle,
    muted: scale.muted ?? built.muted,
    fg:
      scale.fg ??
      (tint === 'contrastText' ? scale.contrastText : scale.darker),
  };
};
