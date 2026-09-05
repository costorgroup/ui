import { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TWindowRadius } from '../window/types';
import { TAccordionExpandIconPosition } from './accordion-summary/types';
import { TAccordionSize } from './accordion-base/context';
import { TAccordionVariant } from './variant-styles';

export type TAccordionProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'children' | 'summary' | 'color'
> & {
  summary: ReactNode;
  children?: ReactNode;
  icon?: ReactNode;
  expandIconPosition?: TAccordionExpandIconPosition;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (event: SyntheticEvent, expanded: boolean) => void;
  disabled?: boolean;
  color?: TPaletteColor;
  variant?: TAccordionVariant;
  size?: TAccordionSize;
  radius?: TWindowRadius;
};

export type { TAccordionSize } from './accordion-base/context';
export type { TAccordionExpandIconPosition } from './accordion-summary/types';
