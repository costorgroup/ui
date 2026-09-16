import { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import type { TPaletteColor } from '../../../../theme/types';
import type { TAccordionRadius } from '../types';
import type { TAccordionVariant } from '../variant-styles';
import type { TAccordionSize } from './context';

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
  radius?: TAccordionRadius;
  hasDetails?: boolean;
};

export type TSAccordionBaseProps = {
  radius: TAccordionRadius;
  size: TAccordionSize;
  expanded: boolean;
  disabled: boolean;
  color: TPaletteColor;
  variant: TAccordionVariant;
  grouped: boolean;
};
