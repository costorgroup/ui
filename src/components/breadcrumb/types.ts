import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import type { TBreadcrumbSize } from './breadcrumb-base/types';
import type { TSlotProps } from '../../helpers/slot-props';

export type { TBreadcrumbSize };

export type TBreadcrumbSlotProps = TSlotProps<{
  list: HTMLAttributes<HTMLOListElement>;
}>;

export type TBreadcrumbProps = Omit<HTMLAttributes<HTMLElement>, 'color'> & {
  children?: ReactNode;
  size?: TBreadcrumbSize;
  color?: TPaletteColor;
  slotProps?: TBreadcrumbSlotProps;
};
