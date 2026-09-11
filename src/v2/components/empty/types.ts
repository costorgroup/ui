import { HTMLAttributes, ReactNode } from 'react';
import type { TThemeRadius } from '../../../theme/types';
import type { TAppearance } from '../../variant-types';

export type TEmptyAppearance = TAppearance;
export type TEmptyRadius = keyof TThemeRadius;
export type TEmptyVariant = 'plain' | 'surface';

export type TEmptyProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  radius?: TEmptyRadius;
  appearance?: TEmptyAppearance;
  /** `plain` is layout only; `surface` adds a dashed outline. */
  variant?: TEmptyVariant;
};

export type TSEmptyProps = {
  radius: TEmptyRadius;
  appearance: TEmptyAppearance;
  variant: TEmptyVariant;
};
