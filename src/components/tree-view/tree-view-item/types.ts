import {
  HTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  SyntheticEvent,
} from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TTreeViewValue } from '../context';

export type TTreeViewItemProps = Omit<
  HTMLAttributes<HTMLLIElement>,
  'onChange' | 'onSelect' | 'onClick' | 'onDoubleClick' | 'onKeyDown'
> & {
  children?: ReactNode;
  value?: TTreeViewValue;
  expanded?: boolean;
  defaultExpanded?: boolean;
  disabled?: boolean;
  onChange?: (event: SyntheticEvent, expanded: boolean) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onDoubleClick?: MouseEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
};

export type TSTreeViewItemContentProps = {
  level: number;
  selected: boolean;
  disabled: boolean;
  color: TPaletteColor;
};
