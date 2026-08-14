import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import type { TBreadcrumbSize } from './breadcrumb-base/types';

export type { TBreadcrumbSize };

export type TBreadcrumbProps = Omit<HTMLAttributes<HTMLElement>, 'color'> & {
  children?: ReactNode;
  size?: TBreadcrumbSize;
  color?: TPaletteColor;
};
