import { ReactNode, TableHTMLAttributes } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TTableSize } from './context';

export type TTableProps = Omit<
  TableHTMLAttributes<HTMLTableElement>,
  'color' | 'children'
> & {
  children?: ReactNode;
  size?: TTableSize;
  color?: TPaletteColor;
};

export type TSTableProps = {
  size: TTableSize;
  color: TPaletteColor;
};
