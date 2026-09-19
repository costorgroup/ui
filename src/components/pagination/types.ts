import { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import type { TButtonSize, TButtonVariant } from '../button/types';

export type TPaginationVariant = TButtonVariant;

export type TPaginationVariantProp =
  | TPaginationVariant
  | readonly [TPaginationVariant, TPaginationVariant];

export const PAGINATION_DEFAULT_VARIANTS = [
  'solid',
  'ghost',
] as const satisfies readonly [TPaginationVariant, TPaginationVariant];

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
  variant?: TPaginationVariantProp;
  size?: TPaginationSize;
  disabled?: boolean;
  fullWidth?: boolean;
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

export const PAGINATION_INACTIVE_COLOR = 'default' as const satisfies TPaletteColor;
