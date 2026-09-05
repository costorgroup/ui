import { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import { TPaletteColor } from '../../../../theme/types';
import { TWindowRadius } from '../../window/types';
import { TAccordionVariant } from '../variant-styles';
import { TAccordionSize } from './context';

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
  radius?: TWindowRadius;
  hasDetails?: boolean;
};

export type TSAccordionBaseProps = {
  radius: TWindowRadius;
  size: TAccordionSize;
  expanded: boolean;
  disabled: boolean;
  color: TPaletteColor;
  variant: TAccordionVariant;
  grouped: boolean;
};
