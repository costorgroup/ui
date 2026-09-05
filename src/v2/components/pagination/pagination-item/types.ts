import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../../theme/types';
import type { TButtonSize, TButtonVariant } from '../../button/types';
import { TPaginationItemType } from '../types';
import { TPaginationVariantProp, PAGINATION_DEFAULT_VARIANTS } from '../types';

export type TPaginationItemProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color' | 'type'
> & {
  children?: ReactNode;
  type?: TPaginationItemType;
  page?: number | null;
  selected?: boolean;
  variant?: TPaginationVariantProp;
  size?: TButtonSize;
  color?: TPaletteColor;
};
