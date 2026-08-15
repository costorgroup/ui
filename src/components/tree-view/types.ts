import { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import { TPaletteColor } from '../../theme/types';
import { TTreeViewSize, TTreeViewValue } from './context';

export type { TTreeViewSize, TTreeViewValue };

export type TTreeViewProps = Omit<
  HTMLAttributes<HTMLUListElement>,
  'onSelect'
> & {
  children?: ReactNode;
  selected?: TTreeViewValue | null;
  defaultSelected?: TTreeViewValue | null;
  onSelect?: (event: SyntheticEvent | Event, value: TTreeViewValue | null) => void;
  unfocusOnClickAway?: boolean;
  size?: TTreeViewSize;
  color?: TPaletteColor;
};

export type TSTreeViewProps = {
  size: TTreeViewSize;
};
