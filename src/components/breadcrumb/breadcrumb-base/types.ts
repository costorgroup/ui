import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';

export type TBreadcrumbSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TBreadcrumbBaseProps = Omit<
  HTMLAttributes<HTMLElement>,
  'color'
> & {
  children?: ReactNode;
  size?: TBreadcrumbSize;
  color?: TPaletteColor;
};

export type TSBreadcrumbBaseProps = {
  size: TBreadcrumbSize;
  color: TPaletteColor;
};
