import { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TAccordionSize, TAccordionVariant } from './context';

export type TAccordionBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'children' | 'color'
> & {
  children?: ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (event: SyntheticEvent, expanded: boolean) => void;
  disabled?: boolean;
  color?: TPaletteColor;
  variant?: TAccordionVariant;
  size?: TAccordionSize;
};

export type TSAccordionBaseProps = {
  expanded: boolean;
  disabled: boolean;
  color: TPaletteColor;
  variant: TAccordionVariant;
  size: TAccordionSize;
};
