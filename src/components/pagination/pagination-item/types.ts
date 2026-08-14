import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TButtonSize, TButtonVariant } from '../../button/types';
import { TPaginationItemType } from '../types';

export type TPaginationItemProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color' | 'type'
> & {
  children?: ReactNode;
  type?: TPaginationItemType;
  page?: number | null;
  selected?: boolean;
  variant?: TButtonVariant;
  size?: TButtonSize;
  color?: TPaletteColor;
};
