import { ReactNode, TableHTMLAttributes } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TTableSize } from './context';

export type TTableBaseProps = Omit<
  TableHTMLAttributes<HTMLTableElement>,
  'color' | 'children'
> & {
  children?: ReactNode;
  size?: TTableSize;
  color?: TPaletteColor;
};

export type TSTableBaseProps = {
  size: TTableSize;
  color: TPaletteColor;
};
