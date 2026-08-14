import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';

export type TAlertVariant =
  | 'solid'
  | 'subtle'
  | 'surface'
  | 'outline'
  | 'ghost'
  | 'plain';

export type TAlertSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TAlertBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'title'
> & {
  children?: ReactNode;
  color?: TPaletteColor;
  variant?: TAlertVariant;
  size?: TAlertSize;
  closable?: boolean;
};

export type TSAlertBaseProps = {
  color: TPaletteColor;
  variant: TAlertVariant;
  size: TAlertSize;
  closable: boolean;
};
