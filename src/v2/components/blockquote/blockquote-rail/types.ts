import { HTMLAttributes } from 'react';
import { TPaletteColor } from '../../../../theme/types';
import type { TBlockquoteVariant } from '../types';

export type TBlockquoteRailProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
> & {
  thickness?: number;
};

export type TSBlockquoteRailProps = {
  color: TPaletteColor;
  variant: TBlockquoteVariant;
  thickness: number;
};
