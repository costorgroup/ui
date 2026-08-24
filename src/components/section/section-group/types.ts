import { HTMLAttributes, ReactNode } from 'react';
import { TGap, TPaletteColor } from '../../../theme/types';
import { TSectionAlign, TSectionVariant } from './context';

export type { TSectionAlign, TSectionVariant };

export type TSectionGap = TGap | number | (string & {});

export type TSectionGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
> & {
  children?: ReactNode;
  align?: TSectionAlign;
  color?: TPaletteColor;
  variant?: TSectionVariant;
  /** Space between sections. Gap key, spacing number, or raw CSS length. */
  gap?: TSectionGap;
};

export type TSSectionGroupProps = {
  align: TSectionAlign;
  color: TPaletteColor;
  variant: TSectionVariant;
  gap: TSectionGap;
};
