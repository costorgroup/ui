import { HTMLAttributes, ReactNode } from 'react';
import { TThemeRadius } from '../../../theme/types';
import { TAnimatedPlayMode } from '../types';

export type TChromaMaskComposite = 'add' | 'subtract' | 'intersect' | 'exclude';

export type TChromaWebkitMaskComposite =
  | 'clear'
  | 'copy'
  | 'source-over'
  | 'source-in'
  | 'source-out'
  | 'source-atop'
  | 'destination-over'
  | 'destination-in'
  | 'destination-out'
  | 'destination-atop'
  | 'xor';

export const CHROMA_WEBKIT_MASK_COMPOSITE: Record<
  TChromaMaskComposite,
  TChromaWebkitMaskComposite
> = {
  add: 'source-over',
  subtract: 'source-out',
  intersect: 'source-in',
  exclude: 'xor',
};

export const CHROMA_CORNER_ORIGINS = [
  '100% 0%',
  '0% 0%',
  '0% 100%',
  '100% 100%',
] as const;

export type TChromaOrigin = string;

export type TChromaConicSpinOrigin = TChromaOrigin | readonly TChromaOrigin[];

export type TChromaConicSpinLayer = {
  origin?: TChromaOrigin;
  colors?: string[];
  thickness?: number;
  duration?: number;
  maskComposite?: TChromaMaskComposite;
  webkitMaskComposite?: TChromaWebkitMaskComposite;
};

export type TChromaConicSpinProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  play?: TAnimatedPlayMode;
  /** Defaults applied to every layer unless overridden in `layers`. */
  colors?: string[];
  thickness?: number;
  duration?: number;
  radius?: keyof TThemeRadius;
  /**
   * Conic gradient center(s). Single value or array for layered spins.
   * Ignored when `layers` is set. Use `CHROMA_CORNER_ORIGINS` for all four corners.
   */
  origin?: TChromaConicSpinOrigin;
  maskComposite?: TChromaMaskComposite;
  webkitMaskComposite?: TChromaWebkitMaskComposite;
  /** Per-layer overrides for origin, colors, duration, mask, etc. */
  layers?: TChromaConicSpinLayer[];
};

export type TSChromaConicSpinProps = {
  radius: keyof TThemeRadius;
};

export type TSChromaRingProps = {
  origin: string;
  gradient: string;
  thickness: number;
  duration: number;
  maskComposite: TChromaMaskComposite;
  webkitMaskComposite: TChromaWebkitMaskComposite;
};
