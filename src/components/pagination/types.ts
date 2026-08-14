import { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import { TButtonSize, TButtonVariant } from '../button/types';

export type TPaginationVariant = TButtonVariant;
export type TPaginationSize = TButtonSize;

export type TPaginationItemType =
  | 'page'
  | 'first'
  | 'last'
  | 'next'
  | 'previous'
  | 'start-ellipsis'
  | 'end-ellipsis';

export type TPaginationItemData = {
  type: TPaginationItemType;
  page: number | null;
  selected: boolean;
  disabled: boolean;
};

export type TPaginationProps = Omit<
  HTMLAttributes<HTMLElement>,
  'onChange' | 'color'
> & {
  count: number;
  page?: number;
  defaultPage?: number;
  onChange?: (event: MouseEvent<HTMLButtonElement>, page: number) => void;
  color?: TPaletteColor;
  variant?: TPaginationVariant;
  size?: TPaginationSize;
  disabled?: boolean;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
  getItemAriaLabel?: (
    type: TPaginationItemType,
    page: number,
    selected: boolean,
  ) => string;
  children?: ReactNode;
};
